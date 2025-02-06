import {r as P, j as he} from "./jsx-runtime-D8ipelNA.js";
function Gi(t) {
    if (typeof Proxy > "u")
        return t;
    const e = new Map
      , n = (...s) => t(...s);
    return new Proxy(n,{
        get: (s, i) => i === "create" ? t : (e.has(i) || e.set(i, t(i)),
        e.get(i))
    })
}
function Pt(t) {
    return t !== null && typeof t == "object" && typeof t.start == "function"
}
const fe = t => Array.isArray(t);
function gs(t, e) {
    if (!Array.isArray(e))
        return !1;
    const n = e.length;
    if (n !== t.length)
        return !1;
    for (let s = 0; s < n; s++)
        if (e[s] !== t[s])
            return !1;
    return !0
}
function St(t) {
    return typeof t == "string" || Array.isArray(t)
}
function en(t) {
    const e = [{}, {}];
    return t == null || t.values.forEach( (n, s) => {
        e[0][s] = n.get(),
        e[1][s] = n.getVelocity()
    }
    ),
    e
}
function Ce(t, e, n, s) {
    if (typeof e == "function") {
        const [i,r] = en(s);
        e = e(n !== void 0 ? n : t.custom, i, r)
    }
    if (typeof e == "string" && (e = t.variants && t.variants[e]),
    typeof e == "function") {
        const [i,r] = en(s);
        e = e(n !== void 0 ? n : t.custom, i, r)
    }
    return e
}
function _t(t, e, n) {
    const s = t.getProps();
    return Ce(s, e, n !== void 0 ? n : s.custom, t)
}
const Me = ["animate", "whileInView", "whileFocus", "whileHover", "whileTap", "whileDrag", "exit"]
  , De = ["initial", ...Me]
  , wt = ["transformPerspective", "x", "y", "z", "translateX", "translateY", "translateZ", "scale", "scaleX", "scaleY", "rotate", "rotateX", "rotateY", "rotateZ", "skew", "skewX", "skewY"]
  , J = new Set(wt)
  , _ = t => t * 1e3
  , K = t => t / 1e3
  , $i = {
    type: "spring",
    stiffness: 500,
    damping: 25,
    restSpeed: 10
}
  , Hi = t => ({
    type: "spring",
    stiffness: 550,
    damping: t === 0 ? 2 * Math.sqrt(550) : 30,
    restSpeed: 10
})
  , zi = {
    type: "keyframes",
    duration: .8
}
  , Xi = {
    type: "keyframes",
    ease: [.25, .1, .35, 1],
    duration: .3
}
  , Yi = (t, {keyframes: e}) => e.length > 2 ? zi : J.has(t) ? t.startsWith("scale") ? Hi(e[1]) : $i : Xi;
function qi({when: t, delay: e, delayChildren: n, staggerChildren: s, staggerDirection: i, repeat: r, repeatType: o, repeatDelay: l, from: a, elapsed: u, ...h}) {
    return !!Object.keys(h).length
}
function Re(t, e) {
    return t[e] || t.default || t
}
const Zi = {
    skipAnimations: !1,
    useManualTiming: !1
}
  , Ji = t => t !== null;
function Kt(t, {repeat: e, repeatType: n="loop"}, s) {
    const i = t.filter(Ji)
      , r = e && n !== "loop" && e % 2 === 1 ? 0 : i.length - 1;
    return !r || s === void 0 ? i[r] : s
}
const L = t => t;
function Qi(t) {
    let e = new Set
      , n = new Set
      , s = !1
      , i = !1;
    const r = new WeakSet;
    let o = {
        delta: 0,
        timestamp: 0,
        isProcessing: !1
    };
    function l(u) {
        r.has(u) && (a.schedule(u),
        t()),
        u(o)
    }
    const a = {
        schedule: (u, h=!1, c=!1) => {
            const d = c && s ? e : n;
            return h && r.add(u),
            d.has(u) || d.add(u),
            u
        }
        ,
        cancel: u => {
            n.delete(u),
            r.delete(u)
        }
        ,
        process: u => {
            if (o = u,
            s) {
                i = !0;
                return
            }
            s = !0,
            [e,n] = [n, e],
            n.clear(),
            e.forEach(l),
            s = !1,
            i && (i = !1,
            a.process(u))
        }
    };
    return a
}
const Rt = ["read", "resolveKeyframes", "update", "preRender", "render", "postRender"]
  , to = 40;
function ys(t, e) {
    let n = !1
      , s = !0;
    const i = {
        delta: 0,
        timestamp: 0,
        isProcessing: !1
    }
      , r = () => n = !0
      , o = Rt.reduce( (m, x) => (m[x] = Qi(r),
    m), {})
      , {read: l, resolveKeyframes: a, update: u, preRender: h, render: c, postRender: f} = o
      , d = () => {
        const m = performance.now();
        n = !1,
        i.delta = s ? 1e3 / 60 : Math.max(Math.min(m - i.timestamp, to), 1),
        i.timestamp = m,
        i.isProcessing = !0,
        l.process(i),
        a.process(i),
        u.process(i),
        h.process(i),
        c.process(i),
        f.process(i),
        i.isProcessing = !1,
        n && e && (s = !1,
        t(d))
    }
      , p = () => {
        n = !0,
        s = !0,
        i.isProcessing || t(d)
    }
    ;
    return {
        schedule: Rt.reduce( (m, x) => {
            const y = o[x];
            return m[x] = (S, A=!1, M=!1) => (n || p(),
            y.schedule(S, A, M)),
            m
        }
        , {}),
        cancel: m => {
            for (let x = 0; x < Rt.length; x++)
                o[Rt[x]].cancel(m)
        }
        ,
        state: i,
        steps: o
    }
}
const {schedule: V, cancel: z, state: D, steps: Jt} = ys(typeof requestAnimationFrame < "u" ? requestAnimationFrame : L, !0)
  , vs = t => /^0[^.\s]+$/u.test(t);
function eo(t) {
    return typeof t == "number" ? t === 0 : t !== null ? t === "none" || t === "0" || vs(t) : !0
}
let de = L;
const xs = t => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(t)
  , Ts = t => e => typeof e == "string" && e.startsWith(t)
  , Ps = Ts("--")
  , no = Ts("var(--")
  , Ee = t => no(t) ? so.test(t.split("/*")[0].trim()) : !1
  , so = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu
  , io = /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;
function oo(t) {
    const e = io.exec(t);
    if (!e)
        return [, ];
    const [,n,s,i] = e;
    return [`--${n ?? s}`, i]
}
function Ss(t, e, n=1) {
    const [s,i] = oo(t);
    if (!s)
        return;
    const r = window.getComputedStyle(e).getPropertyValue(s);
    if (r) {
        const o = r.trim();
        return xs(o) ? parseFloat(o) : o
    }
    return Ee(i) ? Ss(i, e, n + 1) : i
}
const q = (t, e, n) => n > e ? e : n < t ? t : n
  , dt = {
    test: t => typeof t == "number",
    parse: parseFloat,
    transform: t => t
}
  , yt = {
    ...dt,
    transform: t => q(0, 1, t)
}
  , Et = {
    ...dt,
    default: 1
}
  , vt = t => Math.round(t * 1e5) / 1e5
  , Le = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu
  , ro = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu
  , ao = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu;
function Ct(t) {
    return typeof t == "string"
}
function lo(t) {
    return t == null
}
const Mt = t => ({
    test: e => Ct(e) && e.endsWith(t) && e.split(" ").length === 1,
    parse: parseFloat,
    transform: e => `${e}${t}`
})
  , Y = Mt("deg")
  , N = Mt("%")
  , T = Mt("px")
  , uo = Mt("vh")
  , co = Mt("vw")
  , nn = {
    ...N,
    parse: t => N.parse(t) / 100,
    transform: t => N.transform(t * 100)
}
  , ho = new Set(["width", "height", "top", "left", "right", "bottom", "x", "y", "translateX", "translateY"])
  , sn = t => t === dt || t === T
  , on = (t, e) => parseFloat(t.split(", ")[e])
  , rn = (t, e) => (n, {transform: s}) => {
    if (s === "none" || !s)
        return 0;
    const i = s.match(/^matrix3d\((.+)\)$/u);
    if (i)
        return on(i[1], e);
    {
        const r = s.match(/^matrix\((.+)\)$/u);
        return r ? on(r[1], t) : 0
    }
}
  , fo = new Set(["x", "y", "z"])
  , po = wt.filter(t => !fo.has(t));
function mo(t) {
    const e = [];
    return po.forEach(n => {
        const s = t.getValue(n);
        s !== void 0 && (e.push([n, s.get()]),
        s.set(n.startsWith("scale") ? 1 : 0))
    }
    ),
    e
}
const ht = {
    width: ({x: t}, {paddingLeft: e="0", paddingRight: n="0"}) => t.max - t.min - parseFloat(e) - parseFloat(n),
    height: ({y: t}, {paddingTop: e="0", paddingBottom: n="0"}) => t.max - t.min - parseFloat(e) - parseFloat(n),
    top: (t, {top: e}) => parseFloat(e),
    left: (t, {left: e}) => parseFloat(e),
    bottom: ({y: t}, {top: e}) => parseFloat(e) + (t.max - t.min),
    right: ({x: t}, {left: e}) => parseFloat(e) + (t.max - t.min),
    x: rn(4, 13),
    y: rn(5, 14)
};
ht.translateX = ht.x;
ht.translateY = ht.y;
const As = t => e => e.test(t)
  , go = {
    test: t => t === "auto",
    parse: t => t
}
  , bs = [dt, T, N, Y, co, uo, go]
  , an = t => bs.find(As(t))
  , it = new Set;
let pe = !1
  , me = !1;
function Vs() {
    if (me) {
        const t = Array.from(it).filter(s => s.needsMeasurement)
          , e = new Set(t.map(s => s.element))
          , n = new Map;
        e.forEach(s => {
            const i = mo(s);
            i.length && (n.set(s, i),
            s.render())
        }
        ),
        t.forEach(s => s.measureInitialState()),
        e.forEach(s => {
            s.render();
            const i = n.get(s);
            i && i.forEach( ([r,o]) => {
                var l;
                (l = s.getValue(r)) === null || l === void 0 || l.set(o)
            }
            )
        }
        ),
        t.forEach(s => s.measureEndState()),
        t.forEach(s => {
            s.suspendedScrollY !== void 0 && window.scrollTo(0, s.suspendedScrollY)
        }
        )
    }
    me = !1,
    pe = !1,
    it.forEach(t => t.complete()),
    it.clear()
}
function ws() {
    it.forEach(t => {
        t.readKeyframes(),
        t.needsMeasurement && (me = !0)
    }
    )
}
function yo() {
    ws(),
    Vs()
}
class Fe {
    constructor(e, n, s, i, r, o=!1) {
        this.isComplete = !1,
        this.isAsync = !1,
        this.needsMeasurement = !1,
        this.isScheduled = !1,
        this.unresolvedKeyframes = [...e],
        this.onComplete = n,
        this.name = s,
        this.motionValue = i,
        this.element = r,
        this.isAsync = o
    }
    scheduleResolve() {
        this.isScheduled = !0,
        this.isAsync ? (it.add(this),
        pe || (pe = !0,
        V.read(ws),
        V.resolveKeyframes(Vs))) : (this.readKeyframes(),
        this.complete())
    }
    readKeyframes() {
        const {unresolvedKeyframes: e, name: n, element: s, motionValue: i} = this;
        for (let r = 0; r < e.length; r++)
            if (e[r] === null)
                if (r === 0) {
                    const o = i == null ? void 0 : i.get()
                      , l = e[e.length - 1];
                    if (o !== void 0)
                        e[0] = o;
                    else if (s && n) {
                        const a = s.readValue(n, l);
                        a != null && (e[0] = a)
                    }
                    e[0] === void 0 && (e[0] = l),
                    i && o === void 0 && i.set(e[0])
                } else
                    e[r] = e[r - 1]
    }
    setFinalKeyframe() {}
    measureInitialState() {}
    renderEndStyles() {}
    measureEndState() {}
    complete() {
        this.isComplete = !0,
        this.onComplete(this.unresolvedKeyframes, this.finalKeyframe),
        it.delete(this)
    }
    cancel() {
        this.isComplete || (this.isScheduled = !1,
        it.delete(this))
    }
    resume() {
        this.isComplete || this.scheduleResolve()
    }
}
const Be = (t, e) => n => !!(Ct(n) && ao.test(n) && n.startsWith(t) || e && !lo(n) && Object.prototype.hasOwnProperty.call(n, e))
  , Cs = (t, e, n) => s => {
    if (!Ct(s))
        return s;
    const [i,r,o,l] = s.match(Le);
    return {
        [t]: parseFloat(i),
        [e]: parseFloat(r),
        [n]: parseFloat(o),
        alpha: l !== void 0 ? parseFloat(l) : 1
    }
}
  , vo = t => q(0, 255, t)
  , Qt = {
    ...dt,
    transform: t => Math.round(vo(t))
}
  , st = {
    test: Be("rgb", "red"),
    parse: Cs("red", "green", "blue"),
    transform: ({red: t, green: e, blue: n, alpha: s=1}) => "rgba(" + Qt.transform(t) + ", " + Qt.transform(e) + ", " + Qt.transform(n) + ", " + vt(yt.transform(s)) + ")"
};
function xo(t) {
    let e = ""
      , n = ""
      , s = ""
      , i = "";
    return t.length > 5 ? (e = t.substring(1, 3),
    n = t.substring(3, 5),
    s = t.substring(5, 7),
    i = t.substring(7, 9)) : (e = t.substring(1, 2),
    n = t.substring(2, 3),
    s = t.substring(3, 4),
    i = t.substring(4, 5),
    e += e,
    n += n,
    s += s,
    i += i),
    {
        red: parseInt(e, 16),
        green: parseInt(n, 16),
        blue: parseInt(s, 16),
        alpha: i ? parseInt(i, 16) / 255 : 1
    }
}
const ge = {
    test: Be("#"),
    parse: xo,
    transform: st.transform
}
  , rt = {
    test: Be("hsl", "hue"),
    parse: Cs("hue", "saturation", "lightness"),
    transform: ({hue: t, saturation: e, lightness: n, alpha: s=1}) => "hsla(" + Math.round(t) + ", " + N.transform(vt(e)) + ", " + N.transform(vt(n)) + ", " + vt(yt.transform(s)) + ")"
}
  , R = {
    test: t => st.test(t) || ge.test(t) || rt.test(t),
    parse: t => st.test(t) ? st.parse(t) : rt.test(t) ? rt.parse(t) : ge.parse(t),
    transform: t => Ct(t) ? t : t.hasOwnProperty("red") ? st.transform(t) : rt.transform(t)
};
function To(t) {
    var e, n;
    return isNaN(t) && Ct(t) && (((e = t.match(Le)) === null || e === void 0 ? void 0 : e.length) || 0) + (((n = t.match(ro)) === null || n === void 0 ? void 0 : n.length) || 0) > 0
}
const Ms = "number"
  , Ds = "color"
  , Po = "var"
  , So = "var("
  , ln = "${}"
  , Ao = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function At(t) {
    const e = t.toString()
      , n = []
      , s = {
        color: [],
        number: [],
        var: []
    }
      , i = [];
    let r = 0;
    const l = e.replace(Ao, a => (R.test(a) ? (s.color.push(r),
    i.push(Ds),
    n.push(R.parse(a))) : a.startsWith(So) ? (s.var.push(r),
    i.push(Po),
    n.push(a)) : (s.number.push(r),
    i.push(Ms),
    n.push(parseFloat(a))),
    ++r,
    ln)).split(ln);
    return {
        values: n,
        split: l,
        indexes: s,
        types: i
    }
}
function Rs(t) {
    return At(t).values
}
function Es(t) {
    const {split: e, types: n} = At(t)
      , s = e.length;
    return i => {
        let r = "";
        for (let o = 0; o < s; o++)
            if (r += e[o],
            i[o] !== void 0) {
                const l = n[o];
                l === Ms ? r += vt(i[o]) : l === Ds ? r += R.transform(i[o]) : r += i[o]
            }
        return r
    }
}
const bo = t => typeof t == "number" ? 0 : t;
function Vo(t) {
    const e = Rs(t);
    return Es(t)(e.map(bo))
}
const Z = {
    test: To,
    parse: Rs,
    createTransformer: Es,
    getAnimatableNone: Vo
}
  , wo = new Set(["brightness", "contrast", "saturate", "opacity"]);
function Co(t) {
    const [e,n] = t.slice(0, -1).split("(");
    if (e === "drop-shadow")
        return t;
    const [s] = n.match(Le) || [];
    if (!s)
        return t;
    const i = n.replace(s, "");
    let r = wo.has(e) ? 1 : 0;
    return s !== n && (r *= 100),
    e + "(" + r + i + ")"
}
const Mo = /\b([a-z-]*)\(.*?\)/gu
  , ye = {
    ...Z,
    getAnimatableNone: t => {
        const e = t.match(Mo);
        return e ? e.map(Co).join(" ") : t
    }
}
  , un = {
    ...dt,
    transform: Math.round
}
  , ke = {
    borderWidth: T,
    borderTopWidth: T,
    borderRightWidth: T,
    borderBottomWidth: T,
    borderLeftWidth: T,
    borderRadius: T,
    radius: T,
    borderTopLeftRadius: T,
    borderTopRightRadius: T,
    borderBottomRightRadius: T,
    borderBottomLeftRadius: T,
    width: T,
    maxWidth: T,
    height: T,
    maxHeight: T,
    size: T,
    top: T,
    right: T,
    bottom: T,
    left: T,
    padding: T,
    paddingTop: T,
    paddingRight: T,
    paddingBottom: T,
    paddingLeft: T,
    margin: T,
    marginTop: T,
    marginRight: T,
    marginBottom: T,
    marginLeft: T,
    rotate: Y,
    rotateX: Y,
    rotateY: Y,
    rotateZ: Y,
    scale: Et,
    scaleX: Et,
    scaleY: Et,
    scaleZ: Et,
    skew: Y,
    skewX: Y,
    skewY: Y,
    distance: T,
    translateX: T,
    translateY: T,
    translateZ: T,
    x: T,
    y: T,
    z: T,
    perspective: T,
    transformPerspective: T,
    opacity: yt,
    originX: nn,
    originY: nn,
    originZ: T,
    zIndex: un,
    backgroundPositionX: T,
    backgroundPositionY: T,
    fillOpacity: yt,
    strokeOpacity: yt,
    numOctaves: un
}
  , Do = {
    ...ke,
    color: R,
    backgroundColor: R,
    outlineColor: R,
    fill: R,
    stroke: R,
    borderColor: R,
    borderTopColor: R,
    borderRightColor: R,
    borderBottomColor: R,
    borderLeftColor: R,
    filter: ye,
    WebkitFilter: ye
}
  , je = t => Do[t];
function Ls(t, e) {
    let n = je(t);
    return n !== ye && (n = Z),
    n.getAnimatableNone ? n.getAnimatableNone(e) : void 0
}
const Ro = new Set(["auto", "none", "0"]);
function Eo(t, e, n) {
    let s = 0, i;
    for (; s < t.length && !i; ) {
        const r = t[s];
        typeof r == "string" && !Ro.has(r) && At(r).values.length && (i = t[s]),
        s++
    }
    if (i && n)
        for (const r of e)
            t[r] = Ls(n, i)
}
class Fs extends Fe {
    constructor(e, n, s, i, r) {
        super(e, n, s, i, r, !0)
    }
    readKeyframes() {
        const {unresolvedKeyframes: e, element: n, name: s} = this;
        if (!n || !n.current)
            return;
        super.readKeyframes();
        for (let a = 0; a < e.length; a++) {
            let u = e[a];
            if (typeof u == "string" && (u = u.trim(),
            Ee(u))) {
                const h = Ss(u, n.current);
                h !== void 0 && (e[a] = h),
                a === e.length - 1 && (this.finalKeyframe = u)
            }
        }
        if (this.resolveNoneKeyframes(),
        !ho.has(s) || e.length !== 2)
            return;
        const [i,r] = e
          , o = an(i)
          , l = an(r);
        if (o !== l)
            if (sn(o) && sn(l))
                for (let a = 0; a < e.length; a++) {
                    const u = e[a];
                    typeof u == "string" && (e[a] = parseFloat(u))
                }
            else
                this.needsMeasurement = !0
    }
    resolveNoneKeyframes() {
        const {unresolvedKeyframes: e, name: n} = this
          , s = [];
        for (let i = 0; i < e.length; i++)
            eo(e[i]) && s.push(i);
        s.length && Eo(e, s, n)
    }
    measureInitialState() {
        const {element: e, unresolvedKeyframes: n, name: s} = this;
        if (!e || !e.current)
            return;
        s === "height" && (this.suspendedScrollY = window.pageYOffset),
        this.measuredOrigin = ht[s](e.measureViewportBox(), window.getComputedStyle(e.current)),
        n[0] = this.measuredOrigin;
        const i = n[n.length - 1];
        i !== void 0 && e.getValue(s, i).jump(i, !1)
    }
    measureEndState() {
        var e;
        const {element: n, name: s, unresolvedKeyframes: i} = this;
        if (!n || !n.current)
            return;
        const r = n.getValue(s);
        r && r.jump(this.measuredOrigin, !1);
        const o = i.length - 1
          , l = i[o];
        i[o] = ht[s](n.measureViewportBox(), window.getComputedStyle(n.current)),
        l !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = l),
        !((e = this.removedTransforms) === null || e === void 0) && e.length && this.removedTransforms.forEach( ([a,u]) => {
            n.getValue(a).set(u)
        }
        ),
        this.resolveNoneKeyframes()
    }
}
function Bs(t) {
    let e;
    return () => (e === void 0 && (e = t()),
    e)
}
let Ft;
function Lo() {
    Ft = void 0
}
const G = {
    now: () => (Ft === void 0 && G.set(D.isProcessing || Zi.useManualTiming ? D.timestamp : performance.now()),
    Ft),
    set: t => {
        Ft = t,
        queueMicrotask(Lo)
    }
}
  , cn = (t, e) => e === "zIndex" ? !1 : !!(typeof t == "number" || Array.isArray(t) || typeof t == "string" && (Z.test(t) || t === "0") && !t.startsWith("url("));
