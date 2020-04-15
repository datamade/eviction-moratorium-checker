module.exports = {
  siteMetadata: {
    title: `Eviction Moratorium Checker`,
    description: ``,
    author: `@beamalsky`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/data/final`,
      },
    },
    `gatsby-transformer-csv`,
  ],
}
