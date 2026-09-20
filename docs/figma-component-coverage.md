# Recordly HeroUI — Figma component coverage

[Open the editable Figma file](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm)

Audited 20 September 2026 against the `recordly-heroui` renderer. The file contains **254 native components**, **6,986 editable component layers**, **126 variables**, an assembled editor and two structural wireframes. Variable-alias validation found no broken references.

## Start here

- [Assembled desktop editor](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=32-3)
- [Editor wireframe](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=33-2)
- [Recorder wireframe](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=33-13)
- [Foundations](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=9-4)
- [Getting started](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=9-3)

Components are organized by controls, inspectors, timeline, recording, windows and popup families. Edit a main component to update its Figma instances. The full component/node index below links directly to each definition. This is an editable design handoff; Figma changes do not automatically rewrite the React project.

## Scope and fidelity

- Every one of the 91 original renderer TSX modules is accounted for below: 85 visual modules and 6 providers/bootstrap modules without standalone UI.
- Includes basic and advanced inspectors, four background tabs, selected/unselected timeline blocks, annotations, waveform and keyframe details, project dialogs, export stages and errors, presets, announcement layouts, all recorder menus, recording/finalizing states, floating webcam preview, countdown, update notifications, and tooltips.
- Controls, text, icons and waveform shapes are editable Figma layers. Filmstrip/preview footage and image assets retain bitmap media fills. These are fixture media, not editable video sequences.
- The source uses SF Pro; the matching Figma faces are used. Menlo was unavailable in Figma and its small monospaced samples use JetBrains Mono Medium.
- Context providers, event hooks, native operating-system file/device permission dialogs and runtime behavior have no independent Figma visual. Project-owned dialogs and device-selection menus are included.
- Frame and Crop inspector identifiers currently resolve to Scene in the source. Their captured compatibility states reflect that behavior. Extensions are retained as a labelled legacy component, despite removal from active navigation.
- Capture-only containers make otherwise hidden dialogs visible and expand inspector scroll areas. Preview menus and recording-only HUD branches preserve source JSX and original CSS with inert handlers. No capture controls are added to the shipping editor.

## Source module coverage