function Fo(t) {
    const e = t[0];
    if (t.length === 1)
        return !0;
    for (let n = 0; n < t.length; n++)
        if (t[n] !== e)
            return !0
}
function Bo(t, e, n, s) {
    const i = t[0];
    if (i === null)
        return !1;
    if (e === "display" || e === "visibility")
        return !0;
    const r = t[t.length - 1]
      , o = cn(i, e)
      , l = cn(r, e);
    return !o || !l ? !1 : Fo(t) || n === "spring" && s
}
const ko = 40;
class ks {
    constructor({autoplay: e=!0, delay: n=0, type: s="keyframes", repeat: i=0, repeatDelay: r=0, repeatType: o="loop", ...l}) {
        this.isStopped = !1,
        this.hasAttemptedResolve = !1,
        this.createdAt = G.now(),
        this.options = {
            autoplay: e,
            delay: n,
            type: s,
            repeat: i,
            repeatDelay: r,
            repeatType: o,
            ...l
        },
        this.updateFinishedPromise()
    }
    calcStartTime() {
        return this.resolvedAt ? this.resolvedAt - this.createdAt > ko ? this.resolvedAt : this.createdAt : this.createdAt
    }
    get resolved() {
        return !this._resolved && !this.hasAttemptedResolve && yo(),
        this._resolved
    }
    onKeyframesResolved(e, n) {
        this.resolvedAt = G.now(),
        this.hasAttemptedResolve = !0;
        const {name: s, type: i, velocity: r, delay: o, onComplete: l, onUpdate: a, isGenerator: u} = this.options;
        if (!u && !Bo(e, s, i, r))
            if (o)
                this.options.duration = 0;
            else {
                a == null || a(Kt(e, this.options, n)),
                l == null || l(),
                this.resolveFinishedPromise();
                return
            }
        const h = this.initPlayback(e, n);
        h !== !1 && (this._resolved = {
            keyframes: e,
            finalKeyframe: n,
            ...h
        },
        this.onPostResolved())
    }
    onPostResolved() {}
    then(e, n) {
        return this.currentFinishedPromise.then(e, n)
    }
    updateFinishedPromise() {
        this.currentFinishedPromise = new Promise(e => {
            this.resolveFinishedPromise = e
        }
        )
    }
}
function js(t, e) {
    return e ? t * (1e3 / e) : 0
}
const jo = 5;
function Os(t, e, n) {
    const s = Math.max(e - jo, 0);
    return js(n - t(s), e - s)
}
const te = .001
  , Oo = .01
  , Io = 10
  , No = .05
  , Uo = 1;
function Wo({duration: t=800, bounce: e=.25, velocity: n=0, mass: s=1}) {
    let i, r, o = 1 - e;
    o = q(No, Uo, o),
    t = q(Oo, Io, K(t)),
    o < 1 ? (i = u => {
        const h = u * o
          , c = h * t
          , f = h - n
          , d = ve(u, o)
          , p = Math.exp(-c);
        return te - f / d * p
    }
    ,
    r = u => {
        const c = u * o * t
          , f = c * n + n
          , d = Math.pow(o, 2) * Math.pow(u, 2) * t
          , p = Math.exp(-c)
          , g = ve(Math.pow(u, 2), o);
        return (-i(u) + te > 0 ? -1 : 1) * ((f - d) * p) / g
    }
    ) : (i = u => {
        const h = Math.exp(-u * t)
          , c = (u - n) * t + 1;
        return -te + h * c
    }
    ,
    r = u => {
        const h = Math.exp(-u * t)
          , c = (n - u) * (t * t);
        return h * c
    }
    );
    const l = 5 / t
      , a = Ko(i, r, l);
    if (t = _(t),
    isNaN(a))
        return {
            stiffness: 100,
            damping: 10,
            duration: t
        };
    {
        const u = Math.pow(a, 2) * s;
        return {
            stiffness: u,
            damping: o * 2 * Math.sqrt(s * u),
            duration: t
        }
    }
}
const _o = 12;
function Ko(t, e, n) {
    let s = n;
    for (let i = 1; i < _o; i++)
        s = s - t(s) / e(s);
    return s
}
function ve(t, e) {
    return t * Math.sqrt(1 - e * e)
}
const Go = ["duration", "bounce"]
  , $o = ["stiffness", "damping", "mass"];
function hn(t, e) {
    return e.some(n => t[n] !== void 0)
}
function Ho(t) {
    let e = {
        velocity: 0,
        stiffness: 100,
        damping: 10,
        mass: 1,
        isResolvedFromDuration: !1,
        ...t
    };
    if (!hn(t, $o) && hn(t, Go)) {
        const n = Wo(t);
        e = {
            ...e,
            ...n,
            mass: 1
        },
        e.isResolvedFromDuration = !0
    }
    return e
}
function Is({keyframes: t, restDelta: e, restSpeed: n, ...s}) {
    const i = t[0]
      , r = t[t.length - 1]
      , o = {
        done: !1,
        value: i
    }
      , {stiffness: l, damping: a, mass: u, duration: h, velocity: c, isResolvedFromDuration: f} = Ho({
        ...s,
        velocity: -K(s.velocity || 0)
    })
      , d = c || 0
      , p = a / (2 * Math.sqrt(l * u))
      , g = r - i
      , v = K(Math.sqrt(l / u))
      , m = Math.abs(g) < 5;
    n || (n = m ? .01 : 2),
    e || (e = m ? .005 : .5);
    let x;
    if (p < 1) {
        const y = ve(v, p);
        x = S => {
            const A = Math.exp(-p * v * S);
            return r - A * ((d + p * v * g) / y * Math.sin(y * S) + g * Math.cos(y * S))
        }
    } else if (p === 1)
        x = y => r - Math.exp(-v * y) * (g + (d + v * g) * y);
    else {
        const y = v * Math.sqrt(p * p - 1);
        x = S => {
            const A = Math.exp(-p * v * S)
              , M = Math.min(y * S, 300);
            return r - A * ((d + p * v * g) * Math.sinh(M) + y * g * Math.cosh(M)) / y
        }
    }
    return {
        calculatedDuration: f && h || null,
        next: y => {
            const S = x(y);
            if (f)
                o.done = y >= h;
            else {
                let A = 0;
                p < 1 && (A = y === 0 ? _(d) : Os(x, y, S));
                const M = Math.abs(A) <= n
                  , X = Math.abs(r - S) <= e;
                o.done = M && X
            }
            return o.value = o.done ? r : S,
            o
        }
    }
}
function fn({keyframes: t, velocity: e=0, power: n=.8, timeConstant: s=325, bounceDamping: i=10, bounceStiffness: r=500, modifyTarget: o, min: l, max: a, restDelta: u=.5, restSpeed: h}) {
    const c = t[0]
      , f = {
        done: !1,
        value: c
    }
      , d = b => l !== void 0 && b < l || a !== void 0 && b > a
      , p = b => l === void 0 ? a : a === void 0 || Math.abs(l - b) < Math.abs(a - b) ? l : a;
    let g = n * e;
    const v = c + g
      , m = o === void 0 ? v : o(v);
    m !== v && (g = m - c);
    const x = b => -g * Math.exp(-b / s)
      , y = b => m + x(b)
      , S = b => {
        const k = x(b)
          , j = y(b);
        f.done = Math.abs(k) <= u,
        f.value = f.done ? m : j
    }
    ;
    let A, M;
    const X = b => {
        d(f.value) && (A = b,
        M = Is({
            keyframes: [f.value, p(f.value)],
            velocity: Os(y, b, f.value),
            damping: i,
            stiffness: r,
            restDelta: u,
            restSpeed: h
        }))
    }
    ;
    return X(0),
    {
        calculatedDuration: null,
        next: b => {
            let k = !1;
            return !M && A === void 0 && (k = !0,
            S(b),
            X(b)),
            A !== void 0 && b >= A ? M.next(b - A) : (!k && S(b),
            f)
        }
    }
}
const Ns = (t, e, n) => (((1 - 3 * n + 3 * e) * t + (3 * n - 6 * e)) * t + 3 * e) * t
  , zo = 1e-7
  , Xo = 12;
function Yo(t, e, n, s, i) {
    let r, o, l = 0;
    do
        o = e + (n - e) / 2,
        r = Ns(o, s, i) - t,
        r > 0 ? n = o : e = o;
    while (Math.abs(r) > zo && ++l < Xo);
    return o
}
function Dt(t, e, n, s) {
    if (t === e && n === s)
        return L;
    const i = r => Yo(r, 0, 1, t, n);
    return r => r === 0 || r === 1 ? r : Ns(i(r), e, s)
}
const qo = Dt(.42, 0, 1, 1)
  , Zo = Dt(0, 0, .58, 1)
  , Us = Dt(.42, 0, .58, 1)
  , Jo = t => Array.isArray(t) && typeof t[0] != "number"
  , Ws = t => e => e <= .5 ? t(2 * e) / 2 : (2 - t(2 * (1 - e))) / 2
  , _s = t => e => 1 - t(1 - e)
  , Oe = t => 1 - Math.sin(Math.acos(t))
  , Ks = _s(Oe)
  , Qo = Ws(Oe)
  , Gs = Dt(.33, 1.53, .69, .99)
  , Ie = _s(Gs)
  , tr = Ws(Ie)
  , er = t => (t *= 2) < 1 ? .5 * Ie(t) : .5 * (2 - Math.pow(2, -10 * (t - 1)))
  , dn = {
    linear: L,
    easeIn: qo,
    easeInOut: Us,
    easeOut: Zo,
    circIn: Oe,
    circInOut: Qo,
    circOut: Ks,
    backIn: Ie,
    backInOut: tr,
    backOut: Gs,
    anticipate: er
}
  , pn = t => {
    if (Array.isArray(t)) {
        de(t.length === 4);
        const [e,n,s,i] = t;
        return Dt(e, n, s, i)
    } else if (typeof t == "string")
        return de(dn[t] !== void 0),
        dn[t];
    return t
}
  , nr = (t, e) => n => e(t(n))
  , $ = (...t) => t.reduce(nr)
  , bt = (t, e, n) => {
    const s = e - t;
    return s === 0 ? 1 : (n - t) / s
}
  , w = (t, e, n) => t + (e - t) * n;
function ee(t, e, n) {
    return n < 0 && (n += 1),
    n > 1 && (n -= 1),
    n < 1 / 6 ? t + (e - t) * 6 * n : n < 1 / 2 ? e : n < 2 / 3 ? t + (e - t) * (2 / 3 - n) * 6 : t
}
function sr({hue: t, saturation: e, lightness: n, alpha: s}) {
    t /= 360,
    e /= 100,
    n /= 100;
    let i = 0
      , r = 0
      , o = 0;
    if (!e)
        i = r = o = n;
    else {
        const l = n < .5 ? n * (1 + e) : n + e - n * e
          , a = 2 * n - l;
        i = ee(a, l, t + 1 / 3),
        r = ee(a, l, t),
        o = ee(a, l, t - 1 / 3)
    }
    return {
        red: Math.round(i * 255),
        green: Math.round(r * 255),
        blue: Math.round(o * 255),
        alpha: s
    }
}
function jt(t, e) {
    return n => n > 0 ? e : t
}
const ne = (t, e, n) => {
    const s = t * t
      , i = n * (e * e - s) + s;
    return i < 0 ? 0 : Math.sqrt(i)
}
  , ir = [ge, st, rt]
  , or = t => ir.find(e => e.test(t));
function mn(t) {
    const e = or(t);
    if (!e)
        return !1;
    let n = e.parse(t);
    return e === rt && (n = sr(n)),
    n
}
const gn = (t, e) => {
    const n = mn(t)
      , s = mn(e);
    if (!n || !s)
        return jt(t, e);
    const i = {
        ...n
    };
    return r => (i.red = ne(n.red, s.red, r),
    i.green = ne(n.green, s.green, r),
    i.blue = ne(n.blue, s.blue, r),
    i.alpha = w(n.alpha, s.alpha, r),
    st.transform(i))
}
  , xe = new Set(["none", "hidden"]);
function rr(t, e) {
    return xe.has(t) ? n => n <= 0 ? t : e : n => n >= 1 ? e : t
}
function ar(t, e) {
    return n => w(t, e, n)
}
function Ne(t) {
    return typeof t == "number" ? ar : typeof t == "string" ? Ee(t) ? jt : R.test(t) ? gn : cr : Array.isArray(t) ? $s : typeof t == "object" ? R.test(t) ? gn : lr : jt
}
function $s(t, e) {
    const n = [...t]
      , s = n.length
      , i = t.map( (r, o) => Ne(r)(r, e[o]));
    return r => {
        for (let o = 0; o < s; o++)
            n[o] = i[o](r);
        return n
    }
}
function lr(t, e) {
    const n = {
        ...t,
        ...e
    }
      , s = {};
    for (const i in n)
        t[i] !== void 0 && e[i] !== void 0 && (s[i] = Ne(t[i])(t[i], e[i]));
    return i => {
        for (const r in s)
            n[r] = s[r](i);
        return n
    }
}
function ur(t, e) {
    var n;
    const s = []
      , i = {
        color: 0,
        var: 0,
        number: 0
    };
    for (let r = 0; r < e.values.length; r++) {
        const o = e.types[r]
          , l = t.indexes[o][i[o]]
          , a = (n = t.values[l]) !== null && n !== void 0 ? n : 0;
        s[r] = a,
        i[o]++
    }
    return s
}
const cr = (t, e) => {
    const n = Z.createTransformer(e)
      , s = At(t)
      , i = At(e);
    return s.indexes.var.length === i.indexes.var.length && s.indexes.color.length === i.indexes.color.length && s.indexes.number.length >= i.indexes.number.length ? xe.has(t) && !i.values.length || xe.has(e) && !s.values.length ? rr(t, e) : $($s(ur(s, i), i.values), n) : jt(t, e)
}
;
function Hs(t, e, n) {
    return typeof t == "number" && typeof e == "number" && typeof n == "number" ? w(t, e, n) : Ne(t)(t, e)
}
function hr(t, e, n) {
    const s = []
      , i = n || Hs
      , r = t.length - 1;
    for (let o = 0; o < r; o++) {
        let l = i(t[o], t[o + 1]);
        if (e) {
            const a = Array.isArray(e) ? e[o] || L : e;
            l = $(a, l)
        }
        s.push(l)
    }
    return s
}
function fr(t, e, {clamp: n=!0, ease: s, mixer: i}={}) {
    const r = t.length;
    if (de(r === e.length),
    r === 1)
        return () => e[0];
    if (r === 2 && t[0] === t[1])
        return () => e[1];
    t[0] > t[r - 1] && (t = [...t].reverse(),
    e = [...e].reverse());
    const o = hr(e, s, i)
      , l = o.length
      , a = u => {
        let h = 0;
        if (l > 1)
            for (; h < t.length - 2 && !(u < t[h + 1]); h++)
                ;
        const c = bt(t[h], t[h + 1], u);
        return o[h](c)
    }
    ;
    return n ? u => a(q(t[0], t[r - 1], u)) : a
}
function dr(t, e) {
    const n = t[t.length - 1];
    for (let s = 1; s <= e; s++) {
        const i = bt(0, e, s);
        t.push(w(n, 1, i))
    }
}
function pr(t) {
    const e = [0];
    return dr(e, t.length - 1),
    e
}
function mr(t, e) {
    return t.map(n => n * e)
}
function gr(t, e) {
    return t.map( () => e || Us).splice(0, t.length - 1)
}
function Ot({duration: t=300, keyframes: e, times: n, ease: s="easeInOut"}) {
    const i = Jo(s) ? s.map(pn) : pn(s)
      , r = {
        done: !1,
        value: e[0]
    }
      , o = mr(n && n.length === e.length ? n : pr(e), t)
      , l = fr(o, e, {
        ease: Array.isArray(i) ? i : gr(e, i)
    });
    return {
        calculatedDuration: t,
        next: a => (r.value = l(a),
        r.done = a >= t,
        r)
    }
}
const yn = 2e4;
function yr(t) {
    let e = 0;
    const n = 50;
    let s = t.next(e);
    for (; !s.done && e < yn; )
        e += n,
        s = t.next(e);
    return e >= yn ? 1 / 0 : e
}
const vr = t => {
    const e = ({timestamp: n}) => t(n);
    return {
        start: () => V.update(e, !0),
        stop: () => z(e),
        now: () => D.isProcessing ? D.timestamp : G.now()
    }
}
  , xr = {
    decay: fn,
    inertia: fn,
    tween: Ot,
    keyframes: Ot,
    spring: Is
}
  , Tr = t => t / 100;
class Ue extends ks {
    constructor(e) {
        super(e),
        this.holdTime = null,
        this.cancelTime = null,
        this.currentTime = 0,
        this.playbackSpeed = 1,
        this.pendingPlayState = "running",
        this.startTime = null,
        this.state = "idle",
        this.stop = () => {
            if (this.resolver.cancel(),
            this.isStopped = !0,
            this.state === "idle")
                return;
            this.teardown();
            const {onStop: a} = this.options;
            a && a()
        }
        ;
        const {name: n, motionValue: s, element: i, keyframes: r} = this.options
          , o = (i == null ? void 0 : i.KeyframeResolver) || Fe
          , l = (a, u) => this.onKeyframesResolved(a, u);
        this.resolver = new o(r,l,n,s,i),
        this.resolver.scheduleResolve()
    }
    initPlayback(e) {
        const {type: n="keyframes", repeat: s=0, repeatDelay: i=0, repeatType: r, velocity: o=0} = this.options
          , l = xr[n] || Ot;
        let a, u;
        l !== Ot && typeof e[0] != "number" && (a = $(Tr, Hs(e[0], e[1])),
        e = [0, 100]);
        const h = l({
            ...this.options,
            keyframes: e
        });
        r === "mirror" && (u = l({
            ...this.options,
            keyframes: [...e].reverse(),
            velocity: -o
        })),
        h.calculatedDuration === null && (h.calculatedDuration = yr(h));
        const {calculatedDuration: c} = h
          , f = c + i
          , d = f * (s + 1) - i;
        return {
            generator: h,
            mirroredGenerator: u,
            mapPercentToKeyframes: a,
            calculatedDuration: c,
            resolvedDuration: f,
            totalDuration: d
        }
    }
    onPostResolved() {
        const {autoplay: e=!0} = this.options;
        this.play(),
        this.pendingPlayState === "paused" || !e ? this.pause() : this.state = this.pendingPlayState
    }
    tick(e, n=!1) {
        const {resolved: s} = this;
        if (!s) {
            const {keyframes: b} = this.options;
            return {
                done: !0,
                value: b[b.length - 1]
            }
        }
        const {finalKeyframe: i, generator: r, mirroredGenerator: o, mapPercentToKeyframes: l, keyframes: a, calculatedDuration: u, totalDuration: h, resolvedDuration: c} = s;
        if (this.startTime === null)
            return r.next(0);
        const {delay: f, repeat: d, repeatType: p, repeatDelay: g, onUpdate: v} = this.options;
        this.speed > 0 ? this.startTime = Math.min(this.startTime, e) : this.speed < 0 && (this.startTime = Math.min(e - h / this.speed, this.startTime)),
        n ? this.currentTime = e : this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = Math.round(e - this.startTime) * this.speed;
        const m = this.currentTime - f * (this.speed >= 0 ? 1 : -1)
          , x = this.speed >= 0 ? m < 0 : m > h;
        this.currentTime = Math.max(m, 0),
        this.state === "finished" && this.holdTime === null && (this.currentTime = h);
        let y = this.currentTime
          , S = r;
        if (d) {
            const b = Math.min(this.currentTime, h) / c;
            let k = Math.floor(b)
              , j = b % 1;
            !j && b >= 1 && (j = 1),
            j === 1 && k--,
            k = Math.min(k, d + 1),
            !!(k % 2) && (p === "reverse" ? (j = 1 - j,
            g && (j -= g / c)) : p === "mirror" && (S = o)),
            y = q(0, 1, j) * c
        }
        const A = x ? {
            done: !1,
            value: a[0]
        } : S.next(y);
        l && (A.value = l(A.value));
        let {done: M} = A;
        !x && u !== null && (M = this.speed >= 0 ? this.currentTime >= h : this.currentTime <= 0);
        const X = this.holdTime === null && (this.state === "finished" || this.state === "running" && M);
        return X && i !== void 0 && (A.value = Kt(a, this.options, i)),
        v && v(A.value),
        X && this.finish(),
        A
    }
    get duration() {
        const {resolved: e} = this;
        return e ? K(e.calculatedDuration) : 0
    }
    get time() {
        return K(this.currentTime)
    }
    set time(e) {
        e = _(e),
        this.currentTime = e,
        this.holdTime !== null || this.speed === 0 ? this.holdTime = e : this.driver && (this.startTime = this.driver.now() - e / this.speed)
    }
    get speed() {
        return this.playbackSpeed
    }
    set speed(e) {
        const n = this.playbackSpeed !== e;
        this.playbackSpeed = e,
        n && (this.time = K(this.currentTime))
    }
    play() {
        if (this.resolver.isScheduled || this.resolver.resume(),
        !this._resolved) {
            this.pendingPlayState = "running";
            return
        }
        if (this.isStopped)
            return;
        const {driver: e=vr, onPlay: n, startTime: s} = this.options;
        this.driver || (this.driver = e(r => this.tick(r))),
        n && n();
        const i = this.driver.now();
        this.holdTime !== null ? this.startTime = i - this.holdTime : this.startTime ? this.state === "finished" && (this.startTime = i) : this.startTime = s ?? this.calcStartTime(),
        this.state === "finished" && this.updateFinishedPromise(),
        this.cancelTime = this.startTime,
        this.holdTime = null,
        this.state = "running",
        this.driver.start()
    }
    pause() {
        var e;
        if (!this._resolved) {
            this.pendingPlayState = "paused";
            return
        }
        this.state = "paused",
        this.holdTime = (e = this.currentTime) !== null && e !== void 0 ? e : 0
    }
    complete() {
        this.state !== "running" && this.play(),
        this.pendingPlayState = this.state = "finished",
        this.holdTime = null
    }
    finish() {
        this.teardown(),
        this.state = "finished";
        const {onComplete: e} = this.options;
        e && e()
    }
    cancel() {
        this.cancelTime !== null && this.tick(this.cancelTime),
        this.teardown(),
        this.updateFinishedPromise()
    }
    teardown() {
        this.state = "idle",
        this.stopDriver(),
        this.resolveFinishedPromise(),
        this.updateFinishedPromise(),
        this.startTime = this.cancelTime = null,
        this.resolver.cancel()
    }
    stopDriver() {
        this.driver && (this.driver.stop(),
        this.driver = void 0)
    }
    sample(e) {
        return this.startTime = 0,
        this.tick(e, !0)
    }
}
const zs = new Set(["opacity", "clipPath", "filter", "transform"])
  , Xs = t => Array.isArray(t) && typeof t[0] == "number";
