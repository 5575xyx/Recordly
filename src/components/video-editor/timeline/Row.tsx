import type { RowDefinition } from "dnd-timeline";
import { useRow } from "dnd-timeline";
import { TIMELINE_CLIP_ROW_HEIGHT_PX } from "./timelineLayout";

interface RowProps extends RowDefinition {
	compact?: boolean;
	filmstrip?: boolean;
	children: React.ReactNode;
	label?: string;
	hint?: string;
	isEmpty?: boolean;
	labelColor?: string;
	onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
	onMouseMove?: React.MouseEventHandler<HTMLDivElement>;
	onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
	onMouseDown?: React.MouseEventHandler<HTMLDivElement>;
	onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export default function Row({
	id,
	compact = false,
	filmstrip = false,
	children,
	label,
	hint,
	isEmpty,
	labelColor = "#666",
	onMouseEnter,
	onMouseMove,
	onMouseLeave,
	onMouseDown,
	onClick,
}: RowProps) {
	const { setNodeRef, rowWrapperStyle, rowStyle } = useRow({ id });

	return (
		<div
			className="bg-transparent relative flex-1 min-h-[26px]"
			style={{
				...rowWrapperStyle,
				marginBottom: 2,
				flexGrow: compact || filmstrip ? 0 : 1,
				flexShrink: 0,
				flexBasis: filmstrip ? TIMELINE_CLIP_ROW_HEIGHT_PX : compact ? 32 : undefined,
			}}
		>
			{label && (
				<div
					className="absolute left-1.5 top-1/2 -translate-y-1/2 text-[9px] font-semibold uppercase tracking-widest z-20 pointer-events-none select-none"
					style={{ color: labelColor, writingMode: "horizontal-tb" }}
				>
					{label}
				</div>
			)}
			{isEmpty && hint && (
				<div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-10">
					<span className="text-[11px] text-foreground/15 font-medium">{hint}</span>
				</div>
			)}
			<div
				ref={setNodeRef}
				className="relative h-full min-h-[26px] overflow-hidden"
				style={rowStyle}
				onMouseEnter={onMouseEnter}
				onMouseMove={onMouseMove}
				onMouseLeave={onMouseLeave}
				onMouseDown={onMouseDown}
				onClick={onClick}
			>
				{children}
			</div>
		</div>
	);
}
