import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/singleProduct'
import EditProduct from './EditProduct'

class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.getSingleProduct(this.props.match.params.id)
  }

  render() {
    const single = this.props.single || {}
    return (
      <div>
        <img src={single.imageURL} alt={single.flavor} />
        <h1>{single.flavor}</h1>
        <h2>Price: ${single.price}</h2>
        <p>{single.description}</p>
        <button>Add To Cart</button>
        {/* add an if user is admin statement here, only then render edit product  */}
        <EditProduct />
      </div>
    )
  }
}

const mapState = state => {
  return {
    single: state.singleProduct.single
  }
}

const mapDispatch = dispatch => {
  return {
    getSingleProduct: id => dispatch(fetchSingleProduct(id))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
