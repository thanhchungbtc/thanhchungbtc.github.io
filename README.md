# thanhchungbtc.github.io

A landing **hub** for the small products and experiments I build, all hosted on
a single GitHub Pages domain. The hub lives at the domain root; each product
lives at its own sub-path: `thanhchungbtc.github.io/{productName}/`.

## Stack

- [Vite 7](https://vite.dev/) + [React 19](https://react.dev/) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/) (via `@tailwindcss/vite`)
- ESLint (flat config) with the React Hooks + Refresh plugins

## Local development

```bash
npm install
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # type-check + production build into dist/
npm run preview  # preview the production build locally
npm run lint     # lint
```

> Nothing here is deployed automatically. The previous Gridsome blog is still
> serving the live site from the `gh-pages` branch and is left untouched. The
> old source is archived on the `archive/gridsome-blog-v1` branch.

## How products are organized

This repo is the **hub app**. Its build output is what eventually becomes the
domain root. Each product is built as a **separate app** and its output is
placed at `/{productName}/` in the published site.

### Adding a new product

1. Build the product (any framework) with its base path set to its slug:
   - **Vite:** `base: '/{productName}/'` in `vite.config.ts`
   - **CRA:** `"homepage": "https://thanhchungbtc.github.io/{productName}"`
   - For client-side routing, set the router `basename` to `/{productName}`.
2. Place the product's build output at `/{productName}/` in the published site.
3. Register it in [`src/data/products.ts`](src/data/products.ts) so it appears
   on the landing page.

## Google Analytics / AdSense (TODO)

The old site used Google Analytics (and was associated with Google Ads). Those
IDs were stored in a local `.env` and are not in this repo. When ready:

- Add the gtag / AdSense `<script>` tags in [`index.html`](index.html) `<head>`.
- Add `public/ads.txt` at the domain root (one root `ads.txt` covers every
  product sub-path since they share the same domain).
