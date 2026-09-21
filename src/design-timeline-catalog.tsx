import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { I18nProvider } from "./contexts/I18nContext";
import { ShortcutsProvider } from "./contexts/ShortcutsContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import TimelineEditor from "./components/video-editor/timeline/TimelineEditor";
import PlaybackControls from "./components/video-editor/PlaybackControls";
import { AnnotationOverlay } from "./components/video-editor/AnnotationOverlay";
import {
	DEFAULT_ANNOTATION_STYLE,
	type AnnotationRegion,
	type ClipRegion,
	type ZoomRegion,
} from "./components/video-editor/types";

const noop = () => undefined;
const media = `${location.origin}/tests/ui/fixtures/filmstrip.mp4`;
const theme = new URLSearchParams(location.search).get("theme") === "dark" ? "dark" : "light";
Object.assign(window, {
	electronAPI: {
		getAppSetting: (key: string) => (key === "recordly.theme" ? theme : null),
		setAppSetting: () => true,
		getPlatform: async () => "darwin",
		getShortcuts: async () => null,
		getVideoAudioFallbackPaths: async () => ({ success: true, paths: [] }),
		getLocalMediaUrl: async (path: string) => ({ success: true, url: path }),
	},
});
const clips: ClipRegion[] = [
	{ id: "clip-a", startMs: 0, endMs: 2800, sourceStartMs: 0, speed: 1 },
	{ id: "clip-b", startMs: 2800, endMs: 6000, sourceStartMs: 2800, speed: 1, muted: true },
];
const zooms: ZoomRegion[] = [
	{
		id: "zoom-a",
		startMs: 400,
		endMs: 1900,
		depth: 2,
		focus: { cx: 0.5, cy: 0.5 },
		mode: "auto",
	},
	{
		id: "zoom-b",
		startMs: 3400,
		endMs: 5200,
		depth: 4,
		focus: { cx: 0.7, cy: 0.3 },
		mode: "manual",
	},
];
const annotation: AnnotationRegion = {
	id: "annotation-a",
	startMs: 800,
	endMs: 2300,
	type: "text",
	content: "Make your point",
	position: { x: 16, y: 28 },
	size: { width: 68, height: 40 },
	style: {
		...DEFAULT_ANNOTATION_STYLE,
		fontSize: 64,
		backgroundColor: "#2563eb",
		borderRadius: 8,
	},
	zIndex: 1,
};
function Sample({
	name,
	children,
	height,
}: {
	name: string;
	children: React.ReactNode;
	height?: number;
}) {
	return (
		<section
			data-figma-name={`Timeline library / ${name}`}
			style={{ display: "flex", flexDirection: "column", gap: 16 }}
		>
			<h2 style={{ fontSize: 18, fontWeight: 600 }}>{name}</h2>
			<div
				data-figma-name={`component/${name}`}
				style={{
					display: "flex",
					flexDirection: "column",
					height,
					border: "1px solid var(--separator)",
					borderRadius: 12,
					padding: 16,
					background: "var(--surface)",
				}}
			>
				{children}
			</div>
		</section>
	);
}
function TimelineSample({
	selection,
}: {
	selection: "clip" | "zoom" | "annotation" | "audio" | "caption" | "empty";
}) {
	return (
		<TimelineEditor
			videoDuration={selection === "empty" ? 0 : 6}
			currentTime={2.8}
			playheadTime={2.8}
			onSeek={noop}
			videoPath={media}
			videoSourcePath={media}
			disableSuggestedZooms
			clipRegions={selection === "empty" ? [] : clips}
			zoomRegions={selection === "empty" ? [] : zooms}
			onZoomAdded={noop}
			onZoomSpanChange={noop}
			onZoomDelete={noop}
			selectedZoomId={selection === "zoom" ? "zoom-a" : null}
			onSelectZoom={noop}
			onClipSplit={noop}
			onClipSpanChange={noop}
			onClipDelete={noop}
			selectedClipId={selection === "clip" ? "clip-a" : null}
			onSelectClip={noop}
			annotationRegions={
				selection === "empty"
					? []
					: [
							annotation,
							{
								...annotation,
								id: "annotation-b",
								startMs: 3500,
								endMs: 5100,
								content: "A second callout",
								trackIndex: 1,
							},
						]
			}
			onAnnotationAdded={noop}
			onAnnotationSpanChange={noop}
			onAnnotationDelete={noop}
			onSelectAnnotation={noop}
			selectedAnnotationId={selection === "annotation" ? "annotation-a" : null}
			audioRegions={
				selection === "empty"
					? []
					: [
							{
								id: "audio-a",
								startMs: 0,
								endMs: 6000,
								audioPath: `${location.origin}/tests/ui/fixtures/preview.mp4`,
								volume: 0.8,
							},
						]
			}
			onAudioAdded={noop}
			onAudioSpanChange={noop}
			onAudioDelete={noop}
			onSelectAudio={noop}
			selectedAudioId={selection === "audio" ? "audio-a" : null}
			captionRegions={
				selection === "empty"
					? []
					: [
							{
								id: "caption-a",
								startMs: 100,
								endMs: 2000,
								text: "Welcome to Recordly",
							},
							{
								id: "caption-b",
								startMs: 2900,
								endMs: 5200,
								text: "Create something clear.",
							},
						]
			}
			captionsEnabled
			captionQuickAddEnabled
			onCaptionAdded={noop}
			onCaptionSpanChange={noop}
			onCaptionDelete={noop}
			onSelectCaption={noop}
			selectedCaptionId={selection === "caption" ? "caption-a" : null}
		/>
	);
}
function Library() {
	const [image, setImage] = useState("");
	useEffect(() => {
		void fetch("/rec-button.png")
			.then((response) => response.blob())
			.then((blob) => {
				const reader = new FileReader();
				reader.onload = () => setImage(String(reader.result));
				reader.readAsDataURL(blob);
			});
	}, []);
	return (
		<main
			style={{ width: 1440, padding: 64, display: "flex", flexDirection: "column", gap: 48 }}
		>
			<h1 style={{ fontSize: 32, fontWeight: 600 }}>
				Recordly — Timeline and preview components
			</h1>
			{(["clip", "zoom", "annotation", "audio", "caption", "empty"] as const).map(
				(selection) => (
					<Sample
						key={selection}
						name={`TimelineEditor / ${selection === "empty" ? "Empty" : `${selection} selected`}`}
						height={selection === "empty" ? 180 : 420}
					>
						<TimelineSample selection={selection} />
					</Sample>
				),
			)}
			{[
				{ name: "Paused", playing: false, volume: 1 },
				{ name: "Playing", playing: true, volume: 0.6 },
				{ name: "Muted", playing: false, volume: 0 },
			].map((state) => (
				<Sample key={state.name} name={`PlaybackControls / ${state.name}`}>
					<PlaybackControls
						isPlaying={state.playing}
						currentTime={2.8}
						duration={6}
						onTogglePlayPause={noop}
						onSeek={noop}
						volume={state.volume}
						onVolumeChange={noop}
					/>
				</Sample>
			))}
			<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
				{(["text", "figure", "image", "blur"] as const).flatMap((type) =>
					[false, true].map((selected) => {
						const name = `AnnotationOverlay / ${type} / ${selected ? "Selected" : "Default"}`;
						return (
							<Sample key={name} name={name}>
								<div
									style={{
										position: "relative",
										width: 560,
										height: 240,
										overflow: "hidden",
										background: "#182332",
									}}
								>
									<AnnotationOverlay
										annotation={{
											...annotation,
											type,
											content: type === "image" ? image : annotation.content,
											figureData: {
												arrowDirection: "right",
												color: "#2563eb",
												strokeWidth: 4,
											},
											blurIntensity: 40,
											blurColor: "rgba(255,255,255,.15)",
										}}
										isSelected={selected}
										containerWidth={560}
										containerHeight={240}
										recordingRect={{ x: 0, y: 0, width: 560, height: 240 }}
										sceneTransform={{ scale: 1, x: 0, y: 0 }}
										onPositionChange={noop}
										onSizeChange={noop}
										onClick={noop}
										zIndex={1}
										isSelectedBoost={selected}
									/>
								</div>
							</Sample>
						);
					}),
				)}
			</div>
		</main>
	);
}
createRoot(document.getElementById("root")!).render(
	<ThemeProvider>
		<I18nProvider>
			<ShortcutsProvider>
				<Library />
			</ShortcutsProvider>
		</I18nProvider>
	</ThemeProvider>,
);