function Ys(t) {
    return !!(!t || typeof t == "string" && t in We || Xs(t) || Array.isArray(t) && t.every(Ys))
}
const mt = ([t,e,n,s]) => `cubic-bezier(${t}, ${e}, ${n}, ${s})`
  , We = {
    linear: "linear",
    ease: "ease",
    easeIn: "ease-in",
    easeOut: "ease-out",
    easeInOut: "ease-in-out",
    circIn: mt([0, .65, .55, 1]),
    circOut: mt([.55, 0, 1, .45]),
    backIn: mt([.31, .01, .66, -.59]),
    backOut: mt([.33, 1.53, .69, .99])
};
function Pr(t) {
    return qs(t) || We.easeOut
}
function qs(t) {
    if (t)
        return Xs(t) ? mt(t) : Array.isArray(t) ? t.map(Pr) : We[t]
}
function Sr(t, e, n, {delay: s=0, duration: i=300, repeat: r=0, repeatType: o="loop", ease: l, times: a}={}) {
    const u = {
        [e]: n
    };
    a && (u.offset = a);
    const h = qs(l);
    return Array.isArray(h) && (u.easing = h),
    t.animate(u, {
        delay: s,
        duration: i,
        easing: Array.isArray(h) ? "linear" : h,
        fill: "both",
        iterations: r + 1,
        direction: o === "reverse" ? "alternate" : "normal"
    })
}
const Ar = Bs( () => Object.hasOwnProperty.call(Element.prototype, "animate"))
  , It = 10
  , br = 2e4;
function Vr(t) {
    return t.type === "spring" || !Ys(t.ease)
}
function wr(t, e) {
    const n = new Ue({
        ...e,
        keyframes: t,
        repeat: 0,
        delay: 0,
        isGenerator: !0
    });
    let s = {
        done: !1,
        value: t[0]
    };
    const i = [];
    let r = 0;
    for (; !s.done && r < br; )
        s = n.sample(r),
        i.push(s.value),
        r += It;
    return {
        times: void 0,
        keyframes: i,
        duration: r - It,
        ease: "linear"
    }
}
class vn extends ks {
    constructor(e) {
        super(e);
        const {name: n, motionValue: s, element: i, keyframes: r} = this.options;
        this.resolver = new Fs(r, (o, l) => this.onKeyframesResolved(o, l),n,s,i),
        this.resolver.scheduleResolve()
    }
    initPlayback(e, n) {
        var s;
        let {duration: i=300, times: r, ease: o, type: l, motionValue: a, name: u, startTime: h} = this.options;
        if (!(!((s = a.owner) === null || s === void 0) && s.current))
            return !1;
        if (Vr(this.options)) {
            const {onComplete: f, onUpdate: d, motionValue: p, element: g, ...v} = this.options
              , m = wr(e, v);
            e = m.keyframes,
            e.length === 1 && (e[1] = e[0]),
            i = m.duration,
            r = m.times,
            o = m.ease,
            l = "keyframes"
        }
        const c = Sr(a.owner.current, u, e, {
            ...this.options,
            duration: i,
            times: r,
            ease: o
        });
        return c.startTime = h ?? this.calcStartTime(),
        this.pendingTimeline ? (c.timeline = this.pendingTimeline,
        this.pendingTimeline = void 0) : c.onfinish = () => {
            const {onComplete: f} = this.options;
            a.set(Kt(e, this.options, n)),
            f && f(),
            this.cancel(),
            this.resolveFinishedPromise()
        }
        ,
        {
            animation: c,
            duration: i,
            times: r,
            type: l,
            ease: o,
            keyframes: e
        }
    }
    get duration() {
        const {resolved: e} = this;
        if (!e)
            return 0;
        const {duration: n} = e;
        return K(n)
    }
    get time() {
        const {resolved: e} = this;
        if (!e)
            return 0;
        const {animation: n} = e;
        return K(n.currentTime || 0)
    }
    set time(e) {
        const {resolved: n} = this;
        if (!n)
            return;
        const {animation: s} = n;
        s.currentTime = _(e)
    }
    get speed() {
        const {resolved: e} = this;
        if (!e)
            return 1;
        const {animation: n} = e;
        return n.playbackRate
    }
    set speed(e) {
        const {resolved: n} = this;
        if (!n)
            return;
        const {animation: s} = n;
        s.playbackRate = e
    }
    get state() {
        const {resolved: e} = this;
        if (!e)
            return "idle";
        const {animation: n} = e;
        return n.playState
    }
    get startTime() {
        const {resolved: e} = this;
        if (!e)
            return null;
        const {animation: n} = e;
        return n.startTime
    }
    attachTimeline(e) {
        if (!this._resolved)
            this.pendingTimeline = e;
        else {
            const {resolved: n} = this;
            if (!n)
                return L;
            const {animation: s} = n;
            s.timeline = e,
            s.onfinish = null
        }
        return L
    }
    play() {
        if (this.isStopped)
            return;
        const {resolved: e} = this;
        if (!e)
            return;
        const {animation: n} = e;
        n.playState === "finished" && this.updateFinishedPromise(),
        n.play()
    }
    pause() {
        const {resolved: e} = this;
        if (!e)
            return;
        const {animation: n} = e;
        n.pause()
    }
    stop() {
        if (this.resolver.cancel(),
        this.isStopped = !0,
        this.state === "idle")
            return;
        this.resolveFinishedPromise(),
        this.updateFinishedPromise();
        const {resolved: e} = this;
        if (!e)
            return;
        const {animation: n, keyframes: s, duration: i, type: r, ease: o, times: l} = e;
        if (n.playState === "idle" || n.playState === "finished")
            return;
        if (this.time) {
            const {motionValue: u, onUpdate: h, onComplete: c, element: f, ...d} = this.options
              , p = new Ue({
                ...d,
                keyframes: s,
                duration: i,
                type: r,
                ease: o,
                times: l,
                isGenerator: !0
            })
              , g = _(this.time);
            u.setWithVelocity(p.sample(g - It).value, p.sample(g).value, It)
        }
        const {onStop: a} = this.options;
        a && a(),
        this.cancel()
    }
    complete() {
        const {resolved: e} = this;
        e && e.animation.finish()
    }
    cancel() {
        const {resolved: e} = this;
        e && e.animation.cancel()
    }
    static supports(e) {
        const {motionValue: n, name: s, repeatDelay: i, repeatType: r, damping: o, type: l} = e;
        return Ar() && s && zs.has(s) && n && n.owner && n.owner.current instanceof HTMLElement && !n.owner.getProps().onUpdate && !i && r !== "mirror" && o !== 0 && l !== "inertia"
    }
}
function Cr(t, e) {
    let n;
    const s = () => {
        const {currentTime: i} = e
          , o = (i === null ? 0 : i.value) / 100;
        n !== o && t(o),
        n = o
    }
    ;
    return V.update(s, !0),
    () => z(s)
}
const Mr = Bs( () => window.ScrollTimeline !== void 0);
class Dr {
    constructor(e) {
        this.stop = () => this.runAll("stop"),
        this.animations = e.filter(Boolean)
    }
    then(e, n) {
        return Promise.all(this.animations).then(e).catch(n)
    }
    getAll(e) {
        return this.animations[0][e]
    }
    setAll(e, n) {
        for (let s = 0; s < this.animations.length; s++)
            this.animations[s][e] = n
    }
    attachTimeline(e) {
        const n = this.animations.map(s => {
            if (Mr() && s.attachTimeline)
                s.attachTimeline(e);
            else
                return s.pause(),
                Cr(i => {
                    s.time = s.duration * i
                }
                , e)
        }
        );
        return () => {
            n.forEach( (s, i) => {
                s && s(),
                this.animations[i].stop()
            }
            )
        }
    }
    get time() {
        return this.getAll("time")
    }
    set time(e) {
        this.setAll("time", e)
    }
    get speed() {
        return this.getAll("speed")
    }
    set speed(e) {
        this.setAll("speed", e)
    }
    get startTime() {
        return this.getAll("startTime")
    }
    get duration() {
        let e = 0;
        for (let n = 0; n < this.animations.length; n++)
            e = Math.max(e, this.animations[n].duration);
        return e
    }
    runAll(e) {
        this.animations.forEach(n => n[e]())
    }
    play() {
        this.runAll("play")
    }
    pause() {
        this.runAll("pause")
    }
    cancel() {
        this.runAll("cancel")
    }
    complete() {
        this.runAll("complete")
    }
}
const _e = (t, e, n, s={}, i, r, o) => l => {
    const a = Re(s, t) || {}
      , u = a.delay || s.delay || 0;
    let {elapsed: h=0} = s;
    h = h - _(u);
    let c = {
        keyframes: Array.isArray(n) ? n : [null, n],
        ease: "easeOut",
        velocity: e.getVelocity(),
        ...a,
        delay: -h,
        onUpdate: d => {
            e.set(d),
            a.onUpdate && a.onUpdate(d)
        }
        ,
        onComplete: () => {
            l(),
            a.onComplete && a.onComplete(),
            o && o()
        }
        ,
        onStop: o,
        name: t,
        motionValue: e,
        element: r ? void 0 : i
    };
    qi(a) || (c = {
        ...c,
        ...Yi(t, c)
    }),
    c.duration && (c.duration = _(c.duration)),
    c.repeatDelay && (c.repeatDelay = _(c.repeatDelay)),
    c.from !== void 0 && (c.keyframes[0] = c.from);
    let f = !1;
    if ((c.type === !1 || c.duration === 0 && !c.repeatDelay) && (c.duration = 0,
    c.delay === 0 && (f = !0)),
    f && !r && e.get() !== void 0) {
        const d = Kt(c.keyframes, a);
        if (d !== void 0)
            return V.update( () => {
                c.onUpdate(d),
                c.onComplete()
            }
            ),
            new Dr([])
    }
    return !r && vn.supports(c) ? new vn(c) : new Ue(c)
}
  , Rr = t => !!(t && typeof t == "object" && t.mix && t.toValue)
  , Er = t => fe(t) ? t[t.length - 1] || 0 : t;
function Gt(t, e) {
    t.indexOf(e) === -1 && t.push(e)
}
function $t(t, e) {
    const n = t.indexOf(e);
    n > -1 && t.splice(n, 1)
}
class Ke {
    constructor() {
        this.subscriptions = []
    }
    add(e) {
        return Gt(this.subscriptions, e),
        () => $t(this.subscriptions, e)
    }
    notify(e, n, s) {
        const i = this.subscriptions.length;
        if (i)
            if (i === 1)
                this.subscriptions[0](e, n, s);
            else
                for (let r = 0; r < i; r++) {
                    const o = this.subscriptions[r];
                    o && o(e, n, s)
                }
    }
    getSize() {
        return this.subscriptions.length
    }
    clear() {
        this.subscriptions.length = 0
    }
}
const xn = 30
  , Lr = t => !isNaN(parseFloat(t));
class Zs {
    constructor(e, n={}) {
        this.version = "11.5.4",
        this.canTrackVelocity = null,
        this.events = {},
        this.updateAndNotify = (s, i=!0) => {
            const r = G.now();
            this.updatedAt !== r && this.setPrevFrameValue(),
            this.prev = this.current,
            this.setCurrent(s),
            this.current !== this.prev && this.events.change && this.events.change.notify(this.current),
            i && this.events.renderRequest && this.events.renderRequest.notify(this.current)
        }
        ,
        this.hasAnimated = !1,
        this.setCurrent(e),
        this.owner = n.owner
    }
    setCurrent(e) {
        this.current = e,
        this.updatedAt = G.now(),
        this.canTrackVelocity === null && e !== void 0 && (this.canTrackVelocity = Lr(this.current))
    }
    setPrevFrameValue(e=this.current) {
        this.prevFrameValue = e,
        this.prevUpdatedAt = this.updatedAt
    }
    onChange(e) {
        return this.on("change", e)
    }
    on(e, n) {
        this.events[e] || (this.events[e] = new Ke);
        const s = this.events[e].add(n);
        return e === "change" ? () => {
            s(),
            V.read( () => {
                this.events.change.getSize() || this.stop()
            }
            )
        }
        : s
    }
    clearListeners() {
        for (const e in this.events)
            this.events[e].clear()
    }
    attach(e, n) {
        this.passiveEffect = e,
        this.stopPassiveEffect = n
    }
    set(e, n=!0) {
        !n || !this.passiveEffect ? this.updateAndNotify(e, n) : this.passiveEffect(e, this.updateAndNotify)
    }
    setWithVelocity(e, n, s) {
        this.set(n),
        this.prev = void 0,
        this.prevFrameValue = e,
        this.prevUpdatedAt = this.updatedAt - s
    }
    jump(e, n=!0) {
        this.updateAndNotify(e),
        this.prev = e,
        this.prevUpdatedAt = this.prevFrameValue = void 0,
        n && this.stop(),
        this.stopPassiveEffect && this.stopPassiveEffect()
    }
    get() {
        return this.current
    }
    getPrevious() {
        return this.prev
    }
    getVelocity() {
        const e = G.now();
        if (!this.canTrackVelocity || this.prevFrameValue === void 0 || e - this.updatedAt > xn)
            return 0;
        const n = Math.min(this.updatedAt - this.prevUpdatedAt, xn);
        return js(parseFloat(this.current) - parseFloat(this.prevFrameValue), n)
    }
    start(e) {
        return this.stop(),
        new Promise(n => {
            this.hasAnimated = !0,
            this.animation = e(n),
            this.events.animationStart && this.events.animationStart.notify()
        }
        ).then( () => {
            this.events.animationComplete && this.events.animationComplete.notify(),
            this.clearAnimation()
        }
        )
    }
    stop() {
        this.animation && (this.animation.stop(),
        this.events.animationCancel && this.events.animationCancel.notify()),
        this.clearAnimation()
    }
    isAnimating() {
        return !!this.animation
    }
    clearAnimation() {
        delete this.animation
    }
    destroy() {
        this.clearListeners(),
        this.stop(),
        this.stopPassiveEffect && this.stopPassiveEffect()
    }
}
function Vt(t, e) {
    return new Zs(t,e)
}
function Fr(t, e, n) {
    t.hasValue(e) ? t.getValue(e).set(n) : t.addValue(e, Vt(n))
}
function Br(t, e) {
    const n = _t(t, e);
    let {transitionEnd: s={}, transition: i={}, ...r} = n || {};
    r = {
        ...r,
        ...s
    };
    for (const o in r) {
        const l = Er(r[o]);
        Fr(t, o, l)
    }
}
const Ht = t => t.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase()
  , kr = "framerAppearId"
  , Js = "data-" + Ht(kr);
function Qs(t) {
    return t.props[Js]
}
function ti(t) {
    if (J.has(t))
        return "transform";
    if (zs.has(t))
        return Ht(t)
}
class jr extends Zs {
    constructor() {
        super(...arguments),
        this.output = [],
        this.counts = new Map
    }
    add(e) {
        const n = ti(e);
        if (!n)
            return;
        const s = this.counts.get(n) || 0;
        this.counts.set(n, s + 1),
        s === 0 && (this.output.push(n),
        this.update());
        let i = !1;
        return () => {
            if (i)
                return;
            i = !0;
            const r = this.counts.get(n) - 1;
            this.counts.set(n, r),
            r === 0 && ($t(this.output, n),
            this.update())
        }
    }
    update() {
        this.set(this.output.length ? this.output.join(", ") : "auto")
    }
}
const E = t => !!(t && t.getVelocity);
function Or(t) {
    return !!(E(t) && t.add)
}
function Te(t, e) {
    var n;
    if (!t.applyWillChange)
        return;
    let s = t.getValue("willChange");
    if (!s && !(!((n = t.props.style) === null || n === void 0) && n.willChange) && (s = new jr("auto"),
    t.addValue("willChange", s)),
    Or(s))
        return s.add(e)
}
function Ir({protectedKeys: t, needsAnimating: e}, n) {
    const s = t.hasOwnProperty(n) && e[n] !== !0;
    return e[n] = !1,
    s
}
function ei(t, e, {delay: n=0, transitionOverride: s, type: i}={}) {
    var r;
    let {transition: o=t.getDefaultTransition(), transitionEnd: l, ...a} = e;
    s && (o = s);
    const u = []
      , h = i && t.animationState && t.animationState.getState()[i];
    for (const c in a) {
        const f = t.getValue(c, (r = t.latestValues[c]) !== null && r !== void 0 ? r : null)
          , d = a[c];
        if (d === void 0 || h && Ir(h, c))
            continue;
        const p = {
            delay: n,
            ...Re(o || {}, c)
        };
        let g = !1;
        if (window.MotionHandoffAnimation) {
            const m = Qs(t);
            if (m) {
                const x = window.MotionHandoffAnimation(m, c, V);
                x !== null && (p.startTime = x,
                g = !0)
            }
        }
        f.start(_e(c, f, d, t.shouldReduceMotion && J.has(c) ? {
            type: !1
        } : p, t, g, Te(t, c)));
        const v = f.animation;
        v && u.push(v)
    }
    return l && Promise.all(u).then( () => {
        V.update( () => {
            l && Br(t, l)
        }
        )
    }
    ),
    u
}
function Pe(t, e, n={}) {
    var s;
    const i = _t(t, e, n.type === "exit" ? (s = t.presenceContext) === null || s === void 0 ? void 0 : s.custom : void 0);
    let {transition: r=t.getDefaultTransition() || {}} = i || {};
    n.transitionOverride && (r = n.transitionOverride);
    const o = i ? () => Promise.all(ei(t, i, n)) : () => Promise.resolve()
      , l = t.variantChildren && t.variantChildren.size ? (u=0) => {
        const {delayChildren: h=0, staggerChildren: c, staggerDirection: f} = r;
        return Nr(t, e, h + u, c, f, n)
    }
    : () => Promise.resolve()
      , {when: a} = r;
    if (a) {
        const [u,h] = a === "beforeChildren" ? [o, l] : [l, o];
        return u().then( () => h())
    } else
        return Promise.all([o(), l(n.delay)])
}
function Nr(t, e, n=0, s=0, i=1, r) {
    const o = []
      , l = (t.variantChildren.size - 1) * s
      , a = i === 1 ? (u=0) => u * s : (u=0) => l - u * s;
    return Array.from(t.variantChildren).sort(Ur).forEach( (u, h) => {
        u.notify("AnimationStart", e),
        o.push(Pe(u, e, {
            ...r,
            delay: n + a(h)
        }).then( () => u.notify("AnimationComplete", e)))
    }
    ),
    Promise.all(o)
}
function Ur(t, e) {
    return t.sortNodePosition(e)
}
function Wr(t, e, n={}) {
    t.notify("AnimationStart", e);
    let s;
    if (Array.isArray(e)) {
        const i = e.map(r => Pe(t, r, n));
        s = Promise.all(i)
    } else if (typeof e == "string")
        s = Pe(t, e, n);
    else {
        const i = typeof e == "function" ? _t(t, e, n.custom) : e;
        s = Promise.all(ei(t, i, n))
    }
    return s.then( () => {
        t.notify("AnimationComplete", e)
    }
    )
}
const _r = [...Me].reverse()
  , Kr = Me.length;
