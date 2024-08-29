export default class BaseElement extends HTMLElement {
  constructor(templateElement, css) {
    super();

    this.root = this.attachShadow({ mode: "open" });

    const templateContainer = document.createElement("div");
    templateContainer.innerHTML = templateElement;

    const template = templateContainer.querySelector("template");

    const content = template.content.cloneNode(true);
    this.root.appendChild(content);

    if (css) {
      const style = document.createElement("style");
      style.textContent = css;
      this.root.appendChild(style);
    }
  }
}
