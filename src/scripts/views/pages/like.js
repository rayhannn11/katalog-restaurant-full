import FavoriteRestaurantIdb from "../../data/favorite-restaurant-idb";
import { createRestaurantItemTemplate } from "../templates/template-creator";

const Like = {
  async render() {
    return `
      <div class="content">
        <h2 class="content__heading">Favorite Restaurant</h2>
        <div id="cards" class="content-container">

        </div>
      </div>
    `;
  },

  async afterRender() {
    const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
    console.log(restaurants);
    const cardsContainer = document.querySelector("#cards");
    if (restaurants.length > 0) {
      restaurants.forEach((restaurant) => {
        cardsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
      });
    } else {
      cardsContainer.innerHTML += `<h2 class="content__empty">Empty Favorite Restaurant</h2>`;
    }
  },
};

export default Like;
