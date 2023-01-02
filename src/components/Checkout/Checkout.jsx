import React, { useState } from "react";
import Cart from "./Cart/Cart";
import Shipping from "./Shipping/Shipping";
import Payment from "./Payment/Payment";
import Confirmation from "./Confirmation/Confirmation";
import "./Checkout.css";
import Login from "../Login/Login";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useEffect } from "react";

const checkoutRoutes = ["login", "cart", "shipping", "payment", "confirmation"];

const Checkout = ({
  products,
  cartItems,
  handleRoute,
  loggedIn,
  handleAuth,
  openAuth,
  empty,
  setEmpty,
  lastFour,
  setLastFour,
  cardType,
  setCardType,
  handleRemoveProduct,
  confComplete,
}) => {
  let tempProducts = [];
  const [cartQuantity, setCartQuantity] = useState(products.length);
  let tempProductsInCart = products.map((product, index) => {
    const quantity = parseInt(Object.values(cartItems)[index]);
    const tempTotal = product.price.raw * quantity;
    return {
      image: product.image.url,
      name: product.name,
      price: product.price.raw,
      quantity: quantity,
      total: tempTotal,
    };
  });

  const [productsInCart, setProductsInCart] = useState(tempProductsInCart);
  const [checkoutRouteIndex, setCheckoutRouteIndex] = useState(1);
  const [subtotal, setSubtotal] = useState(
    productsInCart.length
      ? productsInCart
          .map((val) => val.total)
          .reduce((total, val) => total + val)
      : 0
  );
  const [shipping, setShipping] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [promo, setPromo] = useState("");
  const [total, setTotal] = useState(subtotal);
  const [shippingType, setShippingType] = useState('Free');

  const [button, setButton] = useState(0);
  const [conf, setConf] = useState(false);

  const handleRouteChange = (change) => {
    setCheckoutRouteIndex(change);
  };

  useEffect(() => {
    let tempSubtotal = 0;
    productsInCart.forEach((product) => (tempSubtotal += product.total));
    setSubtotal(tempSubtotal);
    setTotal(tempSubtotal - discount + shipping);
  }, [productsInCart, promoApplied, discount, button]);

  const handleShipping = (type) => {
    if(type === "Express") {
      setShipping(5);
      setShippingType('Express');
      setTotal(subtotal - discount + 5);
    } else {
      setShipping(0);
      setShippingType('Free');
      setTotal(subtotal - discount);
    }
  };

  const removeProduct = (index) => {
    let tempCartProducts = productsInCart;
    let item = tempCartProducts[index].name;
    tempCartProducts.splice(index, 1);
    setProductsInCart(tempCartProducts);
    setButton(button + 1);
    handleRemoveProduct(index, item);
    cartQuantity > 1 ? setCartQuantity(cartQuantity - 1) : setCartQuantity(0);
  };

  const handlePromo = (code, applied) => {
    setDiscount(10);
    setPromo(code);
    applied === true && setPromoApplied(true);
  };

  const checkoutRoute = checkoutRoutes[checkoutRouteIndex];

  const handleQuantity = (value, index) => {
    let tempCartProducts = productsInCart;
    tempCartProducts[index].quantity = value;
    tempCartProducts[index].total =
      tempCartProducts[index].quantity * tempCartProducts[index].price;
    setProductsInCart(tempCartProducts);
    setButton(button + 1);
  };

  const handleEmpty = () => {
    setEmpty(true);
  };

  const confirmationInfo = (cardData) => {
    const last4 = cardData.card.slice(-4);
    setLastFour(last4);
  };

  const handleCardType = (type) => {
    setCardType(type);
  };

  const confirmationComplete = () => {
    confComplete();
    setConf(true);
  }

  return (
    <div className='checkout-body'>
      <div className='cart-header'>
        <Header
          quantity={cartQuantity}
          loggedIn={loggedIn}
          handleAuth={handleAuth}
          handleRoute={handleRoute}
        />
      </div>

      <div>
        <button onClick={() => handleRoute(0)}>Back Home</button>
        {openAuth ? (
          <Login
            handleLoggedIn={handleLoggedIn}
            handleAuth={handleAuth}
            existingAccounts={customerEmails}
          />
        ) : (
          checkoutRoute === "cart" && (
            <Cart
              products={productsInCart}
              route={handleRouteChange}
              subtotal={subtotal}
              handleAuth={handleAuth}
              loggedIn={loggedIn}
              shipping={shipping}
              discount={discount}
              handlePromo={handlePromo}
              promo={promo}
              promoApplied={promoApplied}
              quantity={handleQuantity}
              total={total}
              remove={removeProduct}
              empty={empty}
              handleEmpty={handleEmpty}
            />
          )
        )}
        {checkoutRoute === "shipping" && (
          <Shipping
            products={productsInCart}
            route={handleRouteChange}
            subtotal={subtotal}
            shipping={shipping}
            discount={discount}
            handleShipping={handleShipping}
            total={total}
            currentPlace={checkoutRouteIndex}
            shippingType={shippingType}
          />
        )}
        {checkoutRoute === "payment" && (
          <Payment
            products={productsInCart}
            route={handleRouteChange}
            subtotal={subtotal}
            shipping={shipping}
            discount={discount}
            total={total}
            confirmationInfo={confirmationInfo}
            handleCardType={handleCardType}
            currentPlace={checkoutRouteIndex}
          />
        )}
        {checkoutRoute === "confirmation" && (
          <Confirmation
            products={productsInCart}
            subtotal={subtotal}
            shipping={shipping}
            discount={discount}
            total={total}
            lastFour={lastFour}
            cardType={cardType}
            currentPlace={checkoutRouteIndex}
            confirmationComplete={confirmationComplete}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
