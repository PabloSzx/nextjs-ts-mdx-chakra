const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
});
module.exports = withMDX({
  pageExtensions: ["tsx", "mdx"],
  future: {
    webpack5: true,
  },
});