| Source | Figma representation |
| --- | --- |
| [src/App.tsx](../src/App.tsx) | [Editor screen](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=32-3), [App / Startup](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-4977) |
| [src/components/announcements/AnnouncementDialog.tsx](../src/components/announcements/AnnouncementDialog.tsx) | [Popup/announcement-popup](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-4683), [Announcement cover](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=51-37) |
| [src/components/announcements/EditorAnnouncementBanner.tsx](../src/components/announcements/EditorAnnouncementBanner.tsx) | [Popup/announcement-banner](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-4701) |
| [src/components/announcements/LiveAnnouncementNotifications.tsx](../src/components/announcements/LiveAnnouncementNotifications.tsx) | [Popup/announcement-notification](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-4713) |
| [src/components/countdown/CountdownOverlay.tsx](../src/components/countdown/CountdownOverlay.tsx) | [CountdownOverlay / 3 seconds](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-4916) |
| [src/components/launch/HudWindow.tsx](../src/components/launch/HudWindow.tsx) | [HudWindow / Idle](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-4968), [HUD — recording states](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=46-2) |
| [src/components/launch/LaunchWindow.tsx](../src/components/launch/LaunchWindow.tsx) | [HudWindow / Idle](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-4968), [HUD — recording states](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=46-2), [Popups — Recording](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=38-2) |
| [src/components/launch/MarqueeText.tsx](../src/components/launch/MarqueeText.tsx) | [MarqueeText](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=35-1306) |
| [src/components/launch/RecordingControls.tsx](../src/components/launch/RecordingControls.tsx) | [RecordingControls / Recording](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=35-1191), [RecordingControls / Paused](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=35-1222) |
| [src/components/launch/SourceSelector.tsx](../src/components/launch/SourceSelector.tsx) | [SourceSelectorContent / Sources](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=35-1255), [Popup/launch-sources](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=38-255) |
| [src/components/launch/UpdateToastWindow.tsx](../src/components/launch/UpdateToastWindow.tsx) | [Windows & tooltips](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-4759) |
| [src/components/launch/contexts/HudInteractionContext.tsx](../src/components/launch/contexts/HudInteractionContext.tsx) | Provider/bootstrap only; represented through its rendered children. |
| [src/components/launch/popovers/CountdownPopover.tsx](../src/components/launch/popovers/CountdownPopover.tsx) | [Popup/launch-countdown](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=38-97) |
| [src/components/launch/popovers/LaunchPopoverCoordinator.tsx](../src/components/launch/popovers/LaunchPopoverCoordinator.tsx) | Provider/bootstrap only; represented through its rendered children. |
| [src/components/launch/popovers/MicPopover.tsx](../src/components/launch/popovers/MicPopover.tsx) | [Popup/launch-mic](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=38-113), [Popup/launch-mic-devices](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=38-37) |
| [src/components/launch/popovers/MorePopover.tsx](../src/components/launch/popovers/MorePopover.tsx) | [Popup/launch-more](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=38-236) |
| [src/components/launch/popovers/PopoverScaffold.tsx](../src/components/launch/popovers/PopoverScaffold.tsx) | [DropdownItem / Selected](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=35-1280), [MicDeviceRow / Selected and unselected](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=35-1301), [Popups — Recording](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=38-2) |
| [src/components/launch/popovers/ProjectPopover.tsx](../src/components/launch/popovers/ProjectPopover.tsx) | [Popup/launch-projects](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=38-279) |
| [src/components/launch/popovers/SourcePopover.tsx](../src/components/launch/popovers/SourcePopover.tsx) | [Popup/launch-sources](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=38-255) |
| [src/components/launch/popovers/WebcamPopover.tsx](../src/components/launch/popovers/WebcamPopover.tsx) | [Popup/launch-webcam](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=38-122), [Popup/launch-webcam-devices](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=38-67) |
| [src/components/ui/accordion.tsx](../src/components/ui/accordion.tsx) | [Accordion](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=30-15) |
| [src/components/ui/audio-level-meter.tsx](../src/components/ui/audio-level-meter.tsx) | [App — Shared utilities](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=35-348) |
| [src/components/ui/button.tsx](../src/components/ui/button.tsx) | [Button](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=18-2) |
| [src/components/ui/card.tsx](../src/components/ui/card.tsx) | [Card](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=30-2) |
| [src/components/ui/choice-group.tsx](../src/components/ui/choice-group.tsx) | [ChoiceGroup](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=28-36) |
| [src/components/ui/color-picker.tsx](../src/components/ui/color-picker.tsx) | [ColorPalette](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=35-368), [ColorControl](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=35-379), [Popup/color](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=38-886) |
| [src/components/ui/content-clamp.tsx](../src/components/ui/content-clamp.tsx) | [ContentClamp](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=35-383), [Tooltip / Content clamp](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-4981) |
| [src/components/ui/dialog.tsx](../src/components/ui/dialog.tsx) | [Popup/dialog](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=38-573) |
| [src/components/ui/dropdown-menu.tsx](../src/components/ui/dropdown-menu.tsx) | [Popup/dropdown](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=38-783) |
| [src/components/ui/input.tsx](../src/components/ui/input.tsx) | [Input](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=22-2), [TextArea](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=22-27) |
| [src/components/ui/item-content.tsx](../src/components/ui/item-content.tsx) | [ItemContent](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=35-390) |
| [src/components/ui/label.tsx](../src/components/ui/label.tsx) | [Label](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=30-47) |
| [src/components/ui/popover.tsx](../src/components/ui/popover.tsx) | [Popup/popover](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=38-769) |
| [src/components/ui/select.tsx](../src/components/ui/select.tsx) | [Select](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=28-58), [Popup/select](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=38-759) |
| [src/components/ui/separator.tsx](../src/components/ui/separator.tsx) | [Separator](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=30-51) |
| [src/components/ui/skeleton.tsx](../src/components/ui/skeleton.tsx) | [Skeleton](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=30-54) |
| [src/components/ui/slider.tsx](../src/components/ui/slider.tsx) | [Slider](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=24-2) |
| [src/components/ui/switch.tsx](../src/components/ui/switch.tsx) | [Switch](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=23-2) |
| [src/components/ui/tabs.tsx](../src/components/ui/tabs.tsx) | [Tabs](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=28-45) |
| [src/components/ui/toast.tsx](../src/components/ui/toast.tsx) | [Popup/toast](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=38-794) |
| [src/components/ui/toggle-group.tsx](../src/components/ui/toggle-group.tsx) | [ToggleGroup](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=28-27) |
| [src/components/ui/toggle.tsx](../src/components/ui/toggle.tsx) | [Toggle](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=28-2) |
| [src/components/video-editor/AddCustomFontDialog.tsx](../src/components/video-editor/AddCustomFontDialog.tsx) | [Popup/font](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=38-605) |
| [src/components/video-editor/AnnotationOverlay.tsx](../src/components/video-editor/AnnotationOverlay.tsx) | [Timeline — AnnotationOverlay](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-4199) |
| [src/components/video-editor/AnnotationSettingsPanel.tsx](../src/components/video-editor/AnnotationSettingsPanel.tsx) | [App — Annotation controls](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=35-750) |
| [src/components/video-editor/ArrowSvgs.tsx](../src/components/video-editor/ArrowSvgs.tsx) | [AnnotationSettingsPanel / figure](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=35-986) — all eight editable direction vectors |
| [src/components/video-editor/CaptionListPanel.tsx](../src/components/video-editor/CaptionListPanel.tsx) | [CaptionListPanel / Editing](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=35-748) |
| [src/components/video-editor/CropControl.tsx](../src/components/video-editor/CropControl.tsx) | [CropControl](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=35-690) |
| [src/components/video-editor/EditorWindow.tsx](../src/components/video-editor/EditorWindow.tsx) | [Assembled editor](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=32-3) |
| [src/components/video-editor/ExportSettingsMenu.tsx](../src/components/video-editor/ExportSettingsMenu.tsx) | [ExportSettingsMenu / MP4](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=35-586), [ExportSettingsMenu / GIF](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=35-642) |
| [src/components/video-editor/ExtensionManager.tsx](../src/components/video-editor/ExtensionManager.tsx) | [ExtensionManager / Legacy](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=35-454) |
| [src/components/video-editor/FormatSelector.tsx](../src/components/video-editor/FormatSelector.tsx) | [FormatSelector / MP4](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=35-472), [FormatSelector / GIF](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=35-489) |
| [src/components/video-editor/GifOptionsPanel.tsx](../src/components/video-editor/GifOptionsPanel.tsx) | [GifOptionsPanel](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=35-519) |
| [src/components/video-editor/KeyboardShortcutsHelp.tsx](../src/components/video-editor/KeyboardShortcutsHelp.tsx) | [Popup/keyboard-help](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=38-853) |
| [src/components/video-editor/PlaybackControls.tsx](../src/components/video-editor/PlaybackControls.tsx) | [Timeline — PlaybackControls](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-4126) |
| [src/components/video-editor/ProjectBrowserDialog.tsx](../src/components/video-editor/ProjectBrowserDialog.tsx) | [App — Projects](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=35-407) |
| [src/components/video-editor/SettingsPanel.tsx](../src/components/video-editor/SettingsPanel.tsx) | [Inspectors — all sections](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-2) |
| [src/components/video-editor/ShortcutsConfigDialog.tsx](../src/components/video-editor/ShortcutsConfigDialog.tsx) | [Popup/shortcuts](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=38-701) |
| [src/components/video-editor/SliderControl.tsx](../src/components/video-editor/SliderControl.tsx) | [SliderControl](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=35-655) |
| [src/components/video-editor/TutorialHelp.tsx](../src/components/video-editor/TutorialHelp.tsx) | [Popup/tutorial](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=38-556), [Popup/feedback](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=38-415), [Popup/keyboard-dialog](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=38-493), [Editor/Header](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=32-391) |
| [src/components/video-editor/VideoEditor.tsx](../src/components/video-editor/VideoEditor.tsx) | [Assembled editor](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=32-3) |
| [src/components/video-editor/VideoPlayback.tsx](../src/components/video-editor/VideoPlayback.tsx) | [Editor/Preview](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=32-887), [Timeline — AnnotationOverlay](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-4199) |
| [src/components/video-editor/WallpaperGrid.tsx](../src/components/video-editor/WallpaperGrid.tsx) | [WallpaperGrid](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=35-713) |
| [src/components/video-editor/WebcamCropControl.tsx](../src/components/video-editor/WebcamCropControl.tsx) | [WebcamCropControl](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=35-674) |
| [src/components/video-editor/layout/CropEditorDialog.tsx](../src/components/video-editor/layout/CropEditorDialog.tsx) | [Popup/crop-dialog](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=38-731) |
| [src/components/video-editor/layout/EditorDialogs.tsx](../src/components/video-editor/layout/EditorDialogs.tsx) | [Popups — Dialogs](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=38-281) |
| [src/components/video-editor/layout/EditorExportMenu.tsx](../src/components/video-editor/layout/EditorExportMenu.tsx) | [Popups — Export](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-4276) |
| [src/components/video-editor/layout/EditorHeader.tsx](../src/components/video-editor/layout/EditorHeader.tsx) | [Editor/Header](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=32-391) |
| [src/components/video-editor/layout/EditorLoadingSkeleton.tsx](../src/components/video-editor/layout/EditorLoadingSkeleton.tsx) | [Popup/loading](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=38-957) |
| [src/components/video-editor/layout/EditorPresetMenu.tsx](../src/components/video-editor/layout/EditorPresetMenu.tsx) | [Popups — Presets & announcements](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-4592) |
| [src/components/video-editor/layout/EditorPreviewPanel.tsx](../src/components/video-editor/layout/EditorPreviewPanel.tsx) | [Editor/Preview](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=32-887), [Popups — Preview](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-4988) |
| [src/components/video-editor/layout/EditorShell.tsx](../src/components/video-editor/layout/EditorShell.tsx) | [Assembled editor](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=32-3) |
| [src/components/video-editor/layout/EditorSidebar.tsx](../src/components/video-editor/layout/EditorSidebar.tsx) | [Editor/Sidebar / Scene](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=32-630), [Inspectors — all sections](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-2), [Tooltip / Sidebar placement](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-4985) |
| [src/components/video-editor/layout/EditorTimelinePanel.tsx](../src/components/video-editor/layout/EditorTimelinePanel.tsx) | [Editor/Timeline](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=32-986), [Timeline — TimelineEditor](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-3613) |
| [src/components/video-editor/layout/EditorVideoPreview.tsx](../src/components/video-editor/layout/EditorVideoPreview.tsx) | [Editor/Preview](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=32-887) |
| [src/components/video-editor/timeline/Item.tsx](../src/components/video-editor/timeline/Item.tsx) | [Timeline — TimelineEditor](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-3613) — clip, zoom, annotation, caption and audio blocks |
| [src/components/video-editor/timeline/Row.tsx](../src/components/video-editor/timeline/Row.tsx) | [Timeline — TimelineEditor](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-3613) — nested row layers |
| [src/components/video-editor/timeline/TimelineEditor.tsx](../src/components/video-editor/timeline/TimelineEditor.tsx) | [Timeline — TimelineEditor](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-3613) |
| [src/components/video-editor/timeline/components/filmstrip/ClipFilmstrip.tsx](../src/components/video-editor/timeline/components/filmstrip/ClipFilmstrip.tsx) | [Timeline — TimelineEditor](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-3613) — nested filmstrip media frames |
| [src/components/video-editor/timeline/components/markers/KeyframeMarkers.tsx](../src/components/video-editor/timeline/components/markers/KeyframeMarkers.tsx) | [Default marker](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=52-7), [Selected marker](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=52-9) |
| [src/components/video-editor/timeline/components/playhead/PlaybackCursor.tsx](../src/components/video-editor/timeline/components/playhead/PlaybackCursor.tsx) | [Timeline — TimelineEditor](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-3613) — nested playhead layers |
| [src/components/video-editor/timeline/components/viewport/TimelineCanvas.tsx](../src/components/video-editor/timeline/components/viewport/TimelineCanvas.tsx) | [Timeline — TimelineEditor](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-3613) — nested track viewport layers |
| [src/components/video-editor/timeline/components/waveform/AudioWaveform.tsx](../src/components/video-editor/timeline/components/waveform/AudioWaveform.tsx) | [AudioWaveform / Normal](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=55-6), [AudioWaveform / Normalized](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=55-9) |
| [src/components/video-editor/timeline/components/wrapper/TimelineWrapper.tsx](../src/components/video-editor/timeline/components/wrapper/TimelineWrapper.tsx) | [Timeline — TimelineEditor](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-3613) — composition/context wrapper |
| [src/contexts/I18nContext.tsx](../src/contexts/I18nContext.tsx) | Provider/bootstrap only; represented through its rendered children. |
| [src/contexts/ShortcutsContext.tsx](../src/contexts/ShortcutsContext.tsx) | Provider/bootstrap only; represented through its rendered children. |
| [src/contexts/ThemeContext.tsx](../src/contexts/ThemeContext.tsx) | Provider/bootstrap only; represented through its rendered children. |
| [src/main.tsx](../src/main.tsx) | Provider/bootstrap only; represented through its rendered children. |

