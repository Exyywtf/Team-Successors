# Team Successors Cinematic Website

Production-ready Next.js App Router website for Team Successors (F1 in Schools), built with TypeScript, Tailwind CSS v4 (CSS-first), and Framer Motion.

## Stack

- Next.js + App Router + TypeScript
- Tailwind CSS v4 (`@tailwindcss/postcss`)
- Framer Motion
- `next/font/google` (Orbitron + Montserrat)
- `next/image` (with resilient fallback wrapper)

## Setup

1. `npm install`
2. `npm run dev`
3. `npm run build`

## Windows: winget installed Node but npm not found (Git Bash fix)

1. Close ALL terminals (PowerShell, Git Bash, VS Code terminal) and reopen them.
2. Run in PowerShell:

```powershell
node -v
npm -v
where.exe node
where.exe npm
```

3. If this works in PowerShell but not in Git Bash, Git Bash is likely using an old PATH snapshot.
   Restart Git Bash, restart VS Code if you use the integrated terminal, then inside Git Bash run:

```bash
cmd //c "npm -v"
```

4. Use the provided bootstrap script:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/windows-dev.ps1
```

Helpful diagnostics:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/windows-fix-path.ps1
```

## Editable Content

- Site settings (team name, email, socials): `lib/siteConfig.ts`
- All copy/data (single source of truth): `content/siteContent.json`

## Optional Media Assets

The site runs without these files, but supports them when added:

- Hero video: `public/hero.webm` (preferred) or `public/hero.mp4`
- Sponsorship deck: `public/deck.pdf`

## Deployment (Vercel)

1. Push this repo to GitHub/GitLab/Bitbucket.
2. In Vercel, click **Add New Project** and import the repository.
3. Keep defaults for framework detection (Next.js).
4. Deploy.
5. Add your production domain in **Project Settings -> Domains**.

## Spaceship DNS Guidance (Generic)

1. Open Spaceship DNS for your domain.
2. Add the DNS records shown by Vercel (typically one `A` record and/or one `CNAME`).
3. Remove conflicting old records for the same host.
4. Wait for propagation.
5. In Vercel Domains, verify status and set the primary domain.
6. Confirm SSL is active in Vercel once verification completes.

## Build Notes

- No database/CMS/auth/API routes.
- Contact form is mailto-only (`successorsf1@gmail.com`).
- Deck CTA uses resilient runtime probing (HEAD then GET fallback).
- Hero media falls back to cinematic gradient/noise if video is missing.
