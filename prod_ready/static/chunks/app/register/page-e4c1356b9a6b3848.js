(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[11],{3392:function(e,t,r){Promise.resolve().then(r.bind(r,6099))},6099:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return u}});var a=r(7437),s=r(2265),o=r(1396),i=r.n(o),n=r(4033),l=r(1543),c=r(9367),d=r(5925);function u(){let[e,t]=(0,s.useState)({firstName:"",lastName:"",email:"",phone:"",password:"",confirmPassword:""}),[r,o]=(0,s.useState)(!1),[u,m]=(0,s.useState)(!1),[p,f]=(0,s.useState)(!1),h=(0,n.useRouter)(),g=r=>{t({...e,[r.target.name]:r.target.value})},x=async t=>{if(t.preventDefault(),e.password!==e.confirmPassword){d.ZP.error("Passwords do not match");return}if(e.password.length<6){d.ZP.error("Password must be at least 6 characters");return}f(!0);try{let t=await fetch("/api/auth/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({firstName:e.firstName,lastName:e.lastName,email:e.email,phone:e.phone,password:e.password})}),r=await t.json();r.success?(d.ZP.success("Account created successfully!"),h.push("/login")):d.ZP.error(r.error||"Registration failed")}catch(e){d.ZP.error("An error occurred. Please try again.")}finally{f(!1)}};return(0,a.jsx)("div",{className:"min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8",children:(0,a.jsxs)("div",{className:"max-w-md w-full space-y-8",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("h2",{className:"mt-6 text-center text-3xl font-extrabold text-gray-900",children:"Create your account"}),(0,a.jsxs)("p",{className:"mt-2 text-center text-sm text-gray-600",children:["Or"," ",(0,a.jsx)(i(),{href:"/login",className:"font-medium text-blue-600 hover:text-blue-500",children:"sign in to your existing account"})]})]}),(0,a.jsxs)("form",{className:"mt-8 space-y-6",onSubmit:x,children:[(0,a.jsxs)("div",{className:"space-y-4",children:[(0,a.jsxs)("div",{className:"grid grid-cols-2 gap-4",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{htmlFor:"firstName",className:"block text-sm font-medium text-gray-700",children:"First Name"}),(0,a.jsx)("input",{id:"firstName",name:"firstName",type:"text",required:!0,value:e.firstName,onChange:g,className:"mt-1 appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm",placeholder:"First name"})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{htmlFor:"lastName",className:"block text-sm font-medium text-gray-700",children:"Last Name"}),(0,a.jsx)("input",{id:"lastName",name:"lastName",type:"text",required:!0,value:e.lastName,onChange:g,className:"mt-1 appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm",placeholder:"Last name"})]})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{htmlFor:"email",className:"block text-sm font-medium text-gray-700",children:"Email address"}),(0,a.jsx)("input",{id:"email",name:"email",type:"email",autoComplete:"email",required:!0,value:e.email,onChange:g,className:"mt-1 appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm",placeholder:"Enter your email"})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{htmlFor:"phone",className:"block text-sm font-medium text-gray-700",children:"Phone Number (Optional)"}),(0,a.jsx)("input",{id:"phone",name:"phone",type:"tel",value:e.phone,onChange:g,className:"mt-1 appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm",placeholder:"Enter your phone number"})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{htmlFor:"password",className:"block text-sm font-medium text-gray-700",children:"Password"}),(0,a.jsxs)("div",{className:"mt-1 relative",children:[(0,a.jsx)("input",{id:"password",name:"password",type:r?"text":"password",required:!0,value:e.password,onChange:g,className:"appearance-none relative block w-full px-3 py-3 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm",placeholder:"Create a password"}),(0,a.jsx)("button",{type:"button",className:"absolute inset-y-0 right-0 pr-3 flex items-center",onClick:()=>o(!r),children:r?(0,a.jsx)(l.Z,{className:"h-5 w-5 text-gray-400"}):(0,a.jsx)(c.Z,{className:"h-5 w-5 text-gray-400"})})]})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{htmlFor:"confirmPassword",className:"block text-sm font-medium text-gray-700",children:"Confirm Password"}),(0,a.jsxs)("div",{className:"mt-1 relative",children:[(0,a.jsx)("input",{id:"confirmPassword",name:"confirmPassword",type:u?"text":"password",required:!0,value:e.confirmPassword,onChange:g,className:"appearance-none relative block w-full px-3 py-3 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm",placeholder:"Confirm your password"}),(0,a.jsx)("button",{type:"button",className:"absolute inset-y-0 right-0 pr-3 flex items-center",onClick:()=>m(!u),children:u?(0,a.jsx)(l.Z,{className:"h-5 w-5 text-gray-400"}):(0,a.jsx)(c.Z,{className:"h-5 w-5 text-gray-400"})})]})]})]}),(0,a.jsxs)("div",{className:"flex items-center",children:[(0,a.jsx)("input",{id:"agree-terms",name:"agree-terms",type:"checkbox",required:!0,className:"h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"}),(0,a.jsxs)("label",{htmlFor:"agree-terms",className:"ml-2 block text-sm text-gray-900",children:["I agree to the"," ",(0,a.jsx)("a",{href:"#",className:"text-blue-600 hover:text-blue-500",children:"Terms of Service"})," ","and"," ",(0,a.jsx)("a",{href:"#",className:"text-blue-600 hover:text-blue-500",children:"Privacy Policy"})]})]}),(0,a.jsx)("div",{children:(0,a.jsx)("button",{type:"submit",disabled:p,className:"group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200",children:p?"Creating account...":"Create account"})})]})]})})}},4033:function(e,t,r){e.exports=r(290)},9367:function(e,t,r){"use strict";var a=r(2265);let s=a.forwardRef(function({title:e,titleId:t,...r},s){return a.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:s,"aria-labelledby":t},r),e?a.createElement("title",{id:t},e):null,a.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"}),a.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"}))});t.Z=s},1543:function(e,t,r){"use strict";var a=r(2265);let s=a.forwardRef(function({title:e,titleId:t,...r},s){return a.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:s,"aria-labelledby":t},r),e?a.createElement("title",{id:t},e):null,a.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"}))});t.Z=s},5925:function(e,t,r){"use strict";let a,s;r.d(t,{x7:function(){return es},ZP:function(){return eo},Am:function(){return S}});var o,i=r(2265);let n={data:""},l=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||n,c=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,d=/\/\*[^]*?\*\/|  +/g,u=/\n+/g,m=(e,t)=>{let r="",a="",s="";for(let o in e){let i=e[o];"@"==o[0]?"i"==o[1]?r=o+" "+i+";":a+="f"==o[1]?m(i,o):o+"{"+m(i,"k"==o[1]?"":t)+"}":"object"==typeof i?a+=m(i,t?t.replace(/([^,])+/g,e=>o.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):o):null!=i&&(o=/^--/.test(o)?o:o.replace(/[A-Z]/g,"-$&").toLowerCase(),s+=m.p?m.p(o,i):o+":"+i+";")}return r+(t&&s?t+"{"+s+"}":s)+a},p={},f=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+f(e[r]);return t}return e},h=(e,t,r,a,s)=>{var o;let i=f(e),n=p[i]||(p[i]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(i));if(!p[n]){let t=i!==e?e:(e=>{let t,r,a=[{}];for(;t=c.exec(e.replace(d,""));)t[4]?a.shift():t[3]?(r=t[3].replace(u," ").trim(),a.unshift(a[0][r]=a[0][r]||{})):a[0][t[1]]=t[2].replace(u," ").trim();return a[0]})(e);p[n]=m(s?{["@keyframes "+n]:t}:t,r?"":"."+n)}let l=r&&p.g?p.g:null;return r&&(p.g=p[n]),o=p[n],l?t.data=t.data.replace(l,o):-1===t.data.indexOf(o)&&(t.data=a?o+t.data:t.data+o),n},g=(e,t,r)=>e.reduce((e,a,s)=>{let o=t[s];if(o&&o.call){let e=o(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;o=t?"."+t:e&&"object"==typeof e?e.props?"":m(e,""):!1===e?"":e}return e+a+(null==o?"":o)},"");function x(e){let t=this||{},r=e.call?e(t.p):e;return h(r.unshift?r.raw?g(r,[].slice.call(arguments,1),t.p):r.reduce((e,r)=>Object.assign(e,r&&r.call?r(t.p):r),{}):r,l(t.target),t.g,t.o,t.k)}x.bind({g:1});let b,y,v,w=x.bind({k:1});function N(e,t){let r=this||{};return function(){let a=arguments;function s(o,i){let n=Object.assign({},o),l=n.className||s.className;r.p=Object.assign({theme:y&&y()},n),r.o=/ *go\d+/.test(l),n.className=x.apply(r,a)+(l?" "+l:""),t&&(n.ref=i);let c=e;return e[0]&&(c=n.as||e,delete n.as),v&&c[0]&&v(n),b(c,n)}return t?t(s):s}}var j=e=>"function"==typeof e,k=(e,t)=>j(e)?e(t):e,E=(a=0,()=>(++a).toString()),C=()=>{if(void 0===s&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");s=!e||e.matches}return s},P=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,20)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return P(e,{type:e.toasts.find(e=>e.id===r.id)?1:0,toast:r});case 3:let{toastId:a}=t;return{...e,toasts:e.toasts.map(e=>e.id===a||void 0===a?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let s=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+s}))}}},O=[],$={toasts:[],pausedAt:void 0},D=e=>{$=P($,e),O.forEach(e=>{e($)})},Z={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},A=(e={})=>{let[t,r]=(0,i.useState)($),a=(0,i.useRef)($);(0,i.useEffect)(()=>(a.current!==$&&r($),O.push(r),()=>{let e=O.indexOf(r);e>-1&&O.splice(e,1)}),[]);let s=t.toasts.map(t=>{var r,a,s;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||Z[t.type],style:{...e.style,...null==(s=e[t.type])?void 0:s.style,...t.style}}});return{...t,toasts:s}},F=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||E()}),L=e=>(t,r)=>{let a=F(t,e,r);return D({type:2,toast:a}),a.id},S=(e,t)=>L("blank")(e,t);S.error=L("error"),S.success=L("success"),S.loading=L("loading"),S.custom=L("custom"),S.dismiss=e=>{D({type:3,toastId:e})},S.remove=e=>D({type:4,toastId:e}),S.promise=(e,t,r)=>{let a=S.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let s=t.success?k(t.success,e):void 0;return s?S.success(s,{id:a,...r,...null==r?void 0:r.success}):S.dismiss(a),e}).catch(e=>{let s=t.error?k(t.error,e):void 0;s?S.error(s,{id:a,...r,...null==r?void 0:r.error}):S.dismiss(a)}),e};var M=(e,t)=>{D({type:1,toast:{id:e,height:t}})},_=()=>{D({type:5,time:Date.now()})},z=new Map,I=1e3,T=(e,t=I)=>{if(z.has(e))return;let r=setTimeout(()=>{z.delete(e),D({type:4,toastId:e})},t);z.set(e,r)},q=e=>{let{toasts:t,pausedAt:r}=A(e);(0,i.useEffect)(()=>{if(r)return;let e=Date.now(),a=t.map(t=>{if(t.duration===1/0)return;let r=(t.duration||0)+t.pauseDuration-(e-t.createdAt);if(r<0){t.visible&&S.dismiss(t.id);return}return setTimeout(()=>S.dismiss(t.id),r)});return()=>{a.forEach(e=>e&&clearTimeout(e))}},[t,r]);let a=(0,i.useCallback)(()=>{r&&D({type:6,time:Date.now()})},[r]),s=(0,i.useCallback)((e,r)=>{let{reverseOrder:a=!1,gutter:s=8,defaultPosition:o}=r||{},i=t.filter(t=>(t.position||o)===(e.position||o)&&t.height),n=i.findIndex(t=>t.id===e.id),l=i.filter((e,t)=>t<n&&e.visible).length;return i.filter(e=>e.visible).slice(...a?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+s,0)},[t]);return(0,i.useEffect)(()=>{t.forEach(e=>{if(e.dismissed)T(e.id,e.removeDelay);else{let t=z.get(e.id);t&&(clearTimeout(t),z.delete(e.id))}})},[t]),{toasts:t,handlers:{updateHeight:M,startPause:_,endPause:a,calculateOffset:s}}},R=N("div")`
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
`,H=N("div")`
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
`,B=N("div")`
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
`,U=N("div")`
  position: absolute;
`,W=N("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,J=N("div")`
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
`,Y=({toast:e})=>{let{icon:t,type:r,iconTheme:a}=e;return void 0!==t?"string"==typeof t?i.createElement(J,null,t):t:"blank"===r?null:i.createElement(W,null,i.createElement(H,{...a}),"loading"!==r&&i.createElement(U,null,"error"===r?i.createElement(R,{...a}):i.createElement(B,{...a})))},G=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,K=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,Q=N("div")`
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
`,V=N("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,X=(e,t)=>{let r=e.includes("top")?1:-1,[a,s]=C()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[G(r),K(r)];return{animation:t?`${w(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${w(s)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},ee=i.memo(({toast:e,position:t,style:r,children:a})=>{let s=e.height?X(e.position||t||"top-center",e.visible):{opacity:0},o=i.createElement(Y,{toast:e}),n=i.createElement(V,{...e.ariaProps},k(e.message,e));return i.createElement(Q,{className:e.className,style:{...s,...r,...e.style}},"function"==typeof a?a({icon:o,message:n}):i.createElement(i.Fragment,null,o,n))});o=i.createElement,m.p=void 0,b=o,y=void 0,v=void 0;var et=({id:e,className:t,style:r,onHeightUpdate:a,children:s})=>{let o=i.useCallback(t=>{if(t){let r=()=>{a(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return i.createElement("div",{ref:o,className:t,style:r},s)},er=(e,t)=>{let r=e.includes("top"),a=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:C()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(r?1:-1)}px)`,...r?{top:0}:{bottom:0},...a}},ea=x`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,es=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:a,children:s,containerStyle:o,containerClassName:n})=>{let{toasts:l,handlers:c}=q(r);return i.createElement("div",{id:"_rht_toaster",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...o},className:n,onMouseEnter:c.startPause,onMouseLeave:c.endPause},l.map(r=>{let o=r.position||t,n=er(o,c.calculateOffset(r,{reverseOrder:e,gutter:a,defaultPosition:t}));return i.createElement(et,{id:r.id,key:r.id,onHeightUpdate:c.updateHeight,className:r.visible?ea:"",style:n},"custom"===r.type?k(r.message,r):s?s(r):i.createElement(ee,{toast:r,position:o}))}))},eo=S}},function(e){e.O(0,[176,971,864,744],function(){return e(e.s=3392)}),_N_E=e.O()}]);