function Gr(t) {
    return e => Promise.all(e.map( ({animation: n, options: s}) => Wr(t, n, s)))
}
function $r(t) {
    let e = Gr(t)
      , n = Tn()
      , s = !0;
    const i = a => (u, h) => {
        var c;
        const f = _t(t, h, a === "exit" ? (c = t.presenceContext) === null || c === void 0 ? void 0 : c.custom : void 0);
        if (f) {
            const {transition: d, transitionEnd: p, ...g} = f;
            u = {
                ...u,
                ...g,
                ...p
            }
        }
        return u
    }
    ;
    function r(a) {
        e = a(t)
    }
    function o(a) {
        const u = t.getProps()
          , h = t.getVariantContext(!0) || {}
          , c = []
          , f = new Set;
        let d = {}
          , p = 1 / 0;
        for (let v = 0; v < Kr; v++) {
            const m = _r[v]
              , x = n[m]
              , y = u[m] !== void 0 ? u[m] : h[m]
              , S = St(y)
              , A = m === a ? x.isActive : null;
            A === !1 && (p = v);
            let M = y === h[m] && y !== u[m] && S;
            if (M && s && t.manuallyAnimateOnMount && (M = !1),
            x.protectedKeys = {
                ...d
            },
            !x.isActive && A === null || !y && !x.prevProp || Pt(y) || typeof y == "boolean")
                continue;
            let b = Hr(x.prevProp, y) || m === a && x.isActive && !M && S || v > p && S
              , k = !1;
            const j = Array.isArray(y) ? y : [y];
            let ot = j.reduce(i(m), {});
            A === !1 && (ot = {});
            const {prevResolvedValues: Qe={}} = x
              , Ki = {
                ...Qe,
                ...ot
            }
              , tn = F => {
                b = !0,
                f.has(F) && (k = !0,
                f.delete(F)),
                x.needsAnimating[F] = !0;
                const U = t.getValue(F);
                U && (U.liveStyle = !1)
            }
            ;
            for (const F in Ki) {
                const U = ot[F]
                  , qt = Qe[F];
                if (d.hasOwnProperty(F))
                    continue;
                let Zt = !1;
                fe(U) && fe(qt) ? Zt = !gs(U, qt) : Zt = U !== qt,
                Zt ? U != null ? tn(F) : f.add(F) : U !== void 0 && f.has(F) ? tn(F) : x.protectedKeys[F] = !0
            }
            x.prevProp = y,
            x.prevResolvedValues = ot,
            x.isActive && (d = {
                ...d,
                ...ot
            }),
            s && t.blockInitialAnimation && (b = !1),
            b && (!M || k) && c.push(...j.map(F => ({
                animation: F,
                options: {
                    type: m
                }
            })))
        }
        if (f.size) {
            const v = {};
            f.forEach(m => {
                const x = t.getBaseTarget(m)
                  , y = t.getValue(m);
                y && (y.liveStyle = !0),
                v[m] = x ?? null
            }
            ),
            c.push({
                animation: v
            })
        }
        let g = !!c.length;
        return s && (u.initial === !1 || u.initial === u.animate) && !t.manuallyAnimateOnMount && (g = !1),
        s = !1,
        g ? e(c) : Promise.resolve()
    }
    function l(a, u) {
        var h;
        if (n[a].isActive === u)
            return Promise.resolve();
        (h = t.variantChildren) === null || h === void 0 || h.forEach(f => {
            var d;
            return (d = f.animationState) === null || d === void 0 ? void 0 : d.setActive(a, u)
        }
        ),
        n[a].isActive = u;
        const c = o(a);
        for (const f in n)
            n[f].protectedKeys = {};
        return c
    }
    return {
        animateChanges: o,
        setActive: l,
        setAnimateFunction: r,
        getState: () => n,
        reset: () => {
            n = Tn(),
            s = !0
        }
    }
}
function Hr(t, e) {
    return typeof e == "string" ? e !== t : Array.isArray(e) ? !gs(e, t) : !1
}
function tt(t=!1) {
    return {
        isActive: t,
        protectedKeys: {},
        needsAnimating: {},
        prevResolvedValues: {}
    }
}
function Tn() {
    return {
        animate: tt(!0),
        whileInView: tt(),
        whileHover: tt(),
        whileTap: tt(),
        whileDrag: tt(),
        whileFocus: tt(),
        exit: tt()
    }
}
class Q {
    constructor(e) {
        this.isMounted = !1,
        this.node = e
    }
    update() {}
}
class zr extends Q {
    constructor(e) {
        super(e),
        e.animationState || (e.animationState = $r(e))
    }
    updateAnimationControlsSubscription() {
        const {animate: e} = this.node.getProps();
        Pt(e) && (this.unmountControls = e.subscribe(this.node))
    }
    mount() {
        this.updateAnimationControlsSubscription()
    }
    update() {
        const {animate: e} = this.node.getProps()
          , {animate: n} = this.node.prevProps || {};
        e !== n && this.updateAnimationControlsSubscription()
    }
    unmount() {
        var e;
        this.node.animationState.reset(),
        (e = this.unmountControls) === null || e === void 0 || e.call(this)
    }
}
let Xr = 0;
class Yr extends Q {
    constructor() {
        super(...arguments),
        this.id = Xr++
    }
    update() {
        if (!this.node.presenceContext)
            return;
        const {isPresent: e, onExitComplete: n} = this.node.presenceContext
          , {isPresent: s} = this.node.prevPresenceContext || {};
        if (!this.node.animationState || e === s)
            return;
        const i = this.node.animationState.setActive("exit", !e);
        n && !e && i.then( () => n(this.id))
    }
    mount() {
        const {register: e} = this.node.presenceContext || {};
        e && (this.unmount = e(this.id))
    }
    unmount() {}
}
const qr = {
    animation: {
        Feature: zr
    },
    exit: {
        Feature: Yr
    }
}
  , ni = t => t.pointerType === "mouse" ? typeof t.button != "number" || t.button <= 0 : t.isPrimary !== !1;
function zt(t, e="page") {
    return {
        point: {
            x: t[`${e}X`],
            y: t[`${e}Y`]
        }
    }
}
const Zr = t => e => ni(e) && t(e, zt(e));
function W(t, e, n, s={
    passive: !0
}) {
    return t.addEventListener(e, n, s),
    () => t.removeEventListener(e, n)
}
function H(t, e, n, s) {
    return W(t, e, Zr(n), s)
}
const Pn = (t, e) => Math.abs(t - e);
function Jr(t, e) {
    const n = Pn(t.x, e.x)
      , s = Pn(t.y, e.y);
    return Math.sqrt(n ** 2 + s ** 2)
}
class si {
    constructor(e, n, {transformPagePoint: s, contextWindow: i, dragSnapToOrigin: r=!1}={}) {
        if (this.startEvent = null,
        this.lastMoveEvent = null,
        this.lastMoveEventInfo = null,
        this.handlers = {},
        this.contextWindow = window,
        this.updatePoint = () => {
            if (!(this.lastMoveEvent && this.lastMoveEventInfo))
                return;
            const c = ie(this.lastMoveEventInfo, this.history)
              , f = this.startEvent !== null
              , d = Jr(c.offset, {
                x: 0,
                y: 0
            }) >= 3;
            if (!f && !d)
                return;
            const {point: p} = c
              , {timestamp: g} = D;
            this.history.push({
                ...p,
                timestamp: g
            });
            const {onStart: v, onMove: m} = this.handlers;
            f || (v && v(this.lastMoveEvent, c),
            this.startEvent = this.lastMoveEvent),
            m && m(this.lastMoveEvent, c)
        }
        ,
        this.handlePointerMove = (c, f) => {
            this.lastMoveEvent = c,
            this.lastMoveEventInfo = se(f, this.transformPagePoint),
            V.update(this.updatePoint, !0)
        }
        ,
        this.handlePointerUp = (c, f) => {
            this.end();
            const {onEnd: d, onSessionEnd: p, resumeAnimation: g} = this.handlers;
            if (this.dragSnapToOrigin && g && g(),
            !(this.lastMoveEvent && this.lastMoveEventInfo))
                return;
            const v = ie(c.type === "pointercancel" ? this.lastMoveEventInfo : se(f, this.transformPagePoint), this.history);
            this.startEvent && d && d(c, v),
            p && p(c, v)
        }
        ,
        !ni(e))
            return;
        this.dragSnapToOrigin = r,
        this.handlers = n,
        this.transformPagePoint = s,
        this.contextWindow = i || window;
        const o = zt(e)
          , l = se(o, this.transformPagePoint)
          , {point: a} = l
          , {timestamp: u} = D;
        this.history = [{
            ...a,
            timestamp: u
        }];
        const {onSessionStart: h} = n;
        h && h(e, ie(l, this.history)),
        this.removeListeners = $(H(this.contextWindow, "pointermove", this.handlePointerMove), H(this.contextWindow, "pointerup", this.handlePointerUp), H(this.contextWindow, "pointercancel", this.handlePointerUp))
    }
    updateHandlers(e) {
        this.handlers = e
    }
    end() {
        this.removeListeners && this.removeListeners(),
        z(this.updatePoint)
    }
}
function se(t, e) {
    return e ? {
        point: e(t.point)
    } : t
}
function Sn(t, e) {
    return {
        x: t.x - e.x,
        y: t.y - e.y
    }
}
function ie({point: t}, e) {
    return {
        point: t,
        delta: Sn(t, ii(e)),
        offset: Sn(t, Qr(e)),
        velocity: ta(e, .1)
    }
}
function Qr(t) {
    return t[0]
}
function ii(t) {
    return t[t.length - 1]
}
function ta(t, e) {
    if (t.length < 2)
        return {
            x: 0,
            y: 0
        };
    let n = t.length - 1
      , s = null;
    const i = ii(t);
    for (; n >= 0 && (s = t[n],
    !(i.timestamp - s.timestamp > _(e))); )
        n--;
    if (!s)
        return {
            x: 0,
            y: 0
        };
    const r = K(i.timestamp - s.timestamp);
    if (r === 0)
        return {
            x: 0,
            y: 0
        };
    const o = {
        x: (i.x - s.x) / r,
        y: (i.y - s.y) / r
    };
    return o.x === 1 / 0 && (o.x = 0),
    o.y === 1 / 0 && (o.y = 0),
    o
}
function oi(t) {
    let e = null;
    return () => {
        const n = () => {
            e = null
        }
        ;
        return e === null ? (e = t,
        n) : !1
    }
}
const An = oi("dragHorizontal")
  , bn = oi("dragVertical");
function ri(t) {
    let e = !1;
    if (t === "y")
        e = bn();
    else if (t === "x")
        e = An();
    else {
        const n = An()
          , s = bn();
        n && s ? e = () => {
            n(),
            s()
        }
        : (n && n(),
        s && s())
    }
    return e
}
function ai() {
    const t = ri(!0);
    return t ? (t(),
    !1) : !0
}
function at(t) {
    return t && typeof t == "object" && Object.prototype.hasOwnProperty.call(t, "current")
}
const li = 1e-4
  , ea = 1 - li
  , na = 1 + li
  , ui = .01
  , sa = 0 - ui
  , ia = 0 + ui;
function B(t) {
    return t.max - t.min
}
function oa(t, e, n) {
    return Math.abs(t - e) <= n
}
function Vn(t, e, n, s=.5) {
    t.origin = s,
    t.originPoint = w(e.min, e.max, t.origin),
    t.scale = B(n) / B(e),
    t.translate = w(n.min, n.max, t.origin) - t.originPoint,
    (t.scale >= ea && t.scale <= na || isNaN(t.scale)) && (t.scale = 1),
    (t.translate >= sa && t.translate <= ia || isNaN(t.translate)) && (t.translate = 0)
}
function xt(t, e, n, s) {
    Vn(t.x, e.x, n.x, s ? s.originX : void 0),
    Vn(t.y, e.y, n.y, s ? s.originY : void 0)
}
function wn(t, e, n) {
    t.min = n.min + e.min,
    t.max = t.min + B(e)
}
function ra(t, e, n) {
    wn(t.x, e.x, n.x),
    wn(t.y, e.y, n.y)
}
function Cn(t, e, n) {
    t.min = e.min - n.min,
    t.max = t.min + B(e)
}
function Tt(t, e, n) {
    Cn(t.x, e.x, n.x),
    Cn(t.y, e.y, n.y)
}
function aa(t, {min: e, max: n}, s) {
    return e !== void 0 && t < e ? t = s ? w(e, t, s.min) : Math.max(t, e) : n !== void 0 && t > n && (t = s ? w(n, t, s.max) : Math.min(t, n)),
    t
}
function Mn(t, e, n) {
    return {
        min: e !== void 0 ? t.min + e : void 0,
        max: n !== void 0 ? t.max + n - (t.max - t.min) : void 0
    }
}
function la(t, {top: e, left: n, bottom: s, right: i}) {
    return {
        x: Mn(t.x, n, i),
        y: Mn(t.y, e, s)
    }
}
function Dn(t, e) {
    let n = e.min - t.min
      , s = e.max - t.max;
    return e.max - e.min < t.max - t.min && ([n,s] = [s, n]),
    {
        min: n,
        max: s
    }
}
function ua(t, e) {
    return {
        x: Dn(t.x, e.x),
        y: Dn(t.y, e.y)
    }
}
function ca(t, e) {
    let n = .5;
    const s = B(t)
      , i = B(e);
    return i > s ? n = bt(e.min, e.max - s, t.min) : s > i && (n = bt(t.min, t.max - i, e.min)),
    q(0, 1, n)
}
function ha(t, e) {
    const n = {};
    return e.min !== void 0 && (n.min = e.min - t.min),
    e.max !== void 0 && (n.max = e.max - t.min),
    n
}
const Se = .35;
function fa(t=Se) {
    return t === !1 ? t = 0 : t === !0 && (t = Se),
    {
        x: Rn(t, "left", "right"),
        y: Rn(t, "top", "bottom")
    }
}
function Rn(t, e, n) {
    return {
        min: En(t, e),
        max: En(t, n)
    }
}
function En(t, e) {
    return typeof t == "number" ? t : t[e] || 0
}
const Ln = () => ({
    translate: 0,
    scale: 1,
    origin: 0,
    originPoint: 0
})
  , lt = () => ({
    x: Ln(),
    y: Ln()
})
  , Fn = () => ({
    min: 0,
    max: 0
})
  , C = () => ({
    x: Fn(),
    y: Fn()
});
function I(t) {
    return [t("x"), t("y")]
}
function ci({top: t, left: e, right: n, bottom: s}) {
    return {
        x: {
            min: e,
            max: n
        },
        y: {
            min: t,
            max: s
        }
    }
}
function da({x: t, y: e}) {
    return {
        top: e.min,
        right: t.max,
        bottom: e.max,
        left: t.min
    }
}
function pa(t, e) {
    if (!e)
        return t;
    const n = e({
        x: t.left,
        y: t.top
    })
      , s = e({
        x: t.right,
        y: t.bottom
    });
    return {
        top: n.y,
        left: n.x,
        bottom: s.y,
        right: s.x
    }
}
function oe(t) {
    return t === void 0 || t === 1
}
function Ae({scale: t, scaleX: e, scaleY: n}) {
    return !oe(t) || !oe(e) || !oe(n)
}
function et(t) {
    return Ae(t) || hi(t) || t.z || t.rotate || t.rotateX || t.rotateY || t.skewX || t.skewY
}
function hi(t) {
    return Bn(t.x) || Bn(t.y)
}
function Bn(t) {
    return t && t !== "0%"
}
function Nt(t, e, n) {
    const s = t - n
      , i = e * s;
    return n + i
}
function kn(t, e, n, s, i) {
    return i !== void 0 && (t = Nt(t, i, s)),
    Nt(t, n, s) + e
}
function be(t, e=0, n=1, s, i) {
    t.min = kn(t.min, e, n, s, i),
    t.max = kn(t.max, e, n, s, i)
}
function fi(t, {x: e, y: n}) {
    be(t.x, e.translate, e.scale, e.originPoint),
    be(t.y, n.translate, n.scale, n.originPoint)
}
const jn = .999999999999
  , On = 1.0000000000001;
function ma(t, e, n, s=!1) {
    const i = n.length;
    if (!i)
        return;
    e.x = e.y = 1;
    let r, o;
    for (let l = 0; l < i; l++) {
        r = n[l],
        o = r.projectionDelta;
        const {visualElement: a} = r.options;
        a && a.props.style && a.props.style.display === "contents" || (s && r.options.layoutScroll && r.scroll && r !== r.root && ct(t, {
            x: -r.scroll.offset.x,
            y: -r.scroll.offset.y
        }),
        o && (e.x *= o.x.scale,
        e.y *= o.y.scale,
        fi(t, o)),
        s && et(r.latestValues) && ct(t, r.latestValues))
    }
    e.x < On && e.x > jn && (e.x = 1),
    e.y < On && e.y > jn && (e.y = 1)
}
function ut(t, e) {
    t.min = t.min + e,
    t.max = t.max + e
}
function In(t, e, n, s, i=.5) {
    const r = w(t.min, t.max, i);
    be(t, e, n, r, s)
}
function ct(t, e) {
    In(t.x, e.x, e.scaleX, e.scale, e.originX),
    In(t.y, e.y, e.scaleY, e.scale, e.originY)
}
function di(t, e) {
    return ci(pa(t.getBoundingClientRect(), e))
}
function ga(t, e, n) {
    const s = di(t, n)
      , {scroll: i} = e;
    return i && (ut(s.x, i.offset.x),
    ut(s.y, i.offset.y)),
    s
}
const pi = ({current: t}) => t ? t.ownerDocument.defaultView : null
  , ya = new WeakMap;
