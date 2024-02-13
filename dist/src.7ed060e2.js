// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../src/state.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createState = createState;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// Define a reactive state
function createState(initialState) {
  var state = initialState;
  var listeners = new Set();
  function getState() {
    return state;
  }
  function setState(newState) {
    state = _objectSpread(_objectSpread({}, state), newState);
    // Notify all listeners
    listeners.forEach(function (listener) {
      return listener(state);
    });
    // render(document.getElementById('root'),App())
  }
  function subscribe(listener) {
    listeners.add(listener);
    // Return a function to unsubscribe
    return function () {
      listeners.delete(listener);
    };
  }
  return {
    getState: getState,
    setState: setState,
    subscribe: subscribe
  };
}
},{}],"../src/App.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.App = App;
exports.ListComponent = ListComponent;
exports.renderListItem = renderListItem;
var _state = require("./state.js");
// // app.js
// import { createState } from "../src/state.js";
// import { routes } from "../src/Route.js"; // Import routes
// import { render } from "../src/Upkaran.js";
// import {ListComponent} from "../src/Component/ListComponent.js";

// // Create reactive state
// const initialState = {
//     count: 0,
// };
// const state = createState(initialState);

// // Define components
// const Increment = () => {
//     state.setState({ count: state.getState().count + 1 });
//     console.log(state.getState().count);
// };

// const Decrement = () => {
//     state.setState({ count: state.getState().count - 1 });
//     console.log(state.getState().count);
// };

// export function App() {
//     return {
//         type: "div",
//         content: [
//             {
//                 type: 'button',
//                 onclick:`navigateTo('/contact)`,
//                 content : 'Contact'
//             },
//             {
//                 type: "p",
//                 id: "text",
//                 content: `Count: ${state.getState().count}`
//             },
//             {
//                 type: "button",
//                 content: "Increment",
//                 onclick: Increment
//             },
//             {
//                 type: "button",
//                 content: "Decrement",
//                 onclick: Decrement
//             },
//             ListComponent(state.getState().count)
//         ],
//     };
// }

// // Contact
// function Contact() {
//     return {
//         type: 'div',
//         content: 'Contact Page',
//     };
// }

// // Function to render based on route
// function renderRoute(route) {
//     const component = route.component();
//     render(document.getElementById('root'), component);
// }

// // Function to navigate to a specific route
// export function navigateTo(path) {
//     const route = routes.find(route => route.path === path);
//     if (route) {
//         window.history.pushState({}, '', path);
//         renderRoute(route);
//     } else {
//         console.error("Route not found:", path);
//     }
// }

// // Function to handle popstate event
// window.onpopstate = () => {
//     const path = window.location.pathname;
//     navigateTo(path);
// };

// // Initial render
// const initialPath = window.location.pathname;
// const initialRoute = routes.find(route => route.path === initialPath);
// if (initialRoute) {
//     renderRoute(initialRoute);
// } else {
//     console.error("Initial route not found:", initialPath);
// }

// app.js

// import {ListComponent} from "./Component/ListComponent.js";

// Create reactive state
var initialState = {
  count: 0
};
var state = (0, _state.createState)(initialState);

// Define components
var Increment = function Increment() {
  state.setState({
    count: state.getState().count + 1
  });
  console.log(state.getState().count);
};
var Decrement = function Decrement() {
  state.setState({
    count: state.getState().count - 1
  });
  console.log(state.getState().count);
};
function App() {
  return {
    type: "div",
    content: [{
      type: "p",
      id: "text",
      content: "Count: ".concat(state.getState().count)
    }, {
      type: "button",
      content: "Increment",
      onclick: Increment
    }, {
      type: "button",
      content: "Decrement",
      onclick: Decrement
    }, ListComponent(state.getState().count)]
  };
}

// Component/ListComponent.js
// ListComponent.js
// import { renderListItem  } from "./RenderCount.js";
// Define a component for rendering a list
function ListComponent(num) {
  // Function to render the list items
  var renderListItems = function renderListItems() {
    var comp = [];
    for (var i = 0; i < num; i++) {
      comp.push(renderListItem());
    }
    return comp;
  };
  return {
    type: 'ul',
    content: renderListItems() // Render the list items dynamically
  };
}

// RenderCount.js

