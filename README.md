# Pick Calculator

Warehouse workforce planning PWA.

## How it works

The app plans a day against a target and tracks progress towards it. Three shifts
run in order:

| Shift | Window | Target |
|---|---|---|
| Night | 20:00-05:00 | 100% of its own **night total** |
| AM | 05:00-13:00 | Its % share of the **daily total** |
| PM | 13:00-18:00 | Its % share of the **daily total** |

The app picks the shift from the clock; you can switch manually and the choice
sticks for the day.

1. **Plan tab** — *Plan* holds the night total, the daily total, the AM/PM split
   (%) and the chamber split (%) across Ambient / Chill / Freezer. The chamber
   split is the same for every shift. *Status* shows a table per chamber, plus an
   All chambers summary first, with target, picked, remaining and staffing delta
   by shift.
2. **Picked tab** — a row per chamber with columns for units picked **manually**
   and **by OGRP**, and totals and percentages underneath.
3. **People tab** — chambers as columns. Remaining units and a **calculated
   OGRP %** are derived from the picks; the **predicted OGRP %** is pre-filled
   from that calculation but stays editable, and both figures are kept
   separately. Shows people needed, delta, and units/hour required vs available.
4. **Time tab** — enter a quantity per chamber and read back when it will be
   done, using the People tab's figures. Edits here are what-if only and never
   write back. A finish time past that chamber's pickout is flagged in red.

**Carryover** rolls forward: anything Night leaves short goes into AM's target,
and anything AM leaves short goes into PM's. It only ever adds — a shift beating
its share means the forecast was low, so the next shift's target is left alone.

**Pick out times** are set per shift and chamber in Settings (behind the gear in
the header) and auto-fill on the People tab, where you can override them for the
day.

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

- All data is stored in localStorage on the device — no server, no account, no
  sync. It is per-browser, so a phone and a laptop keep separate data, and
  clearing site data wipes it including history.
- Plan totals, picked quantities and the Time tab's scratch figures are
  date-stamped and reset each day. Percentages, pickout times and the per-chamber
  OGRP/UPH defaults carry over.
- The service worker enables offline use. The page itself is fetched
  network-first, so a new build always wins when online.
- Dark mode is supported automatically
