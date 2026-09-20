import { FolderOpen, Microphone, Timer } from "@phosphor-icons/react";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { UNSAFE_PortalProvider } from "react-aria";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./components/launch/launchTheme.css";
import { HudInteractionContext } from "./components/launch/contexts/HudInteractionContext";
import { MarqueeText } from "./components/launch/MarqueeText";
import { CountdownPopover } from "./components/launch/popovers/CountdownPopover";
import {
	LaunchPopoverCoordinatorProvider,
	useLaunchPopoverCoordinator,
} from "./components/launch/popovers/LaunchPopoverCoordinator";
import { MicPopover } from "./components/launch/popovers/MicPopover";
import { MorePopover } from "./components/launch/popovers/MorePopover";
import { DropdownItem, MicDeviceRow } from "./components/launch/popovers/PopoverScaffold";
import { ProjectPopover } from "./components/launch/popovers/ProjectPopover";
import { SourcePopover } from "./components/launch/popovers/SourcePopover";
import { WebcamPopover } from "./components/launch/popovers/WebcamPopover";
import { RecordingControls } from "./components/launch/RecordingControls";
import { SourceSelectorContent } from "./components/launch/SourceSelector";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "./components/ui/select";
import { AudioLevelMeter } from "./components/ui/audio-level-meter";
import { Button } from "./components/ui/button";
import { ColorControl, ColorPalette } from "./components/ui/color-picker";
import { ContentClamp } from "./components/ui/content-clamp";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "./components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";
import ItemContent from "./components/ui/item-content";
import { Popover, PopoverContent, PopoverTrigger } from "./components/ui/popover";
import { Toaster, toast } from "./components/ui/toast";
import { AddCustomFontDialog } from "./components/video-editor/AddCustomFontDialog";
import { AnnotationSettingsPanel } from "./components/video-editor/AnnotationSettingsPanel";
import CaptionListPanel from "./components/video-editor/CaptionListPanel";
import { CropControl } from "./components/video-editor/CropControl";
import { ExportSettingsMenu } from "./components/video-editor/ExportSettingsMenu";
import ExtensionManager from "./components/video-editor/ExtensionManager";
import { FormatSelector } from "./components/video-editor/FormatSelector";
import { GifOptionsPanel } from "./components/video-editor/GifOptionsPanel";
import { KeyboardShortcutsHelp } from "./components/video-editor/KeyboardShortcutsHelp";
import { CropEditorDialog } from "./components/video-editor/layout/CropEditorDialog";
import { EditorDialogs } from "./components/video-editor/layout/EditorDialogs";
import {
	FeedbackDialog,
	KeyboardShortcutsDialog,
	TutorialHelp,
} from "./components/video-editor/TutorialHelp";
import { EditorLoadingSkeleton } from "./components/video-editor/layout/EditorLoadingSkeleton";
import ProjectBrowserDialog from "./components/video-editor/ProjectBrowserDialog";
import { ShortcutsConfigDialog } from "./components/video-editor/ShortcutsConfigDialog";
import { SliderControl } from "./components/video-editor/SliderControl";
import {
	type AnnotationType,
	DEFAULT_ANNOTATION_POSITION,
	DEFAULT_ANNOTATION_SIZE,
	DEFAULT_ANNOTATION_STYLE,
	DEFAULT_FIGURE_DATA,
} from "./components/video-editor/types";
import { WallpaperGrid } from "./components/video-editor/WallpaperGrid";
import { WebcamCropControl } from "./components/video-editor/WebcamCropControl";
import { I18nProvider, useI18n } from "./contexts/I18nContext";
import { ShortcutsProvider, useShortcuts } from "./contexts/ShortcutsContext";
import { ThemeProvider } from "./contexts/ThemeContext";

