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
        <h3 id="allSeltzersTitle">All Seltzers</h3>
        <div className="allProducts">
          {products.map(product => (
            <div key={product.id} className="singleProduct">
              <Link to={`/products/${product.id}`}>
                <img src={product.imageURL} alt={product.flavor} />
                <p>{product.flavor}</p>
              </Link>
              {/* <p>{product.description}</p> */}
              {isAdmin && (
                <button
                  className="delete_button"
                  onClick={() => this.props.deleteProduct(product)}
                >
                  X
                </button>
              )}
            </div>
          ))}
        </div>
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
