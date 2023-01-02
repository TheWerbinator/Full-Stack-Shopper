import React from "react";
import "./Home.css";
import img from "../../assets/hero.jpg";
import { useState } from "react";

const Home = ({ categories, products, handleRoute, handleAddToCart, searchClass }) => {
  const [activeProducts, setActiveProducts] = useState(products);
  const [sortInput, setSortInput] = useState("");

  const handleSelect = (e) => {
    if (e.target.value === "all") {
      setActiveProducts(products);
    } else {
      const newActiveProducts = products.filter((product) => {
        return product.categories[0].slug === e.target.value;
      });
      setActiveProducts(newActiveProducts);
    }
  };

  const handleSort = (e) => {
    setSortInput(e.target.value);
    if (e.target.value === "") {
      setActiveProducts(products);
    } else {
      const newActiveProducts = products.filter((product) => {
        return product.name.toLowerCase().includes(e.target.value);
      });
      setActiveProducts(newActiveProducts);
    }
  };

  return (
    <div className='home-wrapper'>
      <div className='sort-and-search'>
        
        <div className={searchClass}>
          <p>Search: </p>
          <input
            type='text'
            value={sortInput}
            onChange={(e) => handleSort(e)}
          />
        </div>

        <div className='category-sort'>
          <p>Sort by Category: </p>
          <select
            name='category'
            id='category'
            onChange={(e) => handleSelect(e)}
          >
            <option value='all'>All</option>
            {categories.map((category) => {
              return <option value={category.slug}>{category.name}</option>;
            })}
          </select>
        </div>

      </div>
      <div className='gallery'>
        {activeProducts.map((product, index) => {
          return (
            <div className='home-product-wrapper'>
              <a
                href='#'
                className='home-product'
                onClick={() => handleRoute(1, index)}
              >
                <img src={product.image.url} alt={product.name} />
                <div className='home-product-description'>
                  <p>{product.name}</p>
                  <p>{product.price.formatted_with_symbol}</p>
                </div>
              </a>
              <button onClick={() => handleAddToCart(product, product.name, 1)}>
                Add to Cart
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