const noop = () => undefined;
const view = new URLSearchParams(location.search).get("view") ?? "gallery";
const palette = ["#2563eb", "#a855f7", "#f43f5e", "#f59e0b", "#10b981", "#ffffff", "#171717"];
const entries = [
	{
		path: "/design-fixtures/product-demo.recordly",
		name: "Product demo",
		updatedAt: 1789800000000,
		thumbnailPath: null,
		isCurrent: true,
		isInProjectsDirectory: true,
	},
	{
		path: "/design-fixtures/onboarding.recordly",
		name: "Onboarding walkthrough",
		updatedAt: 1789710000000,
		thumbnailPath: null,
		isCurrent: false,
		isInProjectsDirectory: true,
	},
];
const screenSources = [
	{
		id: "screen:1:0",
		name: "Built-in Display",
		thumbnail: null,
		display_id: "1",
		appIcon: null,
		sourceType: "screen" as const,
	},
];
const windowSources = [
	{
		id: "window:1:0",
		name: "Product walkthrough",
		thumbnail: null,
		display_id: "1",
		appIcon: null,
		sourceType: "window" as const,
		appName: "Browser",
	},
];

function Sample({
	name,
	children,
	width = 396,
}: {
	name: string;
	children: ReactNode;
	width?: number;
}) {
	return (
		<article
			data-figma-name={`App / ${name}`}
			style={{
				display: "flex",
				flexDirection: "column",
				gap: 16,
				padding: 24,
				width,
				background: "var(--surface)",
				borderRadius: 12,
				alignSelf: "flex-start",
			}}
		>
			<h3 style={{ fontSize: 13, color: "var(--muted)", fontWeight: 600 }}>{name}</h3>
			<div data-figma-name={`component/${name}`}>{children}</div>
		</article>
	);
}
function Section({ name, children }: { name: string; children: ReactNode }) {
	return (
		<section
			data-figma-name={name}
			style={{ display: "flex", flexDirection: "column", gap: 24 }}
		>
			<h2 style={{ fontSize: 24, fontWeight: 600 }}>{name}</h2>
			<div style={{ display: "flex", flexWrap: "wrap", gap: 24, alignItems: "flex-start" }}>
				{children}
			</div>
		</section>
	);
}
function ExportSample({ format }: { format: "mp4" | "gif" }) {
	return (
		<ExportSettingsMenu
			exportFormat={format}
			exportQuality="good"
			exportEncodingMode="balanced"
			mp4FrameRate={30}
			gifFrameRate={20}
			gifLoop
			gifSizePreset="medium"
			gifOutputDimensions={{ width: 960, height: 540 }}
			showCaptionSidecarOption
			includeCaptionSidecar
			onExport={noop}
		/>
	);
}
function AnnotationSample({ type }: { type: AnnotationType }) {
	return (
		<AnnotationSettingsPanel
			annotation={{
				id: `catalog-${type}`,
				type,
				startMs: 0,
				endMs: 3000,
				content: type === "text" ? "Your next great idea" : "",
				position: DEFAULT_ANNOTATION_POSITION,
				size: DEFAULT_ANNOTATION_SIZE,
				style: DEFAULT_ANNOTATION_STYLE,
				zIndex: 1,
				figureData: DEFAULT_FIGURE_DATA,
				blurIntensity: 20,
				blurColor: "#000000",
			}}
			onContentChange={noop}
			onTypeChange={noop}
			onStyleChange={noop}
			onFigureDataChange={noop}
			onBlurIntensityChange={noop}
			onBlurColorChange={noop}
			onDelete={noop}
		/>
	);
}
function Gallery() {
	return (
		<main
			style={{ width: 1440, padding: 64, display: "flex", flexDirection: "column", gap: 64 }}
		>
			<h1 style={{ fontSize: 32, fontWeight: 600 }}>Recordly — App component catalog</h1>
			<Section name="Shared utility components">
				<Sample name="ColorPalette">
					<ColorPalette color="#2563eb" colors={palette} onChange={noop} />
				</Sample>
				<Sample name="ColorControl">
					<div style={{ display: "flex", gap: 12 }}>
						<ColorControl
							value="#2563eb"
							label="Background"
							colors={palette}
							onChange={noop}
						/>
						<ColorControl value="transparent" label="No fill" compact onChange={noop} />
					</div>
				</Sample>
				<Sample name="ContentClamp">
					<ContentClamp truncateLength={32}>
						A deliberately long recording title that truncates while preserving its full
						text in the tooltip
					</ContentClamp>
				</Sample>
				<Sample name="ItemContent">
					<ItemContent classes="bg-default">
						<FolderOpen size={20} />
						<span>Product demo recording</span>
					</ItemContent>
				</Sample>
				{[12, 72, 94].map((level) => (
					<Sample key={level} name={`AudioLevelMeter / ${level}`}>
						<AudioLevelMeter level={level} />
					</Sample>
				))}
			</Section>
			<Section name="Recording and source selection">
				{[false, true].map((paused) => (
					<Sample
						key={String(paused)}
						name={`RecordingControls / ${paused ? "Paused" : "Recording"}`}
						width={612}
					>
						<div className="launch-theme flex items-center gap-2">
							<RecordingControls
								paused={paused}
								microphoneEnabled={!paused}
								elapsed={83}
								onToggleMicrophone={noop}
								onPauseResume={noop}
								onStopRecording={noop}
								onHideHud={noop}
								onCancelRecording={noop}
								formatTime={() => "01:23"}
							/>
						</div>
					</Sample>
				))}
				<Sample name="SourceSelectorContent / Sources">
					<SourceSelectorContent
						screenSources={screenSources}
						windowSources={windowSources}
						selectedSource="Built-in Display"
					/>
				</Sample>
				<Sample name="SourceSelectorContent / Empty">
					<SourceSelectorContent />
				</Sample>
				<Sample name="SourceSelectorContent / Loading">
					<SourceSelectorContent loading />
				</Sample>
				<Sample name="DropdownItem / Selected">
					<DropdownItem selected icon={<Timer size={16} />} onClick={noop}>
						3s countdown
					</DropdownItem>
					<DropdownItem icon={<Microphone size={16} />} onClick={noop}>
						Microphone
					</DropdownItem>
				</Sample>
				<Sample name="MicDeviceRow / Selected and unselected">
					<MicDeviceRow
						device={{ deviceId: "fixture-mic", label: "Built-in microphone" }}
						selected
						onSelect={noop}
					/>
					<MicDeviceRow
						device={{ deviceId: "fixture-usb", label: "USB microphone" }}
						selected={false}
						onSelect={noop}
					/>
				</Sample>
				<Sample name="MarqueeText">
					<MarqueeText text="A very long display name for the current selected application window" />
				</Sample>
			</Section>
			<Section name="Project library">
				<Sample name="ProjectBrowserDialog / Populated">
					<ProjectBrowserDialog
						open
						onOpenChange={noop}
						entries={entries}
						onOpenProject={noop}
						onImportFile={noop}
						renderMode="inline"
					/>
				</Sample>
				<Sample name="ProjectBrowserDialog / Empty">
					<ProjectBrowserDialog
						open
						onOpenChange={noop}
						entries={[]}
						onOpenProject={noop}
						onImportFile={noop}
						renderMode="inline"
					/>
				</Sample>
				<Sample name="ExtensionManager / Legacy">
					<ExtensionManager />
				</Sample>
			</Section>
			<Section name="Export controls">
				<Sample name="FormatSelector / MP4">
					<FormatSelector selectedFormat="mp4" onFormatChange={noop} />
				</Sample>
				<Sample name="FormatSelector / GIF">
					<FormatSelector selectedFormat="gif" onFormatChange={noop} />
				</Sample>
				<Sample name="GifOptionsPanel">
					<GifOptionsPanel
						frameRate={20}
						onFrameRateChange={noop}
						loop
						onLoopChange={noop}
						sizePreset="medium"
						onSizePresetChange={noop}
						outputDimensions={{ width: 960, height: 540 }}
					/>
				</Sample>
				<Sample name="ExportSettingsMenu / MP4" width={612}>
					<ExportSample format="mp4" />
				</Sample>
				<Sample name="ExportSettingsMenu / GIF" width={612}>
					<ExportSample format="gif" />
				</Sample>
			</Section>
			<Section name="Editor controls">
				<Sample name="SliderControl">
					<SliderControl
						label="Padding"
						value={24}
						min={0}
						max={100}
						step={1}
						onChange={noop}
						formatValue={(v) => `${v}px`}
					/>
				</Sample>
				<Sample name="WebcamCropControl">
					<WebcamCropControl
						cropRegion={{ x: 0.1, y: 0.1, width: 0.8, height: 0.8 }}
						onCropChange={noop}
					/>
				</Sample>
				<Sample name="CropControl">
					<CropControl
						videoElement={null}
						cropRegion={{ x: 0.1, y: 0.1, width: 0.8, height: 0.8 }}
						onCropChange={noop}
						aspectRatio="16:9"
					/>
				</Sample>
				<Sample name="WallpaperGrid">
					<WallpaperGrid
						items={[1, 2, 3, 4].map((i) => ({
							key: String(i),
							value: String(i),
							previewUrl: `/wallpapers/wallpaper${i}.jpg`,
							label: `Wallpaper ${i}`,
							removable: i === 4,
						}))}
						addLabel="Add wallpaper"
						onAdd={noop}
						onSelect={noop}
						onRemove={noop}
						isSelected={(value) => value === "1"}
					/>
				</Sample>
				<Sample name="CaptionListPanel / Editing">
					<CaptionListPanel
						cues={[
							{
								id: "caption-1",
								startMs: 0,
								endMs: 2000,
								text: "Create something worth sharing.",
							},
							{
								id: "caption-2",
								startMs: 2000,
								endMs: 5000,
								text: "Record, refine, and export.",
							},
						]}
						selectedCaptionId="caption-1"
						currentTimeMs={1000}
						onBeginCaptionEdit={noop}
						onCaptionTextEdit={noop}
						onCaptionRetime={noop}
						onCaptionSplit={noop}
						onCaptionMerge={noop}
						onCaptionDelete={noop}
					/>
				</Sample>
			</Section>
			<Section name="Annotation inspectors">
				{(["text", "figure", "blur", "image"] as const).map((type) => (
					<Sample key={type} name={`AnnotationSettingsPanel / ${type}`}>
						<AnnotationSample type={type} />
					</Sample>
				))}
			</Section>
		</main>
	);
}
function OpenLaunchPopover({ mode }: { mode: string }) {
	const { requestOpen } = useLaunchPopoverCoordinator();
	useEffect(() => {
		requestOpen(mode.replace("launch-", "").replace("-devices", ""));
	}, [requestOpen, mode]);
	const trigger = <Button variant="secondary">{mode.replace("launch-", "")} options</Button>;
	return (
		<div
			className="launch-theme"
			style={{ paddingTop: 650, display: "flex", justifyContent: "center", width: 1440 }}
		>
			{mode === "launch-countdown" && (
				<CountdownPopover trigger={trigger} countdownDelay={3} onSelectDelay={noop} />
			)}
			{(mode === "launch-mic" || mode === "launch-mic-devices") && (
				<MicPopover
					trigger={trigger}
					systemAudioEnabled
					onToggleSystemAudio={noop}
					microphoneEnabled={mode === "launch-mic-devices"}
					onDisableMicrophone={noop}
					devices={
						mode === "launch-mic-devices"
							? [
									{ deviceId: "fixture-mic", label: "Built-in microphone" },
									{ deviceId: "fixture-usb", label: "USB microphone" },
								]
							: []
					}
					microphoneDeviceId="fixture-mic"
					onSelectDevice={noop}
				/>
			)}
			{(mode === "launch-webcam" || mode === "launch-webcam-devices") && (
				<WebcamPopover
					trigger={trigger}
					webcamEnabled={mode === "launch-webcam-devices"}
					onDisableWebcam={noop}
					canToggleFloatingPreview
					showFloatingWebcamPreview
					onToggleFloatingPreview={noop}
					showWebcamControls={false}
					setWebcamPreviewNode={noop}
					videoDevices={
						mode === "launch-webcam-devices"
							? [
									{ deviceId: "fixture-camera", label: "Built-in camera" },
									{ deviceId: "fixture-webcam", label: "USB webcam" },
								]
							: []
					}
					webcamDeviceId="fixture-camera"
					onSelectVideoDevice={noop}
				/>
			)}
			{mode === "launch-more" && (
				<MorePopover
					trigger={trigger}
					supportsHudCaptureProtection
					hideHudFromCapture
					onToggleHudCaptureProtection={noop}
					onChooseRecordingsDirectory={noop}
					onOpenVideoFile={noop}
					onOpenProjectBrowser={noop}
					showDevUpdatePreview={false}
					onPreviewUpdateUi={noop}
					appVersion="1.4.0"
				/>
			)}
			{mode === "launch-sources" && (
				<SourcePopover
					trigger={trigger}
					selectedSource="Built-in Display"
					onSourceSelect={noop}
				/>
			)}
			{mode === "launch-projects" && (
				<ProjectPopover trigger={trigger} entries={entries} onOpenProject={noop} />
			)}
		</div>
	);
}
function ProjectDialogState({ mode }: { mode: string }) {
	const { t } = useI18n();
	const inputRef = useRef<HTMLInputElement>(null);
	const anchorRef = useRef<HTMLButtonElement>(null);
	return (
		<EditorDialogs
			t={t}
			projectSaveDialogOpen={mode === "project-save" || mode === "project-saving"}
			setProjectSaveDialogOpen={noop}
			projectSaveDialogDraft="Product walkthrough"
			setProjectSaveDialogDraft={noop}
			projectSaveDialogInputRef={inputRef}
			isSavingProjectDialog={mode === "project-saving"}
			resolveProjectSaveDialog={noop}
			handleProjectSaveDialogSubmit={async () => undefined}
			unsavedChangesDialogOpen={mode === "unsaved-changes"}
			setUnsavedChangesDialogOpen={noop}
			unsavedChangesDialogActionLabel="open another project"
			resolveUnsavedChangesDialog={noop}
			projectBrowserOpen={false}
			setProjectBrowserOpen={noop}
			projectLibraryEntries={entries}
			projectBrowserAnchorRef={anchorRef}
			handleImportMediaOrProject={async () => undefined}
			handleOpenProjectFromLibrary={async () => undefined}
			nativeCaptureUnavailableModalOpen={mode === "native-capture-unavailable"}
			setNativeCaptureUnavailableModalOpen={noop}
		/>
	);
}
function OverlayViews({ mode }: { mode: string }) {
	const triggerRoot = useRef<HTMLElement>(null);
	const { t } = useI18n();
	const { openConfig } = useShortcuts();
	useEffect(() => {
		if (mode === "shortcuts") openConfig();
		if (mode === "toast") {
			toast.success("Export complete", {
				id: "catalog-export",
				description: "Your recording is ready to share.",
				duration: Infinity,
				action: { label: "Show file", onClick: noop },
			});
		}
		const timer = setTimeout(() => {
			if (
				[
					"font",
					"keyboard-help",
					"color",
					"feedback",
					"keyboard-dialog",
					"tutorial",
				].includes(mode)
			)
				triggerRoot.current
					?.querySelector<HTMLButtonElement>("[data-catalog-trigger] button")
					?.click();
		}, 500);
		return () => clearTimeout(timer);
	}, [openConfig, mode]);
	if (mode.startsWith("launch-")) return <OpenLaunchPopover mode={mode} />;
	if (mode === "loading") return <EditorLoadingSkeleton />;
	return (
		<main
			ref={triggerRoot}
			data-figma-name={`App state / ${mode}`}
			style={{ width: 1440, height: 1000, padding: 120, background: "var(--background)" }}
		>
			<h1 style={{ fontSize: 24, marginBottom: 40 }}>Recordly · {mode}</h1>
			{mode === "dialog" && (
				<Dialog open>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Save your project</DialogTitle>
							<DialogDescription>
								Keep your recording and edits together so you can continue later.
							</DialogDescription>
						</DialogHeader>
						<DialogFooter>
							<Button variant="secondary">Cancel</Button>
							<Button>Save project</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			)}
			{mode === "popover" && (
				<Popover open>
					<PopoverTrigger>
						<Button>Preview options</Button>
					</PopoverTrigger>
					<PopoverContent>
						<h3>Preview options</h3>
						<p>Adjust the recording preview.</p>
						<AudioLevelMeter level={48} />
					</PopoverContent>
				</Popover>
			)}
			{mode === "dropdown" && (
				<DropdownMenu open>
					<DropdownMenuTrigger>
						<Button>Project actions</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem id="save">
							Save project<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
						</DropdownMenuItem>
						<DropdownMenuItem id="duplicate">Duplicate project</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem id="delete" variant="danger">
							Delete project
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)}
			{mode === "select" && (
				<Select isOpen value="balanced">
					<SelectTrigger className="w-64">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="fast">Fast</SelectItem>
						<SelectItem value="balanced">Balanced</SelectItem>
						<SelectItem value="quality">Best quality</SelectItem>
						<SelectItem value="unavailable" disabled>
							Unavailable
						</SelectItem>
					</SelectContent>
				</Select>
			)}
			{mode === "toast" && <Toaster />}
			{mode === "font" && (
				<div data-catalog-trigger>
					<AddCustomFontDialog />
				</div>
			)}
			{mode === "keyboard-help" && (
				<div data-catalog-trigger>
					<KeyboardShortcutsHelp />
				</div>
			)}
			{mode === "color" && (
				<div data-catalog-trigger>
					<ColorControl
						value="#2563eb"
						onChange={noop}
						label="Background color"
						colors={palette}
					/>
				</div>
			)}
			{mode === "feedback" && (
				<div data-catalog-trigger>
					<FeedbackDialog />
				</div>
			)}
			{mode === "keyboard-dialog" && (
				<div data-catalog-trigger>
					<KeyboardShortcutsDialog />
				</div>
			)}
			{mode === "tutorial" && (
				<div data-catalog-trigger>
					<TutorialHelp />
				</div>
			)}
			{[
				"project-save",
				"project-saving",
				"unsaved-changes",
				"native-capture-unavailable",
			].includes(mode) && <ProjectDialogState mode={mode} />}
			{mode === "shortcuts" && <ShortcutsConfigDialog />}
			{mode === "crop-dialog" && (
				<CropEditorDialog
					open
					t={t}
					videoElement={null}
					cropRegion={{ x: 0.1, y: 0.1, width: 0.8, height: 0.8 }}
					setCropRegion={noop}
					aspectRatio="16:9"
					onCancel={noop}
					onDone={noop}
				/>
			)}
		</main>
	);
}
const overlayModes = [
	"launch-mic-devices",
	"launch-webcam-devices",
	"select",
	"project-save",
	"project-saving",
	"unsaved-changes",
	"native-capture-unavailable",
	"feedback",
	"keyboard-dialog",
	"tutorial",
	"dialog",
	"popover",
	"dropdown",
	"toast",
	"font",
	"keyboard-help",
	"color",
	"shortcuts",
	"crop-dialog",
	"loading",
	"launch-countdown",
	"launch-mic",
	"launch-webcam",
	"launch-more",
	"launch-sources",
	"launch-projects",
];

