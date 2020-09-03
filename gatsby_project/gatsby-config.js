module.exports = {
  plugins: [
    // Simple config, passing URL
    {
      resolve: "gatsby-source-graphql",
      options: {
        // Arbitrary name for the remote schema Query type
        typeName: "CONTENTFUL",
        // Field under which the remote schema will be accessible. You'll use this in your Gatsby query
        fieldName: "contentful",
        // Url to query from
        url: "https://graphql.contentful.com/content/v1/spaces/69qc09r1b31n/",
        // HTTP headers
        headers: {
          // Learn about environment variables: https://gatsby.dev/env-vars
          Authorization: `Bearer -1dsnun-jy-tEy1ZpRN6izl5CBr0EKv3yuRAzqqzpLc`,
        },
      },
    },
    {
      resolve: "gatsby-source-graphql",
      options: {
        // Arbitrary name for the remote schema Query type
        typeName: "CONTENTFUL_COPYRIGHT",
        // Field under which the remote schema will be accessible. You'll use this in your Gatsby query
        fieldName: "copyright",
        // Url to query from
        url: "https://graphql.contentful.com/content/v1/spaces/32shkd0q8pgo/",
        // HTTP headers
        headers: {
          // Learn about environment variables: https://gatsby.dev/env-vars
          Authorization: `Bearer AD2KqNyQ4DdQmyvICJT-3_bI-Qf9CNz-41UyWoZ5uMM`,
        },
      },
    },
  ],
};
