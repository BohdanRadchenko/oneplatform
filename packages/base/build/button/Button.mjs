import { jsx as c, Fragment as d } from "react/jsx-runtime";
import * as i from "react";
import { buttonVariants as y } from "./buttonVariants.mjs";
import { cn as g } from "@radchenkobohdan/utils";
function p(e, n) {
  if (typeof e == "function")
    return e(n);
  e != null && (e.current = n);
}
function h(...e) {
  return (n) => {
    let t = !1;
    const o = e.map((r) => {
      const l = p(r, n);
      return !t && typeof l == "function" && (t = !0), l;
    });
    if (t)
      return () => {
        for (let r = 0; r < o.length; r++) {
          const l = o[r];
          typeof l == "function" ? l() : p(e[r], null);
        }
      };
  };
}
var m = i.forwardRef((e, n) => {
  const { children: t, ...o } = e, r = i.Children.toArray(t), l = r.find(R);
  if (l) {
    const s = l.props.children, a = r.map((u) => u === l ? i.Children.count(s) > 1 ? i.Children.only(null) : i.isValidElement(s) ? s.props.children : null : u);
    return /* @__PURE__ */ c(f, { ...o, ref: n, children: i.isValidElement(s) ? i.cloneElement(s, void 0, a) : null });
  }
  return /* @__PURE__ */ c(f, { ...o, ref: n, children: t });
});
m.displayName = "Slot";
var f = i.forwardRef((e, n) => {
  const { children: t, ...o } = e;
  if (i.isValidElement(t)) {
    const r = b(t);
    return i.cloneElement(t, {
      ...E(o, t.props),
      // @ts-ignore
      ref: n ? h(n, r) : r
    });
  }
  return i.Children.count(t) > 1 ? i.Children.only(null) : null;
});
f.displayName = "SlotClone";
var C = ({ children: e }) => /* @__PURE__ */ c(d, { children: e });
function R(e) {
  return i.isValidElement(e) && e.type === C;
}
function E(e, n) {
  const t = { ...n };
  for (const o in n) {
    const r = e[o], l = n[o];
    /^on[A-Z]/.test(o) ? r && l ? t[o] = (...a) => {
      l(...a), r(...a);
    } : r && (t[o] = r) : o === "style" ? t[o] = { ...r, ...l } : o === "className" && (t[o] = [r, l].filter(Boolean).join(" "));
  }
  return { ...e, ...t };
}
function b(e) {
  var o, r;
  let n = (o = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : o.get, t = n && "isReactWarning" in n && n.isReactWarning;
  return t ? e.ref : (n = (r = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : r.get, t = n && "isReactWarning" in n && n.isReactWarning, t ? e.props.ref : e.props.ref || e.ref);
}
const V = i.forwardRef(
  ({ className: e, variant: n, size: t, asChild: o = !1, ...r }, l) => /* @__PURE__ */ c(
    o ? m : "button",
    {
      className: g(y({ variant: n, size: t, className: e })),
      ref: l,
      ...r
    }
  )
);
V.displayName = "Button";
export {
  V as Button,
  V as default
};
