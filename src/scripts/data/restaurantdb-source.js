import API_ENDPOINT from "../globals/api-endpoint";

class RestaurantDbSource {
  static async listRestaurants() {
    const response = await fetch(API_ENDPOINT.LIST);
    const responseJson = await response.json();

    return responseJson.restaurants;
  }

  static async imgRestaurants(pictureId) {
    const responseImg = await fetch(API_ENDPOINT.IMG(pictureId));
    return responseImg.url;
  }

  static async detailRestaurant(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    const responseJson = await response.json();
    console.log(responseJson.restaurant);
    return responseJson.restaurant;
  }
}

export default RestaurantDbSource;
