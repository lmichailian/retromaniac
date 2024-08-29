import appNavbarTemplate from "../templates/app-navbar-template.js";
import navbarStyles from "./app-navbar.css?inline.css";
import BaseElement from "./base-html-element.js";

export default class AppNavbar extends BaseElement {
  constructor() {
    super(appNavbarTemplate, navbarStyles);
  }

  render() {
    window.addEventListener("streams", (event) => {
      if (!app.store.user?.name) return;

      const connectedUsers = this.root.querySelector(".connected-users");

      connectedUsers.innerHTML = "";

      event.detail.forEach((stream) => {
        const avatar = document.createElement("div");
        avatar.classList.add("avatar");
        avatar.textContent =
          `${stream.user.name[0]}${stream.user.name?.[1]}`.toUpperCase();

        connectedUsers.appendChild(avatar);
      });
    });
  }

  connectedCallback() {
    window.addEventListener("streams", () => {
      this.render();
    });
  }
}

customElements.define("app-navbar", AppNavbar);
