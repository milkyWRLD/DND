(()=>{var e={930:()=>{const e=document.querySelectorAll(".add-btn:not(.solid)"),t=document.querySelectorAll(".solid"),r=document.querySelectorAll(".add-container"),o=document.querySelectorAll(".add-item"),n=document.querySelectorAll(".add-item-file"),l=document.querySelectorAll(".drag-item-list"),a=document.getElementById("backlog-list"),i=document.getElementById("progress-list"),c=document.getElementById("complete-list");let s,d,m=!1,u=[],g=[],y=[],f=[],p=!1;function v(e){return e.filter((e=>null!==e&&""!==e.trim()))}function S(e,t,r,o){const n=document.createElement("li");if(n.id=o,n.classList.add("drag-item"),n.draggable=!0,n.addEventListener("dragstart",(e=>(s=e.target,void(p=!0)))),r.startsWith("data:image")){const e=document.createElement("img");e.src=r,n.appendChild(e)}else n.textContent=r,n.contentEditable=!0,n.addEventListener("focusout",(()=>function(e,t){const r=f[t],o=l[t].children;p||(o[e].textContent.trim()||o[e].querySelector("img")?r[e]=o[e].querySelector("img")?o[e].querySelector("img").src:o[e].textContent.trim():delete r[e],E())}(o,t)));e.appendChild(n)}function E(){m||localStorage.getItem("backlogItems")&&(u=JSON.parse(localStorage.backlogItems),g=JSON.parse(localStorage.progressItems),y=JSON.parse(localStorage.completeItems)),a.innerHTML="",u.forEach(((e,t)=>{S(a,0,e,t)})),u=v(u),i.innerHTML="",g.forEach(((e,t)=>{S(i,1,e,t)})),g=v(g),c.innerHTML="",y.forEach(((e,t)=>{S(c,2,e,t)})),y=v(y),m=!0,f=[u,g,y],["backlog","progress","complete"].forEach(((e,t)=>{try{localStorage.setItem(`${e}Items`,JSON.stringify(f[t]))}catch(e){"QuotaExceededError"===e.name&&alert("Local storage quota exceeded. Unable to save more items.")}}))}function h(l){e[l].style.visibility="visible",t[l].style.display="none",r[l].style.display="none",function(e){const t=o[e].textContent.trim(),r=n[e],l=r.files[0];if(l){const t=new FileReader;t.onload=function(t){const n=t.target.result;f[e].push(n),o[e].textContent="",r.value="",E()},t.readAsDataURL(l)}else t&&(f[e].push(t),o[e].textContent="",r.value="",E())}(l)}function x(e){e.preventDefault();const t=l[d];l.forEach((e=>{e.classList.remove("over")})),t.appendChild(s),p=!1,u=Array.from(a.children).map((e=>e.querySelector("img")?e.querySelector("img").src:e.textContent.trim())),g=Array.from(i.children).map((e=>e.querySelector("img")?e.querySelector("img").src:e.textContent.trim())),y=Array.from(c.children).map((e=>e.querySelector("img")?e.querySelector("img").src:e.textContent.trim())),E()}l.forEach(((e,t)=>{e.addEventListener("drop",(e=>x(e))),e.addEventListener("dragover",(e=>function(e){e.preventDefault()}(e))),e.addEventListener("dragenter",(()=>{return l[e=t].classList.add("over"),void(d=e);var e}))})),e.forEach(((o,n)=>{o.addEventListener("click",(()=>{return e[o=n].style.visibility="hidden",t[o].style.display="flex",void(r[o].style.display="flex");var o}))})),t.forEach(((e,t)=>{e.addEventListener("click",(()=>h(t)))})),E()}},t={};function r(o){var n=t[o];if(void 0!==n)return n.exports;var l=t[o]={exports:{}};return e[o](l,l.exports,r),l.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var o in t)r.o(t,o)&&!r.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";r(930)})()})();