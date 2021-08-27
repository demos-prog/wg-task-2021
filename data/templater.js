"use strict";

module.exports = "use strict";

function Templater() {
  return new (class {
    constructor() {
      this.result = null;
    }

    insertElem(elem, arg) {
      for (const it of arg) {
        if (typeof it === "string" || typeof it === "number") {
          elem.innerHTML += it;
        }
        switch (it.tagName) {
          case "P":
            elem.appendChild(this.p(it.innerHTML));
            break;
          case "SPAN":
            elem.appendChild(this.span(it.innerHTML));
            break;
          case "BR":
            elem.appendChild(this.br(it.innerHTML));
            break;
          default:
            break;
        }
      }
    }

    setAttribute(elem, value, arg) {
      let data = [value, ...arg];
      for (const item of data) {
        if (Object.keys(item).includes("id" || "class")) {
          for (const key of Object.keys(item).sort()) {
            elem.setAttribute(key, item[key]);
          }
        }
      }

      if (typeof value === "string" || typeof value === "number") {
        this.insertElem(elem, data);
        elem.innerHTML = value;
      } else {
        this.insertElem(elem, data);
        if (typeof value === "Node") {
          elem.appendChild(value);
        }
      }
    }

    div(value, ...args) {
      let div = document.createElement("div");
      this.setAttribute(div, value, args);
      this.result = div;
      return this;
    }

    span(value, ...args) {
      let span = document.createElement("span");
      this.setAttribute(span, value, args);
      this.result = span;
      return span;
    }

    p(value, ...args) {
      let p = document.createElement("p");
      this.setAttribute(p, value, args);
      this.result = p;
      return p;
    }

    br(value) {
      let br = document.createElement("br");
      if (value) {
        return "Uncaught Error: Nested content is not allowed";
      }
      this.result = br;
      return br;
    }

    toString() {
      return this.result.outerHTML;
    }
  })();
}

const template = Templater().div(
  Templater().p("Hello"),
  "sdf",
  Templater().p("World"),
  {
    id: 45,
  }
);

