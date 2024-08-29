import appDialogTemplate from "../templates/app-dialog-template";
import dialogStyles from "./app-dialog.css?inline";
import BaseElement from "./base-html-element";

export default class AppDialog extends BaseElement {
  constructor() {
    super(appDialogTemplate, dialogStyles);
  }

  render() {
    const section = this.root.querySelector("section");

    if (!section) {
      return;
    }

    section.innerHTML = `
      <dialog id="dialog">
        <h2>${this.getAttribute("dialogTitle") || "Type your name"}</h2>
        <form method="dialog">
          <input type="text" placeholder="Type your name" id="input-name" />
          <button id="submit" type="submit">Submit</button>
        </form>
      </dialog>
    `;
  }

  connectedCallback() {
    this.render();

    const dialog = this.root.querySelector("dialog");
    dialog.showModal();

    const button = this.root.querySelector("#submit");
    button.addEventListener("click", (event) => {
      event.preventDefault();

      const input = this.root.querySelector("#input-name");
      const name = input.value;

      if (name) {
        dialog.close();
        app.store.user = { name };
      } else {
        return;
      }
    });
  }
}

customElements.define("app-dialog", AppDialog);