## Native component index

Each row is a Figma component definition. Button names include their containing style family to distinguish repeated size/state names.

### Icons

| Component | Node |
| --- | --- |
| [Icon / Plus](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=16-5) | `16:5` |
| [Icon / Trash](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=16-8) | `16:8` |
| [Icon / Play](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=16-11) | `16:11` |
| [Icon / Pause](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=16-14) | `16:14` |
| [Icon / Scissors](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=16-17) | `16:17` |
| [Icon / Volume2](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=16-20) | `16:20` |
| [Icon / Undo2](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=16-23) | `16:23` |
| [Icon / Redo2](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=16-26) | `16:26` |
| [Icon / ChevronDown](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=16-29) | `16:29` |
| [Icon / Settings2](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=16-32) | `16:32` |
| [Icon / MousePointer](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=16-35) | `16:35` |
| [Icon / Type](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=16-38) | `16:38` |
| [Icon / Camera](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=16-41) | `16:41` |
| [Icon / Image](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=16-44) | `16:44` |
| [Icon / Download](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=16-47) | `16:47` |

### Button

| Component | Node |
| --- | --- |
| [default / Size=sm, State=Default](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=19-20) | `19:20` |
| [default / Size=sm, State=Disabled](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=19-23) | `19:23` |
| [default / Size=default, State=Default](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=19-26) | `19:26` |
| [default / Size=default, State=Disabled](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=19-29) | `19:29` |
| [default / Size=lg, State=Default](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=19-32) | `19:32` |
| [default / Size=lg, State=Disabled](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=19-35) | `19:35` |
| [default / Size=icon, State=Default](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=19-40) | `19:40` |
| [default / Size=icon, State=Disabled](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=19-45) | `19:45` |
| [secondary / Size=sm, State=Default](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=19-48) | `19:48` |
| [secondary / Size=sm, State=Disabled](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=19-51) | `19:51` |
| [secondary / Size=default, State=Default](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=19-54) | `19:54` |
| [secondary / Size=default, State=Disabled](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=19-57) | `19:57` |
| [secondary / Size=lg, State=Default](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=19-60) | `19:60` |
| [secondary / Size=lg, State=Disabled](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=19-63) | `19:63` |
| [secondary / Size=icon, State=Default](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=19-68) | `19:68` |
| [secondary / Size=icon, State=Disabled](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=19-73) | `19:73` |
| [outline / Size=sm, State=Default](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=19-76) | `19:76` |
| [outline / Size=sm, State=Disabled](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=19-79) | `19:79` |
| [outline / Size=default, State=Default](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=19-82) | `19:82` |
| [outline / Size=default, State=Disabled](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=19-85) | `19:85` |
| [outline / Size=lg, State=Default](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=19-88) | `19:88` |
| [outline / Size=lg, State=Disabled](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=19-91) | `19:91` |
| [outline / Size=icon, State=Default](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=19-96) | `19:96` |
| [outline / Size=icon, State=Disabled](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=19-101) | `19:101` |
| [ghost / Size=sm, State=Default](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=19-104) | `19:104` |
| [ghost / Size=sm, State=Disabled](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=19-107) | `19:107` |
| [ghost / Size=default, State=Default](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=19-110) | `19:110` |
| [ghost / Size=default, State=Disabled](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=19-113) | `19:113` |
| [ghost / Size=lg, State=Default](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=19-116) | `19:116` |
| [ghost / Size=lg, State=Disabled](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=19-119) | `19:119` |
| [ghost / Size=icon, State=Default](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=19-124) | `19:124` |
| [ghost / Size=icon, State=Disabled](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=19-129) | `19:129` |
| [destructive / Size=sm, State=Default](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=19-132) | `19:132` |
| [destructive / Size=sm, State=Disabled](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=19-135) | `19:135` |
| [destructive / Size=default, State=Default](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=19-138) | `19:138` |
| [destructive / Size=default, State=Disabled](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=19-141) | `19:141` |
| [destructive / Size=lg, State=Default](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=19-144) | `19:144` |
| [destructive / Size=lg, State=Disabled](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=19-147) | `19:147` |
| [destructive / Size=icon, State=Default](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=19-152) | `19:152` |
| [destructive / Size=icon, State=Disabled](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=19-157) | `19:157` |
| [destructive-soft / Size=sm, State=Default](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=19-160) | `19:160` |
| [destructive-soft / Size=sm, State=Disabled](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=19-163) | `19:163` |
| [destructive-soft / Size=default, State=Default](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=19-166) | `19:166` |
| [destructive-soft / Size=default, State=Disabled](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=19-169) | `19:169` |
| [destructive-soft / Size=lg, State=Default](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=19-172) | `19:172` |
| [destructive-soft / Size=lg, State=Disabled](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=19-175) | `19:175` |
| [destructive-soft / Size=icon, State=Default](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=19-180) | `19:180` |
| [destructive-soft / Size=icon, State=Disabled](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=19-185) | `19:185` |
| [link / Size=sm, State=Default](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=19-188) | `19:188` |
| [link / Size=sm, State=Disabled](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=19-191) | `19:191` |
| [link / Size=default, State=Default](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=19-194) | `19:194` |
| [link / Size=default, State=Disabled](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=19-197) | `19:197` |
| [link / Size=lg, State=Default](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=19-200) | `19:200` |
| [link / Size=lg, State=Disabled](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=19-203) | `19:203` |
| [link / Size=icon, State=Default](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=19-208) | `19:208` |
| [link / Size=icon, State=Disabled](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=19-213) | `19:213` |

