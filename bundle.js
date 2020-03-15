!function(){function t(){}function e(t){return t()}function n(){return Object.create(null)}function o(t){t.forEach(e)}function r(t){return"function"===typeof t}function c(t,e){return t!=t?e==e:t!==e||t&&"object"===typeof t||"function"===typeof t}function i(t,e,n,o){return t[1]&&o?function(t,e){for(const n in e)t[n]=e[n];return t}(n.ctx.slice(),t[1](o(e))):n.ctx}function s(t,e){t.appendChild(e)}function u(t,e,n){t.insertBefore(e,n||null)}function a(t){t.parentNode.removeChild(t)}function l(t){return document.createElement(t)}function f(t){return document.createTextNode(t)}function d(){return f(" ")}function p(){return f("")}function $(t,e,n,o){return t.addEventListener(e,n,o),()=>t.removeEventListener(e,n,o)}function m(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function h(t,e){(null!=e||t.value)&&(t.value=e)}let g;function y(t){g=t}function x(){if(!g)throw Error("Function called outside component initialization");return g}const b=[],v=[],E=[],_=[],k=Promise.resolve();let w=!1;function C(){w||(w=!0,k.then(j))}function S(t){E.push(t)}let M=!1;const N=new Set;function j(){if(!M){M=!0;do{for(let t=0;t<b.length;t+=1){const e=b[t];y(e),A(e.$$)}for(b.length=0;v.length;)v.pop()();for(let t=0;t<E.length;t+=1){const e=E[t];N.has(e)||(N.add(e),e())}E.length=0}while(b.length);for(;_.length;)_.pop()();w=!1,M=!1,N.clear()}}function A(t){if(null!==t.fragment){t.update(),o(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(S)}}const O=new Set;let U;function q(){U={r:0,c:[],p:U}}function z(){U.r||o(U.c),U=U.p}function B(t,e){t&&t.i&&(O.delete(t),t.i(e))}function D(t,e,n,o){if(t&&t.o){if(O.has(t))return;O.add(t),U.c.push(()=>{O.delete(t),o&&(n&&t.d(1),o())}),t.o(e)}}function I(t,e){D(t,1,1,()=>{e.delete(t.key)})}function L(t){t&&t.c()}function T(t,n,c){const{fragment:i,on_mount:s,on_destroy:u,after_update:a}=t.$$;i&&i.m(n,c),S(()=>{const n=s.map(e).filter(r);u?u.push(...n):o(n),t.$$.on_mount=[]}),a.forEach(S)}function F(t,e){const n=t.$$;null!==n.fragment&&(o(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function P(e,r,c,i,s,u,a=[-1]){const l=g;y(e);const f=r.props||{},d=e.$$={fragment:null,ctx:null,props:u,update:t,not_equal:s,bound:n(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(l?l.$$.context:[]),callbacks:n(),dirty:a};let p=!1;d.ctx=c?c(e,f,(t,n,...o)=>{const r=o.length?o[0]:n;return d.ctx&&s(d.ctx[t],d.ctx[t]=r)&&(d.bound[t]&&d.bound[t](r),p&&function(t,e){-1===t.$$.dirty[0]&&(b.push(t),C(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}(e,t)),n}):[],d.update(),p=!0,o(d.before_update),d.fragment=!!i&&i(d.ctx),r.target&&(r.hydrate?d.fragment&&d.fragment.l(function(t){return Array.from(t.childNodes)}(r.target)):d.fragment&&d.fragment.c(),r.intro&&B(e.$$.fragment),T(e,r.target,r.anchor),j()),y(l)}class Y{$destroy(){F(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(){}}var G,H=(G=Object.freeze({__proto__:null,SvelteComponent:class extends Y{constructor(t){if(!t||!t.target&&!t.$$inline)throw Error("'target' is a required option");super()}$destroy(){super.$destroy(),this.$destroy=()=>{}}$capture_state(){}$inject_state(){}},afterUpdate(t){x().$$.after_update.push(t)},beforeUpdate(t){x().$$.before_update.push(t)},createEventDispatcher(){const t=x();return(e,n)=>{const o=t.$$.callbacks[e];if(o){const r=function(t,e){const n=document.createEvent("CustomEvent");return n.initCustomEvent(t,!1,!1,e),n}(e,n);o.slice().forEach(e=>{e.call(t,r)})}}},getContext(t){return x().$$.context.get(t)},onDestroy(t){x().$$.on_destroy.push(t)},onMount(t){x().$$.on_mount.push(t)},setContext(t,e){x().$$.context.set(t,e)},tick(){return C(),k}}))&&G.default||G;let{getContext:J,setContext:K}=H;const Q="undefined"!==typeof Symbol?Symbol("storeon"):"@@storeon";for(var R=function(...t){let e=J(Q),n={};e.on("@changed",(e,o)=>{t.forEach(t=>{o[t]&&n[t]&&n[t](o[t])})});let o={};return t.forEach(t=>{o[t]=(t=>({subscribe(o){let r=e.get();return n[t]=o,o(r[t]),()=>{delete n[t]}}}))(t)}),o.dispatch=e.dispatch,o},V="-_",W=36;W--;)V+=W.toString(36);for(W=36;W---10;)V+=W.toString(36).toUpperCase();var X=function(t){var e="";for(W=t||21;W--;)e+=V[64*Math.random()|0];return e};const Z=t=>({id:X(16),text:t,isEdit:!1}),tt=(t=>{let e={},n={},o={dispatch(t,r){if("@dispatch"!==t&&o.dispatch("@dispatch",[t,r,e[t]]),e[t]){let c,i={};e[t].forEach(t=>{let e=t(n,r);e&&"function"!==typeof e.then&&(c=n={...n,...e},i={...i,...e})}),c&&o.dispatch("@changed",i)}},get(){return n},on:(t,n)=>((e[t]||(e[t]=[])).push(n),()=>{e[t]=e[t].filter(t=>t!==n)})};return t.forEach(t=>{t&&t(o)}),o.dispatch("@init"),o})([({dispatch:t,on:e})=>{e("@init",()=>({items:[]})),e("items/add",({items:t},e)=>({items:[Z(e),...t]})),e("items/remove",({items:t},e)=>({items:t.filter(t=>t.id!==e)})),e("items/@change",({items:t},{id:e,...n})=>{const o=t.findIndex(t=>t.id===e),r={...t[o],...n};return t.splice(o,1,r),{items:[...t]}}),e("items/openEdit",(e,n)=>{t("items/@change",{id:n,isEdit:!0})}),e("items/closeEdit",(e,n)=>{t("items/@change",{id:n,isEdit:!1})}),e("items/update",(e,{id:n,text:o})=>{t("items/@change",{id:n,text:o,isEdit:!1})})},!1]);function et(e){let n,r;return{c(){n=l("input"),m(n,"type","text")},m(t,o){u(t,n,o),h(n,e[0]),r=[$(n,"input",e[3]),$(n,"keypress",e[1])]},p(t,[e]){1&e&&n.value!==t[0]&&h(n,t[0])},i:t,o:t,d(t){t&&a(n),o(r)}}}function nt(t,e,n){let o="";const{dispatch:r}=R();return[o,({keyCode:t})=>{13===t&&""!==o.trim()&&(r("items/add",o),n(0,o=""))},r,function(){o=this.value,n(0,o)}]}class ot extends Y{constructor(t){super(),P(this,t,nt,et,c,{})}}function rt(e){let n;return{c(){n=l("p"),n.textContent="You don't have any tasks"},m(t,e){u(t,n,e)},p:t,i:t,o:t,d(t){t&&a(n)}}}class ct extends Y{constructor(t){super(),P(this,t,null,rt,c,{})}}function it(t){let e,n,o;const c=t[2].default,s=function(t,e,n,o){if(t){const o=i(t,e,n,null);return t[0](o)}}(c,t,t[1]);return{c(){e=l("button"),s&&s.c(),m(e,"type","button"),m(e,"class","svelte-cwlwa5")},m(c,i){u(c,e,i),s&&s.m(e,null),n=!0,o=$(e,"click",(function(){r(t[0])&&t[0].apply(this,arguments)}))},p(e,[n]){t=e,s&&s.p&&2&n&&s.p(i(c,t,t[1],null),t[1].dirty)},i(t){n||(B(s,t),n=!0)},o(t){D(s,t),n=!1},d(t){t&&a(e),s&&s.d(t),o()}}}function st(t,e,n){let{onClick:o}=e,{$$slots:r={},$$scope:c}=e;return t.$set=t=>{"onClick"in t&&n(0,o=t.onClick),"$$scope"in t&&n(1,c=t.$$scope)},[o,c,r]}class ut extends Y{constructor(t){super(),P(this,t,st,it,c,{onClick:0})}}function at(t){let e,n,o,r,c,i,p=t[0].text+"";const $=new ut({props:{onClick:t[1],$$slots:{default:[ft]},$$scope:{ctx:t}}}),m=new ut({props:{onClick:t[3],$$slots:{default:[dt]},$$scope:{ctx:t}}});return{c(){e=l("li"),n=l("span"),o=f(p),r=d(),L($.$$.fragment),c=d(),L(m.$$.fragment)},m(t,a){u(t,e,a),s(e,n),s(n,o),s(e,r),T($,e,null),s(e,c),T(m,e,null),i=!0},p(t,e){(!i||1&e)&&p!==(p=t[0].text+"")&&function(t,e){t.data!==(e=""+e)&&(t.data=e)}(o,p);const n={};128&e&&(n.$$scope={dirty:e,ctx:t}),$.$set(n);const r={};128&e&&(r.$$scope={dirty:e,ctx:t}),m.$set(r)},i(t){i||(B($.$$.fragment,t),B(m.$$.fragment,t),i=!0)},o(t){D($.$$.fragment,t),D(m.$$.fragment,t),i=!1},d(t){t&&a(e),F($),F(m)}}}function lt(e){let n,c,i,s;return{c(){n=l("input"),m(n,"type","text"),n.value=c=e[0].text},m(o,c){var a;u(o,n,c),s=[$(n,"keypress",e[4]),$(n,"blur",e[2]),(a=i=e[5].call(null,n),a&&r(a.destroy)?a.destroy:t)]},p(t,e){1&e&&c!==(c=t[0].text)&&n.value!==c&&(n.value=c)},i:t,o:t,d(t){t&&a(n),o(s)}}}function ft(t){let e;return{c(){e=f("edit")},m(t,n){u(t,e,n)},d(t){t&&a(e)}}}function dt(t){let e;return{c(){e=f("remove")},m(t,n){u(t,e,n)},d(t){t&&a(e)}}}function pt(t){let e,n,o,r;const c=[lt,at],i=[];function s(t,e){return t[0].isEdit?0:1}return e=s(t),n=i[e]=c[e](t),{c(){n.c(),o=p()},m(t,n){i[e].m(t,n),u(t,o,n),r=!0},p(t,[r]){let u=e;e=s(t),e===u?i[e].p(t,r):(q(),D(i[u],1,1,()=>{i[u]=null}),z(),n=i[e],n||(n=i[e]=c[e](t),n.c()),B(n,1),n.m(o.parentNode,o))},i(t){r||(B(n),r=!0)},o(t){D(n),r=!1},d(t){i[e].d(t),t&&a(o)}}}function $t(t,e,n){let{data:o}=e,{dispatch:r}=e;return t.$set=t=>{"data"in t&&n(0,o=t.data),"dispatch"in t&&n(6,r=t.dispatch)},[o,()=>{r("items/openEdit",o.id)},()=>{r("items/closeEdit",o.id)},()=>{r("items/remove",o.id)},({keyCode:t,target:e})=>{13===t&&""!==e.value.trim()&&r("items/update",{id:o.id,text:e.value})},t=>{t.focus()},r]}class mt extends Y{constructor(t){super(),P(this,t,$t,pt,c,{data:0,dispatch:6})}}function ht(t,e,n){const o=t.slice();return o[3]=e[n],o}function gt(e){let n;const o=new ct({});return{c(){L(o.$$.fragment)},m(t,e){T(o,t,e),n=!0},p:t,i(t){n||(B(o.$$.fragment,t),n=!0)},o(t){D(o.$$.fragment,t),n=!1},d(t){F(o,t)}}}function yt(t){let e,n,o=[],r=new Map,c=t[0];const i=t=>t[3].id;for(let e=0;e<c.length;e+=1){let n=ht(t,c,e),s=i(n);r.set(s,o[e]=xt(s,n))}return{c(){for(let t=0;t<o.length;t+=1)o[t].c();e=p()},m(t,r){for(let e=0;e<o.length;e+=1)o[e].m(t,r);u(t,e,r),n=!0},p(t,n){if(5&n){const c=t[0];q(),o=function(t,e,n,o,r,c,i,s,u,a,l,f){let d=t.length,p=c.length,$=d;const m={};for(;$--;)m[t[$].key]=$;const h=[],g=new Map,y=new Map;for($=p;$--;){const t=f(r,c,$),o=n(t);let s=i.get(o);s?s.p(t,e):(s=a(o,t),s.c()),g.set(o,h[$]=s),o in m&&y.set(o,Math.abs($-m[o]))}const x=new Set,b=new Set;function v(t){B(t,1),t.m(s,l),i.set(t.key,t),l=t.first,p--}for(;d&&p;){const e=h[p-1],n=t[d-1],o=e.key,r=n.key;e===n?(l=e.first,d--,p--):g.has(r)?!i.has(o)||x.has(o)?v(e):b.has(r)?d--:y.get(o)>y.get(r)?(b.add(o),v(e)):(x.add(r),d--):(u(n,i),d--)}for(;d--;){const e=t[d];g.has(e.key)||u(e,i)}for(;p;)v(h[p-1]);return h}(o,n,i,0,t,c,r,e.parentNode,I,xt,e,ht),z()}},i(t){if(!n){for(let t=0;t<c.length;t+=1)B(o[t]);n=!0}},o(t){for(let t=0;t<o.length;t+=1)D(o[t]);n=!1},d(t){for(let e=0;e<o.length;e+=1)o[e].d(t);t&&a(e)}}}function xt(t,e){let n,o;const r=new mt({props:{data:e[3],dispatch:e[2]}});return{key:t,first:null,c(){n=p(),L(r.$$.fragment),this.first=n},m(t,e){u(t,n,e),T(r,t,e),o=!0},p(t,e){const n={};1&e&&(n.data=t[3]),r.$set(n)},i(t){o||(B(r.$$.fragment,t),o=!0)},o(t){D(r.$$.fragment,t),o=!1},d(t){t&&a(n),F(r,t)}}}function bt(t){let e,n,o,r;const c=[yt,gt],i=[];function s(t,e){return t[0].length>0?0:1}return n=s(t),o=i[n]=c[n](t),{c(){e=l("ul"),o.c()},m(t,o){u(t,e,o),i[n].m(e,null),r=!0},p(t,[r]){let u=n;n=s(t),n===u?i[n].p(t,r):(q(),D(i[u],1,1,()=>{i[u]=null}),z(),o=i[n],o||(o=i[n]=c[n](t),o.c()),B(o,1),o.m(e,null))},i(t){r||(B(o),r=!0)},o(t){D(o),r=!1},d(t){t&&a(e),i[n].d()}}}function vt(e,n,o){let r;const{items:c,dispatch:i}=R("items");return function(e,n,c){e.$$.on_destroy.push(function(e,...n){if(null==e)return t;const o=e.subscribe(...n);return o.unsubscribe?()=>o.unsubscribe():o}(n,t=>o(0,r=t)))}(e,c),[r,c,i]}class Et extends Y{constructor(t){super(),P(this,t,vt,bt,c,{})}}function _t(e){let n,o,r,c,i;const f=new ot({}),p=new Et({});return{c(){n=l("main"),o=l("h1"),o.textContent="Todo",r=d(),L(f.$$.fragment),c=d(),L(p.$$.fragment),m(n,"class","main svelte-f9kgaf")},m(t,e){u(t,n,e),s(n,o),s(n,r),T(f,n,null),s(n,c),T(p,n,null),i=!0},p:t,i(t){i||(B(f.$$.fragment,t),B(p.$$.fragment,t),i=!0)},o(t){D(f.$$.fragment,t),D(p.$$.fragment,t),i=!1},d(t){t&&a(n),F(f),F(p)}}}function kt(t){return function(t){K(Q,t)}(tt),[]}new class extends Y{constructor(t){super(),P(this,t,kt,_t,c,{})}}({target:document.getElementById("root")})}();