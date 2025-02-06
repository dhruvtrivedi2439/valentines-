import {r as l, j as t} from "./jsx-runtime-D8ipelNA.js";
import {u as v} from "./index-viHZjtiN.js";
import {A as C} from "./index-BXMMkxXD.js";
import {m as o} from "./proxy-KTLhuSMa.js";
import "./index-DW5Wj4fb.js";
function w() {
    const [n,r] = l.useState(!1);
    return {
        isOpen: n,
        setIsOpen: r,
        cardVariants: {
            hidden: {
                y: "100%",
                x: "-50%",
                opacity: 0
            },
            visible: {
                y: "-50%",
                x: "-50%",
                opacity: 1,
                transition: {
                    y: {
                        delay: .2,
                        duration: .8
                    },
                    opacity: {
                        duration: .3,
                        delay: .2
                    }
                }
            }
        },
        envelopeVariants: {
            closed: {
                y: "-50%",
                x: "-50%",
                opacity: 1
            },
            open: {
                y: "100%",
                opacity: 0,
                transition: {
                    y: {
                        delay: 1.4,
                        duration: .8
                    },
                    opacity: {
                        duration: 1.6,
                        delay: 1.4
                    }
                }
            },
            exit: {
                opacity: 0
            }
        }
    }
}
function N() {
    const [n,r] = l.useState("")
      , [e,a] = l.useState(!1)
      , c = () => {
        n && n.includes("@") && (a(!0),
        fetch("https://valentine-email.truorg.workers.dev", {
            method: "POST",
            headers: {
                accept: "application/json",
                "content-type": "application/json"
            },
            body: JSON.stringify({
                email: n
            })
        }))
    }
    ;
    return e ? t.jsx("div", {
        className: "text-[#E74C3C] text-md md:text-xl font-extrabold p-8",
        children: "Thanks for submitting! I'll send you an email when it's ready."
    }) : t.jsxs("div", {
        className: "flex flex-col items-center justify-center gap-8 p-8",
        children: [t.jsx("h1", {
            className: "text-[#E74C3C] text-md md:text-xl font-extrabold",
            children: "I'm working on a dating app where you get to help your friends find a valentine!"
        }), t.jsx("div", {
            className: "text-xs md:text-sm text-[#E74C3C]",
            children: "Enter your email to know when it's ready."
        }), t.jsx("input", {
            className: "rounded-lg p-4 w-full",
            type: "text",
            placeholder: "Enter your email",
            onChange: i => r(i.target.value)
        }), t.jsx("button", {
            disabled: e,
            className: "bg-[#E74C3C] text-white px-4 md:px-8 py-2 md:py-3 rounded-lg text-lg md:text-xl font-bold hover:bg-[#D64434] transition-colors",
            onClick: c,
            children: "Submit"
        })]
    })
}
function b() {
    const [n,r] = l.useState(!1);
    function e() {
        r(!0)
    }
    const a = ["/kiss.gif", "/bears.gif", "/heart.gif"]
      , c = a[Math.floor(Math.random() * a.length)]
      , i = ["Are your single friends bumming you out?", "Tired of playing therapist for your single friends?", "Wanna help your single friend find a valentine?"]
      , s = i[Math.floor(Math.random() * i.length)];
    return n ? t.jsx(N, {}) : t.jsxs("div", {
        children: [t.jsxs(o.div, {
            initial: {
                opacity: 0,
                y: 20
            },
            animate: {
                opacity: 1,
                y: 0
            },
            transition: {
                duration: .6
            },
            className: "flex flex-col items-center justify-center gap-8 p-8",
            children: [t.jsx("div", {
                className: "bg-white p-4 rounded-lg shadow-lg w-fit",
                style: {
                    transform: "rotate(-3deg)"
                },
                children: t.jsx("div", {
                    className: "md:w-64 md:h-64 w-32 h-32 mb-4",
                    children: t.jsx("img", {
                        src: c,
                        alt: "Celebrating bears",
                        className: "w-full h-full object-cover rounded"
                    })
                })
            }), t.jsx("h1", {
                className: "text-[#E74C3C] text-4xl md:text-6xl font-extrabold",
                style: {
                    lineHeight: 1.2
                },
                children: "Yay!"
            })]
        }), t.jsxs(o.div, {
            initial: {
                opacity: 0,
                y: 20
            },
            animate: {
                opacity: 1,
                y: 0
            },
            transition: {
                duration: .6,
                delay: 1
            },
            className: "flex flex-col items-center justify-center gap-2",
            children: [t.jsx("div", {
                className: "text-xs md:text-sm font-bold text-center",
                children: s
            }), t.jsx("button", {
                onClick: e,
                className: "text-xs md:text-sm font-bold text-[#E74C3C] bg-white/40 px-2 py-1 rounded-lg hover:scale-125 transition-all",
                children: "then click here!!!"
            })]
        })]
    })
}
function k() {
    const [n,r] = l.useState([])
      , [e,a] = l.useState(!1)
      , c = () => {
        const s = []
          , x = n.length === 0 ? 1 : n.length + 1;
        for (let m = 0; m < x; m++)
            s.push({
                id: Math.random(),
                x: Math.random() * 80,
                y: Math.random() * 80
            });
        r([...n, ...s])
    }
    ;
    function i() {
        a(!0)
    }
    return e ? t.jsx(b, {}) : t.jsxs(t.Fragment, {
        children: [t.jsx(o.div, {
            className: "space-y-4 p-4",
            initial: {
                opacity: 0,
                y: 20
            },
            animate: {
                opacity: 1,
                y: 0
            },
            transition: {
                duration: .6
            },
            children: t.jsxs("h1", {
                className: "text-[#E74C3C] text-4xl md:text-6xl font-extrabold",
                style: {
                    lineHeight: 1.2
                },
                children: ["Will you", t.jsx("br", {}), "be my", t.jsx("br", {}), "valentine?"]
            })
        }), t.jsxs(o.div, {
            className: "space-y-4 flex flex-col items-center  relative flex-1",
            initial: {
                opacity: 0,
                y: 20
            },
            animate: {
                opacity: 1,
                y: 0
            },
            transition: {
                duration: .6,
                delay: .3
            },
            children: [t.jsx("button", {
                onClick: i,
                className: "bg-[#E74C3C] text-white px-4 md:px-8 py-2 md:py-3 rounded-lg text-lg md:text-xl font-bold hover:bg-[#D64434] transition-colors",
                children: "YES!"
            }), n.map(s => t.jsx(o.button, {
                onClick: i,
                className: "bg-[#E74C3C] text-white px-4 md:px-8 py-2 md:py-3 rounded-lg text-lg md:text-xl font-bold hover:bg-[#D64434] transition-colors absolute",
                style: {
                    left: `${s.x}%`,
                    top: `${s.y}%`
                },
                initial: {
                    opacity: 0,
                    scale: 0
                },
                animate: {
                    opacity: 1,
                    scale: 1
                },
                transition: {
                    duration: .3
                },
                children: "YES!"
            }, s.id)), t.jsx("div", {
                children: t.jsx("button", {
                    className: "text-[#E74C3C] text-xs md:text-sm rounded-lg px-3 md:px-4 py-1.5 md:py-2 bg-white",
                    onClick: c,
                    children: "no"
                })
            })]
        })]
    })
}
function E() {
    const [n,r] = l.useState(!1)
      , [e,a] = l.useState({
        opacity: 1,
        x: 0,
        y: 0
    })
      , [c,i] = l.useState(!0)
      , s = () => {
        const m = Math.max(0, e.opacity - .2);
        a({
            opacity: m,
            x: Math.random() * 500 - 250,
            y: Math.random() * 500 - 250
        }),
        m <= 0 && i(!1)
    }
    ;
    function x() {
        r(!0)
    }
    return n ? t.jsx(b, {}) : t.jsxs(t.Fragment, {
        children: [t.jsx(o.div, {
            className: "space-y-4 p-4",
            initial: {
                opacity: 0,
                y: 20
            },
            animate: {
                opacity: 1,
                y: 0
            },
            transition: {
                duration: .6
            },
            children: t.jsxs("h1", {
                className: "text-[#E74C3C] text-4xl md:text-6xl font-extrabold",
                style: {
                    lineHeight: 1.2
                },
                children: ["Will you", t.jsx("br", {}), "be my", t.jsx("br", {}), "valentine?"]
            })
        }), t.jsxs(o.div, {
            className: "space-y-4 flex flex-col items-center relative flex-1",
            initial: {
                opacity: 0,
                y: 20
            },
            animate: {
                opacity: 1,
                y: 0
            },
            transition: {
                duration: .6,
                delay: .3
            },
            children: [t.jsx("button", {
                onClick: x,
                className: "bg-[#E74C3C] text-white px-4 md:px-8 py-2 md:py-3 rounded-lg text-lg md:text-xl font-bold hover:bg-[#D64434] transition-colors",
                children: "YES!"
            }), c && t.jsx(o.div, {
                animate: {
                    x: e.x,
                    y: e.y,
                    opacity: e.opacity
                },
                transition: {
                    duration: .3
                },
                children: t.jsx("button", {
                    className: "text-[#E74C3C] text-xs md:text-sm rounded-lg px-3 md:px-4 py-1.5 md:py-2 bg-white",
                    onClick: s,
                    children: "no"
                })
            })]
        })]
    })
}
function S() {
    const [n,r] = l.useState(!1)
      , [e,a] = l.useState({
        opacity: 1,
        x: 0,
        y: 0,
        velocityX: 2,
        velocityY: 2
    })
      , [c] = l.useState(!0)
      , [i,s] = l.useState(0);
    l.useEffect( () => {
        if (i > 0) {
            const p = setInterval( () => {
                a(d => {
                    const j = Math.min(.5 + Math.pow(i, 2.2), 20)
                      , h = d.x + d.velocityX * j
                      , f = d.y + d.velocityY * j;
                    let u = d.velocityX
                      , y = d.velocityY;
                    (h > 250 || h < -250) && (u = -d.velocityX,
                    y += Math.random() - .5),
                    (f > 250 || f < -250) && (y = -d.velocityY,
                    u += Math.random() - .5);
                    const g = Math.sqrt(u * u + y * y);
                    return g !== 0 && (u = u / g * 2,
                    y = y / g * 2),
                    {
                        ...d,
                        x: h > 250 ? 250 : h < -250 ? -250 : h,
                        y: f > 250 ? 250 : f < -250 ? -250 : f,
                        velocityX: u,
                        velocityY: y
                    }
                }
                )
            }
            , 8);
            return () => clearInterval(p)
        }
    }
    , [i]);
    const x = () => {
        s(p => p + 1),
        i === 0 && a(p => ({
            ...p,
            velocityX: 2,
            velocityY: 2
        }))
    }
    ;
    function m() {
        r(!0),
        s(0)
    }
    return n ? t.jsx(b, {}) : t.jsxs(t.Fragment, {
        children: [t.jsx(o.div, {
            className: "space-y-4 p-4",
            initial: {
                opacity: 0,
                y: 20
            },
            animate: {
                opacity: 1,
                y: 0
            },
            transition: {
                duration: .6
            },
            children: t.jsxs("h1", {
                className: "text-[#E74C3C] text-4xl md:text-6xl font-extrabold",
                style: {
                    lineHeight: 1.2
                },
                children: ["Will you", t.jsx("br", {}), "be my", t.jsx("br", {}), "valentine?"]
            })
        }), t.jsxs(o.div, {
            className: "space-y-4 flex flex-col items-center relative flex-1",
            initial: {
                opacity: 0,
                y: 20
            },
            animate: {
                opacity: 1,
                y: 0
            },
            transition: {
                duration: .6,
                delay: .3
            },
            children: [t.jsx("button", {
                onClick: m,
                className: "bg-[#E74C3C] text-white px-4 md:px-8 py-2 md:py-3 rounded-lg text-lg md:text-xl font-bold hover:bg-[#D64434] transition-colors",
                children: "YES!"
            }), c && t.jsx(o.div, {
                animate: {
                    x: e.x,
                    y: e.y,
                    opacity: e.opacity
                },
                transition: {
                    type: "tween",
                    duration: .016,
                    ease: "linear"
                },
                children: t.jsx("button", {
                    className: "text-[#E74C3C] text-xs md:text-sm rounded-lg px-3 md:px-4 py-1.5 md:py-2 bg-white",
                    onClick: x,
                    children: "no"
                })
            })]
        })]
    })
}
function Y() {
    var x;
    const [n] = v()
      , r = n.get("name")
      , {isOpen: e, setIsOpen: a, cardVariants: c, envelopeVariants: i} = w()
      , s = l.useRef(null);
    return t.jsx("div", {
        className: "min-h-screen bg-[#FDF6EC] flex items-center justify-center p-4 overflow-hidden w-full",
        children: t.jsxs("div", {
            className: "relative w-full max-w-2xl mx-auto",
            children: [t.jsx(C, {
                children: e && t.jsx(o.div, {
                    className: "absolute left-1/2 top-1/2 w-[300px] md:w-[500px] aspect-[1/1.4] bg-[#FFB6C1] rounded-lg shadow-lg md:py-16 md:px-12 flex flex-col gap-6",
                    variants: c,
                    initial: "hidden",
                    animate: "visible",
                    transition: {
                        duration: 1.5,
                        ease: [.23, 1, .32, 1]
                    },
                    children: ( () => {
                        switch (Math.floor(Math.random() * 3)) {
                        case 0:
                            return t.jsx(k, {});
                        case 1:
                            return t.jsx(E, {});
                        case 2:
                            return t.jsx(S, {})
                        }
                    }
                    )()
                })
            }), t.jsx(C, {
                children: t.jsxs(o.div, {
                    ref: s,
                    className: "absolute left-1/2 top-1/2 w-full max-w-[700px] aspect-[1.4/1] bg-[#E74C3C] rounded-lg shadow-lg p-6 flex items-center justify-center cursor-pointer transform -translate-x-1/2 -translate-y-1/2",
                    variants: i,
                    initial: "closed",
                    animate: e ? "open" : "closed",
                    exit: "exit",
                    transition: {
                        duration: 1.5,
                        ease: [.23, 1, .32, 1]
                    },
                    onClick: () => !e && a(!0),
                    children: [t.jsx("div", {
                        className: "absolute top-4 right-4 md:size-24 size-16",
                        children: t.jsx("img", {
                            src: "/stamp.png",
                            alt: "Decorative stamp",
                            className: "w-full h-full object-contain"
                        })
                    }), t.jsxs("span", {
                        className: "text-white text-3xl md:text-5xl",
                        style: {
                            fontFamily: "Caveat Variable",
                            fontWeight: 700
                        },
                        children: ["For ", r || "You"]
                    })]
                })
            }), s.current && t.jsx(C, {
                children: t.jsx(o.div, {
                    className: "absolute w-[5000px] h-screen bg-[#FDF6EC]",
                    style: {
                        top: `${(x = s.current) == null ? void 0 : x.getBoundingClientRect().bottom}px`,
                        left: "0"
                    },
                    variants: i,
                    initial: "closed",
                    animate: e ? "open" : "closed",
                    exit: "exit",
                    transition: {
                        duration: 1.5,
                        ease: [.23, 1, .32, 1]
                    },
                    onClick: () => !e && a(!0)
                })
            })]
        })
    })
}
const I = () => [{
    title: "Valentine's Card | mewtru"
}, {
    name: "description",
    content: "Send a cute valentine to your crush"
}];
function X() {
    return t.jsx(Y, {})
}
export {X as default, I as meta};