### Input

| Component | Node |
| --- | --- |
| [State=Default](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=22-5) | `22:5` |
| [State=Disabled](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=22-8) | `22:8` |
| [State=Filled](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=22-11) | `22:11` |

### TextArea

| Component | Node |
| --- | --- |
| [TextArea](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=22-30) | `22:30` |

### Switch

| Component | Node |
| --- | --- |
| [State=Off](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=23-8) | `23:8` |
| [State=On](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=23-14) | `23:14` |
| [State=Disabled](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=23-20) | `23:20` |

### Slider

| Component | Node |
| --- | --- |
| [State=Single](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=24-8) | `24:8` |
| [State=Range](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=24-16) | `24:16` |
| [State=Disabled](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=24-22) | `24:22` |

### Toggle

| Component | Node |
| --- | --- |
| [State=Default](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=28-5) | `28:5` |
| [State=Selected](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=28-8) | `28:8` |
| [State=Disabled](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=28-11) | `28:11` |

### ToggleGroup

| Component | Node |
| --- | --- |
| [ToggleGroup](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=28-35) | `28:35` |

### ChoiceGroup

| Component | Node |
| --- | --- |
| [ChoiceGroup](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=28-44) | `28:44` |

### Tabs

| Component | Node |
| --- | --- |
| [Tabs](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=28-57) | `28:57` |

