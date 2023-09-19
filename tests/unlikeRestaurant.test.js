import FavoriteRestaurantIdb from "../src/scripts/data/favorite-restaurant-idb";
import * as TestFactories from "./helper/testFactories";

const addLikeButtonContainer = () => {
  document.body.innerHTML = '<div id="likeButtonContainer"></div>';
};

describe("Liking Restaurant", () => {
  beforeEach(async () => {
    addLikeButtonContainer();
    await FavoriteRestaurantIdb.putRestaurant({ id: 1 });
  });

  afterEach(async () => {
    await FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  it("should display unliked widget when the restaurant has been liked", async () => {
    await TestFactories.createLikeButton({ id: 1 });

    expect(
      document.querySelector('[aria-label="unlike restaurant"]')
    ).toBeTruthy();
  });

  it("should not display like widget when the resto has been liked", async () => {
    await TestFactories.createLikeButton({ id: 1 });

    expect(
      document.querySelector('[aria-label="like restaurant"]')
    ).toBeFalsy();
  });

  it("should be able to remove liked restaurant from the list", async () => {
    await TestFactories.createLikeButton({ id: 1 });

    document
      .querySelector('[aria-label="unlike restaurant"]')
      .dispatchEvent(new Event("click"));
    const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
    expect(restaurants).toEqual([]);
  });

  it("should not throw error if the unliked restaurant is not in the list", async () => {
    await TestFactories.createLikeButton({ id: 1 });

    await FavoriteRestaurantIdb.deleteRestaurant(1);
    document
      .querySelector('[aria-label="unlike restaurant"]')
      .dispatchEvent(new Event("click"));
    const allRestaurant = await FavoriteRestaurantIdb.getAllRestaurants();
    expect(allRestaurant).toEqual([]);
  });
});
