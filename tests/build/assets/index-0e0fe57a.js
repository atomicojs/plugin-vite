(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function s(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(r){if(r.ep)return;r.ep=!0;const n=s(r);fetch(r.href,n)}})();const L=Symbol.for("atomico/hooks");globalThis[L]=globalThis[L]||{};let T=globalThis[L];const ct=Symbol(),lt=Symbol("Effect"),at=Symbol("LayoutEffect"),ft=Symbol("InsertionEffect"),ut=(e,t,s)=>{const{i:o,hooks:r}=T.c,n=r[o]=r[o]||{};return n.value=e(n.value),n.effect=t,n.tag=s,T.c.i++,r[o].value},Vt=()=>ut((e={current:T.c.host})=>e),te=()=>T.c.update,ht=(e,t,s=0)=>{let o={};function r(a,l){for(const i in o){const f=o[i];f.effect&&f.tag===a&&(f.value=f.effect(f.value,l))}}function n(a){T.c={host:t,hooks:o,update:e,i:0,id:s};let l;try{l=a()}catch(i){if(i!==ct)throw i}finally{T.c=null}return l}return{load:n,cleanEffects:a=>(r(ft,a),()=>(r(at,a),()=>{r(lt,a),a&&(o={})}))}};function ee(e,t){const s=e.length;if(s!==t.length)return!1;for(let o=0;o<s;o++)if(e[o]!==t[o])return!1;return!0}const S=e=>typeof e=="function",v=e=>typeof e=="object",{isArray:mt}=Array,K=e=>"hydrate"in(e?.dataset||{});function Y(e,t){let s;const o=r=>{let{length:n}=r;for(let c=0;c<n;c++){const a=r[c];if(a&&Array.isArray(a))o(a);else{const l=typeof a;if(a==null||l==="function"||l==="boolean")continue;l==="string"||l==="number"?(s==null&&(s=""),s+=a):(s!=null&&(t(s),s=null),t(a))}}};o(e),s!=null&&t(s)}const se=(e,t,s)=>(e.addEventListener(t,s),()=>e.removeEventListener(t,s));let W=class{constructor(t,s,o){this.message=s,this.target=t,this.value=o}};class pt extends W{}class dt extends W{}const w="Custom",j=null,bt={true:1,"":1,1:1};function yt(e,t,s,o,r){const{type:n,reflect:c,event:a,value:l,attr:i=Et(t)}=s?.name!=w&&v(s)&&s!=j?s:{type:s},f=n?.name===w&&n.map,h=!(n==Function||f||n==j),u=l!=null,m=u&&n!=Boolean;Object.defineProperty(e,t,{configurable:!0,set(b){const d=this[t];m&&b==null&&(b=l);const{error:g,value:p}=(f?Mt:vt)(n,h&&S(b)?b(d):b);if(g&&p!=null)throw new pt(this,`The value defined for prop '${t}' must be of type '${n.name}'`,p);d!=p&&(this._props[t]=p??void 0,this.update(),a&&gt(this,a),this.updated.then(()=>{c&&(this._ignoreAttr=i,St(this,n,i,this[t]),this._ignoreAttr=null)}))},get(){return this._props[t]}}),u&&(r[t]=l),o[i]={prop:t,type:n}}const gt=(e,{type:t,base:s=CustomEvent,...o})=>e.dispatchEvent(new s(t,o)),Et=e=>e.replace(/([A-Z])/g,"-$1").toLowerCase(),St=(e,t,s,o)=>o==null||t==Boolean&&!o?e.removeAttribute(s):e.setAttribute(s,t?.name===w&&t?.serialize?t?.serialize(o):v(o)?JSON.stringify(o):t==Boolean?"":o),Tt=(e,t)=>e==Boolean?!!bt[t]:e==Number?Number(t):e==String?t:e==Array||e==Object?JSON.parse(t):e.name==w?t:new e(t),Mt=({map:e},t)=>{try{return{value:e(t),error:!1}}catch{return{value:t,error:!0}}},vt=(e,t)=>e==null||t==null?{value:t,error:!1}:e!=String&&t===""?{value:void 0,error:!1}:e==Object||e==Array||e==Symbol?{value:t,error:{}.toString.call(t)!==`[object ${e.name}]`}:t instanceof e?{value:t,error:e==Number&&Number.isNaN(t.valueOf())}:e==String||e==Number||e==Boolean?{value:t,error:e==Number?typeof t!="number"?!0:Number.isNaN(t):e==String?typeof t!="string":typeof t!="boolean"}:{value:t,error:!0};let At=0;const Nt=e=>{const t=(e?.dataset||{})?.hydrate||"";return t||"c"+At++},C=(e,t)=>{const s={},o={},{props:r,styles:n,name:c}=e,a=(c[0]||"").toUpperCase()+c.slice(1);return{[a]:class extends(t||HTMLElement){constructor(){super(),this._setup(),this._render=()=>e({...this._props});for(const i in o)this[i]=o[i]}static get styles(){return[super.styles,n]}async _setup(){if(this._props)return;this._props={};let i,f;this.mounted=new Promise(d=>this.mount=()=>{d(),i!=this.parentNode&&(this.update(),i=this.parentNode)}),this.unmounted=new Promise(d=>this.unmount=()=>{d(),f=f||i,(f!=i||!this.isConnected)&&(h.cleanEffects(!0)()(),f=i)}),this.symbolId=this.symbolId||Symbol();const h=ht(()=>this.update(),this,Nt(this));let u,m=!0;const b=K(this);this.update=()=>(u||(u=!0,this.updated=(this.updated||this.mounted).then(()=>{try{const d=h.load(this._render),g=h.cleanEffects();return d&&d.render(this,this.symbolId,b),u=!1,m&&(m=!1,!b&&Pt(this)),g()}finally{u=!1}}).then(d=>{d&&d()})),this.updated),this.update()}connectedCallback(){this.mount(),super.connectedCallback&&super.connectedCallback()}async disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback(),await this.mounted,this.unmount()}attributeChangedCallback(i,f,h){if(s[i]){if(i===this._ignoreAttr||f===h)return;const{prop:u,type:m}=s[i];try{this[u]=Tt(m,h)}catch{throw new dt(this,`The value defined as attr '${i}' cannot be parsed by type '${m.name}'`,h)}}else super.attributeChangedCallback(i,f,h)}static get props(){return{...super.props,...r}}static get observedAttributes(){const i=super.observedAttributes||[];for(const f in r)yt(this.prototype,f,r[f],s,o);return Object.keys(s).concat(i)}}}[a]};function Pt(e){const{styles:t}=e.constructor,{shadowRoot:s}=e;if(s&&t.length){const o=[];Y(t,r=>{r&&(r instanceof Element?s.appendChild(r.cloneNode(!0)):o.push(r))}),o.length&&(s.adoptedStyleSheets=o)}}const k=Symbol.for("atomico/options");globalThis[k]=globalThis[k]||{sheet:!!document.adoptedStyleSheets};const Q=globalThis[k],wt={checked:1,value:1,selected:1},Ct={list:1,type:1,size:1,form:1,width:1,height:1,src:1,href:1,slot:1},_t={shadowDom:1,staticNode:1,cloneNode:1,children:1,key:1},P={},x=[],R=document;class Z extends Text{}const B=Symbol.for,Ot=B("Atomico.ID"),I=B("Atomico.$$"),O=B("Atomico.REF"),Lt=()=>{};function kt(e,t,s){return V(this,e,t,s)}const X=(e,t,...s)=>{const o=t||P;let{children:r}=o;if(r=r??(s.length?s:x),e===Lt)return r;const n=e?e instanceof Node?1:e.prototype instanceof HTMLElement&&2:0;if(n===!1&&e instanceof Function)return e(r!=x?{children:r,...o}:o);const c=Q.render||kt;return{$$:I,type:e,props:o,children:r,key:o.key,shadow:o.shadowDom,static:o.staticNode,raw:n,is:o.is,clone:o.cloneNode,render:c}};function V(e,t,s=Ot,o,r){let n;if(t&&t[s]&&t[s].vnode==e||e.$$!=I)return t;(e||!t)&&(r=r||e.type=="svg",n=e.type!="host"&&(e.raw==1?(t&&e.clone?t[O]:t)!=e.type:e.raw==2?!(t instanceof e.type):t?t[O]||t.localName!=e.type:!t),n&&e.type!=null&&(e.raw==1&&e.clone?(o=!0,t=e.type.cloneNode(!0),t[O]=e.type):t=e.raw==1?e.type:e.raw==2?new e.type:r?R.createElementNS("http://www.w3.org/2000/svg",e.type):R.createElement(e.type,e.is?{is:e.is}:void 0)));const c=t[s]?t[s]:P,{vnode:a=P,cycle:l=0}=c;let{fragment:i,handlers:f}=c;const{children:h=x,props:u=P}=a;if(f=n?{}:f||{},e.static&&!n)return t;if(e.shadow&&!t.shadowRoot&&t.attachShadow({mode:"open"}),e.props!=u&&Zt(t,u,e.props,f,r),e.children!==h){const m=e.shadow?t.shadowRoot:t;i=Rt(e.children,i,m,s,!l&&o,r&&e.type=="foreignObject"?!1:r)}return t[s]={vnode:e,handlers:f,fragment:i,cycle:l+1},t}function xt(e,t){const s=new Z(""),o=new Z("");let r;if(e[t?"prepend":"append"](s),t){let{firstElementChild:n}=e;for(;n;){if(K(n)){r=n;break}n=n.nextElementSibling}}return r?e.insertBefore(o,r):e.append(o),{markStart:s,markEnd:o}}function Rt(e,t,s,o,r,n){e=e==null?null:mt(e)?e:[e];const c=t||xt(s,r),{markStart:a,markEnd:l,keyes:i}=c;let f;const h=i&&new Set;let u=a;if(e&&Y(e,m=>{if(typeof m=="object"&&m.$$!=I)return;const b=m.$$&&m.key,d=i&&b!=null&&i.get(b);u!=l&&u===d?h.delete(u):u=u==l?l:u.nextSibling;const g=i?d:u;let p=g;if(m.$$)p=V(m,g,o,r,n);else{const _=m+"";!(p instanceof Text)||p instanceof Z?p=new Text(_):p.data!=_&&(p.data=_)}p!=u&&(i&&h.delete(p),!g||i?(s.insertBefore(p,u),i&&u!=l&&h.add(u)):g==l?s.insertBefore(p,l):(s.replaceChild(p,g),u=p)),b!=null&&(f=f||new Map,f.set(b,p))}),u=u==l?l:u.nextSibling,t&&u!=l)for(;u!=l;){const m=u;u=u.nextSibling,m.remove()}return h&&h.forEach(m=>m.remove()),c.keyes=f,c}function Zt(e,t,s,o,r){for(const n in t)!(n in s)&&F(e,n,t[n],null,r,o);for(const n in s)F(e,n,t[n],s[n],r,o)}function F(e,t,s,o,r,n){if(t=t=="class"&&!r?"className":t,s=s??null,o=o??null,t in e&&wt[t]&&(s=e[t]),!(o===s||_t[t]||t[0]=="_"))if(t[0]=="o"&&t[1]=="n"&&(S(o)||S(s)))$t(e,t.slice(2),o,n);else if(t=="ref")o&&(S(o)?o(e):o.current=e);else if(t=="style"){const{style:c}=e;s=s||"",o=o||"";const a=v(s),l=v(o);if(a)for(const i in s)if(l)!(i in o)&&U(c,i,null);else break;if(l)for(const i in o){const f=o[i];a&&s[i]===f||U(c,i,f)}else c.cssText=o}else{const c=t[0]=="$"?t.slice(1):t;c===t&&(!r&&!Ct[t]&&t in e||S(o)||S(s))?e[t]=o??"":o==null?e.removeAttribute(c):e.setAttribute(c,v(o)?JSON.stringify(o):o)}}function $t(e,t,s,o){if(o.handleEvent||(o.handleEvent=r=>o[r.type].call(e,r)),s){if(!o[t]){const r=s.capture||s.once||s.passive?Object.assign({},s):null;e.addEventListener(t,o,r)}o[t]=s}else o[t]&&(e.removeEventListener(t,o),delete o[t])}function U(e,t,s){let o="setProperty";s==null&&(o="removeProperty",s=null),~t.indexOf("-")?e[o](t,s):e[t]=s}const q={};function tt(e,...t){const s=(e.raw||e).reduce((o,r,n)=>o+r+(t[n]||""),"");return q[s]=q[s]||Ht(s)}function Ht(e){if(Q.sheet){const t=new CSSStyleSheet;return t.replaceSync(e),t}else{const t=R.createElement("style");return t.textContent=e,t}}const Bt=0,E=1,A=2,N=3,G=4,M=5,$=6,et=0,It=2,st=3,ot=4,nt=M,Dt=$,rt=(e,t,s,o)=>{let r;t[0]=0;for(let n=1;n<t.length;n++){const c=t[n++],a=t[n]?(t[0]|=c?1:2,s[t[n++]]):t[++n];c===st?o[0]=a:c===ot?o[1]=Object.assign(o[1]||{},a):c===nt?(o[1]=o[1]||{})[t[++n]]=a:c===Dt?o[1][t[++n]]+=a+"":c?(r=e.apply(a,rt(e,a,s,["",null])),o.push(r),a[0]?t[0]|=2:(t[n-2]=et,t[n]=r)):o.push(a)}return o},zt=function(e){let t=E,s="",o="",r=[0],n,c;const a=l=>{t===E&&(l||(s=s.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?r.push(et,l,s):t===N&&(l||s)?(r.push(st,l,s),t=A):t===A&&s==="..."&&l?r.push(ot,l,0):t===A&&s&&!l?r.push(nt,0,!0,s):t>=M&&((s||!l&&t===M)&&(r.push(t,0,s,c),t=$),l&&(r.push(t,l,0,c),t=$)),s=""};for(let l=0;l<e.length;l++){l&&(t===E&&a(),a(l));for(let i=0;i<e[l].length;i++)n=e[l][i],t===E?n==="<"?(a(),r=[r],t=N):s+=n:t===G?s==="--"&&n===">"?(t=E,s=""):s=n+s[0]:o?n===o?o="":s+=n:n==='"'||n==="'"?o=n:n===">"?(a(),t=E):t&&(n==="="?(t=M,c=s,s=""):n==="/"&&(t<M||e[l][i+1]===">")?(a(),t===N&&(r=r[0]),t=r,(r=r[0]).push(It,0,t),t=Bt):n===" "||n==="	"||n===`
`||n==="\r"?(a(),t=A):s+=n),t===N&&s==="!--"&&(t=G,r=r[0])}return a(),r},jt=new Map;function D(e){let t=jt;return t=rt(X,t.get(e)||(t.set(e,t=zt(e)),t),arguments,[]),t.length>1?t:t[0]}const y=(e,t,s)=>(t==null?t={key:s}:t.key=s,X(e,t)),H=y;function z({message:e}){return H("host",{shadowDom:!0,children:[y("div",{class:"layer",children:e}),y("div",{class:"box",children:y("slot",{})})]})}z.props={message:{type:String,value:"Hello."}};z.styles=tt`:host,.layer{width:100%;height:100%;display:flex;align-items:center;justify-content:center;position:relative}.layer{position:absolute;top:0;left:0;font-size:20vw;font-weight:700;overflow:hidden;color:#fff;text-shadow:0px 2vw 4vw var(--hello-shadow-1, magenta),0px 2vw 1vw var(--hello-shadow-2, tomato);opacity:.15;align-items:flex-end}.box{position:relative}`;const Ft=C(z);customElements.define("atomico-hello",Ft);function it({color:e,width:t}){return y("host",{children:y("svg",{width:t,style:"display:inline-block",viewBox:"0 0 287.407 86.961",children:H("g",{transform:"translate(-331.97 -291.125)",children:[H("g",{transform:"translate(321.97 336.23) rotate(-45)",children:[y("path",{d:"M12.46,13.481a13.426,13.426,0,0,1-1.819-.124L1.962,4.681c.92.19,1.862.341,2.8.447L13.1,13.466C12.888,13.476,12.672,13.481,12.46,13.481Zm2.554-.246L7.084,5.3c.406.016.821.024,1.234.024.373,0,.75-.006,1.121-.02l7.425,7.425a13.343,13.343,0,0,1-1.851.5ZM7.763,12.63A13.206,13.206,0,0,1,3.047,9.583,13.212,13.212,0,0,1,0,4.866L7.764,12.63Zm10.612-.53L11.45,5.175c.692-.069,1.389-.162,2.075-.277l6.339,6.339a13.261,13.261,0,0,1-1.488.865Zm2.709-1.788L15.316,4.543c.623-.143,1.25-.307,1.863-.488l5.1,5.1c-.13.143-.268.287-.408.427-.253.253-.519.5-.788.728Zm2.162-2.334h0L18.8,3.529c.565-.2,1.135-.423,1.692-.66l3.666,3.666a13.279,13.279,0,0,1-.908,1.441Zm1.594-2.9h0L21.965,2.2c.519-.252,1.038-.524,1.545-.807L25.4,3.286a13.317,13.317,0,0,1-.562,1.787Zm.871-3.627h0L24.859.594c.3-.19.611-.389.913-.594a13.435,13.435,0,0,1-.06,1.447Z",transform:"translate(21.134 55.622)",fill:e}),y("path",{d:"M29.6,59.192a29.813,29.813,0,0,1-5.966-.6,29.434,29.434,0,0,1-10.583-4.453A29.685,29.685,0,0,1,2.326,41.117,29.444,29.444,0,0,1,.6,35.562a29.891,29.891,0,0,1,0-11.939A29.429,29.429,0,0,1,5.055,13.048,29.685,29.685,0,0,1,18.076,2.326,29.447,29.447,0,0,1,23.631.6,29.859,29.859,0,0,1,36.69.856,29.505,29.505,0,0,1,48.814,7.088a29.805,29.805,0,0,1,4.625,4.971,18.694,18.694,0,0,0,0,35.078,29.734,29.734,0,0,1-10.273,8.77A29.464,29.464,0,0,1,29.6,59.192Z",transform:"translate(0 0)",fill:e}),y("path",{d:"M9.792,31.852H23.54a16.714,16.714,0,0,1-13.748,0ZM6.6,29.953a16.774,16.774,0,0,1-2.275-2.082H29a16.774,16.774,0,0,1-2.275,2.082ZM2.838,25.971a16.655,16.655,0,0,1-1.2-2.082H31.688a16.641,16.641,0,0,1-1.2,2.082ZM.869,21.989a16.534,16.534,0,0,1-.553-2.082h32.7a16.563,16.563,0,0,1-.553,2.082ZM.053,18.008Q0,17.344,0,16.666q0-.372.016-.739h33.3q.016.367.016.739,0,.677-.053,1.342Zm.154-3.982a16.579,16.579,0,0,1,.47-2.082H32.653a16.57,16.57,0,0,1,.47,2.082Zm1.159-3.982A16.614,16.614,0,0,1,2.447,7.963H30.879a16.645,16.645,0,0,1,1.081,2.082Zm2.44-3.982A16.771,16.771,0,0,1,5.855,3.982H27.476a16.759,16.759,0,0,1,2.048,2.082ZM8.593,2.082a16.692,16.692,0,0,1,16.144,0Z",transform:"translate(43.232 12.774)",fill:e})]}),y("path",{d:"M27.725-47.09h4.524L20.421-79.745H15.473L3.6-47.09H8.122L10.759-54.4H25.086ZM23.861-57.881H11.987l5.937-16.587Zm14.514,3.723c0,5.183,2.594,7.068,7.163,7.068H49.4v-3.628H46.245c-2.637,0-3.581-.9-3.581-3.44v-15.22H49.4v-3.534h-6.74v-6.5H38.375v6.5H35.029v3.534h3.346Zm40.713-5.89c0-8.152-5.7-13.288-13.053-13.288-7.306,0-13.053,5.136-13.053,13.288,0,8.2,5.56,13.383,12.864,13.383C73.2-46.666,79.088-51.849,79.088-60.048Zm-21.723,0c0-6.5,4.1-9.566,8.623-9.566,4.429,0,8.718,3.063,8.718,9.566,0,6.55-4.382,9.613-8.859,9.613s-8.482-3.063-8.482-9.613ZM122.016-47.09h4.241V-62.31c0-7.4-4.571-11.074-10.462-11.074a9.559,9.559,0,0,0-9.142,5.75c-1.7-3.864-5.231-5.75-9.471-5.75A9.336,9.336,0,0,0,89.03-69.19v-3.723H84.742V-47.09H89.03V-61.321c0-5.56,2.969-8.341,7.306-8.341,4.241,0,7.068,2.686,7.068,7.964V-47.09h4.241V-61.321c0-5.56,2.969-8.341,7.306-8.341,4.241,0,7.068,2.686,7.068,7.964Zm11.262,0h4.288V-72.913h-4.288Zm2.215-30.017a2.857,2.857,0,0,0,2.024-.87,2.857,2.857,0,0,0,.8-2.051,2.857,2.857,0,0,0-.8-2.051,2.857,2.857,0,0,0-2.024-.87,2.877,2.877,0,0,0-2.079.842,2.877,2.877,0,0,0-.842,2.079,2.877,2.877,0,0,0,.842,2.079A2.877,2.877,0,0,0,135.493-77.106Zm7.775,17.058c0,8.2,5.231,13.383,12.58,13.383,6.41,0,10.6-3.58,11.923-8.718h-4.618c-.942,3.251-3.487,5.089-7.3,5.089-4.712,0-8.2-3.346-8.2-9.754,0-6.314,3.487-9.66,8.2-9.66,3.817,0,6.409,1.979,7.3,5.089h4.618c-1.32-5.419-5.513-8.718-11.922-8.718-7.351,0-12.582,5.183-12.582,13.288Zm54.708,0c0-8.152-5.7-13.288-13.053-13.288-7.306,0-13.053,5.136-13.053,13.288,0,8.2,5.561,13.383,12.864,13.383C192.087-46.666,197.976-51.849,197.976-60.048Zm-21.723,0c0-6.5,4.1-9.566,8.623-9.566,4.429,0,8.718,3.063,8.718,9.566,0,6.55-4.382,9.613-8.859,9.613S176.253-53.5,176.253-60.048Z",transform:"translate(411.401 397.056)",fill:e})]})})})}it.props={color:{type:String,value:"#232323"},width:{type:String,value:"20rem"}};const Ut=C(it);customElements.define("atomico-brand",Ut);function qt(){return D`<host><h1>Magic!</h1></host>`}const Gt=C(qt);customElements.define("a-sub-tag",Gt);const Jt="modulepreload",Kt=function(e){return"/"+e},J={},Yt=function(t,s,o){if(!s||s.length===0)return t();const r=document.getElementsByTagName("link");return Promise.all(s.map(n=>{if(n=Kt(n),n in J)return;J[n]=!0;const c=n.endsWith(".css"),a=c?'[rel="stylesheet"]':"";if(!!o)for(let f=r.length-1;f>=0;f--){const h=r[f];if(h.href===n&&(!c||h.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${n}"]${a}`))return;const i=document.createElement("link");if(i.rel=c?"stylesheet":Jt,c||(i.as="script",i.crossOrigin=""),i.href=n,document.head.appendChild(i),c)return new Promise((f,h)=>{i.addEventListener("load",f),i.addEventListener("error",()=>h(new Error(`Unable to preload CSS for ${n}`)))})})).then(()=>t()).catch(n=>{const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=n,window.dispatchEvent(c),!c.defaultPrevented)throw n})},Wt=D`<h2>Title 1</h2>
<p>content 1...</p>
<pre><code class="language-ts" textContent="import { createContext } from "atomico";
import { Brand } from "./brand/brand";

console.log({ Brand });
export const MyTheme = createContext({ color: "red" });

customElements.define("my-theme", MyTheme);"/></pre><p>content 2...</p>
<pre><code class="language-tsx" textContent="import { c, useContext } from "atomico";
import { MyTheme } from "./my-theme";

function myButton() {
    const { color } = useContext(MyTheme);
    return <host>color: {color}</host>;
}

export const MyButton = c(myButton);

customElements.define("my-button", MyButton);"/></pre><p>content 3...</p>
${(await Yt(()=>import("./1312e-13138-13115-6970-69ab-6942-013be196.js"),[])).default}<pre><code class="language-tsx" textContent="import { MyTheme } from "./my-theme";
import { MyButton } from "./my-button";

export default (
    <>
        <MyTheme value={{ color: "red" }}>
            <MyButton />
        </MyTheme>
        <MyTheme value={{ color: "black" }}>
            <MyButton />
        </MyTheme>
        <MyTheme value={{ color: "orange" }}>
            <MyButton />
        </MyTheme>
    </>
);"/></pre><h2>Title 2</h2>
<p>content 4...</p>
`;function Qt(){return D`<host>
		<link
			rel="stylesheet"
			href="http://markdowncss.github.io/splendor/css/splendor.css"
		/>
		${Wt}
	</host>`}const Xt=C(Qt);customElements.define("a-button",Xt);console.log(tt`:host{--background: var(--my-component--background) }:host{background:var(--background)}/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */html{line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0}main{display:block}h1{font-size:2em;margin:.67em 0}hr{box-sizing:content-box;height:0;overflow:visible}pre{font-family:monospace,monospace;font-size:1em}a{background-color:transparent}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}img{border-style:none}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,input{overflow:visible}button,select{text-transform:none}button,[type=button],[type=reset],[type=submit]{-webkit-appearance:button}button::-moz-focus-inner,[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner{border-style:none;padding:0}button:-moz-focusring,[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:.35em .75em .625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{vertical-align:baseline}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details{display:block}summary{display:list-item}template{display:none}[hidden]{display:none}`);export{Ut as B,Lt as F,lt as I,ee as a,ft as b,te as c,Vt as d,gt as e,C as f,se as g,y as h,S as i,H as j,ut as u};
