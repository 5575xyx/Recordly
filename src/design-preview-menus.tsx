// The three SourceMenu JSX branches below are extracted from
// components/video-editor/layout/EditorPreviewPanel.tsx for design capture.
// Only the menu roots are forced open; contents, styles and handlers stay source exact.
// This isolates its menus without mounting the video compositor.
import { useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { UNSAFE_PortalProvider } from "react-aria";
import { CaretDown, Check, Plus, SpeakerHigh, SpeakerLow, SpeakerX } from "@phosphor-icons/react";
import "./index.css";
import { ThemeProvider } from "./contexts/ThemeContext";
import { I18nProvider, useI18n } from "./contexts/I18nContext";
import { Button } from "./components/ui/button";
import { Slider } from "./components/ui/slider";
import { Popover, PopoverContent, PopoverTrigger } from "./components/ui/popover";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";
import { ASPECT_RATIOS, type AspectRatio, getAspectRatioLabel } from "./utils/aspectRatioUtils";
import { useTimelineState } from "./components/video-editor/state/useTimelineState";
import type { TimelineEditorHandle } from "./components/video-editor/timeline/TimelineEditor";
const noop = () => undefined;
const query = new URLSearchParams(location.search);
Object.assign(window, {
	electronAPI: {
		getAppSetting: (key: string) =>
			key === "recordly.theme" ? (query.get("theme") === "dark" ? "dark" : "light") : null,
		setAppSetting: () => true,
		getPlatform: async () => "darwin",
	},
});
const modes = ["aspect-ratio", "add-layer", "preview-volume"] as const;
type Mode = (typeof modes)[number];
function SourceMenu({ mode }: { mode: Mode }) {
	const { t } = useI18n();
	const [aspectRatio, setAspectRatio] = useState<AspectRatio>("16:9");
	const [previewVolume, setPreviewVolume] = useState(0.72);
	const timeline = useTimelineState();
	const timelineRef = useRef<TimelineEditorHandle>({
		addZoom: noop,
		suggestZooms: noop,
		splitClip: noop,
		addAnnotation: noop,
		addAudio: async () => undefined,
		keyframes: [],
	});

	return (
		<div data-figma-name={`component/EditorPreviewPanel/${mode}`}>
			{mode === "aspect-ratio" ? (
				<DropdownMenu open>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="sm" className="h-7 gap-1 px-2 text-xs">
							<span className="font-medium">{getAspectRatioLabel(aspectRatio)}</span>
							<CaretDown className="h-3 w-3" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="center">
						{ASPECT_RATIOS.map((ratio) => (
							<DropdownMenuItem
								key={ratio}
								onClick={() => setAspectRatio(ratio)}
								className="flex cursor-pointer items-center justify-between gap-3 text-muted-foreground hover:bg-foreground/10 hover:text-foreground"
							>
								<span>{getAspectRatioLabel(ratio)}</span>
								{aspectRatio === ratio ? (
									<Check className="h-3 w-3 text-[#2563EB]" />
								) : null}
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			) : mode === "add-layer" ? (
				<DropdownMenu open>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="sm" className="h-9 gap-2 px-3">
							<Plus className="h-3.5 w-3.5" />
							<span className="font-medium">{t("editor.toolbar.addLayer")}</span>
							<CaretDown className="h-3 w-3" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="start">
						<DropdownMenuItem
							onClick={() => {
								const nextTrack =
									timeline.annotationRegions.length > 0
										? Math.max(
												...timeline.annotationRegions.map(
													(region) => region.trackIndex ?? 0,
												),
											) + 1
										: 0;
								timelineRef.current?.addAnnotation(nextTrack);
							}}
							className="cursor-pointer text-muted-foreground hover:bg-foreground/10 hover:text-foreground"
						>
							{t("timeline.annotation.label")}
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => {
								const nextTrack =
									timeline.audioRegions.length > 0
										? Math.max(
												...timeline.audioRegions.map(
													(region) => region.trackIndex ?? 0,
												),
											) + 1
										: 0;
								timelineRef.current?.addAudio(nextTrack);
							}}
							className="cursor-pointer text-muted-foreground hover:bg-foreground/10 hover:text-foreground"
						>
							{t("timeline.audio.label")}
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			) : (
				<Popover open>
					<PopoverTrigger asChild>
						<Button
							variant="ghost"
							size="icon"
							aria-label={t("editor.playback.volume", "Preview volume")}
							title={t("editor.playback.volume", "Preview volume")}
						>
							{previewVolume <= 0.001 ? (
								<SpeakerX className="size-3.5" />
							) : previewVolume < 0.5 ? (
								<SpeakerLow className="size-3.5" />
							) : (
								<SpeakerHigh className="size-3.5" />
							)}
						</Button>
					</PopoverTrigger>
					<PopoverContent
						side="top"
						sideOffset={10}
						aria-label="Preview volume"
						className="flex w-14 flex-col items-center gap-3 p-3"
					>
						<span className="text-[10px] tabular-nums text-muted-foreground">
							{Math.round(previewVolume * 100)}%
						</span>
						<Slider
							aria-label={t("editor.playback.volume", "Preview volume")}
							orientation="vertical"
							min={0}
							max={1}
							step={0.01}
							value={[previewVolume]}
							onValueChange={([value]) => setPreviewVolume(value)}
							className="h-28"
						/>
					</PopoverContent>
				</Popover>
			)}
		</div>
	);
}
function ScopedState({ mode }: { mode: Mode }) {
	const [host, setHost] = useState<HTMLDivElement | null>(null);
	return (
		<section data-figma-name={`Preview menu / ${mode}`} style={{ width: 1440 }}>
			<h2 style={{ fontSize: 24, fontWeight: 600, padding: "24px 64px" }}>{mode}</h2>
			<div
				ref={setHost}
				style={{
					position: "relative",
					width: 1440,
					height: 650,
					overflow: "hidden",
					transform: "translateZ(0)",
					isolation: "isolate",
					background: "var(--surface)",
					display: "flex",
					justifyContent: "center",
					paddingTop: mode === "preview-volume" ? 340 : 64,
				}}
			>
				{host && (
					<UNSAFE_PortalProvider getContainer={() => host}>
						<SourceMenu mode={mode} />
					</UNSAFE_PortalProvider>
				)}
			</div>
		</section>
	);
}
function Catalog() {
	const view = query.get("view");
	return (
		<main
			data-figma-name="Recordly / All preview menus"
			style={{ width: 1440, display: "flex", flexDirection: "column", gap: 48 }}
		>
			{modes
				.filter((mode) => !view || view === mode)
				.map((mode) => (
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
