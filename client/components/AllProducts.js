import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/products'
// import { Link } from 'react-router-dom'

export class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    const products = this.props.products
    return (
      <div>
        <h3>Products</h3>
        {products.map(product => (
          <ul key={product.id}>
            <li>
              {/* <Link to={`/products/${product.id}`}> */}
              <img src={product.imageURL} alt={product.flavor} />
              <h3>{product.flavor}</h3>
              <p>{product.description}</p>
              {/* </Link> */}
            </li>
          </ul>
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProducts: () => dispatch(fetchProducts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
