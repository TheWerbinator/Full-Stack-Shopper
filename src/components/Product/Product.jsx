import React, { useState, useEffect, useMemo } from "react";
import "./Product.css";

const Product = ({ product, categories, options }) => {
  const [variants, setVariants] = useState([]);
  const [variantPrices, setVariantPrices] = useState([]);
  const [quantity, setQuantity] = useState(1);

  let variantTotal = 0;

  const fetchVariant = async (url, options) => {
    try {
      const response = await fetch(url, options);
      const jsonResponse = await response.json();
      return jsonResponse.variant_groups;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const initVariantPrices = (arrayOfObjects) => {
    let tempVariants = [];
    if (arrayOfObjects.length) {
      arrayOfObjects.forEach((variant) => {
        tempVariants[variant.name] = "0";
      });
      console.log(tempVariants);
    } else console.log("tempVariants is empty");
    setVariantPrices(tempVariants);
  };

  useEffect(() => {
    fetchVariant("https://api.chec.io/v1/products/" + product.id, options)
      .then((result) => setVariants(result))
      .then(initVariantPrices(variants));
  }, []);

  const updateVariantPrices = (price, name) => {
    let tempVariants = variantPrices;
    Object.entries(variantPrices).forEach(([key, value]) => {
      if (key === name) {
        tempVariants[key] = price;
      }
    });
    setVariantPrices(tempVariants);
  };

  const updateVariantTotal = () => {
    let addedPrices = 0;
    Object.entries(variantPrices).forEach(([key, value]) => {
      addedPrices += parseFloat(value);
    });
    variantTotal = addedPrices;
  };

  const calcVariant = (price, name) => {
    updateVariantPrices(price, name);
    updateVariantTotal();
  };

  const calcQuantity = (newQuantity) => {
    setQuantity(parseFloat(newQuantity));
  };

  return (
    <>
      {variants.length ? (
        <>
          <div className='pdp-wrapper'>
            <div className='image-gallery'>
              <img src={product.image.url} alt='product image 1' />
              <img src={product.image.url} alt='product image 2' />
              <img src={product.image.url} alt='product image 3' />
            </div>
            <div className='product-summary'>
              <div className='cta'>
                <p>Werber Sweets</p>
                <p>{product.name}</p>
                <p>
                  ${parseInt((product.price.raw + variantTotal) * quantity)}
                </p>

                {variants.map((variant) => (
                  <>
                    <label htmlFor={variant.name}>{variant.name}</label>
                    <select
                      name={variant.name}
                      id={variant.name}
                      onChange={(e) => {
                        // console.log("onChange variantPrices", variantPrices);
                        calcVariant(e.target.value, e.target.name);
                      }}
                    >
                      {variant.options.map((option) => (
                        <option value={option.price.raw}>{option.name}</option>
                      ))}
                    </select>
                  </>
                ))}

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
                <button>Add to Cart</button>
              </div>
              <div className='product-description'>{product.description}</div>
            </div>
          </div>
          <div className='upsell'>
            <a href='#'>
              <img src='#' alt='upsell 1' />
              <p>Product Name</p>
              <p>product Price</p>
            </a>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Product;
