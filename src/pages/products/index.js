import React from 'react'

import Layout from '../../components/Layout'
import ProductRoll from '../../components/ProductRoll'

export default class ProductIndexPage extends React.Component {
  render() {

    return (
      <Layout>
        <section className="section">
          <div className="container">
            <ProductRoll />
          </div>
        </section>
      </Layout>
    )
  }
}