// Define a component to render the count dynamically
function renderListItem() {
  return {
    type: 'li',
    content: 'HELO' // Function to dynamically render the count
  };
}
},{"./state.js":"../src/state.js"}],"../src/404.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NotFound = NotFound;
function NotFound() {
  return {
    type: 'div',
    content: '404 - Page Not Found'
  };
}
},{}],"../src/Route.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.About = About;
exports.Contact = Contact;
exports.handleRouteChange = handleRouteChange;
var _Upkaran = require("./Upkaran.js");
var _App = require("./App.js");
var _ = require("./404.js");
// router.js

var routes = {
  '/app': 'App',
  '/about': 'About',
  '/contact': 'Contact',
  '404': '404' // Default route for 404 errors
};
function handleRouteChange() {
  console.log('handleRouteChange working...');
  var path = window.location.pathname;
  var component = routes[path] || routes['404']; // Check if route exists, otherwise use 404 route
  renderComponent(component);
  // handleRouteChange();
}
function renderComponent(componentName) {
  // Import components dynamically based on component name
  import("../src/".concat(componentName, ".js")).then(function (module) {
    var Component = module.Component; // idk
    (0, _Upkaran.render)(document.getElementById('root'), Component());
    // handleRouteChange();
  }).catch(function (error) {
    console.error('Error loading component:', error);
    // If there's an error loading the component, render the NotFound component
    (0, _Upkaran.render)(document.getElementById('root'), (0, _.NotFound)());
    // handleRouteChange();
  });
}
window.onpopstate = handleRouteChange;

// About.js
function About() {
  return {
    type: 'div',
    content: 'About Page Content'
  };
}

// Contact.js
function Contact() {
  return {
    type: 'div',
    content: 'Contact Page Content'
  };
}
},{"./Upkaran.js":"../src/Upkaran.js","./App.js":"../src/App.js","./404.js":"../src/404.js"}],"../src/Upkaran.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.render = render;
var _state = require("../src/state.js");
var Route = _interopRequireWildcard(require("../src/Route.js"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// Upkaran.js
// import { App } from "./App.js";

// Render function with reactive state management
function render(rootElement, component) {
  // Check if component is an array, if not, convert it into an array with a single element
  var components = Array.isArray(component) ? component : [component];

  // Function to update the DOM
  function update() {
    rootElement.innerHTML = ''; // Clear previous content
    components.forEach(function (component) {
      // Create new DOM element
      var newElement = document.createElement(component.type);

      // Set attributes
      if (component.attr) {
        for (var attr in component.attr) {
          newElement.setAttribute(attr, component.attr[attr]);
        }
      }

      // Set content
      if (component.content) {
        if (typeof component.content === 'string') {
          newElement.textContent = component.content;
        } else if (typeof component.content === 'function') {
          // Pass state to content function and render its result
          render(newElement, component.content());
        } else {
          // Render nested components
          render(newElement, component.content);
        }
      }

      // Set other properties
      if (component.onClick && typeof component.onClick === 'function' || component.onclick && typeof component.onclick === 'function') {
        if (component.onClick) {
          newElement.addEventListener('click', component.onClick);
        } else {
          newElement.addEventListener('click', component.onclick);
        }
      }

      //Set className and id attributes
      if (component.className && typeof component.className === 'string') {
        newElement.className = component.className;
      }
      if (component.id && typeof component.id === 'string') {
        newElement.id = component.id;
      }

      // Append new element to root element
      rootElement.appendChild(newElement);
    });
  }

  // Initial render
  update();

  // Subscribe to state changes and re-render
  if (component.state) {
    component.state.subscribe(update);
  }
}
},{"../src/state.js":"../src/state.js","../src/Route.js":"../src/Route.js"}],"../src/index.js":[function(require,module,exports) {
"use strict";

var _Upkaran = require("./Upkaran.js");
var _App = require("./App.js");
var _Route = require("./Route.js");
// index.js

// Import the route handling function

// Get the root element
var rootElement = document.getElementById('root');

// Initial rendering
(0, _Upkaran.render)(rootElement, (0, _App.App)());

// Listen for route changes
// window.addEventListener('popstate', handleRouteChange);

//Repeat Render
function RepeatRender() {
  (0, _Upkaran.render)(rootElement, (0, _App.App)());
  // handleRouteChange();
}

//Repeat it
setInterval(RepeatRender, 300);
},{"./Upkaran.js":"../src/Upkaran.js","./App.js":"../src/App.js","./Route.js":"../src/Route.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62330" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","../src/index.js"], null)
//# sourceMappingURL=/src.7ed060e2.js.map