import RestaurantDbSource from "../../data/restaurantdb-source";
import { createRestaurantItemTemplate } from "../templates/template-creator";

const Home = {
  async render() {
    return `
    <div class="home">
        <div class="hero__wrapper">
            <picture>
              <source media="(max-width: 600px)" srcset="./images/hero/hero-image_2-small.jpg">
              <img src='./images/hero/hero-image_2-large.jpg' 
                  alt="hero__image">
            </picture>
            <div tabindex="0" class="hero__text">
                <h1 class="hero__title">Welcome to Katalog Restaurant</h1>

                <p class="hero__subtitle">
                Whether you're a fan of spicy, savory, or sweet, our restaurant
                catalog has something to satisfy every palate. Explore our diverse
                menu offerings and discover your new favorite dishes.
                </p>

                <a href="#main-content" class="btn">Read More</a>
            </div>
        </div>

        <h2 tabindex="0" id="explore-restaurant-list" class="main-content__title">✨Explore Restaurant✨</h2>
        <section id="explore-restaurant"></section>
    </div>
    `;
  },

  async afterRender() {
    const restaurants = await RestaurantDbSource.listRestaurants();
    const restaurantContainer = document.querySelector("#explore-restaurant");

    const newRestaurant = await Promise.all(
      [...restaurants].map(async (restaurant) => {
        const url = await RestaurantDbSource.imgRestaurants(
          restaurant.pictureId
        );
        return { ...restaurant, pictureImg: url };
      })
    );

    newRestaurant.forEach((restaurant) => {
      restaurantContainer.innerHTML += createRestaurantItemTemplate(restaurant);
    });
  },
};

export default Home;