class va {
    constructor(e) {
        this.openGlobalLock = null,
        this.isDragging = !1,
        this.currentDirection = null,
        this.originPoint = {
            x: 0,
            y: 0
        },
        this.constraints = !1,
        this.hasMutatedConstraints = !1,
        this.elastic = C(),
        this.visualElement = e
    }
    start(e, {snapToCursor: n=!1}={}) {
        const {presenceContext: s} = this.visualElement;
        if (s && s.isPresent === !1)
            return;
        const i = h => {
            const {dragSnapToOrigin: c} = this.getProps();
            c ? this.pauseAnimation() : this.stopAnimation(),
            n && this.snapToCursor(zt(h, "page").point)
        }
          , r = (h, c) => {
            var f;
            const {drag: d, dragPropagation: p, onDragStart: g} = this.getProps();
            if (d && !p && (this.openGlobalLock && this.openGlobalLock(),
            this.openGlobalLock = ri(d),
            !this.openGlobalLock))
                return;
            this.isDragging = !0,
            this.currentDirection = null,
            this.resolveConstraints(),
            this.visualElement.projection && (this.visualElement.projection.isAnimationBlocked = !0,
            this.visualElement.projection.target = void 0),
            I(m => {
                let x = this.getAxisMotionValue(m).get() || 0;
                if (N.test(x)) {
                    const {projection: y} = this.visualElement;
                    if (y && y.layout) {
                        const S = y.layout.layoutBox[m];
                        S && (x = B(S) * (parseFloat(x) / 100))
                    }
                }
                this.originPoint[m] = x
            }
            ),
            g && V.postRender( () => g(h, c)),
            (f = this.removeWillChange) === null || f === void 0 || f.call(this),
            this.removeWillChange = Te(this.visualElement, "transform");
            const {animationState: v} = this.visualElement;
            v && v.setActive("whileDrag", !0)
        }
          , o = (h, c) => {
            const {dragPropagation: f, dragDirectionLock: d, onDirectionLock: p, onDrag: g} = this.getProps();
            if (!f && !this.openGlobalLock)
                return;
            const {offset: v} = c;
            if (d && this.currentDirection === null) {
                this.currentDirection = xa(v),
                this.currentDirection !== null && p && p(this.currentDirection);
                return
            }
            this.updateAxis("x", c.point, v),
            this.updateAxis("y", c.point, v),
            this.visualElement.render(),
            g && g(h, c)
        }
          , l = (h, c) => this.stop(h, c)
          , a = () => I(h => {
            var c;
            return this.getAnimationState(h) === "paused" && ((c = this.getAxisMotionValue(h).animation) === null || c === void 0 ? void 0 : c.play())
        }
        )
          , {dragSnapToOrigin: u} = this.getProps();
        this.panSession = new si(e,{
            onSessionStart: i,
            onStart: r,
            onMove: o,
            onSessionEnd: l,
            resumeAnimation: a
        },{
            transformPagePoint: this.visualElement.getTransformPagePoint(),
            dragSnapToOrigin: u,
            contextWindow: pi(this.visualElement)
        })
    }
    stop(e, n) {
        var s;
        (s = this.removeWillChange) === null || s === void 0 || s.call(this);
        const i = this.isDragging;
        if (this.cancel(),
        !i)
            return;
        const {velocity: r} = n;
        this.startAnimation(r);
        const {onDragEnd: o} = this.getProps();
        o && V.postRender( () => o(e, n))
    }
    cancel() {
        this.isDragging = !1;
        const {projection: e, animationState: n} = this.visualElement;
        e && (e.isAnimationBlocked = !1),
        this.panSession && this.panSession.end(),
        this.panSession = void 0;
        const {dragPropagation: s} = this.getProps();
        !s && this.openGlobalLock && (this.openGlobalLock(),
        this.openGlobalLock = null),
        n && n.setActive("whileDrag", !1)
    }
    updateAxis(e, n, s) {
        const {drag: i} = this.getProps();
        if (!s || !Lt(e, i, this.currentDirection))
            return;
        const r = this.getAxisMotionValue(e);
        let o = this.originPoint[e] + s[e];
        this.constraints && this.constraints[e] && (o = aa(o, this.constraints[e], this.elastic[e])),
        r.set(o)
    }
    resolveConstraints() {
        var e;
        const {dragConstraints: n, dragElastic: s} = this.getProps()
          , i = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(!1) : (e = this.visualElement.projection) === null || e === void 0 ? void 0 : e.layout
          , r = this.constraints;
        n && at(n) ? this.constraints || (this.constraints = this.resolveRefConstraints()) : n && i ? this.constraints = la(i.layoutBox, n) : this.constraints = !1,
        this.elastic = fa(s),
        r !== this.constraints && i && this.constraints && !this.hasMutatedConstraints && I(o => {
            this.constraints !== !1 && this.getAxisMotionValue(o) && (this.constraints[o] = ha(i.layoutBox[o], this.constraints[o]))
        }
        )
    }
    resolveRefConstraints() {
        const {dragConstraints: e, onMeasureDragConstraints: n} = this.getProps();
        if (!e || !at(e))
            return !1;
        const s = e.current
          , {projection: i} = this.visualElement;
        if (!i || !i.layout)
            return !1;
        const r = ga(s, i.root, this.visualElement.getTransformPagePoint());
        let o = ua(i.layout.layoutBox, r);
        if (n) {
            const l = n(da(o));
            this.hasMutatedConstraints = !!l,
            l && (o = ci(l))
        }
        return o
    }
    startAnimation(e) {
        const {drag: n, dragMomentum: s, dragElastic: i, dragTransition: r, dragSnapToOrigin: o, onDragTransitionEnd: l} = this.getProps()
          , a = this.constraints || {}
          , u = I(h => {
            if (!Lt(h, n, this.currentDirection))
                return;
            let c = a && a[h] || {};
            o && (c = {
                min: 0,
                max: 0
            });
            const f = i ? 200 : 1e6
              , d = i ? 40 : 1e7
              , p = {
                type: "inertia",
                velocity: s ? e[h] : 0,
                bounceStiffness: f,
                bounceDamping: d,
                timeConstant: 750,
                restDelta: 1,
                restSpeed: 10,
                ...r,
                ...c
            };
            return this.startAxisValueAnimation(h, p)
        }
        );
        return Promise.all(u).then(l)
    }
    startAxisValueAnimation(e, n) {
        const s = this.getAxisMotionValue(e);
        return s.start(_e(e, s, 0, n, this.visualElement, !1, Te(this.visualElement, e)))
    }
    stopAnimation() {
        I(e => this.getAxisMotionValue(e).stop())
    }
    pauseAnimation() {
        I(e => {
            var n;
            return (n = this.getAxisMotionValue(e).animation) === null || n === void 0 ? void 0 : n.pause()
        }
        )
    }
    getAnimationState(e) {
        var n;
        return (n = this.getAxisMotionValue(e).animation) === null || n === void 0 ? void 0 : n.state
    }
    getAxisMotionValue(e) {
        const n = `_drag${e.toUpperCase()}`
          , s = this.visualElement.getProps()
          , i = s[n];
        return i || this.visualElement.getValue(e, (s.initial ? s.initial[e] : void 0) || 0)
    }
    snapToCursor(e) {
        I(n => {
            const {drag: s} = this.getProps();
            if (!Lt(n, s, this.currentDirection))
                return;
            const {projection: i} = this.visualElement
              , r = this.getAxisMotionValue(n);
            if (i && i.layout) {
                const {min: o, max: l} = i.layout.layoutBox[n];
                r.set(e[n] - w(o, l, .5))
            }
        }
        )
    }
    scalePositionWithinConstraints() {
        if (!this.visualElement.current)
            return;
        const {drag: e, dragConstraints: n} = this.getProps()
          , {projection: s} = this.visualElement;
        if (!at(n) || !s || !this.constraints)
            return;
        this.stopAnimation();
        const i = {
            x: 0,
            y: 0
        };
        I(o => {
            const l = this.getAxisMotionValue(o);
            if (l && this.constraints !== !1) {
                const a = l.get();
                i[o] = ca({
                    min: a,
                    max: a
                }, this.constraints[o])
            }
        }
        );
        const {transformTemplate: r} = this.visualElement.getProps();
        this.visualElement.current.style.transform = r ? r({}, "") : "none",
        s.root && s.root.updateScroll(),
        s.updateLayout(),
        this.resolveConstraints(),
        I(o => {
            if (!Lt(o, e, null))
                return;
            const l = this.getAxisMotionValue(o)
              , {min: a, max: u} = this.constraints[o];
            l.set(w(a, u, i[o]))
        }
        )
    }
    addListeners() {
        if (!this.visualElement.current)
            return;
        ya.set(this.visualElement, this);
        const e = this.visualElement.current
          , n = H(e, "pointerdown", a => {
            const {drag: u, dragListener: h=!0} = this.getProps();
            u && h && this.start(a)
        }
        )
          , s = () => {
            const {dragConstraints: a} = this.getProps();
            at(a) && a.current && (this.constraints = this.resolveRefConstraints())
        }
          , {projection: i} = this.visualElement
          , r = i.addEventListener("measure", s);
        i && !i.layout && (i.root && i.root.updateScroll(),
        i.updateLayout()),
        V.read(s);
        const o = W(window, "resize", () => this.scalePositionWithinConstraints())
          , l = i.addEventListener("didUpdate", ({delta: a, hasLayoutChanged: u}) => {
            this.isDragging && u && (I(h => {
                const c = this.getAxisMotionValue(h);
                c && (this.originPoint[h] += a[h].translate,
                c.set(c.get() + a[h].translate))
            }
            ),
            this.visualElement.render())
        }
        );
        return () => {
            o(),
            n(),
            r(),
            l && l()
        }
    }
    getProps() {
        const e = this.visualElement.getProps()
          , {drag: n=!1, dragDirectionLock: s=!1, dragPropagation: i=!1, dragConstraints: r=!1, dragElastic: o=Se, dragMomentum: l=!0} = e;
        return {
            ...e,
            drag: n,
            dragDirectionLock: s,
            dragPropagation: i,
            dragConstraints: r,
            dragElastic: o,
            dragMomentum: l
        }
    }
}
function Lt(t, e, n) {
    return (e === !0 || e === t) && (n === null || n === t)
}
function xa(t, e=10) {
    let n = null;
    return Math.abs(t.y) > e ? n = "y" : Math.abs(t.x) > e && (n = "x"),
    n
}
class Ta extends Q {
    constructor(e) {
        super(e),
        this.removeGroupControls = L,
        this.removeListeners = L,
        this.controls = new va(e)
    }
    mount() {
        const {dragControls: e} = this.node.getProps();
        e && (this.removeGroupControls = e.subscribe(this.controls)),
        this.removeListeners = this.controls.addListeners() || L
    }
    unmount() {
        this.removeGroupControls(),
        this.removeListeners()
    }
}
const Nn = t => (e, n) => {
    t && V.postRender( () => t(e, n))
}
;
class Pa extends Q {
    constructor() {
        super(...arguments),
        this.removePointerDownListener = L
    }
    onPointerDown(e) {
        this.session = new si(e,this.createPanHandlers(),{
            transformPagePoint: this.node.getTransformPagePoint(),
            contextWindow: pi(this.node)
        })
    }
    createPanHandlers() {
        const {onPanSessionStart: e, onPanStart: n, onPan: s, onPanEnd: i} = this.node.getProps();
        return {
            onSessionStart: Nn(e),
            onStart: Nn(n),
            onMove: s,
            onEnd: (r, o) => {
                delete this.session,
                i && V.postRender( () => i(r, o))
            }
        }
    }
    mount() {
        this.removePointerDownListener = H(this.node.current, "pointerdown", e => this.onPointerDown(e))
    }
    update() {
        this.session && this.session.updateHandlers(this.createPanHandlers())
    }
    unmount() {
        this.removePointerDownListener(),
        this.session && this.session.end()
    }
}
const Ge = P.createContext(null);
function Sa() {
    const t = P.useContext(Ge);
    if (t === null)
        return [!0, null];
    const {isPresent: e, onExitComplete: n, register: s} = t
      , i = P.useId();
    P.useEffect( () => s(i), []);
    const r = P.useCallback( () => n && n(i), [i, n]);
    return !e && n ? [!1, r] : [!0]
}
const mi = P.createContext({})
  , gi = P.createContext({})
  , Bt = {
    hasAnimatedSinceResize: !0,
    hasEverUpdated: !1
};
function Un(t, e) {
    return e.max === e.min ? 0 : t / (e.max - e.min) * 100
}
const pt = {
    correct: (t, e) => {
        if (!e.target)
            return t;
        if (typeof t == "string")
            if (T.test(t))
                t = parseFloat(t);
            else
                return t;
        const n = Un(t, e.target.x)
          , s = Un(t, e.target.y);
        return `${n}% ${s}%`
    }
}
  , Aa = {
    correct: (t, {treeScale: e, projectionDelta: n}) => {
        const s = t
          , i = Z.parse(t);
        if (i.length > 5)
            return s;
        const r = Z.createTransformer(t)
          , o = typeof i[0] != "number" ? 1 : 0
          , l = n.x.scale * e.x
          , a = n.y.scale * e.y;
        i[0 + o] /= l,
        i[1 + o] /= a;
        const u = w(l, a, .5);
        return typeof i[2 + o] == "number" && (i[2 + o] /= u),
        typeof i[3 + o] == "number" && (i[3 + o] /= u),
        r(i)
    }
}
  , Ut = {};
function ba(t) {
    Object.assign(Ut, t)
}
const {schedule: $e, cancel: pu} = ys(queueMicrotask, !1);
class Va extends P.Component {
    componentDidMount() {
        const {visualElement: e, layoutGroup: n, switchLayoutGroup: s, layoutId: i} = this.props
          , {projection: r} = e;
        ba(wa),
        r && (n.group && n.group.add(r),
        s && s.register && i && s.register(r),
        r.root.didUpdate(),
        r.addEventListener("animationComplete", () => {
            this.safeToRemove()
        }
        ),
        r.setOptions({
            ...r.options,
            onExitComplete: () => this.safeToRemove()
        })),
        Bt.hasEverUpdated = !0
    }
    getSnapshotBeforeUpdate(e) {
        const {layoutDependency: n, visualElement: s, drag: i, isPresent: r} = this.props
          , o = s.projection;
        return o && (o.isPresent = r,
        i || e.layoutDependency !== n || n === void 0 ? o.willUpdate() : this.safeToRemove(),
        e.isPresent !== r && (r ? o.promote() : o.relegate() || V.postRender( () => {
            const l = o.getStack();
            (!l || !l.members.length) && this.safeToRemove()
        }
        ))),
        null
    }
    componentDidUpdate() {
        const {projection: e} = this.props.visualElement;
        e && (e.root.didUpdate(),
        $e.postRender( () => {
            !e.currentAnimation && e.isLead() && this.safeToRemove()
        }
        ))
    }
    componentWillUnmount() {
        const {visualElement: e, layoutGroup: n, switchLayoutGroup: s} = this.props
          , {projection: i} = e;
        i && (i.scheduleCheckAfterUnmount(),
        n && n.group && n.group.remove(i),
        s && s.deregister && s.deregister(i))
    }
    safeToRemove() {
        const {safeToRemove: e} = this.props;
        e && e()
    }
    render() {
        return null
    }
}
function yi(t) {
    const [e,n] = Sa()
      , s = P.useContext(mi);
    return he.jsx(Va, {
        ...t,
        layoutGroup: s,
        switchLayoutGroup: P.useContext(gi),
        isPresent: e,
        safeToRemove: n
    })
}
const wa = {
    borderRadius: {
        ...pt,
        applyTo: ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomLeftRadius", "borderBottomRightRadius"]
    },
    borderTopLeftRadius: pt,
    borderTopRightRadius: pt,
    borderBottomLeftRadius: pt,
    borderBottomRightRadius: pt,
    boxShadow: Aa
}
  , vi = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"]
  , Ca = vi.length
  , Wn = t => typeof t == "string" ? parseFloat(t) : t
  , _n = t => typeof t == "number" || T.test(t);
function Ma(t, e, n, s, i, r) {
    i ? (t.opacity = w(0, n.opacity !== void 0 ? n.opacity : 1, Da(s)),
    t.opacityExit = w(e.opacity !== void 0 ? e.opacity : 1, 0, Ra(s))) : r && (t.opacity = w(e.opacity !== void 0 ? e.opacity : 1, n.opacity !== void 0 ? n.opacity : 1, s));
    for (let o = 0; o < Ca; o++) {
        const l = `border${vi[o]}Radius`;
        let a = Kn(e, l)
          , u = Kn(n, l);
        if (a === void 0 && u === void 0)
            continue;
        a || (a = 0),
        u || (u = 0),
        a === 0 || u === 0 || _n(a) === _n(u) ? (t[l] = Math.max(w(Wn(a), Wn(u), s), 0),
        (N.test(u) || N.test(a)) && (t[l] += "%")) : t[l] = u
    }
    (e.rotate || n.rotate) && (t.rotate = w(e.rotate || 0, n.rotate || 0, s))
}
function Kn(t, e) {
    return t[e] !== void 0 ? t[e] : t.borderRadius
}
const Da = xi(0, .5, Ks)
  , Ra = xi(.5, .95, L);
function xi(t, e, n) {
    return s => s < t ? 0 : s > e ? 1 : n(bt(t, e, s))
}
function Gn(t, e) {
    t.min = e.min,
    t.max = e.max
}
function O(t, e) {
    Gn(t.x, e.x),
    Gn(t.y, e.y)
}
function $n(t, e) {
    t.translate = e.translate,
    t.scale = e.scale,
    t.originPoint = e.originPoint,
    t.origin = e.origin
}
function Hn(t, e, n, s, i) {
    return t -= e,
    t = Nt(t, 1 / n, s),
    i !== void 0 && (t = Nt(t, 1 / i, s)),
    t
}
function Ea(t, e=0, n=1, s=.5, i, r=t, o=t) {
    if (N.test(e) && (e = parseFloat(e),
    e = w(o.min, o.max, e / 100) - o.min),
    typeof e != "number")
        return;
    let l = w(r.min, r.max, s);
    t === r && (l -= e),
    t.min = Hn(t.min, e, n, l, i),
    t.max = Hn(t.max, e, n, l, i)
}
function zn(t, e, [n,s,i], r, o) {
    Ea(t, e[n], e[s], e[i], e.scale, r, o)
}
const La = ["x", "scaleX", "originX"]
  , Fa = ["y", "scaleY", "originY"];
function Xn(t, e, n, s) {
    zn(t.x, e, La, n ? n.x : void 0, s ? s.x : void 0),
    zn(t.y, e, Fa, n ? n.y : void 0, s ? s.y : void 0)
}
function Yn(t) {
    return t.translate === 0 && t.scale === 1
}
function Ti(t) {
    return Yn(t.x) && Yn(t.y)
}
function qn(t, e) {
    return t.min === e.min && t.max === e.max
}
function Ba(t, e) {
    return qn(t.x, e.x) && qn(t.y, e.y)
}
function Zn(t, e) {
    return Math.round(t.min) === Math.round(e.min) && Math.round(t.max) === Math.round(e.max)
}
function Pi(t, e) {
    return Zn(t.x, e.x) && Zn(t.y, e.y)
}
function Jn(t) {
    return B(t.x) / B(t.y)
}
function Qn(t, e) {
    return t.translate === e.translate && t.scale === e.scale && t.originPoint === e.originPoint
}
class ka {
    constructor() {
        this.members = []
    }
    add(e) {
        Gt(this.members, e),
        e.scheduleRender()
    }
    remove(e) {
        if ($t(this.members, e),
        e === this.prevLead && (this.prevLead = void 0),
        e === this.lead) {
            const n = this.members[this.members.length - 1];
            n && this.promote(n)
        }
    }
    relegate(e) {
        const n = this.members.findIndex(i => e === i);
        if (n === 0)
            return !1;
        let s;
        for (let i = n; i >= 0; i--) {
            const r = this.members[i];
            if (r.isPresent !== !1) {
                s = r;
                break
            }
        }
        return s ? (this.promote(s),
        !0) : !1
    }
    promote(e, n) {
        const s = this.lead;
        if (e !== s && (this.prevLead = s,
        this.lead = e,
        e.show(),
        s)) {
            s.instance && s.scheduleRender(),
            e.scheduleRender(),
            e.resumeFrom = s,
            n && (e.resumeFrom.preserveOpacity = !0),
            s.snapshot && (e.snapshot = s.snapshot,
            e.snapshot.latestValues = s.animationValues || s.latestValues),
            e.root && e.root.isUpdating && (e.isLayoutDirty = !0);
            const {crossfade: i} = e.options;
            i === !1 && s.hide()
        }
    }
    exitAnimationComplete() {
        this.members.forEach(e => {
            const {options: n, resumingFrom: s} = e;
            n.onExitComplete && n.onExitComplete(),
            s && s.options.onExitComplete && s.options.onExitComplete()
        }
        )
    }
    scheduleRender() {
        this.members.forEach(e => {
            e.instance && e.scheduleRender(!1)
        }
        )
    }
    removeLeadSnapshot() {
        this.lead && this.lead.snapshot && (this.lead.snapshot = void 0)
    }
}
function ja(t, e, n) {
    let s = "";
    const i = t.x.translate / e.x
      , r = t.y.translate / e.y
      , o = (n == null ? void 0 : n.z) || 0;
    if ((i || r || o) && (s = `translate3d(${i}px, ${r}px, ${o}px) `),
    (e.x !== 1 || e.y !== 1) && (s += `scale(${1 / e.x}, ${1 / e.y}) `),
    n) {
        const {transformPerspective: u, rotate: h, rotateX: c, rotateY: f, skewX: d, skewY: p} = n;
        u && (s = `perspective(${u}px) ${s}`),
        h && (s += `rotate(${h}deg) `),
        c && (s += `rotateX(${c}deg) `),
        f && (s += `rotateY(${f}deg) `),
        d && (s += `skewX(${d}deg) `),
        p && (s += `skewY(${p}deg) `)
    }
    const l = t.x.scale * e.x
      , a = t.y.scale * e.y;
    return (l !== 1 || a !== 1) && (s += `scale(${l}, ${a})`),
    s || "none"
}
const Oa = (t, e) => t.depth - e.depth;
class Ia {
    constructor() {
        this.children = [],
        this.isDirty = !1
    }
    add(e) {
        Gt(this.children, e),
        this.isDirty = !0
    }
    remove(e) {
        $t(this.children, e),
        this.isDirty = !0
    }
    forEach(e) {
        this.isDirty && this.children.sort(Oa),
        this.isDirty = !1,
        this.children.forEach(e)
    }
}
function kt(t) {
    const e = E(t) ? t.get() : t;
    return Rr(e) ? e.toValue() : e
}
function Na(t, e) {
    const n = G.now()
      , s = ({timestamp: i}) => {
        const r = i - n;
        r >= e && (z(s),
        t(r - e))
    }
    ;
    return V.read(s, !0),
    () => z(s)
}
function Ua(t) {
    return t instanceof SVGElement && t.tagName !== "svg"
}
function Wa(t, e, n) {
    const s = E(t) ? t : Vt(t);
    return s.start(_e("", s, e, n)),
    s.animation
}
const nt = {
    type: "projectionFrame",
    totalNodes: 0,
    resolvedTargetDeltas: 0,
    recalculatedProjection: 0
}
  , gt = typeof window < "u" && window.MotionDebug !== void 0
  , re = ["", "X", "Y", "Z"]
  , _a = {
    visibility: "hidden"
}
  , ts = 1e3;
