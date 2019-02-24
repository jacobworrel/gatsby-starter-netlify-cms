import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'

class ProductRoll extends React.Component {

  render() {
    const { data } = this.props
    const { edges: products } = data.allMarkdownRemark

    return (
      <div className="columns is-multiline">
        {products && (products
        .map(({ node: product }) => (
            <div
              className="is-parent column is-6"
              key={product.id}
            >
              <article className="tile is-child box notification">
                <p>
                  <Link className="title has-text-primary is-size-4" to={product.fields.slug}>
                    {product.frontmatter.title}
                  </Link>
                </p>
                <p>{product.frontmatter.description}</p>
              </article>
            </div>
          )))}
      </div>
    );
  }
}

ProductRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
    query ProductRollQuery {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] },
        filter: { frontmatter: { templateKey: { eq: "product" } }}
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              title
              description
              templateKey
            }
          }
        }
      }
    }
    `}
    render={(data, count) => (
      <ProductRoll data={data} count={count} />
    )}
  />
)
