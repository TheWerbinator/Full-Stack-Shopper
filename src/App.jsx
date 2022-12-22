import React, { useState, useEffect } from "react";
import "./App.css";
import Collections from "./components/Collections/Collections";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Product from "./components/Product/Product";
import Category from "./components/Category/Category";

const options = {
  headers: {
    "X-Authorization": "pk_test_488771077b6e894232a62ac87db0d9a1ab32d5aab3494",
  },
};

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchData = async (url, options) => {
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

  // .catch((error) => console.error(error))

  useEffect(() => {
    fetchData("https://api.chec.io/v1/products?limit=25/", options).then(
      (result) => setProducts(result)
    );
    fetchCategories("https://api.chec.io/v1/categories/", options).then(
      (result) => setCategories(result)
    );
  }, []);

  return (
    <>
      {products.length && categories.length ? (
        <div className='App'>
          <Header categories={categories} />
          {/* <Home categories={categories} products={products} /> */}
          <Product product={products[0]} options={options} />
          {/* <Category category={categories[0]} products={products} /> */}
          {/* <Collections categories={categories} /> */}
          <Footer />
        </div>
      ) : null}
    </>
  );
}

export default App;
