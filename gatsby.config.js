const path = require('path');
const { name } = require('./package.json');

module.exports = {
  pathPrefix: `/${name}`,
  plugins: [
    {
      resolve: 'gatsby-theme-mdx-deck',
      options: {
        cli: true,
        contentPath: path.resolve('./deck.mdx')
      }
    },
    {
      resolve: 'gatsby-plugin-compile-es6-packages',
      options: {
        modules: ['mdx-deck', 'gatsby-theme-mdx-deck', '@mdx-deck/themes']
      }
    }
  ]
};
