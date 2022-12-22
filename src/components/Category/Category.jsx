import React, { useState } from "react";
import "./Category.css";

const Category = ({ category, products }) => {
  return (
    <div className='plp-wrapper'>
      {products.map((product) => {
        return product.categories[0].name === category.name ? (
          <div className='category-wrapper'>
            <img src={product.image.url} alt={product.name} />
            <div className='category-name'>
              <p>{product.name}</p>
              <i>arrow</i>
            </div>
          </div>
        ) : null;
      })}
    </div>
  );
};

export default Category;