### Select

| Component | Node |
| --- | --- |
| [Select](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=28-64) | `28:64` |

### Card

| Component | Node |
| --- | --- |
| [Card](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=30-14) | `30:14` |

### Accordion

| Component | Node |
| --- | --- |
| [State=Expanded](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=30-25) | `30:25` |
| [State=Collapsed](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=30-31) | `30:31` |

### Label

| Component | Node |
| --- | --- |
| [Label](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=30-50) | `30:50` |

### Separator

| Component | Node |
| --- | --- |
| [Separator](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=30-53) | `30:53` |

### Skeleton

| Component | Node |
| --- | --- |
| [Skeleton](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=30-57) | `30:57` |

### App — Shared utilities

| Component | Node |
| --- | --- |
| [ColorPalette](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=35-368) | `35:368` |
| [ColorControl](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=35-379) | `35:379` |
| [ContentClamp](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=35-383) | `35:383` |
| [ItemContent](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=35-390) | `35:390` |
| [AudioLevelMeter / 12](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=35-395) | `35:395` |
| [AudioLevelMeter / 72](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=35-400) | `35:400` |
| [AudioLevelMeter / 94](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=35-405) | `35:405` |

### App — Projects

| Component | Node |
| --- | --- |
| [ProjectBrowserDialog / Populated](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=35-432) | `35:432` |
| [ProjectBrowserDialog / Empty](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=35-443) | `35:443` |
| [ExtensionManager / Legacy](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=35-454) | `35:454` |

