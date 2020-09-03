const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---src-pages-index-js": hot(preferDefault(require("/Users/ameliawb/Documents/summer_graphql/Contentful-Summer-of-GraphQL/gatsby_project/src/pages/index.js")))
}

