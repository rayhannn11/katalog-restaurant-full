import UrlParser from "../../routes/url-parser";
import RestaurantDbSource from "../../data/restaurantdb-source";
import { createRestaurantDetailTemplate } from "../templates/template-creator";
import LikeButtonInitiator from "../../utils/like-button-initiator";

const Detail = {
  async render() {
    return `
      <div tabindex="0" id="card" class="restaurant"></div>
      <div tabindex="0" id="likeButtonContainer"></div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await RestaurantDbSource.detailRestaurant(url.id);
    const urlImg = await RestaurantDbSource.imgRestaurants(
      restaurant.pictureId
    );

    const restaurantContainer = document.querySelector("#card");
    restaurantContainer.innerHTML = createRestaurantDetailTemplate(
      restaurant,
      urlImg
    );

    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector("#likeButtonContainer"),
      restaurant: {
        id: restaurant.id,
        name: restaurant.name,
        description: restaurant.description,
        pictureImg: urlImg,
        rating: restaurant.rating,
      },
    });
  },
};

export default Detail;