### App — Export controls

| Component | Node |
| --- | --- |
| [FormatSelector / MP4](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=35-472) | `35:472` |
| [FormatSelector / GIF](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=35-489) | `35:489` |
| [GifOptionsPanel](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=35-519) | `35:519` |
| [ExportSettingsMenu / MP4](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=35-586) | `35:586` |
| [ExportSettingsMenu / GIF](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=35-642) | `35:642` |

### App — Preview controls

| Component | Node |
| --- | --- |
| [SliderControl](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=35-655) | `35:655` |
| [WebcamCropControl](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=35-674) | `35:674` |
| [CropControl](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=35-690) | `35:690` |
| [WallpaperGrid](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=35-713) | `35:713` |
| [CaptionListPanel / Editing](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=35-748) | `35:748` |

### App — Annotation controls

| Component | Node |
| --- | --- |
| [AnnotationSettingsPanel / text](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=35-879) | `35:879` |
| [AnnotationSettingsPanel / figure](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=35-986) | `35:986` |
| [AnnotationSettingsPanel / blur](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=35-1098) | `35:1098` |
| [AnnotationSettingsPanel / image](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=35-1159) | `35:1159` |

### App — Recording & sources

| Component | Node |
| --- | --- |
| [RecordingControls / Recording](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=35-1191) | `35:1191` |
| [RecordingControls / Paused](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=35-1222) | `35:1222` |
| [SourceSelectorContent / Sources](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=35-1255) | `35:1255` |
| [SourceSelectorContent / Empty](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=35-1260) | `35:1260` |
| [SourceSelectorContent / Loading](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=35-1265) | `35:1265` |
| [DropdownItem / Selected](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=35-1280) | `35:1280` |
| [MicDeviceRow / Selected and unselected](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=35-1301) | `35:1301` |
| [MarqueeText](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=35-1306) | `35:1306` |

### Popups — Recording

| Component | Node |
| --- | --- |
| [Popup/launch-mic-devices](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=38-37) | `38:37` |
| [Popup/launch-webcam-devices](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=38-67) | `38:67` |
| [Popup/launch-countdown](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=38-97) | `38:97` |
| [Popup/launch-mic](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=38-113) | `38:113` |
| [Popup/launch-webcam](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=38-122) | `38:122` |
| [Popup/launch-more](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=38-236) | `38:236` |
| [Popup/launch-sources](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=38-255) | `38:255` |
| [Popup/launch-projects](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=38-279) | `38:279` |

### Popups — Dialogs

| Component | Node |
| --- | --- |
| [Popup/project-save](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=38-307) | `38:307` |
| [Popup/project-saving](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=38-334) | `38:334` |
| [Popup/unsaved-changes](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=38-353) | `38:353` |
| [Popup/native-capture-unavailable](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=38-368) | `38:368` |
| [Popup/feedback](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=38-415) | `38:415` |
| [Popup/keyboard-dialog](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=38-493) | `38:493` |
| [Popup/tutorial](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=38-556) | `38:556` |
| [Popup/dialog](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=38-573) | `38:573` |
| [Popup/font](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=38-605) | `38:605` |
| [Popup/shortcuts](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=38-701) | `38:701` |
| [Popup/crop-dialog](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=38-731) | `38:731` |

### Popups — Controls & feedback

| Component | Node |
| --- | --- |
| [Popup/select](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=38-759) | `38:759` |
| [Popup/popover](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=38-769) | `38:769` |
| [Popup/dropdown](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=38-783) | `38:783` |
| [Popup/toast](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=38-794) | `38:794` |
| [Popup/keyboard-help](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=38-853) | `38:853` |
| [Popup/color](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=38-886) | `38:886` |
| [Popup/loading](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=38-957) | `38:957` |

### Inspectors — all sections

