# Team Successors Website (Internal)

## Overview

Official website for F1 in Schools team. Built for performance and cinematic visuals.

## Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion v12

## Project Structure

- `src/app`: Application routes.
- `src/components`: UI library.
  - `layout`: Global shells (Navbar, Footer).
  - `ui`: Atomic components (Button, Card).
  - `sections`: Page-specific blocks.
  - `media`: Video/Image wrappers.
- `src/content`: Content JSON (Single Source of Truth).
- `_quarantine`: Deprecated files pending deletion.

## Development

1. `npm install`
2. `npm run dev`

## Deployment

- Deployed on Vercel.
- Main branch triggers production deploy.

## Performance Notes

- Below-fold sections are lazy-loaded.
- Hero video is persistent to avoid re-renders.
