const createRestaurantDetailTemplate = (restaurant, urlImg) => `
  <h2 class="restaurant__title">${restaurant.name}</h2>
  <div tabindex="0" class="restaurant__header"> 
    <img class="restaurant__poster" src="${
      urlImg || "https://picsum.photos/id/666/800/450?grayscale"
    }" alt="${restaurant.name}"/>
    <div tabindex="0" class="restaurant__info">
      <h3>Information</h3>
        <h4>City</h4>
        <p>${restaurant.city}</p>
        <h4>Location</h4>
        <p>${restaurant.address}</p>
        <h4>Categories</h4>
        <p>${restaurant.categories
          .map((category) => `<span>${category.name}</span>`)
          .join(", ")}
        </p>
        <h4>Rating</h4>
        <p>⭐${restaurant.rating}</p>
    </div>
  </div>
  <div tabindex="0" class="restaurant__overview">
    <h3>Description</h3>
    <p>${restaurant.description}</p>
    <h3 class="restaurant__menus-title">Menus</h3>
    <div tabindex="0" class="restaurant__menus">
      <div>
        <h4 class="restaurant__menus__foods">🍔 Foods</h4>
        <p>${restaurant.menus.foods
          .map((food) => `<span>${food.name}</span>`)
          .join(", ")}
        </p>
      </div>
      <div>
        <h4 class="restaurant__menus__drinks">🍹 Drinks</h4>
        <p>${restaurant.menus.drinks
          .map((drink) => `<span>${drink.name}</span>`)
          .join(", ")}
        </p>
      </div>    
    </div>
    <h3 class="restaurant__menus-title">Reviews</h3>
    <div tabindex="0" class="restaurant__reviews">         
      <div class="restaurant__reviews__wrapper">
        ${restaurant.customerReviews.slice(0, 2).map(
          (customerReview) => `<span>🧑${customerReview.name}</span>
            <span>${customerReview.review}</span>
            <span>${customerReview.date}</span>`
        )}
      </div> 
    </div> 
  </div>
`;

const createRestaurantItemTemplate = (restaurant) => `
<div tabindex="0" id="card" class="card">
<div tabindex="0" class="card-content-rating">⭐${restaurant.rating}</div>
        <div class="img-container">
            <img tabindex="0" class="card-image lazyload" alt="${
              restaurant.name
            }" src="${
  restaurant.pictureImg
    ? restaurant.pictureImg
    : "https://picsum.photos/id/666/800/450?grayscale"
}"/>
        </div>
        <div tabindex="0" class="card-content">
            <div class="card-content-info">
              <h3>
                <a href="/#/detail/${restaurant.id}">${restaurant.name}</a>
              </h3>
            </div>
            <p class="truncate">${restaurant.description}</p>  
        </div>  
     </div>
`;

const createLikeButtonTemplate = () => `
  <button aria-label="like restaurant" id="likeButton" class="like">
    <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createLikedButtonTemplate = () => `
  <button aria-label="unlike restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestaurantDetailTemplate,
  createRestaurantItemTemplate,
  createLikeButtonTemplate,
  createLikedButtonTemplate,
};
