# Pick Calculator

Warehouse workforce planning PWA.

## Files

- `index.html` — the app
- `manifest.json` — PWA metadata (name, icons, display mode)
- `sw.js` — service worker (enables offline use + install prompt)
- `icon-192.png` / `icon-512.png` — app icons (add your own, or use a placeholder generator)

## Deploy to GitHub Pages

1. Create a new GitHub repository (e.g. `pick-calculator`)
2. Upload all files to the repository root
3. Go to **Settings → Pages**
4. Set source to `main` branch, root folder
5. Save — your app will be live at `https://yourusername.github.io/pick-calculator`

## Icons

You need two PNG icons for the full PWA experience:
- `icon-192.png` (192×192px)
- `icon-512.png` (512×512px)

Quick option: generate free icons at https://favicon.io or https://realfavicongenerator.net

## Install on phone

**Android (Chrome):** Open the URL → 3-dot menu → "Add to home screen"

**iPhone (Safari):** Open the URL → Share button → "Add to Home Screen"

## Notes

- History is stored in localStorage on the device
- The service worker enables offline use after first load
- Dark mode is supported automatically
