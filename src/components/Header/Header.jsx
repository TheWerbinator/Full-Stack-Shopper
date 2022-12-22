import React from "react";
import "./Header.css";
import search from "../../assets/magnifying-glass.png";
import logo from "../../assets/magnifying-glass.png";

const Header = ({ categories }) => {
  return (
    <div className='header-wrapper'>
      <div className='header-title'>
        <div className='header-search'>
          <img src={search} alt='Search' />
        </div>
        <div className='header-logo'>
          <img src={logo} alt='Werber Sweets Logo' />
        </div>
        <div className='header-buttons'>
          <button>Login</button>
          <button>Cart</button>
        </div>
      </div>

      <div className='header-categories'>
        {categories.length
          ? categories.map((cat) => {
              return (
                <a href='#' key={cat.name}>
                  {cat.name}
                </a>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default Header;
