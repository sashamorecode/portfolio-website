# Sasha Salzano-Weir’s portfolio

The English and German homepage runs on [sashasalzanoweir.com](https://sashasalzanoweir.com/) with SvelteKit and its Node adapter. The root URL uses the visitor’s saved language or browser preference. Both editions also have permanent links at `/en` and `/de`.

The homepage copy lives in `src/lib/homepage/`. Its layout lives in `src/routes/[[lang=language]]/`. The fonts, images, styles and signal animation are in `static/homepage/`.

## Local development

Use Node.js 22. Install dependencies with `npm ci` and start the site with `npm run dev`. Run `npm run check` for type checks or `npm run build` for a production build.

## Deployment

From a checkout with SSH access to the VPS, run `npm run deploy`. The script builds locally, uploads a release, tests it on a private socket, then switches the existing `portfolio` systemd service to that release. Releases sharing the same npm lockfile share their installed dependencies.

The VPS keeps the previous entry point at `/var/www/portfolio/previous-entry`. Run these commands on the VPS to switch back.

```sh
cd /var/www/portfolio
ln -sfn "$(readlink -f previous-entry)" .next-index
mv -Tf .next-index index.js
sudo systemctl restart portfolio
```

## Analytics

The shared `src/app.html` loads the existing self-hosted Umami tracker on the homepage and legal pages. It records visits on the public domain and its `www` alias. Traffic reports are available in the [Umami dashboard](https://analytics.sashasalzanoweir.com/).

The original portfolio was based on [SikandarJODD’s Svelte template](https://github.com/SikandarJODD/portfolio-template).
