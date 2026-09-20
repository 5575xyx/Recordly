import { type ComponentProps } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { SettingsPanel } from "./components/video-editor/SettingsPanel";
import {
	DEFAULT_AUTO_CAPTION_SETTINGS,
	DEFAULT_WEBCAM_OVERLAY,
	type EditorEffectSection,
} from "./components/video-editor/types";
import { I18nProvider } from "./contexts/I18nContext";
import { ShortcutsProvider } from "./contexts/ShortcutsContext";
import { ThemeProvider } from "./contexts/ThemeContext";

type PanelProps = ComponentProps<typeof SettingsPanel>;
const noop = () => undefined;
const base: PanelProps = {
	selected: "#2563eb",
	onWallpaperChange: noop,
	aspectRatio: "16:9",
	showCursor: true,
	selectedZoomDepth: 3,
	selectedZoomMode: "auto",
	selectedClipSpeed: 1,
	selectedClipMuted: false,
	selectedAudioVolume: 0.8,
	selectedAudioNormalize: true,
	webcam: {
		...DEFAULT_WEBCAM_OVERLAY,
		enabled: true,
		sourcePath: "/tests/ui/fixtures/filmstrip.mp4",
	},
	webcamPreviewSrc: "/tests/ui/fixtures/filmstrip.mp4",
	cropRegion: { x: 0, y: 0, width: 1, height: 1 },
	autoCaptionSettings: { ...DEFAULT_AUTO_CAPTION_SETTINGS, enabled: true },
	autoCaptions: [
		{ id: "caption-1", startMs: 0, endMs: 2800, text: "Create something worth sharing." },
		{ id: "caption-2", startMs: 2800, endMs: 6000, text: "Make every moment clear." },
	],
	captionCurrentTimeMs: 1000,
};

const sections: EditorEffectSection[] = [
	"scene",
	"frame",
	"crop",
	"cursor",
	"captions",
	"caption",
	"webcam",
	"settings",
	"zoom",
	"clip",
	"audio",
	"extensions",
];
const variants: { name: string; props: Partial<PanelProps> }[] = sections.flatMap((section) =>
	[false, true].map((advanced) => ({
		name: `${section} / ${advanced ? "Advanced" : "Basic"}`,
		props: {
			activeEffectSection: section,
			advanced,
			selectedZoomId: section === "zoom" ? "zoom-1" : null,
			selectedClipId: section === "clip" ? "clip-1" : null,
			selectedAudioId: section === "audio" ? "audio-1" : null,
			selectedCaptionId: section === "caption" ? "caption-1" : null,
		},
	})),
);
variants.push(
	{
		name: "Background / Image",
		props: { panelMode: "background", selected: "/wallpapers/wallpaper1.jpg" },
	},
	{
		name: "Background / Video",
		props: { panelMode: "background", selected: "/tests/ui/fixtures/filmstrip.mp4" },
	},
	{ name: "Background / Color", props: { panelMode: "background", selected: "#2563eb" } },
	{
		name: "Background / Gradient",
		props: { panelMode: "background", selected: "linear-gradient(315deg, #EC0101, #5044A9)" },
	},
	{
		name: "Zoom / Manual",
		props: {
			activeEffectSection: "zoom",
			advanced: true,
			selectedZoomId: "zoom-1",
			selectedZoomMode: "manual",
		},
	},
	{
		name: "Clip / Muted and speed override",
		props: {
			activeEffectSection: "clip",
			advanced: true,
			selectedClipId: "clip-1",
			selectedClipSpeed: 2,
			selectedClipMuted: true,
			hasClipAudioOverrides: true,
		},
	},
	{
		name: "Captions / Model unavailable",
		props: {
			activeEffectSection: "captions",
			autoCaptions: [],
			autoCaptionSettings: DEFAULT_AUTO_CAPTION_SETTINGS,
		},
	},
	{
		name: "Captions / Downloading model",
		props: {
			activeEffectSection: "captions",
			whisperModelDownloadStatus: "downloading",
			whisperModelDownloadProgress: 42,
		},
	},
	{
		name: "Captions / Model ready",
		props: {
			activeEffectSection: "captions",
			whisperModelPath: "/models/ggml-small.bin",
			whisperModelDownloadStatus: "downloaded",
		},
	},
	{
		name: "Captions / Generating",
		props: {
			activeEffectSection: "captions",
			whisperModelPath: "/models/ggml-small.bin",
			isGeneratingCaptions: true,
		},
	},
	{
		name: "Captions / Download error",
		props: { activeEffectSection: "captions", whisperModelDownloadStatus: "error" },
	},
	{
		name: "Webcam / Empty",
		props: {
			activeEffectSection: "webcam",
			webcam: DEFAULT_WEBCAM_OVERLAY,
			webcamPreviewSrc: null,
		},
	},
	{ name: "Cursor / Hidden", props: { activeEffectSection: "cursor", showCursor: false } },
	{ name: "Zoom / No selection", props: { activeEffectSection: "zoom", selectedZoomId: null } },
	{ name: "Clip / No selection", props: { activeEffectSection: "clip", selectedClipId: null } },
	{
		name: "Audio / No selection",
		props: { activeEffectSection: "audio", selectedAudioId: null },
	},
);

