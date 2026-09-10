# Columbus Road Truck Service — Website

Simple static website for a one-owner semi / commercial truck shop at **111 Columbus Rd, Columbus, OH**.

No database. No admin panel. Update the site by editing a few plain files, then redeploy.

---

## Quick start (developers)

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal (usually `http://localhost:4321`).

```bash
npm run build    # builds to dist/
npm run preview  # preview the production build
```

---

## How the owner updates the site

Everything editable lives in **`content/`**.  
Step-by-step instructions are in **[CONTENT.md](./CONTENT.md)**.

| Task | Edit this |
|------|-----------|
| Phone, email, hours, address, shop name | `content/site.json` |
| Add / remove / reorder services | `content/services.json` |
| About page text | `content/about.md` |
| Gallery captions & image names | `content/gallery.json` |
| Photos | Drop files into `public/images/` |

After editing, **redeploy** (Netlify or Vercel will rebuild automatically if the site is connected to Git).

### Add a service (short version)

1. Open `content/services.json`
2. Copy an existing item block
3. Change `name` and `description` (optional `price`)
4. Save → redeploy

### Add a photo (short version)

1. Put `my-photo.jpg` in `public/images/`
2. Add `{ "file": "my-photo.jpg", "caption": "..." }` to `content/gallery.json`
3. Save → redeploy

To replace the big homepage background, overwrite `public/images/hero-truck.jpg`.

---

## Deploy to Netlify

1. Push this project to a GitHub repo (Joinware org or your shop account).
2. Go to [Netlify](https://app.netlify.com) → **Add new site** → **Import an existing project**.
3. Build settings (also in `netlify.toml`):
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Deploy.
5. Contact form uses **Netlify Forms** (`data-netlify="true"`). After the first deploy, submit a test message and check **Forms** in the Netlify dashboard.

Or drag-and-drop the `dist` folder after running `npm run build` (manual deploys won’t auto-update from Git).

---

## Deploy to Vercel

1. Push the project to GitHub.
2. Go to [Vercel](https://vercel.com) → **Add New Project** → import the repo.
3. Framework preset: **Astro** (or set):
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
4. Deploy.

`vercel.json` is included for static output.

> Note: Netlify Forms only work on Netlify. On Vercel, use the mailto link on the Contact page, or connect a form service later.

---

## Project layout

```
content/           ← owner edits these files
  site.json
  services.json
  about.md
  gallery.json
public/images/     ← drop photos here
src/               ← site code (leave alone for normal updates)
CONTENT.md         ← owner how-to
```

---

## Placeholders to replace

Before going live, update in `content/site.json`:

- Phone: currently `(614) 555-0142`
- Email: currently `service@columbusroadtruck.com`
- Hours: sample weekday / Saturday / Sunday hours
- Optional Facebook / Instagram URLs

Shop name used: **Columbus Road Truck Service** (change `shopName` anytime).

Photos are stock placeholders — replace with your own shop / truck / tire photos when ready.
