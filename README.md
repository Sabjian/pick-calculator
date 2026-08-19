# Pick Calculator

Warehouse workforce planning PWA.

## How it works

The app plans a day against a target and tracks progress towards it.

1. **Plan tab** — enter the **daily total** units, the **AM / PM** shift split (%), and the **chamber split** (%) across Ambient / Chill / Freezer. The chamber split applies to the whole day. The overview shows every chamber's AM and PM target, picked, remaining and staffing delta.
2. **People tab** — pick a shift and a chamber, then enter **units picked manually** and **units picked by OGRP**. From those the app derives remaining units and a **calculated OGRP %**. The **predicted OGRP %** is pre-filled from that calculation but stays editable, and both figures are kept and shown separately.
3. **Pick out times** are set per shift and chamber in Settings, and auto-fill on the People tab.
4. **Carryover** — anything AM leaves unpicked rolls into PM's working target automatically.

Shifts are AM 05:00-13:00 and PM 13:00-18:00 — the PM window is when the pick actually runs, which is what its targets represent. The app selects the shift from the clock; you can switch manually at any time and the choice sticks for the day.

The Time tab is an independent manual calculator and is unaffected by the plan.

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
