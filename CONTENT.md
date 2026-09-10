# Content guide (for the shop owner)

All day-to-day website text lives in this `content/` folder.  
You do **not** need to edit any code. Change a file here, then redeploy the site (see the main README).

---

## Files you can edit

| File | What it controls |
|------|------------------|
| `site.json` | Shop name, phone, email, address, hours, map links, SEO title/description |
| `services.json` | List of services on the Services page (and featured list on Home) |
| `about.md` | About page paragraphs |
| `gallery.json` | Photo filenames + captions on the Home page |

Photos go in `public/images/` (not in `content/`).

---

## Change phone, hours, or address

Open `content/site.json` and edit the plain-English fields:

- `phone` — shown in the header band, CTAs, and Contact
- `email`
- `address` — `street`, `city`, `state`, `zip`
- `hours` — each row has `days` and `time`
- `mapUrl` / `mapEmbedUrl` — update if the address changes

Save the file, then redeploy.

---

## Add a service

1. Open `content/services.json`.
2. Copy one existing block inside `"items": [ ... ]`.
3. Paste it where you want it in the list (order = website order).
4. Fill in the fields:

```json
{
  "name": "Your service name",
  "description": "One or two plain sentences about what you offer.",
  "price": "From $99"
}
```

- `price` is **optional** — delete that line if you don’t want a price shown.
- Keep a comma between items. The last item should **not** have a trailing comma after its closing `}`.

5. Save and redeploy.

### Remove a service

Delete that whole `{ ... }` block (and the extra comma if needed).

### Reorder services

Cut and paste whole blocks so they appear in the order you want.

---

## Edit the About page

Open `content/about.md`.  
Write normal paragraphs separated by a blank line.  
You can use `**bold**` if you want emphasis.

---

## Add or replace a gallery photo

1. Put the image file in `public/images/`  
   Example: `public/images/my-new-truck.jpg`
2. Open `content/gallery.json`.
3. Copy a block and fill it in:

```json
{
  "file": "my-new-truck.jpg",
  "caption": "Short caption under the photo"
}
```

4. To change the big Home page background, replace `public/images/hero-truck.jpg` (keep the same filename, or update the path in the page code — replacing the file is easier).

Tips:

- Prefer JPG or WebP
- Wide photos work best for the hero
- Square or landscape works for gallery shots

---

## Chat widget (Wolof Teacher embed)

In `site.json`, under `"chatWidget"`:

- `enabled` — `true` / `false` to show or hide the popup launcher
- `siteKey` — publishable key from Joinware (`pk_…`)
- `scriptSrc` — loader URL (currently `https://wolof-teacher-chat.netlify.app/embed.js`)
- `pack` / `defaultTarget` / `position` — optional embed options

The site’s domain must be on that key’s allowlist in the Wolof Teacher Worker
(`apps/api/src/sites.ts`). This shop’s Netlify URL is already listed for
`pk_live_clinic_dakar_01`.

---

## Social links (optional)

In `site.json`, under `"social"`, add full URLs when ready:

```json
"facebook": "https://facebook.com/yourpage",
"instagram": "https://instagram.com/yourpage"
```

(Empty strings are fine until you have links.)
