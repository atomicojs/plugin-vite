(function () {
	const t = document.createElement("link").relList;
	if (t && t.supports && t.supports("modulepreload")) return;
	for (const n of document.querySelectorAll('link[rel="modulepreload"]'))
		o(n);
	new MutationObserver((n) => {
		for (const r of n)
			if (r.type === "childList")
				for (const a of r.addedNodes)
					a.tagName === "LINK" && a.rel === "modulepreload" && o(a);
	}).observe(document, { childList: !0, subtree: !0 });
	function s(n) {
		const r = {};
		return (
			n.integrity && (r.integrity = n.integrity),
			n.referrerPolicy && (r.referrerPolicy = n.referrerPolicy),
			n.crossOrigin === "use-credentials"
				? (r.credentials = "include")
				: n.crossOrigin === "anonymous"
				? (r.credentials = "omit")
				: (r.credentials = "same-origin"),
			r
		);
	}
	function o(n) {
		if (n.ep) return;
		n.ep = !0;
		const r = s(n);
		fetch(n.href, r);
	}
})();
const S = (e) => typeof e == "function",
	A = (e) => typeof e == "object",
	{ isArray: ot } = Array,
	B = (e) => "hydrate" in (e?.dataset || {});
function F(e, t) {
	let s;
	const o = (n) => {
		let { length: r } = n;
		for (let a = 0; a < r; a++) {
			const l = n[a];
			if (l && Array.isArray(l)) o(l);
			else {
				const i = typeof l;
				if (l == null || i === "function" || i === "boolean") continue;
				i === "string" || i === "number"
					? (s == null && (s = ""), (s += l))
					: (s != null && (t(s), (s = null)), t(l));
			}
		}
	};
	o(e), s != null && t(s);
}
class U {
	constructor(t, s, o) {
		(this.message = s), (this.target = t), (this.value = o);
	}
}
class nt extends U {}
class rt extends U {}
const z = null,
	it = { true: 1, "": 1, 1: 1 };
function ct(e, t, s, o, n) {
	const {
			type: r,
			reflect: a,
			event: l,
			value: i,
			attr: c = at(t),
		} = A(s) && s != z ? s : { type: s },
		u = !(r == Function || r == z);
	Object.defineProperty(e, t, {
		configurable: !0,
		set(m) {
			const f = this[t],
				{ error: h, value: p } = ht(r, u && S(m) ? m(f) : m);
			if (h && p != null)
				throw new nt(
					this,
					`The value defined for prop '${t}' must be of type '${r.name}'`,
					p,
				);
			f != p &&
				((this._props[t] = p ?? void 0),
				this.update(),
				l && lt(this, l),
				this.updated.then(() => {
					a &&
						((this._ignoreAttr = c),
						ft(this, r, c, this[t]),
						(this._ignoreAttr = null));
				}));
		},
		get() {
			return this._props[t];
		},
	}),
		i != null && (n[t] = i),
		(o[c] = { prop: t, type: r });
}
const lt = (e, { type: t, base: s = CustomEvent, ...o }) =>
		e.dispatchEvent(new s(t, o)),
	at = (e) => e.replace(/([A-Z])/g, "-$1").toLowerCase(),
	ft = (e, t, s, o) =>
		o == null || (t == Boolean && !o)
			? e.removeAttribute(s)
			: e.setAttribute(
					s,
					A(o) ? JSON.stringify(o) : t == Boolean ? "" : o,
			  ),
	ut = (e, t) =>
		e == Boolean
			? !!it[t]
			: e == Number
			? Number(t)
			: e == Array || e == Object
			? JSON.parse(t)
			: t,
	ht = (e, t) =>
		e == null || t == null
			? { value: t, error: !1 }
			: e != String && t === ""
			? { value: void 0, error: !1 }
			: e == Object || e == Array || e == Symbol
			? { value: t, error: {}.toString.call(t) !== `[object ${e.name}]` }
			: t instanceof e
			? { value: t, error: e == Number && Number.isNaN(t.valueOf()) }
			: e == String || e == Number || e == Boolean
			? {
					value: t,
					error:
						e == Number
							? typeof t != "number"
								? !0
								: Number.isNaN(t)
							: e == String
							? typeof t != "string"
							: typeof t != "boolean",
			  }
			: { value: t, error: !0 },
	mt = Symbol(),
	pt = Symbol("Effect"),
	dt = Symbol("LayoutEffect"),
	bt = Symbol("InsertionEffect"),
	yt = (e, t, s = 0) => {
		let o = {};
		function n(l, i) {
			for (const c in o) {
				const u = o[c];
				u.effect && u.tag === l && (u.value = u.effect(u.value, i));
			}
		}
		function r(l) {
			let i;
			try {
				i = l();
			} catch (c) {
				if (c !== mt) throw c;
			} finally {
			}
			return i;
		}
		return {
			load: r,
			cleanEffects: (l) => (
				n(bt, l),
				() => (
					n(dt, l),
					() => {
						n(pt, l), l && (o = {});
					}
				)
			),
		};
	};