let Ka = 0;
function ae(t, e, n, s) {
    const {latestValues: i} = e;
    i[t] && (n[t] = i[t],
    e.setStaticValue(t, 0),
    s && (s[t] = 0))
}
function Si(t) {
    if (t.hasCheckedOptimisedAppear = !0,
    t.root === t)
        return;
    const {visualElement: e} = t.options;
    if (!e)
        return;
    const n = Qs(e);
    if (window.MotionHasOptimisedAnimation(n, "transform")) {
        const {layout: i, layoutId: r} = t.options;
        window.MotionCancelOptimisedAnimation(n, "transform", V, !(i || r))
    }
    const {parent: s} = t;
    s && !s.hasCheckedOptimisedAppear && Si(s)
}
function Ai({attachResizeListener: t, defaultParent: e, measureScroll: n, checkIsScrollRoot: s, resetTransform: i}) {
    return class {
        constructor(o={}, l=e == null ? void 0 : e()) {
            this.id = Ka++,
            this.animationId = 0,
            this.children = new Set,
            this.options = {},
            this.isTreeAnimating = !1,
            this.isAnimationBlocked = !1,
            this.isLayoutDirty = !1,
            this.isProjectionDirty = !1,
            this.isSharedProjectionDirty = !1,
            this.isTransformDirty = !1,
            this.updateManuallyBlocked = !1,
            this.updateBlockedByResize = !1,
            this.isUpdating = !1,
            this.isSVG = !1,
            this.needsReset = !1,
            this.shouldResetTransform = !1,
            this.hasCheckedOptimisedAppear = !1,
            this.treeScale = {
                x: 1,
                y: 1
            },
            this.eventHandlers = new Map,
            this.hasTreeAnimated = !1,
            this.updateScheduled = !1,
            this.scheduleUpdate = () => this.update(),
            this.projectionUpdateScheduled = !1,
            this.checkUpdateFailed = () => {
                this.isUpdating && (this.isUpdating = !1,
                this.clearAllSnapshots())
            }
            ,
            this.updateProjection = () => {
                this.projectionUpdateScheduled = !1,
                gt && (nt.totalNodes = nt.resolvedTargetDeltas = nt.recalculatedProjection = 0),
                this.nodes.forEach(Ha),
                this.nodes.forEach(Za),
                this.nodes.forEach(Ja),
                this.nodes.forEach(za),
                gt && window.MotionDebug.record(nt)
            }
            ,
            this.resolvedRelativeTargetAt = 0,
            this.hasProjected = !1,
            this.isVisible = !0,
            this.animationProgress = 0,
            this.sharedNodes = new Map,
            this.latestValues = o,
            this.root = l ? l.root || l : this,
            this.path = l ? [...l.path, l] : [],
            this.parent = l,
            this.depth = l ? l.depth + 1 : 0;
            for (let a = 0; a < this.path.length; a++)
                this.path[a].shouldResetTransform = !0;
            this.root === this && (this.nodes = new Ia)
        }
        addEventListener(o, l) {
            return this.eventHandlers.has(o) || this.eventHandlers.set(o, new Ke),
            this.eventHandlers.get(o).add(l)
        }
        notifyListeners(o, ...l) {
            const a = this.eventHandlers.get(o);
            a && a.notify(...l)
        }
        hasListeners(o) {
            return this.eventHandlers.has(o)
        }
        mount(o, l=this.root.hasTreeAnimated) {
            if (this.instance)
                return;
            this.isSVG = Ua(o),
            this.instance = o;
            const {layoutId: a, layout: u, visualElement: h} = this.options;
            if (h && !h.current && h.mount(o),
            this.root.nodes.add(this),
            this.parent && this.parent.children.add(this),
            l && (u || a) && (this.isLayoutDirty = !0),
            t) {
                let c;
                const f = () => this.root.updateBlockedByResize = !1;
                t(o, () => {
                    this.root.updateBlockedByResize = !0,
                    c && c(),
                    c = Na(f, 250),
                    Bt.hasAnimatedSinceResize && (Bt.hasAnimatedSinceResize = !1,
                    this.nodes.forEach(ns))
                }
                )
            }
            a && this.root.registerSharedNode(a, this),
            this.options.animate !== !1 && h && (a || u) && this.addEventListener("didUpdate", ({delta: c, hasLayoutChanged: f, hasRelativeTargetChanged: d, layout: p}) => {
                if (this.isTreeAnimationBlocked()) {
                    this.target = void 0,
                    this.relativeTarget = void 0;
                    return
                }
                const g = this.options.transition || h.getDefaultTransition() || sl
                  , {onLayoutAnimationStart: v, onLayoutAnimationComplete: m} = h.getProps()
                  , x = !this.targetLayout || !Pi(this.targetLayout, p) || d
                  , y = !f && d;
                if (this.options.layoutRoot || this.resumeFrom && this.resumeFrom.instance || y || f && (x || !this.currentAnimation)) {
                    this.resumeFrom && (this.resumingFrom = this.resumeFrom,
                    this.resumingFrom.resumingFrom = void 0),
                    this.setAnimationOrigin(c, y);
                    const S = {
                        ...Re(g, "layout"),
                        onPlay: v,
                        onComplete: m
                    };
                    (h.shouldReduceMotion || this.options.layoutRoot) && (S.delay = 0,
                    S.type = !1),
                    this.startAnimation(S)
                } else
                    f || ns(this),
                    this.isLead() && this.options.onExitComplete && this.options.onExitComplete();
                this.targetLayout = p
            }
            )
        }
        unmount() {
            this.options.layoutId && this.willUpdate(),
            this.root.nodes.remove(this);
            const o = this.getStack();
            o && o.remove(this),
            this.parent && this.parent.children.delete(this),
            this.instance = void 0,
            z(this.updateProjection)
        }
        blockUpdate() {
            this.updateManuallyBlocked = !0
        }
        unblockUpdate() {
            this.updateManuallyBlocked = !1
        }
        isUpdateBlocked() {
            return this.updateManuallyBlocked || this.updateBlockedByResize
        }
        isTreeAnimationBlocked() {
            return this.isAnimationBlocked || this.parent && this.parent.isTreeAnimationBlocked() || !1
        }
        startUpdate() {
            this.isUpdateBlocked() || (this.isUpdating = !0,
            this.nodes && this.nodes.forEach(Qa),
            this.animationId++)
        }
        getTransformTemplate() {
            const {visualElement: o} = this.options;
            return o && o.getProps().transformTemplate
        }
        willUpdate(o=!0) {
            if (this.root.hasTreeAnimated = !0,
            this.root.isUpdateBlocked()) {
                this.options.onExitComplete && this.options.onExitComplete();
                return
            }
            if (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear && Si(this),
            !this.root.isUpdating && this.root.startUpdate(),
            this.isLayoutDirty)
                return;
            this.isLayoutDirty = !0;
            for (let h = 0; h < this.path.length; h++) {
                const c = this.path[h];
                c.shouldResetTransform = !0,
                c.updateScroll("snapshot"),
                c.options.layoutRoot && c.willUpdate(!1)
            }
            const {layoutId: l, layout: a} = this.options;
            if (l === void 0 && !a)
                return;
            const u = this.getTransformTemplate();
            this.prevTransformTemplateValue = u ? u(this.latestValues, "") : void 0,
            this.updateSnapshot(),
            o && this.notifyListeners("willUpdate")
        }
        update() {
            if (this.updateScheduled = !1,
            this.isUpdateBlocked()) {
                this.unblockUpdate(),
                this.clearAllSnapshots(),
                this.nodes.forEach(es);
                return
            }
            this.isUpdating || this.nodes.forEach(Ya),
            this.isUpdating = !1,
            this.nodes.forEach(qa),
            this.nodes.forEach(Ga),
            this.nodes.forEach($a),
            this.clearAllSnapshots();
            const l = G.now();
            D.delta = q(0, 1e3 / 60, l - D.timestamp),
            D.timestamp = l,
            D.isProcessing = !0,
            Jt.update.process(D),
            Jt.preRender.process(D),
            Jt.render.process(D),
            D.isProcessing = !1
        }
        didUpdate() {
            this.updateScheduled || (this.updateScheduled = !0,
            $e.read(this.scheduleUpdate))
        }
        clearAllSnapshots() {
            this.nodes.forEach(Xa),
            this.sharedNodes.forEach(tl)
        }
        scheduleUpdateProjection() {
            this.projectionUpdateScheduled || (this.projectionUpdateScheduled = !0,
            V.preRender(this.updateProjection, !1, !0))
        }
        scheduleCheckAfterUnmount() {
            V.postRender( () => {
                this.isLayoutDirty ? this.root.didUpdate() : this.root.checkUpdateFailed()
            }
            )
        }
        updateSnapshot() {
            this.snapshot || !this.instance || (this.snapshot = this.measure())
        }
        updateLayout() {
            if (!this.instance || (this.updateScroll(),
            !(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty))
                return;
            if (this.resumeFrom && !this.resumeFrom.instance)
                for (let a = 0; a < this.path.length; a++)
                    this.path[a].updateScroll();
            const o = this.layout;
            this.layout = this.measure(!1),
            this.layoutCorrected = C(),
            this.isLayoutDirty = !1,
            this.projectionDelta = void 0,
            this.notifyListeners("measure", this.layout.layoutBox);
            const {visualElement: l} = this.options;
            l && l.notify("LayoutMeasure", this.layout.layoutBox, o ? o.layoutBox : void 0)
        }
        updateScroll(o="measure") {
            let l = !!(this.options.layoutScroll && this.instance);
            if (this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === o && (l = !1),
            l) {
                const a = s(this.instance);
                this.scroll = {
                    animationId: this.root.animationId,
                    phase: o,
                    isRoot: a,
                    offset: n(this.instance),
                    wasRoot: this.scroll ? this.scroll.isRoot : a
                }
            }
        }
        resetTransform() {
            if (!i)
                return;
            const o = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout
              , l = this.projectionDelta && !Ti(this.projectionDelta)
              , a = this.getTransformTemplate()
              , u = a ? a(this.latestValues, "") : void 0
              , h = u !== this.prevTransformTemplateValue;
            o && (l || et(this.latestValues) || h) && (i(this.instance, u),
            this.shouldResetTransform = !1,
            this.scheduleRender())
        }
        measure(o=!0) {
            const l = this.measurePageBox();
            let a = this.removeElementScroll(l);
            return o && (a = this.removeTransform(a)),
            il(a),
            {
                animationId: this.root.animationId,
                measuredBox: l,
                layoutBox: a,
                latestValues: {},
                source: this.id
            }
        }
        measurePageBox() {
            var o;
            const {visualElement: l} = this.options;
            if (!l)
                return C();
            const a = l.measureViewportBox();
            if (!(((o = this.scroll) === null || o === void 0 ? void 0 : o.wasRoot) || this.path.some(ol))) {
                const {scroll: h} = this.root;
                h && (ut(a.x, h.offset.x),
                ut(a.y, h.offset.y))
            }
            return a
        }
        removeElementScroll(o) {
            var l;
            const a = C();
            if (O(a, o),
            !((l = this.scroll) === null || l === void 0) && l.wasRoot)
                return a;
            for (let u = 0; u < this.path.length; u++) {
                const h = this.path[u]
                  , {scroll: c, options: f} = h;
                h !== this.root && c && f.layoutScroll && (c.wasRoot && O(a, o),
                ut(a.x, c.offset.x),
                ut(a.y, c.offset.y))
            }
            return a
        }
        applyTransform(o, l=!1) {
            const a = C();
            O(a, o);
            for (let u = 0; u < this.path.length; u++) {
                const h = this.path[u];
                !l && h.options.layoutScroll && h.scroll && h !== h.root && ct(a, {
                    x: -h.scroll.offset.x,
                    y: -h.scroll.offset.y
                }),
                et(h.latestValues) && ct(a, h.latestValues)
            }
            return et(this.latestValues) && ct(a, this.latestValues),
            a
        }
        removeTransform(o) {
            const l = C();
            O(l, o);
            for (let a = 0; a < this.path.length; a++) {
                const u = this.path[a];
                if (!u.instance || !et(u.latestValues))
                    continue;
                Ae(u.latestValues) && u.updateSnapshot();
                const h = C()
                  , c = u.measurePageBox();
                O(h, c),
                Xn(l, u.latestValues, u.snapshot ? u.snapshot.layoutBox : void 0, h)
            }
            return et(this.latestValues) && Xn(l, this.latestValues),
            l
        }
        setTargetDelta(o) {
            this.targetDelta = o,
            this.root.scheduleUpdateProjection(),
            this.isProjectionDirty = !0
        }
        setOptions(o) {
            this.options = {
                ...this.options,
                ...o,
                crossfade: o.crossfade !== void 0 ? o.crossfade : !0
            }
        }
        clearMeasurements() {
            this.scroll = void 0,
            this.layout = void 0,
            this.snapshot = void 0,
            this.prevTransformTemplateValue = void 0,
            this.targetDelta = void 0,
            this.target = void 0,
            this.isLayoutDirty = !1
        }
        forceRelativeParentToResolveTarget() {
            this.relativeParent && this.relativeParent.resolvedRelativeTargetAt !== D.timestamp && this.relativeParent.resolveTargetDelta(!0)
        }
        resolveTargetDelta(o=!1) {
            var l;
            const a = this.getLead();
            this.isProjectionDirty || (this.isProjectionDirty = a.isProjectionDirty),
            this.isTransformDirty || (this.isTransformDirty = a.isTransformDirty),
            this.isSharedProjectionDirty || (this.isSharedProjectionDirty = a.isSharedProjectionDirty);
            const u = !!this.resumingFrom || this !== a;
            if (!(o || u && this.isSharedProjectionDirty || this.isProjectionDirty || !((l = this.parent) === null || l === void 0) && l.isProjectionDirty || this.attemptToResolveRelativeTarget || this.root.updateBlockedByResize))
                return;
            const {layout: c, layoutId: f} = this.options;
            if (!(!this.layout || !(c || f))) {
                if (this.resolvedRelativeTargetAt = D.timestamp,
                !this.targetDelta && !this.relativeTarget) {
                    const d = this.getClosestProjectingParent();
                    d && d.layout && this.animationProgress !== 1 ? (this.relativeParent = d,
                    this.forceRelativeParentToResolveTarget(),
                    this.relativeTarget = C(),
                    this.relativeTargetOrigin = C(),
                    Tt(this.relativeTargetOrigin, this.layout.layoutBox, d.layout.layoutBox),
                    O(this.relativeTarget, this.relativeTargetOrigin)) : this.relativeParent = this.relativeTarget = void 0
                }
                if (!(!this.relativeTarget && !this.targetDelta)) {
                    if (this.target || (this.target = C(),
                    this.targetWithTransforms = C()),
                    this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target ? (this.forceRelativeParentToResolveTarget(),
                    ra(this.target, this.relativeTarget, this.relativeParent.target)) : this.targetDelta ? (this.resumingFrom ? this.target = this.applyTransform(this.layout.layoutBox) : O(this.target, this.layout.layoutBox),
                    fi(this.target, this.targetDelta)) : O(this.target, this.layout.layoutBox),
                    this.attemptToResolveRelativeTarget) {
                        this.attemptToResolveRelativeTarget = !1;
                        const d = this.getClosestProjectingParent();
                        d && !!d.resumingFrom == !!this.resumingFrom && !d.options.layoutScroll && d.target && this.animationProgress !== 1 ? (this.relativeParent = d,
                        this.forceRelativeParentToResolveTarget(),
                        this.relativeTarget = C(),
                        this.relativeTargetOrigin = C(),
                        Tt(this.relativeTargetOrigin, this.target, d.target),
                        O(this.relativeTarget, this.relativeTargetOrigin)) : this.relativeParent = this.relativeTarget = void 0
                    }
                    gt && nt.resolvedTargetDeltas++
                }
            }
        }
        getClosestProjectingParent() {
            if (!(!this.parent || Ae(this.parent.latestValues) || hi(this.parent.latestValues)))
                return this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent()
        }
        isProjecting() {
            return !!((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout)
        }
        calcProjection() {
            var o;
            const l = this.getLead()
              , a = !!this.resumingFrom || this !== l;
            let u = !0;
            if ((this.isProjectionDirty || !((o = this.parent) === null || o === void 0) && o.isProjectionDirty) && (u = !1),
            a && (this.isSharedProjectionDirty || this.isTransformDirty) && (u = !1),
            this.resolvedRelativeTargetAt === D.timestamp && (u = !1),
            u)
                return;
            const {layout: h, layoutId: c} = this.options;
            if (this.isTreeAnimating = !!(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation),
            this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0),
            !this.layout || !(h || c))
                return;
            O(this.layoutCorrected, this.layout.layoutBox);
            const f = this.treeScale.x
              , d = this.treeScale.y;
            ma(this.layoutCorrected, this.treeScale, this.path, a),
            l.layout && !l.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1) && (l.target = l.layout.layoutBox,
            l.targetWithTransforms = C());
            const {target: p} = l;
            if (!p) {
                this.prevProjectionDelta && (this.createProjectionDeltas(),
                this.scheduleRender());
                return
            }
            !this.projectionDelta || !this.prevProjectionDelta ? this.createProjectionDeltas() : ($n(this.prevProjectionDelta.x, this.projectionDelta.x),
            $n(this.prevProjectionDelta.y, this.projectionDelta.y)),
            xt(this.projectionDelta, this.layoutCorrected, p, this.latestValues),
            (this.treeScale.x !== f || this.treeScale.y !== d || !Qn(this.projectionDelta.x, this.prevProjectionDelta.x) || !Qn(this.projectionDelta.y, this.prevProjectionDelta.y)) && (this.hasProjected = !0,
            this.scheduleRender(),
            this.notifyListeners("projectionUpdate", p)),
            gt && nt.recalculatedProjection++
        }
        hide() {
            this.isVisible = !1
        }
        show() {
            this.isVisible = !0
        }
        scheduleRender(o=!0) {
            var l;
            if ((l = this.options.visualElement) === null || l === void 0 || l.scheduleRender(),
            o) {
                const a = this.getStack();
                a && a.scheduleRender()
            }
            this.resumingFrom && !this.resumingFrom.instance && (this.resumingFrom = void 0)
        }
        createProjectionDeltas() {
            this.prevProjectionDelta = lt(),
            this.projectionDelta = lt(),
            this.projectionDeltaWithTransform = lt()
        }
        setAnimationOrigin(o, l=!1) {
            const a = this.snapshot
              , u = a ? a.latestValues : {}
              , h = {
                ...this.latestValues
            }
              , c = lt();
            (!this.relativeParent || !this.relativeParent.options.layoutRoot) && (this.relativeTarget = this.relativeTargetOrigin = void 0),
            this.attemptToResolveRelativeTarget = !l;
            const f = C()
              , d = a ? a.source : void 0
              , p = this.layout ? this.layout.source : void 0
              , g = d !== p
              , v = this.getStack()
              , m = !v || v.members.length <= 1
              , x = !!(g && !m && this.options.crossfade === !0 && !this.path.some(nl));
            this.animationProgress = 0;
            let y;
            this.mixTargetDelta = S => {
                const A = S / 1e3;
                ss(c.x, o.x, A),
                ss(c.y, o.y, A),
                this.setTargetDelta(c),
                this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout && (Tt(f, this.layout.layoutBox, this.relativeParent.layout.layoutBox),
                el(this.relativeTarget, this.relativeTargetOrigin, f, A),
                y && Ba(this.relativeTarget, y) && (this.isProjectionDirty = !1),
                y || (y = C()),
                O(y, this.relativeTarget)),
                g && (this.animationValues = h,
                Ma(h, u, this.latestValues, A, x, m)),
                this.root.scheduleUpdateProjection(),
                this.scheduleRender(),
                this.animationProgress = A
            }
            ,
            this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0)
        }
        startAnimation(o) {
            this.notifyListeners("animationStart"),
            this.currentAnimation && this.currentAnimation.stop(),
            this.resumingFrom && this.resumingFrom.currentAnimation && this.resumingFrom.currentAnimation.stop(),
            this.pendingAnimation && (z(this.pendingAnimation),
            this.pendingAnimation = void 0),
            this.pendingAnimation = V.update( () => {
                Bt.hasAnimatedSinceResize = !0,
                this.currentAnimation = Wa(0, ts, {
                    ...o,
                    onUpdate: l => {
                        this.mixTargetDelta(l),
                        o.onUpdate && o.onUpdate(l)
                    }
                    ,
                    onComplete: () => {
                        o.onComplete && o.onComplete(),
                        this.completeAnimation()
                    }
                }),
                this.resumingFrom && (this.resumingFrom.currentAnimation = this.currentAnimation),
                this.pendingAnimation = void 0
            }
            )
        }
        completeAnimation() {
            this.resumingFrom && (this.resumingFrom.currentAnimation = void 0,
            this.resumingFrom.preserveOpacity = void 0);
            const o = this.getStack();
            o && o.exitAnimationComplete(),
            this.resumingFrom = this.currentAnimation = this.animationValues = void 0,
            this.notifyListeners("animationComplete")
        }
        finishAnimation() {
            this.currentAnimation && (this.mixTargetDelta && this.mixTargetDelta(ts),
            this.currentAnimation.stop()),
            this.completeAnimation()
        }
        applyTransformsToTarget() {
            const o = this.getLead();
            let {targetWithTransforms: l, target: a, layout: u, latestValues: h} = o;
            if (!(!l || !a || !u)) {
                if (this !== o && this.layout && u && bi(this.options.animationType, this.layout.layoutBox, u.layoutBox)) {
                    a = this.target || C();
                    const c = B(this.layout.layoutBox.x);
                    a.x.min = o.target.x.min,
                    a.x.max = a.x.min + c;
                    const f = B(this.layout.layoutBox.y);
                    a.y.min = o.target.y.min,
                    a.y.max = a.y.min + f
                }
                O(l, a),
                ct(l, h),
                xt(this.projectionDeltaWithTransform, this.layoutCorrected, l, h)
            }
        }
        registerSharedNode(o, l) {
            this.sharedNodes.has(o) || this.sharedNodes.set(o, new ka),
            this.sharedNodes.get(o).add(l);
            const u = l.options.initialPromotionConfig;
            l.promote({
                transition: u ? u.transition : void 0,
                preserveFollowOpacity: u && u.shouldPreserveFollowOpacity ? u.shouldPreserveFollowOpacity(l) : void 0
            })
        }
        isLead() {
            const o = this.getStack();
            return o ? o.lead === this : !0
        }
        getLead() {
            var o;
            const {layoutId: l} = this.options;
            return l ? ((o = this.getStack()) === null || o === void 0 ? void 0 : o.lead) || this : this
        }
        getPrevLead() {
            var o;
            const {layoutId: l} = this.options;
            return l ? (o = this.getStack()) === null || o === void 0 ? void 0 : o.prevLead : void 0
        }
        getStack() {
            const {layoutId: o} = this.options;
            if (o)
                return this.root.sharedNodes.get(o)
        }
        promote({needsReset: o, transition: l, preserveFollowOpacity: a}={}) {
            const u = this.getStack();
            u && u.promote(this, a),
            o && (this.projectionDelta = void 0,
            this.needsReset = !0),
            l && this.setOptions({
                transition: l
            })
        }
        relegate() {
            const o = this.getStack();
            return o ? o.relegate(this) : !1
        }
        resetSkewAndRotation() {
            const {visualElement: o} = this.options;
            if (!o)
                return;
            let l = !1;
            const {latestValues: a} = o;
            if ((a.z || a.rotate || a.rotateX || a.rotateY || a.rotateZ || a.skewX || a.skewY) && (l = !0),
            !l)
                return;
            const u = {};
            a.z && ae("z", o, u, this.animationValues);
            for (let h = 0; h < re.length; h++)
                ae(`rotate${re[h]}`, o, u, this.animationValues),
                ae(`skew${re[h]}`, o, u, this.animationValues);
            o.render();
            for (const h in u)
                o.setStaticValue(h, u[h]),
                this.animationValues && (this.animationValues[h] = u[h]);
            o.scheduleRender()
        }
        getProjectionStyles(o) {
            var l, a;
            if (!this.instance || this.isSVG)
                return;
            if (!this.isVisible)
                return _a;
            const u = {
                visibility: ""
            }
              , h = this.getTransformTemplate();
            if (this.needsReset)
                return this.needsReset = !1,
                u.opacity = "",
                u.pointerEvents = kt(o == null ? void 0 : o.pointerEvents) || "",
                u.transform = h ? h(this.latestValues, "") : "none",
                u;
            const c = this.getLead();
            if (!this.projectionDelta || !this.layout || !c.target) {
                const g = {};
                return this.options.layoutId && (g.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1,
                g.pointerEvents = kt(o == null ? void 0 : o.pointerEvents) || ""),
                this.hasProjected && !et(this.latestValues) && (g.transform = h ? h({}, "") : "none",
                this.hasProjected = !1),
                g
            }
            const f = c.animationValues || c.latestValues;
            this.applyTransformsToTarget(),
            u.transform = ja(this.projectionDeltaWithTransform, this.treeScale, f),
            h && (u.transform = h(f, u.transform));
            const {x: d, y: p} = this.projectionDelta;
            u.transformOrigin = `${d.origin * 100}% ${p.origin * 100}% 0`,
            c.animationValues ? u.opacity = c === this ? (a = (l = f.opacity) !== null && l !== void 0 ? l : this.latestValues.opacity) !== null && a !== void 0 ? a : 1 : this.preserveOpacity ? this.latestValues.opacity : f.opacityExit : u.opacity = c === this ? f.opacity !== void 0 ? f.opacity : "" : f.opacityExit !== void 0 ? f.opacityExit : 0;
            for (const g in Ut) {
                if (f[g] === void 0)
                    continue;
                const {correct: v, applyTo: m} = Ut[g]
                  , x = u.transform === "none" ? f[g] : v(f[g], c);
                if (m) {
                    const y = m.length;
                    for (let S = 0; S < y; S++)
                        u[m[S]] = x
                } else
                    u[g] = x
            }
            return this.options.layoutId && (u.pointerEvents = c === this ? kt(o == null ? void 0 : o.pointerEvents) || "" : "none"),
            u
        }
        clearSnapshot() {
            this.resumeFrom = this.snapshot = void 0
        }
        resetTree() {
            this.root.nodes.forEach(o => {
                var l;
                return (l = o.currentAnimation) === null || l === void 0 ? void 0 : l.stop()
            }
            ),
            this.root.nodes.forEach(es),
            this.root.sharedNodes.clear()
        }
    }
}
function Ga(t) {
    t.updateLayout()
}
function $a(t) {
    var e;
    const n = ((e = t.resumeFrom) === null || e === void 0 ? void 0 : e.snapshot) || t.snapshot;
    if (t.isLead() && t.layout && n && t.hasListeners("didUpdate")) {
        const {layoutBox: s, measuredBox: i} = t.layout
          , {animationType: r} = t.options
          , o = n.source !== t.layout.source;
        r === "size" ? I(c => {
            const f = o ? n.measuredBox[c] : n.layoutBox[c]
              , d = B(f);
            f.min = s[c].min,
            f.max = f.min + d
        }
        ) : bi(r, n.layoutBox, s) && I(c => {
            const f = o ? n.measuredBox[c] : n.layoutBox[c]
              , d = B(s[c]);
            f.max = f.min + d,
            t.relativeTarget && !t.currentAnimation && (t.isProjectionDirty = !0,
            t.relativeTarget[c].max = t.relativeTarget[c].min + d)
        }
        );
        const l = lt();
        xt(l, s, n.layoutBox);
        const a = lt();
        o ? xt(a, t.applyTransform(i, !0), n.measuredBox) : xt(a, s, n.layoutBox);
        const u = !Ti(l);
        let h = !1;
        if (!t.resumeFrom) {
            const c = t.getClosestProjectingParent();
            if (c && !c.resumeFrom) {
                const {snapshot: f, layout: d} = c;
                if (f && d) {
                    const p = C();
                    Tt(p, n.layoutBox, f.layoutBox);
                    const g = C();
                    Tt(g, s, d.layoutBox),
                    Pi(p, g) || (h = !0),
                    c.options.layoutRoot && (t.relativeTarget = g,
                    t.relativeTargetOrigin = p,
                    t.relativeParent = c)
                }
            }
        }
        t.notifyListeners("didUpdate", {
            layout: s,
            snapshot: n,
            delta: a,
            layoutDelta: l,
            hasLayoutChanged: u,
            hasRelativeTargetChanged: h
        })
    } else if (t.isLead()) {
        const {onExitComplete: s} = t.options;
        s && s()
    }
    t.options.transition = void 0
}
function Ha(t) {
    gt && nt.totalNodes++,
    t.parent && (t.isProjecting() || (t.isProjectionDirty = t.parent.isProjectionDirty),
    t.isSharedProjectionDirty || (t.isSharedProjectionDirty = !!(t.isProjectionDirty || t.parent.isProjectionDirty || t.parent.isSharedProjectionDirty)),
    t.isTransformDirty || (t.isTransformDirty = t.parent.isTransformDirty))
}
function za(t) {
    t.isProjectionDirty = t.isSharedProjectionDirty = t.isTransformDirty = !1
}
function Xa(t) {
    t.clearSnapshot()
}
function es(t) {
    t.clearMeasurements()
}
function Ya(t) {
    t.isLayoutDirty = !1
}
function qa(t) {
    const {visualElement: e} = t.options;
    e && e.getProps().onBeforeLayoutMeasure && e.notify("BeforeLayoutMeasure"),
    t.resetTransform()
}
function ns(t) {
    t.finishAnimation(),
    t.targetDelta = t.relativeTarget = t.target = void 0,
    t.isProjectionDirty = !0
}
function Za(t) {
    t.resolveTargetDelta()
}
function Ja(t) {
    t.calcProjection()
}
function Qa(t) {
    t.resetSkewAndRotation()
}
function tl(t) {
    t.removeLeadSnapshot()
}
function ss(t, e, n) {
    t.translate = w(e.translate, 0, n),
    t.scale = w(e.scale, 1, n),
    t.origin = e.origin,
    t.originPoint = e.originPoint
}
function is(t, e, n, s) {
    t.min = w(e.min, n.min, s),
    t.max = w(e.max, n.max, s)
}
function el(t, e, n, s) {
    is(t.x, e.x, n.x, s),
    is(t.y, e.y, n.y, s)
}
function nl(t) {
    return t.animationValues && t.animationValues.opacityExit !== void 0
}
const sl = {
    duration: .45,
    ease: [.4, 0, .1, 1]
}
  , os = t => typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(t)
  , rs = os("applewebkit/") && !os("chrome/") ? Math.round : L;
