import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import styles from './product.module.css';

export class ProductTemplate extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      gallery: this.props.gallery,
    }
  }

  selectPrevImage = () => {
    this.setState(state => {
      const last = state.gallery[state.gallery.length - 1];
      const rest = state.gallery.slice(0, state.gallery.length - 1);

      return {
        gallery: [last, ...rest],
      }
    });
  };

  selectNextImage = () => {
    this.setState(state => {
      const first = state.gallery[0];
      const rest = state.gallery.slice(1);

      return {
        gallery: [...rest, first],
      };
    });
  };

  render () {
    const {
      description,
      gallery,
      helmet,
      price,
      tags,
      title,
      variants,
    } = this.props;

    const image = this.state.gallery[0];

    return (
      <section className="section">
        {helmet || ''}
        <div className="container content">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
                {title}
              </h1>
              <p>Description: {description}</p>
              <p>Price: ${price}</p>
              <select id="variant-select">
                {variants.map(variant => <option key={variant} value={variant}>{variant}</option>)}
              </select>
              <div className="image is-16by9">
                <img src={!!image.childImageSharp ? image.childImageSharp.fluid.src : image} />
              </div>
              <div className={styles.slider}>
                <i className={styles.left} onClick={this.selectPrevImage}/>
                <i className={styles.right} onClick={this.selectNextImage}/>
              </div>
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
}

ProductTemplate.propTypes = {
  description: PropTypes.string,
  gallery: PropTypes.array,
  helmet: PropTypes.object,
  title: PropTypes.string,
  variants: PropTypes.array,
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
        gallery={product.frontmatter.gallery}
        price={product.frontmatter.price}
        tags={product.frontmatter.tags}
        title={product.frontmatter.title}
        variants={product.frontmatter.variants}
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
        gallery {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
           }
          }
        }
        description
        price
        tags
        variants
      }
    }
  }
`
