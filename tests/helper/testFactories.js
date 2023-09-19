import LikeButtonInitiator from "../../src/scripts/utils/like-button-initiator";

const createLikeButton = async (restaurant) => {
  await LikeButtonInitiator.init({
    likeButtonContainer: document.querySelector("#likeButtonContainer"),
    restaurant,
  });
};

// eslint-disable-next-line import/prefer-default-export
export { createLikeButton };