let gt = 0;
const Et = (e) => {
		const t = (e?.dataset || {})?.hydrate || "";
		return t || "c" + gt++;
	},
	_ = (e, t) => {
		const s = {},
			o = {},
			{ props: n, styles: r, name: a } = e,
			l = (a[0] || "").toUpperCase() + a.slice(1);
		return {
			[l]: class extends (t || HTMLElement) {
				constructor() {
					super(),
						this._setup(),
						(this._render = () => e({ ...this._props }));
					for (const c in o) this[c] = o[c];
				}
				static get styles() {
					return [super.styles, r];
				}
				async _setup() {
					if (this._props) return;
					this._props = {};
					let c, u;
					(this.mounted = new Promise(
						(b) =>
							(this.mount = () => {
								b(),
									c != this.parentNode &&
										(this.update(), (c = this.parentNode));
							}),
					)),
						(this.unmounted = new Promise(
							(b) =>
								(this.unmount = () => {
									b(),
										(u = u || c),
										(u != c || !this.isConnected) &&
											(m.cleanEffects(!0)()(), (u = c));
								}),
						)),
						(this.symbolId = this.symbolId || Symbol());
					const m = yt(() => this.update(), this, Et(this));
					let f,
						h = !0;
					const p = B(this);
					(this.update = () => (
						f ||
							((f = !0),
							(this.updated = (this.updated || this.mounted)
								.then(() => {
									try {
										const b = m.load(this._render),
											g = m.cleanEffects();
										return (
											b &&
												b.render(
													this,
													this.symbolId,
													p,
												),
											(f = !1),
											h && ((h = !1), !p && St(this)),
											g()
										);
									} finally {
										f = !1;
									}
								})
								.then((b) => {
									b && b();
								}))),
						this.updated
					)),
						this.update();
				}
				connectedCallback() {
					this.mount(),
						super.connectedCallback && super.connectedCallback();
				}
				async disconnectedCallback() {
					super.disconnectedCallback && super.disconnectedCallback(),
						await this.mounted,
						this.unmount();
				}
				attributeChangedCallback(c, u, m) {
					if (s[c]) {
						if (c === this._ignoreAttr || u === m) return;
						const { prop: f, type: h } = s[c];
						try {
							this[f] = ut(h, m);
						} catch {
							throw new rt(
								this,
								`The value defined as attr '${c}' cannot be parsed by type '${h.name}'`,
								m,
							);
						}
					} else super.attributeChangedCallback(c, u, m);
				}
				static get props() {
					return { ...super.props, ...n };
				}
				static get observedAttributes() {
					const c = super.observedAttributes || [];
					for (const u in n) ct(this.prototype, u, n[u], s, o);
					return Object.keys(s).concat(c);
				}
			},
		}[l];
	};
