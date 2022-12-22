import React from "react";
import "./Home.css";
import img from "../../assets/hero.jpg";

const Home = ({ categories, products }) => {
  return (
    <div className='home-wrapper'>
      <div className='hero-wrapper'>
        <img src={img} alt='Store Hero Banner' />
        <div className='hero-header'>
          <h2 className='header-large'>WERBER SWEETS WILD BERRY TART</h2>
          <p>One tart, three berries!</p>
          <div className='btn-box'>
            <button>Shop Now</button>
          </div>
        </div>
      </div>

      <div className='text-upsell'>
        <h2>Dessert that inspires</h2>
        <p>Werber Sweets desserts are made from scratch, in house!</p>
        <p>
          We started Werber Sweets to create desserts that leave lasting
          impressions! Whether it is an introduction to a new flavor or a return
          to an old favorite, we aim to bring you a perspective that raises your
          standards for what exceptional tastes like.
        </p>
        <button>Shop Our Products</button>
      </div>

      <div className='category-gallery'>
        <h2>{categories[4].name}</h2>
        <div className='category-gallery-products'>
          <a>
            <img src={products[0].image.url} alt='Category Product 1' />
            <p>{products[0].name}</p>
            <p>{products[0].price.formatted_with_symbol}</p>
          </a>
          <a>
            <img src={products[1].image.url} alt='Category Product 1' />
            <p>{products[1].name}</p>
            <p>{products[1].price.formatted_with_symbol}</p>
          </a>
          <a>
            <img src={products[2].image.url} alt='Category Product 1' />
            <p>{products[2].name}</p>
            <p>{products[2].price.formatted_with_symbol}</p>
          </a>
          <a>
            <img src={products[3].image.url} alt='Category Product 1' />
            <p>{products[3].name}</p>
            <p>{products[3].price.formatted_with_symbol}</p>
          </a>
        </div>
        <button>View All</button>
      </div>

      <div className='collection-highlight'>
        <img src={categories[0].assets[0].url} alt='Highlight Product Image' />
        <div className='highlight-details'>
          <h2 className='header-uppercase header-large'>Extra Special</h2>
          <p>
            <em>
              <strong>AS UNFORGETTABLE AS YOUR EVENT</strong>
            </em>
          </p>
          <p>
            Traveling has given us a unique perspective on food. We have been
            inspired from the world's top chefs just as much as mothers in
            countryside kitchens. Our commitment to authenticity makes our
            specialties as close to being there as possible. We are willing to
            explore - ask us to make your grandmother's recipe for a custom
            order!
          </p>
          <button>Shop Collection</button>
        </div>
      </div>

      <div className='highlight-collection-gallery'>
        <h2>Specialities</h2>
        <div className='product-gallery'>
          <a href='#'>
            <img src={products[21].image.url} alt='Gallery Product 1' />
            <p>{products[21].name}</p>
            <p>{products[21].price.formatted_with_symbol}</p>
          </a>
          <a href='#'>
            <img src={products[22].image.url} alt='Gallery Product 1' />
            <p>{products[22].name}</p>
            <p>{products[22].price.formatted_with_symbol}</p>
          </a>
          <a href='#'>
            <img src={products[23].image.url} alt='Gallery Product 1' />
            <p>{products[23].name}</p>
            <p>{products[23].price.formatted_with_symbol}</p>
          </a>
          <a href='#'>
            <img src={products[24].image.url} alt='Gallery Product 1' />
            <p>{products[24].name}</p>
            <p>{products[24].price.formatted_with_symbol}</p>
          </a>
        </div>
        <button>View All</button>
      </div>

      <div className='main-category-grid'>
        <a href='#'>
          <img src={categories[1].assets[0].url} alt='Category Product 1' />
          <div className='p-arrow'>
            <p>
              {categories[1].name}
              <i>Arrow</i>
            </p>
          </div>
        </a>
        <a href='#'>
          <img src={categories[2].assets[0].url} alt='Category Product 1' />
          <div className='p-arrow'>
            <p>
              {categories[2].name}
              <i>Arrow</i>
            </p>
          </div>
        </a>
        <a href='#'>
          <img src={categories[3].assets[0].url} alt='Category Product 1' />
          <div className='p-arrow'>
            <p>
              {categories[3].name}
              <i>Arrow</i>
            </p>
          </div>
        </a>
        <a href='#'>
          <img src={categories[0].assets[0].url} alt='Category Product 1' />
          <div className='p-arrow'>
            <p>
              {categories[0].name}
              <i>Arrow</i>
            </p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
