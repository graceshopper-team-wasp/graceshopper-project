import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts, deleteProduct} from '../store/products'
import AddProduct from './AddProduct'
import {Link} from 'react-router-dom'

export class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    const {products, user} = this.props
    const isAdmin = user.isAdmin
    return (
      <div>
        <h3>Products</h3>
        {products.map(product => (
          <ul key={product.id}>
            <li>
              <Link to={`/products/${product.id}`}>
                <img src={product.imageURL} alt={product.flavor} />
                <h3>{product.flavor}</h3>
              </Link>
              <p>{product.description}</p>
              {isAdmin && (
                <button
                  className="delete_button"
                  onClick={() => this.props.deleteProduct(product)}
                >
                  X
                </button>
              )}
            </li>
          </ul>
        ))}
        {isAdmin && <AddProduct />}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.products,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProducts: () => dispatch(fetchProducts()),
    deleteProduct: product => dispatch(deleteProduct(product))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