function Catalog() {
	return (
		<main
			data-figma-name="Recordly / Inspector catalog"
			style={{
				width: 1440,
				padding: 40,
				background: "var(--background)",
				color: "var(--foreground)",
			}}
		>
			<h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 12 }}>
				Inspectors and background panels
			</h1>
			<p style={{ marginBottom: 32 }}>
				Actual SettingsPanel components, including basic, advanced, empty and loading
				states.
			</p>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(3, 1fr)",
					alignItems: "start",
					gap: 28,
				}}
			>
				{variants.map(({ name, props }) => (
					<section
						key={name}
						data-figma-name={`Inspector / ${name}`}
						style={{
							background: "var(--surface)",
							border: "1px solid var(--separator)",
							borderRadius: 16,
							paddingTop: 20,
							overflow: "hidden",
						}}
					>
						<h2 style={{ fontSize: 18, fontWeight: 600, padding: "0 20px 20px" }}>
							{name}
						</h2>
						<div className="inspector-preview">
							<SettingsPanel {...base} {...callbacks} {...props} />
						</div>
					</section>
				))}
			</div>
		</main>
	);
}

// Keep every optional source control visible without mutating an editor project.
const callbacks = {
	onWallpaperChange: noop,
	onZoomDepthChange: noop,
	onZoomModeChange: noop,
	onZoomDelete: noop,
	onResetClipAudio: noop,
	onClipSpeedChange: noop,
	onClipMutedChange: noop,
	onClipDelete: noop,
	onAudioVolumeChange: noop,
	onAudioNormalizeChange: noop,
	onAudioDelete: noop,
	onShadowChange: noop,
	onBackgroundBlurChange: noop,
	onConnectZoomsChange: noop,
	onAutoApplyFreshRecordingAutoZoomsChange: noop,
	onZoomInDurationMsChange: noop,
	onZoomInOverlapMsChange: noop,
	onZoomOutDurationMsChange: noop,
	onConnectedZoomGapMsChange: noop,
	onConnectedZoomDurationMsChange: noop,
	onZoomInEasingChange: noop,
	onZoomOutEasingChange: noop,
	onConnectedZoomEasingChange: noop,
	onShowCursorChange: noop,
	onLoopCursorChange: noop,
	onCursorStyleChange: noop,
	onCursorSizeChange: noop,
	onCursorSmoothingChange: noop,
	onCursorSpringStiffnessMultiplierChange: noop,
	onCursorSpringDampingMultiplierChange: noop,
	onCursorSpringMassMultiplierChange: noop,
	onCameraSpringStiffnessMultiplierChange: noop,
	onCameraSpringDampingMultiplierChange: noop,
	onCameraSpringMassMultiplierChange: noop,
	onZoomClassicModeChange: noop,
	onCursorClickEffectChange: noop,
	onCursorClickEffectColorChange: noop,
	onCursorClickEffectScaleChange: noop,
	onCursorClickEffectOpacityChange: noop,
	onCursorClickEffectDurationMsChange: noop,
	onCursorClickBounceChange: noop,
	onCursorClickBounceDurationChange: noop,
	onCursorSwayChange: noop,
	onBorderRadiusChange: noop,
	onWebcamChange: noop,
	onUploadWebcam: noop,
	onClearWebcam: noop,
	onPaddingChange: noop,
	onCropChange: noop,
	onAspectRatioChange: noop,
	onAnnotationContentChange: noop,
	onAnnotationTypeChange: noop,
	onAnnotationStyleChange: noop,
	onAnnotationFigureDataChange: noop,
	onAnnotationBlurIntensityChange: noop,
	onAnnotationBlurColorChange: noop,
	onAnnotationDelete: noop,
	onAutoCaptionSettingsChange: noop,
	onPickWhisperExecutable: noop,
	onPickWhisperModel: noop,
	onGenerateAutoCaptions: noop,
	onClearAutoCaptions: noop,
	onDownloadWhisperSmallModel: noop,
	onDeleteWhisperSmallModel: noop,
	onBeginCaptionEdit: noop,
	onCaptionTextEdit: noop,
	onCaptionRetime: noop,
	onCaptionSplit: noop,
	onCaptionMerge: noop,
	onCaptionDelete: noop,
	onOpenNativeCaptureUnavailableModal: noop,
};

createRoot(document.getElementById("root")!).render(
	<ThemeProvider>
		<I18nProvider>
			<ShortcutsProvider>
				<Catalog />
			</ShortcutsProvider>
		</I18nProvider>
	</ThemeProvider>,
);
