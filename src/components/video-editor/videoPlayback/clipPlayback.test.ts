import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { ClipRegion } from "../types";
import { createClipPlayback } from "./clipPlayback";

describe("clip timeline playback", () => {
	let now = 0;
	let tick: FrameRequestCallback | undefined;
	beforeEach(() => {
		now = 0;
		tick = undefined;
		vi.spyOn(performance, "now").mockImplementation(() => now);
		vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => {
			tick = callback;
			return 1;
		});
		vi.stubGlobal("cancelAnimationFrame", () => {
			tick = undefined;
		});
	});
	afterEach(() => {
		vi.restoreAllMocks();
		vi.unstubAllGlobals();
	});
	const advance = (milliseconds: number) => {
		now += milliseconds;
		const callback = tick;
		tick = undefined;
		callback?.(now);
	};
	function setup(
		clips: ClipRegion[] = [
			{ id: "left", startMs: 0, endMs: 1000, sourceStartMs: 0, speed: 3 },
			{ id: "right", startMs: 2000, endMs: 4000, sourceStartMs: 6000, speed: 3 },
		],
	) {
		const video = {
			duration: 12,
			currentTime: 0,
			seeking: false,
			playbackRate: 1,
			play: vi.fn(async () => {}),
			pause: vi.fn(),
		} as unknown as HTMLVideoElement;
		const onTime = vi.fn();
		const onPlaying = vi.fn();
		const onError = vi.fn();
		const playback = createClipPlayback({
			video,
			getClips: () => clips,
			onTime,
			onPlaying,
			onError,
		});
		return { video, playback, onTime, onPlaying, onError };
	}
	it("takes real time through a deleted middle at 3x, then resumes at the retained source in-point", async () => {
		const { video, playback, onTime } = setup();
		await playback.play();
		expect(video.playbackRate).toBe(3);
		video.currentTime = 3;
		advance(1000);
		expect(onTime).toHaveBeenLastCalledWith(1, null);
		expect(playback.isPlaying).toBe(true);
		advance(500);
		expect(onTime).toHaveBeenLastCalledWith(1.5, null);
		advance(500);
		expect(video.currentTime).toBe(6);
		expect(onTime).toHaveBeenLastCalledWith(2, 6);
		video.currentTime = 9;
		advance(1000);
		expect(onTime).toHaveBeenLastCalledWith(3, 9);
		video.currentTime = 12;
		advance(1000);
		expect(playback.isPlaying).toBe(false);
	});
	it("seeks, pauses and resumes inside a gap without revealing source footage or restarting the gap", async () => {
		const { video, playback, onTime } = setup();
		playback.seek(1.25);
		expect(onTime).toHaveBeenLastCalledWith(1.25, null);
		await playback.play();
		expect(video.play).not.toHaveBeenCalled();
		advance(250);
		playback.pause();
		advance(5000);
		expect(onTime).toHaveBeenLastCalledWith(1.5, null);
		await playback.play();
		advance(250);
		expect(onTime).toHaveBeenLastCalledWith(1.75, null);
	});
	it("does not skip footage when source playback stalls or a seek is pending", async () => {
		const { video, playback, onTime } = setup();
		await playback.play();
		advance(5000);
		expect(onTime).toHaveBeenLastCalledWith(0, 0);
		playback.seek(3);
		Object.assign(video, { seeking: true, currentTime: 0 });
		advance(2000);
		expect(onTime).toHaveBeenLastCalledWith(3, 9);
	});
	it("plays leading gaps and clips placed earlier than their source positions", async () => {
		const { video, playback, onTime } = setup([
			{ id: "moved", startMs: 1000, endMs: 2000, sourceStartMs: 9000, speed: 1 },
		]);
		await playback.play();
		advance(500);
		expect(onTime).toHaveBeenLastCalledWith(0.5, null);
		advance(500);
		expect(video.currentTime).toBe(9);
		expect(video.playbackRate).toBe(1);
	});
	it("stops and reports an actual source playback failure", async () => {
		const { video, playback, onError } = setup();
		const error = new DOMException("unsupported", "NotSupportedError");
		vi.mocked(video.play).mockRejectedValue(error);
		await playback.play();
		expect(onError).toHaveBeenCalledWith(error);
		expect(playback.isPlaying).toBe(false);
	});
});
