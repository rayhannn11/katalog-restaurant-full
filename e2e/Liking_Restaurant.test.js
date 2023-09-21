const assert = require("assert");

Feature("Favorite Restaurant");

// Alwas start from homepage
Before(({ I }) => {
  // root URL : http:localhost:5000
  I.amOnPage("/");
});

const emptyFavoriteRestaurantText = "Empty Favorite Restaurant";

Scenario(
  "when a user like restaurant without viewing the favorites page",
  async ({ I }) => {
    // User choose restaurant
    I.amOnPage("/");
    I.seeElement(".card a");
    const firstRestaurantCard = locate(".card-content-info").first();
    const firstRestaurantCardTitle = await I.grabTextFrom(firstRestaurantCard);
    I.click(firstRestaurantCard);

    // Click like button
    I.seeElement("#likeButton");
    I.click("#likeButton");

    // Check if succes add favorite restaurant
    I.amOnPage("/#/like");
    I.seeElement(".card");
    const likedCardTitle = await I.grabTextFrom(".card-content-info");
    assert.strictEqual(firstRestaurantCardTitle, likedCardTitle);
  }
);

Scenario(
  "when a user like restaurant with viewing the favorites page",
  async ({ I }) => {
    // User go to favorite page
    I.amOnPage("/#/like");
    I.seeElement("#cards");
    I.see(emptyFavoriteRestaurantText, ".content__empty");

    // User choose restaurant
    I.amOnPage("/");
    I.seeElement(".card a");
    const firstRestaurantCard = locate(".card-content-info").first();
    const firstRestaurantCardTitle = await I.grabTextFrom(firstRestaurantCard);
    I.click(firstRestaurantCard);

    // Click like button
    I.seeElement("#likeButton");
    I.click("#likeButton");

    // Check if succes add favorite restaurant
    I.amOnPage("/#/like");
    I.seeElement(".card");
    const likedCardTitle = await I.grabTextFrom(".card-content-info");
    assert.strictEqual(firstRestaurantCardTitle, likedCardTitle);
  }
);

Scenario("when a user unlike restaurant", async ({ I }) => {
  // Like some favorite restaurant
  I.amOnPage("/#/detail/rqdv5juczeskfw1e867");
  I.seeElement("#likeButton");
  I.click("#likeButton");

  // Unlike restaurant
  I.amOnPage("/#/like");
  I.seeElement(".card a");
  const firstRestaurantLiked = locate(".card-content-info").first();
  I.click(firstRestaurantLiked);
  // Click unlike button
  I.seeElement("#likeButton");
  I.click("#likeButton");
  // check favorite deleted or not
  I.amOnPage("/#/like");
  I.seeElement(".content__empty");
  I.dontSeeElement(".card");
  I.dontSeeElement(".card-content-info");
});
