# databites-site

Source for [databites.tech](https://databites.tech), the site of Josep Ferrer. Plain HTML, CSS and JavaScript, with no build step. Deployed on Vercel.

## Pages

| URL | File | What it is |
|---|---|---|
| `/` | `index.html` | Home: hero, "What do you need?", featured projects, about, contact |
| `/work-with-me` | `work-with-me.html` | The offer: data projects, workshops and talks, sponsorship, technical writing, plus the contact form |
| `/projects` | `projects.html` | Portfolio gallery, rendered from `projects.json` |
| `/write` | `write.html` | Technical writing samples and terms |

`/learn` and `/teach` redirect to the matching choice on `/work-with-me`.

## Shared files

- `site.css` and `site.js`: nav, phone menu, footer, copy-email button and contact form for every page.
- `projects.json`: the single list of portfolio projects. Add an object here and it appears on `/projects` and on the home page (set `"featured": true` to show it on the home page; the first three featured projects are shown).
- `images/`: logos, project headers and share images. `og-work.html` and `og-write.html` are the templates for the share images.

## Settings

Two values at the top of `site.js`:

- `BOOKING_URL`: your booking page (for example a Cal.com event link). Empty means the booking button is hidden.
- `FORM_KEY`: your Web3Forms access key. Empty means the form opens the visitor's mail app instead.

Analytics use Umami. Replace `UMAMI_WEBSITE_ID` in the four HTML files with the website ID from your Umami dashboard.

## Languages

Each page holds its own EN, ES and CA text in a `translations` object at the bottom of the file. Nav and footer labels are in `site.js`.
