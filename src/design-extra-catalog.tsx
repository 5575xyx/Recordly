import { type ComponentProps, useState } from "react";
import { createRoot } from "react-dom/client";
import { UNSAFE_PortalProvider } from "react-aria";
import "./index.css";
import { ThemeProvider } from "./contexts/ThemeContext";
import { I18nProvider, useI18n } from "./contexts/I18nContext";
import { AnnouncementDialog } from "./components/announcements/AnnouncementDialog";
import { EditorAnnouncementBanner } from "./components/announcements/EditorAnnouncementBanner";
import { LiveAnnouncementNotifications } from "./components/announcements/LiveAnnouncementNotifications";
import { Toaster } from "./components/ui/toast";
import { EditorExportMenu } from "./components/video-editor/layout/EditorExportMenu";
import { EditorPresetMenu } from "./components/video-editor/layout/EditorPresetMenu";
import { useExportSettings } from "./components/video-editor/export/useExportSettings";
import { useExportSession } from "./components/video-editor/export/useExportSession";
import { useExportStatusViewModel } from "./components/video-editor/export/useExportStatusViewModel";
import {
	DEFAULT_EDITOR_PREFERENCES,
	type EditorPresetSnapshot,
} from "./components/video-editor/editorPreferences";
import {
	DEFAULT_AUTO_CAPTION_SETTINGS,
	DEFAULT_CROP_REGION,
} from "./components/video-editor/types";
import type { ExportProgress } from "./lib/exporter";
import type { AnnouncementFeed } from "./lib/announcements";

const noop = () => undefined;
const query = new URLSearchParams(location.search);
const view = query.get("view");
const memory = new Map<string, unknown>();
const feed: AnnouncementFeed = {
	settings: { aspectRatio: "4:3" },
	announcements: [
		{
			id: "catalog-popup",
			title: "A clearer way to tell your story",
			body: "Explore the redesigned editor, with precise timeline cuts and a simpler workspace.",
			presentation: "popup",
			audience: "editor",
			priority: 20,
			mediaMode: view === "announcement-cover" ? "cover" : "banner",
			media: { type: "image", url: "/wallpapers/bluerays.jpeg", alt: "Blue rays" },
			action: { label: "Explore the editor", section: "scene" },
		},
		{
			id: "catalog-popup-next",
			title: "Create with confidence",
			body: "Keep your favorite settings together in a reusable preset.",
			presentation: "popup",
			audience: "editor",
			priority: 10,
			action: { label: "Open settings", section: "settings" },
		},
		{
			id: "catalog-banner",
			title: "A new Recordly update is available",
			body: "See what has changed in the latest release.",
			presentation: "banner",
			audience: "editor",
			priority: 20,
			action: { label: "Learn more", url: "https://recordly.dev" },
		},
		{
			id: "catalog-notification",
			title: "Your workspace is ready",
			body: "Browse the refreshed controls and save your favorite setup as a preset.",
			presentation: "notification",
			audience: "editor",
			priority: 20,
			displayDurationSeconds: 3600,
			action: { label: "View settings", section: "settings" },
		},
	],
};
Object.assign(window, {
	electronAPI: {
		getAppSetting: (key: string) =>
			key === "recordly.theme"
				? query.get("theme") === "dark"
					? "dark"
					: "light"
				: (memory.get(key) ?? null),
		setAppSetting: (key: string, value: unknown) => {
			memory.set(key, value);
			return true;
		},
		getPlatform: async () => "darwin",
		getAppVersion: async () => "1.4.0",
		getAnnouncements: async () => feed,
		openExternal: async () => ({ success: true }),
	},
});
const modes = [
	"export-settings-mp4",
	"export-settings-gif",
	"export-preparing",
	"export-rendering",
	"export-audio",
	"export-finalizing",
	"export-muxing",
	"export-saving",
	"export-success",
	"export-error",
	"export-pending-save",
	"export-legacy",
	"presets-empty",
	"presets-saved",
	"announcement-popup",
	"announcement-banner",
	"announcement-notification",
];

