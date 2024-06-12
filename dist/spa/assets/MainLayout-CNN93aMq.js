import{h as S,c as C,a as g,b as K,u as ie,d as me,g as B,e as se,f as ve,r as h,i as fe,s as be,j as ge,k as he,w as F,o as E,l as $,n as re,m as ye,p as A,q as pe,t as Se,v as ue,x as J,y as P,z as I,A as _e,B as ke,C as we,D as qe,E as Ne,F as xe,_ as Le,G as X,H,I as Y,J as N,K as x,L as O,M as Z,N as ee,O as te,P as p,Q as D,R as W,S as Ce,T as Te,U as Oe,V as Qe,W as j}from"./index-vzdZb7S7.js";const ze=S("div",{class:"q-space"}),Re=C({name:"QSpace",setup(){return()=>ze}}),M=C({name:"QItemLabel",props:{overline:Boolean,caption:Boolean,header:Boolean,lines:[Number,String]},setup(e,{slots:u}){const l=g(()=>parseInt(e.lines,10)),t=g(()=>"q-item__label"+(e.overline===!0?" q-item__label--overline text-overline":"")+(e.caption===!0?" q-item__label--caption text-caption":"")+(e.header===!0?" q-item__label--header":"")+(l.value===1?" ellipsis":"")),r=g(()=>e.lines!==void 0&&l.value>1?{overflow:"hidden",display:"-webkit-box","-webkit-box-orient":"vertical","-webkit-line-clamp":l.value}:null);return()=>S("div",{style:r.value,class:t.value},K(u.default))}}),V=C({name:"QItemSection",props:{avatar:Boolean,thumbnail:Boolean,side:Boolean,top:Boolean,noWrap:Boolean},setup(e,{slots:u}){const l=g(()=>`q-item__section column q-item__section--${e.avatar===!0||e.side===!0||e.thumbnail===!0?"side":"main"}`+(e.top===!0?" q-item__section--top justify-start":" justify-center")+(e.avatar===!0?" q-item__section--avatar":"")+(e.thumbnail===!0?" q-item__section--thumbnail":"")+(e.noWrap===!0?" q-item__section--nowrap":""));return()=>S("div",{class:l.value},K(u.default))}}),Be=C({name:"QItem",props:{...ie,...me,tag:{type:String,default:"div"},active:{type:Boolean,default:null},clickable:Boolean,dense:Boolean,insetLevel:Number,tabindex:[String,Number],focused:Boolean,manualFocus:Boolean},emits:["click","keyup"],setup(e,{slots:u,emit:l}){const{proxy:{$q:t}}=B(),r=se(e,t),{hasLink:m,linkAttrs:a,linkClass:c,linkTag:o,navigateOnClick:i}=ve(),v=h(null),f=h(null),k=g(()=>e.clickable===!0||m.value===!0||e.tag==="label"),b=g(()=>e.disable!==!0&&k.value===!0),w=g(()=>"q-item q-item-type row no-wrap"+(e.dense===!0?" q-item--dense":"")+(r.value===!0?" q-item--dark":"")+(m.value===!0&&e.active===null?c.value:e.active===!0?` q-item--active${e.activeClass!==void 0?` ${e.activeClass}`:""}`:"")+(e.disable===!0?" disabled":"")+(b.value===!0?" q-item--clickable q-link cursor-pointer "+(e.manualFocus===!0?"q-manual-focusable":"q-focusable q-hoverable")+(e.focused===!0?" q-manual-focusable--focused":""):"")),Q=g(()=>e.insetLevel===void 0?null:{["padding"+(t.lang.rtl===!0?"Right":"Left")]:16+e.insetLevel*56+"px"});function z(d){b.value===!0&&(f.value!==null&&(d.qKeyEvent!==!0&&document.activeElement===v.value?f.value.focus():document.activeElement===f.value&&v.value.focus()),i(d))}function T(d){if(b.value===!0&&fe(d,[13,32])===!0){be(d),d.qKeyEvent=!0;const s=new MouseEvent("click",d);s.qKeyEvent=!0,v.value.dispatchEvent(s)}l("keyup",d)}function L(){const d=ge(u.default,[]);return b.value===!0&&d.unshift(S("div",{class:"q-focus-helper",tabindex:-1,ref:f})),d}return()=>{const d={ref:v,class:w.value,style:Q.value,role:"listitem",onClick:z,onKeyup:T};return b.value===!0?(d.tabindex=e.tabindex||"0",Object.assign(d,a.value)):k.value===!0&&(d["aria-disabled"]="true"),S(o.value,d,L())}}}),Ie=C({name:"QList",props:{...ie,bordered:Boolean,dense:Boolean,separator:Boolean,padding:Boolean,tag:{type:String,default:"div"}},setup(e,{slots:u}){const l=B(),t=se(e,l.proxy.$q),r=g(()=>"q-list"+(e.bordered===!0?" q-list--bordered":"")+(e.dense===!0?" q-list--dense":"")+(e.separator===!0?" q-list--separator":"")+(t.value===!0?" q-list--dark":"")+(e.padding===!0?" q-list--padding":""));return()=>S(e.tag,{class:r.value},K(u.default))}}),{passive:le}=A,He=["both","horizontal","vertical"],De=C({name:"QScrollObserver",props:{axis:{type:String,validator:e=>He.includes(e),default:"vertical"},debounce:[String,Number],scrollTarget:he},emits:["scroll"],setup(e,{emit:u}){const l={position:{top:0,left:0},direction:"down",directionChanged:!1,delta:{top:0,left:0},inflectionPoint:{top:0,left:0}};let t=null,r,m;F(()=>e.scrollTarget,()=>{o(),c()});function a(){t!==null&&t();const f=Math.max(0,pe(r)),k=Se(r),b={top:f-l.position.top,left:k-l.position.left};if(e.axis==="vertical"&&b.top===0||e.axis==="horizontal"&&b.left===0)return;const w=Math.abs(b.top)>=Math.abs(b.left)?b.top<0?"up":"down":b.left<0?"left":"right";l.position={top:f,left:k},l.directionChanged=l.direction!==w,l.delta=b,l.directionChanged===!0&&(l.direction=w,l.inflectionPoint=l.position),u("scroll",{...l})}function c(){r=ye(m,e.scrollTarget),r.addEventListener("scroll",i,le),i(!0)}function o(){r!==void 0&&(r.removeEventListener("scroll",i,le),r=void 0)}function i(f){if(f===!0||e.debounce===0||e.debounce==="0")a();else if(t===null){const[k,b]=e.debounce?[setTimeout(a,e.debounce),clearTimeout]:[requestAnimationFrame(a),cancelAnimationFrame];t=()=>{b(k),t=null}}}const{proxy:v}=B();return F(()=>v.$q.lang.rtl,a),E(()=>{m=v.$el.parentNode,c()}),$(()=>{t!==null&&t(),o()}),Object.assign(v,{trigger:i,getPosition:()=>l}),re}});function Ee(){const e=h(!ue.value);return e.value===!1&&E(()=>{e.value=!0}),{isHydrated:e}}const ce=typeof ResizeObserver<"u",ne=ce===!0?{}:{style:"display:block;position:absolute;top:0;left:0;right:0;bottom:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1;",url:"about:blank"},ae=C({name:"QResizeObserver",props:{debounce:{type:[String,Number],default:100}},emits:["resize"],setup(e,{emit:u}){let l=null,t,r={width:-1,height:-1};function m(o){o===!0||e.debounce===0||e.debounce==="0"?a():l===null&&(l=setTimeout(a,e.debounce))}function a(){if(l!==null&&(clearTimeout(l),l=null),t){const{offsetWidth:o,offsetHeight:i}=t;(o!==r.width||i!==r.height)&&(r={width:o,height:i},u("resize",r))}}const{proxy:c}=B();if(c.trigger=m,ce===!0){let o;const i=v=>{t=c.$el.parentNode,t?(o=new ResizeObserver(m),o.observe(t),a()):v!==!0&&J(()=>{i(!0)})};return E(()=>{i()}),$(()=>{l!==null&&clearTimeout(l),o!==void 0&&(o.disconnect!==void 0?o.disconnect():t&&o.unobserve(t))}),re}else{let o=function(){l!==null&&(clearTimeout(l),l=null),f!==void 0&&(f.removeEventListener!==void 0&&f.removeEventListener("resize",m,A.passive),f=void 0)},i=function(){o(),t&&t.contentDocument&&(f=t.contentDocument.defaultView,f.addEventListener("resize",m,A.passive),a())};const{isHydrated:v}=Ee();let f;return E(()=>{J(()=>{t=c.$el,t&&i()})}),$(o),()=>{if(v.value===!0)return S("object",{class:"q--avoid-card-border",style:ne.style,tabindex:-1,type:"text/html",data:ne.url,"aria-hidden":"true",onLoad:i})}}}}),Ge=C({name:"QLayout",props:{container:Boolean,view:{type:String,default:"hhh lpr fff",validator:e=>/^(h|l)h(h|r) lpr (f|l)f(f|r)$/.test(e.toLowerCase())},onScroll:Function,onScrollHeight:Function,onResize:Function},setup(e,{slots:u,emit:l}){const{proxy:{$q:t}}=B(),r=h(null),m=h(t.screen.height),a=h(e.container===!0?0:t.screen.width),c=h({position:0,direction:"down",inflectionPoint:0}),o=h(0),i=h(ue.value===!0?0:P()),v=g(()=>"q-layout q-layout--"+(e.container===!0?"containerized":"standard")),f=g(()=>e.container===!1?{minHeight:t.screen.height+"px"}:null),k=g(()=>i.value!==0?{[t.lang.rtl===!0?"left":"right"]:`${i.value}px`}:null),b=g(()=>i.value!==0?{[t.lang.rtl===!0?"right":"left"]:0,[t.lang.rtl===!0?"left":"right"]:`-${i.value}px`,width:`calc(100% + ${i.value}px)`}:null);function w(s){if(e.container===!0||document.qScrollPrevented!==!0){const y={position:s.position.top,direction:s.direction,directionChanged:s.directionChanged,inflectionPoint:s.inflectionPoint.top,delta:s.delta.top};c.value=y,e.onScroll!==void 0&&l("scroll",y)}}function Q(s){const{height:y,width:q}=s;let n=!1;m.value!==y&&(n=!0,m.value=y,e.onScrollHeight!==void 0&&l("scrollHeight",y),T()),a.value!==q&&(n=!0,a.value=q),n===!0&&e.onResize!==void 0&&l("resize",s)}function z({height:s}){o.value!==s&&(o.value=s,T())}function T(){if(e.container===!0){const s=m.value>o.value?P():0;i.value!==s&&(i.value=s)}}let L=null;const d={instances:{},view:g(()=>e.view),isContainer:g(()=>e.container),rootRef:r,height:m,containerHeight:o,scrollbarWidth:i,totalWidth:g(()=>a.value+i.value),rows:g(()=>{const s=e.view.toLowerCase().split(" ");return{top:s[0].split(""),middle:s[1].split(""),bottom:s[2].split("")}}),header:I({size:0,offset:0,space:!1}),right:I({size:300,offset:0,space:!1}),footer:I({size:0,offset:0,space:!1}),left:I({size:300,offset:0,space:!1}),scroll:c,animate(){L!==null?clearTimeout(L):document.body.classList.add("q-body--layout-animate"),L=setTimeout(()=>{L=null,document.body.classList.remove("q-body--layout-animate")},155)},update(s,y,q){d[s][y]=q}};if(_e(qe,d),P()>0){let s=function(){n=null,_.classList.remove("hide-scrollbar")},y=function(){if(n===null){if(_.scrollHeight>t.screen.height)return;_.classList.add("hide-scrollbar")}else clearTimeout(n);n=setTimeout(s,300)},q=function(R){n!==null&&R==="remove"&&(clearTimeout(n),s()),window[`${R}EventListener`]("resize",y)},n=null;const _=document.body;F(()=>e.container!==!0?"add":"remove",q),e.container!==!0&&q("add"),ke(()=>{q("remove")})}return()=>{const s=we(u.default,[S(De,{onScroll:w}),S(ae,{onResize:Q})]),y=S("div",{class:v.value,style:f.value,ref:e.container===!0?void 0:r,tabindex:-1},s);return e.container===!0?S("div",{class:"q-layout-container overflow-hidden",ref:r},[S(ae,{onResize:z}),S("div",{class:"absolute-full",style:k.value},[S("div",{class:"scroll",style:b.value},[y])])]):y}}});function oe(){return Ne(xe)}const Pe=Object.assign({name:"MainLayout"},{__name:"MainLayout",setup(e,{expose:u}){u();const l=[];l.push(90);for(let n=0;n<=8;n++)for(let _=0;_<=9;_++)n===0&&_===0||l.push(n*10+_);const t=oe(),r=g({get(){return t.dark.isActive},set(n){t.dark.set(n),t.localStorage.set("bingo-dark-mode",n)}});X(()=>{const n=t.localStorage.getItem("bingo-dark-mode");t.dark.set(n)});const m=[];for(let n=1;n<=90;n++)m.push(n);const a=h(t.localStorage.getItem("selectedNumbers")||[]),c=h(t.localStorage.getItem("unselectedNumbers")||m),o=h(t.localStorage.getItem("selectedNumber")||0),i=h(t.localStorage.getItem("typeOfGame")||"Quine"),v=h(t.localStorage.getItem("gameHistory")||[]),f=h(!1),k=h(null),b=h(null),w=()=>{t.localStorage.setItem("unselectedNumbers",c.value),t.localStorage.setItem("selectedNumbers",a.value),t.localStorage.setItem("selectedNumber",o.value)};w();const Q=n=>{t.dialog({title:"Supprimer le jeu",message:"T'es sûr de vouloir faire çà ?",cancel:!0,persistent:!0}).onOk(()=>{v.value.splice(n,1),t.localStorage.setItem("gameHistory",v.value)})},z=()=>{t.dialog({title:"Type de jeu",message:"Choisis le type de jeu :",cancel:!0,persistent:!0,options:{type:"radio",model:i.value,items:[{label:"Quine",value:"Quine"},{label:"Double Quine",value:"Double Quine"},{label:"Carton plein",value:"Carton plein"}]}}).onOk(n=>{i.value=n,t.localStorage.setItem("typeOfGame",i.value)})},T=n=>{console.log(n),t.dialog({title:"Nouveau jeu",message:"<b>T'es sûr de vouloir faire çà ?</b><br> Si oui, choisis le type de jeu :",cancel:!0,persistent:!0,html:!0,options:{type:"radio",model:"Quine",items:[{label:"Quine",value:"Quine"},{label:"Double Quine",value:"Double Quine"},{label:"Carton plein",value:"Carton plein"}]}}).onOk(_=>{c.value=m,a.value=[],o.value=0,k.value.$el.focus(),b.value.$el.blur(),v.value.push({typeOfGame:i.value,selectedNumbers:a.value,dateOfGame:new Date().toLocaleString()}),t.localStorage.setItem("gameHistory",v.value),w(),i.value=_,t.localStorage.setItem("typeOfGame",i.value),t.notify({message:"Jeux réinitialisé"})})},L=async()=>{const n=G=>new Promise(de=>setTimeout(de,G));let _=0;const R=async()=>{if(_<75){const G=Math.floor(Math.random()*c.value.length);o.value=c.value[G],_++,await n(10),await R()}};await R();const U=Math.floor(Math.random()*c.value.length);o.value=c.value[U],a.value.push(o.value),c.value.splice(U,1),w()},d=n=>a.value.includes(n),s=n=>n===o.value,y=n=>{n.which===32&&L()};window.addEventListener("keyup",y);const q={listOfNumber:l,$q:t,isDark:r,defaultUnselectedNumbers:m,selectedNumbers:a,unselectedNumbers:c,selectedNumber:o,typeOfGame:i,gameHistory:v,showHistory:f,btnSelectRandomNumber:k,btnResetGame:b,saveToLocalStorage:w,deleteGame:Q,changeTypeOfGame:z,resetGame:T,selectRandomNumber:L,isInSelectedNumber:d,isSelectedNumber:s,keyboardEvent:y,computed:g,onBeforeMount:X,ref:h,get useQuasar(){return oe}};return Object.defineProperty(q,"__isScriptSetup",{enumerable:!1,value:!0}),q}}),je=x("div",{class:"logo parcudup"},[W(' <img src="/squash.svg" class="logo" fit="contain" /> ')],-1),Me=x("div",{class:"logo runicalle"},[W(' <img src="/runicalle.svg" class="logo" fit="contain" /> ')],-1),Ve={class:"selectedNumberContainer"},Fe={class:"selectedNumber"},$e={class:"boardNumbers"},Ae={class:"footer"},Ke={class:"q-pa-md"};function We(e,u,l,t,r,m){return H(),Y(Ge,{view:"hHh lpR fFf",class:"page"},{default:N(()=>[x("header",null,[je,x("div",{class:"typeOfGame",onClick:t.changeTypeOfGame},O(t.typeOfGame),1),Me]),x("section",Ve,[x("div",Fe,O(t.selectedNumber),1)]),x("section",$e,[(H(),Z(te,null,ee(t.listOfNumber,a=>x("div",{key:a,class:Qe([{selectedNumbers:t.isInSelectedNumber(a),theNumber:t.isSelectedNumber(a)},"numbers"])},O(a),3)),64))]),x("footer",Ae,[p(D,{outline:"",autofocus:"",icon:"mdi-dice-multiple",ref:"btnSelectRandomNumber",onClick:t.selectRandomNumber,label:"Tirage",class:"q-ml-md"},null,512),p(Re),W(" DARK MODE "),p(D,{outline:"",dense:"",icon:"mdi-archive-clock-outline",ref:"btnResetGame",onClick:u[0]||(u[0]=a=>t.showHistory=!0),label:"History",class:"q-mr-md"},null,512),p(Ce,{dense:"","keep-color":"",color:"grey","checked-icon":"light_mode","unchecked-icon":"dark_mode",class:"q-mr-md",modelValue:t.isDark,"onUpdate:modelValue":u[1]||(u[1]=a=>t.isDark=a)},null,8,["modelValue"]),p(D,{outline:"",dense:"",icon:"mdi-restart",ref:"btnResetGame",onClick:t.resetGame,label:"Réinitialiser",class:"q-mr-md"},null,512)]),p(Oe,{modelValue:t.showHistory,"onUpdate:modelValue":u[2]||(u[2]=a=>t.showHistory=a)},{default:N(()=>[p(Te,{style:{"min-width":"600px",width:"70vw","max-height":"70vh"}},{default:N(()=>[x("div",Ke,[p(Ie,{bordered:""},{default:N(()=>[(H(!0),Z(te,null,ee(t.gameHistory,(a,c)=>(H(),Y(Be,{key:a.dateOfGame},{default:N(()=>[p(V,null,{default:N(()=>[p(M,null,{default:N(()=>[j(O(a.typeOfGame),1)]),_:2},1024),p(M,{caption:""},{default:N(()=>[j(O(a.dateOfGame),1)]),_:2},1024)]),_:2},1024),p(V,null,{default:N(()=>[p(M,null,{default:N(()=>[j(O(a.selectedNumbers.join(", ")),1)]),_:2},1024)]),_:2},1024),p(V,{side:""},{default:N(()=>[p(D,{flat:"",dense:"",icon:"mdi-delete",onClick:o=>t.deleteGame(c)},null,8,["onClick"])]),_:2},1024)]),_:2},1024))),128))]),_:1})])]),_:1})]),_:1},8,["modelValue"])]),_:1})}const Je=Le(Pe,[["render",We],["__file","/Users/cdel/Development/Perso/bingo-board/src/layouts/MainLayout.vue"]]);export{Je as default};
