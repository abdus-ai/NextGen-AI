(function(){
"use strict";
var loading=null;
function get(id){return document.getElementById(id);}
function setOpen(open){
  var trigger=get("ng-hamburger"),drawer=get("ng-menu-drawer"),backdrop=get("ng-menu-backdrop");
  if(!trigger||!drawer||!backdrop)return;
  drawer.classList.toggle("is-open",open);
  drawer.setAttribute("aria-hidden",String(!open));
  backdrop.hidden=!open;
  trigger.setAttribute("aria-expanded",String(open));
  trigger.setAttribute("aria-label",open?"Close navigation menu":"Open navigation menu");
  document.body.classList.toggle("ng-menu-open",open);
}
function bindContents(){
  var drawer=get("ng-menu-drawer"),backdrop=get("ng-menu-backdrop");
  if(!drawer||!backdrop||drawer.dataset.bound==="1")return;
  drawer.dataset.bound="1";
  var menuNav=drawer.querySelector(".ng-ai-menu-nav");
  if(menuNav&&menuNav.dataset.pullRefreshBound!=="1"){
    menuNav.dataset.pullRefreshBound="1";
    var pullStartY=0,pullDistance=0,pullEligible=false,pullActive=false;
    menuNav.addEventListener("touchstart",function(event){
      if(event.touches.length!==1)return;
      pullEligible=menuNav.scrollTop<=2;
      pullActive=false;
      pullStartY=event.touches[0].clientY;
      pullDistance=0;
    },{passive:true});
    menuNav.addEventListener("touchmove",function(event){
      if(!pullEligible||event.touches.length!==1)return;
      var distance=event.touches[0].clientY-pullStartY;
      if(distance<=0){pullDistance=0;return;}
      if(menuNav.scrollTop>2){pullEligible=false;return;}
      pullDistance=distance;
      if(distance>8){
        pullActive=true;
        if(event.cancelable)event.preventDefault();
      }
    },{passive:false});
    function finishMenuPull(){
      var shouldRefresh=pullEligible&&pullActive&&pullDistance>=65;
      pullEligible=false;pullActive=false;pullDistance=0;
      if(shouldRefresh){
        window.location.href=window.location.pathname+"?menu-refresh="+Date.now();
      }
    }
    menuNav.addEventListener("touchend",finishMenuPull,{passive:true});
    menuNav.addEventListener("touchcancel",function(){pullEligible=false;pullActive=false;pullDistance=0;},{passive:true});
  }
  var close=get("ng-menu-close");
  if(close)close.addEventListener("click",function(){setOpen(false);});
  backdrop.addEventListener("click",function(){setOpen(false);});
  drawer.querySelectorAll("a[href]").forEach(function(link){
    link.addEventListener("click",function(){if(link.getAttribute("href")!=="#")setOpen(false);});
  });
  drawer.querySelectorAll(".ng-menu-accordion-trigger,.ng-ai-menu-group-trigger").forEach(function(button){
    button.addEventListener("click",function(){
      var panel=button.nextElementSibling;if(!panel)return;
      var expanded=button.getAttribute("aria-expanded")==="true";
      button.setAttribute("aria-expanded",String(!expanded));panel.hidden=expanded;
      var icon=button.querySelector("i");if(icon)icon.textContent=expanded?"⌄":"⌃";
    });
  });
  var profileButton=get("ng-menu-profile-dropdown"),profilePopup=get("ng-ai-profile-popup");
  if(profileButton&&profilePopup){var profileChevron=profileButton.querySelector(".ng-ai-profile-chevron");function setProfileChevron(expanded){if(!profileChevron)return;profileChevron.innerHTML=expanded?'<svg width="14" height="17" viewBox="0 0 18 22" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3l6 6 6-6M3 19l6-6 6 6"/></svg>':'<svg width="14" height="17" viewBox="0 0 18 22" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l6-6 6 6M3 13l6 6 6-6"/></svg>';}setProfileChevron(false);profileButton.addEventListener("click",function(){var open=profileButton.getAttribute("aria-expanded")==="true";profileButton.setAttribute("aria-expanded",String(!open));profilePopup.hidden=open;setProfileChevron(!open);});}
  var seeLess=get("ng-menu-see-less"),main=drawer.querySelector(".ng-menu-main-links");
  if(seeLess&&main)seeLess.addEventListener("click",function(){
    var collapsed=main.classList.toggle("is-collapsed");
    seeLess.textContent=collapsed?"See more":"See less";
  });
  document.addEventListener("keydown",function(event){
    if(event.key==="Escape"&&drawer.classList.contains("is-open"))setOpen(false);
  });
}
function loadMenu(){
  if(get("ng-menu-drawer")){bindContents();return Promise.resolve();}
  if(loading)return loading;
  var url=new URL("./hamburger-menu.html?v=20261120-ai2",document.baseURI).href;
  loading=fetch(url,{cache:"no-store",credentials:"same-origin"})
    .then(function(response){if(!response.ok)throw new Error("Navigation menu HTTP "+response.status);return response.text();})
    .then(function(markup){
      var holder=document.createElement("div");holder.id="ng-shared-hamburger-root";holder.innerHTML=markup;document.body.appendChild(holder);bindContents();
    })
    .catch(function(error){loading=null;console.error("NextGen hamburger menu failed:",error);var trigger=get("ng-hamburger");if(trigger)trigger.setAttribute("aria-label","Navigation menu unavailable");throw error;});
  return loading;
}
function init(){
  var trigger=get("ng-hamburger");if(!trigger||trigger.dataset.clickBound==="1")return;
  trigger.dataset.clickBound="1";
  trigger.addEventListener("click",function(event){
    event.preventDefault();event.stopPropagation();
    if(get("ng-menu-drawer")){setOpen(!get("ng-menu-drawer").classList.contains("is-open"));return;}
    loadMenu().then(function(){setOpen(true);}).catch(function(){});
  });
  loadMenu().catch(function(){});
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});else init();
})();