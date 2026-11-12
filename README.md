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

Short links for bios, each opening `/work-with-me` with a tag Umami shows under UTM: `/x` (X bio), `/in` (LinkedIn), `/nl` (newsletter), `/gh` (GitHub READMEs). Add more in `vercel.json` under `redirects`.

## Shared files

- `site.css` and `site.js`: nav, phone menu, footer, copy-email button and contact form for every page.
- `projects.json`: the single list of portfolio projects. Add an object here and it appears on `/projects` and on the home page (set `"featured": true` to show it on the home page; the first three featured projects are shown).
- `images/`: logos, project headers and share images. `og-work.html` and `og-write.html` are the templates for the share images.

## For search engines and AI assistants

- The English text and the project cards are written into the HTML itself, so crawlers that don't run JavaScript (most AI assistants) read the same page visitors see. After editing `projects.json` or English text, regenerate this static copy (ask Claude, or copy the rendered HTML in).
- Each page has a JSON-LD block (`application/ld+json`) describing Josep, the services, the FAQ and the portfolio. Update it when offers or profiles change.
- `llms.txt` is a plain summary for AI tools. Keep it in line with Work with me.
- `sitemap.xml` and `robots.txt` list the four pages and allow all crawlers. `404.html` is the not-found page.

## Settings

Two values at the top of `site.js`:

- `BOOKING_URL`: your booking page (for example a Cal.com event link). Empty means the booking button is hidden.
- `FORM_KEY`: your Web3Forms access key. Empty means the form opens the visitor's mail app instead.

Analytics use Umami Cloud (website ID `04adaf17-975f-40ec-84b1-5efaadd914f6`, set in the four HTML files). Clicks are tagged with `data-umami-event` attributes and show under Events in the Umami dashboard.

## Languages

Each page holds its own EN, ES and CA text in a `translations` object at the bottom of the file. Nav and footer labels are in `site.js`.
