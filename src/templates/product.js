import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'

export const ProductTemplate = ({
  image,
  description,
  tags,
  title,
  helmet,
}) => {

  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <p>{description}</p>
            <div
              className="full-width-image margin-top-0"
              style={{
                backgroundImage: `url(${
                  !!image.childImageSharp
                    ? image.childImageSharp.fluid.src
                    : image
                  })`,
                backgroundPosition: `top left`,
                backgroundAttachment: `fixed`,
              }}
            />
            {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>Tags</h4>
                <ul className="taglist">
                  {tags.map(tag => (
                    <li key={tag + `tag`}>
                      <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

ProductTemplate.propTypes = {
  image: PropTypes.object.isRequired,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
}

const Product = ({ data }) => {
  const { markdownRemark: product } = data

  return (
    <Layout>
      <ProductTemplate
        description={product.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Product">
            <title>{`${product.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${product.frontmatter.description}`}
            />
          </Helmet>
        }
        image={product.frontmatter.image}
        tags={product.frontmatter.tags}
        title={product.frontmatter.title}
      />
    </Layout>
  )
}

Product.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default Product

export const pageQuery = graphql`
  query ProductByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        description
        price
        tags
      }
    }
  }
`
