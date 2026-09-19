import {
	ColorArea,
	ColorField,
	ColorPicker,
	ColorSlider,
	ColorSwatch,
	ColorSwatchPicker,
	Input,
	Label,
	Popover,
} from "@heroui/react";
import { Button } from "./button";

type PaletteProps = {
	color?: string;
	colors: readonly string[];
	onChange: (color: { hex: string }) => void;
	style?: React.CSSProperties;
};
export function ColorPalette({ color = "#000000", colors, onChange }: PaletteProps) {
	return (
		<div className="flex flex-col gap-3">
			<ColorSwatchPicker
				aria-label="Colors"
				value={color}
				onChange={(value) => onChange({ hex: value.toString("hex") })}
			>
				{colors.map((color) => (
					<ColorSwatchPicker.Item key={color} color={color}>
						<ColorSwatchPicker.Swatch className="ring-1 ring-inset ring-foreground/10" />
						<ColorSwatchPicker.Indicator />
					</ColorSwatchPicker.Item>
				))}
			</ColorSwatchPicker>
			<ColorField
				aria-label="Hex color"
				value={color}
				onChange={(value) => value && onChange({ hex: value.toString("hex") })}
			>
				<Input />
			</ColorField>
		</div>
	);
}
export function ColorControl({
	value,
	onChange,
	label,
}: {
	value: string;
	onChange: (value: string) => void;
	label: string;
}) {
	return (
		<ColorPicker value={value} onChange={(color) => onChange(color.toString("hex"))}>
			<Button variant="secondary" aria-label={label}>
				<ColorSwatch size="sm" />
				{label}
			</Button>
			<ColorPicker.Popover>
				<Popover.Dialog aria-label={label} className="flex w-64 flex-col gap-3">
					<ColorArea colorSpace="hsb" xChannel="saturation" yChannel="brightness">
						<ColorArea.Thumb />
					</ColorArea>
					<ColorSlider colorSpace="hsb" channel="hue">
						<ColorSlider.Track>
							<ColorSlider.Thumb />
						</ColorSlider.Track>
					</ColorSlider>
					<ColorField>
						<Label>{label}</Label>
						<Input />
					</ColorField>
				</Popover.Dialog>
			</ColorPicker.Popover>
		</ColorPicker>
	);
}