function as(t) {
    t.min = rs(t.min),
    t.max = rs(t.max)
}
function il(t) {
    as(t.x),
    as(t.y)
}
function bi(t, e, n) {
    return t === "position" || t === "preserve-aspect" && !oa(Jn(e), Jn(n), .2)
}
function ol(t) {
    var e;
    return t !== t.root && ((e = t.scroll) === null || e === void 0 ? void 0 : e.wasRoot)
}
const rl = Ai({
    attachResizeListener: (t, e) => W(t, "resize", e),
    measureScroll: () => ({
        x: document.documentElement.scrollLeft || document.body.scrollLeft,
        y: document.documentElement.scrollTop || document.body.scrollTop
    }),
    checkIsScrollRoot: () => !0
})
  , le = {
    current: void 0
}
  , Vi = Ai({
    measureScroll: t => ({
        x: t.scrollLeft,
        y: t.scrollTop
    }),
    defaultParent: () => {
        if (!le.current) {
            const t = new rl({});
            t.mount(window),
            t.setOptions({
                layoutScroll: !0
            }),
            le.current = t
        }
        return le.current
    }
    ,
    resetTransform: (t, e) => {
        t.style.transform = e !== void 0 ? e : "none"
    }
    ,
    checkIsScrollRoot: t => window.getComputedStyle(t).position === "fixed"
})
  , al = {
    pan: {
        Feature: Pa
    },
    drag: {
        Feature: Ta,
        ProjectionNode: Vi,
        MeasureLayout: yi
    }
};
function ls(t, e) {
    const n = e ? "pointerenter" : "pointerleave"
      , s = e ? "onHoverStart" : "onHoverEnd"
      , i = (r, o) => {
        if (r.pointerType === "touch" || ai())
            return;
        const l = t.getProps();
        t.animationState && l.whileHover && t.animationState.setActive("whileHover", e);
        const a = l[s];
        a && V.postRender( () => a(r, o))
    }
    ;
    return H(t.current, n, i, {
        passive: !t.getProps()[s]
    })
}
class ll extends Q {
    mount() {
        this.unmount = $(ls(this.node, !0), ls(this.node, !1))
    }
    unmount() {}
}
class ul extends Q {
    constructor() {
        super(...arguments),
        this.isActive = !1
    }
    onFocus() {
        let e = !1;
        try {
            e = this.node.current.matches(":focus-visible")
        } catch {
            e = !0
        }
        !e || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !0),
        this.isActive = !0)
    }
    onBlur() {
        !this.isActive || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !1),
        this.isActive = !1)
    }
    mount() {
        this.unmount = $(W(this.node.current, "focus", () => this.onFocus()), W(this.node.current, "blur", () => this.onBlur()))
    }
    unmount() {}
}
const wi = (t, e) => e ? t === e ? !0 : wi(t, e.parentElement) : !1;
function ue(t, e) {
    if (!e)
        return;
    const n = new PointerEvent("pointer" + t);
    e(n, zt(n))
}
class cl extends Q {
    constructor() {
        super(...arguments),
        this.removeStartListeners = L,
        this.removeEndListeners = L,
        this.removeAccessibleListeners = L,
        this.startPointerPress = (e, n) => {
            if (this.isPressing)
                return;
            this.removeEndListeners();
            const s = this.node.getProps()
              , r = H(window, "pointerup", (l, a) => {
                if (!this.checkPressEnd())
                    return;
                const {onTap: u, onTapCancel: h, globalTapTarget: c} = this.node.getProps()
                  , f = !c && !wi(this.node.current, l.target) ? h : u;
                f && V.update( () => f(l, a))
            }
            , {
                passive: !(s.onTap || s.onPointerUp)
            })
              , o = H(window, "pointercancel", (l, a) => this.cancelPress(l, a), {
                passive: !(s.onTapCancel || s.onPointerCancel)
            });
            this.removeEndListeners = $(r, o),
            this.startPress(e, n)
        }
        ,
        this.startAccessiblePress = () => {
            const e = r => {
                if (r.key !== "Enter" || this.isPressing)
                    return;
                const o = l => {
                    l.key !== "Enter" || !this.checkPressEnd() || ue("up", (a, u) => {
                        const {onTap: h} = this.node.getProps();
                        h && V.postRender( () => h(a, u))
                    }
                    )
                }
                ;
                this.removeEndListeners(),
                this.removeEndListeners = W(this.node.current, "keyup", o),
                ue("down", (l, a) => {
                    this.startPress(l, a)
                }
                )
            }
              , n = W(this.node.current, "keydown", e)
              , s = () => {
                this.isPressing && ue("cancel", (r, o) => this.cancelPress(r, o))
            }
              , i = W(this.node.current, "blur", s);
            this.removeAccessibleListeners = $(n, i)
        }
    }
    startPress(e, n) {
        this.isPressing = !0;
        const {onTapStart: s, whileTap: i} = this.node.getProps();
        i && this.node.animationState && this.node.animationState.setActive("whileTap", !0),
        s && V.postRender( () => s(e, n))
    }
    checkPressEnd() {
        return this.removeEndListeners(),
        this.isPressing = !1,
        this.node.getProps().whileTap && this.node.animationState && this.node.animationState.setActive("whileTap", !1),
        !ai()
    }
    cancelPress(e, n) {
        if (!this.checkPressEnd())
            return;
        const {onTapCancel: s} = this.node.getProps();
        s && V.postRender( () => s(e, n))
    }
    mount() {
        const e = this.node.getProps()
          , n = H(e.globalTapTarget ? window : this.node.current, "pointerdown", this.startPointerPress, {
            passive: !(e.onTapStart || e.onPointerStart)
        })
          , s = W(this.node.current, "focus", this.startAccessiblePress);
        this.removeStartListeners = $(n, s)
    }
    unmount() {
        this.removeStartListeners(),
        this.removeEndListeners(),
        this.removeAccessibleListeners()
    }
}
const Ve = new WeakMap
  , ce = new WeakMap
  , hl = t => {
    const e = Ve.get(t.target);
    e && e(t)
}
  , fl = t => {
    t.forEach(hl)
}
;
function dl({root: t, ...e}) {
    const n = t || document;
    ce.has(n) || ce.set(n, {});
    const s = ce.get(n)
      , i = JSON.stringify(e);
    return s[i] || (s[i] = new IntersectionObserver(fl,{
        root: t,
        ...e
    })),
    s[i]
}
function pl(t, e, n) {
    const s = dl(e);
    return Ve.set(t, n),
    s.observe(t),
    () => {
        Ve.delete(t),
        s.unobserve(t)
    }
}
const ml = {
    some: 0,
    all: 1
};
class gl extends Q {
    constructor() {
        super(...arguments),
        this.hasEnteredView = !1,
        this.isInView = !1
    }
    startObserver() {
        this.unmount();
        const {viewport: e={}} = this.node.getProps()
          , {root: n, margin: s, amount: i="some", once: r} = e
          , o = {
            root: n ? n.current : void 0,
            rootMargin: s,
            threshold: typeof i == "number" ? i : ml[i]
        }
          , l = a => {
            const {isIntersecting: u} = a;
            if (this.isInView === u || (this.isInView = u,
            r && !u && this.hasEnteredView))
                return;
            u && (this.hasEnteredView = !0),
            this.node.animationState && this.node.animationState.setActive("whileInView", u);
            const {onViewportEnter: h, onViewportLeave: c} = this.node.getProps()
              , f = u ? h : c;
            f && f(a)
        }
        ;
        return pl(this.node.current, o, l)
    }
    mount() {
        this.startObserver()
    }
    update() {
        if (typeof IntersectionObserver > "u")
            return;
        const {props: e, prevProps: n} = this.node;
        ["amount", "margin", "root"].some(yl(e, n)) && this.startObserver()
    }
    unmount() {}
}
function yl({viewport: t={}}, {viewport: e={}}={}) {
    return n => t[n] !== e[n]
}
const vl = {
    inView: {
        Feature: gl
    },
    tap: {
        Feature: cl
    },
    focus: {
        Feature: ul
    },
    hover: {
        Feature: ll
    }
}
  , xl = {
    layout: {
        ProjectionNode: Vi,
        MeasureLayout: yi
    }
}
  , Ci = P.createContext({
    transformPagePoint: t => t,
    isStatic: !1,
    reducedMotion: "never"
})
  , Xt = P.createContext({})
  , He = typeof window < "u"
  , Tl = He ? P.useLayoutEffect : P.useEffect
  , Mi = P.createContext({
    strict: !1
});
let us = !1;
function Pl(t, e, n, s, i) {
    var r;
    const {visualElement: o} = P.useContext(Xt)
      , l = P.useContext(Mi)
      , a = P.useContext(Ge)
      , u = P.useContext(Ci).reducedMotion
      , h = P.useRef();
    s = s || l.renderer,
    !h.current && s && (h.current = s(t, {
        visualState: e,
        parent: o,
        props: n,
        presenceContext: a,
        blockInitialAnimation: a ? a.initial === !1 : !1,
        reducedMotionConfig: u
    }));
    const c = h.current
      , f = P.useContext(gi);
    c && !c.projection && i && (c.type === "html" || c.type === "svg") && Al(h.current, n, i, f),
    P.useInsertionEffect( () => {
        c && c.update(n, a)
    }
    );
    const d = n[Js]
      , p = P.useRef(!!d && !window.MotionHandoffIsComplete && ((r = window.MotionHasOptimisedAnimation) === null || r === void 0 ? void 0 : r.call(window, d)));
    return Tl( () => {
        c && (c.updateFeatures(),
        $e.render(c.render),
        p.current && c.animationState && c.animationState.animateChanges())
    }
    ),
    P.useEffect( () => {
        c && (!p.current && c.animationState && c.animationState.animateChanges(),
        p.current = !1,
        us || (us = !0,
        queueMicrotask(Sl)))
    }
    ),
    c
}
function Sl() {
    window.MotionHandoffIsComplete = !0
}
function Al(t, e, n, s) {
    const {layoutId: i, layout: r, drag: o, dragConstraints: l, layoutScroll: a, layoutRoot: u} = e;
    t.projection = new n(t.latestValues,e["data-framer-portal-id"] ? void 0 : Di(t.parent)),
    t.projection.setOptions({
        layoutId: i,
        layout: r,
        alwaysMeasureLayout: !!o || l && at(l),
        visualElement: t,
        animationType: typeof r == "string" ? r : "both",
        initialPromotionConfig: s,
        layoutScroll: a,
        layoutRoot: u
    })
}
function Di(t) {
    if (t)
        return t.options.allowProjection !== !1 ? t.projection : Di(t.parent)
}
function bl(t, e, n) {
    return P.useCallback(s => {
        s && t.mount && t.mount(s),
        e && (s ? e.mount(s) : e.unmount()),
        n && (typeof n == "function" ? n(s) : at(n) && (n.current = s))
    }
    , [e])
}
function Yt(t) {
    return Pt(t.animate) || De.some(e => St(t[e]))
}
function Ri(t) {
    return !!(Yt(t) || t.variants)
}
function Vl(t, e) {
    if (Yt(t)) {
        const {initial: n, animate: s} = t;
        return {
            initial: n === !1 || St(n) ? n : void 0,
            animate: St(s) ? s : void 0
        }
    }
    return t.inherit !== !1 ? e : {}
}
function wl(t) {
    const {initial: e, animate: n} = Vl(t, P.useContext(Xt));
    return P.useMemo( () => ({
        initial: e,
        animate: n
    }), [cs(e), cs(n)])
}
function cs(t) {
    return Array.isArray(t) ? t.join(" ") : t
}
const hs = {
    animation: ["animate", "variants", "whileHover", "whileTap", "exit", "whileInView", "whileFocus", "whileDrag"],
    exit: ["exit"],
    drag: ["drag", "dragControls"],
    focus: ["whileFocus"],
    hover: ["whileHover", "onHoverStart", "onHoverEnd"],
    tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
    pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
    inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
    layout: ["layout", "layoutId"]
}
  , ft = {};
for (const t in hs)
    ft[t] = {
        isEnabled: e => hs[t].some(n => !!e[n])
    };
function Cl(t) {
    for (const e in t)
        ft[e] = {
            ...ft[e],
            ...t[e]
        }
}
const Ml = Symbol.for("motionComponentSymbol");
function Dl({preloadedFeatures: t, createVisualElement: e, useRender: n, useVisualState: s, Component: i}) {
    t && Cl(t);
    function r(l, a) {
        let u;
        const h = {
            ...P.useContext(Ci),
            ...l,
            layoutId: Rl(l)
        }
          , {isStatic: c} = h
          , f = wl(l)
          , d = s(l, c);
        if (!c && He) {
            El();
            const p = Ll(h);
            u = p.MeasureLayout,
            f.visualElement = Pl(i, d, h, e, p.ProjectionNode)
        }
        return he.jsxs(Xt.Provider, {
            value: f,
            children: [u && f.visualElement ? he.jsx(u, {
                visualElement: f.visualElement,
                ...h
            }) : null, n(i, l, bl(d, f.visualElement, a), d, c, f.visualElement)]
        })
    }
    const o = P.forwardRef(r);
    return o[Ml] = i,
    o
}
function Rl({layoutId: t}) {
    const e = P.useContext(mi).id;
    return e && t !== void 0 ? e + "-" + t : t
}
function El(t, e) {
    P.useContext(Mi).strict
}
function Ll(t) {
    const {drag: e, layout: n} = ft;
    if (!e && !n)
        return {};
    const s = {
        ...e,
        ...n
    };
    return {
        MeasureLayout: e != null && e.isEnabled(t) || n != null && n.isEnabled(t) ? s.MeasureLayout : void 0,
        ProjectionNode: s.ProjectionNode
    }
}
const Fl = ["animate", "circle", "defs", "desc", "ellipse", "g", "image", "line", "filter", "marker", "mask", "metadata", "path", "pattern", "polygon", "polyline", "rect", "stop", "switch", "symbol", "svg", "text", "tspan", "use", "view"];
function ze(t) {
    return typeof t != "string" || t.includes("-") ? !1 : !!(Fl.indexOf(t) > -1 || /[A-Z]/u.test(t))
}
function Ei(t, {style: e, vars: n}, s, i) {
    Object.assign(t.style, e, i && i.getProjectionStyles(s));
    for (const r in n)
        t.style.setProperty(r, n[r])
}
const Li = new Set(["baseFrequency", "diffuseConstant", "kernelMatrix", "kernelUnitLength", "keySplines", "keyTimes", "limitingConeAngle", "markerHeight", "markerWidth", "numOctaves", "targetX", "targetY", "surfaceScale", "specularConstant", "specularExponent", "stdDeviation", "tableValues", "viewBox", "gradientTransform", "pathLength", "startOffset", "textLength", "lengthAdjust"]);
function Fi(t, e, n, s) {
    Ei(t, e, void 0, s);
    for (const i in e.attrs)
        t.setAttribute(Li.has(i) ? i : Ht(i), e.attrs[i])
}
function Bi(t, {layout: e, layoutId: n}) {
    return J.has(t) || t.startsWith("origin") || (e || n !== void 0) && (!!Ut[t] || t === "opacity")
}
function Xe(t, e, n) {
    var s;
    const {style: i} = t
      , r = {};
    for (const o in i)
        (E(i[o]) || e.style && E(e.style[o]) || Bi(o, t) || ((s = n == null ? void 0 : n.getValue(o)) === null || s === void 0 ? void 0 : s.liveStyle) !== void 0) && (r[o] = i[o]);
    return n && i && typeof i.willChange == "string" && (n.applyWillChange = !1),
    r
}
function ki(t, e, n) {
    const s = Xe(t, e, n);
    for (const i in t)
        if (E(t[i]) || E(e[i])) {
            const r = wt.indexOf(i) !== -1 ? "attr" + i.charAt(0).toUpperCase() + i.substring(1) : i;
            s[r] = t[i]
        }
    return s
}
function Bl(t) {
    const e = P.useRef(null);
    return e.current === null && (e.current = t()),
    e.current
}
function kl({applyWillChange: t=!1, scrapeMotionValuesFromProps: e, createRenderState: n, onMount: s}, i, r, o, l) {
    const a = {
        latestValues: Ol(i, r, o, l ? !1 : t, e),
        renderState: n()
    };
    return s && (a.mount = u => s(i, u, a)),
    a
}
const ji = t => (e, n) => {
    const s = P.useContext(Xt)
      , i = P.useContext(Ge)
      , r = () => kl(t, e, s, i, n);
    return n ? r() : Bl(r)
}
;
function jl(t, e) {
    const n = ti(e);
    n && Gt(t, n)
}
function fs(t, e, n) {
    const s = Array.isArray(e) ? e : [e];
    for (let i = 0; i < s.length; i++) {
        const r = Ce(t, s[i]);
        if (r) {
            const {transitionEnd: o, transition: l, ...a} = r;
            n(a, o)
        }
    }
}
function Ol(t, e, n, s, i) {
    var r;
    const o = {}
      , l = []
      , a = s && ((r = t.style) === null || r === void 0 ? void 0 : r.willChange) === void 0
      , u = i(t, {});
    for (const v in u)
        o[v] = kt(u[v]);
    let {initial: h, animate: c} = t;
    const f = Yt(t)
      , d = Ri(t);
    e && d && !f && t.inherit !== !1 && (h === void 0 && (h = e.initial),
    c === void 0 && (c = e.animate));
    let p = n ? n.initial === !1 : !1;
    p = p || h === !1;
    const g = p ? c : h;
    return g && typeof g != "boolean" && !Pt(g) && fs(t, g, (v, m) => {
        for (const x in v) {
            let y = v[x];
            if (Array.isArray(y)) {
                const S = p ? y.length - 1 : 0;
                y = y[S]
            }
            y !== null && (o[x] = y)
        }
        for (const x in m)
            o[x] = m[x]
    }
    ),
    a && (c && h !== !1 && !Pt(c) && fs(t, c, v => {
        for (const m in v)
            jl(l, m)
    }
    ),
    l.length && (o.willChange = l.join(","))),
    o
}
const Ye = () => ({
    style: {},
    transform: {},
    transformOrigin: {},
    vars: {}
})
  , Oi = () => ({
    ...Ye(),
    attrs: {}
})
  , Ii = (t, e) => e && typeof t == "number" ? e.transform(t) : t
  , Il = {
    x: "translateX",
    y: "translateY",
    z: "translateZ",
    transformPerspective: "perspective"
}
  , Nl = wt.length;