function St(e) {
	const { styles: t } = e.constructor,
		{ shadowRoot: s } = e;
	if (s && t.length) {
		const o = [];
		F(t, (n) => {
			n &&
				(n instanceof Element
					? s.appendChild(n.cloneNode(!0))
					: o.push(n));
		}),
			o.length && (s.adoptedStyleSheets = o);
	}
}
const q = { sheet: !!document.adoptedStyleSheets },
	Nt = { checked: 1, value: 1, selected: 1 },
	At = {
		list: 1,
		type: 1,
		size: 1,
		form: 1,
		width: 1,
		height: 1,
		src: 1,
		href: 1,
		slot: 1,
	},
	Pt = { shadowDom: 1, staticNode: 1, cloneNode: 1, children: 1, key: 1 },
	w = {},
	L = [],
	C = document;
class T extends Text {}
const R = Symbol.for,
	Ot = R("Atomico.ID"),
	k = R("Atomico.$$"),
	v = R("Atomico.REF"),
	wt = () => {};
function _t(e, t, s) {
	return J(this, e, t, s);
}
const G = (e, t, ...s) => {
	const o = t || w;
	let { children: n } = o;
	if (((n = n ?? (s.length ? s : L)), e === wt)) return n;
	const r = e
		? e instanceof Node
			? 1
			: e.prototype instanceof HTMLElement && 2
		: 0;
	if (r === !1 && e instanceof Function)
		return e(n != L ? { children: n, ...o } : o);
	const a = q.render || _t;
	return {
		$$: k,
		type: e,
		props: o,
		children: n,
		key: o.key,
		shadow: o.shadowDom,
		static: o.staticNode,
		raw: r,
		is: o.is,
		clone: o.cloneNode,
		render: a,
	};
};
function J(e, t, s = Ot, o, n) {
	let r;
	if ((t && t[s] && t[s].vnode == e) || e.$$ != k) return t;
	(e || !t) &&
		((n = n || e.type == "svg"),
		(r =
			e.type != "host" &&
			(e.raw == 1
				? (t && e.clone ? t[v] : t) != e.type
				: e.raw == 2
				? !(t instanceof e.type)
				: t
				? t[v] || t.localName != e.type
				: !t)),
		r &&
			e.type != null &&
			(e.raw == 1 && e.clone
				? ((o = !0), (t = e.type.cloneNode(!0)), (t[v] = e.type))
				: (t =
						e.raw == 1
							? e.type
							: e.raw == 2
							? new e.type()
							: n
							? C.createElementNS(
									"http://www.w3.org/2000/svg",
									e.type,
							  )
							: C.createElement(
									e.type,
									e.is ? { is: e.is } : void 0,
							  ))));
	const a = t[s] ? t[s] : w,
		{ vnode: l = w, cycle: i = 0 } = a;
	let { fragment: c, handlers: u } = a;
	const { children: m = L, props: f = w } = l;
	if (((u = r ? {} : u || {}), e.static && !r)) return t;
	if (
		(e.shadow && !t.shadowRoot && t.attachShadow({ mode: "open" }),
		e.props != f && Lt(t, f, e.props, u, n),
		e.children !== m)
	) {
		const h = e.shadow ? t.shadowRoot : t;
		c = vt(
			e.children,
			c,
			h,
			s,
			!i && o,
			n && e.type == "foreignObject" ? !1 : n,
		);
	}
	return (t[s] = { vnode: e, handlers: u, fragment: c, cycle: i + 1 }), t;
}
function Mt(e, t) {
	const s = new T(""),
		o = new T("");
	let n;
	if ((e[t ? "prepend" : "append"](s), t)) {
		let { firstElementChild: r } = e;
		for (; r; ) {
			if (B(r)) {
				n = r;
				break;
			}
			r = r.nextElementSibling;
		}
	}
	return n ? e.insertBefore(o, n) : e.append(o), { markStart: s, markEnd: o };
}
function vt(e, t, s, o, n, r) {
	e = e == null ? null : ot(e) ? e : [e];
	const a = t || Mt(s, n),
		{ markStart: l, markEnd: i, keyes: c } = a;
	let u;
	const m = c && new Set();
	let f = l;
	if (
		(e &&
			F(e, (h) => {
				if (typeof h == "object" && h.$$ != k) return;
				const p = h.$$ && h.key,
					b = c && p != null && c.get(p);
				f != i && f === b
					? m.delete(f)
					: (f = f == i ? i : f.nextSibling);
				const g = c ? b : f;
				let d = g;
				if (h.$$) d = J(h, g, o, n, r);
				else {
					const M = h + "";
					!(d instanceof Text) || d instanceof T
						? (d = new Text(M))
						: d.data != M && (d.data = M);
				}
				d != f &&
					(c && m.delete(d),
					!g || c
						? (s.insertBefore(d, f), c && f != i && m.add(f))
						: g == i
						? s.insertBefore(d, i)
						: (s.replaceChild(d, g), (f = d))),
					p != null && ((u = u || new Map()), u.set(p, d));
			}),
		(f = f == i ? i : f.nextSibling),
		t && f != i)
	)
		for (; f != i; ) {
			const h = f;
			(f = f.nextSibling), h.remove();
		}
	return m && m.forEach((h) => h.remove()), (a.keyes = u), a;
}
function Lt(e, t, s, o, n) {
	for (const r in t) !(r in s) && $(e, r, t[r], null, n, o);
	for (const r in s) $(e, r, t[r], s[r], n, o);
}
function $(e, t, s, o, n, r) {
	if (
		((t = t == "class" && !n ? "className" : t),
		(s = s ?? null),
		(o = o ?? null),
		t in e && Nt[t] && (s = e[t]),
		!(o === s || Pt[t] || t[0] == "_"))
	)
		if (t[0] == "o" && t[1] == "n" && (S(o) || S(s)))
			Ct(e, t.slice(2), o, r);
		else if (t == "ref") o && (S(o) ? o(e) : (o.current = e));
		else if (t == "style") {
			const { style: a } = e;
			(s = s || ""), (o = o || "");
			const l = A(s),
				i = A(o);
			if (l)
				for (const c in s)
					if (i) !(c in o) && x(a, c, null);
					else break;
			if (i)
				for (const c in o) {
					const u = o[c];
					(l && s[c] === u) || x(a, c, u);
				}
			else a.cssText = o;
		} else {
			const a = t[0] == "$" ? t.slice(1) : t;
			a === t && ((!n && !At[t] && t in e) || S(o) || S(s))
				? (e[t] = o ?? "")
				: o == null
				? e.removeAttribute(a)
				: e.setAttribute(a, A(o) ? JSON.stringify(o) : o);
		}
}
function Ct(e, t, s, o) {
	if ((o.handleEvent || (o.handleEvent = (n) => o[n.type].call(e, n)), s)) {
		if (!o[t]) {
			const n =
				s.capture || s.once || s.passive ? Object.assign({}, s) : null;
			e.addEventListener(t, o, n);
		}
		o[t] = s;
	} else o[t] && (e.removeEventListener(t, o), delete o[t]);
}
function x(e, t, s) {
	let o = "setProperty";
	s == null && ((o = "removeProperty"), (s = null)),
		~t.indexOf("-") ? e[o](t, s) : (e[t] = s);
}
const D = {};
function K(e, ...t) {
	const s = (e.raw || e).reduce((o, n, r) => o + n + (t[r] || ""), "");
	return (D[s] = D[s] || Tt(s));
}
function Tt(e) {
	if (q.sheet) {
		const t = new CSSStyleSheet();
		return t.replaceSync(e), t;
	} else {
		const t = C.createElement("style");
		return (t.textContent = e), t;
	}
}
const Zt = 0,
	E = 1,
	P = 2,
	O = 3,
	j = 4,
	N = 5,
	Z = 6,
	Y = 0,
	Ht = 2,
	Q = 3,
	W = 4,
	X = N,
	Rt = Z,
	V = (e, t, s, o) => {
		let n;
		t[0] = 0;
		for (let r = 1; r < t.length; r++) {
			const a = t[r++],
				l = t[r] ? ((t[0] |= a ? 1 : 2), s[t[r++]]) : t[++r];
			a === Q
				? (o[0] = l)
				: a === W
				? (o[1] = Object.assign(o[1] || {}, l))
				: a === X
				? ((o[1] = o[1] || {})[t[++r]] = l)
				: a === Rt
				? (o[1][t[++r]] += l + "")
				: a
				? ((n = e.apply(l, V(e, l, s, ["", null]))),
				  o.push(n),
				  l[0] ? (t[0] |= 2) : ((t[r - 2] = Y), (t[r] = n)))
				: o.push(l);
		}
		return o;
	},
	kt = function (e) {
		let t = E,
			s = "",
			o = "",
			n = [0],
			r,
			a;
		const l = (i) => {
			t === E && (i || (s = s.replace(/^\s*\n\s*|\s*\n\s*$/g, "")))
				? n.push(Y, i, s)
				: t === O && (i || s)
				? (n.push(Q, i, s), (t = P))
				: t === P && s === "..." && i
				? n.push(W, i, 0)
				: t === P && s && !i
				? n.push(X, 0, !0, s)
				: t >= N &&
				  ((s || (!i && t === N)) && (n.push(t, 0, s, a), (t = Z)),
				  i && (n.push(t, i, 0, a), (t = Z))),
				(s = "");
		};
		for (let i = 0; i < e.length; i++) {
			i && (t === E && l(), l(i));
			for (let c = 0; c < e[i].length; c++)
				(r = e[i][c]),
					t === E
						? r === "<"
							? (l(), (n = [n]), (t = O))
							: (s += r)
						: t === j
						? s === "--" && r === ">"
							? ((t = E), (s = ""))
							: (s = r + s[0])
						: o
						? r === o
							? (o = "")
							: (s += r)
						: r === '"' || r === "'"
						? (o = r)
						: r === ">"
						? (l(), (t = E))
						: t &&
						  (r === "="
								? ((t = N), (a = s), (s = ""))
								: r === "/" && (t < N || e[i][c + 1] === ">")
								? (l(),
								  t === O && (n = n[0]),
								  (t = n),
								  (n = n[0]).push(Ht, 0, t),
								  (t = Zt))
								: r === " " ||
								  r === "	" ||
								  r ===
										`
` ||
								  r === "\r"
								? (l(), (t = P))
								: (s += r)),
					t === O && s === "!--" && ((t = j), (n = n[0]));
		}
		return l(), n;
	},
	It = new Map();
