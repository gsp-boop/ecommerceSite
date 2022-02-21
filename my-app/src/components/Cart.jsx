import React from "react";
import Shipping from "../components/ShippingInfo/Shipping";
import '../style/cart.css'

class Cart extends React.Component {
    state = {
        toShippingInfo: false,
    }

    toShipping = () => {
        this.setState({ toShippingInfo: true })
    }

  render() {
    const {toShippingInfo} = this.state;
    const { cart, toHome } = this.props;
    const subTotal = cart
      .map((item) => item.price * item.count)
      .reduce((prev, curr) => prev + curr, 0);

    return (
      <div>
        {
        cart.length === 0 ? (
          <p>Nothing in cart</p>
        ) : (
      
         toShippingInfo ? <Shipping toHome={toHome} cart={cart} subTotal={ subTotal } cart={ cart } /> : (
            <div className="cart-container container">
              <table className="mt-4">
                <thead>
                  <tr className="my-rows">
                    <th className="h3">Product</th>
                    <th></th>
                    <th className="h3">Quantity</th>
                    <th className="h3">Price</th>
                  </tr>
                </thead>
                <tbody>
                    {cart.map((item, i) => (
                    <tr className="my-rows" key={`${i} itemCart`}>
                      <td key={`${i} ${item.name} cart`} className="cart-item">               
                        <span className='h5'>{item.name}</span>
                      </td>
                      <td>
                        <img className="cart-img" src={item.img} alt="" />
                      </td>

                    <td className="cart-quantity">
                      <button className="btn btn-secondary add" onClick={() => { this.props.addInCart(item) }}>+</button>
                      <span className="h4">{item.count}</span>
                      <button className="btn btn-secondary subtract" onClick={() => { this.props.removeOne(item) }}>-</button>
                      <button className="btn btn-danger remove" onClick={() => { this.props.removeItem(item)}}>x</button>
                    </td>
                    <td key={`${i}cartPrice`}>
                      <span className="h4">${item.count * item.price}</span>
                    </td>
                  </tr>
                    ))}
                </tbody>
              </table>
              <div className="cart-total">
                <div className="positioning">
                  <span className="h4">SubTotal</span>
                  <span className="h5 text-secondary">{subTotal}</span>
                  <button className="btn btn-success" onClick={this.toShipping}>Checkout</button>
                </div>
              </div>

          </div>
          )
        )
      }
      </div>
    );
  }
}
export default Cart;
