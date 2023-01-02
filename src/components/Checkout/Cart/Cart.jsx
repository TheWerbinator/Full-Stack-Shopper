import React from "react";
import "./Cart.css";
import CartItem from "./CartItem/CartItem";

class Cart extends React.Component {
  state = {
    promoApplied: this.props.promoApplied,
    promo: this.props.promo,
    promoError: "No Promo Applied",
    checkoutClicked: false,
    subtotal: this.props.subtotal,
    discount: this.props.discount,
    total: this.props.total,
    quantity: this.props.products.length,
  };

  handlePromoSubmit = () => {
    if (this.state.promoError === "") {
      this.setState({ promoApplied: true });
      this.props.handlePromo(this.state.promo, true);
    }
  };

  setPromo = (e) => {
    e === "10Free"
      ? this.setState({ promoError: "" })
      : this.setState({ promoError: "Invalid Promo Code" });
    this.setState({ promo: e });
  };

  handleCheckoutButton = () => {
    if (this.props.loggedIn !== true && this.props.empty !== true) {
      this.props.handleAuth(1);
    }
    if (this.props.loggedIn === true && this.props.empty !== true) {
      this.props.route(2);
    }
  };

  cartQuantity = (value, index) => {
    this.props.quantity(value, index);
    this.setState({quantity: value})
  };

  removeProduct = (index) => {
    this.props.remove(index);
    this.props.products.length === 0 && this.props.handleEmpty();
  };

  render() {
    let checkoutBtn = "checkout-btn";
    this.props.empty === true
      ? (checkoutBtn += " proceed-error")
      : (checkoutBtn = "checkout-btn");

    return (
      <div className='cart'>
        <div className='cart-body'>
          <div className='product-list'>
            {this.props.products.length ? (
              <CartItem
                products={this.props.products}
                type={"Cart"}
                quantity={this.cartQuantity}
                subtotal={this.handleSubtotal}
                remove={this.removeProduct}
              />
            ) : (
              <p className='cart-empty-message'>
                You have no products in your cart
              </p>
            )}
          </div>

          <div className='summary-block'>
            <div className='summary-block-header'>Summary</div>
            <hr />
            <div>
              {this.state.promoApplied === true ? (
                <div>
                  <p>Promo Applied!</p>
                </div>
              ) : (
                <div>
                  <p>Do you have a promo code?</p>
                  <div className='promo-input'>
                    <input
                      type='text'
                      id='promo'
                      name='promo'
                      onChange={(e) => this.setPromo(e.target.value)}
                    />
                    <button
                      className='promo-apply'
                      onClick={() => this.handlePromoSubmit()}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              )}
            </div>
            <hr />
            <div className='summary-numbers'>
              <div className='subtotal'>
                <p>Cart Subtotal:</p>
                <p>{this.props.subtotal}</p>
              </div>

              <div className='cart-shipping'>
                <p>Shipping & Handling:</p>
                <p>{this.props.shipping}</p>
              </div>

              <div className='discount'>
                <p>Discount:</p>
                <p>{this.props.discount}</p>
              </div>

              <div className='total'>
                <p>Cart Total:</p>
                <p>{this.props.total}</p>
              </div>
            </div>
            <hr />
            <div className={checkoutBtn}>
              <button onClick={() => this.handleCheckoutButton()}>
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Cart;
