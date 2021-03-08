import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/singleProduct'
import {addToCart} from '../store/cart'
import EditProduct from './EditProduct'
import {motion} from 'framer-motion'

class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.getSingleProduct(this.props.match.params.id)
  }

  render() {
    const {single, user} = this.props
    const isAdmin = user.isAdmin
    const addToCart = this.props.add

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
                onClick={() => addToCart(single.id)}
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
