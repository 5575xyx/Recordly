import { ToggleButton } from "@heroui/react";
import type { ComponentProps } from "react";
type Props = Omit<ComponentProps<typeof ToggleButton>, "size" | "variant"> & {
	pressed?: boolean;
	onPressedChange?: (value: boolean) => void;
	disabled?: boolean;
	size?: "default" | "sm" | "lg";
	variant?: "default" | "outline";
};
export function Toggle({ pressed, onPressedChange, disabled, size, variant, ...props }: Props) {
	return (
		<ToggleButton
			{...props}
			isSelected={pressed}
			onChange={onPressedChange}
			isDisabled={disabled}
			size={size === "default" ? "md" : size}
			variant={variant === "outline" ? "default" : "ghost"}
		/>
	);
}
