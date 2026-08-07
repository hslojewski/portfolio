// Vite doesn't have Create React App's PUBLIC_URL env var - this replicates
// it using import.meta.env.BASE_URL (set via `base` in vite.config.js) so
// asset paths still resolve correctly when the site is served from a
// subpath, e.g. https://hslojewski.github.io/portfolio.
export const withBase = (path = "") =>
  import.meta.env.BASE_URL.replace(/\/$/, "") + "/" + path.replace(/^\//, "");

export default withBase;