function ExportState({ mode }: { mode: string }) {
	const { t } = useI18n();
	const baseSettings = useExportSettings(DEFAULT_EDITOR_PREFERENCES, [], []);
	const baseSession = useExportSession();
	const exportSettings = {
		...baseSettings,
		exportFormat: mode === "export-settings-gif" ? ("gif" as const) : ("mp4" as const),
		exportPipelineModel: mode === "export-legacy" ? ("legacy" as const) : ("modern" as const),
	};
	const exporting = [
		"export-preparing",
		"export-rendering",
		"export-audio",
		"export-finalizing",
		"export-muxing",
		"export-saving",
		"export-legacy",
	].includes(mode);
	const progress: ExportProgress = {
		currentFrame: 84,
		totalFrames: 180,
		percentage: 47,
		estimatedTimeRemaining: 3,
		renderFps: 96.2,
		renderBackend: "webgpu",
		encodeBackend: "webcodecs",
		...(mode === "export-preparing" ? { phase: "preparing" as const } : {}),
		...(mode === "export-audio" ? { phase: "finalizing" as const, audioProgress: 0.62 } : {}),
		...(mode === "export-finalizing"
			? { phase: "finalizing" as const, renderProgress: 76 }
			: {}),
		...(mode === "export-muxing" ? { phase: "finalizing" as const, renderProgress: 100 } : {}),
		...(mode === "export-saving" ? { phase: "saving" as const } : {}),
	};
	const exportSession = {
		...baseSession,
		showExportDropdown: true,
		isExporting: exporting,
		exportProgress: exporting ? progress : null,
		exportError:
			mode === "export-error"
				? "The video encoder could not finish this export. Try a different export mode."
				: mode === "export-pending-save"
					? "Your video was rendered, but the destination could not be saved."
					: null,
		hasPendingExportSave: mode === "export-pending-save",
		exportedFilePath: mode === "export-success" ? "/Movies/Product walkthrough.mp4" : undefined,
	};
	const exportStatus = useExportStatusViewModel({
		t,
		settings: exportSettings,
		session: exportSession,
	});
	const exportDimensions = {
		gifOutputDimensions: { width: 960, height: 540 },
		mp4OutputDimensions: {
			medium: { width: 1280, height: 720 },
			good: { width: 1920, height: 1080 },
			high: { width: 2560, height: 1440 },
			source: { width: 1920, height: 1080 },
		},
		supportedMp4SourceDimensions: {
			width: 1920,
			height: 1080,
			capped: false,
			encoderPath: null,
		},
		ensureSupportedMp4SourceDimensions: async () => ({
			width: 1920,
			height: 1080,
			capped: false,
			encoderPath: null,
		}),
	} satisfies ComponentProps<typeof EditorExportMenu>["exportDimensions"];
	return (
		<EditorExportMenu
			projectTitle="Demo recording"
			prepareExportForShare={async () => undefined}
			onRequestShareSignIn={() => undefined}
			shareRequestNonce={0}
			t={t}
			exportSettings={exportSettings}
			exportSession={exportSession}
			exportDimensions={exportDimensions}
			exportStatus={exportStatus}
			hasCaptionsForSidecar
			nvidiaCudaExportAvailable
			experimentalNvidiaCudaExport={false}
			setExperimentalNvidiaCudaExport={noop}
			handleOpenExportDropdown={noop}
			handleExportDropdownClose={noop}
			handleCancelExport={noop}
			handleRetrySaveExport={noop}
			handleStartExportFromDropdown={noop}
			revealExportedFile={noop}
			exportMessage={null}
		/>
	);
}
function PresetState({ empty }: { empty: boolean }) {
	const { t } = useI18n();
	const snapshot: EditorPresetSnapshot = {
		...DEFAULT_EDITOR_PREFERENCES,
		cropRegion: DEFAULT_CROP_REGION,
		autoCaptionSettings: DEFAULT_AUTO_CAPTION_SETTINGS,
	};
	const presets = [
		{
			id: "clean",
			name: "Clean product demo",
			createdAt: "2026-09-19T00:00:00Z",
			updatedAt: "2026-09-19T00:00:00Z",
			snapshot,
		},
		{
			id: "social",
			name: "Social portrait",
			createdAt: "2026-09-19T00:00:00Z",
			updatedAt: "2026-09-19T00:00:00Z",
			snapshot,
		},
	];
	return (
		<EditorPresetMenu
			t={t}
			presets={{
				editorPresets: empty ? [] : presets,
				activeEditorPresetId: empty ? null : "clean",
				presetPopoverOpen: true,
				setPresetPopoverOpen: noop,
				presetNameDraft: empty ? "" : "My new preset",
				setPresetNameDraft: noop,
				currentEditorPreset: empty ? null : presets[0],
				handleApplyEditorPreset: noop,
				handleDeleteEditorPreset: noop,
				handleSavePresetSubmit: noop,
			}}
		/>
	);
}
function State({ mode }: { mode: string }) {
	if (mode.startsWith("export-")) return <ExportState mode={mode} />;
	if (mode.startsWith("presets-")) return <PresetState empty={mode === "presets-empty"} />;
	if (mode === "announcement-popup" || mode === "announcement-cover")
		return <AnnouncementDialog audience="editor" />;
	if (mode === "announcement-banner")
		return (
			<div style={{ width: 1280 }}>
				<EditorAnnouncementBanner />
			</div>
		);
	if (mode === "announcement-notification")
		return (
			<>
				<LiveAnnouncementNotifications audience="editor" />
				<Toaster className="absolute bottom-8 right-8" />
			</>
		);
	return null;
}
function ScopedState({ mode }: { mode: string }) {
	const [container, setContainer] = useState<HTMLDivElement | null>(null);
	return (
		<section data-figma-name={`Extra popup state / ${mode}`} style={{ width: 1440 }}>
			<h2 style={{ fontSize: 24, fontWeight: 600, padding: "24px 64px" }}>{mode}</h2>
			<div
				ref={setContainer}
				style={{
					position: "relative",
					width: 1440,
					height: mode.startsWith("export-settings") ? 850 : 700,
					overflow: "hidden",
					transform: "translateZ(0)",
					isolation: "isolate",
					background: "var(--surface)",
				}}
			>
				{container && (
					<UNSAFE_PortalProvider getContainer={() => container}>
						<div
							data-figma-name={`component/${mode}`}
							style={{ display: "flex", justifyContent: "center", paddingTop: 64 }}
						>
							<State mode={mode} />
						</div>
					</UNSAFE_PortalProvider>
				)}
			</div>
		</section>
	);
}
function Catalog() {
	return (
		<main
			data-figma-name="Recordly / Export presets and announcement popups"
			style={{ width: 1440, display: "flex", flexDirection: "column", gap: 48 }}
		>
			{(view ? [view] : modes).map((mode) => (
				<ScopedState key={mode} mode={mode} />
			))}
		</main>
	);
}
createRoot(document.getElementById("root")!).render(
	<ThemeProvider>
		<I18nProvider>
			<Catalog />
		</I18nProvider>
	</ThemeProvider>,
);
