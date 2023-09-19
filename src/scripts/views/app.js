import DrawerInitiator from "../utils/drawer-initiator";
import UrlParser from "../routes/url-parser";
import routes from "../routes/routes";

class App {
  constructor({ button, drawer, content }) {
    this._button = button;
    this._drawer = drawer;
    this._content = content;

    this._initialAppShell();
  }

  _initialAppShell() {
    DrawerInitiator.init({
      button: this._button,
      drawer: this._drawer,
      content: this._content,
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    this._content.innerHTML = await page.render();
    await page.afterRender();

    // Debug Skip Content Issue
    const exploreRestaurant = document.querySelector("#explore-restaurant");
    const mainContent = document.querySelector("#main-content");
    const skipLink = document.querySelector(".skip-link");
    skipLink.addEventListener("click", (e) => {
      e.preventDefault();
      if (exploreRestaurant) {
        exploreRestaurant.scrollIntoView({ behavior: "smooth" });
      } else {
        mainContent.scrollIntoView({ behavior: "smooth" });
      }
      skipLink.blur();
    });
  }
}

export default App;
