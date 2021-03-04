import React from 'react'
import {addProduct} from '../store/products'
import {connect} from 'react-redux'

const defaultState = {
  flavor: '',
  price: '',
  inventory: '',
  description: '',
  imageURL: ''
}

class AddProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      flavor: '',
      price: '',
      inventory: '',
      description: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit(e) {
    e.preventDefault()
    this.props.addProduct({...this.state})
    this.setState(defaultState)
  }

  render() {
    const {flavor, inventory, price, description, imageURL} = this.state
    const {handleSubmit, handleChange} = this
    return (
      <form className="add_product_form" onSubmit={handleSubmit}>
        <span>
          <label>Flavor:</label>
          <input
            placeholder="Enter Flavor"
            name="flavor"
            onChange={handleChange}
            value={flavor}
          />
        </span>
        <label>Inventory:</label>
        <input
          name="inventory"
          placeholder="Enter Inventory"
          onChange={handleChange}
          value={inventory}
        />
        <input
          name="price"
          placeholder="Enter Price"
          onChange={handleChange}
          value={price}
        />
        <input
          name="description"
          placeholder="Enter Description"
          onChange={handleChange}
          value={description}
        />
        <button className="submit_button" type="submit">
          Submit
        </button>
      </form>
    )
  }
}

const mapState = () => {
  return {}
}

const mapDispatch = (dispatch, {history}) => {
  return {
    addProduct: campus => dispatch(addProduct(campus, history))
  }
}

export default connect(mapState, mapDispatch)(AddProduct)