| Component | Node |
| --- | --- |
| [Inspector/scene / Basic](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-116) | `41:116` |
| [Inspector/scene / Advanced](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-283) | `41:283` |
| [Inspector/frame / Basic](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-398) | `41:398` |
| [Inspector/frame / Advanced](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-565) | `41:565` |
| [Inspector/crop / Basic](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-680) | `41:680` |
| [Inspector/crop / Advanced](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-847) | `41:847` |
| [Inspector/cursor / Basic](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-932) | `41:932` |
| [Inspector/cursor / Advanced](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-1115) | `41:1115` |
| [Inspector/captions / Basic](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-1177) | `41:1177` |
| [Inspector/captions / Advanced](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-1300) | `41:1300` |
| [Inspector/caption / Basic](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-1337) | `41:1337` |
| [Inspector/caption / Advanced](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-1374) | `41:1374` |
| [Inspector/webcam / Basic](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-1451) | `41:1451` |
| [Inspector/webcam / Advanced](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-1600) | `41:1600` |
| [Inspector/settings / Basic](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-1668) | `41:1668` |
| [Inspector/settings / Advanced](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-1839) | `41:1839` |
| [Inspector/zoom / Basic](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-1878) | `41:1878` |
| [Inspector/zoom / Advanced](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-1930) | `41:1930` |
| [Inspector/clip / Basic](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-1957) | `41:1957` |
| [Inspector/clip / Advanced](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-1984) | `41:1984` |
| [Inspector/audio / Basic](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-2016) | `41:2016` |
| [Inspector/audio / Advanced](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-2048) | `41:2048` |
| [Inspector/extensions / Basic](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-2163) | `41:2163` |
| [Inspector/extensions / Advanced](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-2330) | `41:2330` |
| [Inspector/Background / Image](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-2444) | `41:2444` |
| [Inspector/Background / Video](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-2497) | `41:2497` |
| [Inspector/Background / Color](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-2575) | `41:2575` |
| [Inspector/Background / Gradient](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-2661) | `41:2661` |
| [Inspector/Zoom / Manual](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-2713) | `41:2713` |
| [Inspector/Clip / Muted and speed override](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-2742) | `41:2742` |
| [Inspector/Captions / Model unavailable](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-2804) | `41:2804` |
| [Inspector/Captions / Downloading model](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-2868) | `41:2868` |
| [Inspector/Captions / Model ready](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-2930) | `41:2930` |
| [Inspector/Captions / Generating](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-2998) | `41:2998` |
| [Inspector/Captions / Download error](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-3060) | `41:3060` |
| [Inspector/Webcam / Empty](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-3131) | `41:3131` |
| [Inspector/Cursor / Hidden](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-3216) | `41:3216` |
| [Inspector/Zoom / No selection](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-3220) | `41:3220` |
| [Inspector/Clip / No selection](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-3240) | `41:3240` |
| [Inspector/Audio / No selection](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-3265) | `41:3265` |

### Timeline — TimelineEditor

| Component | Node |
| --- | --- |
| [TimelineEditor / clip selected](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-3712) | `41:3712` |
| [TimelineEditor / zoom selected](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-3812) | `41:3812` |
| [TimelineEditor / annotation selected](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-3912) | `41:3912` |
| [TimelineEditor / audio selected](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-4012) | `41:4012` |
| [TimelineEditor / caption selected](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-4112) | `41:4112` |
| [TimelineEditor / Empty](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-4124) | `41:4124` |

### Timeline — PlaybackControls

| Component | Node |
| --- | --- |
| [PlaybackControls / Paused](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-4149) | `41:4149` |
| [PlaybackControls / Playing](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-4173) | `41:4173` |
| [PlaybackControls / Muted](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-4197) | `41:4197` |

### Timeline — AnnotationOverlay

| Component | Node |
| --- | --- |
| [AnnotationOverlay / text / Default](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-4205) | `41:4205` |
| [AnnotationOverlay / text / Selected](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-4219) | `41:4219` |
| [AnnotationOverlay / figure / Default](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-4226) | `41:4226` |
| [AnnotationOverlay / figure / Selected](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-4240) | `41:4240` |
| [AnnotationOverlay / image / Default](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-4245) | `41:4245` |
| [AnnotationOverlay / image / Selected](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-4257) | `41:4257` |
| [AnnotationOverlay / blur / Default](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-4262) | `41:4262` |
| [AnnotationOverlay / blur / Selected](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-4274) | `41:4274` |

### Popups — Export

| Component | Node |
| --- | --- |
| [Popup/export-settings-mp4](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-4357) | `41:4357` |
| [Popup/export-settings-gif](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-4413) | `41:4413` |
| [Popup/export-preparing](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-4431) | `41:4431` |
| [Popup/export-rendering](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-4452) | `41:4452` |
| [Popup/export-audio](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-4473) | `41:4473` |
| [Popup/export-finalizing](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-4491) | `41:4491` |
| [Popup/export-muxing](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-4509) | `41:4509` |
| [Popup/export-saving](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-4527) | `41:4527` |
| [Popup/export-success](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-4541) | `41:4541` |
| [Popup/export-error](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-4553) | `41:4553` |
| [Popup/export-pending-save](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-4567) | `41:4567` |
| [Popup/export-legacy](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-4590) | `41:4590` |

