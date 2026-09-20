import { Tooltip } from "@heroui/react";
import { type ReactNode, useState } from "react";
import { UNSAFE_PortalProvider } from "react-aria";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./components/launch/launchTheme.css";
import App from "./App";
import { CountdownOverlay } from "./components/countdown/CountdownOverlay";
import HudWindow from "./components/launch/HudWindow";
import { type UpdateToastPayload, UpdateToastWindow } from "./components/launch/UpdateToastWindow";
import { Button } from "./components/ui/button";
import { I18nProvider } from "./contexts/I18nContext";
import { ThemeProvider } from "./contexts/ThemeContext";

const states: { name: string; payload: UpdateToastPayload }[] = [
	{
		name: "Available",
		payload: {
			version: "1.5.0",
			detail: "A new version of Recordly is available.",
			phase: "available",
			delayMs: 3600000,
		},
	},
	{
		name: "Downloading",
		payload: {
			version: "1.5.0",
			detail: "Your update is downloading.",
			phase: "downloading",
			delayMs: 3600000,
			progressPercent: 42,
			transferredBytes: 44040192,
			totalBytes: 104857600,
			bytesPerSecond: 3145728,
		},
	},
	{
		name: "Ready",
		payload: {
			version: "1.5.0",
			detail: "Your update is ready to install.",
			phase: "ready",
			delayMs: 3600000,
		},
	},
	{
		name: "Check error",
		payload: {
			version: "1.5.0",
			detail: "Check your connection and try again.",
			phase: "error",
			delayMs: 3600000,
			primaryAction: "retry-check",
		},
	},
	{
		name: "Download error",
		payload: {
			version: "1.5.0",
			detail: "The download was interrupted. Please try again.",
			phase: "error",
			delayMs: 3600000,
			primaryAction: "install-and-restart",
		},
	},
	{
		name: "Experimental",
		payload: {
			version: "1.5.0",
			detail: "An experimental update is available.",
			phase: "available",
			delayMs: 3600000,
			isExperimental: true,
		},
	},
	{
		name: "Preview",
		payload: {
			version: "1.5.0",
			detail: "Preview of the update notification.",
			phase: "available",
			delayMs: 3600000,
			isPreview: true,
		},
	},
];

function Sample({
	name,
	height = 300,
	wide = false,
	children,
}: {
	name: string;
	height?: number;
	wide?: boolean;
	children: ReactNode;
}) {
	const [container, setContainer] = useState<HTMLDivElement | null>(null);
	return (
		<section
			data-figma-name={name}
			style={{
				gridColumn: wide ? "1 / -1" : undefined,
				border: "1px solid var(--separator)",
				borderRadius: 16,
				overflow: "hidden",
				background: "var(--surface)",
			}}
		>
			<h2 style={{ padding: "20px 24px", fontSize: 18, fontWeight: 600 }}>{name}</h2>
			<div
				ref={setContainer}
				style={{
					height,
					position: "relative",
					transform: "translateZ(0)",
					isolation: "isolate",
					overflow: "hidden",
				}}
			>
				{container && (
					<UNSAFE_PortalProvider getContainer={() => container}>
						{children}
					</UNSAFE_PortalProvider>
				)}
			</div>
		</section>
	);
}

function Catalog() {
	return (
		<main
			style={{
				width: 1440,
				padding: 40,
				background: "var(--background)",
				color: "var(--foreground)",
			}}
		>
			<h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 32 }}>
				Recorder windows and notifications
			</h1>
			<div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 28 }}>
				{states.map(({ name, payload }) => (
					<Sample key={name} name={`UpdateToastWindow / ${name}`} height={250}>
						<div style={{ width: 420, height: 172, margin: "25px auto" }}>
							<UpdateToastWindow payload={payload} />
						</div>
					</Sample>
				))}
				<Sample name="CountdownOverlay / 3 seconds">
					<CountdownOverlay />
				</Sample>
				<Sample name="HudWindow / Idle" wide height={360}>
					<HudWindow />
				</Sample>
				<Sample name="App / Startup" wide height={280}>
					<App />
				</Sample>
				<Sample name="Tooltip / Content clamp" height={180}>
					<div style={{ padding: "80px 70px" }}>
						<Tooltip isOpen>
							<Tooltip.Trigger>
								<Button variant="ghost">Project title…</Button>
							</Tooltip.Trigger>
							<Tooltip.Content>
								Project title with the full untruncated text
							</Tooltip.Content>
						</Tooltip>
					</div>
				</Sample>
				<Sample name="Tooltip / Sidebar placement" height={180}>
					<div style={{ padding: "60px 70px" }}>
						<Tooltip isOpen>
							<Tooltip.Trigger>
								<Button variant="ghost">Scene</Button>
							</Tooltip.Trigger>
							<Tooltip.Content placement="right">Scene</Tooltip.Content>
						</Tooltip>
					</div>
				</Sample>
			</div>
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
