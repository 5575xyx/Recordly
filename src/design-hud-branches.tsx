/**
 * Capture-only fixtures for otherwise hook-local LaunchWindow branches.
 * Source JSX copied verbatim from LaunchWindow.tsx: RecordingControls binding,
 * finalizingControls and complete returned HUD shell, including floating webcam.
 * Imports the original LaunchWindow.module.css and original RecordingControls.
 * Only recorder state, handlers and camera stream are replaced with inert fixtures.
 */
import { useRef } from "react";
import { createRoot } from "react-dom/client";
import { AnimatePresence, motion } from "motion/react";
import { ArrowClockwiseIcon } from "@phosphor-icons/react";
import { RxDragHandleDots2 } from "react-icons/rx";
import { I18nProvider, useScopedT } from "./contexts/I18nContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { HudInteractionContext } from "./components/launch/contexts/HudInteractionContext";
import { RecordingControls } from "./components/launch/RecordingControls";
import styles from "./components/launch/LaunchWindow.module.css";
import "./index.css";
import "./components/launch/launchTheme.css";

const noop = () => undefined;
function attachFixtureVideo(node: HTMLVideoElement | null) {
	if (!node) return;
	node.addEventListener("loadeddata", () => { node.currentTime = 2; }, { once: true });
	node.src = "/tests/ui/fixtures/filmstrip.mp4";
}
function HudBranch({ finalizing }: { finalizing: boolean }) {
	const t = useScopedT("launch");
	const recording = !finalizing;
	const paused = false;
	const microphoneEnabled = true;
	const elapsed = 83;
	const formatTime = () => "01:23";
	const setMicrophoneEnabled = (_enabled: boolean) => undefined;
	const resumeRecording = noop, pauseRecording = noop, toggleRecording = noop, cancelRecording = noop;
	const hudContentRef = useRef<HTMLDivElement>(null);
	const hudBarTransformRef = useRef<HTMLDivElement>(null);
	const hudBarRef = useRef<HTMLDivElement>(null);
	const recordingWebcamPreviewContainerRef = useRef<HTMLDivElement>(null);
	const setRecordingWebcamPreviewNode = attachFixtureVideo;
	const recordingHudOffset = {x:0,y:0}, webcamPreviewOffset = {x:0,y:0};
	const showRecordingWebcamPreview = !finalizing;
	const useNativeHudBarDrag = false, shouldAnimateHudLayout = false;
	const handleHudMouseEnter = noop, handleHudMouseLeave = noop;
	const handleHudBarPointerDown = noop, handleHudBarPointerMove = noop, handleHudBarPointerUp = noop;
	const handleWebcamPreviewPointerDown = noop, handleWebcamPreviewPointerMove = noop, handleWebcamPreviewPointerUp = noop;
	const hudStateTransition = {duration:0.24,ease:[0.22,1,0.36,1] as const};
	const hudMode = finalizing ? "finalizing" : "recording";
	const idleControls = null;
	const recordingControls = (
		<RecordingControls
			paused={paused}
			microphoneEnabled={microphoneEnabled}
			elapsed={elapsed}
			onToggleMicrophone={() => setMicrophoneEnabled(!microphoneEnabled)}
			onPauseResume={paused ? resumeRecording : pauseRecording}
			onStopRecording={toggleRecording}
			onHideHud={() => window.electronAPI?.hudOverlayHide?.()}
			onCancelRecording={cancelRecording}
			formatTime={formatTime}
		/>
	);
	const finalizingControls = (
		<div className={styles.finalizingState}>
			<ArrowClockwiseIcon size={15} className={styles.finalizingSpin} />
			<div className={styles.finalizingCopy}>
				<span>{t("recording.preparing", "Preparing recording")}</span>
				<small>{t("recording.preparingSubtitle", "Opening the editor in a moment")}</small>
			</div>
		</div>
	);

	return (
		<HudInteractionContext.Provider
			value={{ onMouseEnter: handleHudMouseEnter, onMouseLeave: handleHudMouseLeave }}
		>
			<div
				className="w-full flex justify-center bg-transparent overflow-visible items-end pb-5 pointer-events-none"
				style={{ height: "100vh" }}
			>
				<div
					ref={hudContentRef}
					className="flex items-center overflow-visible flex-col-reverse pointer-events-none"
				>
					<div className="flex flex-col items-center pointer-events-none p-2">
						<div
							ref={hudBarTransformRef}
							style={{
								transform: `translate3d(${recordingHudOffset.x}px, ${recordingHudOffset.y}px, 0)`,
							}}
						>
							<motion.div
								ref={hudBarRef}
								layout={shouldAnimateHudLayout}
								transition={hudStateTransition}
								className={`${styles.bar} launch-theme mb-2 pointer-events-auto`}
								onMouseEnter={handleHudMouseEnter}
								onMouseLeave={handleHudMouseLeave}
							>
								<div
									// Linux compositors and non-passthrough Windows fallback windows
									// need native window dragging; the JS drag path only translates
									// content inside the HUD window.
									className={`flex items-center px-0.5 cursor-grab active:cursor-grabbing ${
										useNativeHudBarDrag ? styles.electronDrag : ""
									}`}
									onPointerDown={handleHudBarPointerDown}
									onPointerMove={handleHudBarPointerMove}
									onPointerUp={handleHudBarPointerUp}
									onPointerCancel={handleHudBarPointerUp}
								>
									<RxDragHandleDots2 size={14} className="text-[#6b6b78]" />
								</div>

								<div className={styles.barStateViewport}>
									<AnimatePresence initial={false} mode="wait">
										<motion.div
											key={hudMode}
											layout={shouldAnimateHudLayout}
											className={styles.barState}
											initial={{
												opacity: 0,
												y: 10,
												scale: 0.985,
												filter: "blur(8px)",
											}}
											animate={{
												opacity: 1,
												y: 0,
												scale: 1,
												filter: "blur(0px)",
											}}
											exit={{
												opacity: 0,
												y: -10,
												scale: 0.985,
												filter: "blur(6px)",
											}}
											transition={hudStateTransition}
										>
											{finalizing
												? finalizingControls
												: recording
													? recordingControls
													: idleControls}
										</motion.div>
									</AnimatePresence>
								</div>
							</motion.div>
						</div>
						{showRecordingWebcamPreview && (
							<div
								ref={recordingWebcamPreviewContainerRef}
								className={`${styles.recordingWebcamPreview} ${styles.electronNoDrag} pointer-events-auto`}
								data-hud-interactive
								title={t("recording.webcam")}
								style={{
									transform: `translate(${webcamPreviewOffset.x}px, ${webcamPreviewOffset.y}px)`,
								}}
								onMouseEnter={handleHudMouseEnter}
								onMouseLeave={handleHudMouseLeave}
								onPointerDown={handleWebcamPreviewPointerDown}
								onPointerMove={handleWebcamPreviewPointerMove}
								onPointerUp={handleWebcamPreviewPointerUp}
								onPointerCancel={handleWebcamPreviewPointerUp}
							>
								<video
									ref={setRecordingWebcamPreviewNode}
									className={styles.recordingWebcamPreviewVideo}
									muted
									playsInline
									style={{ transform: "scaleX(-1)" }}
								/>
							</div>
						)}
					</div>
				</div>
			</div>
		</HudInteractionContext.Provider>
	);
}
function HudBranchGallery() {
	return <main data-figma-name="Recordly / Remaining HUD branches" style={{width:1440}}>
		{[{name:"HUD / Finalizing recording",finalizing:true},{name:"HUD / Floating webcam preview",finalizing:false}].map(state => <section key={state.name} data-figma-name={state.name} data-source="src/components/launch/LaunchWindow.tsx" style={{width:1440}}>
			<h1 style={{fontSize:24,fontWeight:600,padding:32}}>{state.name}</h1>
			<div data-figma-name={`component/${state.name}`} style={{position:"relative",width:1440,height:"100vh",overflow:"hidden",transform:"translateZ(0)",isolation:"isolate"}}><HudBranch finalizing={state.finalizing}/></div>
		</section>)}
	</main>;
}
createRoot(document.getElementById("root")!).render(<ThemeProvider><I18nProvider><HudBranchGallery/></I18nProvider></ThemeProvider>);
