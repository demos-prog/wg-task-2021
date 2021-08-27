"use strict";

module.exports = function Templater() {
  return new (class {
    constructor() {
      this.result = null;
    }

    insertElem(elem, arg) {
      for (const it of arg) {
        if (typeof it === "string" || typeof it === "number") {
          elem.innerHTML = it;
        } else {
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
    }

    setAttribute(elem, value, arg) {
      if (typeof value === "string" || typeof value === "number") {
        elem.innerHTML = value;
        const lastArg = arg[arg.length - 1];
        if (lastArg) {
          if (Object.keys(lastArg).includes("id" || "class")) {
            for (const key of Object.keys(lastArg).sort()) {
              elem.setAttribute(key, lastArg[key]);
            }
          } else {
            elem.appendChild(value);
          }
        }
        this.insertElem(elem, arg);
      } else {
        if (Object.keys(value).includes("id" || "class")) {
          for (const key of Object.keys(value).sort()) {
            elem.setAttribute(key, value[key]);
          }
        } else {
          elem.appendChild(value);
        }
        this.insertElem(elem, arg);
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

