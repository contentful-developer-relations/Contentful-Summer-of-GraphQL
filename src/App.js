import React, { useState, useEffect } from "react";
import ReactTooltip from "react-tooltip";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
import "./App.css";

const query = `query{
  food(id: "5dUVVIfVC9Ze3Z4r4LedoR") {
    foodName
    recipe {
      links {
        entries {
          inline{
            sys {
              id
            }
            ...on Food {
              peterLongText
            }
          }
        }
      }
      json
    }
    picture {
      url(transform: {width: 600, cornerRadius: 1000, format: PNG})
      description
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
function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    window
      .fetch(
        "https://graphql.contentful.com/content/v1/spaces/69qc09r1b31n/?access_token=-1dsnun-jy-tEy1ZpRN6izl5CBr0EKv3yuRAzqqzpLc",
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({ query }),
        }
      )
      .then((response) => response.json())
      .then((json) => setData(json.data));
  }, []);
  if (!data) return <span>Loading :(</span>;
  console.log(data);
  return (
    <div className="App">
      <header className="App-header">
        <img
          src={data.food.picture.url}
          className="App-logo"
          alt={data.food.picture.description}
        />
        <p>{data.food.foodName}</p>
        {renderRichText(data.food.recipe.json, data.food.recipe.links)}
      </header>
    </div>
  );
}

export default App;
