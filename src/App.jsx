import React, { useState, useEffect } from "react";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Product from "./components/Product/Product";
import Checkout from "./components/Checkout/Checkout";
import Login from "./components/Login/Login";
import { API_URL, OPTIONS } from './constants.js';

function App() {
  const [route, setRoute] = useState("home");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [productInCart, setProductInCart] = useState([]);
  const [cartQuantity, setCartQuantity] = useState(productInCart.length);
  const [loggedIn, setLoggedIn] = useState(false);
  const [openAuth, setOpenAuth] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [lastFour, setLastFour] = useState("");
  const [cardType, setCardType] = useState("VISA");
  const [confComplete, setConfComplete] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(0);
  const [routeName, setRouteName] = useState('home');

  const customerEmails = [{ email: "test@user.com", password: "asdf123!" }];

  const fetchProducts = async (url, options) => {
    try {
      const response = await fetch(url, options);
      const jsonResponse = await response.json();
      return jsonResponse.data;
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCategories = async (url, options) => {
    try {
      const response = await fetch(url, options);
      const jsonResponse = await response.json();
      return jsonResponse.data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts(`${API_URL}/products?limit=25/`, OPTIONS).then(
      (result) => setProducts(result)
    );
    fetchCategories(`${API_URL}/categories/`, OPTIONS).then(
      (result) => setCategories(result)
    );
  }, []);

  const [searchClass, setSearchClass] = useState('searchbar hide-search')

  const searchButton = () => {
    searchClass === 'searchbar hide-search' ? 
      setSearchClass('searchbar')
      : setSearchClass('searchbar hide-search')
  }
  
  const handleAddToCart = (product, name, quantity) => {
    let tempItems = cartItems;
    let tempProductInCart = productInCart;
    if (Object.keys(tempItems).includes(name)) {
      tempItems[name] = tempItems[name] + quantity;
    } else {
      tempItems[name] = quantity;
      tempProductInCart.push(product);
      setProductInCart(tempProductInCart);
      setCartQuantity(cartQuantity + 1);
    }
    setCartItems(tempItems);
  };

  const handleRemoveProduct = (index, name) => {
    let tempCartProducts = productInCart;
    tempCartProducts.splice(index, 1);
    setProductInCart(tempCartProducts);
    let tempCartItems = cartItems;
    delete tempCartItems[name]
    setCartItems(tempCartItems);
    cartQuantity > 1 ? setCartQuantity(cartQuantity - 1) : setCartQuantity(0);
  };

  const resetMainCart = () => {
    setCartItems({});
    setProductInCart([]);
    setConfComplete(false);
  };

  const confirmationComplete = () => {
    setConfComplete(true);
  }

  useEffect(() => {
    setCartQuantity(0);
  }, [confComplete]);

  useEffect(() => {
    confComplete === true && resetMainCart();
    switch (routeName) {
      case 0:
        setRoute("home");
        break;
      case 1:
        setRoute("pdp");
        break;
      case 2:
        setRoute("cart");
        break;
      default:
        break;
    }
  }, [routeName])

  const handleRoute = async (routeName, productIndex) => {
    productIndex != undefined && setCurrentProduct(products[productIndex]);
    setRouteName(routeName);
  };

  const handleAuth = (open) => {
    open === 1 ? setOpenAuth(true) : setOpenAuth(false);
  };

  const handleLoggedIn = () => {
    setLoggedIn(true);
    handleAuth(0);
  };

  return (
    <>
      {openAuth ? (
        <Login
          handleLoggedIn={handleLoggedIn}
          handleAuth={handleAuth}
          existingAccounts={customerEmails}
        />
      ) : products.length && categories.length ? (
        <div className='App'>
          {route === "cart" ? (
            <Checkout
              products={productInCart}
              cartItems={cartItems}
              handleRoute={handleRoute}
              handleAuth={handleAuth}
              loggedIn={loggedIn}
              openAuth={openAuth}
              empty={empty}
              lastFour={lastFour}
              cardType={cardType}
              setLastFour={setLastFour}
              setEmpty={setEmpty}
              setCardType={setCardType}
              handleRemoveProduct={handleRemoveProduct}
              confComplete={confirmationComplete}
            />
          ) : route === "pdp" ? (
            <>
              <Header quantity={cartQuantity} handleRoute={handleRoute}
              loggedIn={loggedIn} />
              <Product
                product={currentProduct}
                options={options}
                handleAddToCart={handleAddToCart}
                handleRoute={handleRoute}
              />
              <Footer />
            </>
          ) : (
            route === "home" && (
              <>
                <Header
                  quantity={cartQuantity}
                  handleRoute={handleRoute}
                  handleAuth={handleAuth}
                  loggedIn={loggedIn}
                  searchButton={searchButton}
                />
                <Home
                  categories={categories}
                  products={products}
                  handleRoute={handleRoute}
                  handleAddToCart={handleAddToCart}
                  searchClass={searchClass}
                />
                <Footer />
              </>
            )
          )}
        </div>
      ) : null}
    </>
  );
}

export default App;
