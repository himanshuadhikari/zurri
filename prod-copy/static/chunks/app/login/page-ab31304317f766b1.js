(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[626],{4931:function(e,t,r){Promise.resolve().then(r.bind(r,4925))},4925:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return m}});var a=r(7437),s=r(2265),o=r(1396),i=r.n(o),n=r(4033),l=r(1543),c=r(9367),d=r(5925),u=r(6251);function m(){let[e,t]=(0,s.useState)(""),[r,o]=(0,s.useState)(""),[m,p]=(0,s.useState)(!1),[f,g]=(0,s.useState)(!1),h=(0,n.useRouter)(),{login:y}=(0,u.t)(),b=async t=>{t.preventDefault(),g(!0);try{let t=await y(e,r);t?(d.ZP.success("Login successful!"),h.push("/")):d.ZP.error("Login failed")}catch(e){d.ZP.error("An error occurred. Please try again.")}finally{g(!1)}};return(0,a.jsx)("div",{className:"min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8",children:(0,a.jsxs)("div",{className:"max-w-md w-full space-y-8",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("h2",{className:"mt-6 text-center text-3xl font-extrabold text-gray-900",children:"Sign in to your account"}),(0,a.jsxs)("p",{className:"mt-2 text-center text-sm text-gray-600",children:["Or"," ",(0,a.jsx)(i(),{href:"/register",className:"font-medium text-blue-600 hover:text-blue-500",children:"create a new account"})]})]}),(0,a.jsxs)("form",{className:"mt-8 space-y-6",onSubmit:b,children:[(0,a.jsxs)("div",{className:"rounded-md shadow-sm space-y-4",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{htmlFor:"email",className:"block text-sm font-medium text-gray-700",children:"Email address"}),(0,a.jsx)("input",{id:"email",name:"email",type:"email",autoComplete:"email",required:!0,value:e,onChange:e=>t(e.target.value),className:"mt-1 appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm",placeholder:"Enter your email"})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{htmlFor:"password",className:"block text-sm font-medium text-gray-700",children:"Password"}),(0,a.jsxs)("div",{className:"mt-1 relative",children:[(0,a.jsx)("input",{id:"password",name:"password",type:m?"text":"password",autoComplete:"current-password",required:!0,value:r,onChange:e=>o(e.target.value),className:"appearance-none relative block w-full px-3 py-3 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm",placeholder:"Enter your password"}),(0,a.jsx)("button",{type:"button",className:"absolute inset-y-0 right-0 pr-3 flex items-center",onClick:()=>p(!m),children:m?(0,a.jsx)(l.Z,{className:"h-5 w-5 text-gray-400"}):(0,a.jsx)(c.Z,{className:"h-5 w-5 text-gray-400"})})]})]})]}),(0,a.jsxs)("div",{className:"flex items-center justify-between",children:[(0,a.jsxs)("div",{className:"flex items-center",children:[(0,a.jsx)("input",{id:"remember-me",name:"remember-me",type:"checkbox",className:"h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"}),(0,a.jsx)("label",{htmlFor:"remember-me",className:"ml-2 block text-sm text-gray-900",children:"Remember me"})]}),(0,a.jsx)("div",{className:"text-sm",children:(0,a.jsx)("a",{href:"/forgot-password",className:"font-medium text-blue-600 hover:text-blue-500",children:"Forgot your password?"})})]}),(0,a.jsx)("div",{children:(0,a.jsx)("button",{type:"submit",disabled:f,className:"group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200",children:f?"Signing in...":"Sign in"})})]})]})})}},6251:function(e,t,r){"use strict";r.d(t,{t:function(){return o}});var a=r(9115),s=r(4810);let o=(0,a.U)()((0,s.tJ)((e,t)=>({user:null,loading:!0,getUser:()=>{var e;return null===(e=t())||void 0===e?void 0:e.user},setUser:t=>e({user:t}),setLoading:t=>e({loading:t}),checkAuth:async()=>{try{e({loading:!0});let t=await fetch("/api/auth/me");if(t.ok){let r=await t.json();e({user:r,loading:!1})}else e({user:null,loading:!1})}catch(t){console.error("Auth check failed:",t),e({user:null,loading:!1})}},login:async(t,r)=>{try{let s=await fetch("/api/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:t,password:r})});if(s.ok){var a;let t=await s.json();return e({user:null==t?void 0:null===(a=t.data)||void 0===a?void 0:a.user}),!0}return!1}catch(e){return console.error("Login failed:",e),!1}},register:async(t,r,a)=>{try{let s=await fetch("/api/auth/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:t,email:r,password:a})});if(s.ok){let t=await s.json();return e({user:t.user}),!0}return!1}catch(e){return console.error("Registration failed:",e),!1}},logout:async()=>{try{await fetch("/api/auth/logout",{method:"POST"})}catch(e){console.error("Logout failed:",e)}finally{e({user:null})}},resetPassword:async e=>{try{console.log("resetPassword called with emai =======",e)}catch(e){throw console.error("Password reset error:",e),e}}}),{name:"auth-storage",partialize:e=>({user:e.user})}))},4033:function(e,t,r){e.exports=r(290)},9367:function(e,t,r){"use strict";var a=r(2265);let s=a.forwardRef(function({title:e,titleId:t,...r},s){return a.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:s,"aria-labelledby":t},r),e?a.createElement("title",{id:t},e):null,a.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"}),a.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"}))});t.Z=s},1543:function(e,t,r){"use strict";var a=r(2265);let s=a.forwardRef(function({title:e,titleId:t,...r},s){return a.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:s,"aria-labelledby":t},r),e?a.createElement("title",{id:t},e):null,a.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"}))});t.Z=s},5925:function(e,t,r){"use strict";let a,s;r.d(t,{x7:function(){return es},ZP:function(){return eo},Am:function(){return A}});var o,i=r(2265);let n={data:""},l=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||n,c=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,d=/\/\*[^]*?\*\/|  +/g,u=/\n+/g,m=(e,t)=>{let r="",a="",s="";for(let o in e){let i=e[o];"@"==o[0]?"i"==o[1]?r=o+" "+i+";":a+="f"==o[1]?m(i,o):o+"{"+m(i,"k"==o[1]?"":t)+"}":"object"==typeof i?a+=m(i,t?t.replace(/([^,])+/g,e=>o.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):o):null!=i&&(o=/^--/.test(o)?o:o.replace(/[A-Z]/g,"-$&").toLowerCase(),s+=m.p?m.p(o,i):o+":"+i+";")}return r+(t&&s?t+"{"+s+"}":s)+a},p={},f=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+f(e[r]);return t}return e},g=(e,t,r,a,s)=>{var o;let i=f(e),n=p[i]||(p[i]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(i));if(!p[n]){let t=i!==e?e:(e=>{let t,r,a=[{}];for(;t=c.exec(e.replace(d,""));)t[4]?a.shift():t[3]?(r=t[3].replace(u," ").trim(),a.unshift(a[0][r]=a[0][r]||{})):a[0][t[1]]=t[2].replace(u," ").trim();return a[0]})(e);p[n]=m(s?{["@keyframes "+n]:t}:t,r?"":"."+n)}let l=r&&p.g?p.g:null;return r&&(p.g=p[n]),o=p[n],l?t.data=t.data.replace(l,o):-1===t.data.indexOf(o)&&(t.data=a?o+t.data:t.data+o),n},h=(e,t,r)=>e.reduce((e,a,s)=>{let o=t[s];if(o&&o.call){let e=o(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;o=t?"."+t:e&&"object"==typeof e?e.props?"":m(e,""):!1===e?"":e}return e+a+(null==o?"":o)},"");function y(e){let t=this||{},r=e.call?e(t.p):e;return g(r.unshift?r.raw?h(r,[].slice.call(arguments,1),t.p):r.reduce((e,r)=>Object.assign(e,r&&r.call?r(t.p):r),{}):r,l(t.target),t.g,t.o,t.k)}y.bind({g:1});let b,v,x,w=y.bind({k:1});function j(e,t){let r=this||{};return function(){let a=arguments;function s(o,i){let n=Object.assign({},o),l=n.className||s.className;r.p=Object.assign({theme:v&&v()},n),r.o=/ *go\d+/.test(l),n.className=y.apply(r,a)+(l?" "+l:""),t&&(n.ref=i);let c=e;return e[0]&&(c=n.as||e,delete n.as),x&&c[0]&&x(n),b(c,n)}return t?t(s):s}}var k=e=>"function"==typeof e,E=(e,t)=>k(e)?e(t):e,N=(a=0,()=>(++a).toString()),S=()=>{if(void 0===s&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");s=!e||e.matches}return s},O=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,20)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return O(e,{type:e.toasts.find(e=>e.id===r.id)?1:0,toast:r});case 3:let{toastId:a}=t;return{...e,toasts:e.toasts.map(e=>e.id===a||void 0===a?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let s=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+s}))}}},C=[],P={toasts:[],pausedAt:void 0},I=e=>{P=O(P,e),C.forEach(e=>{e(P)})},$={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},L=(e={})=>{let[t,r]=(0,i.useState)(P),a=(0,i.useRef)(P);(0,i.useEffect)(()=>(a.current!==P&&r(P),C.push(r),()=>{let e=C.indexOf(r);e>-1&&C.splice(e,1)}),[]);let s=t.toasts.map(t=>{var r,a,s;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||$[t.type],style:{...e.style,...null==(s=e[t.type])?void 0:s.style,...t.style}}});return{...t,toasts:s}},z=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||N()}),D=e=>(t,r)=>{let a=z(t,e,r);return I({type:2,toast:a}),a.id},A=(e,t)=>D("blank")(e,t);A.error=D("error"),A.success=D("success"),A.loading=D("loading"),A.custom=D("custom"),A.dismiss=e=>{I({type:3,toastId:e})},A.remove=e=>I({type:4,toastId:e}),A.promise=(e,t,r)=>{let a=A.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let s=t.success?E(t.success,e):void 0;return s?A.success(s,{id:a,...r,...null==r?void 0:r.success}):A.dismiss(a),e}).catch(e=>{let s=t.error?E(t.error,e):void 0;s?A.error(s,{id:a,...r,...null==r?void 0:r.error}):A.dismiss(a)}),e};var M=(e,t)=>{I({type:1,toast:{id:e,height:t}})},T=()=>{I({type:5,time:Date.now()})},Z=new Map,_=1e3,F=(e,t=_)=>{if(Z.has(e))return;let r=setTimeout(()=>{Z.delete(e),I({type:4,toastId:e})},t);Z.set(e,r)},H=e=>{let{toasts:t,pausedAt:r}=L(e);(0,i.useEffect)(()=>{if(r)return;let e=Date.now(),a=t.map(t=>{if(t.duration===1/0)return;let r=(t.duration||0)+t.pauseDuration-(e-t.createdAt);if(r<0){t.visible&&A.dismiss(t.id);return}return setTimeout(()=>A.dismiss(t.id),r)});return()=>{a.forEach(e=>e&&clearTimeout(e))}},[t,r]);let a=(0,i.useCallback)(()=>{r&&I({type:6,time:Date.now()})},[r]),s=(0,i.useCallback)((e,r)=>{let{reverseOrder:a=!1,gutter:s=8,defaultPosition:o}=r||{},i=t.filter(t=>(t.position||o)===(e.position||o)&&t.height),n=i.findIndex(t=>t.id===e.id),l=i.filter((e,t)=>t<n&&e.visible).length;return i.filter(e=>e.visible).slice(...a?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+s,0)},[t]);return(0,i.useEffect)(()=>{t.forEach(e=>{if(e.dismissed)F(e.id,e.removeDelay);else{let t=Z.get(e.id);t&&(clearTimeout(t),Z.delete(e.id))}})},[t]),{toasts:t,handlers:{updateHeight:M,startPause:T,endPause:a,calculateOffset:s}}},R=j("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${w`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${w`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${w`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,U=j("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${w`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`} 1s linear infinite;
`,J=j("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${w`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${w`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,q=j("div")`
  position: absolute;
`,B=j("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,W=j("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${w`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,V=({toast:e})=>{let{icon:t,type:r,iconTheme:a}=e;return void 0!==t?"string"==typeof t?i.createElement(W,null,t):t:"blank"===r?null:i.createElement(B,null,i.createElement(U,{...a}),"loading"!==r&&i.createElement(q,null,"error"===r?i.createElement(R,{...a}):i.createElement(J,{...a})))},Y=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,G=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,K=j("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,Q=j("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,X=(e,t)=>{let r=e.includes("top")?1:-1,[a,s]=S()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[Y(r),G(r)];return{animation:t?`${w(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${w(s)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},ee=i.memo(({toast:e,position:t,style:r,children:a})=>{let s=e.height?X(e.position||t||"top-center",e.visible):{opacity:0},o=i.createElement(V,{toast:e}),n=i.createElement(Q,{...e.ariaProps},E(e.message,e));return i.createElement(K,{className:e.className,style:{...s,...r,...e.style}},"function"==typeof a?a({icon:o,message:n}):i.createElement(i.Fragment,null,o,n))});o=i.createElement,m.p=void 0,b=o,v=void 0,x=void 0;var et=({id:e,className:t,style:r,onHeightUpdate:a,children:s})=>{let o=i.useCallback(t=>{if(t){let r=()=>{a(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return i.createElement("div",{ref:o,className:t,style:r},s)},er=(e,t)=>{let r=e.includes("top"),a=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:S()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(r?1:-1)}px)`,...r?{top:0}:{bottom:0},...a}},ea=y`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,es=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:a,children:s,containerStyle:o,containerClassName:n})=>{let{toasts:l,handlers:c}=H(r);return i.createElement("div",{id:"_rht_toaster",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...o},className:n,onMouseEnter:c.startPause,onMouseLeave:c.endPause},l.map(r=>{let o=r.position||t,n=er(o,c.calculateOffset(r,{reverseOrder:e,gutter:a,defaultPosition:t}));return i.createElement(et,{id:r.id,key:r.id,onHeightUpdate:c.updateHeight,className:r.visible?ea:"",style:n},"custom"===r.type?E(r.message,r):s?s(r):i.createElement(ee,{toast:r,position:o}))}))},eo=A},4810:function(e,t,r){"use strict";r.d(t,{tJ:function(){return s}});let a=e=>t=>{try{let r=e(t);if(r instanceof Promise)return r;return{then:e=>a(e)(r),catch(e){return this}}}catch(e){return{then(e){return this},catch:t=>a(t)(e)}}},s=(e,t)=>(r,s,o)=>{let i,n={storage:function(e,t){let r;try{r=e()}catch(e){return}return{getItem:e=>{var a;let s=e=>null===e?null:JSON.parse(e,null==t?void 0:t.reviver),o=null!=(a=r.getItem(e))?a:null;return o instanceof Promise?o.then(s):s(o)},setItem:(e,a)=>r.setItem(e,JSON.stringify(a,null==t?void 0:t.replacer)),removeItem:e=>r.removeItem(e)}}(()=>localStorage),partialize:e=>e,version:0,merge:(e,t)=>({...t,...e}),...t},l=!1,c=new Set,d=new Set,u=n.storage;if(!u)return e((...e)=>{console.warn(`[zustand persist middleware] Unable to update item '${n.name}', the given storage is currently unavailable.`),r(...e)},s,o);let m=()=>{let e=n.partialize({...s()});return u.setItem(n.name,{state:e,version:n.version})},p=o.setState;o.setState=(e,t)=>{p(e,t),m()};let f=e((...e)=>{r(...e),m()},s,o);o.getInitialState=()=>f;let g=()=>{var e,t;if(!u)return;l=!1,c.forEach(e=>{var t;return e(null!=(t=s())?t:f)});let o=(null==(t=n.onRehydrateStorage)?void 0:t.call(n,null!=(e=s())?e:f))||void 0;return a(u.getItem.bind(u))(n.name).then(e=>{if(e){if("number"!=typeof e.version||e.version===n.version)return[!1,e.state];if(n.migrate){let t=n.migrate(e.state,e.version);return t instanceof Promise?t.then(e=>[!0,e]):[!0,t]}console.error("State loaded from storage couldn't be migrated since no migrate function was provided")}return[!1,void 0]}).then(e=>{var t;let[a,o]=e;if(r(i=n.merge(o,null!=(t=s())?t:f),!0),a)return m()}).then(()=>{null==o||o(i,void 0),i=s(),l=!0,d.forEach(e=>e(i))}).catch(e=>{null==o||o(void 0,e)})};return o.persist={setOptions:e=>{n={...n,...e},e.storage&&(u=e.storage)},clearStorage:()=>{null==u||u.removeItem(n.name)},getOptions:()=>n,rehydrate:()=>g(),hasHydrated:()=>l,onHydrate:e=>(c.add(e),()=>{c.delete(e)}),onFinishHydration:e=>(d.add(e),()=>{d.delete(e)})},n.skipHydration||g(),i||f}},9115:function(e,t,r){"use strict";r.d(t,{U:function(){return l}});var a=r(2265);let s=e=>{let t;let r=new Set,a=(e,a)=>{let s="function"==typeof e?e(t):e;if(!Object.is(s,t)){let e=t;t=(null!=a?a:"object"!=typeof s||null===s)?s:Object.assign({},t,s),r.forEach(r=>r(t,e))}},s=()=>t,o={setState:a,getState:s,getInitialState:()=>i,subscribe:e=>(r.add(e),()=>r.delete(e))},i=t=e(a,s,o);return o},o=e=>e?s(e):s,i=e=>e,n=e=>{let t=o(e),r=e=>(function(e,t=i){let r=a.useSyncExternalStore(e.subscribe,()=>t(e.getState()),()=>t(e.getInitialState()));return a.useDebugValue(r),r})(t,e);return Object.assign(r,t),r},l=e=>e?n(e):n}},function(e){e.O(0,[176,971,864,744],function(){return e(e.s=4931)}),_N_E=e.O()}]);