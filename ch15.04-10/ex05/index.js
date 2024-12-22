customElements.define(
  "inline-circle",
  class InlineCircle extends HTMLElement {
    connectedCallback() {
      this.style.display = "inline-block";
      this.style.borderRadius = "50%";
      this.style.borderStyle = "solid";
      this.style.borderWidth = "1px";
      this.style.transform = "translateY(10%)";

      if (!this.style.width) {
        this.style.width = "0.8em";
        this.style.height = "0.8em";
      }
      if (!this.style.borderColor) {
        this.style.borderColor = "black";
      }
    }

    static get observedAttributes() {
      return ["diameter", "color", "borderc"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
      switch (name) {
        case "diameter":
          this.style.width = newValue;
          this.style.height = newValue;
          break;
        case "color":
          this.style.backgroundColor = newValue;
          break;
        case "borderc":
          this.style.borderColor = newValue;
      }
    }

    get diameter() {
      return this.getAttribute("diameter");
    }
    set diameter(diameter) {
      this.setAttribute("diameter", diameter);
    }
    get color() {
      return this.getAttribute("color");
    }
    set color(color) {
      this.setAttribute("color", color);
    }
    get borderc() {
      return this.getAttribute("borderc");
    }
    set borderc(borderc) {
      this.setAttribute("borderc", borderc);
    }
  }
);
