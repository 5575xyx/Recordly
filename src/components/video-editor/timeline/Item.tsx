import {
	Gauge,
	ChatCircle as MessageSquare,
	MusicNotes as Music,
	Scissors,
	SpeakerX,
	MagnifyingGlassPlus as ZoomIn,
} from "@phosphor-icons/react";
import { ClipFilmstrip } from "./components/filmstrip/ClipFilmstrip";
import type { Span } from "dnd-timeline";
import { useItem } from "dnd-timeline";
import { useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { formatClipSpeedLabel } from "../clipSpeedChange";
import { formatPlayheadTime } from "./core/time";
import AudioWaveform from "./components/waveform/AudioWaveform";
import type { AudioPeaksData } from "./core/timelineTypes";
import glassStyles from "./ItemGlass.module.css";

interface ItemProps {
	videoPath?: string | null;
	sourceSpan?: Span;
	id: string;
	span: Span;
	rowId: string;
	disabled?: boolean;
	children: React.ReactNode;
	isSelected?: boolean;
	onSelect?: () => void;
	onSelectId?: (id: string) => void;
	zoomDepth?: number;
	zoomMode?: "auto" | "manual";
	speedValue?: number;
	waveformPeaks?: AudioPeaksData | null;
	waveformSegmentSpan?: Span;
	waveformGain?: number;
	waveformNormalize?: boolean;
	muted?: boolean;
	variant?: "zoom" | "trim" | "clip" | "annotation" | "speed" | "audio" | "caption";
	isLoading?: boolean;
	loadingLabel?: string;
}

// Map zoom depth to multiplier labels
const ZOOM_LABELS: Record<number, string> = {
	1: "1.25×",
	2: "1.5×",
	3: "1.8×",
	4: "2.2×",
	5: "3.5×",
	6: "5×",
};

export default function Item({
	id,
	videoPath,
	sourceSpan,
	span,
	rowId,
	disabled = false,
	isSelected = false,
	onSelect,
	onSelectId,
	zoomDepth = 1,
	zoomMode = "auto",
	speedValue,
	waveformPeaks = null,
	waveformSegmentSpan,
	waveformGain = 1,
	waveformNormalize = false,
	muted = false,
	variant = "zoom",
	isLoading = false,
	loadingLabel,
	children,
}: ItemProps) {
	const { setNodeRef, attributes, listeners, itemStyle, itemContentStyle } = useItem({
		id,
		span,
		disabled: disabled || isLoading,
		data: { rowId },
	});

	const timeLabel = useMemo(
		() => `${formatPlayheadTime(span.start)} – ${formatPlayheadTime(span.end)}`,
		[span.start, span.end],
	);

	if (isLoading) {
		return (
			<div
				ref={setNodeRef}
				style={{
					...itemStyle,
					height: "100%",
					display: "flex",
					alignItems: "center",
				}}
				{...listeners}
				{...attributes}
				data-timeline-item="true"
				data-variant={variant}
				onMouseDownCapture={(event) => event.stopPropagation()}
				onClickCapture={(event) => event.stopPropagation()}
			>
				<Skeleton
					animationType="shimmer"
					aria-label={loadingLabel || "Loading..."}
					className="w-full"
					style={{ height: "85%", minHeight: 22 }}
				/>
			</div>
		);
	}

	const isZoom = variant === "zoom";
	const isTrim = variant === "trim";
	const isClip = variant === "clip";
	const isSpeed = variant === "speed";
	const isAudio = variant === "audio";
	const isCaption = variant === "caption";
	const showAudioWaveform = isAudio && Boolean(waveformPeaks);
	const clipSpeedLabel = isClip ? formatClipSpeedLabel(speedValue ?? 1) : null;

	const glassClass = isZoom
		? glassStyles.glassBlue
		: isTrim
			? glassStyles.glassRed
			: isClip
				? glassStyles.glassCyan
				: isSpeed
					? glassStyles.glassAmber
					: isAudio
						? glassStyles.glassDarkGreen
						: isCaption
							? glassStyles.glassCaption
							: glassStyles.glassYellow;

	const MIN_ITEM_PX = 6;
	const handleSelect = () => {
		onSelect?.();
		onSelectId?.(id);
	};
	const safeItemStyle = {
		...itemStyle,
		minWidth: MIN_ITEM_PX,
		height: "100%",
		overflow: "hidden",
	};

	return (
		<div
			ref={setNodeRef}
			style={safeItemStyle}
			{...listeners}
			{...attributes}
			data-timeline-item="true"
			data-variant={variant}
			aria-label={
				isClip
					? `Clip${clipSpeedLabel ? ` ${clipSpeedLabel}` : ""} · ${timeLabel}`
					: undefined
			}
			onPointerDownCapture={handleSelect}
			className="group h-full"
		>
			<div
				className="h-full"
				style={{
					...itemContentStyle,
					minWidth: MIN_ITEM_PX,
					height: "100%",
					display: "flex",
					alignItems: "center",
				}}
			>
				<div
					className={cn(
						glassClass,
						"timeline-block w-full overflow-hidden flex items-center justify-center gap-1.5 cursor-grab active:cursor-grabbing relative",
						isSelected && glassStyles.selected,
					)}
					style={{
						height: "85%",
						minHeight: 22,
						minWidth: MIN_ITEM_PX,
						containerType: "inline-size",
					}}
					onClick={(event) => {
						event.stopPropagation();
					}}
				>
					{isClip && videoPath && (
						<ClipFilmstrip
							path={videoPath}
							span={span}
							sourceSpan={sourceSpan ?? span}
						/>
					)}
					<div
						className={cn(
							glassStyles.zoomEndCap,
							glassStyles.left,
							isClip && glassStyles.clipHandle,
						)}
						style={{ cursor: "col-resize", pointerEvents: "auto" }}
						title="Resize left"
					/>
					<div
						className={cn(
							glassStyles.zoomEndCap,
							glassStyles.right,
							isClip && glassStyles.clipHandle,
						)}
						style={{ cursor: "col-resize", pointerEvents: "auto" }}
						title="Resize right"
					/>
					{showAudioWaveform && waveformPeaks && (
						<AudioWaveform
							peaks={waveformPeaks}
							segmentStartMs={waveformSegmentSpan?.start ?? span.start}
							segmentEndMs={waveformSegmentSpan?.end ?? span.end}
							gain={waveformGain}
							normalize={waveformNormalize}
							className="absolute inset-0 w-full h-full pointer-events-none opacity-45"
						/>
					)}
					{/* Muted overlay for source audio track items */}
					{isAudio && muted && (
						<div className="absolute inset-0 z-20 flex items-center justify-center gap-1 bg-red-900/40 pointer-events-none">
							<SpeakerX className="w-3 h-3 text-red-300/90 shrink-0" />
						</div>
					)}
					{/* Normal-speed clips show only the filmstrip and resize handles. */}
					{(!isClip || clipSpeedLabel) && (
						<div
							title={`${isZoom ? `${ZOOM_LABELS[zoomDepth]} ${zoomMode === "manual" ? "Manual" : "Auto"}` : typeof children === "string" ? children : "Clip"} · ${timeLabel}`}
							className={cn(
								"relative z-10 flex max-w-full items-center justify-center gap-1 px-1 text-[11px] font-medium text-black/70 dark:text-white/90 select-none overflow-hidden",
								isClip &&
									"rounded bg-black/65 px-2 py-1 text-white dark:text-white",
								isZoom && "text-white dark:text-white",
							)}
						>
							{isClip ? (
								clipSpeedLabel
							) : isZoom ? (
								<>
									<ZoomIn className="zoom-icon size-3 shrink-0" />
									<span className="zoom-value whitespace-nowrap">
										{ZOOM_LABELS[zoomDepth] || `${zoomDepth}×`}
										<span className="zoom-mode ml-1 font-normal">
											{zoomMode === "manual" ? "Manual" : "Auto"}
										</span>
									</span>
								</>
							) : (
								<>
									{isTrim ? (
										<Scissors className="size-3 shrink-0" />
									) : isSpeed ? (
										<Gauge className="size-3 shrink-0" />
									) : isAudio ? (
										<Music className="size-3 shrink-0" />
									) : (
										<MessageSquare className="size-3 shrink-0" />
									)}
									<span className="truncate">
										{isTrim ? "Trim" : isSpeed ? `${speedValue}×` : children}
									</span>
								</>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
