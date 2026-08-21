# Agentic AI @ KFUPM — community website

> **Explore. Share. Connect. Build.**

The website for **Agentic AI @ KFUPM**, a university-wide community bringing together faculty,
researchers, students, and practitioners interested in exploring, building, and applying
intelligent agents across disciplines.

A plain static site: hand-written HTML, one stylesheet, one small JavaScript file. No build step,
no framework, no dependencies to install. Open `index.html` in a browser and it works.

---

## 1. Publish it on GitHub Pages

1. Create a repository. For a site at `https://<org-or-user>.github.io/`, name the repository
   exactly `<org-or-user>.github.io`. Any other name gives you
   `https://<org-or-user>.github.io/<repo-name>/`, which also works fine.
2. Push these files to the default branch:

   ```bash
   cd agentic-ai-kfupm
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/<org-or-user>/<repo>.git
   git push -u origin main
   ```

3. In the repository, go to **Settings → Pages**, set **Source** to *Deploy from a branch*, choose
   branch `main` and folder `/ (root)`, and save. The site is live in a minute or two.
4. Optional custom domain: add a file named `CNAME` containing just the domain (e.g.
   `agenticai.kfupm.edu.sa`), then point a DNS `CNAME` record at `<org-or-user>.github.io`.

The `.nojekyll` file tells GitHub Pages to serve the files as-is rather than running them through
Jekyll. Keep it.

### Preview locally

```bash
cd agentic-ai-kfupm
python3 -m http.server 8000
# then open http://localhost:8000
```

---

## 2. What's in here

```
agentic-ai-kfupm/
├── index.html          Home — hero, slogan, the four pillars, the five programs
├── about.html          About us · What is agentic AI? · Agentic AI @ KFUPM
├── meetups.html        Monthly Community Meetup
├── groups.html         Research & Collaboration Groups
├── radar.html          Resource & Research Radar
├── symposium.html      Quarterly Symposium
├── challenges.html     Demos / Challenges / Hackathons
├── join.html           Join and Contact Us
├── 404.html            Not-found page (GitHub Pages serves this automatically)
├── .nojekyll           Serve files as-is
├── README.md           This file
└── assets/
    ├── css/style.css   All styling, including the light/dark themes
    ├── js/main.js      Theme toggle, mobile nav, scroll reveal
    └── img/
        ├── logo.png            Full lockup — used in the home hero (light theme)
        ├── logo-dark.png       Same lockup with the wordmark lightened for dark theme
        ├── logo-mark.png       Robot-head mark — header and footer brand, 38px
        ├── favicon.png         Browser tab icon (192px)
        ├── apple-touch-icon.png  Home-screen icon (180px, on brand green)
        └── og-image.png        1200×630 social preview card
```

Every page shares the same header and footer markup. If you change a nav item or a footer link,
change it in all nine HTML files — a quick find-and-replace across the folder does it.

---

## 3. Fill in the placeholders — checklist

Everything still to be decided is marked in the HTML like this:

```html
<span class="ph">[ add contact email ]</span>
```

They render as small dashed amber chips, so they are impossible to miss on the page. Find them all
with:

```bash
grep -rn 'class="ph"' *.html
```

Work through this list before you announce the site:

### Site-wide (in every page's footer)
- [ ] Community email address — currently `agentic-ai@kfupm.edu.sa` (a plausible guess, not a real
      inbox). Replace everywhere: `grep -rln 'agentic-ai@kfupm.edu.sa' *.html`
- [ ] GitHub organisation URL — placeholder `https://github.com/`
- [ ] Add a LinkedIn page or chat group link if you have one

### `about.html`
- [ ] Member count and number of departments represented
- [ ] Community leads: names, departments, emails
- [ ] Faculty sponsor
- [ ] Hosting department, centre or club
- [ ] Link a code of conduct, if you adopt one

### `meetups.html`
- [ ] The recurring day (e.g. "first Tuesday of the month")
- [ ] Building and room number
- [ ] Whether refreshments/parking/card access need mentioning
- [ ] Talk submission form link (or keep the email)
- [ ] Upcoming meetups table — dates, titles, speakers, rooms
- [ ] Past meetups table — build the archive as you go

### `groups.html`
- [ ] What support you can actually offer (rooms, compute, credits, seed funding)
- [ ] Active groups directory — name, convener, cadence, focus
- [ ] Trim or replace the six proposed themes with the ones people really want

