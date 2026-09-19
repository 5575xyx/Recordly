import {
	Camera,
	ClosedCaptioning,
	Cursor,
	Gear,
	PuzzlePiece,
	FrameCorners,
	UserCircle,
} from "@phosphor-icons/react";
import { ToggleButtonGroup, ToggleButton, Tooltip } from "@heroui/react";
import { Button } from "@/components/ui/button";
import type { ComponentProps, Dispatch, SetStateAction } from "react";
import { useMemo } from "react";
import { toast } from "@/components/ui/toast";
import type { useI18n } from "@/contexts/I18nContext";
import ExtensionManager from "../ExtensionManager";
import { SettingsPanel } from "../SettingsPanel";
import type { EditorEffectSection } from "../types";

type Props = {
	t: ReturnType<typeof useI18n>["t"];
	activeSection: EditorEffectSection;
	setActiveSection: Dispatch<SetStateAction<EditorEffectSection>>;
	settingsPanelProps: ComponentProps<typeof SettingsPanel>;
};

export function EditorSidebar({ t, activeSection, setActiveSection, settingsPanelProps }: Props) {
	const sections = useMemo(
		() => [
			{
				id: "scene" as const,
				label: t("settings.sections.scene", "Scene"),
				icon: FrameCorners,
			},
			{ id: "cursor" as const, label: t("settings.sections.cursor", "Cursor"), icon: Cursor },
			{ id: "webcam" as const, label: t("settings.sections.webcam", "Webcam"), icon: Camera },
			{
				id: "captions" as const,
				label: t("settings.sections.captions", "Captions"),
				icon: ClosedCaptioning,
			},
			{
				id: "settings" as const,
				label: t("settings.sections.settings", "Settings"),
				icon: Gear,
			},
			{
				id: "extensions" as const,
				label: t("settings.sections.extensions", "Extensions"),
				icon: PuzzlePiece,
			},
		],
		[t],
	);
	return (
		<div className="flex min-h-0 flex-shrink-0 border-r border-separator bg-surface">
			<nav
				aria-label={t("settings.sections.title", "Editor tools")}
				className="flex w-14 flex-col items-center gap-3 border-r border-separator py-3"
			>
				<ToggleButtonGroup
					orientation="vertical"
					isDetached
					className="gap-2"
					selectionMode="single"
					disallowEmptySelection
					selectedKeys={[activeSection]}
					onSelectionChange={(keys) => {
						const key = Array.from(keys)[0];
						if (key) setActiveSection(key as EditorEffectSection);
					}}
				>
					{sections.map((section) => (
						<Tooltip key={section.id}>
							<ToggleButton
								id={section.id}
								variant="ghost"
								isIconOnly
								aria-label={section.label}
							>
								<section.icon className="size-5" />
							</ToggleButton>
							<Tooltip.Content placement="right">{section.label}</Tooltip.Content>
						</Tooltip>
					))}
				</ToggleButtonGroup>
				<Button
					variant="ghost"
					size="icon"
					className="mt-auto"
					aria-label={t("editor.account.title", "Account")}
					onClick={() =>
						toast.info(t("editor.account.comingSoon", "Account coming soon"))
					}
				>
					<UserCircle />
				</Button>
			</nav>
			<aside className="flex w-[320px] min-h-0 flex-col">
				<header className="flex h-11 shrink-0 items-center border-b border-separator px-4">
					<h2 className="text-sm font-medium">
						{settingsPanelProps.selectedAnnotationId
							? t("timeline.annotation.label", "Annotation")
							: (sections.find((section) => section.id === activeSection)?.label ??
								t(
									`settings.sections.${activeSection}`,
									activeSection.charAt(0).toUpperCase() + activeSection.slice(1),
								))}
					</h2>
				</header>
				{activeSection === "extensions" ? (
					<ExtensionManager />
				) : (
					<SettingsPanel {...settingsPanelProps} />
				)}
			</aside>
		</div>
	);
}