function tt(e) {
	let t = It;
	return (
		(t = V(G, t.get(e) || (t.set(e, (t = kt(e))), t), arguments, [])),
		t.length > 1 ? t : t[0]
	);
}
const y = (e, t, s) => (t == null ? (t = { key: s }) : (t.key = s), G(e, t)),
	H = y;
function I({ message: e }) {
	return H("host", {
		shadowDom: !0,
		children: [
			y("div", { class: "layer", children: e }),
			y("div", { class: "box", children: y("slot", {}) }),
		],
	});
}
I.props = { message: { type: String, value: "Hello." } };
I.styles = K`:host,.layer{width:100%;height:100%;display:flex;align-items:center;justify-content:center;position:relative}.layer{position:absolute;top:0;left:0;font-size:20vw;font-weight:700;overflow:hidden;color:#fff;text-shadow:0px 2vw 4vw var(--hello-shadow-1, magenta),0px 2vw 1vw var(--hello-shadow-2, tomato);opacity:.15;align-items:flex-end}.box{position:relative}`;
const zt = _(I);
customElements.define("atomico-hello", zt);
function et({ color: e, width: t }) {
	return y("host", {
		children: y("svg", {
			width: t,
			style: "display:inline-block",
			viewBox: "0 0 287.407 86.961",
			children: H("g", {
				transform: "translate(-331.97 -291.125)",
				children: [
					H("g", {
						transform: "translate(321.97 336.23) rotate(-45)",
						children: [
							y("path", {
								d: "M12.46,13.481a13.426,13.426,0,0,1-1.819-.124L1.962,4.681c.92.19,1.862.341,2.8.447L13.1,13.466C12.888,13.476,12.672,13.481,12.46,13.481Zm2.554-.246L7.084,5.3c.406.016.821.024,1.234.024.373,0,.75-.006,1.121-.02l7.425,7.425a13.343,13.343,0,0,1-1.851.5ZM7.763,12.63A13.206,13.206,0,0,1,3.047,9.583,13.212,13.212,0,0,1,0,4.866L7.764,12.63Zm10.612-.53L11.45,5.175c.692-.069,1.389-.162,2.075-.277l6.339,6.339a13.261,13.261,0,0,1-1.488.865Zm2.709-1.788L15.316,4.543c.623-.143,1.25-.307,1.863-.488l5.1,5.1c-.13.143-.268.287-.408.427-.253.253-.519.5-.788.728Zm2.162-2.334h0L18.8,3.529c.565-.2,1.135-.423,1.692-.66l3.666,3.666a13.279,13.279,0,0,1-.908,1.441Zm1.594-2.9h0L21.965,2.2c.519-.252,1.038-.524,1.545-.807L25.4,3.286a13.317,13.317,0,0,1-.562,1.787Zm.871-3.627h0L24.859.594c.3-.19.611-.389.913-.594a13.435,13.435,0,0,1-.06,1.447Z",
								transform: "translate(21.134 55.622)",
								fill: e,
							}),
							y("path", {
								d: "M29.6,59.192a29.813,29.813,0,0,1-5.966-.6,29.434,29.434,0,0,1-10.583-4.453A29.685,29.685,0,0,1,2.326,41.117,29.444,29.444,0,0,1,.6,35.562a29.891,29.891,0,0,1,0-11.939A29.429,29.429,0,0,1,5.055,13.048,29.685,29.685,0,0,1,18.076,2.326,29.447,29.447,0,0,1,23.631.6,29.859,29.859,0,0,1,36.69.856,29.505,29.505,0,0,1,48.814,7.088a29.805,29.805,0,0,1,4.625,4.971,18.694,18.694,0,0,0,0,35.078,29.734,29.734,0,0,1-10.273,8.77A29.464,29.464,0,0,1,29.6,59.192Z",
								transform: "translate(0 0)",
								fill: e,
							}),
							y("path", {
								d: "M9.792,31.852H23.54a16.714,16.714,0,0,1-13.748,0ZM6.6,29.953a16.774,16.774,0,0,1-2.275-2.082H29a16.774,16.774,0,0,1-2.275,2.082ZM2.838,25.971a16.655,16.655,0,0,1-1.2-2.082H31.688a16.641,16.641,0,0,1-1.2,2.082ZM.869,21.989a16.534,16.534,0,0,1-.553-2.082h32.7a16.563,16.563,0,0,1-.553,2.082ZM.053,18.008Q0,17.344,0,16.666q0-.372.016-.739h33.3q.016.367.016.739,0,.677-.053,1.342Zm.154-3.982a16.579,16.579,0,0,1,.47-2.082H32.653a16.57,16.57,0,0,1,.47,2.082Zm1.159-3.982A16.614,16.614,0,0,1,2.447,7.963H30.879a16.645,16.645,0,0,1,1.081,2.082Zm2.44-3.982A16.771,16.771,0,0,1,5.855,3.982H27.476a16.759,16.759,0,0,1,2.048,2.082ZM8.593,2.082a16.692,16.692,0,0,1,16.144,0Z",
								transform: "translate(43.232 12.774)",
								fill: e,
							}),
						],
					}),
					y("path", {
						d: "M27.725-47.09h4.524L20.421-79.745H15.473L3.6-47.09H8.122L10.759-54.4H25.086ZM23.861-57.881H11.987l5.937-16.587Zm14.514,3.723c0,5.183,2.594,7.068,7.163,7.068H49.4v-3.628H46.245c-2.637,0-3.581-.9-3.581-3.44v-15.22H49.4v-3.534h-6.74v-6.5H38.375v6.5H35.029v3.534h3.346Zm40.713-5.89c0-8.152-5.7-13.288-13.053-13.288-7.306,0-13.053,5.136-13.053,13.288,0,8.2,5.56,13.383,12.864,13.383C73.2-46.666,79.088-51.849,79.088-60.048Zm-21.723,0c0-6.5,4.1-9.566,8.623-9.566,4.429,0,8.718,3.063,8.718,9.566,0,6.55-4.382,9.613-8.859,9.613s-8.482-3.063-8.482-9.613ZM122.016-47.09h4.241V-62.31c0-7.4-4.571-11.074-10.462-11.074a9.559,9.559,0,0,0-9.142,5.75c-1.7-3.864-5.231-5.75-9.471-5.75A9.336,9.336,0,0,0,89.03-69.19v-3.723H84.742V-47.09H89.03V-61.321c0-5.56,2.969-8.341,7.306-8.341,4.241,0,7.068,2.686,7.068,7.964V-47.09h4.241V-61.321c0-5.56,2.969-8.341,7.306-8.341,4.241,0,7.068,2.686,7.068,7.964Zm11.262,0h4.288V-72.913h-4.288Zm2.215-30.017a2.857,2.857,0,0,0,2.024-.87,2.857,2.857,0,0,0,.8-2.051,2.857,2.857,0,0,0-.8-2.051,2.857,2.857,0,0,0-2.024-.87,2.877,2.877,0,0,0-2.079.842,2.877,2.877,0,0,0-.842,2.079,2.877,2.877,0,0,0,.842,2.079A2.877,2.877,0,0,0,135.493-77.106Zm7.775,17.058c0,8.2,5.231,13.383,12.58,13.383,6.41,0,10.6-3.58,11.923-8.718h-4.618c-.942,3.251-3.487,5.089-7.3,5.089-4.712,0-8.2-3.346-8.2-9.754,0-6.314,3.487-9.66,8.2-9.66,3.817,0,6.409,1.979,7.3,5.089h4.618c-1.32-5.419-5.513-8.718-11.922-8.718-7.351,0-12.582,5.183-12.582,13.288Zm54.708,0c0-8.152-5.7-13.288-13.053-13.288-7.306,0-13.053,5.136-13.053,13.288,0,8.2,5.561,13.383,12.864,13.383C192.087-46.666,197.976-51.849,197.976-60.048Zm-21.723,0c0-6.5,4.1-9.566,8.623-9.566,4.429,0,8.718,3.063,8.718,9.566,0,6.55-4.382,9.613-8.859,9.613S176.253-53.5,176.253-60.048Z",
						transform: "translate(411.401 397.056)",
						fill: e,
					}),
				],
			}),
		}),
	});
}
et.props = {
	color: { type: String, value: "#232323" },
	width: { type: String, value: "20rem" },
};
const $t = _(et);
customElements.define("atomico-brand", $t);
function xt() {
	return tt`<host><h1>Magic!</h1></host>`;
}
const st = _(xt);
customElements.define("a-sub-tag", st);
function Dt() {
	return console.log(st), tt`<host><h1>Magic!</h1></host>`;
}
const jt = _(Dt);
customElements.define("a-button", jt);
console.log(
	K`:host{--background: var(--my-component--background) }:host{background:var(--background)}/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */html{line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0}main{display:block}h1{font-size:2em;margin:.67em 0}hr{box-sizing:content-box;height:0;overflow:visible}pre{font-family:monospace,monospace;font-size:1em}a{background-color:transparent}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}img{border-style:none}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,input{overflow:visible}button,select{text-transform:none}button,[type=button],[type=reset],[type=submit]{-webkit-appearance:button}button::-moz-focus-inner,[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner{border-style:none;padding:0}button:-moz-focusring,[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:.35em .75em .625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{vertical-align:baseline}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details{display:block}summary{display:list-item}template{display:none}[hidden]{display:none}`,
);