### `radar.html`
- [ ] The current board — aim for 8–12 live entries across Adopt / Trial / Assess / Hold
- [ ] Deadlines table
- [ ] Radar submission route: email, form, or pull request
- [ ] Mailing-list signup link for the digest

### `symposium.html`
- [ ] Venue, capacity, catering, registration link, parking
- [ ] Next edition: number, theme, date, venue, keynote speaker
- [ ] Key dates table (call opens, abstract deadline, notifications, final materials)
- [ ] Partnerships contact
- [ ] Past editions table
- [ ] Confirm the awards you want to give

### `challenges.html`
- [ ] Judging weights, and any prizes, certificates or credits
- [ ] Starter repository link
- [ ] What compute or API credits are available to teams
- [ ] Upcoming and past events table

### `join.html`
- [ ] **Sign-up form URL** — currently points at `https://forms.office.com/`. This is the single
      most important link on the site.
- [ ] Chat group invite route
- [ ] Calendar feed (ICS) link
- [ ] Contact cards: general inbox, community leads, programme contact, partnerships contact
- [ ] Meeting location and a map link
- [ ] Recording policy in the FAQ

---

## 4. Editing content

**Text.** Open the relevant `.html` file and edit it. The markup is deliberately plain and
commented by section, and the class names describe what they do (`.card`, `.timeline`, `.stat`,
`.faq`, `.callout`, `.table-wrap`).

**Colours, fonts, spacing.** All in one place — the `:root` block at the top of
`assets/css/style.css`. The dark theme overrides sit right below it in `html[data-theme="dark"]`.
Change `--brand-500` and the whole site follows.

**Adding a page.**

1. Copy an existing page (say `meetups.html`) and rename it.
2. Change the `<title>`, `<meta name="description">` and the `og:` tags in the `<head>`.
3. Replace the `<main>` content.
4. Add it to the nav in **all** pages: either as a `<a class="nav__link">` in `.nav__links`, or as
   an entry in the `Programs` dropdown (`.nav__sub`).
5. Add it to the footer link lists.

**The logo.** All six image files in `assets/img/` are derived from the community logo:

- The **header and footer** use `logo-mark.png` — the robot head cropped out of the lockup, because
  the full horizontal lockup is illegible at 38px next to the "Agentic AI / @ KFUPM" text.
- The **home hero** shows the full lockup. Two files are in the markup and CSS swaps them by theme:
  `logo.png` (dark wordmark, light theme) and `logo-dark.png` (light wordmark, dark theme). The dark
  variant was made by lightening only the near-black pixels of the wordmark, so the greens and the
  robot head are untouched.
- If you replace the logo, regenerate all six files at the same sizes and keep the file names — no
  markup or CSS needs to change. Transparent PNG is what makes the theme swap work; a white
  background would show as a white box in dark mode.
- A vector `.svg` of the lockup would be sharper on high-DPI screens. If you have one, save it as
  `logo.svg` / `logo-dark.svg` / `logo-mark.svg` and change the three `src` attributes (home hero in
  `index.html`, brand mark in all nine pages).

**Social preview.** `og-image.png` is referenced with a relative path. Some link-preview scrapers
require an absolute URL — once you know the final address, change the `og:image` and `twitter:image`
tags in each page's `<head>` to the full `https://…/assets/img/og-image.png`.

---

## 5. Notes on how it's built

- **Light and dark themes.** A toggle in the header. The choice is remembered in `localStorage`
  under `aikfupm-theme`; if nothing is stored, the visitor's system preference is used. A tiny
  inline script in each `<head>` applies the theme before first paint so there's no flash.
- **Accessibility.** Skip link, visible focus rings, `aria-current` on the active nav item,
  `aria-expanded` on the menu buttons, semantic headings, and text that meets contrast targets in
  both themes. The site works with JavaScript disabled — you lose the theme toggle, the dropdown
  becomes hover-only, and the reveal animations simply don't animate.
- **Motion.** Scroll-reveal via `IntersectionObserver`, fully disabled under
  `prefers-reduced-motion: reduce`.
- **Responsive.** Single fluid layout; the nav collapses to a hamburger menu below 980px.
- **Fonts.** Inter and Space Grotesk from Google Fonts, with a system-font fallback if the request
  is blocked. To go fully self-hosted, drop the woff2 files into `assets/` and remove the
  `fonts.googleapis.com` `<link>` from each page's `<head>`.
- **Print.** A print stylesheet strips the nav, CTA bands and footer.

---

## 6. Licence and credit

Content © the Agentic AI @ KFUPM community. Add whatever licence you prefer for the code — MIT is
the usual choice for a site like this.
