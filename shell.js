(function(){
var HUB="https://agabrielr.github.io/";
var SH={open:false,arm:false,pushed:false,skip:0,inst:null,items:[],h:{render:function(){}}};
var I={left:'<path d="M19 12H5M11 6l-6 6 6 6"/>',grid:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
out:'<path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3"/><path d="M10 17l-5-5 5-5M5 12h11"/>',redo:'<path d="M4 12a8 8 0 1 0 2.3-5.7L4 8.6"/><path d="M4 3v5.6h5.6"/>',
dl:'<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>',chat:'<path d="M21 12a8 8 0 0 1-11.6 7.1L3 21l1.9-5.4A8 8 0 1 1 21 12z"/>',bag:'<path d="M6 7h12l1 13H5z"/><path d="M9 7a3 3 0 0 1 6 0"/>',user:'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>'};
function ic(n){return '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+I[n]+'</svg>'}
function esc(t){return String(t==null?"":t).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
function ini(n){return String(n).split(/\s+/).filter(Boolean).map(function(w){return w.charAt(0)}).slice(0,2).join("").toUpperCase()}
function standalone(){try{return matchMedia("(display-mode: standalone)").matches||navigator.standalone}catch(e){return false}}
function close(){SH.open=false;SH.arm=false}
window.Shell={
HUB:HUB,
init:function(h){SH.h=h},
canInstall:function(){return !!SH.inst&&!standalone()},
installHint:function(){if(standalone())return "";return SH.inst?'<button type="button" class="btn ghost lg block" style="margin-top:16px" data-sh="install">'+ic("dl")+'Instalar como aplicativo</button>':'<p class="m" style="margin-top:18px">Para usar como aplicativo: no Android, toque no menu ⋮ do navegador e em Instalar app. No iPhone, toque em Compartilhar e em Adicionar à Tela de Início.</p>'},
bar:function(o){var u=o.user,h='<header class="sh-bar"><button type="button" class="sh-ic" data-sh="back" aria-label="Voltar" hidden>'+ic("left")+'</button><div class="sh-t"><b>'+esc(o.title)+'</b>'+(o.sub?'<small>'+esc(o.sub)+'</small>':'')+'</div>';
if(u){SH.items=o.items||[];h+='<button type="button" class="sh-av" data-sh="menu" aria-haspopup="true" aria-expanded="'+SH.open+'" aria-label="Menu da conta">'+esc(ini(u.name))+'</button>';
if(SH.open)h+='<div class="sh-menu" role="menu"><div class="sh-who"><b>'+esc(u.name)+'</b><small>'+esc(u.role)+'</small></div>'+
SH.items.map(function(it,i){return '<button type="button" role="menuitem" class="sh-it" data-sh="item" data-i="'+i+'">'+ic(it.icon||"user")+esc(it.label)+'</button>'}).join("")+
(window.Shell.canInstall()?'<button type="button" role="menuitem" class="sh-it" data-sh="install">'+ic("dl")+'Instalar como aplicativo</button>':'')+
'<button type="button" role="menuitem" class="sh-it" data-sh="reset">'+ic("redo")+(SH.arm?'Toque de novo para apagar tudo':'Recomeçar a demonstração')+'</button>'+
'<a role="menuitem" class="sh-it" href="'+HUB+'">'+ic("grid")+'Ver o portfólio</a>'+
'<button type="button" role="menuitem" class="sh-it sh-out" data-sh="logout">'+ic("out")+'Sair</button></div>'}
else if(o.right)h+=o.right;
return h+'</header>'},
link:function(href,label){return '<a class="sh-link" href="'+href+'">'+esc(label)+'</a>'},
hub:function(){return '<a class="sh-link" href="'+HUB+'">'+ic("grid")+'Portfólio</a>'},
after:function(){var s=document.querySelector("#app .back svg"),el=s?s.closest(".back"):null,bb=document.querySelector(".sh-bar [data-sh=back]");
if(el){el.classList.add("sh-hide");if(bb)bb.hidden=false;if(!SH.pushed){try{history.pushState({sh:1},"",location.href)}catch(e){}SH.pushed=true}}
else if(SH.pushed){SH.pushed=false;SH.skip++;history.back()}}
};
document.addEventListener("click",function(e){var t=e.target.closest("[data-sh]");
if(!t){if(SH.open&&!e.target.closest(".sh-menu")){e.preventDefault();e.stopPropagation();close();SH.h.render()}return}
var k=t.dataset.sh;e.preventDefault();e.stopPropagation();
if(k==="menu"){var o=!SH.open;close();SH.open=o;SH.h.render();if(o){var f=document.querySelector(".sh-menu .sh-it");if(f)f.focus()}}
else if(k==="back")history.back();
else if(k==="item"){var it=SH.items[+t.dataset.i];close();SH.h.render();if(it)it.run()}
else if(k==="install"){if(SH.inst){SH.inst.prompt();SH.inst=null}close();SH.h.render()}
else if(k==="reset"){if(!SH.arm){SH.arm=true;SH.h.render();var r=document.querySelector(".sh-menu [data-sh=reset]");if(r)r.focus();return}close();SH.h.onReset()}
else if(k==="logout"){close();SH.h.onLogout()}},true);
document.addEventListener("click",function(e){var a=e.target.closest(".sh-menu a");if(a){close()}},true);
document.addEventListener("keydown",function(e){if(e.key==="Escape"&&SH.open){close();SH.h.render();var b=document.querySelector(".sh-av");if(b)b.focus()}});
window.addEventListener("popstate",function(){SH.pushed=false;if(SH.skip){SH.skip--;return}if(SH.open){close();SH.h.render()}var el=document.querySelector("#app .back.sh-hide");if(el)el.click()});
window.addEventListener("beforeinstallprompt",function(e){e.preventDefault();SH.inst=e;if(SH.open)SH.h.render()});
})();