### Popups — Presets & announcements

| Component | Node |
| --- | --- |
| [Popup/presets-empty](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-4611) | `41:4611` |
| [Popup/presets-saved](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-4649) | `41:4649` |
| [Popup/announcement-popup](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-4683) | `41:4683` |
| [Popup/announcement-banner](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-4701) | `41:4701` |
| [Popup/announcement-notification](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-4713) | `41:4713` |
| [Popup/toolbar-aspect-ratio](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-4757) | `41:4757` |
| [Popup/announcement-cover](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=51-37) | `51:37` |

### Windows & tooltips

| Component | Node |
| --- | --- |
| [UpdateToastWindow / Available](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-4778) | `41:4778` |
| [UpdateToastWindow / Downloading](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-4803) | `41:4803` |
| [UpdateToastWindow / Ready](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-4823) | `41:4823` |
| [UpdateToastWindow / Check error](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-4843) | `41:4843` |
| [UpdateToastWindow / Download error](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-4863) | `41:4863` |
| [UpdateToastWindow / Experimental](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-4886) | `41:4886` |
| [UpdateToastWindow / Preview](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-4909) | `41:4909` |
| [CountdownOverlay / 3 seconds](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-4916) | `41:4916` |
| [HudWindow / Idle](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-4968) | `41:4968` |
| [App / Startup](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-4977) | `41:4977` |
| [Tooltip / Content clamp](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-4981) | `41:4981` |
| [Tooltip / Sidebar placement](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-4985) | `41:4985` |

### Popups — Preview

| Component | Node |
| --- | --- |
| [Popup/aspect-ratio](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-5017) | `41:5017` |
| [Popup/add-layer](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-5025) | `41:5025` |
| [Popup/preview-volume](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=41-5034) | `41:5034` |

### HUD — recording states

| Component | Node |
| --- | --- |
| [HUD / Finalizing recording](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=46-18) | `46:18` |
| [HUD / Floating webcam preview](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=46-23) | `46:23` |
| [HUD / Recording](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=46-61) | `46:61` |

### Timeline — KeyframeMarkers

| Component | Node |
| --- | --- |
| [State=Default](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=52-7) | `52:7` |
| [State=Selected](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=52-9) | `52:9` |

### Timeline — AudioWaveform

| Component | Node |
| --- | --- |
| [AudioWaveform / Normal](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=55-6) | `55:6` |
| [AudioWaveform / Normalized](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=55-9) | `55:9` |

### Editor — shell & screen

| Component | Node |
| --- | --- |
| [Editor/Header](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=32-391) | `32:391` |
| [Editor/Sidebar / Scene](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=32-630) | `32:630` |
| [Editor/Preview](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=32-887) | `32:887` |
| [Editor/Timeline](https://www.figma.com/design/bE2Ew2nF1Zd0ixci9SwJDm?node-id=32-986) | `32:986` |

## Reproducible capture fixtures

| Entry | Coverage |
| --- | --- |
| `design-library.html` | Primitive controls and variants |
| `design-capture.html?windowType=editor` | Actual assembled renderer |
| `design-app-catalog.html` | Shared app controls, source lists and annotation inspectors |
| `design-app-catalog.html?view=all-states` | 26 popup and dialog states |
| `design-inspector-catalog.html` | 40 inspector/background states |
| `design-timeline-catalog.html` | Timeline, playback and annotation overlays |
| `design-timeline-details.html` | Explicit waveform peaks and keyframe markers |
| `design-extra-catalog.html` | Export, preset and announcement states; legacy toolbar |
| `design-extra-catalog.html?view=announcement-cover` | Cover-media announcement |
| `design-preview-menus.html` | Aspect ratio, Add Layer and volume menus |
| `design-window-catalog.html` | Seven update states, countdown, idle HUD, startup and tooltips |
| `design-hud-branches.html` | Finalizing recorder and floating webcam/recording HUD |
| `design-window-capture.html` | Individual window state verification through the live bridge path |

The capture entry points load the existing test bridge and fixture media. The renderer-only development server must be running to use them. They are separate from the production `index.html` entry.

## Validation

- TypeScript and targeted lint pass for source changes and all capture fixtures.
- Timeline/deletion changes: 135 focused unit tests and 13 browser regressions passed.
- Controlled and live update-window paths were rendered successfully; the window/detail galleries reported no JavaScript errors.
- Figma audit checks native component/layer counts, variable aliases and fonts. Visual QA corrected capture artifacts in slider borders, tooltip sizing and popup envelopes. Raw and failed intermediate capture frames were removed after conversion.

Compatibility toolbar, unmounted ruler and marker-overlay source files were removed on 20 September 2026. Their earlier Figma captures are historical, not current app surfaces.
