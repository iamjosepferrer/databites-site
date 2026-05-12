# databites-site

**I'm [Josep Ferrer](https://www.linkedin.com/in/iamjosepferrer/) — data scientist and visual educator based in Rotterdam.**  
This is the source for my personal site. One HTML file. No framework. Shipped.

→ **[databites.tech](https://databites.tech)**

[![databites.tech](https://api.microlink.io/?url=https://databites.tech&screenshot=true&meta=false&embed=screenshot.url)](https://databites.tech)

---

## What this is

The main DataBites website — portfolio, services, newsletter, and contact. Built as a single `index.html` with no build step, no framework, and no dependencies beyond Google Fonts. Everything is vanilla HTML, CSS, and JavaScript.

Sections: hero · about · services · trusted by · newsletter · portfolio · contact.

The portfolio section loads live from [`projects.databites.tech/projects.json`](https://projects.databites.tech/projects.json) — I only need to update one file to have new projects appear on both this site and the projects gallery.

---

## Repo structure

```
databites-site/
├── index.html          # The entire site
├── .gitignore
└── images/
    ├── databitestech_logo.png
    ├── databitestech_logo_letters.png
    ├── databites_clearly_explained.png
    ├── headshot.png
    ├── catalonia-atlas.png
    └── logos/          # Partner and client logos for the marquee
        ├── logo_1.png
        ├── logo_2.png
        └── logo_n.png
```

---

## How to update content

**Add a partner logo to the marquee**

Drop the logo PNG into `images/logos/` (100×30px, transparent background works best). Then add it to both `marquee-set` blocks in `index.html`:

```html
<a href="https://company.com" target="_blank" rel="noopener" class="marquee-item">
  <img src="images/logos/yourfile.png" alt="Company Name">
</a>
```

**Update the portfolio section**

Don't touch this file. Edit [`projects.json`](https://github.com/iamjosepferrer/databites-projects/blob/main/projects.json) in the `databites-projects` repo — this site fetches from it automatically.

**Update translations**

All copy is in the `translations` object in `index.html`, with `en`, `es`, and `ca` keys. The language switcher and browser auto-detection are already wired up.

---

## How it works

**i18n** — `data-i18n` attributes on every text element. `setLang(lang)` swaps all strings on click, stores the preference in `localStorage`, and auto-detects from `navigator.language` on load.

**Portfolio** — `loadPortfolioPreview()` fetches `https://projects.databites.tech/projects.json`, filters for `live: true`, and renders the first 3 cards. Called on load and on every language switch.

**Newsletter preview** — fetches the latest Substack RSS via `rss2json.com` and populates the mock newsletter card. Falls back to a skeleton if the fetch fails.

**Hero canvas** — animated node graph drawn on a `<canvas>` element using vanilla JS. Pure CSS.

---

## Deployment

Hosted on [Vercel](https://vercel.com). Pushes to `main` deploy automatically.

DNS managed via Namecheap. `databites.tech` → Vercel.

---

## Brand

Everything follows the [DataBites brand guidelines](https://databites.tech):

| Token | Hex | Use |
|---|---|---|
| Forest | `#1A3829` | Text, dark backgrounds |
| Green | `#2D9B4E` | Buttons, links |
| Bright | `#38B86E` | Accents, highlights |
| Mint | `#A8DDC4` | Tints, decorative |
| Cream | `#FAF6F0` | Page canvas |

Fonts: **Lilita One** (display) · **Space Grotesk** (body) · **Space Mono** (labels, code)

---

## About me

I'm [Josep Ferrer](https://www.linkedin.com/in/iamjosepferrer/), a data scientist and educator who makes complex data and AI concepts click — through diagrams, writing, and interactive tools. I publish weekly at [databites.tech](https://databites.tech).

→ [Newsletter](https://reads.databites.tech) · [@iamjosepferrer](https://x.com/iamjosepferrer) · [LinkedIn](https://linkedin.com/in/iamjosepferrer)