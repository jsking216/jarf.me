const sitemap = require('nextjs-sitemap-generator');
const fs = require('fs');

const root = process.cwd();
const sitemapFilename = 'sitemap.xml';

// hack because nextjs-sitemap-generator doesn't skip dynamic routes
fs.unlinkSync(`${root}/.next/server/pages/blog/[slug].js`);

sitemap({
  baseUrl: 'https://jarf.me',
  ignoreIndexFiles: true,
  pagesDirectory: `${root}/.next/server/pages`,
  targetDirectory: `${root}/public`,
  sitemapFilename,
  nextConfigPath: `${root}/next.config.js`,
});

/* eslint-disable no-console */
console.log(`\nWrote sitemap.xml to: ${root}/public/${sitemapFilename}`);
