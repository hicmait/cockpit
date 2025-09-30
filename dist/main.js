import { jsx as N, jsxs as ye } from "react/jsx-runtime";
import * as A from "react";
import je from "react";
function ut(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var U = { exports: {} }, ne = {};
/**
 * @license React
 * use-sync-external-store-with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ee;
function ct() {
  if (Ee) return ne;
  Ee = 1;
  var e = je;
  function t(u, l) {
    return u === l && (u !== 0 || 1 / u === 1 / l) || u !== u && l !== l;
  }
  var r = typeof Object.is == "function" ? Object.is : t, n = e.useSyncExternalStore, o = e.useRef, i = e.useEffect, a = e.useMemo, s = e.useDebugValue;
  return ne.useSyncExternalStoreWithSelector = function(u, l, c, d, f) {
    var p = o(null);
    if (p.current === null) {
      var m = { hasValue: !1, value: null };
      p.current = m;
    } else m = p.current;
    p = a(
      function() {
        function h(g) {
          if (!b) {
            if (b = !0, E = g, g = d(g), f !== void 0 && m.hasValue) {
              var C = m.value;
              if (f(C, g))
                return _ = C;
            }
            return _ = g;
          }
          if (C = _, r(E, g)) return C;
          var S = d(g);
          return f !== void 0 && f(C, S) ? (E = g, C) : (E = g, _ = S);
        }
        var b = !1, E, _, v = c === void 0 ? null : c;
        return [
          function() {
            return h(l());
          },
          v === null ? void 0 : function() {
            return h(v());
          }
        ];
      },
      [l, c, d, f]
    );
    var y = n(u, p[0], p[1]);
    return i(
      function() {
        m.hasValue = !0, m.value = y;
      },
      [y]
    ), s(y), y;
  }, ne;
}
var oe = {};
/**
 * @license React
 * use-sync-external-store-with-selector.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ce;
function lt() {
  return Ce || (Ce = 1, process.env.NODE_ENV !== "production" && (function() {
    function e(u, l) {
      return u === l && (u !== 0 || 1 / u === 1 / l) || u !== u && l !== l;
    }
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var t = je, r = typeof Object.is == "function" ? Object.is : e, n = t.useSyncExternalStore, o = t.useRef, i = t.useEffect, a = t.useMemo, s = t.useDebugValue;
    oe.useSyncExternalStoreWithSelector = function(u, l, c, d, f) {
      var p = o(null);
      if (p.current === null) {
        var m = { hasValue: !1, value: null };
        p.current = m;
      } else m = p.current;
      p = a(
        function() {
          function h(g) {
            if (!b) {
              if (b = !0, E = g, g = d(g), f !== void 0 && m.hasValue) {
                var C = m.value;
                if (f(C, g))
                  return _ = C;
              }
              return _ = g;
            }
            if (C = _, r(E, g))
              return C;
            var S = d(g);
            return f !== void 0 && f(C, S) ? (E = g, C) : (E = g, _ = S);
          }
          var b = !1, E, _, v = c === void 0 ? null : c;
          return [
            function() {
              return h(l());
            },
            v === null ? void 0 : function() {
              return h(v());
            }
          ];
        },
        [l, c, d, f]
      );
      var y = n(u, p[0], p[1]);
      return i(
        function() {
          m.hasValue = !0, m.value = y;
        },
        [y]
      ), s(y), y;
    }, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  })()), oe;
}
var Ne;
function dt() {
  return Ne || (Ne = 1, process.env.NODE_ENV === "production" ? U.exports = ct() : U.exports = lt()), U.exports;
}
dt();
function ft(e) {
  e();
}
function pt() {
  let e = null, t = null;
  return {
    clear() {
      e = null, t = null;
    },
    notify() {
      ft(() => {
        let r = e;
        for (; r; )
          r.callback(), r = r.next;
      });
    },
    get() {
      const r = [];
      let n = e;
      for (; n; )
        r.push(n), n = n.next;
      return r;
    },
    subscribe(r) {
      let n = !0;
      const o = t = {
        callback: r,
        next: null,
        prev: t
      };
      return o.prev ? o.prev.next = o : e = o, function() {
        !n || e === null || (n = !1, o.next ? o.next.prev = o.prev : t = o.prev, o.prev ? o.prev.next = o.next : e = o.next);
      };
    }
  };
}
var Oe = {
  notify() {
  },
  get: () => []
};
function ht(e, t) {
  let r, n = Oe, o = 0, i = !1;
  function a(y) {
    c();
    const h = n.subscribe(y);
    let b = !1;
    return () => {
      b || (b = !0, h(), d());
    };
  }
  function s() {
    n.notify();
  }
  function u() {
    m.onStateChange && m.onStateChange();
  }
  function l() {
    return i;
  }
  function c() {
    o++, r || (r = e.subscribe(u), n = pt());
  }
  function d() {
    o--, r && o === 0 && (r(), r = void 0, n.clear(), n = Oe);
  }
  function f() {
    i || (i = !0, c());
  }
  function p() {
    i && (i = !1, d());
  }
  const m = {
    addNestedSub: a,
    notifyNestedSubs: s,
    handleChangeWrapper: u,
    isSubscribed: l,
    trySubscribe: f,
    tryUnsubscribe: p,
    getListeners: () => n
  };
  return m;
}
var mt = () => typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", _t = /* @__PURE__ */ mt(), gt = () => typeof navigator < "u" && navigator.product === "ReactNative", yt = /* @__PURE__ */ gt(), vt = () => _t || yt ? A.useLayoutEffect : A.useEffect, bt = /* @__PURE__ */ vt(), wt = /* @__PURE__ */ Symbol.for("react-redux-context"), Et = typeof globalThis < "u" ? globalThis : (
  /* fall back to a per-module scope (pre-8.1 behaviour) if `globalThis` is not available */
  {}
);
function Ct() {
  if (!A.createContext) return {};
  const e = Et[wt] ??= /* @__PURE__ */ new Map();
  let t = e.get(A.createContext);
  return t || (t = A.createContext(
    null
  ), process.env.NODE_ENV !== "production" && (t.displayName = "ReactRedux"), e.set(A.createContext, t)), t;
}
var Nt = /* @__PURE__ */ Ct();
function Ot(e) {
  const { children: t, context: r, serverState: n, store: o } = e, i = A.useMemo(() => {
    const u = ht(o), l = {
      store: o,
      subscription: u,
      getServerState: n ? () => n : void 0
    };
    if (process.env.NODE_ENV === "production")
      return l;
    {
      const { identityFunctionCheck: c = "once", stabilityCheck: d = "once" } = e;
      return /* @__PURE__ */ Object.assign(l, {
        stabilityCheck: d,
        identityFunctionCheck: c
      });
    }
  }, [o, n]), a = A.useMemo(() => o.getState(), [o]);
  bt(() => {
    const { subscription: u } = i;
    return u.onStateChange = u.notifyNestedSubs, u.trySubscribe(), a !== o.getState() && u.notifyNestedSubs(), () => {
      u.tryUnsubscribe(), u.onStateChange = void 0;
    };
  }, [i, a]);
  const s = r || Nt;
  return /* @__PURE__ */ A.createElement(s.Provider, { value: i }, t);
}
var St = Ot;
function O(e) {
  return `Minified Redux error #${e}; visit https://redux.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
var Dt = typeof Symbol == "function" && Symbol.observable || "@@observable", Se = Dt, ie = () => Math.random().toString(36).substring(7).split("").join("."), Tt = {
  INIT: `@@redux/INIT${/* @__PURE__ */ ie()}`,
  REPLACE: `@@redux/REPLACE${/* @__PURE__ */ ie()}`,
  PROBE_UNKNOWN_ACTION: () => `@@redux/PROBE_UNKNOWN_ACTION${ie()}`
}, I = Tt;
function $(e) {
  if (typeof e != "object" || e === null)
    return !1;
  let t = e;
  for (; Object.getPrototypeOf(t) !== null; )
    t = Object.getPrototypeOf(t);
  return Object.getPrototypeOf(e) === t || Object.getPrototypeOf(e) === null;
}
function kt(e) {
  if (e === void 0)
    return "undefined";
  if (e === null)
    return "null";
  const t = typeof e;
  switch (t) {
    case "boolean":
    case "string":
    case "number":
    case "symbol":
    case "function":
      return t;
  }
  if (Array.isArray(e))
    return "array";
  if (Mt(e))
    return "date";
  if (Lt(e))
    return "error";
  const r = At(e);
  switch (r) {
    case "Symbol":
    case "Promise":
    case "WeakMap":
    case "WeakSet":
    case "Map":
    case "Set":
      return r;
  }
  return Object.prototype.toString.call(e).slice(8, -1).toLowerCase().replace(/\s/g, "");
}
function At(e) {
  return typeof e.constructor == "function" ? e.constructor.name : null;
}
function Lt(e) {
  return e instanceof Error || typeof e.message == "string" && e.constructor && typeof e.constructor.stackTraceLimit == "number";
}
function Mt(e) {
  return e instanceof Date ? !0 : typeof e.toDateString == "function" && typeof e.getDate == "function" && typeof e.setDate == "function";
}
function M(e) {
  let t = typeof e;
  return process.env.NODE_ENV !== "production" && (t = kt(e)), t;
}
function Pe(e, t, r) {
  if (typeof e != "function")
    throw new Error(process.env.NODE_ENV === "production" ? O(2) : `Expected the root reducer to be a function. Instead, received: '${M(e)}'`);
  if (typeof t == "function" && typeof r == "function" || typeof r == "function" && typeof arguments[3] == "function")
    throw new Error(process.env.NODE_ENV === "production" ? O(0) : "It looks like you are passing several store enhancers to createStore(). This is not supported. Instead, compose them together to a single function. See https://redux.js.org/tutorials/fundamentals/part-4-store#creating-a-store-with-enhancers for an example.");
  if (typeof t == "function" && typeof r > "u" && (r = t, t = void 0), typeof r < "u") {
    if (typeof r != "function")
      throw new Error(process.env.NODE_ENV === "production" ? O(1) : `Expected the enhancer to be a function. Instead, received: '${M(r)}'`);
    return r(Pe)(e, t);
  }
  let n = e, o = t, i = /* @__PURE__ */ new Map(), a = i, s = 0, u = !1;
  function l() {
    a === i && (a = /* @__PURE__ */ new Map(), i.forEach((h, b) => {
      a.set(b, h);
    }));
  }
  function c() {
    if (u)
      throw new Error(process.env.NODE_ENV === "production" ? O(3) : "You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store.");
    return o;
  }
  function d(h) {
    if (typeof h != "function")
      throw new Error(process.env.NODE_ENV === "production" ? O(4) : `Expected the listener to be a function. Instead, received: '${M(h)}'`);
    if (u)
      throw new Error(process.env.NODE_ENV === "production" ? O(5) : "You may not call store.subscribe() while the reducer is executing. If you would like to be notified after the store has been updated, subscribe from a component and invoke store.getState() in the callback to access the latest state. See https://redux.js.org/api/store#subscribelistener for more details.");
    let b = !0;
    l();
    const E = s++;
    return a.set(E, h), function() {
      if (b) {
        if (u)
          throw new Error(process.env.NODE_ENV === "production" ? O(6) : "You may not unsubscribe from a store listener while the reducer is executing. See https://redux.js.org/api/store#subscribelistener for more details.");
        b = !1, l(), a.delete(E), i = null;
      }
    };
  }
  function f(h) {
    if (!$(h))
      throw new Error(process.env.NODE_ENV === "production" ? O(7) : `Actions must be plain objects. Instead, the actual type was: '${M(h)}'. You may need to add middleware to your store setup to handle dispatching other values, such as 'redux-thunk' to handle dispatching functions. See https://redux.js.org/tutorials/fundamentals/part-4-store#middleware and https://redux.js.org/tutorials/fundamentals/part-6-async-logic#using-the-redux-thunk-middleware for examples.`);
    if (typeof h.type > "u")
      throw new Error(process.env.NODE_ENV === "production" ? O(8) : 'Actions may not have an undefined "type" property. You may have misspelled an action type string constant.');
    if (typeof h.type != "string")
      throw new Error(process.env.NODE_ENV === "production" ? O(17) : `Action "type" property must be a string. Instead, the actual type was: '${M(h.type)}'. Value was: '${h.type}' (stringified)`);
    if (u)
      throw new Error(process.env.NODE_ENV === "production" ? O(9) : "Reducers may not dispatch actions.");
    try {
      u = !0, o = n(o, h);
    } finally {
      u = !1;
    }
    return (i = a).forEach((E) => {
      E();
    }), h;
  }
  function p(h) {
    if (typeof h != "function")
      throw new Error(process.env.NODE_ENV === "production" ? O(10) : `Expected the nextReducer to be a function. Instead, received: '${M(h)}`);
    n = h, f({
      type: I.REPLACE
    });
  }
  function m() {
    const h = d;
    return {
      /**
       * The minimal observable subscription method.
       * @param observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe(b) {
        if (typeof b != "object" || b === null)
          throw new Error(process.env.NODE_ENV === "production" ? O(11) : `Expected the observer to be an object. Instead, received: '${M(b)}'`);
        function E() {
          const v = b;
          v.next && v.next(c());
        }
        return E(), {
          unsubscribe: h(E)
        };
      },
      [Se]() {
        return this;
      }
    };
  }
  return f({
    type: I.INIT
  }), {
    dispatch: f,
    subscribe: d,
    getState: c,
    replaceReducer: p,
    [Se]: m
  };
}
function De(e) {
  typeof console < "u" && typeof console.error == "function" && console.error(e);
  try {
    throw new Error(e);
  } catch {
  }
}
function xt(e, t, r, n) {
  const o = Object.keys(t), i = r && r.type === I.INIT ? "preloadedState argument passed to createStore" : "previous state received by the reducer";
  if (o.length === 0)
    return "Store does not have a valid reducer. Make sure the argument passed to combineReducers is an object whose values are reducers.";
  if (!$(e))
    return `The ${i} has unexpected type of "${M(e)}". Expected argument to be an object with the following keys: "${o.join('", "')}"`;
  const a = Object.keys(e).filter((s) => !t.hasOwnProperty(s) && !n[s]);
  if (a.forEach((s) => {
    n[s] = !0;
  }), !(r && r.type === I.REPLACE) && a.length > 0)
    return `Unexpected ${a.length > 1 ? "keys" : "key"} "${a.join('", "')}" found in ${i}. Expected to find one of the known reducer keys instead: "${o.join('", "')}". Unexpected keys will be ignored.`;
}
function It(e) {
  Object.keys(e).forEach((t) => {
    const r = e[t];
    if (typeof r(void 0, {
      type: I.INIT
    }) > "u")
      throw new Error(process.env.NODE_ENV === "production" ? O(12) : `The slice reducer for key "${t}" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined.`);
    if (typeof r(void 0, {
      type: I.PROBE_UNKNOWN_ACTION()
    }) > "u")
      throw new Error(process.env.NODE_ENV === "production" ? O(13) : `The slice reducer for key "${t}" returned undefined when probed with a random type. Don't try to handle '${I.INIT}' or other actions in "redux/*" namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined, but can be null.`);
  });
}
function ze(e) {
  const t = Object.keys(e), r = {};
  for (let a = 0; a < t.length; a++) {
    const s = t[a];
    process.env.NODE_ENV !== "production" && typeof e[s] > "u" && De(`No reducer provided for key "${s}"`), typeof e[s] == "function" && (r[s] = e[s]);
  }
  const n = Object.keys(r);
  let o;
  process.env.NODE_ENV !== "production" && (o = {});
  let i;
  try {
    It(r);
  } catch (a) {
    i = a;
  }
  return function(s = {}, u) {
    if (i)
      throw i;
    if (process.env.NODE_ENV !== "production") {
      const d = xt(s, r, u, o);
      d && De(d);
    }
    let l = !1;
    const c = {};
    for (let d = 0; d < n.length; d++) {
      const f = n[d], p = r[f], m = s[f], y = p(m, u);
      if (typeof y > "u") {
        const h = u && u.type;
        throw new Error(process.env.NODE_ENV === "production" ? O(14) : `When called with an action of type ${h ? `"${String(h)}"` : "(unknown type)"}, the slice reducer for key "${f}" returned undefined. To ignore an action, you must explicitly return the previous state. If you want this reducer to hold no value, you can return null instead of undefined.`);
      }
      c[f] = y, l = l || y !== m;
    }
    return l = l || n.length !== Object.keys(s).length, l ? c : s;
  };
}
function Z(...e) {
  return e.length === 0 ? (t) => t : e.length === 1 ? e[0] : e.reduce((t, r) => (...n) => t(r(...n)));
}
function Vt(...e) {
  return (t) => (r, n) => {
    const o = t(r, n);
    let i = () => {
      throw new Error(process.env.NODE_ENV === "production" ? O(15) : "Dispatching while constructing your middleware is not allowed. Other middleware would not be applied to this dispatch.");
    };
    const a = {
      getState: o.getState,
      dispatch: (u, ...l) => i(u, ...l)
    }, s = e.map((u) => u(a));
    return i = Z(...s)(o.dispatch), {
      ...o,
      dispatch: i
    };
  };
}
function Fe(e) {
  return $(e) && "type" in e && typeof e.type == "string";
}
var $e = Symbol.for("immer-nothing"), Te = Symbol.for("immer-draftable"), k = Symbol.for("immer-state"), Rt = process.env.NODE_ENV !== "production" ? [
  // All error codes, starting by 0:
  function(e) {
    return `The plugin for '${e}' has not been loaded into Immer. To enable the plugin, import and call \`enable${e}()\` when initializing your application.`;
  },
  function(e) {
    return `produce can only be called on things that are draftable: plain objects, arrays, Map, Set or classes that are marked with '[immerable]: true'. Got '${e}'`;
  },
  "This object has been frozen and should not be mutated",
  function(e) {
    return "Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? " + e;
  },
  "An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.",
  "Immer forbids circular references",
  "The first or second argument to `produce` must be a function",
  "The third argument to `produce` must be a function or undefined",
  "First argument to `createDraft` must be a plain object, an array, or an immerable object",
  "First argument to `finishDraft` must be a draft returned by `createDraft`",
  function(e) {
    return `'current' expects a draft, got: ${e}`;
  },
  "Object.defineProperty() cannot be used on an Immer draft",
  "Object.setPrototypeOf() cannot be used on an Immer draft",
  "Immer only supports deleting array indices",
  "Immer only supports setting array indices and the 'length' property",
  function(e) {
    return `'original' expects a draft, got: ${e}`;
  }
  // Note: if more errors are added, the errorOffset in Patches.ts should be increased
  // See Patches.ts for additional errors
] : [];
function T(e, ...t) {
  if (process.env.NODE_ENV !== "production") {
    const r = Rt[e], n = typeof r == "function" ? r.apply(null, t) : r;
    throw new Error(`[Immer] ${n}`);
  }
  throw new Error(
    `[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`
  );
}
var j = Object.getPrototypeOf;
function V(e) {
  return !!e && !!e[k];
}
function L(e) {
  return e ? Be(e) || Array.isArray(e) || !!e[Te] || !!e.constructor?.[Te] || B(e) || te(e) : !1;
}
var jt = Object.prototype.constructor.toString();
function Be(e) {
  if (!e || typeof e != "object")
    return !1;
  const t = j(e);
  if (t === null)
    return !0;
  const r = Object.hasOwnProperty.call(t, "constructor") && t.constructor;
  return r === Object ? !0 : typeof r == "function" && Function.toString.call(r) === jt;
}
function J(e, t) {
  ee(e) === 0 ? Reflect.ownKeys(e).forEach((r) => {
    t(r, e[r], e);
  }) : e.forEach((r, n) => t(n, r, e));
}
function ee(e) {
  const t = e[k];
  return t ? t.type_ : Array.isArray(e) ? 1 : B(e) ? 2 : te(e) ? 3 : 0;
}
function de(e, t) {
  return ee(e) === 2 ? e.has(t) : Object.prototype.hasOwnProperty.call(e, t);
}
function Ue(e, t, r) {
  const n = ee(e);
  n === 2 ? e.set(t, r) : n === 3 ? e.add(r) : e[t] = r;
}
function Pt(e, t) {
  return e === t ? e !== 0 || 1 / e === 1 / t : e !== e && t !== t;
}
function B(e) {
  return e instanceof Map;
}
function te(e) {
  return e instanceof Set;
}
function x(e) {
  return e.copy_ || e.base_;
}
function fe(e, t) {
  if (B(e))
    return new Map(e);
  if (te(e))
    return new Set(e);
  if (Array.isArray(e))
    return Array.prototype.slice.call(e);
  const r = Be(e);
  if (t === !0 || t === "class_only" && !r) {
    const n = Object.getOwnPropertyDescriptors(e);
    delete n[k];
    let o = Reflect.ownKeys(n);
    for (let i = 0; i < o.length; i++) {
      const a = o[i], s = n[a];
      s.writable === !1 && (s.writable = !0, s.configurable = !0), (s.get || s.set) && (n[a] = {
        configurable: !0,
        writable: !0,
        // could live with !!desc.set as well here...
        enumerable: s.enumerable,
        value: e[a]
      });
    }
    return Object.create(j(e), n);
  } else {
    const n = j(e);
    if (n !== null && r)
      return { ...e };
    const o = Object.create(n);
    return Object.assign(o, e);
  }
}
function ve(e, t = !1) {
  return re(e) || V(e) || !L(e) || (ee(e) > 1 && Object.defineProperties(e, {
    set: { value: q },
    add: { value: q },
    clear: { value: q },
    delete: { value: q }
  }), Object.freeze(e), t && Object.values(e).forEach((r) => ve(r, !0))), e;
}
function q() {
  T(2);
}
function re(e) {
  return Object.isFrozen(e);
}
var zt = {};
function R(e) {
  const t = zt[e];
  return t || T(0, e), t;
}
var z;
function qe() {
  return z;
}
function Ft(e, t) {
  return {
    drafts_: [],
    parent_: e,
    immer_: t,
    // Whenever the modified draft contains a draft from another scope, we
    // need to prevent auto-freezing so the unowned draft can be finalized.
    canAutoFreeze_: !0,
    unfinalizedDrafts_: 0
  };
}
function ke(e, t) {
  t && (R("Patches"), e.patches_ = [], e.inversePatches_ = [], e.patchListener_ = t);
}
function pe(e) {
  he(e), e.drafts_.forEach($t), e.drafts_ = null;
}
function he(e) {
  e === z && (z = e.parent_);
}
function Ae(e) {
  return z = Ft(z, e);
}
function $t(e) {
  const t = e[k];
  t.type_ === 0 || t.type_ === 1 ? t.revoke_() : t.revoked_ = !0;
}
function Le(e, t) {
  t.unfinalizedDrafts_ = t.drafts_.length;
  const r = t.drafts_[0];
  return e !== void 0 && e !== r ? (r[k].modified_ && (pe(t), T(4)), L(e) && (e = X(t, e), t.parent_ || Q(t, e)), t.patches_ && R("Patches").generateReplacementPatches_(
    r[k].base_,
    e,
    t.patches_,
    t.inversePatches_
  )) : e = X(t, r, []), pe(t), t.patches_ && t.patchListener_(t.patches_, t.inversePatches_), e !== $e ? e : void 0;
}
function X(e, t, r) {
  if (re(t))
    return t;
  const n = t[k];
  if (!n)
    return J(
      t,
      (o, i) => Me(e, n, t, o, i, r)
    ), t;
  if (n.scope_ !== e)
    return t;
  if (!n.modified_)
    return Q(e, n.base_, !0), n.base_;
  if (!n.finalized_) {
    n.finalized_ = !0, n.scope_.unfinalizedDrafts_--;
    const o = n.copy_;
    let i = o, a = !1;
    n.type_ === 3 && (i = new Set(o), o.clear(), a = !0), J(
      i,
      (s, u) => Me(e, n, o, s, u, r, a)
    ), Q(e, o, !1), r && e.patches_ && R("Patches").generatePatches_(
      n,
      r,
      e.patches_,
      e.inversePatches_
    );
  }
  return n.copy_;
}
function Me(e, t, r, n, o, i, a) {
  if (process.env.NODE_ENV !== "production" && o === r && T(5), V(o)) {
    const s = i && t && t.type_ !== 3 && // Set objects are atomic since they have no keys.
    !de(t.assigned_, n) ? i.concat(n) : void 0, u = X(e, o, s);
    if (Ue(r, n, u), V(u))
      e.canAutoFreeze_ = !1;
    else
      return;
  } else a && r.add(o);
  if (L(o) && !re(o)) {
    if (!e.immer_.autoFreeze_ && e.unfinalizedDrafts_ < 1)
      return;
    X(e, o), (!t || !t.scope_.parent_) && typeof n != "symbol" && (B(r) ? r.has(n) : Object.prototype.propertyIsEnumerable.call(r, n)) && Q(e, o);
  }
}
function Q(e, t, r = !1) {
  !e.parent_ && e.immer_.autoFreeze_ && e.canAutoFreeze_ && ve(t, r);
}
function Bt(e, t) {
  const r = Array.isArray(e), n = {
    type_: r ? 1 : 0,
    // Track which produce call this is associated with.
    scope_: t ? t.scope_ : qe(),
    // True for both shallow and deep changes.
    modified_: !1,
    // Used during finalization.
    finalized_: !1,
    // Track which properties have been assigned (true) or deleted (false).
    assigned_: {},
    // The parent draft state.
    parent_: t,
    // The base state.
    base_: e,
    // The base proxy.
    draft_: null,
    // set below
    // The base copy with any updated values.
    copy_: null,
    // Called by the `produce` function.
    revoke_: null,
    isManual_: !1
  };
  let o = n, i = be;
  r && (o = [n], i = F);
  const { revoke: a, proxy: s } = Proxy.revocable(o, i);
  return n.draft_ = s, n.revoke_ = a, s;
}
var be = {
  get(e, t) {
    if (t === k)
      return e;
    const r = x(e);
    if (!de(r, t))
      return Ut(e, r, t);
    const n = r[t];
    return e.finalized_ || !L(n) ? n : n === ae(e.base_, t) ? (se(e), e.copy_[t] = _e(n, e)) : n;
  },
  has(e, t) {
    return t in x(e);
  },
  ownKeys(e) {
    return Reflect.ownKeys(x(e));
  },
  set(e, t, r) {
    const n = We(x(e), t);
    if (n?.set)
      return n.set.call(e.draft_, r), !0;
    if (!e.modified_) {
      const o = ae(x(e), t), i = o?.[k];
      if (i && i.base_ === r)
        return e.copy_[t] = r, e.assigned_[t] = !1, !0;
      if (Pt(r, o) && (r !== void 0 || de(e.base_, t)))
        return !0;
      se(e), me(e);
    }
    return e.copy_[t] === r && // special case: handle new props with value 'undefined'
    (r !== void 0 || t in e.copy_) || // special case: NaN
    Number.isNaN(r) && Number.isNaN(e.copy_[t]) || (e.copy_[t] = r, e.assigned_[t] = !0), !0;
  },
  deleteProperty(e, t) {
    return ae(e.base_, t) !== void 0 || t in e.base_ ? (e.assigned_[t] = !1, se(e), me(e)) : delete e.assigned_[t], e.copy_ && delete e.copy_[t], !0;
  },
  // Note: We never coerce `desc.value` into an Immer draft, because we can't make
  // the same guarantee in ES5 mode.
  getOwnPropertyDescriptor(e, t) {
    const r = x(e), n = Reflect.getOwnPropertyDescriptor(r, t);
    return n && {
      writable: !0,
      configurable: e.type_ !== 1 || t !== "length",
      enumerable: n.enumerable,
      value: r[t]
    };
  },
  defineProperty() {
    T(11);
  },
  getPrototypeOf(e) {
    return j(e.base_);
  },
  setPrototypeOf() {
    T(12);
  }
}, F = {};
J(be, (e, t) => {
  F[e] = function() {
    return arguments[0] = arguments[0][0], t.apply(this, arguments);
  };
});
F.deleteProperty = function(e, t) {
  return process.env.NODE_ENV !== "production" && isNaN(parseInt(t)) && T(13), F.set.call(this, e, t, void 0);
};
F.set = function(e, t, r) {
  return process.env.NODE_ENV !== "production" && t !== "length" && isNaN(parseInt(t)) && T(14), be.set.call(this, e[0], t, r, e[0]);
};
function ae(e, t) {
  const r = e[k];
  return (r ? x(r) : e)[t];
}
function Ut(e, t, r) {
  const n = We(t, r);
  return n ? "value" in n ? n.value : (
    // This is a very special case, if the prop is a getter defined by the
    // prototype, we should invoke it with the draft as context!
    n.get?.call(e.draft_)
  ) : void 0;
}
function We(e, t) {
  if (!(t in e))
    return;
  let r = j(e);
  for (; r; ) {
    const n = Object.getOwnPropertyDescriptor(r, t);
    if (n)
      return n;
    r = j(r);
  }
}
function me(e) {
  e.modified_ || (e.modified_ = !0, e.parent_ && me(e.parent_));
}
function se(e) {
  e.copy_ || (e.copy_ = fe(
    e.base_,
    e.scope_.immer_.useStrictShallowCopy_
  ));
}
var qt = class {
  constructor(e) {
    this.autoFreeze_ = !0, this.useStrictShallowCopy_ = !1, this.produce = (t, r, n) => {
      if (typeof t == "function" && typeof r != "function") {
        const i = r;
        r = t;
        const a = this;
        return function(u = i, ...l) {
          return a.produce(u, (c) => r.call(this, c, ...l));
        };
      }
      typeof r != "function" && T(6), n !== void 0 && typeof n != "function" && T(7);
      let o;
      if (L(t)) {
        const i = Ae(this), a = _e(t, void 0);
        let s = !0;
        try {
          o = r(a), s = !1;
        } finally {
          s ? pe(i) : he(i);
        }
        return ke(i, n), Le(o, i);
      } else if (!t || typeof t != "object") {
        if (o = r(t), o === void 0 && (o = t), o === $e && (o = void 0), this.autoFreeze_ && ve(o, !0), n) {
          const i = [], a = [];
          R("Patches").generateReplacementPatches_(t, o, i, a), n(i, a);
        }
        return o;
      } else
        T(1, t);
    }, this.produceWithPatches = (t, r) => {
      if (typeof t == "function")
        return (a, ...s) => this.produceWithPatches(a, (u) => t(u, ...s));
      let n, o;
      return [this.produce(t, r, (a, s) => {
        n = a, o = s;
      }), n, o];
    }, typeof e?.autoFreeze == "boolean" && this.setAutoFreeze(e.autoFreeze), typeof e?.useStrictShallowCopy == "boolean" && this.setUseStrictShallowCopy(e.useStrictShallowCopy);
  }
  createDraft(e) {
    L(e) || T(8), V(e) && (e = Wt(e));
    const t = Ae(this), r = _e(e, void 0);
    return r[k].isManual_ = !0, he(t), r;
  }
  finishDraft(e, t) {
    const r = e && e[k];
    (!r || !r.isManual_) && T(9);
    const { scope_: n } = r;
    return ke(n, t), Le(void 0, n);
  }
  /**
   * Pass true to automatically freeze all copies created by Immer.
   *
   * By default, auto-freezing is enabled.
   */
  setAutoFreeze(e) {
    this.autoFreeze_ = e;
  }
  /**
   * Pass true to enable strict shallow copy.
   *
   * By default, immer does not copy the object descriptors such as getter, setter and non-enumrable properties.
   */
  setUseStrictShallowCopy(e) {
    this.useStrictShallowCopy_ = e;
  }
  applyPatches(e, t) {
    let r;
    for (r = t.length - 1; r >= 0; r--) {
      const o = t[r];
      if (o.path.length === 0 && o.op === "replace") {
        e = o.value;
        break;
      }
    }
    r > -1 && (t = t.slice(r + 1));
    const n = R("Patches").applyPatches_;
    return V(e) ? n(e, t) : this.produce(
      e,
      (o) => n(o, t)
    );
  }
};
function _e(e, t) {
  const r = B(e) ? R("MapSet").proxyMap_(e, t) : te(e) ? R("MapSet").proxySet_(e, t) : Bt(e, t);
  return (t ? t.scope_ : qe()).drafts_.push(r), r;
}
function Wt(e) {
  return V(e) || T(10, e), He(e);
}
function He(e) {
  if (!L(e) || re(e))
    return e;
  const t = e[k];
  let r;
  if (t) {
    if (!t.modified_)
      return t.base_;
    t.finalized_ = !0, r = fe(e, t.scope_.immer_.useStrictShallowCopy_);
  } else
    r = fe(e, !0);
  return J(r, (n, o) => {
    Ue(r, n, He(o));
  }), t && (t.finalized_ = !1), r;
}
var Ht = new qt(), Ke = Ht.produce;
function Ge(e) {
  return ({ dispatch: r, getState: n }) => (o) => (i) => typeof i == "function" ? i(r, n, e) : o(i);
}
var Kt = Ge(), Gt = Ge, Yt = typeof window < "u" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : function() {
  if (arguments.length !== 0)
    return typeof arguments[0] == "object" ? Z : Z.apply(null, arguments);
}, Zt = (e) => e && typeof e.match == "function";
function xe(e, t) {
  function r(...n) {
    if (t) {
      let o = t(...n);
      if (!o)
        throw new Error(process.env.NODE_ENV === "production" ? w(0) : "prepareAction did not return an object");
      return {
        type: e,
        payload: o.payload,
        ..."meta" in o && {
          meta: o.meta
        },
        ..."error" in o && {
          error: o.error
        }
      };
    }
    return {
      type: e,
      payload: n[0]
    };
  }
  return r.toString = () => `${e}`, r.type = e, r.match = (n) => Fe(n) && n.type === e, r;
}
function Jt(e) {
  return typeof e == "function" && "type" in e && // hasMatchFunction only wants Matchers but I don't see the point in rewriting it
  Zt(e);
}
function Xt(e) {
  const t = e ? `${e}`.split("/") : [], r = t[t.length - 1] || "actionCreator";
  return `Detected an action creator with type "${e || "unknown"}" being dispatched. 
Make sure you're calling the action creator before dispatching, i.e. \`dispatch(${r}())\` instead of \`dispatch(${r})\`. This is necessary even if the action has no payload.`;
}
function Qt(e = {}) {
  if (process.env.NODE_ENV === "production")
    return () => (r) => (n) => r(n);
  const {
    isActionCreator: t = Jt
  } = e;
  return () => (r) => (n) => (t(n) && console.warn(Xt(n.type)), r(n));
}
function Ye(e, t) {
  let r = 0;
  return {
    measureTime(n) {
      const o = Date.now();
      try {
        return n();
      } finally {
        const i = Date.now();
        r += i - o;
      }
    },
    warnIfExceeded() {
      r > e && console.warn(`${t} took ${r}ms, which is more than the warning threshold of ${e}ms. 
If your state or actions are very large, you may want to disable the middleware as it might cause too much of a slowdown in development mode. See https://redux-toolkit.js.org/api/getDefaultMiddleware for instructions.
It is disabled in production builds, so you don't need to worry about that.`);
    }
  };
}
var Ze = class P extends Array {
  constructor(...t) {
    super(...t), Object.setPrototypeOf(this, P.prototype);
  }
  static get [Symbol.species]() {
    return P;
  }
  concat(...t) {
    return super.concat.apply(this, t);
  }
  prepend(...t) {
    return t.length === 1 && Array.isArray(t[0]) ? new P(...t[0].concat(this)) : new P(...t.concat(this));
  }
};
function Ie(e) {
  return L(e) ? Ke(e, () => {
  }) : e;
}
function W(e, t, r) {
  return e.has(t) ? e.get(t) : e.set(t, r(t)).get(t);
}
function er(e) {
  return typeof e != "object" || e == null || Object.isFrozen(e);
}
function tr(e, t, r) {
  const n = Je(e, t, r);
  return {
    detectMutations() {
      return Xe(e, t, n, r);
    }
  };
}
function Je(e, t = [], r, n = "", o = /* @__PURE__ */ new Set()) {
  const i = {
    value: r
  };
  if (!e(r) && !o.has(r)) {
    o.add(r), i.children = {};
    for (const a in r) {
      const s = n ? n + "." + a : a;
      t.length && t.indexOf(s) !== -1 || (i.children[a] = Je(e, t, r[a], s));
    }
  }
  return i;
}
function Xe(e, t = [], r, n, o = !1, i = "") {
  const a = r ? r.value : void 0, s = a === n;
  if (o && !s && !Number.isNaN(n))
    return {
      wasMutated: !0,
      path: i
    };
  if (e(a) || e(n))
    return {
      wasMutated: !1
    };
  const u = {};
  for (let c in r.children)
    u[c] = !0;
  for (let c in n)
    u[c] = !0;
  const l = t.length > 0;
  for (let c in u) {
    const d = i ? i + "." + c : c;
    if (l && t.some((m) => m instanceof RegExp ? m.test(d) : d === m))
      continue;
    const f = Xe(e, t, r.children[c], n[c], s, d);
    if (f.wasMutated)
      return f;
  }
  return {
    wasMutated: !1
  };
}
function rr(e = {}) {
  if (process.env.NODE_ENV === "production")
    return () => (t) => (r) => t(r);
  {
    let t = function(s, u, l, c) {
      return JSON.stringify(s, r(u, c), l);
    }, r = function(s, u) {
      let l = [], c = [];
      return u || (u = function(d, f) {
        return l[0] === f ? "[Circular ~]" : "[Circular ~." + c.slice(0, l.indexOf(f)).join(".") + "]";
      }), function(d, f) {
        if (l.length > 0) {
          var p = l.indexOf(this);
          ~p ? l.splice(p + 1) : l.push(this), ~p ? c.splice(p, 1 / 0, d) : c.push(d), ~l.indexOf(f) && (f = u.call(this, d, f));
        } else l.push(f);
        return s == null ? f : s.call(this, d, f);
      };
    }, {
      isImmutable: n = er,
      ignoredPaths: o,
      warnAfter: i = 32
    } = e;
    const a = tr.bind(null, n, o);
    return ({
      getState: s
    }) => {
      let u = s(), l = a(u), c;
      return (d) => (f) => {
        const p = Ye(i, "ImmutableStateInvariantMiddleware");
        p.measureTime(() => {
          if (u = s(), c = l.detectMutations(), l = a(u), c.wasMutated)
            throw new Error(process.env.NODE_ENV === "production" ? w(19) : `A state mutation was detected between dispatches, in the path '${c.path || ""}'.  This may cause incorrect behavior. (https://redux.js.org/style-guide/style-guide#do-not-mutate-state)`);
        });
        const m = d(f);
        return p.measureTime(() => {
          if (u = s(), c = l.detectMutations(), l = a(u), c.wasMutated)
            throw new Error(process.env.NODE_ENV === "production" ? w(20) : `A state mutation was detected inside a dispatch, in the path: ${c.path || ""}. Take a look at the reducer(s) handling the action ${t(f)}. (https://redux.js.org/style-guide/style-guide#do-not-mutate-state)`);
        }), p.warnIfExceeded(), m;
      };
    };
  }
}
function Qe(e) {
  const t = typeof e;
  return e == null || t === "string" || t === "boolean" || t === "number" || Array.isArray(e) || $(e);
}
function ge(e, t = "", r = Qe, n, o = [], i) {
  let a;
  if (!r(e))
    return {
      keyPath: t || "<root>",
      value: e
    };
  if (typeof e != "object" || e === null || i?.has(e)) return !1;
  const s = n != null ? n(e) : Object.entries(e), u = o.length > 0;
  for (const [l, c] of s) {
    const d = t ? t + "." + l : l;
    if (!(u && o.some((p) => p instanceof RegExp ? p.test(d) : d === p))) {
      if (!r(c))
        return {
          keyPath: d,
          value: c
        };
      if (typeof c == "object" && (a = ge(c, d, r, n, o, i), a))
        return a;
    }
  }
  return i && et(e) && i.add(e), !1;
}
function et(e) {
  if (!Object.isFrozen(e)) return !1;
  for (const t of Object.values(e))
    if (!(typeof t != "object" || t === null) && !et(t))
      return !1;
  return !0;
}
function nr(e = {}) {
  if (process.env.NODE_ENV === "production")
    return () => (t) => (r) => t(r);
  {
    const {
      isSerializable: t = Qe,
      getEntries: r,
      ignoredActions: n = [],
      ignoredActionPaths: o = ["meta.arg", "meta.baseQueryMeta"],
      ignoredPaths: i = [],
      warnAfter: a = 32,
      ignoreState: s = !1,
      ignoreActions: u = !1,
      disableCache: l = !1
    } = e, c = !l && WeakSet ? /* @__PURE__ */ new WeakSet() : void 0;
    return (d) => (f) => (p) => {
      if (!Fe(p))
        return f(p);
      const m = f(p), y = Ye(a, "SerializableStateInvariantMiddleware");
      return !u && !(n.length && n.indexOf(p.type) !== -1) && y.measureTime(() => {
        const h = ge(p, "", t, r, o, c);
        if (h) {
          const {
            keyPath: b,
            value: E
          } = h;
          console.error(`A non-serializable value was detected in an action, in the path: \`${b}\`. Value:`, E, `
Take a look at the logic that dispatched this action: `, p, `
(See https://redux.js.org/faq/actions#why-should-type-be-a-string-or-at-least-serializable-why-should-my-action-types-be-constants)`, `
(To allow non-serializable values see: https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data)`);
        }
      }), s || (y.measureTime(() => {
        const h = d.getState(), b = ge(h, "", t, r, i, c);
        if (b) {
          const {
            keyPath: E,
            value: _
          } = b;
          console.error(`A non-serializable value was detected in the state, in the path: \`${E}\`. Value:`, _, `
Take a look at the reducer(s) handling this action type: ${p.type}.
(See https://redux.js.org/faq/organizing-state#can-i-put-functions-promises-or-other-non-serializable-items-in-my-store-state)`);
        }
      }), y.warnIfExceeded()), m;
    };
  }
}
function H(e) {
  return typeof e == "boolean";
}
var or = () => function(t) {
  const {
    thunk: r = !0,
    immutableCheck: n = !0,
    serializableCheck: o = !0,
    actionCreatorCheck: i = !0
  } = t ?? {};
  let a = new Ze();
  if (r && (H(r) ? a.push(Kt) : a.push(Gt(r.extraArgument))), process.env.NODE_ENV !== "production") {
    if (n) {
      let s = {};
      H(n) || (s = n), a.unshift(rr(s));
    }
    if (o) {
      let s = {};
      H(o) || (s = o), a.push(nr(s));
    }
    if (i) {
      let s = {};
      H(i) || (s = i), a.unshift(Qt(s));
    }
  }
  return a;
}, ir = "RTK_autoBatch", Ve = (e) => (t) => {
  setTimeout(t, e);
}, ar = (e = {
  type: "raf"
}) => (t) => (...r) => {
  const n = t(...r);
  let o = !0, i = !1, a = !1;
  const s = /* @__PURE__ */ new Set(), u = e.type === "tick" ? queueMicrotask : e.type === "raf" ? (
    // requestAnimationFrame won't exist in SSR environments. Fall back to a vague approximation just to keep from erroring.
    typeof window < "u" && window.requestAnimationFrame ? window.requestAnimationFrame : Ve(10)
  ) : e.type === "callback" ? e.queueNotification : Ve(e.timeout), l = () => {
    a = !1, i && (i = !1, s.forEach((c) => c()));
  };
  return Object.assign({}, n, {
    // Override the base `store.subscribe` method to keep original listeners
    // from running if we're delaying notifications
    subscribe(c) {
      const d = () => o && c(), f = n.subscribe(d);
      return s.add(c), () => {
        f(), s.delete(c);
      };
    },
    // Override the base `store.dispatch` method so that we can check actions
    // for the `shouldAutoBatch` flag and determine if batching is active
    dispatch(c) {
      try {
        return o = !c?.meta?.[ir], i = !o, i && (a || (a = !0, u(l))), n.dispatch(c);
      } finally {
        o = !0;
      }
    }
  });
}, sr = (e) => function(r) {
  const {
    autoBatch: n = !0
  } = r ?? {};
  let o = new Ze(e);
  return n && o.push(ar(typeof n == "object" ? n : void 0)), o;
};
function ur(e) {
  const t = or(), {
    reducer: r = void 0,
    middleware: n,
    devTools: o = !0,
    duplicateMiddlewareCheck: i = !0,
    preloadedState: a = void 0,
    enhancers: s = void 0
  } = e || {};
  let u;
  if (typeof r == "function")
    u = r;
  else if ($(r))
    u = ze(r);
  else
    throw new Error(process.env.NODE_ENV === "production" ? w(1) : "`reducer` is a required argument, and must be a function or an object of functions that can be passed to combineReducers");
  if (process.env.NODE_ENV !== "production" && n && typeof n != "function")
    throw new Error(process.env.NODE_ENV === "production" ? w(2) : "`middleware` field must be a callback");
  let l;
  if (typeof n == "function") {
    if (l = n(t), process.env.NODE_ENV !== "production" && !Array.isArray(l))
      throw new Error(process.env.NODE_ENV === "production" ? w(3) : "when using a middleware builder function, an array of middleware must be returned");
  } else
    l = t();
  if (process.env.NODE_ENV !== "production" && l.some((y) => typeof y != "function"))
    throw new Error(process.env.NODE_ENV === "production" ? w(4) : "each middleware provided to configureStore must be a function");
  if (process.env.NODE_ENV !== "production" && i) {
    let y = /* @__PURE__ */ new Set();
    l.forEach((h) => {
      if (y.has(h))
        throw new Error(process.env.NODE_ENV === "production" ? w(42) : "Duplicate middleware references found when creating the store. Ensure that each middleware is only included once.");
      y.add(h);
    });
  }
  let c = Z;
  o && (c = Yt({
    // Enable capture of stack traces for dispatched Redux actions
    trace: process.env.NODE_ENV !== "production",
    ...typeof o == "object" && o
  }));
  const d = Vt(...l), f = sr(d);
  if (process.env.NODE_ENV !== "production" && s && typeof s != "function")
    throw new Error(process.env.NODE_ENV === "production" ? w(5) : "`enhancers` field must be a callback");
  let p = typeof s == "function" ? s(f) : f();
  if (process.env.NODE_ENV !== "production" && !Array.isArray(p))
    throw new Error(process.env.NODE_ENV === "production" ? w(6) : "`enhancers` callback must return an array");
  if (process.env.NODE_ENV !== "production" && p.some((y) => typeof y != "function"))
    throw new Error(process.env.NODE_ENV === "production" ? w(7) : "each enhancer provided to configureStore must be a function");
  process.env.NODE_ENV !== "production" && l.length && !p.includes(d) && console.error("middlewares were provided, but middleware enhancer was not included in final enhancers - make sure to call `getDefaultEnhancers`");
  const m = c(...p);
  return Pe(u, a, m);
}
function tt(e) {
  const t = {}, r = [];
  let n;
  const o = {
    addCase(i, a) {
      if (process.env.NODE_ENV !== "production") {
        if (r.length > 0)
          throw new Error(process.env.NODE_ENV === "production" ? w(26) : "`builder.addCase` should only be called before calling `builder.addMatcher`");
        if (n)
          throw new Error(process.env.NODE_ENV === "production" ? w(27) : "`builder.addCase` should only be called before calling `builder.addDefaultCase`");
      }
      const s = typeof i == "string" ? i : i.type;
      if (!s)
        throw new Error(process.env.NODE_ENV === "production" ? w(28) : "`builder.addCase` cannot be called with an empty action type");
      if (s in t)
        throw new Error(process.env.NODE_ENV === "production" ? w(29) : `\`builder.addCase\` cannot be called with two reducers for the same action type '${s}'`);
      return t[s] = a, o;
    },
    addAsyncThunk(i, a) {
      if (process.env.NODE_ENV !== "production" && n)
        throw new Error(process.env.NODE_ENV === "production" ? w(43) : "`builder.addAsyncThunk` should only be called before calling `builder.addDefaultCase`");
      return a.pending && (t[i.pending.type] = a.pending), a.rejected && (t[i.rejected.type] = a.rejected), a.fulfilled && (t[i.fulfilled.type] = a.fulfilled), a.settled && r.push({
        matcher: i.settled,
        reducer: a.settled
      }), o;
    },
    addMatcher(i, a) {
      if (process.env.NODE_ENV !== "production" && n)
        throw new Error(process.env.NODE_ENV === "production" ? w(30) : "`builder.addMatcher` should only be called before calling `builder.addDefaultCase`");
      return r.push({
        matcher: i,
        reducer: a
      }), o;
    },
    addDefaultCase(i) {
      if (process.env.NODE_ENV !== "production" && n)
        throw new Error(process.env.NODE_ENV === "production" ? w(31) : "`builder.addDefaultCase` can only be called once");
      return n = i, o;
    }
  };
  return e(o), [t, r, n];
}
function cr(e) {
  return typeof e == "function";
}
function lr(e, t) {
  if (process.env.NODE_ENV !== "production" && typeof t == "object")
    throw new Error(process.env.NODE_ENV === "production" ? w(8) : "The object notation for `createReducer` has been removed. Please use the 'builder callback' notation instead: https://redux-toolkit.js.org/api/createReducer");
  let [r, n, o] = tt(t), i;
  if (cr(e))
    i = () => Ie(e());
  else {
    const s = Ie(e);
    i = () => s;
  }
  function a(s = i(), u) {
    let l = [r[u.type], ...n.filter(({
      matcher: c
    }) => c(u)).map(({
      reducer: c
    }) => c)];
    return l.filter((c) => !!c).length === 0 && (l = [o]), l.reduce((c, d) => {
      if (d)
        if (V(c)) {
          const p = d(c, u);
          return p === void 0 ? c : p;
        } else {
          if (L(c))
            return Ke(c, (f) => d(f, u));
          {
            const f = d(c, u);
            if (f === void 0) {
              if (c === null)
                return c;
              throw Error("A case reducer on a non-draftable value must not return undefined");
            }
            return f;
          }
        }
      return c;
    }, s);
  }
  return a.getInitialState = i, a;
}
var dr = /* @__PURE__ */ Symbol.for("rtk-slice-createasyncthunk");
function fr(e, t) {
  return `${e}/${t}`;
}
function pr({
  creators: e
} = {}) {
  const t = e?.asyncThunk?.[dr];
  return function(n) {
    const {
      name: o,
      reducerPath: i = o
    } = n;
    if (!o)
      throw new Error(process.env.NODE_ENV === "production" ? w(11) : "`name` is a required option for createSlice");
    typeof process < "u" && process.env.NODE_ENV === "development" && n.initialState === void 0 && console.error("You must provide an `initialState` value that is not `undefined`. You may have misspelled `initialState`");
    const a = (typeof n.reducers == "function" ? n.reducers(mr()) : n.reducers) || {}, s = Object.keys(a), u = {
      sliceCaseReducersByName: {},
      sliceCaseReducersByType: {},
      actionCreators: {},
      sliceMatchers: []
    }, l = {
      addCase(_, v) {
        const g = typeof _ == "string" ? _ : _.type;
        if (!g)
          throw new Error(process.env.NODE_ENV === "production" ? w(12) : "`context.addCase` cannot be called with an empty action type");
        if (g in u.sliceCaseReducersByType)
          throw new Error(process.env.NODE_ENV === "production" ? w(13) : "`context.addCase` cannot be called with two reducers for the same action type: " + g);
        return u.sliceCaseReducersByType[g] = v, l;
      },
      addMatcher(_, v) {
        return u.sliceMatchers.push({
          matcher: _,
          reducer: v
        }), l;
      },
      exposeAction(_, v) {
        return u.actionCreators[_] = v, l;
      },
      exposeCaseReducer(_, v) {
        return u.sliceCaseReducersByName[_] = v, l;
      }
    };
    s.forEach((_) => {
      const v = a[_], g = {
        reducerName: _,
        type: fr(o, _),
        createNotation: typeof n.reducers == "function"
      };
      gr(v) ? vr(g, v, l, t) : _r(g, v, l);
    });
    function c() {
      if (process.env.NODE_ENV !== "production" && typeof n.extraReducers == "object")
        throw new Error(process.env.NODE_ENV === "production" ? w(14) : "The object notation for `createSlice.extraReducers` has been removed. Please use the 'builder callback' notation instead: https://redux-toolkit.js.org/api/createSlice");
      const [_ = {}, v = [], g = void 0] = typeof n.extraReducers == "function" ? tt(n.extraReducers) : [n.extraReducers], C = {
        ..._,
        ...u.sliceCaseReducersByType
      };
      return lr(n.initialState, (S) => {
        for (let D in C)
          S.addCase(D, C[D]);
        for (let D of u.sliceMatchers)
          S.addMatcher(D.matcher, D.reducer);
        for (let D of v)
          S.addMatcher(D.matcher, D.reducer);
        g && S.addDefaultCase(g);
      });
    }
    const d = (_) => _, f = /* @__PURE__ */ new Map(), p = /* @__PURE__ */ new WeakMap();
    let m;
    function y(_, v) {
      return m || (m = c()), m(_, v);
    }
    function h() {
      return m || (m = c()), m.getInitialState();
    }
    function b(_, v = !1) {
      function g(S) {
        let D = S[_];
        if (typeof D > "u") {
          if (v)
            D = W(p, g, h);
          else if (process.env.NODE_ENV !== "production")
            throw new Error(process.env.NODE_ENV === "production" ? w(15) : "selectSlice returned undefined for an uninjected slice reducer");
        }
        return D;
      }
      function C(S = d) {
        const D = W(f, v, () => /* @__PURE__ */ new WeakMap());
        return W(D, S, () => {
          const we = {};
          for (const [at, st] of Object.entries(n.selectors ?? {}))
            we[at] = hr(st, S, () => W(p, S, h), v);
          return we;
        });
      }
      return {
        reducerPath: _,
        getSelectors: C,
        get selectors() {
          return C(g);
        },
        selectSlice: g
      };
    }
    const E = {
      name: o,
      reducer: y,
      actions: u.actionCreators,
      caseReducers: u.sliceCaseReducersByName,
      getInitialState: h,
      ...b(i),
      injectInto(_, {
        reducerPath: v,
        ...g
      } = {}) {
        const C = v ?? i;
        return _.inject({
          reducerPath: C,
          reducer: y
        }, g), {
          ...E,
          ...b(C, !0)
        };
      }
    };
    return E;
  };
}
function hr(e, t, r, n) {
  function o(i, ...a) {
    let s = t(i);
    if (typeof s > "u") {
      if (n)
        s = r();
      else if (process.env.NODE_ENV !== "production")
        throw new Error(process.env.NODE_ENV === "production" ? w(16) : "selectState returned undefined for an uninjected slice reducer");
    }
    return e(s, ...a);
  }
  return o.unwrapped = e, o;
}
var rt = /* @__PURE__ */ pr();
function mr() {
  function e(t, r) {
    return {
      _reducerDefinitionType: "asyncThunk",
      payloadCreator: t,
      ...r
    };
  }
  return e.withTypes = () => e, {
    reducer(t) {
      return Object.assign({
        // hack so the wrapping function has the same name as the original
        // we need to create a wrapper so the `reducerDefinitionType` is not assigned to the original
        [t.name](...r) {
          return t(...r);
        }
      }[t.name], {
        _reducerDefinitionType: "reducer"
        /* reducer */
      });
    },
    preparedReducer(t, r) {
      return {
        _reducerDefinitionType: "reducerWithPrepare",
        prepare: t,
        reducer: r
      };
    },
    asyncThunk: e
  };
}
function _r({
  type: e,
  reducerName: t,
  createNotation: r
}, n, o) {
  let i, a;
  if ("reducer" in n) {
    if (r && !yr(n))
      throw new Error(process.env.NODE_ENV === "production" ? w(17) : "Please use the `create.preparedReducer` notation for prepared action creators with the `create` notation.");
    i = n.reducer, a = n.prepare;
  } else
    i = n;
  o.addCase(e, i).exposeCaseReducer(t, i).exposeAction(t, a ? xe(e, a) : xe(e));
}
function gr(e) {
  return e._reducerDefinitionType === "asyncThunk";
}
function yr(e) {
  return e._reducerDefinitionType === "reducerWithPrepare";
}
function vr({
  type: e,
  reducerName: t
}, r, n, o) {
  if (!o)
    throw new Error(process.env.NODE_ENV === "production" ? w(18) : "Cannot use `create.asyncThunk` in the built-in `createSlice`. Use `buildCreateSlice({ creators: { asyncThunk: asyncThunkCreator } })` to create a customised version of `createSlice`.");
  const {
    payloadCreator: i,
    fulfilled: a,
    pending: s,
    rejected: u,
    settled: l,
    options: c
  } = r, d = o(e, i, c);
  n.exposeAction(t, d), a && n.addCase(d.fulfilled, a), s && n.addCase(d.pending, s), u && n.addCase(d.rejected, u), l && n.addMatcher(d.settled, l), n.exposeCaseReducer(t, {
    fulfilled: a || K,
    pending: s || K,
    rejected: u || K,
    settled: l || K
  });
}
function K() {
}
function w(e) {
  return `Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
const nt = rt({
  name: "auth",
  initialState: {},
  reducers: {
    setAuth: (e, { payload: t }) => Object.assign({}, t),
    setAuthUser: (e, t) => {
      e.user && (e.user = t.payload);
    }
  }
}), { setAuth: Wr, setAuthUser: Hr } = nt.actions, br = nt.reducer, wr = {
  language: "fr",
  community: null
}, ot = rt({
  name: "params",
  initialState: wr,
  reducers: {
    setLanguage: (e, { payload: t }) => {
      e.language = t;
    },
    setCommunity: (e, { payload: t }) => {
      e.community = t;
    }
  }
}), { setLanguage: Kr, setCommunity: Gr } = ot.actions, Er = ot.reducer, it = ur({
  reducer: ze({
    // medias: mediasReducer,
    // articles: articlesReducer,
    // categories: categoriesReducer,
    // types: typesReducer,
    // themes: themesReducer,
    // tags: tagsReducer,
    // users: usersReducer,
    auth: br,
    params: Er
    // mediaViewer: mediaViewerReducer,
    // mediaEditor: mediaEditorReducer,
    // tamtamit: tamtamitReducer,
  })
}), Cr = {
  medias: "Medias",
  validate_selection: "Validate the selections",
  liste_of_medias: "List of medias",
  add_new_media: "Add a new media",
  label_file_invalid: "Some files are invalid : ",
  drag_drop_files: "Drag and drop files here, or click to select the files to download.",
  "Select files": "",
  max_upload_file_size: "Maximum upload file size: 8MB.",
  select_files: "Select files"
}, Nr = {
  liste_of_medias: "Bibliothèque des medias",
  validate_selection: "Valider la selection",
  medias: "Medias",
  label_file_invalid: "Certains fichiers ne sont pas valides: ",
  drag_drop_files: "Faites glisser et déposer des fichiers ici, ou cliquez pour sélectionner les fichiers à télécharger.",
  max_upload_file_size: "Taille maximale du fichier de téléchargement: 8 Mo",
  select_files: "Sélectionner des fichiers"
}, Or = {
  "Drag and drop files here, or click to select the files to download.": "Sleep bestanden hierheen, of klik om de bestanden te selecteren die u wilt downloaden.",
  "Select files": "Selecteer bestand",
  "Maximum upload file size: 8MB.": "Maximale bestandsgrootte voor uploaden: 8MB.",
  "Add a logo": "Voeg een logo toe",
  "Apply a mask": "Breng een masker aan",
  "Apply a mask to your medias": "Breng een masker aan op je media",
  "Apply a logo to your medias": "Breng een logo aan op uw media",
  Apply: "Van toepassing zijn",
  Cancel: "Annuleren",
  "Mask informations": "Maskeer informatie",
  Title: "Titel",
  Description: "Omschrijving",
  "Uploaded at": "Geüpload op",
  "File type": "Bestandstype",
  "File size": "Bestandsgrootte",
  Dimensions: "Dimensies",
  "Select or import your mask": "Selecteer of importeer uw masker",
  "Select or import your logo": "Selecteer of importeer uw logo",
  "Select size": "Selecteer grootte",
  Small: "Klein",
  Medium: "Medium",
  Large: "Groot",
  "eXtra Large": "Extra groot",
  "Select position": "Selecteer positie"
}, Sr = {
  add_new_article: "Write",
  write_article: "Write an article",
  write_subtitle: "Compose your article with the EDITOR tool and complete the configuration.",
  tab_EDITOR: "Editor",
  tab_CONFIGURATION: "Configuration",
  title: "Title",
  write_here: "Write here ...",
  save_label: "Save your draft or publish immediately",
  save: "Save",
  Traduire: "Translate",
  save_and_share: "Save & Share",
  save_sharing: "Save the share",
  cancel: "Cancel",
  close: "Close",
  continue: "Continue",
  update: "Update",
  community: "Community",
  select_community: "Select a community ...",
  category: "Category",
  select_category: "Select a category ...",
  type: "Type",
  select_type: "Select a type ...",
  theme: "Theme",
  select_theme: "Default theme ...",
  page: "Page",
  select_page: "Select a page ...",
  language: "Language",
  english: "English",
  french: "French",
  dutch: "Dutch",
  author_title: "Title ...",
  author_headline: "Headline ...",
  comment: "Comment",
  add_comment: "Add a comment ...",
  draft: "Draft",
  ready: "Ready",
  scheduled: "Scheduled",
  published: "Published",
  published_on: "Published on",
  scheduled_for: "Scheduled for",
  dropzone_text: "Drag and drop files here, or click to select the files to download.",
  loading: "Loading ...",
  type_author: "Type author name ...",
  loading_suggestions: "Loading suggestions ...",
  No_suggestions_available: "No suggestions available",
  tag_principal: "Main tag",
  errors: "Errors",
  validate_title: "You must provide a title.",
  validate_theme: "You must provide a theme",
  validate_type: "You must select a type",
  validate_category: "You must select a category",
  validate_community: "You must select a community",
  validate_content: "You must provide content",
  validate_tags: "You must provide at least two tags.",
  validate_tag_name: "You must provide the translation of the tags",
  validate_page: "You must provide at least one page.",
  validate_publish_date: "The format of the publication date is invalid",
  validate_page_title: "You must provide page title",
  validate_page_title: "You must provide page title",
  validate_theme_title: "You must provide theme title",
  link: "Link",
  link_text: "Text",
  validate_link: "The link url is required!",
  add_link: "Add the link",
  avatars: "Avatars",
  authors: "Authors",
  quote_add: "Add",
  upload_pdf: "Upload PDF",
  quote_text: '"Insert quote text"',
  quote_author: '"Insert quote author"',
  validate_theme_title: "You must provide a title.",
  validate_theme_language: "You must select a language.",
  theme_isdefault: "Default theme",
  add_theme: "Add theme",
  add_page: "Add page",
  add_more: "Add more",
  media_text: "Click or drag and drop your image here",
  from_media: "From Media",
  article_already_imported: "This article already imported at",
  do_you_want_reimported: "Do you want to re-import it ?",
  no_account_found: "No account found",
  image_required: "You must provide an image.",
  import: "Import",
  import_article: "Import an article",
  import_article_subtitle: "TamtamIt is a tool for importing external articles into your Blog",
  is_private: "For subscribers only",
  subscribers_groups: "Subscriber groups",
  validate_private_groups: "You must specify groups for subscribers",
  social_network: "Social Network",
  share_expired: "You have at least one social media account that requires updating before continuing if you are going to share this new article.",
  share_history: "Publication history",
  lowercase: "Lowercase",
  uppercase: "Uppercase",
  capitalize: "Capital letter at each words",
  ufirst: "Capital letter at beginning",
  tag_modal_title: "Tag",
  tag_translate: "Translation",
  tag_name: "Name",
  relevance: "Relevance",
  program: "Program",
  pick_author: "Choose editor",
  author_required: "You must provide an author.",
  url_already_programmed: "This link has already been programmed for the editor",
  url_already_published: "This link has already been tamtamed and published on the",
  authors_chains: "Choose author/channel",
  got_to_source: "View Source",
  supertag_limit: "You have reached the limit of super tags to add",
  apply_all_tags: "Apply to all selected tags?",
  select_supertag: "Select the linked supertag",
  merge: "Merge",
  merge_question: "Are you sure you want to merge",
  and: "and",
  keep: "Keep",
  as_principle: "as main tag",
  merge_and_delete: "Merge and delete",
  merge_selection: "Merge selection",
  name: "Name",
  usage_counter: "Usage Counter",
  notification: "Mobile app notification",
  automatic: "Automatic",
  instant: "Instant",
  not_notify: "Do not notify",
  validate_notification_date: "The notification date format is invalid",
  validate_notification_after_date: "The notification date must be after the publication date",
  hour: "hour",
  hours: "hours"
}, Dr = {
  add_new_article: "Rédiger",
  write_article: "Rédiger un article",
  write_subtitle: "Composez votre article avec l'outil ÉDITEUR et complétez la configuration.",
  tab_EDITOR: "éditeur",
  tab_CONFIGURATION: "Configuration",
  title: "Titre",
  write_here: "Écrire ici ...",
  save_label: "Enregistrez votre brouillon ou publiez-le immédiatement",
  save: "Enregistrer",
  translate: "Traduire",
  save_and_share: "Enregistrer & Partager",
  save_sharing: "Enregistrer le partage",
  cancel: "Annuler",
  close: "Fermer",
  continue: "Continuer",
  update: "Mettre à jour",
  community: "Communauté",
  select_community: "Sélectionnez une communauté ...",
  category: "Catégorie",
  select_category: "Choisir une catégorie ...",
  type: "Type",
  select_type: "Choisir un type ...",
  theme: "Thème",
  select_theme: "Thème par défaut ...",
  page: "Page",
  select_page: "Choisir une page ...",
  language: "Langue",
  english: "Anglais",
  french: "Français",
  dutch: "Néerlandais",
  author_title: "Titre ...",
  author_headline: "Headline ...",
  comment: "Commentaire",
  add_comment: "Ajouter un commentaire ...",
  status: "Status",
  //status: "Statut",
  draft: "Brouillon",
  ready: "Prêt",
  scheduled: "Planifié",
  published: "Publié",
  published_on: "Publié le",
  scheduled_for: "Planifié le",
  dropzone_text: "Glisser et déposez les fichiers ici, ou cliquez pour sélectionner les fichiers à télécharger.",
  loading: "Chargement ...",
  type_author: "Tapez le nom de l'auteur ...",
  loading_suggestions: "Loading suggestions ...",
  No_suggestions_available: "Aucune suggestion disponible",
  tag_principal: "Tag principal",
  errors: "Erreurs",
  validate_title: "Vous devez fournir un titre au moins 3 caractères",
  validate_theme: "Vous devez sélectionner un thème",
  validate_type: "Vous devez sélectionner un type",
  validate_category: "Vous devez sélectionner une catégorie",
  validate_community: "Vous devez sélectionner une communauté",
  validate_content: "Vous devez fournir le contenu de l'article",
  validate_tags: "Vous devez fournir au moins deux mots-clés",
  validate_tag_name: "Vous devez fournir la traduction des tags",
  validate_page: "Vous devez fournir au moins une page.",
  validate_publish_date: "Le format de la date de publication est invalide",
  validate_page_title: "Vous devez fournir le titre de la page",
  validate_theme_title: "Vous devez fournir le titre du theme",
  link: "Lien",
  link_text: "Texte",
  validate_link: "L'URL du lien est obligatoire!",
  add_link: "Ajouter le lien",
  avatars: "Avatars",
  authors: "Auteurs",
  quote_add: "Ajouter",
  quote_create: "Générer",
  upload_pdf: "Charger un PDF",
  quote_text: "Insérer le texte de la citation",
  quote_author: "Insérer l'auteur de la citation",
  validate_theme_title: "Vous devez fournir un titre.",
  validate_theme_language: "Vous devez sélectionner une langue.",
  theme_isdefault: "Thème par défaut",
  add_theme: "Ajouter le thème",
  add_page: "Ajouter la page",
  add_more: "Ajouter plus",
  attachments: "Pièces jointes",
  media_text: "Cliquez ou glisser et déposer votre image ici",
  from_media: "Depuis Media",
  article_already_imported: "Ce fichier a éte déja importé le",
  do_you_want_reimported: "Voulez vous le reimporter ?",
  no_account_found: "Aucun compte trouvé",
  image_required: "Vous devez fournir une image.",
  import: "Importer",
  import_article: "Importer un article",
  import_article_subtitle: "TamtamIt est un outil permettant d'importer des articles externes dans votre Blog",
  is_private: "Réservé aux abonnés",
  subscribers_groups: "Groupes d'abonnés",
  validate_private_groups: "Vous devez spécifier des groupes pour les abonnés",
  social_network: "Réseau social",
  share_expired: "Vous avez au moins un compte réseau social qui nécessite une mise à jour avant de continuer si vous comptez partager ce nouvel article.",
  share_history: "Historique des publications",
  lowercase: "Minuscule",
  uppercase: "Majuscule",
  capitalize: "Majuscule en début des mots",
  ufirst: "Majuscule en début de phrase",
  generateTitle: "Améliorer titre avec open AI",
  tag_modal_title: "Tag",
  tag_translate: "Traduction",
  tag_name: "Nom",
  relevance: "Pertinence",
  program: "Programmer",
  pick_author: "Choisir rédacteur",
  author_required: "Vous devez fournir un auteur.",
  url_already_programmed: "Ce lien a été déjà programmé pour le rédacteur",
  url_already_published: "Ce lien a été déjà tamtamer et publier le",
  authors_chains: "Choisir auteur/chaine",
  got_to_source: "Voir la source",
  GROUP: "Groupes",
  FID_COLLABORATOR: "Tous les collaborateurs",
  FID_CLIENT: "Tous les clients",
  ALL_COLLABORATORS: "Tous les collaborateurs",
  ALL_CLIENTS: "Tous les clients",
  ALL_CONTACTS: "Tous les contacts",
  SPEC_COLLABORATOR: "Collaborateurs spécifique",
  SPEC_CLIENT: "Clients spécifique",
  SPEC_CONTACT: "Contacts spécifique",
  PUBLIC: "Tous",
  supertag_limit: "Vous avez atteint la limite de super tags à ajouter",
  apply_all_tags: "Appliquer à tout les tags selectionnés?",
  select_supertag: "Sélectionnez le supertag lié",
  merge: "Fusionner",
  merge_question: "Êtes-vous sûr de vouloir fusionner",
  and: "et",
  keep: "Garder",
  as_principle: "en tant que tag principale",
  merge_and_delete: "Fusionner et supprimer",
  merge_selection: "Fusionner la sélection",
  name: "Nom",
  usage_counter: "Compteur d'utilisation",
  fff_library: "Partager dans la bibliothèque FFF",
  recurrence: "Récurrence",
  end_recurrence: "Fin récurrence",
  never: "Jamais",
  every_month: "Tous les mois",
  every_3_month: "Tous les 3 mois",
  every_6_month: "Tous les 6 mois",
  every_year: "Tous les ans",
  notification: "Notification app mobile",
  automatic: "Automatique",
  instant: "Instantané",
  not_notify: "Ne pas notifier",
  validate_notification_date: "Le format de la date de notification est invalide",
  validate_notification_after_date: "La date de la notification doit être supérieure à celle de la publication",
  hour: "heure",
  hours: "heures"
}, Tr = {
  add_new_article: "Schrijven",
  write_article: "Schrijf een artikel",
  write_subtitle: "Stel uw artikel samen met de EDITOR-tool en voltooi de configuratie.",
  tab_EDITOR: "editor",
  tab_CONFIGURATION: "Configuratie",
  title: "Titel",
  write_here: "Schrijf hier ...",
  save_label: "Sla je concept op of post het meteen",
  save: "Opslaan",
  translate: "Vertalen",
  save_and_share: "Opslaan en delen",
  save_sharing: "Bewaar het aandeel",
  cancel: "Annuleren",
  close: "Sluiten",
  continue: "Doorgaan met",
  update: "Update",
  community: "Gemeenschap",
  select_community: "Selecteer een gemeenschap ...",
  category: "Categorie",
  select_category: "Kies een categorie ...",
  type: "Type",
  select_type: "Kies een type ...",
  theme: "Thema",
  select_theme: "Standaard thema ...",
  page: "Bladzijde",
  select_page: "Kies een pagina ...",
  language: "Taal",
  english: "Engels",
  french: "Frans",
  dutch: "Nederlands",
  author_title: "Titel ...",
  author_headline: "kop ...",
  comment: "Opmerking",
  add_comment: "Voeg een reactie toe ...",
  status: "Toestand",
  draft: "Klad",
  ready: "Klaar, gereed",
  scheduled: "Gepland",
  published: "Geplaatst",
  published_on: "gepubliceerd op",
  scheduled_for: "gepland op",
  dropzone_text: "Sleep bestanden hierheen, of klik om de bestanden te selecteren die u wilt downloaden.",
  loading: "Bezig met laden ...",
  type_author: "Typ de naam van de auteur ...",
  loading_suggestions: "Suggesties laden ...",
  No_suggestions_available: "Geen suggesties beschikbaar",
  tag_principal: "Hoofdtag",
  errors: "fouten",
  validate_title: "U moet een titel van minimaal 3 tekens opgeven",
  validate_theme: "Je moet een thema selecteren",
  validate_type: "Je moet een type selecteren",
  validate_category: "U moet een categorie selecteren",
  validate_community: "Je moet een community selecteren",
  validate_content: "U moet de inhoud van het artikel opgeven",
  validate_tags: "U moet ten minste twee trefwoorden opgeven",
  validate_tag_name: "U moet de vertaling van de tags opgeven",
  validate_page: "U moet minimaal één pagina opgeven.",
  validate_publish_date: "Het formaat van de publicatiedatum is ongeldig",
  validate_page_title: "U moet de paginatitel opgeven",
  validate_theme_title: "U moet de titel van het thema opgeven",
  link: "Koppeling",
  link_text: "Tekst",
  validate_link: "Link-URL is vereist!",
  add_link: "Voeg een link toe",
  avatars: "Avatars",
  authors: "Auteurs",
  quote_add: "Toevoegen",
  upload_pdf: "PDF uploaden",
  quote_text: '"Citaattekst invoegen"',
  quote_author: '"Voeg de auteur van de bronvermelding in"',
  validate_theme_title: "U moet een titel opgeven.",
  validate_theme_language: "U moet een taal selecteren.",
  theme_isdefault: "Standaard thema",
  add_theme: "Thema toevoegen",
  add_page: "Pagina toevoegen",
  add_more: "Voeg meer toe",
  attachments: "Bijlagen",
  media_text: "Klik of sleep je afbeelding hier",
  from_media: "Van media",
  article_already_imported: "This article already imported at",
  do_you_want_reimported: "Do you want to reimport it ?",
  no_account_found: "No account found",
  image_required: "You must provide an image.",
  import: "Import",
  import_article: "Import an article",
  import_article_subtitle: "TamtamIt is a tool for importing external articles into your Blog",
  is_private: "Alleen voor abonnees",
  subscribers_groups: "Abonnee groepen",
  validate_private_groups: "Je moet groepen voor abonnees specificeren",
  social_network: "Sociaal netwerk",
  share_expired: "Je hebt ten minste één social media-account dat moet worden bijgewerkt voordat je doorgaat als je dit nieuwe artikel gaat delen.",
  share_history: "Publicatie geschiedenis",
  lowercase: "kleine letters",
  uppercase: "Hoofdletters",
  capitalize: "Hoofdletter bij elk woord",
  ufirst: "Hoofdletter aan het begin",
  tag_modal_title: "Tag",
  tag_translate: "Vertaling",
  tag_name: "Naam",
  relevance: "Relevantie",
  program: "Programma",
  pick_author: "Kies editor",
  author_required: "Je moet een auteur opgeven.",
  url_already_programmed: "Deze link is al geprogrammeerd voor de editor",
  url_already_published: "Deze link is al getamt en gepubliceerd op de",
  authors_chains: "Kies auteur/kanaal",
  got_to_source: "Bron bekijken",
  GROUP: "Groepen",
  FID_COLLABORATOR: "Alle medewerkers",
  FID_CLIENT: "Alle klanten",
  ALL_COLLABORATORS: "Alle medewerkers",
  ALL_CLIENTS: "Alle klanten",
  ALL_CONTACTS: "Alle contacten",
  SPEC_COLLABORATOR: "Specifieke medewerkers",
  SPEC_CLIENT: "Specifieke klanten",
  SPEC_CONTACT: "Specifieke contacten",
  PUBLIC: "Alle",
  supertag_limit: "Je hebt de limiet van supertags bereikt die je kunt toevoegen",
  apply_all_tags: "Toepassen op alle geselecteerde tags?",
  select_supertag: "Selecteer de gekoppelde supertag",
  merge: "Samenvoegen",
  merge_question: "Weet je zeker dat je wilt samenvoegen",
  and: "en",
  keep: "Behouden",
  as_principle: "als hoofdtag",
  merge_and_delete: "Samenvoegen en verwijderen",
  merge_selection: "Selectie samenvoegen",
  name: "naam",
  usage_counter: "Gebruiksteller",
  recurrence: "Herhaling",
  end_recurrence: "Herhaling beëindigen",
  never: "Nooit",
  every_month: "Elke maand",
  every_3_month: "Elke 3 maanden",
  every_6_month: "Elke 6 maanden",
  every_year: "Elk jaar",
  notification: "Melding mobiele app",
  automatic: "Automatisch",
  instant: "Onmiddellijk",
  not_notify: "Niet melden",
  validate_notification_date: "Het datumformaat van de melding is ongeldig",
  validate_notification_after_date: "De datum van de kennisgeving moet later zijn dan de datum van publicatie",
  hour: "uur",
  hours: "uren"
}, G = {
  en: {
    media: Cr,
    article: Sr
  },
  fr: {
    media: Nr,
    article: Dr
  },
  nl: {
    media: Or,
    article: Tr
  }
};
function ue(e) {
  let r = it.getState().params.language, n = e.split("."), o = n.shift(), i = n.length ? n[0] : e;
  return r || (r = "en"), G[r][o] && G[r][o][i] && G[r][o][i].length !== 0 ? G[r][o][i] : i;
}
const ce = {
  ADD_NEW_MEDIA: "ADD_NEW_MEDIA",
  ADD_NEW_ARTICLE: "ADD_NEW_ARTICLE",
  IMPORT_ARTICLE: "IMPORT_ARTICLE"
};
var le = { exports: {} };
/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
var Re;
function kr() {
  return Re || (Re = 1, (function(e) {
    (function() {
      var t = {}.hasOwnProperty;
      function r() {
        for (var i = "", a = 0; a < arguments.length; a++) {
          var s = arguments[a];
          s && (i = o(i, n(s)));
        }
        return i;
      }
      function n(i) {
        if (typeof i == "string" || typeof i == "number")
          return i;
        if (typeof i != "object")
          return "";
        if (Array.isArray(i))
          return r.apply(null, i);
        if (i.toString !== Object.prototype.toString && !i.toString.toString().includes("[native code]"))
          return i.toString();
        var a = "";
        for (var s in i)
          t.call(i, s) && i[s] && (a = o(a, s));
        return a;
      }
      function o(i, a) {
        return a ? i ? i + " " + a : i + a : i;
      }
      e.exports ? (r.default = r, e.exports = r) : window.classNames = r;
    })();
  })(le)), le.exports;
}
var Ar = kr();
const Lr = /* @__PURE__ */ ut(Ar), Mr = "_bubble_1ysey_2", xr = "_label_1ysey_24", Ir = "_icon_1ysey_32", Y = {
  bubble: Mr,
  label: xr,
  icon: Ir
}, Vr = ({ size: e = 14 }) => /* @__PURE__ */ N(
  "svg",
  {
    width: e,
    height: e,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: /* @__PURE__ */ N(
      "path",
      {
        d: "M22.1844 1.81467C20.1701 -0.204826 16.8944 -0.204826 14.8801 1.81467L1.4882 15.2032C1.3835 15.3079 1.31869 15.4425 1.29874 15.5872L0.306565 22.9371C0.27665 23.1466 0.351437 23.356 0.496026 23.5006C0.620672 23.6253 0.795175 23.7 0.969679 23.7C0.999594 23.7 1.02951 23.7 1.05942 23.6951L5.48683 23.0967C5.85578 23.0468 6.11505 22.7078 6.06519 22.3388C6.01533 21.9698 5.6763 21.7105 5.30734 21.7603L1.75744 22.239L2.45047 17.113L7.84513 22.5083C7.96977 22.633 8.14428 22.7078 8.31878 22.7078C8.49329 22.7078 8.66779 22.6379 8.79243 22.5083L22.1844 9.11977C23.1616 8.14243 23.7 6.84596 23.7 5.46473C23.7 4.08349 23.1616 2.78702 22.1844 1.81467ZM15.1394 3.46019L17.388 5.70906L5.16774 17.9308L2.91914 15.6819L15.1394 3.46019ZM8.32377 21.0822L6.12502 18.8832L18.3453 6.66147L20.544 8.86048L8.32377 21.0822ZM21.4814 7.8981L16.1017 2.51776C16.7847 1.95429 17.6373 1.64513 18.5347 1.64513C19.5568 1.64513 20.5141 2.04405 21.237 2.76209C21.96 3.48013 22.3539 4.44251 22.3539 5.46473C22.3539 6.36727 22.0448 7.21496 21.4814 7.8981Z",
        fill: "currentColor"
      }
    )
  }
), Rr = ({ size: e = 29, className: t = "" }) => /* @__PURE__ */ ye(
  "svg",
  {
    className: t,
    width: e,
    height: e,
    viewBox: "0 0 29 28",
    fill: "none",
    children: [
      /* @__PURE__ */ N(
        "path",
        {
          d: "M28.6384 10.6685C28.3637 10.3316 27.9517 10.1365 27.517 10.1374H26.9714L27.9119 7.5575C28.043 7.19612 28.0252 6.79741 27.8622 6.44923C27.6992 6.10104 27.4044 5.83195 27.0429 5.70124L11.6222 0.0870855C11.2607 -0.0442524 10.8619 -0.0264538 10.5136 0.136557C10.1653 0.299569 9.89612 0.594408 9.76542 0.956075L8.18097 5.30971H3.86112C2.79461 5.30971 1.93003 6.17429 1.93003 7.2408V10.1374H1.44726C1.01375 10.1378 0.603168 10.3323 0.328313 10.6675C0.0534579 11.0027 -0.0567688 11.4435 0.0279115 11.8687L2.86613 26.0568C3.0918 27.1852 4.08154 27.998 5.23219 28H23.732C24.8822 27.9979 25.8716 27.1856 26.0976 26.0578L28.9358 11.8691C29.0227 11.4446 28.9135 11.0034 28.6384 10.6685ZM10.6726 1.28484C10.7633 1.03455 11.0395 0.904959 11.29 0.99518L26.7141 6.60789C26.9641 6.69863 27.0937 6.97453 27.0038 7.22487L25.9431 10.1374H24.9192L25.7693 7.80227C25.8131 7.68179 25.8072 7.54884 25.7528 7.43274C25.6985 7.31664 25.6002 7.22692 25.4797 7.18335L11.8713 2.22963C11.7509 2.186 11.618 2.19201 11.502 2.24633C11.3861 2.30066 11.2964 2.39885 11.2528 2.51929L8.47642 10.1374H7.4515L10.6726 1.28484ZM23.2473 10.1374L22.3687 8.25752C22.3126 8.13759 22.2097 8.04595 22.0841 8.00405C21.9585 7.96216 21.8212 7.97368 21.7044 8.03593L17.7553 10.1374H16.0883L14.9055 7.59709C14.8496 7.47685 14.7467 7.3849 14.621 7.34281C14.4953 7.30071 14.3577 7.31219 14.2407 7.37453L9.61383 9.83667L11.9944 3.30186L24.6966 7.92537L23.8918 10.1374H23.2473ZM22.1814 10.1374H19.8109L21.7092 9.12748L22.1814 10.1374ZM15.0233 10.1374H11.1027L14.2451 8.46608L15.0233 10.1374ZM2.89558 7.2408C2.89558 6.70755 3.32787 6.27526 3.86112 6.27526H7.82951L6.42464 10.1374H2.89558V7.2408ZM27.9896 11.6789L25.1514 25.869C25.0165 26.5462 24.4224 27.0339 23.732 27.0345H5.23219C4.54188 27.0327 3.94833 26.545 3.81284 25.8681L0.974627 11.6784C0.946964 11.537 0.9839 11.3907 1.07534 11.2793C1.16679 11.168 1.30318 11.1033 1.44726 11.103H27.517C27.6611 11.1033 27.7976 11.168 27.8891 11.2795C27.9806 11.391 28.0174 11.5375 27.9896 11.6789Z",
          fill: "currentColor"
        }
      ),
      /* @__PURE__ */ N(
        "path",
        {
          d: "M3.86164 12.0703H2.8961C2.62947 12.0703 2.41333 12.2865 2.41333 12.5531C2.41333 12.8197 2.62947 13.0359 2.8961 13.0359H3.86164C4.12827 13.0359 4.34442 12.8197 4.34442 12.5531C4.34442 12.2865 4.12827 12.0703 3.86164 12.0703Z",
          fill: "currentColor"
        }
      ),
      /* @__PURE__ */ N(
        "path",
        {
          d: "M13.5174 12.0703H5.79301C5.52639 12.0703 5.31024 12.2865 5.31024 12.5531C5.31024 12.8197 5.52639 13.0359 5.79301 13.0359H13.5174C13.784 13.0359 14.0001 12.8197 14.0001 12.5531C14.0001 12.2865 13.784 12.0703 13.5174 12.0703Z",
          fill: "currentColor"
        }
      ),
      /* @__PURE__ */ N(
        "path",
        {
          d: "M16.1579 7.38865C15.9339 8.00468 16.1515 8.6944 16.6885 9.07026C17.2256 9.44612 17.9481 9.41442 18.4502 8.99296C18.9522 8.5715 19.1086 7.86538 18.8315 7.27134C18.591 6.73167 18.045 6.39395 17.4548 6.41985C16.8645 6.44575 16.3502 6.82999 16.1579 7.38865ZM17.3537 8.3373C17.1032 8.24628 16.9739 7.96949 17.0648 7.71894C17.1556 7.4684 17.4324 7.33889 17.683 7.42962C17.9336 7.52035 18.0632 7.79699 17.9726 8.04764C17.9291 8.16819 17.8393 8.26647 17.7232 8.32081C17.6071 8.37515 17.4742 8.38108 17.3537 8.3373Z",
          fill: "currentColor"
        }
      )
    ]
  }
), jr = ({ size: e = 14 }) => /* @__PURE__ */ ye(
  "svg",
  {
    width: e,
    height: e,
    viewBox: "0 0 26 26",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ N(
        "path",
        {
          d: "M13.7432 11.2714C13.4577 11.5569 13.4577 12.0146 13.7432 12.3C14.9225 13.4794 14.9225 15.3965 13.7432 16.5759L7.55012 22.769C6.37075 23.9483 4.4536 23.9483 3.27423 22.769L2.34258 21.8373C1.16321 20.6579 1.16321 18.7408 2.34258 17.5614L8.53563 11.3684C8.82104 11.083 8.82104 10.6252 8.53563 10.3398C8.25021 10.0544 7.79246 10.0544 7.50704 10.3398L1.314 16.5328C0.468517 17.3783 0 18.5038 0 19.6994C0 20.8949 0.463132 22.0204 1.314 22.8659L2.24565 23.7975C3.11806 24.67 4.26512 25.1062 5.41218 25.1062C6.55924 25.1062 7.7063 24.67 8.57871 23.7975L14.7717 17.6045C16.5166 15.8597 16.5166 13.0163 14.7717 11.2714C14.4917 10.986 14.0286 10.986 13.7432 11.2714Z",
          fill: "currentColor"
        }
      ),
      /* @__PURE__ */ N(
        "path",
        {
          d: "M24.6913 3.13419L23.7596 2.20254C22.0148 0.457715 19.1714 0.457715 17.4266 2.20254L11.2335 8.39558C9.48872 10.1404 9.48872 12.9838 11.2335 14.7286C11.519 15.0141 11.9767 15.0141 12.2621 14.7286C12.5475 14.4432 12.5475 13.9855 12.2621 13.7001C11.0828 12.5207 11.0828 10.6035 12.2621 9.42416L18.4552 3.23112C19.6345 2.05175 21.5517 2.05175 22.731 3.23112L23.6627 4.16277C24.842 5.34214 24.842 7.25929 23.6627 8.43866L17.4697 14.6317C17.1842 14.9171 17.1842 15.3749 17.4697 15.6603C17.6097 15.8003 17.7982 15.8757 17.9812 15.8757C18.1643 15.8757 18.3528 15.8057 18.4928 15.6603L24.6859 9.46724C25.5314 8.62176 25.9999 7.49624 25.9999 6.30071C25.9999 5.10519 25.5367 3.97967 24.6913 3.13419Z",
          fill: "currentColor"
        }
      )
    ]
  }
), Pr = (e, t) => {
  t.disabled;
};
function zr({ bubble: e }) {
  const t = Lr(
    Y.bubble,
    Y[e.icon],
    e.disabled ? Y.disabled : "",
    {
      "d-none": e.hidden
    }
  );
  return /* @__PURE__ */ ye(
    "div",
    {
      className: t,
      onClick: () => {
        Pr(dispatch, e);
      },
      children: [
        ((n) => {
          switch (n) {
            case "media":
              return /* @__PURE__ */ N(Rr, { size: "24" });
            case "article":
              return /* @__PURE__ */ N(Vr, { size: "20" });
            case "tamtamit":
              return /* @__PURE__ */ N(jr, { size: "20" });
            default:
              return /* @__PURE__ */ N("span", {});
          }
        })(e.icon),
        /* @__PURE__ */ N("span", { className: Y.label, children: e.label })
      ]
    }
  );
}
function Fr({ bubbles: e }) {
  return /* @__PURE__ */ N("ul", { children: e.map((t, r) => /* @__PURE__ */ N("li", { children: /* @__PURE__ */ N(zr, { bubble: t }) }, `bubble-${r}`)) });
}
const $r = "_floatWidget_1zujm_6", Br = {
  floatWidget: $r
}, Yr = (e) => {
  e.lng && e.lng;
  const t = (i) => /* @__PURE__ */ N("div", { className: Br.floatWidget, children: /* @__PURE__ */ N(Fr, { bubbles: i }) }), r = (i) => i.map((a, s) => /* @__PURE__ */ N(
    "div",
    {
      onClick: () => {
        handleClickBubble(dispatch, a);
      },
      className: `ttp-widget-btn ttp-widget-${a.icon}`,
      children: a.label
    },
    `bubble-${s}`
  )), n = [];
  e.media && n.push({
    icon: "media",
    label: ue("media.medias"),
    event: ce.ADD_NEW_MEDIA
  }), e.article && n.push({
    icon: "article",
    label: ue("article.add_new_article"),
    event: ce.ADD_NEW_ARTICLE
  }), e.tamtamit && n.push({
    icon: "tamtamit",
    label: ue("article.import"),
    event: ce.IMPORT_ARTICLE
  });
  const o = e.layout ? e.layout : "float";
  return /* @__PURE__ */ N(St, { store: it, children: /* @__PURE__ */ N("div", { id: "ttp-widget", children: o === "float" ? t(n) : r() }) });
};
export {
  Yr as TamtamArticleWidget
};