/** Keep real portals inside their own preview canvas without duplicating React roots. */
function ScopedState({ mode }: { mode: string }) {
	const [container, setContainer] = useState<HTMLDivElement | null>(null);
	return (
		<section data-figma-name={`Popup state / ${mode}`} style={{ width: 1440 }}>
			<h2 style={{ fontSize: 24, fontWeight: 600, padding: "24px 32px" }}>{mode}</h2>
			<div
				ref={setContainer}
				style={{
					position: "relative",
					width: 1440,
					height: 1000,
					overflow: "hidden",
					transform: "translateZ(0)",
					isolation: "isolate",
				}}
			>
				{container && (
					<UNSAFE_PortalProvider getContainer={() => container}>
						<ShortcutsProvider>
							<LaunchPopoverCoordinatorProvider>
								<OverlayViews mode={mode} />
							</LaunchPopoverCoordinatorProvider>
						</ShortcutsProvider>
					</UNSAFE_PortalProvider>
				)}
			</div>
		</section>
	);
}
function AllStates() {
	return (
		<main
			data-figma-name="Recordly / All popup states"
			style={{ width: 1440, display: "flex", flexDirection: "column", gap: 48 }}
		>
			{overlayModes.map((mode) => (
				<ScopedState key={mode} mode={mode} />
			))}
		</main>
	);
}
createRoot(document.getElementById("root")!).render(
	<ThemeProvider>
		<I18nProvider>
			<ShortcutsProvider>
				<HudInteractionContext.Provider value={{ onMouseEnter: noop, onMouseLeave: noop }}>
					<LaunchPopoverCoordinatorProvider>
						{view === "gallery" ? (
							<Gallery />
						) : view === "all-states" ? (
							<AllStates />
						) : (
							<OverlayViews mode={view} />
						)}
					</LaunchPopoverCoordinatorProvider>
				</HudInteractionContext.Provider>
			</ShortcutsProvider>
		</I18nProvider>
	</ThemeProvider>,
);
