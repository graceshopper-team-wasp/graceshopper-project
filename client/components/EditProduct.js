import React from 'react'
import {updateProduct} from '../store/singleProduct'
import {connect} from 'react-redux'

const defaultState = {
  flavor: '',
  price: '',
  inventory: '',
  description: '',
  imageURL: ''
}

class EditProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      flavor: '',
      price: '',
      inventory: '',
      description: '',
      imageURL: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    if (this.props.single.id) {
      this.setState({
        flavor: this.props.single.flavor,
        price: this.props.single.price,
        inventory: this.props.single.inventory,
        description: this.props.single.description
      })
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.single.id !== this.props.single.id) {
      this.setState({
        flavor: this.props.single.flavor,
        price: this.props.single.price,
        inventory: this.props.single.inventory,
        description: this.props.single.description,
        imageURL: this.props.single.imageURL
      })
    }
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit(e) {
    e.preventDefault()
    console.log('...this.props.single', this.props.single)
    this.props.updateProduct({...this.props.single, ...this.state})
    this.setState(defaultState)
  }
  render() {
    const {flavor, inventory, price, description, imageURL} = this.state
    const {handleSubmit, handleChange} = this
    return (
      <form id="edit_product_form" onSubmit={handleSubmit}>
        <label>Flavor:</label>
        <br />
        <input name="flavor" onChange={handleChange} value={flavor} />
        <br />
        <label>Inventory:</label>
        <br />
        <input name="inventory" onChange={handleChange} value={inventory} />
        <br />
        <label>Price</label>
        <br />
        <input name="price" onChange={handleChange} value={price} />
        <br />
        <label>Description: </label>
        <br />
        <input name="description" onChange={handleChange} value={description} />
        <br />
        <label>ImageUrl:</label>
        <br />
        <input name="imageURL" onChange={handleChange} value={imageURL} />
        <button className="submit_button" type="submit">
          Submit
        </button>
      </form>
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
    updateProduct: product => dispatch(updateProduct(product))
  }
}

export default connect(mapState, mapDispatch)(EditProduct)
