const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');
const withCss = require("@zeit/next-css");
const withPurgeCss = require("next-purgecss")

module.exports = withPlugins([
  [optimizedImages, {}],
  withCss,
  [withPurgeCss, {
    purgeCssPaths: [
      "pages/**/*",
      "components/**/*",
      "public/**/*", // also scan other-components folder
    ]
  }]]);