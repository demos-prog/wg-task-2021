"use strict";

module.exports = function Templater() {
  return new (class {
    constructor() {
      this.result = null;
    }

    insertElem(elem, ...arg) {
      for (const it of arg) {
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

    buildElem(elem, [...args]) {
      for (const it of args) {
        if (Object.keys(it).includes("id" || "class")) {
          for (const key of Object.keys(it).sort()) {
            elem.setAttribute(key, it[key]);
          }
        }

        this.insertElem(elem, it);
        if (typeof it === "Node") {
          elem.appendChild(it);
        }
        if (typeof it === "string" || typeof it === "number") {
          elem.innerHTML = it;
        }
      }
    }

    div(...args) {
      let div = document.createElement("div");
      this.buildElem(div, args);
      this.result = div;
      return this;
    }

    span(...args) {
      let span = document.createElement("span");
      this.buildElem(span, args);
      this.result = span;
      return span;
    }

    p(...args) {
      let p = document.createElement("p");
      this.buildElem(p, args);
      this.result = p;
      return p;
    }

    br(...args) {
      let br = document.createElement("br");
      if (args) {
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
