import {r as a, j as e} from "./jsx-runtime-D8ipelNA.js";
import {c as p} from "./clsx-B-dksMZM.js";
import {f as y, _ as v, L as b, M as N, h as S, S as E} from "./components-LZlsSOIh.js";
import {m as u} from "./proxy-KTLhuSMa.js";
import {u as L, j as R, O as M, y as k, v as z} from "./index-DW5Wj4fb.js";
import {a as I} from "./index-viHZjtiN.js";
/**
 * @remix-run/react v2.11.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
let h = "positions";
function B({getKey: t, ...s}) {
    let {isSpaMode: n} = y()
      , i = L()
      , m = R();
    I({
        getKey: t,
        storageKey: h
    });
    let l = a.useMemo( () => {
        if (!t)
            return null;
        let r = t(i, m);
        return r !== i.key ? r : null
    }
    , []);
    if (n)
        return null;
    let o = ( (r, j) => {
        if (!window.history.state || !window.history.state.key) {
            let c = Math.random().toString(32).slice(2);
            window.history.replaceState({
                key: c
            }, "")
        }
        try {
            let f = JSON.parse(sessionStorage.getItem(r) || "{}")[j || window.history.state.key];
            typeof f == "number" && window.scrollTo(0, f)
        } catch (c) {
            console.error(c),
            sessionStorage.removeItem(r)
        }
    }
    ).toString();
    return a.createElement("script", v({}, s, {
        suppressHydrationWarning: !0,
        dangerouslySetInnerHTML: {
            __html: `(${o})(${JSON.stringify(h)}, ${JSON.stringify(l)})`
        }
    }))
}
function G() {
    const [t,s] = a.useState({
        width: void 0,
        height: void 0
    });
    return a.useEffect( () => {
        function n() {
            s({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }
        return window.addEventListener("resize", n),
        n(),
        () => window.removeEventListener("resize", n)
    }
    , []),
    t
}
const x = {
    rotate: [15, -15, 15],
    y: [0, -10, 0, 0]
}
  , w = {
    rotate: [-15, 15, -15],
    y: [0, 0, -10, 0]
};
function d({dark: t, face: s, butt: n}) {
    return e.jsx("div", {
        className: "w-0",
        children: e.jsxs("div", {
            className: "relative w-32 h-40",
            children: [e.jsx(u.div, {
                animate: {
                    y: t ? [-5, 0, -5] : [0, -5, 0]
                },
                transition: {
                    repeat: 1 / 0,
                    duration: 1,
                    ease: "easeInOut"
                },
                className: p(n ? " w-48 h-44 -top-[50px] -left-4" : "w-32 h-32", "rounded-full absolute shadow-lg", t ? "bg-purple-800" : "bg-purple-500"),
                children: s && e.jsxs(e.Fragment, {
                    children: [e.jsx("div", {
                        className: "absolute w-4 h-24 -top-9 bg-amber-900 left-4 rounded-lg -rotate-12 "
                    }), e.jsx("div", {
                        className: "absolute w-20 h-14 -left-6 -top-12 rounded-lg -rotate-12 bg-slate-300 text-black font-bold flex items-center justify-center",
                        children: "oops"
                    }), e.jsxs("div", {
                        className: "absolute z-50 left-[50%] top-6 font-black text-4xl font-sans",
                        children: [e.jsx("span", {
                            className: "absolute text-purple-300",
                            children: "4"
                        }), e.jsx("span", {
                            className: "absolute left-6 top-6 text-purple-900",
                            children: "0"
                        }), e.jsx("span", {
                            className: "absolute left-12 text-purple-300",
                            children: "4"
                        })]
                    })]
                })
            }), e.jsx(u.div, {
                animate: t ? x : w,
                transition: {
                    repeat: 1 / 0,
                    duration: 1,
                    ease: "linear"
                },
                className: p("w-4 h-12 rounded-lg absolute left-[24px] top-[96px] origin-top", t ? "bg-purple-800" : "bg-purple-500")
            }), e.jsx(u.div, {
                animate: t ? w : x,
                transition: {
                    repeat: 1 / 0,
                    duration: 1,
                    ease: "linear"
                },
                className: p("w-4 h-12 rounded-lg absolute -z-10 left-[88px] top-[96px] origin-top", t ? "bg-purple-900" : "bg-purple-600")
            })]
        })
    })
}
function O() {
    const {width: t} = G();
    if (!t)
        return null;
    const s = t / 50;
    return e.jsxs("div", {
        className: "w-full overflow-hidden min-h-screen flex flex-col",
        children: [e.jsxs("div", {
            className: "flex flex-col items-center justify-center w-full mt-6 flex-1",
            children: [e.jsx("div", {
                className: "text-9xl font-bold font-sans flex",
                children: "404"
            }), e.jsx("div", {
                className: "mt-6 mb-24",
                children: e.jsx(b, {
                    to: "/",
                    children: "Go back home"
                })
            })]
        }), e.jsxs(u.div, {
            animate: {
                x: [-340, t + 80]
            },
            transition: {
                ease: "linear",
                duration: s,
                repeat: 1 / 0
            },
            className: "flex relative space-x-16 w-[320px]",
            children: [e.jsx(d, {
                dark: !0,
                butt: !0
            }), e.jsx(d, {}), e.jsx(d, {
                dark: !0
            }), e.jsx(d, {
                face: !0
            })]
        })]
    })
}
let g = !1;
function T() {
    g || (g = !0,
    function(t, s, n, i, m) {
        t[i] = t[i] || [],
        t[i].push({
            "gtm.start": new Date().getTime(),
            event: "gtm.js"
        });
        var l = s.getElementsByTagName(n)[0]
          , o = s.createElement(n)
          , r = "";
        o.async = !0,
        o.src = "https://www.googletagmanager.com/gtm.js?id=" + m + r,
        l.parentNode.insertBefore(o, l)
    }(window, document, "script", "dataLayer", "GTM-KFRSNWJ6"))
}
const W = "/assets/tailwind-BHRh7Zvt.css"
  , C = () => [{
    rel: "stylesheet",
    href: W
}];
function K() {
    const t = k();
    if (z(t) && t.status === 404)
        return e.jsx(O, {});
    throw t
}
function D({children: t}) {
    return a.useEffect( () => {
        T()
    }
    , []),
    e.jsxs("html", {
        lang: "en",
        children: [e.jsxs("head", {
            children: [e.jsx("meta", {
                charSet: "utf-8"
            }), e.jsx("meta", {
                name: "viewport",
                content: "width=device-width, initial-scale=1"
            }), e.jsx(N, {}), e.jsx(S, {})]
        }), e.jsxs("body", {
            style: {
                fontFamily: "Poppins, sans-serif"
            },
            children: [e.jsx("noscript", {
                children: e.jsx("iframe", {
                    title: "gtm",
                    src: "https://www.googletagmanager.com/ns.html?id=GTM-KFRSNWJ6",
                    height: "0",
                    width: "0",
                    style: {
                        display: "none",
                        visibility: "hidden"
                    }
                })
            }), t, e.jsx(B, {}), e.jsx(E, {})]
        })]
    })
}
function P() {
    return e.jsx(M, {})
}
export {K as ErrorBoundary, D as Layout, P as default, C as links};
