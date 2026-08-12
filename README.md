# Birthday site

A single-page animated birthday site: a "tap to open" gift screen, a photo story in four chapters,
and a date invitation she answers with a yes or a no (only one of which is allowed to win).

Built with Vite + React + TypeScript, Tailwind CSS v4, Framer Motion (`motion`) and `canvas-confetti`.
It compiles to plain static files, which is why it deploys to Netlify for free with no server.

## Run it locally

```bash
npm install
npm run dev
```

Then open the printed URL (usually http://localhost:5173).

## Personalise it

Everything you'd want to change lives in `src/content.ts`:

- `herName` — her name or nickname, used on the gift screen, the hero and the marquee.
- `yourName` — the signature at the end.
- `googleFormUrl` — optional Google Form embed URL (see below). Empty by default, and nothing is
  rendered when it's empty.
- `copy` — every line of text on the site, grouped by section.

## The date question

The answer lives in the page itself, no form required. She gets two buttons:

- **No** — replies "This is not how heaven works. Keeping only yes, then." and the No button
  disappears, leaving only Yes.
- **Yes** — rains heart confetti and reveals the confirmation card: the date and time, the promise to
  pick her up, and the note about the present waiting for her.

Change any of that wording (and the date itself) under `copy.date` in `src/content.ts` — `when`,
`pickup`, `presentNote`, `noReply`.

Nothing is sent anywhere, so her answer only exists on her screen. If you also want a copy of the
answer in your inbox, set `googleFormUrl` in `src/content.ts` and a Google Form appears inside the
question card: create the form, click **Send** → the `< >` (embed HTML) tab, copy only the `src="..."`
URL, and turn on response notifications in the form's **Responses** tab. Leave it empty and no form
is rendered at all.

## Photos

Originals live in `assets/` (about 46 MB). They are never shipped as-is. `npm run images` reads them,
fixes rotation, resizes to max 1600px and writes web-sized WebP files into `public/photos/`
(about 2 MB total), which is what the site loads.

Re-run it whenever you add or replace a photo:

```bash
npm run images
```

To swap in a new photo, drop it in `assets/`, add an entry to the `SLUGS` map in
`scripts/optimize-images.mjs`, re-run the command, then reference the new slug in `src/content.ts`.

## Deploy to Netlify

`netlify.toml` already sets the build command and publish directory, so there is nothing to configure
in the UI.

**Option A — connect the repo (recommended):** push this folder to GitHub, then in Netlify choose
*Add new site → Import an existing project*, pick the repo and deploy. Every push redeploys.

**Option B — drag and drop:** run `npm run build`, then drag the generated `dist/` folder onto
https://app.netlify.com/drop.

**Option C — CLI:**

```bash
npm run build
npx netlify-cli deploy --prod --dir=dist
```

Afterwards, rename the site in *Site configuration → Change site name* so the link looks nice when
you send it to her.

## Scripts

| Command             | What it does                                      |
| ------------------- | ------------------------------------------------- |
| `npm run dev`       | Dev server with hot reload                        |
| `npm run build`     | Typechecks and builds into `dist/`                |
| `npm run preview`   | Serves the production build locally               |
| `npm run typecheck` | `tsc --noEmit`                                    |
| `npm run images`    | Re-generates `public/photos` from `assets/`       |
