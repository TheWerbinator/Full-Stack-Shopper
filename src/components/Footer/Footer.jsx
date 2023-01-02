import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className='footer-wrapper'>
      <div className='quick-links'>
        <a href='#'>Home</a>
        <a href='#'>Collections</a>
        <a href='#'>Terms of Service</a>
        <a href='#'>Refund + Returns</a>
        <a href='#'>Privacy Policy</a>
        <a href='#'>Contact Us</a>
      </div>

      <div className='footer-info'>
        <div className='region'>
          <p>Country/Region</p>
          <select name='country' id='country'>
            <option value='united states'>United States</option>
          </select>
        </div>

        <div className='payment-copyright'>
          <div className='payment-options'>
            <img
              src='https://www.merchantequip.com/images/logos/disc-mc-visa-amex-380x67.gif'
              alt='Merchant Equipment Store Credit Card Logos'
            />
          </div>
          <p className='copyright'>Copyright 2022, Cake Palace Inc.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
