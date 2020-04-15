import React, { useState } from "react"
import { Link } from "gatsby"
import { Form } from "react-bootstrap"

import Layout from "../components/layout"
import SEO from "../components/seo"

import Fuse from "fuse.js";


function fuzzySearch({ fuse, data, term }) {
  const result = fuse.search(`${term}`);
  return result;
}

/**
 *
 * @param {*} param0
 *
 * A custom React Hook to do a in-memory fuzzy text search
 * using Fuse.js.
 */
function useFuse({ data, options }) {
  const [term, setTerm] = useState("");

  const fuseOptions = {
      threshold: 0.4,
      includeScore: true,
      ...options
  };

  const fuse = new Fuse(data, fuseOptions);

  const result = fuzzySearch({ data, term, fuse });

  const reset = () => setTerm("");

  return { result, search: setTerm, term, reset };
}


function MyComponent({complexes}){

    // This is Fuse specific options. Read more at
    // https://fusejs.io/#examples
    const options = {
        keys: ["address", "name"]
    }

    // Setup the Hook.
    const { result, search, term } = useFuse({
        data: complexes,
        options
    });

    return (
        <div>
            <input
                onChange={e => search(e.target.value)}
                value={term}
                placeholder="Search for a property..."
            />

	      <table>
              {result.slice(0, 10).map(complex => (
                    <tr>
                      <td>{complex.item.name}</td><td>{complex.item.address}</td>
		      </tr>
              ))}
	</table>
        </div>
    )
}


const IndexPage = ({data}) => {
  return (
    <Layout>
      <SEO title="Home" />

    <MyComponent complexes={data.assisted_properties.nodes} />
	  
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query IndexQuery {
    assisted_properties:allAssistedPropertiesCsv {
      nodes {
        id
        name
        address
      }
    }
  }
`
