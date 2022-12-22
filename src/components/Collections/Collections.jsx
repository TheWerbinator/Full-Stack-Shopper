import React from "react";
import "./Collections.css";

const Collections = ({ categories }) => {
  return (
    <div className='collections-wrapper'>
      {categories.map((cat) => {
        return (
          <div className='collection'>
            <img src={cat.assets[0].url} alt={cat.name} />
            <div className='category-name'>
              <p>{cat.name}</p>
              <i>arrow</i>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Collections;
