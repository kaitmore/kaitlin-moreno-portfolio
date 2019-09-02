module.exports = {
  siteMetadata: {
    title: "Kaitlin Moreno Porfolio"
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/pages`,
        name: "pages"
      }
    },
    "gatsby-transformer-remark",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/img`,
        name: "images"
      }
    },
    "gatsby-plugin-sharp",
    `gatsby-plugin-styled-components`,
    "gatsby-plugin-netlify" // make sure to keep it last in the array
  ]
};
