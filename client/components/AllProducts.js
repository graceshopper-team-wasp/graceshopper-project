import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts, deleteProduct, filterProducts} from '../store/products'
import {addToCart} from '../store/cart'
import AddProduct from './AddProduct'
import {Link} from 'react-router-dom'
import {motion} from 'framer-motion'
import ReactPaginate from 'react-paginate'

export class AllProducts extends React.Component {
  constructor() {
    super()
    this.state = {
      offset: 0,
      data: [],
      perPage: 6,
      currentPage: 0
    }

    this.handleDropdownChangeFilter = this.handleDropdownChangeFilter.bind(this)
    this.handlePageClick = this.handlePageClick.bind(this)
  }
  componentDidMount() {
    this.props.getProducts()
    this.receivedData()
  }
  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(prevProps.products) !== JSON.stringify(this.props.products)
    ) {
      this.setState({
        products: this.props.products
      })
      this.receivedData()
    }
  }
  handleDropdownChangeFilter(e) {
    this.props.filter(e.target.value)
  }
  handlePageClick = e => {
    const selectedPage = e.selected
    const offset = selectedPage * this.state.perPage

    this.setState(
      {
        currentPage: selectedPage,
        offset: offset
      },
      () => {
        this.receivedData()
      }
    )
  }
  receivedData() {
    let products = this.props.products
    console.log(products)
    const slice = products.slice(
      this.state.offset,
      this.state.offset + this.state.perPage
    )
    const postData = slice.map(product => (
      <React.Fragment key={product.id}>
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
        </div>
      </React.Fragment>
    ))
    console.log('postData', postData)
    this.setState({
      pageCount: Math.ceil(products.length / this.state.perPage),

      postData
    })
  }
  render() {
    const {products, user} = this.props

    const addToCart = this.props.add
    const isAdmin = user.isAdmin
    const paginatedProducts = this.state.postData || []
    console.log(this.state.postData, 'postData in render')
    return (
      <div>
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
            {isAdmin && (
              <button
                className="delete_button"
                onClick={() => this.props.deleteProduct(product)}
              >
                X
              </button>
            )}
            {paginatedProducts}
          </motion.div>
          <div id="divPaginate">
            <ReactPaginate
              previousLabel="prev"
              nextLabel="next"
              breakLabel="..."
              breakClassName="break-me"
              pageCount={this.state.pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={this.handlePageClick}
              containerClassName="pagination"
              subContainerClassName="pages pagination"
              activeClassName="active"
            />
          </div>
        </div>
        <div>{isAdmin && <AddProduct />}</div>
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
