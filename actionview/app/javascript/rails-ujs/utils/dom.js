const m = Element.prototype.matches ||
    Element.prototype.matchesSelector ||
    Element.prototype.mozMatchesSelector ||
    Element.prototype.msMatchesSelector ||
    Element.prototype.oMatchesSelector ||
    Element.prototype.webkitMatchesSelector

// Checks if the given native dom element matches the selector
// element::
//   native DOM element
// selector::
//   CSS selector string or
//   a JavaScript object with `selector` and `exclude` properties
//   Examples: "form", { selector: "form", exclude: "form[data-remote='true']"}
Rails.matches = function(element, selector) {
  if (selector.exclude) {
    return m.call(element, selector.selector) && !m.call(element, selector.exclude)
  } else {
    return m.call(element, selector)
  }
}

// get and set data on a given element using "expando properties"
// See: https://developer.mozilla.org/en-US/docs/Glossary/Expando
const expando = "_ujsData"

Rails.getData = (element, key) => element[expando] ? element[expando][key] : undefined

Rails.setData = function(element, key, value) {
  if (!element[expando]) { element[expando] = {} }
  return element[expando][key] = value
}

// a wrapper for document.querySelectorAll
// returns an Array
Rails.$ = selector => Array.prototype.slice.call(document.querySelectorAll(selector))
