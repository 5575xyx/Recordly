# HeroUI UI branch

This migration is isolated on `codex/heroui-ui`, based on `9693ad7` from
`codex/clip-controls`. It lives in the sibling `recordly-heroui` Git worktree.
The original `recordly` checkout and its uncommitted files were left intact.
Nothing has been merged or pushed.

## Try it

From the original checkout:

```sh
cd ../recordly-heroui
npm run dev
```

A fresh checkout needs `npm install` first, including Recordly's normal native
helper installation. The dependency lockfile belongs to this branch.

To go back, close the development app and run `npm run dev` from the original
`recordly` directory. No reset, stash, or file restoration is needed. You can
keep both checkouts while comparing them. If this commit is merged later,
`git revert <migration-commit>` reverses the migration without rewriting history.

## UI approach

The controls use HeroUI React 3.2.6 and its default light/dark theme, following
[the official component demos](https://heroui.com/en/docs/react/components).
This includes buttons, fields, switches, sliders, tabs, toggle groups, radios,
selects, modals, popovers, menus, tooltips, color pickers, progress indicators,
skeletons, and toasts. React 19 and Tailwind 4 satisfy HeroUI v3 requirements.
The former Radix, Sonner, and third-party color picker dependencies are removed.

The editor uses docked surfaces, a fixed-width inspector, aligned toolbars,
consistent spacing, and restrained selection colors. Floating layers keep one
surface instead of nesting cards and shadows. Timeline colors follow the theme
and retain the distinction between clip types. The recorder keeps its compact
desktop layout.

The adapters in `src/components/ui` translate existing Recordly state/callback
props to HeroUI APIs. The timeline geometry, crop handles, video canvas, caption
canvas editor, waveform, and native file inputs remain application-specific;
HeroUI does not replace those editing engines. Recording/export/project logic
is retained, with nullable ref types updated for React 19.

## Verification

```sh
npm run typecheck
npm test
npx vite build
npx playwright install chromium
npm run test:ui
```

The production build includes both the renderer and Electron main/preload
bundles. It is not an installer packaging run.

Browser tests use an explicit mocked Electron bridge and a generated six-second
video fixture; they never start a real screen recording. They cover control
callbacks and keyboard behavior, modal focus, export settings, presets, cropping,
annotation formatting/undo, project menus, recorder popovers, countdown and update
windows, theme switching, and a smaller desktop layout. Screenshots and failure
traces go to the ignored `test-results/` directory.

`npm run dev:ui` starts only Vite for browser inspection; the component fixture
is at `/tests/ui/controls.html`. The real editor requires Electron or the test
bridge. Native recording, device permissions, and end-to-end media export still
need a desktop smoke test on the target platform.
