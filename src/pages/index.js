import React from "react"
import { Link } from "gatsby"
import { Form } from "react-bootstrap"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({data}) => {
  return (
    <Layout>
      <SEO title="Home" />

      <Form>
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>All assisted properties:</Form.Label>
          <Form.Control as="select" size="lg">
            {data.assisted_properties.nodes.map((node) =>
              <option value={node.id}>
                {node.name}
              </option>
            )}
          </Form.Control>
        </Form.Group>
      </Form>
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
