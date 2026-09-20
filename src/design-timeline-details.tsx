import { TimelineContext, useTimelineContext } from "dnd-timeline";
import { useCallback, useRef } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import KeyframeMarkers from "./components/video-editor/timeline/components/markers/KeyframeMarkers";
import AudioWaveform from "./components/video-editor/timeline/components/waveform/AudioWaveform";
import { ThemeProvider } from "./contexts/ThemeContext";

const noop = () => undefined;
const peaks = {
	durationMs: 6000,
	peaks: Float32Array.from(
		{ length: 100 },
		(_, index) => Math.abs(Math.sin(index * 0.47) * Math.cos(index * 0.13)) * 0.85 + 0.03,
	),
};
const samples = [
	{ name: "KeyframeMarkers / Default", markers: true, selected: false, normalized: false },
	{ name: "KeyframeMarkers / Selected", markers: true, selected: true, normalized: false },
	{ name: "AudioWaveform / Normal", markers: false, selected: false, normalized: false },
	{ name: "AudioWaveform / Normalized", markers: false, selected: false, normalized: true },
];
function Detail({ sample }: { sample: (typeof samples)[number] }) {
	const { setTimelineRef, style } = useTimelineContext();
	const timelineRef = useRef<HTMLDivElement | null>(null);
	const setRef = useCallback(
		(node: HTMLDivElement | null) => {
			timelineRef.current = node;
			setTimelineRef(node);
		},
		[setTimelineRef],
	);
	return (
		<div
			ref={setRef}
			data-figma-name={`component/${sample.name}`}
			style={{
				...style,
				position: "relative",
				height: 96,
				width: 500,
				background: sample.markers ? "var(--surface)" : "#dbe9df",
				border: "1px solid var(--separator)",
				borderRadius: 8,
			}}
		>
			{sample.markers ? (
				<KeyframeMarkers
					keyframes={[{ id: "keyframe-1", time: 3000 }]}
					selectedKeyframeId={sample.selected ? "keyframe-1" : null}
					setSelectedKeyframeId={noop}
					onKeyframeMove={noop}
					videoDurationMs={6000}
					timelineRef={timelineRef}
				/>
			) : (
				<AudioWaveform peaks={peaks} normalize={sample.normalized} />
			)}
		</div>
	);
}
createRoot(document.getElementById("root")!).render(
	<ThemeProvider>
		<main
			style={{
				width: 1200,
				padding: 40,
				background: "var(--background)",
				color: "var(--foreground)",
			}}
		>
			<h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 32 }}>
				Timeline detail components
			</h1>
			<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
				{samples.map((sample) => (
					<section key={sample.name} data-figma-name={sample.name}>
						<h2 style={{ fontSize: 18, marginBottom: 20 }}>{sample.name}</h2>
					<TimelineContext range={{ start: 0, end: 6000 }} onRangeChanged={noop} onResizeEnd={noop}>
							<Detail sample={sample} />
						</TimelineContext>
					</section>
				))}
			</div>
		</main>
	</ThemeProvider>,
);
