import React from "react";
import { graphql } from "gatsby";
import ReactTooltip from "react-tooltip";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
export default function ({ data }) {
  return (
    <div className="App">
      <header className="App-header">
        <img
          src={data.contentful.food.picture.url}
          className="App-logo"
          alt={data.contentful.food.picture.description}
        />
        <p>{data.contentful.food.foodName}</p>
        {renderRichText(
          data.contentful.food.recipe.json,
          data.contentful.food.recipe.links
        )}
      </header>
      <span>{data.copyright.copyrightRecipes.copyrightOwner}</span>
      <span>{data.copyright.copyrightRecipes.copyrightYear}</span>
    </div>
  );
}
export const query = graphql`
  query {
    copyright {
      copyrightRecipes(id: "A3uLMbrSXXFah2V3quQJl") {
        copyrightOwner
        copyrightYear
      }
    }
    contentful {
      food(id: "5dUVVIfVC9Ze3Z4r4LedoR") {
        foodName
        recipe {
          links {
            entries {
              inline {
                sys {
                  id
                }
                ... on CONTENTFUL_Food {
                  peterLongText
                }
              }
            }
          }
          json
        }
        picture {
          url(transform: { width: 600, cornerRadius: 1000, format: PNG })
          description
        }
      }
    }
  }
`;

function renderRichText(json, links) {
  const options = {
    renderMark: {
      [MARKS.BOLD]: (text) => <strong>{text}</strong>,
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p style={{ color: "red" }}>{children}</p>
      ),
      [BLOCKS.HEADING_1]: (node, children) => (
        <h1 style={{ color: "blue", fontSize: "4em" }}>{children}</h1>
      ),
      [INLINES.EMBEDDED_ENTRY]: (node, children) => {
        const inlineId = node.data.target.sys.id;
        const referencedEntry = links.entries.inline.find(
          (entry) => entry.sys.id === inlineId
        );
        console.log(referencedEntry);
        return (
          <div>
            {" "}
            <a data-tip data-for={inlineId}>
              hi
            </a>
            <ReactTooltip id={inlineId} type="warning" effect="solid">
              <span>{referencedEntry.peterLongText}</span>
            </ReactTooltip>
          </div>
        );
      },
    },
    renderText: (text) => text.replace("!", "?"),
  };
  return documentToReactComponents(json, options);
}
