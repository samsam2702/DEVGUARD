# DevGuard

AI-Powered Workplace Behavioral Intelligence Platform — frontend application.

## Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS v4
- ShadCN-style UI primitives (Button, Card, Badge, Input)
- Lucide React icons
- React Router

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL in your browser.

## Routes

- `/` — Login (choose Employee or HR / Manager access)
- `/employee` — Confidential employee chat assistant with voice and facial (FER) capture
- `/hr` — Management analytics dashboard (risk scoring, signal breakdown, root cause, wellness monitoring)

## Notes

- No data is hardcoded. All dashboard and chat components render professional empty states
  until real data is supplied via props or a connected backend/API.
- Color system: white surfaces, light gray sections, blue (#2563EB) accent, dark gray text —
  defined as CSS custom properties in `src/index.css`.
- Folder structure: `src/components/{ui,shared,employee,hr}`, `src/pages`, `src/layouts`,
  `src/hooks`, `src/lib`.

## Build

```bash
npm run build
```

Outputs a production build to `dist/`.

