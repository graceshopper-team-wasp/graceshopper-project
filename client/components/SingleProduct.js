import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/singleProduct'
import {addToCart} from '../store/cart'
import EditProduct from './EditProduct'
import {motion} from 'framer-motion'

class SingleProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      isLoading: true
    }
  }
  async componentDidMount() {
    await this.props.getSingleProduct(this.props.match.params.id)
    this.setState({isLoading: false})
  }

  render() {
    const {single, user} = this.props
    const isAdmin = user.isAdmin
    const add = this.props.add
    if (
      this.state.isLoading ||
      single.id !== Number(this.props.match.params.id)
    ) {
      return (
        <div>
          <img className="loading-icon" src="/loading.gif" />
        </div>
      )
    }

    return (
      <motion.div
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
        <div id="container">
          <div className="singleProductPage">
            <img src={single.imageURL} alt={single.flavor} />
            <div id="rightSide">
              <p id="flavor">{single.flavor}</p>
              <p> price: ${single.price}</p>
              <p>{single.description}</p>

              <button
                className=" center stylizedButton"
                onClick={() => add(single.id)}
                type="button"
              >
                Add To Cart
              </button>
            </div>

            {isAdmin && <EditProduct />}
          </div>
        </div>
      </motion.div>
    )
  }
}

const mapState = state => {
  return {
    single: state.singleProduct.single,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    getSingleProduct: id => dispatch(fetchSingleProduct(id)),
    add: id => dispatch(addToCart(id))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
