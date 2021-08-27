"use strict";

function Templater() {
  return new (class {
    insertElem(elem, ...arg) {
      for (const it of arg) {
        switch (it.tagName) {
          case "DIV":
            elem.appendChild(this.div(it.innerHTML));
            break;
          case "SPAN":
            elem.appendChild(this.span(it.innerHTML));
            break;
          case "P":
            elem.appendChild(this.p(it.innerHTML));
            break;
          default:
            break;
        }
      }
      return elem;
    }

    buildElem(elem, [...args]) {
      for (const it of args) {
        elem = this.insertElem(elem, it);
        if (Object.keys(it).includes("id" || "class")) {
          for (const key of Object.keys(it).sort()) {
            elem.setAttribute(key, it[key]);
          }
        }
        if (typeof it === "Node") {
          elem.appendChild(it);
        }
        if (typeof it === "string" || typeof it === "number") {
          elem.innerHTML += it;
        }
      }
      return elem;
    }

    div(...args) {
      let div = document.createElement("div");
      return this.buildElem(div, args);
    }

    span(...args) {
      let span = document.createElement("span");
      return this.buildElem(span, args);
    }

    p(...args) {
      let p = document.createElement("p");
      return this.buildElem(p, args);
    }

    br(...args) {
      let br = document.createElement("br");
      if (args) {
        return "Uncaught Error: Nested content is not allowed";
      }
      return br;
    }

    toString() {
      console.log("method:");
      return this;
    }
  })();
}

// const template = Templater().p(
//   Templater().div("Hello", { id: 555555 }),
//   "ffffffffffff",
//   Templater().p("World", { id: 222222222 }),
//   { id: 123 }
// );
// console.log(template.outerHTML);

const ff = Templater();
console.log(
  ff.div(
    Templater().div("Hello", { id: 555555 }),
    "ffffffffffff",
    Templater().p("World", { id: 222222222 }),
    { id: 123 }
  ).outerHTML
); 
