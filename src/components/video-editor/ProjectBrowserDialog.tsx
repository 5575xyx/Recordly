import { Card, Chip, Popover } from "@heroui/react";
import { useEffect, useMemo, useRef } from "react";
import { Button } from "@/components/ui/button";
import { toFileUrl } from "./projectPersistence";

export type ProjectLibraryEntry = {
	path: string;
	name: string;
	updatedAt: number;
	thumbnailPath: string | null;
	isCurrent: boolean;
	isInProjectsDirectory: boolean;
};
type ProjectBrowserDialogProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	entries: ProjectLibraryEntry[];
	onOpenProject: (path: string) => void;
	onImportFile?: () => void;
	anchorRef?: React.RefObject<HTMLElement | null>;
	preferredDirection?: "up" | "down" | "auto";
	onPanelHeightChange?: (height: number) => void;
	renderMode?: "floating" | "inline";
};
export default function ProjectBrowserDialog({
	open,
	onOpenChange,
	entries,
	onOpenProject,
	onImportFile,
	anchorRef,
	preferredDirection = "auto",
	onPanelHeightChange,
	renderMode = "floating",
}: ProjectBrowserDialogProps) {
	const panelRef = useRef<HTMLDivElement>(null);
	const visibleEntries = useMemo(() => entries.slice(0, 24), [entries]);
	useEffect(() => {
		if (!open) {
			onPanelHeightChange?.(0);
			return;
		}
		const panel = panelRef.current;
		if (!panel || !onPanelHeightChange) return;
		const measure = () => onPanelHeightChange(panel.getBoundingClientRect().height);
		measure();
		const observer = new ResizeObserver(measure);
		observer.observe(panel);
		return () => {
			observer.disconnect();
			onPanelHeightChange(0);
		};
	}, [open, onPanelHeightChange]);
	if (!open) return null;
	const content = (
		<Card
			ref={panelRef}
			className="w-[300px] max-w-[calc(100vw-24px)] rounded-none bg-transparent p-1 shadow-none"
		>
			<Card.Header className="flex-row items-center justify-between">
				<Card.Title>Projects</Card.Title>
				{onImportFile && (
					<Button size="sm" variant="secondary" onClick={onImportFile}>
						Import
					</Button>
				)}
			</Card.Header>
			<Card.Content className="max-h-80 overflow-auto">
				{visibleEntries.length ? (
					<div className="grid grid-cols-2 gap-3">
						{visibleEntries.map((entry) => (
							<Button
								key={entry.path}
								variant="ghost"
								onClick={() => onOpenProject(entry.path)}
								aria-label={entry.name}
								aria-current={entry.isCurrent ? "true" : undefined}
								className="h-auto min-w-0 flex-col items-stretch gap-2 p-2"
							>
								<div className="relative aspect-video overflow-hidden rounded-lg bg-default">
									{entry.thumbnailPath ? (
										<img
											src={toFileUrl(entry.thumbnailPath)}
											alt=""
											draggable={false}
											className="h-full w-full object-cover"
										/>
									) : (
										<span className="flex h-full items-center justify-center text-xs text-muted">
											No preview yet
										</span>
									)}
									{entry.isCurrent && (
										<Chip
											size="sm"
											color="accent"
											className="absolute right-1 top-1"
										>
											Current
										</Chip>
									)}
								</div>
								<span className="truncate text-left text-xs">{entry.name}</span>
							</Button>
						))}
					</div>
				) : (
					<p className="py-8 text-center text-sm text-muted">No saved projects yet</p>
				)}
			</Card.Content>
		</Card>
	);
	// Inline mode lives inside the recorder's existing HeroUI popover.
	if (renderMode === "inline") return content;
	return (
		<Popover isOpen={open} onOpenChange={onOpenChange}>
			<Popover.Content
				triggerRef={anchorRef}
				placement={preferredDirection === "up" ? "top end" : "bottom end"}
				isNonModal
			>
				<Popover.Dialog aria-label="Projects" className="p-0">
					{content}
				</Popover.Dialog>
			</Popover.Content>
		</Popover>
	);
}
