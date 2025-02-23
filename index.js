import{a as h,S as y,i as n}from"./assets/vendor-YT4DRQk6.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const g of o.addedNodes)g.tagName==="LINK"&&g.rel==="modulepreload"&&i(g)}).observe(document,{childList:!0,subtree:!0});function l(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(r){if(r.ep)return;r.ep=!0;const o=l(r);fetch(r.href,o)}})();async function d(t,e){const l="https://pixabay.com/api/",i=new URLSearchParams({key:"48819387-421892b97c727b1ba27e3124c",q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:e,per_page:40}),r=`${l}?${i}`;try{return(await h.get(r)).data}catch(o){throw console.error("Error fetching images:",o),o}}function u(t){return`<div
  class="image-container fb js-image-container"
  style="justify-content: start"
>
  <div class="image-card card">
    <a class="photo-container" href="${t.largeImageURL}">
      <img src="${t.webformatURL}" alt="${t.tags}" class="photo" />
    </a>
    <ul class="image-body">
      <li>
        <h2>Likes</h2>
        <p>${t.likes}</p>
      </li>
      <li>
        <h2>Views</h2>
        <p>${t.views}</p>
      </li>
      <li>
        <h2>Comments</h2>
        <p>${t.comments}</p>
      </li>
      <li>
        <h2>Downloads</h2>
        <p>${t.downloads}</p>
      </li>
    </ul>
  </div>
</div>`}let m=new y(".gallery a",{captionsData:"alt",captionDelay:250});const s={formEl:document.querySelector("#search-images"),galleryEl:document.querySelector(".gallery"),loader:document.querySelector(".loader"),btnLoadMore:document.querySelector("#button-load"),loaderMore:document.querySelector(".loader-more")},a={query:"",page:1,total:100};s.formEl.addEventListener("submit",async t=>{if(t.preventDefault(),a.query=t.target.elements.query.value.trim(),a.query===""){n.error({message:"Please enter a valid search term.",position:"topRight"});return}a.page=1,s.loader.style.display="block",s.galleryEl.innerHTML="",c();try{const e=await d(a.query,a.page);if(e.hits.length===0){n.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}const i=e.hits.map(u).join("");s.galleryEl.insertAdjacentHTML("beforeend",i),m.refresh(),a.total=e.totalHits,p()}catch(e){console.error("Error fetching images:",e),n.error({message:"Something went wrong. Please try again later.",position:"topRight"}),c()}finally{s.loader.style.display="none"}t.target.reset()});s.btnLoadMore.addEventListener("click",async t=>{a.page+=1,p(),s.loaderMore.style.display="block";try{const e=await d(a.query,a.page);if(e.hits.length===0)return c(),n.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),null;{const i=e.hits.map(u).join("");s.galleryEl.insertAdjacentHTML("beforeend",i),m.refresh(),a.total=e.totalHits}}catch(e){console.error("Error fetching images:",e),n.error({message:"Something went wrong. Please try again later.",position:"topRight"})}finally{s.loaderMore.style.display="none"}L()});function f(){s.btnLoadMore.classList.remove("hidden")}function c(){s.btnLoadMore.classList.add("hidden")}function p(){const e=Math.ceil(a.total/40);a.page>=e?(c(),n.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):f()}function L(){const e=s.galleryEl.firstElementChild.getBoundingClientRect().height*2+48;scrollBy({top:e,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