function Ul(t, e, n) {
    let s = ""
      , i = !0;
    for (let r = 0; r < Nl; r++) {
        const o = wt[r]
          , l = t[o];
        if (l === void 0)
            continue;
        let a = !0;
        if (typeof l == "number" ? a = l === (o.startsWith("scale") ? 1 : 0) : a = parseFloat(l) === 0,
        !a || n) {
            const u = Ii(l, ke[o]);
            if (!a) {
                i = !1;
                const h = Il[o] || o;
                s += `${h}(${u}) `
            }
            n && (e[o] = u)
        }
    }
    return s = s.trim(),
    n ? s = n(e, i ? "" : s) : i && (s = "none"),
    s
}
function qe(t, e, n) {
    const {style: s, vars: i, transformOrigin: r} = t;
    let o = !1
      , l = !1;
    for (const a in e) {
        const u = e[a];
        if (J.has(a)) {
            o = !0;
            continue
        } else if (Ps(a)) {
            i[a] = u;
            continue
        } else {
            const h = Ii(u, ke[a]);
            a.startsWith("origin") ? (l = !0,
            r[a] = h) : s[a] = h
        }
    }
    if (e.transform || (o || n ? s.transform = Ul(e, t.transform, n) : s.transform && (s.transform = "none")),
    l) {
        const {originX: a="50%", originY: u="50%", originZ: h=0} = r;
        s.transformOrigin = `${a} ${u} ${h}`
    }
}
function ds(t, e, n) {
    return typeof t == "string" ? t : T.transform(e + n * t)
}
function Wl(t, e, n) {
    const s = ds(e, t.x, t.width)
      , i = ds(n, t.y, t.height);
    return `${s} ${i}`
}
const _l = {
    offset: "stroke-dashoffset",
    array: "stroke-dasharray"
}
  , Kl = {
    offset: "strokeDashoffset",
    array: "strokeDasharray"
};
function Gl(t, e, n=1, s=0, i=!0) {
    t.pathLength = 1;
    const r = i ? _l : Kl;
    t[r.offset] = T.transform(-s);
    const o = T.transform(e)
      , l = T.transform(n);
    t[r.array] = `${o} ${l}`
}
function Ze(t, {attrX: e, attrY: n, attrScale: s, originX: i, originY: r, pathLength: o, pathSpacing: l=1, pathOffset: a=0, ...u}, h, c) {
    if (qe(t, u, c),
    h) {
        t.style.viewBox && (t.attrs.viewBox = t.style.viewBox);
        return
    }
    t.attrs = t.style,
    t.style = {};
    const {attrs: f, style: d, dimensions: p} = t;
    f.transform && (p && (d.transform = f.transform),
    delete f.transform),
    p && (i !== void 0 || r !== void 0 || d.transform) && (d.transformOrigin = Wl(p, i !== void 0 ? i : .5, r !== void 0 ? r : .5)),
    e !== void 0 && (f.x = e),
    n !== void 0 && (f.y = n),
    s !== void 0 && (f.scale = s),
    o !== void 0 && Gl(f, o, l, a, !1)
}
const Je = t => typeof t == "string" && t.toLowerCase() === "svg"
  , $l = {
    useVisualState: ji({
        scrapeMotionValuesFromProps: ki,
        createRenderState: Oi,
        onMount: (t, e, {renderState: n, latestValues: s}) => {
            V.read( () => {
                try {
                    n.dimensions = typeof e.getBBox == "function" ? e.getBBox() : e.getBoundingClientRect()
                } catch {
                    n.dimensions = {
                        x: 0,
                        y: 0,
                        width: 0,
                        height: 0
                    }
                }
            }
            ),
            V.render( () => {
                Ze(n, s, Je(e.tagName), t.transformTemplate),
                Fi(e, n)
            }
            )
        }
    })
}
  , Hl = {
    useVisualState: ji({
        applyWillChange: !0,
        scrapeMotionValuesFromProps: Xe,
        createRenderState: Ye
    })
};
function Ni(t, e, n) {
    for (const s in e)
        !E(e[s]) && !Bi(s, n) && (t[s] = e[s])
}
function zl({transformTemplate: t}, e) {
    return P.useMemo( () => {
        const n = Ye();
        return qe(n, e, t),
        Object.assign({}, n.vars, n.style)
    }
    , [e])
}
function Xl(t, e) {
    const n = t.style || {}
      , s = {};
    return Ni(s, n, t),
    Object.assign(s, zl(t, e)),
    s
}
function Yl(t, e) {
    const n = {}
      , s = Xl(t, e);
    return t.drag && t.dragListener !== !1 && (n.draggable = !1,
    s.userSelect = s.WebkitUserSelect = s.WebkitTouchCallout = "none",
    s.touchAction = t.drag === !0 ? "none" : `pan-${t.drag === "x" ? "y" : "x"}`),
    t.tabIndex === void 0 && (t.onTap || t.onTapStart || t.whileTap) && (n.tabIndex = 0),
    n.style = s,
    n
}
const ql = new Set(["animate", "exit", "variants", "initial", "style", "values", "variants", "transition", "transformTemplate", "custom", "inherit", "onBeforeLayoutMeasure", "onAnimationStart", "onAnimationComplete", "onUpdate", "onDragStart", "onDrag", "onDragEnd", "onMeasureDragConstraints", "onDirectionLock", "onDragTransitionEnd", "_dragX", "_dragY", "onHoverStart", "onHoverEnd", "onViewportEnter", "onViewportLeave", "globalTapTarget", "ignoreStrict", "viewport"]);
function Wt(t) {
    return t.startsWith("while") || t.startsWith("drag") && t !== "draggable" || t.startsWith("layout") || t.startsWith("onTap") || t.startsWith("onPan") || t.startsWith("onLayout") || ql.has(t)
}
let Ui = t => !Wt(t);
function Zl(t) {
    t && (Ui = e => e.startsWith("on") ? !Wt(e) : t(e))
}
try {
    Zl(require("@emotion/is-prop-valid").default)
} catch {}
function Jl(t, e, n) {
    const s = {};
    for (const i in t)
        i === "values" && typeof t.values == "object" || (Ui(i) || n === !0 && Wt(i) || !e && !Wt(i) || t.draggable && i.startsWith("onDrag")) && (s[i] = t[i]);
    return s
}
function Ql(t, e, n, s) {
    const i = P.useMemo( () => {
        const r = Oi();
        return Ze(r, e, Je(s), t.transformTemplate),
        {
            ...r.attrs,
            style: {
                ...r.style
            }
        }
    }
    , [e]);
    if (t.style) {
        const r = {};
        Ni(r, t.style, t),
        i.style = {
            ...r,
            ...i.style
        }
    }
    return i
}
function tu(t=!1) {
    return (n, s, i, {latestValues: r}, o) => {
        const a = (ze(n) ? Ql : Yl)(s, r, o, n)
          , u = Jl(s, typeof n == "string", t)
          , h = n !== P.Fragment ? {
            ...u,
            ...a,
            ref: i
        } : {}
          , {children: c} = s
          , f = P.useMemo( () => E(c) ? c.get() : c, [c]);
        return P.createElement(n, {
            ...h,
            children: f
        })
    }
}
function eu(t, e) {
    return function(s, {forwardMotionProps: i}={
        forwardMotionProps: !1
    }) {
        const o = {
            ...ze(s) ? $l : Hl,
            preloadedFeatures: t,
            useRender: tu(i),
            createVisualElement: e,
            Component: s
        };
        return Dl(o)
    }
}
const we = {
    current: null
}
  , Wi = {
    current: !1
};
function nu() {
    if (Wi.current = !0,
    !!He)
        if (window.matchMedia) {
            const t = window.matchMedia("(prefers-reduced-motion)")
              , e = () => we.current = t.matches;
            t.addListener(e),
            e()
        } else
            we.current = !1
}
function su(t, e, n) {
    for (const s in e) {
        const i = e[s]
          , r = n[s];
        if (E(i))
            t.addValue(s, i);
        else if (E(r))
            t.addValue(s, Vt(i, {
                owner: t
            }));
        else if (r !== i)
            if (t.hasValue(s)) {
                const o = t.getValue(s);
                o.liveStyle === !0 ? o.jump(i) : o.hasAnimated || o.set(i)
            } else {
                const o = t.getStaticValue(s);
                t.addValue(s, Vt(o !== void 0 ? o : i, {
                    owner: t
                }))
            }
    }
    for (const s in n)
        e[s] === void 0 && t.removeValue(s);
    return e
}
const ps = new WeakMap
  , iu = [...bs, R, Z]
  , ou = t => iu.find(As(t))
  , ms = ["AnimationStart", "AnimationComplete", "Update", "BeforeLayoutMeasure", "LayoutMeasure", "LayoutAnimationStart", "LayoutAnimationComplete"]
  , ru = De.length;
class au {
    scrapeMotionValuesFromProps(e, n, s) {
        return {}
    }
    constructor({parent: e, props: n, presenceContext: s, reducedMotionConfig: i, blockInitialAnimation: r, visualState: o}, l={}) {
        this.applyWillChange = !1,
        this.current = null,
        this.children = new Set,
        this.isVariantNode = !1,
        this.isControllingVariants = !1,
        this.shouldReduceMotion = null,
        this.values = new Map,
        this.KeyframeResolver = Fe,
        this.features = {},
        this.valueSubscriptions = new Map,
        this.prevMotionValues = {},
        this.events = {},
        this.propEventSubscriptions = {},
        this.notifyUpdate = () => this.notify("Update", this.latestValues),
        this.render = () => {
            this.isRenderScheduled = !1,
            this.current && (this.triggerBuild(),
            this.renderInstance(this.current, this.renderState, this.props.style, this.projection))
        }
        ,
        this.isRenderScheduled = !1,
        this.scheduleRender = () => {
            this.isRenderScheduled || (this.isRenderScheduled = !0,
            V.render(this.render, !1, !0))
        }
        ;
        const {latestValues: a, renderState: u} = o;
        this.latestValues = a,
        this.baseTarget = {
            ...a
        },
        this.initialValues = n.initial ? {
            ...a
        } : {},
        this.renderState = u,
        this.parent = e,
        this.props = n,
        this.presenceContext = s,
        this.depth = e ? e.depth + 1 : 0,
        this.reducedMotionConfig = i,
        this.options = l,
        this.blockInitialAnimation = !!r,
        this.isControllingVariants = Yt(n),
        this.isVariantNode = Ri(n),
        this.isVariantNode && (this.variantChildren = new Set),
        this.manuallyAnimateOnMount = !!(e && e.current);
        const {willChange: h, ...c} = this.scrapeMotionValuesFromProps(n, {}, this);
        for (const f in c) {
            const d = c[f];
            a[f] !== void 0 && E(d) && d.set(a[f], !1)
        }
    }
    mount(e) {
        this.current = e,
        ps.set(e, this),
        this.projection && !this.projection.instance && this.projection.mount(e),
        this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)),
        this.values.forEach( (n, s) => this.bindToMotionValue(s, n)),
        Wi.current || nu(),
        this.shouldReduceMotion = this.reducedMotionConfig === "never" ? !1 : this.reducedMotionConfig === "always" ? !0 : we.current,
        this.parent && this.parent.children.add(this),
        this.update(this.props, this.presenceContext)
    }
    unmount() {
        ps.delete(this.current),
        this.projection && this.projection.unmount(),
        z(this.notifyUpdate),
        z(this.render),
        this.valueSubscriptions.forEach(e => e()),
        this.valueSubscriptions.clear(),
        this.removeFromVariantTree && this.removeFromVariantTree(),
        this.parent && this.parent.children.delete(this);
        for (const e in this.events)
            this.events[e].clear();
        for (const e in this.features) {
            const n = this.features[e];
            n && (n.unmount(),
            n.isMounted = !1)
        }
        this.current = null
    }
    bindToMotionValue(e, n) {
        this.valueSubscriptions.has(e) && this.valueSubscriptions.get(e)();
        const s = J.has(e)
          , i = n.on("change", l => {
            this.latestValues[e] = l,
            this.props.onUpdate && V.preRender(this.notifyUpdate),
            s && this.projection && (this.projection.isTransformDirty = !0)
        }
        )
          , r = n.on("renderRequest", this.scheduleRender);
        let o;
        window.MotionCheckAppearSync && (o = window.MotionCheckAppearSync(this, e, n)),
        this.valueSubscriptions.set(e, () => {
            i(),
            r(),
            o && o(),
            n.owner && n.stop()
        }
        )
    }
    sortNodePosition(e) {
        return !this.current || !this.sortInstanceNodePosition || this.type !== e.type ? 0 : this.sortInstanceNodePosition(this.current, e.current)
    }
    updateFeatures() {
        let e = "animation";
        for (e in ft) {
            const n = ft[e];
            if (!n)
                continue;
            const {isEnabled: s, Feature: i} = n;
            if (!this.features[e] && i && s(this.props) && (this.features[e] = new i(this)),
            this.features[e]) {
                const r = this.features[e];
                r.isMounted ? r.update() : (r.mount(),
                r.isMounted = !0)
            }
        }
    }
    triggerBuild() {
        this.build(this.renderState, this.latestValues, this.props)
    }
    measureViewportBox() {
        return this.current ? this.measureInstanceViewportBox(this.current, this.props) : C()
    }
    getStaticValue(e) {
        return this.latestValues[e]
    }
    setStaticValue(e, n) {
        this.latestValues[e] = n
    }
    update(e, n) {
        (e.transformTemplate || this.props.transformTemplate) && this.scheduleRender(),
        this.prevProps = this.props,
        this.props = e,
        this.prevPresenceContext = this.presenceContext,
        this.presenceContext = n;
        for (let s = 0; s < ms.length; s++) {
            const i = ms[s];
            this.propEventSubscriptions[i] && (this.propEventSubscriptions[i](),
            delete this.propEventSubscriptions[i]);
            const r = "on" + i
              , o = e[r];
            o && (this.propEventSubscriptions[i] = this.on(i, o))
        }
        this.prevMotionValues = su(this, this.scrapeMotionValuesFromProps(e, this.prevProps, this), this.prevMotionValues),
        this.handleChildMotionValue && this.handleChildMotionValue()
    }
    getProps() {
        return this.props
    }
    getVariant(e) {
        return this.props.variants ? this.props.variants[e] : void 0
    }
    getDefaultTransition() {
        return this.props.transition
    }
    getTransformPagePoint() {
        return this.props.transformPagePoint
    }
    getClosestVariantNode() {
        return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0
    }
    getVariantContext(e=!1) {
        if (e)
            return this.parent ? this.parent.getVariantContext() : void 0;
        if (!this.isControllingVariants) {
            const s = this.parent ? this.parent.getVariantContext() || {} : {};
            return this.props.initial !== void 0 && (s.initial = this.props.initial),
            s
        }
        const n = {};
        for (let s = 0; s < ru; s++) {
            const i = De[s]
              , r = this.props[i];
            (St(r) || r === !1) && (n[i] = r)
        }
        return n
    }
    addVariantChild(e) {
        const n = this.getClosestVariantNode();
        if (n)
            return n.variantChildren && n.variantChildren.add(e),
            () => n.variantChildren.delete(e)
    }
    addValue(e, n) {
        const s = this.values.get(e);
        n !== s && (s && this.removeValue(e),
        this.bindToMotionValue(e, n),
        this.values.set(e, n),
        this.latestValues[e] = n.get())
    }
    removeValue(e) {
        this.values.delete(e);
        const n = this.valueSubscriptions.get(e);
        n && (n(),
        this.valueSubscriptions.delete(e)),
        delete this.latestValues[e],
        this.removeValueFromRenderState(e, this.renderState)
    }
    hasValue(e) {
        return this.values.has(e)
    }
    getValue(e, n) {
        if (this.props.values && this.props.values[e])
            return this.props.values[e];
        let s = this.values.get(e);
        return s === void 0 && n !== void 0 && (s = Vt(n === null ? void 0 : n, {
            owner: this
        }),
        this.addValue(e, s)),
        s
    }
    readValue(e, n) {
        var s;
        let i = this.latestValues[e] !== void 0 || !this.current ? this.latestValues[e] : (s = this.getBaseTargetFromProps(this.props, e)) !== null && s !== void 0 ? s : this.readValueFromInstance(this.current, e, this.options);
        return i != null && (typeof i == "string" && (xs(i) || vs(i)) ? i = parseFloat(i) : !ou(i) && Z.test(n) && (i = Ls(e, n)),
        this.setBaseTarget(e, E(i) ? i.get() : i)),
        E(i) ? i.get() : i
    }
    setBaseTarget(e, n) {
        this.baseTarget[e] = n
    }
    getBaseTarget(e) {
        var n;
        const {initial: s} = this.props;
        let i;
        if (typeof s == "string" || typeof s == "object") {
            const o = Ce(this.props, s, (n = this.presenceContext) === null || n === void 0 ? void 0 : n.custom);
            o && (i = o[e])
        }
        if (s && i !== void 0)
            return i;
        const r = this.getBaseTargetFromProps(this.props, e);
        return r !== void 0 && !E(r) ? r : this.initialValues[e] !== void 0 && i === void 0 ? void 0 : this.baseTarget[e]
    }
    on(e, n) {
        return this.events[e] || (this.events[e] = new Ke),
        this.events[e].add(n)
    }
    notify(e, ...n) {
        this.events[e] && this.events[e].notify(...n)
    }
}
class _i extends au {
    constructor() {
        super(...arguments),
        this.KeyframeResolver = Fs
    }
    sortInstanceNodePosition(e, n) {
        return e.compareDocumentPosition(n) & 2 ? 1 : -1
    }
    getBaseTargetFromProps(e, n) {
        return e.style ? e.style[n] : void 0
    }
    removeValueFromRenderState(e, {vars: n, style: s}) {
        delete n[e],
        delete s[e]
    }
}
function lu(t) {
    return window.getComputedStyle(t)
}
class uu extends _i {
    constructor() {
        super(...arguments),
        this.type = "html",
        this.applyWillChange = !0,
        this.renderInstance = Ei
    }
    readValueFromInstance(e, n) {
        if (J.has(n)) {
            const s = je(n);
            return s && s.default || 0
        } else {
            const s = lu(e)
              , i = (Ps(n) ? s.getPropertyValue(n) : s[n]) || 0;
            return typeof i == "string" ? i.trim() : i
        }
    }
    measureInstanceViewportBox(e, {transformPagePoint: n}) {
        return di(e, n)
    }
    build(e, n, s) {
        qe(e, n, s.transformTemplate)
    }
    scrapeMotionValuesFromProps(e, n, s) {
        return Xe(e, n, s)
    }
    handleChildMotionValue() {
        this.childSubscription && (this.childSubscription(),
        delete this.childSubscription);
        const {children: e} = this.props;
        E(e) && (this.childSubscription = e.on("change", n => {
            this.current && (this.current.textContent = `${n}`)
        }
        ))
    }
}
class cu extends _i {
    constructor() {
        super(...arguments),
        this.type = "svg",
        this.isSVGTag = !1,
        this.measureInstanceViewportBox = C
    }
    getBaseTargetFromProps(e, n) {
        return e[n]
    }
    readValueFromInstance(e, n) {
        if (J.has(n)) {
            const s = je(n);
            return s && s.default || 0
        }
        return n = Li.has(n) ? n : Ht(n),
        e.getAttribute(n)
    }
    scrapeMotionValuesFromProps(e, n, s) {
        return ki(e, n, s)
    }
    build(e, n, s) {
        Ze(e, n, this.isSVGTag, s.transformTemplate)
    }
    renderInstance(e, n, s, i) {
        Fi(e, n, s, i)
    }
    mount(e) {
        this.isSVGTag = Je(e.tagName),
        super.mount(e)
    }
}
const hu = (t, e) => ze(t) ? new cu(e) : new uu(e,{
    allowProjection: t !== P.Fragment
})
  , fu = eu({
    ...qr,
    ...vl,
    ...al,
    ...xl
}, hu)
  , gu = Gi(fu);
export {mi as L, Ci as M, Ge as P, Tl as a, gu as m, Bl as u};
