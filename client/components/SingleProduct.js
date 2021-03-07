import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/singleProduct'
import {addToCart} from '../store/cart'
import EditProduct from './EditProduct'

class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.getSingleProduct(this.props.match.params.id)
  }

  render() {
    const {single, user} = this.props
    const isAdmin = user.isAdmin
    const addToCart = this.props.add

    return (
      <div>
        <div className="singleProductPage">
          <img src={single.imageURL} alt={single.flavor} />
          <p id="flavor">{single.flavor}</p>
          <h2> ${single.price}</h2>
          <p>{single.description}</p>

          <button onClick={() => addToCart(single.id)} type="button">
            Add To Cart
          </button>

          {isAdmin && <EditProduct />}
        </div>
      </div>
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
