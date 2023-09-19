import FavoriteRestaurantIdb from "../src/scripts/data/favorite-restaurant-idb";
import * as TestFactories from "./helper/testFactories";

const addLikeButtonContainer = () => {
  document.body.innerHTML = '<div id="likeButtonContainer"></div>';
};

describe("Liking Restaurant", () => {
  beforeEach(() => {
    addLikeButtonContainer();
  });

  it("should show the like button when the restaurant has not been liked before", async () => {
    await TestFactories.createLikeButton({ id: 1 });

    expect(
      document.querySelector('[aria-label="like restaurant"]')
    ).toBeTruthy();
  });

  it("should not show the unlike button when the restaurant has not been liked before", async () => {
    await TestFactories.createLikeButton({ id: 1 });

    expect(
      document.querySelector('[aria-label="unlike restaurant"]')
    ).toBeFalsy();
  });

  it("should be able to like the restaurant", async () => {
    await TestFactories.createLikeButton({ id: 1 });

    document.querySelector("#likeButton").dispatchEvent(new Event("click"));
    const restaurant = await FavoriteRestaurantIdb.getRestaurant(1);
    expect(restaurant).toEqual({ id: 1 });

    await FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  it("should not add a restaurant again when its already liked", async () => {
    await TestFactories.createLikeButton({ id: 1 });

    await FavoriteRestaurantIdb.putRestaurant({ id: 1 });
    document.querySelector("#likeButton").dispatchEvent(new Event("click"));
    const allRestaurant = await FavoriteRestaurantIdb.getAllRestaurants();
    expect(allRestaurant).toEqual([{ id: 1 }]);

    await FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  it("should not add a restaurant when it has no id", async () => {
    await TestFactories.createLikeButton({});

    document.querySelector("#likeButton").dispatchEvent(new Event("click"));
    const allRestaurant = await FavoriteRestaurantIdb.getAllRestaurants();
    expect(allRestaurant).toEqual([]);
  });
});
