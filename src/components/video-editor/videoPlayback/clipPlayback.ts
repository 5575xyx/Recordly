import { enablePitchPreservingPlayback } from "@/lib/mediaTiming";
import {
	type ClipRegion,
	findClipAtTimelineTime,
	getClipSourceStartMs,
	getTimelineDurationMs,
	sortClipRegions,
} from "../types";

/** The playhead may stop at the timeline end; that is not a black gap. */
export function findPreviewClipAtTimelineTime(
	timeMs: number,
	clips: ClipRegion[],
): ClipRegion | null {
	const active = findClipAtTimelineTime(timeMs, clips);
	if (active) return active;
	const last = sortClipRegions(clips)[clips.length - 1];
	return last && timeMs === last.endMs ? last : null;
}

/** Timeline time advances at 1x; only the source media uses the clip's speed. */
export function createClipPlayback({
	video,
	getClips,
	onTime,
	onPlaying,
	onError,
}: {
	video: HTMLVideoElement;
	getClips: () => ClipRegion[];
	onTime: (timelineSeconds: number, sourceSeconds: number | null) => void;
	onPlaying: (playing: boolean) => void;
	onError: (error: unknown) => void;
}) {
	let timeMs = 0;
	let playing = false;
	let request: number | null = null;
	let lastTick = 0;
	let activeClip: ClipRegion | null = null;
	let playRequest = 0;
	const duration = () => getTimelineDurationMs(getClips(), video.duration * 1000);

	const pause = () => {
		playRequest++;
		playing = false;
		if (request !== null) cancelAnimationFrame(request);
		request = null;
		video.pause();
		onPlaying(false);
	};
	const playSource = () => {
		const request = ++playRequest;
		void video.play().catch((error) => {
			// A deliberate seek/pause can interrupt a pending play request.
			if (!playing || request !== playRequest) return;
			pause();
			onError(error);
		});
	};
	const sync = (seek = false) => {
		const clip = findPreviewClipAtTimelineTime(timeMs, getClips());
		const sourceMs = clip
			? getClipSourceStartMs(clip) + (timeMs - clip.startMs) * clip.speed
			: null;
		if (clip && sourceMs !== null) {
			enablePitchPreservingPlayback(video);
			try {
				video.playbackRate = clip.speed;
			} catch (error) {
				pause();
				onError(error);
				return;
			}
			if (seek || clip !== activeClip) video.currentTime = sourceMs / 1000;
			if (playing && (seek || clip !== activeClip)) playSource();
		} else {
			playRequest++;
			video.pause();
		}
		activeClip = clip;
		onTime(timeMs / 1000, sourceMs === null ? null : sourceMs / 1000);
	};
	const tick = (now: number) => {
		request = null;
		if (!playing) return;
		// Follow the media inside footage (buffering must not skip content).
		// A gap has no source clock, so advance it with elapsed real time.
		if (!activeClip) timeMs += now - lastTick;
		else if (!video.seeking) {
			timeMs = video.ended
				? activeClip.endMs
				: Math.min(
						activeClip.endMs,
						activeClip.startMs +
							(video.currentTime * 1000 - getClipSourceStartMs(activeClip)) /
								activeClip.speed,
					);
		}
		timeMs = Math.min(duration(), timeMs);
		lastTick = now;
		sync();
		if (!playing) return;
		if (timeMs >= duration()) pause();
		else request = requestAnimationFrame(tick);
	};
	return {
		get isPlaying() {
			return playing;
		},
		play: async () => {
			if (playing) return;
			if (timeMs >= duration()) timeMs = 0;
			playing = true;
			onPlaying(true);
			lastTick = performance.now();
			sync(true);
			if (playing) request = requestAnimationFrame(tick);
		},
		pause,
		seek: (seconds: number) => {
			timeMs = Math.max(0, Math.min(duration(), seconds * 1000));
			lastTick = performance.now();
			sync(true);
		},
		refresh: () => {
			timeMs = Math.min(timeMs, duration());
			sync(true);
		},
		dispose: pause,
	};
}
