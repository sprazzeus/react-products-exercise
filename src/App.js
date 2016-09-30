import React, { Component } from 'react'
import { IndexLink, Link } from 'react-router'
import dataSample from './products.json'
import './App.css'
import { Browse } from './browse'
import { Cart } from './cart'
import { ProductDetail } from './pdp'

class App extends Component {
  constructor() {
    super()
    this.state = {
      filters: [],
      products: [],
      cart: []
    }
    this.addToCart = this.addToCart.bind(this)
    this.removeFromCart = this.removeFromCart.bind(this)
  }

  // function takes a product object
  addToCart(itemAdded){
    // adds only if not already present in cart
    if (this.state.cart.findIndex(findItem) === -1) {
      this.setState((state) => ({ cart: state.cart.concat( itemAdded )}))
      console.log(this.state.cart)
      console.log(itemAdded.name + ' added to cart!')
    }

    function findItem (item) {
      // using unique image names sans suffix as makeshift product id
      if (item.image.slice(0,-4) === itemAdded.image.slice(0,-4) && item.name === itemAdded.name) {
        return item
      }
    }
  }

  // function takes a product object
  removeFromCart(itemRemoved){
    var oldCart = this.state.cart // array
    var newCart = this.state.cart.splice(0) // cloned array
    var itemIndex = oldCart.findIndex(findItem)

    function findItem (item) {
      // using unique image names sans suffix as makeshift product id
    	if (item.image.slice(0,-4) === itemRemoved.image.slice(0,-4) && item.name === itemRemoved.name) {
    		return item
    	}
    }

    newCart.splice(itemIndex, 1) // remove item from clone array

    this.setState({cart: newCart}) // submit new cart array
    console.log(itemRemoved.name + ' removed from cart!')
  }

  componentWillMount() {
    var filterArray = []
    var productArray = []
    var self = this

    // set filters from local json as app state
    dataSample.filters.map(
      function(filter) {
        filterArray.push(filter)
        self.setState({filters: filterArray})
        return true
      }
    )
    // set products form local json as app state
    dataSample.products.map(
      function(product) {
        productArray.push(product)
        self.setState({products: productArray})
        return true
      }
    )
  }

  render () {
    return (
      <div className='page'>
        <nav>
          <IndexLink to='/' activeClassName='active'><button>Browse</button></IndexLink>
          <Link to='/cart' activeClassName='active'><button>Cart</button></Link>
        </nav>

        {React.cloneElement(this.props.children, {
          filters: this.state.filters,
          products: this.state.products,
          cart: this.state.cart,
          addToCart: this.addToCart,
          removeFromCart: this.removeFromCart
        })}
      </div>
    )
  }
}

export {App, Browse, Cart, ProductDetail};
