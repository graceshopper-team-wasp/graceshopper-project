import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts, deleteProduct, filterProducts} from '../store/products'
import {addToCart} from '../store/cart'
import AddProduct from './AddProduct'
import {Link} from 'react-router-dom'
import {motion} from 'framer-motion'

export class AllProducts extends React.Component {
  constructor() {
    super()
    this.state = {
      searchString: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleDropdownChangeFilter = this.handleDropdownChangeFilter.bind(this)
  }
  componentDidMount() {
    this.props.getProducts()
  }
  handleChange = event => {
    this.setState({searchString: event.target.value})
  }
  handleDropdownChangeFilter(e) {
    this.props.filter(e.target.value)
  }
  render() {
    let {products, user} = this.props
    let searchString = this.state.searchString.trim().toLowerCase()
    if (searchString.length > 0) {
      products = products.filter(
        el =>
          el.flavor.toLowerCase().match(searchString) ||
          el.description.toLowerCase().match(searchString)
      )
    }
    const addToCart = this.props.add
    const isAdmin = user.isAdmin
    return (
      <div>
        <h3 id="allSeltzersTitle">Seltzers</h3>
        <select onChange={this.handleDropdownChangeFilter} id="select-filter">
          <option className="option" value="All">
            Select Filter
          </option>
          <option value="All">All Seltzers</option>
          <option value="Made">BubblySort</option>
          <option value="partnership">Partner Brands</option>
        </select>
        <input
          type="text"
          value={this.state.searchString}
          onChange={this.handleChange}
          placeholder="Search Seltzers"
        />
        <motion.div
          className="allProducts"
          initial="pageInitial"
          animate="pageAnimate"
          variants={{
            pageInitial: {
              opacity: 0
            },
            pageAnimate: {
              opacity: 1
            }
          }}
        >
          {products.map(product => (
            <div key={product.id} className="singleProduct">
              <Link to={`/products/${product.id}`}>
                <motion.img
                  src={product.imageURL}
                  alt={product.flavor}
                  whileHover={{
                    scale: 0.8,
                    transition: {
                      duration: 0.2
                    }
                  }}
                />
                <p>{product.flavor}</p>
              </Link>
              <button
                className="stylizedButton"
                onClick={() => addToCart(product.id)}
              >
                Add To Cart
              </button>
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
        </motion.div>
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
    deleteProduct: product => dispatch(deleteProduct(product)),
    add: id => dispatch(addToCart(id)),
    filter: filter => dispatch(filterProducts(filter))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
