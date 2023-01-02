import React, { useState, useEffect, useMemo } from "react";
import "./Product.css";

const Product = ({ product, handleAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const calcQuantity = (newQuantity) => {
    setQuantity(parseFloat(newQuantity));
  };

  return (
    <>
      <div className='pdp-wrapper'>
        <div className='pdp-image-gallery'>
          <img src={product.image.url} alt='product image 1' />
        </div>
        <div className='pdp-product-summary'>
          <div className='cta'>
            <p>Werber Sweets</p>
            <p>{product.name}</p>
            <p>${parseInt(product.price.raw * quantity)}</p>
            <label htmlFor='quantity'>Quantity</label>
            <select
              name='quantity'
              id='quantity'
              onChange={(e) => calcQuantity(e.target.value)}
            >
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
            </select>
            <button
              onClick={() => handleAddToCart(product, product.name, quantity)}
            >
              Add to Cart
            </button>
          </div>
          <div className='product-description' dangerouslySetInnerHTML={{__html: product.description}}></div>
        </div>
      </div>
    </>
  );
};

export default Product;
