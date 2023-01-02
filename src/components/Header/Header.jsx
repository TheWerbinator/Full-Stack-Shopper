import React, { useState } from "react";
import "./Header.css";
import search from "../../assets/magnifying-glass.png";
import logo from "../../assets/logo.png";

const Header = ({ quantity, loggedIn, handleAuth, handleRoute, searchButton }) => {
  
  return (
    <div className='header-wrapper'>
      <div className='header-title'>
        <div className='header-search' onClick={() => searchButton()}>
          <img src={search} alt='Search' />
        </div>
        <a className='header-logo' onClick={() => handleRoute(0)}>
          <img src={logo} alt='Cake Palace Logo' />
        </a>
        <div className='header-buttons'>
          {loggedIn ? (
            <button>View Profile</button>
          ) : (
            <button onClick={() => handleAuth(1)}>Login</button>
          )}
          <button onClick={() => handleRoute(2)}>Cart ({quantity})</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
