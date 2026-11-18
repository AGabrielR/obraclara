window.IMG={"tijolo":"img/tijolo.jpg","hidraulica":"img/hidraulica.jpg","piso":"img/piso.jpg","box":"img/box.jpg","pintura":"img/pintura.jpg","muro":"img/muro.jpg","cozinha":"img/cozinha.jpg"};

(function(){
var $=function(s){return document.querySelector(s)};
var IC={home:'<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
wrench:'<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z"/>',
chat:'<path d="M21 12a8 8 0 0 1-11.6 7.1L3 21l1.9-5.4A8 8 0 1 1 21 12z"/>',
camera:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
cow:'<path d="M5 5c0 2 1 3 3 3M19 5c0 2-1 3-3 3"/><path d="M7 8h10v9a3 3 0 0 1-3 3h-4a3 3 0 0 1-3-3z"/><circle cx="10" cy="15" r=".6"/><circle cx="14" cy="15" r=".6"/>',
scale:'<path d="M12 3v18M5 21h14M5 7h14"/><path d="M5 7l-3 7a3.5 3.5 0 0 0 6 0z"/><path d="M19 7l-3 7a3.5 3.5 0 0 0 6 0z"/>',
book:'<path d="M5 4h12a2 2 0 0 1 2 2v14H7a2 2 0 0 1-2-2z"/><path d="M5 18a2 2 0 0 1 2-2h12M9 8h6"/>',
coin:'<circle cx="12" cy="12" r="9"/><path d="M12 7v10M15 9.5c-.5-1-1.7-1.5-3-1.5s-3 .6-3 2 1.3 1.8 3 2 3 .6 3 2-1.4 2-3 2-2.6-.5-3-1.5"/>',
check:'<circle cx="12" cy="12" r="9"/><path d="M8 12.5l3 3 5-6"/>',
plus:'<path d="M12 5v14M5 12h14"/>',
left:'<path d="M19 12H5M11 6l-6 6 6 6"/>',
doc:'<path d="M7 3h8l4 4v14H7z"/><path d="M14 3v5h5M10 13h6M10 17h6"/>',
search:'<circle cx="11" cy="11" r="7"/><path d="M21 21l-5-5"/>',
send:'<path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4z"/>',
user:'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',
pin:'<path d="M12 21s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
hammer:'<path d="M14 6l4 4M12 8l-8 8 4 4 8-8M15 3l6 6-3 3-6-6z"/>'};
function ic(n,s){s=s||22;return '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+IC[n]+'</svg>'}
function nav(items,cur){return '<nav class="nav" aria-label="Menu principal">'+items.map(function(t){return '<button type="button" data-act="tab" data-v="'+t[0]+'"'+(cur===t[0]?' aria-current="page"':'')+'>'+'<span class="ib">'+ic(t[2],24)+(t[3]?'<i class="bdg">'+t[3]+'</i>':'')+'</span><span>'+t[1]+'</span></button>'}).join("")+'</nav>'}

function esc(t){return String(t==null?"":t).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
function money(v){return "R$ "+Number(v).toLocaleString("pt-BR",{maximumFractionDigits:2})}
function num(s){var t=String(s||"").trim();if(t.indexOf(",")>-1||/^\d{1,3}(\.\d{3})+$/.test(t))t=t.replace(/\./g,"").replace(",",".");var n=parseFloat(t);return isNaN(n)?0:n}
function toast(t){var el=$("#toast");el.textContent=t;el.hidden=false;clearTimeout(toast.t);toast.t=setTimeout(function(){el.hidden=true},2800)}
var TIPOS={"Banheiro":1,"Cozinha":1.4,"Pintura":.5,"Piso e revestimento":.8,"Telhado":1.2,"Elétrica":.4,"Muro e calçada":.9,"Outro":1};
var EMP=[
{id:"e1",nome:"Reformas Silva",nota:4.9,obras:63,bairro:"Tiradentes",ver:true,f:1.15,prazo:18,msg:"Equipe de 3 pessoas. Material por conta do cliente, e eu indico a loja com melhor preço."},
{id:"e2",nome:"Costa e Filhos",nota:4.7,obras:41,bairro:"Jardim dos Estados",ver:true,f:1,prazo:25,msg:"Posso começar na semana que vem. Faço uma visita antes para confirmar as medidas."},
{id:"e3",nome:"Marcelo Ramos",nota:4.6,obras:22,bairro:"Vila Carvalho",ver:false,f:.88,prazo:30,msg:"Trabalho com um ajudante. Por isso o prazo é maior e o preço é melhor."}];
var ETAPAS=[["Entrada e mobilização",.2],["Execução",.4],["Acabamento",.3],["Entrega e limpeza",.1]];
var PRAZOS=["O quanto antes","Em até 1 mês","Sem pressa"];
var ORCS=["Sem faixa definida","Até R$ 5 mil","R$ 5 a 15 mil","Acima de R$ 15 mil"];
var QO=[
{k:"quem",t:"Você é",o:["Dono de obra ou reforma","Empreiteiro ou pedreiro","Arquiteto ou engenheiro"]},
{k:"int",t:"Você teria interesse em usar?",o:["Sim","Talvez","Não"]},
{k:"util",t:"O que mais te interessou?",m:1,o:["Receber propostas de vários empreiteiros","Pedir orçamento ao empreiteiro que já conheço","Contrato pelo aplicativo","Pagamento por etapa","Fotos e acompanhamento da obra","Avaliação dos empreiteiros"]},
{k:"emp",t:"Se você é empreiteiro: como preferiria pagar?",o:["Mensalidade fixa","Percentual por obra fechada","Só pagaria se chegassem muitos pedidos","Não pagaria"]},
{k:"cli",t:"Se você é cliente: pagaria uma taxa pelo serviço?",o:["Não","Até 3% do valor da obra","Até 5% do valor da obra","Depende do que oferecer"]},
{k:"txt",t:"O que faltou ou ficou confuso?",txt:1}];
var S={tab:"cliente",scr:"home",f:{tipo:"Banheiro",desc:"",bairro:"",prazo:PRAZOS[0],orc:ORCS[0],ep:"e1",outro:"",extra:"",fotos:[]},job:null,props:[],sort:"preco",sel:null,fromDirect:false,obras:[],ob:0,msgTxt:"",msgFotos:[],pick:null,direct:null,eScr:"lista",eSel:null,ef:{valor:"",prazo:"",msg:"",mat:"Material por conta do cliente"},eSent:{},op:{},opOut:""};

var HOJE="18/11";
var KIND={"Banheiro":"piso","Cozinha":"piso","Pintura":"pintura","Piso e revestimento":"piso","Telhado":"telhado","Elétrica":"hidraulica","Muro e calçada":"muro","Outro":"tijolo"};
function scene(k){if(window.IMG&&IMG[k])return IMG[k];var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".2"/><stop offset="1" stop-color="#000" stop-opacity=".25"/></linearGradient></defs>',i,j;
if(k==="tijolo"){s+='<rect width="600" height="400" fill="#d6d3d1"/>';for(i=0;i<10;i++)for(j=-1;j<7;j++)s+='<rect x="'+(j*100+(i%2?50:0)+3)+'" y="'+(i*40+3)+'" width="94" height="34" fill="'+((i+j)%3?"#c2623a":"#a9502b")+'"/>'}
else if(k==="piso"){s+='<rect width="600" height="400" fill="#94a3b8"/>';for(i=0;i<5;i++)for(j=0;j<8;j++)s+='<rect x="'+(j*75+3)+'" y="'+(i*80+3)+'" width="69" height="74" fill="'+((i+j)%2?"#e2e8f0":"#cbd5e1")+'"/>'}
else if(k==="pintura"){s+='<rect width="600" height="400" fill="#d6c6a8"/><rect width="380" height="400" fill="#6f9bc4"/><rect y="360" width="600" height="40" fill="#f1f5f9"/><rect x="340" y="140" width="140" height="36" rx="8" fill="#e5e7eb"/><rect x="470" y="150" width="10" height="140" fill="#64748b"/>'}
else if(k==="telhado"){s+='<rect width="600" height="400" fill="#bae6fd"/>';for(i=0;i<7;i++)for(j=-1;j<8;j++)s+='<rect x="'+(j*90+(i%2?45:0))+'" y="'+(110+i*42)+'" width="86" height="46" rx="10" fill="'+((i+j)%2?"#b4532a":"#c2623a")+'"/>'}
else if(k==="muro"){s+='<rect width="600" height="400" fill="#bae6fd"/><rect y="300" width="600" height="100" fill="#d6d3d1"/>';for(i=0;i<5;i++)for(j=-1;j<7;j++)s+='<rect x="'+(j*100+(i%2?50:0)+2)+'" y="'+(118+i*36)+'" width="96" height="32" fill="'+((i+j)%2?"#9ca3af":"#8b929c")+'"/>';s+='<rect y="108" width="600" height="12" fill="#6b7280"/>'}
else if(k==="hidraulica"){s+='<rect width="600" height="400" fill="#e2e8f0"/>';for(i=1;i<10;i++)s+='<rect x="'+(i*60-1)+'" width="2" height="400" fill="#cbd5e1"/>';for(i=1;i<7;i++)s+='<rect y="'+(i*60-1)+'" width="600" height="2" fill="#cbd5e1"/>';s+='<rect x="80" y="60" width="22" height="300" fill="#3b82f6"/><rect x="80" y="60" width="300" height="22" fill="#3b82f6"/><rect x="358" y="60" width="22" height="180" fill="#3b82f6"/><rect x="170" y="180" width="22" height="180" fill="#ef4444"/><rect x="170" y="180" width="220" height="22" fill="#ef4444"/>'}
else{s+='<rect width="600" height="400" fill="#e2e8f0"/>';for(i=1;i<10;i++)s+='<rect x="'+(i*60-1)+'" width="2" height="400" fill="#cbd5e1"/>';s+='<rect x="140" y="40" width="320" height="340" fill="#bae6fd" fill-opacity=".55" stroke="#475569" stroke-width="6"/><rect x="420" y="190" width="8" height="60" fill="#475569"/><rect y="370" width="600" height="30" fill="#94a3b8"/>'}
s+='<rect width="600" height="400" fill="url(#g)"/><text x="590" y="388" text-anchor="end" font-family="sans-serif" font-size="14" fill="#fff" fill-opacity=".8">foto ilustrativa</text></svg>';
return "data:image/svg+xml,"+encodeURIComponent(s)}
function et(v,sts,fs){return ETAPAS.map(function(x,i){return {nome:x[0],valor:Math.round(v*x[1]),st:sts[i],fotos:(fs&&fs[i])||[]}})}
S.diretos=[
{id:"d1",cli:"Dona Marta",bairro:"Tiradentes",tipo:"Banheiro",desc:"Quero trocar o piso e o revestimento do banheiro do corredor e instalar um box novo. É um banheiro de 4 m². Vi o seu trabalho na casa da minha vizinha.",prazo:"Em até 1 mês",quando:"há 2 horas",f:[scene("tijolo")]},
{id:"d2",cli:"Sr. Roberto",bairro:"Jardim dos Estados",tipo:"Pintura",desc:"Pintar a fachada e o muro da casa, uns 120 m². A tinta eu já comprei.",prazo:"O quanto antes",quando:"ontem",f:[scene("pintura")]},
{id:"d3",cli:"Camila",bairro:"Vila Carvalho",tipo:"Cozinha",desc:"Reformar a cozinha: trocar o azulejo, a pia e arrumar a parte elétrica. A casa é antiga.",prazo:"Sem pressa",quando:"há 3 dias",f:[scene("cozinha")]}];
S.obras=[
{tipo:"Banheiro",emp:EMP[0],valor:6900,prazo:30,bairro:"Santa Fé",inicio:"28/10",rating:0,etapas:et(6900,["paga","paga","aprovar","aguarda"],{2:[scene("piso"),scene("box")]}),diario:[
{d:"28/10",a:"emp",t:"Obra iniciada. Demolição do revestimento antigo e retirada do piso.",f:[scene("tijolo")]},
{d:"04/11",a:"emp",t:"Tubulação nova de água fria e quente instalada. Teste de pressão feito, sem vazamento.",f:[scene("hidraulica")]},
{d:"11/11",a:"cli",t:"Pode seguir com o piso do mesmo tom que combinamos.",f:[]},
{d:"17/11",a:"emp",t:"Piso assentado e rejunte aplicado. Falta instalar o box. Pode conferir as fotos e aprovar a etapa 3.",f:[scene("piso"),scene("box")]}]},
{tipo:"Pintura",emp:EMP[1],valor:3000,prazo:15,bairro:"Santa Fé",inicio:"09/11",rating:0,etapas:et(3000,["paga","andamento","aguarda","aguarda"]),diario:[
{d:"09/11",a:"emp",t:"Lavagem e raspagem da fachada concluídas. Amanhã começa o selador.",f:[scene("tijolo")]},
{d:"13/11",a:"emp",t:"Selador e massa corrida aplicados nas partes com reboco novo.",f:[scene("pintura")]},
{d:"14/11",a:"cli",t:"Pode usar o azul que escolhi na amostra, o do meio.",f:[]}]},
{tipo:"Muro e calçada",emp:EMP[2],valor:5400,prazo:30,bairro:"Santa Fé",inicio:"15/09",rating:5,etapas:et(5400,["paga","paga","paga","paga"]),diario:[
{d:"15/09",a:"emp",t:"Fundação do muro concluída.",f:[scene("tijolo")]},
{d:"02/10",a:"emp",t:"Muro levantado e calçada concretada.",f:[scene("muro")]},
{d:"16/10",a:"sys",t:"Obra concluída. Todas as etapas foram pagas.",f:[]}]}];
function pagoPct(o){var t=0,p=0;o.etapas.forEach(function(e){t+=e.valor;if(e.st==="paga")p+=e.valor});return {p:p,t:t,pct:Math.round(p/t*100)}}
function pend(o){for(var i=0;i<o.etapas.length;i++)if(o.etapas[i].st==="aprovar")return i;return -1}
function obraSt(o){var pr=pagoPct(o),i=pend(o);return pr.p===pr.t?'<span class="chip ok">Concluída</span>':i>-1?'<span class="chip warn">Aprovar etapa '+(i+1)+'</span>':'<span class="chip acc">Em andamento</span>'}
function gal(a){return a&&a.length?'<div class="gal">'+a.map(function(s){return '<button type="button" class="gb" data-act="zoom" aria-label="Ampliar foto"><img src="'+s+'" alt="Foto da obra"></button>'}).join("")+'</div>':""}
function thumbs(a,t){return a.length?'<div class="gal">'+a.map(function(s,i){return '<div class="gb" style="cursor:default"><img src="'+s+'" alt="Foto anexada"><button type="button" class="rm" data-act="rmFoto" data-t="'+t+'" data-i="'+i+'" aria-label="Remover foto">×</button></div>'}).join("")+'</div>':""}
function fotoField(){return '<div class="fld"><span class="lab">Fotos do local <span class="hint">(opcional)</span></span>'+thumbs(S.f.fotos,"form")+'<button type="button" class="btn ghost" data-act="pick" data-t="form">'+ic("camera")+'Tirar ou escolher foto</button></div>'}
function shrink(file,cb){var r=new FileReader();r.onload=function(){var im=new Image();im.onload=function(){var k=Math.min(1,800/Math.max(im.width,im.height)),c=document.createElement("canvas");c.width=Math.round(im.width*k);c.height=Math.round(im.height*k);c.getContext("2d").drawImage(im,0,0,c.width,c.height);cb(c.toDataURL("image/jpeg",.75))};im.onerror=function(){cb(null)};im.src=r.result};r.onerror=function(){cb(null)};r.readAsDataURL(file)}

function price(e,tipo){return Math.round(6000*(TIPOS[tipo]||1)*e.f/50)*50}
function chips(k,opts,cur){return '<div class="choices">'+opts.map(function(o){return '<button type="button" class="ch" data-act="set" data-k="'+k+'" data-v="'+esc(o)+'" aria-pressed="'+(cur===o)+'">'+esc(o)+'</button>'}).join("")+'</div>'}
function back(to,label){return '<button type="button" class="back" data-act="go" data-v="'+to+'">'+ic("left",20)+(label||"Voltar")+'</button>'}

function dirs(){return S.diretos.concat(S.direct?[{id:"direto",cli:"Cliente que já conhece você",bairro:S.job.bairro||"Sua região",tipo:S.job.tipo,desc:S.job.desc,prazo:S.job.prazo,quando:"agora",f:S.job.fotos||[]}]:[])}


function vHome(){
var n=S.obras.filter(function(o){return pend(o)>-1}).length;
var ob=S.obras.map(function(o,i){var pr=pagoPct(o);return '<button type="button" class="path" style="gap:6px" data-act="abrir" data-v="'+i+'"><div style="display:flex;justify-content:space-between;gap:8px;width:100%;align-items:center"><span class="pt">'+esc(o.tipo)+' · '+esc(o.bairro)+'</span>'+obraSt(o)+'</div><span class="pd">'+esc(o.emp.nome)+' · '+money(o.valor)+'</span><div class="bar" style="width:100%"><i style="width:'+pr.pct+'%"></i></div><span class="m">'+pr.pct+'% pago · iniciada em '+o.inicio+'</span></button>'}).join("");
return '<h1 class="h2">Minhas obras</h1><p class="sub">'+(n?'Você tem '+n+(n>1?' etapas esperando':' etapa esperando')+' sua aprovação.':'Tudo em dia por aqui.')+'</p>'+ob+
'<div class="sec">Quero contratar uma obra</div>'+
'<button type="button" class="path" data-act="go" data-v="novo"><span class="pt"><span class="ico">'+ic("search",24)+'</span>Quero receber propostas</span><span class="pd">Conte o que precisa. Vários empreiteiros mandam o preço, e um não vê o preço do outro.</span><span class="chip acc">Você compara e escolhe</span></button>'+
'<button type="button" class="path" data-act="go" data-v="direto"><span class="pt"><span class="ico">'+ic("user",24)+'</span>Já tenho um empreiteiro</span><span class="pd">Peça o preço direto para quem você conhece e confia.</span></button>'}

function vNovo(){var f=S.f;
return back("home")+'<h1 class="h2">Descreva sua obra</h1><p class="sub">Quanto mais claro, mais certeira a proposta.</p>'+
'<div class="fld"><span class="lab">Tipo de serviço</span>'+chips("tipo",Object.keys(TIPOS),f.tipo)+'</div>'+
'<div class="fld"><label for="desc">O que precisa ser feito</label><textarea id="desc" data-bind="desc" placeholder="Ex.: trocar piso e revestimento, refazer o box e trocar as louças. Banheiro de 4 m².">'+esc(f.desc)+'</textarea></div>'+
'<div class="fld"><label for="bairro">Bairro</label><input type="text" id="bairro" data-bind="bairro" value="'+esc(f.bairro)+'" placeholder="Ex.: Tiradentes"></div>'+
'<div class="fld"><span class="lab">Prazo desejado</span>'+chips("prazo",PRAZOS,f.prazo)+'</div>'+
'<div class="fld"><span class="lab">Faixa de orçamento <span class="hint">(opcional)</span></span>'+chips("orc",ORCS,f.orc)+'</div>'+
''+fotoField()+''+
'<button type="button" class="btn lg block" data-act="postar">Receber propostas</button>'}

function propCard(p){var e=p.emp,i=S.props.indexOf(p);
return '<article class="prop"><div style="display:flex;justify-content:space-between;gap:8px;align-items:flex-start"><div><div class="t" style="font-size:16px">'+esc(e.nome)+'</div><div class="m">★ '+e.nota+' · '+e.obras+' obras concluídas · '+esc(e.bairro)+'</div></div>'+(e.ver?'<span class="chip ok">Verificado</span>':'<span class="chip">Novo</span>')+'</div>'+
'<div><div class="price">'+money(p.valor)+'</div><div class="m">mão de obra · prazo de '+p.prazo+' dias</div></div><div class="quote">“'+esc(e.msg)+'”</div>'+
'<button type="button" class="btn" data-act="ver" data-v="'+i+'">Ver proposta</button></article>'}

function vProps(){
var p=S.props.slice().sort(function(a,b){return S.sort==="preco"?a.valor-b.valor:b.emp.nota-a.emp.nota});
return back("home")+'<h1 class="h2">'+p.length+' propostas para '+esc(S.job.tipo.toLowerCase())+'</h1><p class="sub">Valores só de mão de obra, sem material. Só você vê estas propostas.</p>'+
'<div class="choices" style="margin-bottom:14px"><button type="button" class="ch" data-act="sort" data-v="preco" aria-pressed="'+(S.sort==="preco")+'">Menor preço</button><button type="button" class="ch" data-act="sort" data-v="nota" aria-pressed="'+(S.sort==="nota")+'">Melhor avaliação</button></div>'+
p.map(propCard).join("")+
'<button type="button" class="btn ghost lg block" data-act="go" data-v="direto">Prefiro pedir a um empreiteiro que já conheço</button>'}

function vProposta(){var p=S.sel,e=p.emp;
var rows=ETAPAS.map(function(x,i){return '<div class="row"><div class="grow"><div class="t">'+(i+1)+'. '+x[0]+'</div><div class="m">'+Math.round(x[1]*100)+'% do valor</div></div><div class="t">'+money(Math.round(p.valor*x[1]))+'</div></div>'}).join("");
return back(S.fromDirect?"diretoEnviado":"propostas")+'<h1 class="h2">'+esc(e.nome)+'</h1><p class="m" style="margin:0 0 14px">★ '+e.nota+' · '+e.obras+' obras concluídas · '+esc(e.bairro)+' '+(e.ver?'<span class="chip ok">Verificado</span>':'')+'</p>'+
'<div class="card"><div class="price">'+money(p.valor)+'</div><div class="m">mão de obra · prazo de '+p.prazo+' dias · material por conta do cliente</div></div>'+
'<div class="quote" style="margin-top:12px">“'+esc(e.msg)+'”</div>'+
'<div class="sec">Pagamento por etapa</div><p class="m" style="margin:0">Você só paga cada etapa depois de ver as fotos e aprovar.</p>'+rows+
'<div class="sec">Resumo do contrato</div><div class="card"><div class="opt" style="padding:2px 0">• Serviço: '+esc(S.job.tipo)+'</div><div class="opt" style="padding:2px 0">• Alterações só valem com aceite dos dois lados</div><div class="opt" style="padding:2px 0">• Garantia de 90 dias sobre o serviço</div><div class="opt" style="padding:2px 0">• Todo o histórico e as fotos ficam guardados</div></div>'+
'<label class="opt"><input type="checkbox" id="aceito"> Li o resumo e quero contratar</label>'+
'<button type="button" class="btn lg block" id="btnAprovar" data-act="aprovar" disabled>Aprovar e contratar</button>'}

function vContrato(){var c=S.obras[S.ob];
return '<h1 class="h2">Contrato gerado</h1><p class="sub">Esta é a versão que os dois lados assinam no aplicativo.</p>'+
'<div class="card"><div class="row"><div class="grow m">Contratante</div><div class="t">Você</div></div><div class="row"><div class="grow m">Contratado</div><div class="t">'+esc(c.emp.nome)+'</div></div><div class="row"><div class="grow m">Serviço</div><div class="t">'+esc(c.tipo)+'</div></div><div class="row"><div class="grow m">Local</div><div class="t">'+esc(c.bairro||"Informado no pedido")+'</div></div><div class="row"><div class="grow m">Valor da mão de obra</div><div class="t">'+money(c.valor)+'</div></div><div class="row"><div class="grow m">Prazo</div><div class="t">'+c.prazo+' dias</div></div></div>'+
'<div class="sec">O que vem agora</div><div class="stack"><div class="opt" style="padding:0">1. Você paga a entrada por Pix e a obra começa.</div><div class="opt" style="padding:0">2. A cada etapa concluída, você vê as fotos e aprova.</div><div class="opt" style="padding:0">3. Só depois de aprovar o pagamento da etapa é liberado.</div></div>'+
'<button type="button" class="btn lg block" data-act="go" data-v="obra">Ir para minha obra</button>'+
'<button type="button" class="btn ghost lg block" data-act="wa">Conversar com o empreiteiro</button>'}

function chipEt(s){return {aguarda:'<span class="chip">Aguardando</span>',andamento:'<span class="chip acc">Em andamento</span>',aprovar:'<span class="chip warn">Aprovar</span>',paga:'<span class="chip ok">Paga</span>'}[s]}
function entrada(x,o){var n=x.a==="emp"?o.emp.nome:x.a==="cli"?"Você":"ObraClara";return '<div class="card" style="margin-bottom:10px"><div style="display:flex;justify-content:space-between;gap:8px"><span class="t" style="font-size:14px">'+esc(n)+'</span><span class="m">'+x.d+'</span></div><div style="margin-top:4px">'+esc(x.t)+'</div>'+gal(x.f)+'</div>'}
function vObra(){var o=S.obras[S.ob],pr=pagoPct(o),done=pr.p===pr.t;
var rows=o.etapas.map(function(e,i){var act="";
if(e.st==="aprovar")act=gal(e.fotos)+'<button type="button" class="btn block" data-act="pagar" data-v="'+i+'">'+ic("check")+(i===0?'Pagar entrada':'Aprovar e pagar')+' '+money(e.valor)+'</button>';
if(e.st==="andamento")act='<button type="button" class="btn ghost block" data-act="concluir" data-v="'+i+'">Demonstração: empreiteiro terminou esta etapa</button>';
return '<div class="card" style="margin-bottom:10px'+(e.st==="aprovar"?';border:1.5px solid var(--accent)':'')+'"><div style="display:flex;justify-content:space-between;gap:8px;align-items:center"><div><div class="t">'+(i+1)+'. '+e.nome+'</div><div class="m">'+money(e.valor)+'</div></div>'+chipEt(e.st)+'</div>'+act+'</div>'}).join("");
var fim=done?'<div class="card" style="border:1.5px solid var(--ok);margin-bottom:12px"><div class="t">Obra concluída</div><div class="m" style="margin-bottom:8px">Como foi com '+esc(o.emp.nome)+'?</div><div class="choices">'+[1,2,3,4,5].map(function(n){return '<button type="button" class="star" data-act="star" data-v="'+n+'" aria-label="'+n+' estrelas" aria-pressed="'+(o.rating>=n)+'">★</button>'}).join("")+'</div>'+(o.rating?'<div class="m" style="margin-top:8px">Avaliação registrada. Ela aparece para os próximos clientes.</div>':'')+'</div>':'';
var comp='<div class="card" style="margin-bottom:12px"><div class="fld" style="margin-bottom:8px"><label for="msg">Escrever ao empreiteiro</label><textarea id="msg" data-bind="msg" style="min-height:64px" placeholder="Pergunte, combine ou mande uma foto.">'+esc(S.msgTxt)+'</textarea></div>'+thumbs(S.msgFotos,"msg")+'<div class="dbtns"><button type="button" class="btn ghost" data-act="pick" data-t="msg">'+ic("camera")+'Foto</button><button type="button" class="btn" data-act="enviarMsg">'+ic("send")+'Enviar</button></div></div>';
return back("home","Minhas obras")+'<h1 class="h2">'+esc(o.tipo)+'</h1><p class="sub">com '+esc(o.emp.nome)+' · '+esc(o.bairro)+' · iniciada em '+o.inicio+'</p>'+
'<div class="card" style="margin-bottom:12px"><div style="display:flex;justify-content:space-between"><span class="t">Pago '+money(pr.p)+'</span><span class="m">de '+money(pr.t)+' · '+pr.pct+'%</span></div><div class="bar" style="margin-top:8px"><i style="width:'+pr.pct+'%"></i></div></div>'+
'<div class="sec" style="margin-top:4px">Etapas e pagamentos</div>'+rows+fim+
'<div class="sec">Diário da obra</div>'+comp+o.diario.slice().reverse().map(function(x){return entrada(x,o)}).join("")}

function vDireto(){var f=S.f,meus=[EMP[0],EMP[1]];
return back("home")+'<h1 class="h2">Peça um orçamento</h1><p class="sub">Para quem você já conhece e confia. Ele recebe um link no WhatsApp e responde sem cadastro.</p>'+
'<div class="fld"><span class="lab">Para quem</span><div class="choices">'+meus.map(function(e){return '<button type="button" class="ch" data-act="set" data-k="ep" data-v="'+e.id+'" aria-pressed="'+(f.ep===e.id)+'">'+esc(e.nome)+'</button>'}).join("")+'<button type="button" class="ch" data-act="set" data-k="ep" data-v="outro" aria-pressed="'+(f.ep==="outro")+'">Outro</button></div></div>'+
(f.ep==="outro"?'<div class="fld"><label for="outro">Nome ou WhatsApp do empreiteiro</label><input type="text" id="outro" data-bind="outro" value="'+esc(f.outro)+'" placeholder="Ex.: João Pedreiro"></div>':'')+
'<div class="fld"><span class="lab">Tipo de serviço</span>'+chips("tipo",Object.keys(TIPOS),f.tipo)+'</div>'+
'<div class="fld"><label for="desc">O que precisa ser feito</label><textarea id="desc" data-bind="desc" placeholder="Descreva o serviço.">'+esc(f.desc)+'</textarea></div>'+fotoField()+
'<button type="button" class="btn lg block" data-act="enviarDireto">'+ic("send")+'Enviar pedido de orçamento</button>'}

function vDiretoEnviado(){var d=S.direct,R=S.directResp;
var resp=R?'<div class="card" style="border:1.5px solid var(--ok);margin-bottom:12px"><div class="t">'+esc(d.nome)+' respondeu</div><div class="price" style="margin:6px 0">'+money(R.valor)+'</div><div class="m">mão de obra · prazo de '+R.prazo+' dias</div><button type="button" class="btn block" data-act="verResp">'+ic("doc")+'Ver proposta</button></div>':
'<div class="card" style="margin-bottom:12px"><span class="chip warn">Aguardando resposta</span><p class="m" style="margin:8px 0 0">Você é avisado assim que '+esc(d.nome)+' responder.</p></div>';
return '<h1 class="h2">Pedido enviado</h1><p class="sub">Para '+esc(d.nome)+'. Ele recebe um link e responde sem precisar de cadastro.</p>'+resp+
'<div class="card" style="margin-bottom:12px"><div class="t">'+esc(S.job.tipo)+'</div><div class="m">'+esc(S.job.desc)+'</div>'+gal(S.job.fotos)+'</div>'+
(R?'':'<div class="sec" style="margin-top:6px">Mensagem enviada por WhatsApp</div><div class="card" style="margin-bottom:12px"><div class="m" style="color:var(--fg)">Olá, '+esc(d.nome.split(" ")[0])+'! Preciso de um orçamento de '+esc(S.job.tipo.toLowerCase())+'. Veja os detalhes e responda por aqui: <b style="color:var(--accent);word-break:break-all">'+esc(lk("direto"))+'</b></div></div><a class="btn lg block" href="https://wa.me/?text='+encodeURIComponent("Olá, "+d.nome.split(" ")[0]+"! Preciso de um orçamento de "+S.job.tipo.toLowerCase()+". Veja os detalhes e responda por aqui: "+lk("direto"))+'" target="_blank" rel="noopener">'+ic("send")+'Mandar no WhatsApp</a><button type="button" class="btn ghost lg block" data-act="verComoEmp">'+ic("wrench")+'Demonstração: abrir o link como o empreiteiro</button>')+
'<button type="button" class="btn ghost lg block" data-act="go" data-v="home">Voltar às minhas obras</button>'}

function leads(){
var l=[{id:"l1",tipo:"Cozinha",bairro:"Santa Fé",desc:"Trocar bancada e revestimento e refazer a parte elétrica. Cozinha de 9 m².",prazo:"Em até 1 mês",orc:"R$ 5 a 15 mil",n:2,f:[scene("cozinha")]},
{id:"l2",tipo:"Pintura",bairro:"Centro",desc:"Pintura interna de apartamento de 70 m², paredes e teto.",prazo:"O quanto antes",orc:"Até R$ 5 mil",n:1,f:[scene("pintura")]},
{id:"l3",tipo:"Muro e calçada",bairro:"Moreninhas",desc:"Levantar 18 metros de muro e fazer a calçada da frente.",prazo:"Sem pressa",orc:"Sem faixa definida",n:0}];
if(S.job&&S.props.length)l.unshift({id:"novo",tipo:S.job.tipo,bairro:S.job.bairro||"Sua região",desc:S.job.desc,prazo:S.job.prazo,orc:S.job.orc,n:S.props.length,seu:1,f:S.job.fotos});
return l}
function vEmp(){
if(S.eScr==="ok")return '<h1 class="h2">Proposta enviada</h1><p class="sub">O cliente vê o seu valor, e só ele. Você é avisado quando ele escolher.</p>'+(S.eSel==="direto"?'<button type="button" class="btn lg block" data-act="verComoCli">'+ic("home")+'Demonstração: ver o que o cliente recebeu</button>':'')+'<button type="button" class="btn ghost lg block" data-act="eVoltar">Ver outros pedidos</button>';
if(S.eScr==="form"){var D=dirs().filter(function(x){return x.id===S.eSel})[0],L=D||leads().filter(function(x){return x.id===S.eSel})[0]||{tipo:S.job?S.job.tipo:"Serviço",bairro:S.job?S.job.bairro:"",desc:S.job?S.job.desc:"",f:S.job?S.job.fotos:[]};
return '<button type="button" class="back" data-act="eVoltar">'+ic("left",20)+'Voltar</button><h1 class="h2">'+(D?'Pedido direto para você':'Sua proposta')+'</h1>'+(D?'<p class="sub">'+esc(D.cli)+' pediu o seu preço, só para você. Nenhum outro empreiteiro vê este pedido.</p>':'')+'<div class="card" style="margin-bottom:16px"><div class="t">'+esc(L.tipo)+' · '+esc(L.bairro||"Sua região")+'</div><div class="m">'+esc(L.desc)+'</div>'+gal(L.f)+'</div>'+
'<div class="fld"><label for="ev">Valor da mão de obra (R$)</label><input type="text" id="ev" inputmode="decimal" data-bind="ev" value="'+esc(S.ef.valor)+'" placeholder="Ex.: 5.500"></div>'+
'<div class="fld"><label for="ep">Prazo em dias</label><input type="text" id="ep" inputmode="numeric" data-bind="ep2" value="'+esc(S.ef.prazo)+'" placeholder="Ex.: 20"></div>'+
'<div class="fld"><span class="lab">Material</span>'+chips("mat",["Material por conta do cliente","Material incluso"],S.ef.mat)+'</div>'+
'<div class="fld"><label for="em">Mensagem ao cliente</label><textarea id="em" data-bind="em" placeholder="Apresente sua equipe e o que está incluso.">'+esc(S.ef.msg)+'</textarea></div>'+
'<button type="button" class="btn lg block" data-act="eEnviar">Enviar proposta</button>'}
var DR=dirs(),ds='<div class="sec" style="margin-top:0">Pedidos para você</div><p class="m" style="margin:0 0 10px">Clientes que pediram o seu preço direto. Só você recebe estes pedidos.</p>'+DR.map(function(d){return '<article class="prop" style="border:1.5px solid var(--accent)"><div style="display:flex;justify-content:space-between;gap:8px;align-items:center"><span class="chip acc">Pedido direto</span><span class="m">'+esc(d.quando)+'</span></div><div class="t">'+esc(d.cli)+' · '+esc(d.bairro)+'</div><div>'+esc(d.tipo)+': '+esc(d.desc)+'</div><div class="m">Prazo: '+esc(d.prazo)+'</div>'+gal(d.f)+(S.eSent[d.id]?'<span class="chip ok" style="align-self:flex-start">Proposta enviada</span>':'<button type="button" class="btn" data-act="eAbrir" data-v="'+d.id+'">'+ic("send")+'Responder com meu preço</button>')+'</article>'}).join("");
var mine=S.obras.map(function(o,i){var pr=pagoPct(o);return pr.p===pr.t||o.emp.id!=="e1"?"":'<article class="prop"><div style="display:flex;justify-content:space-between;gap:8px"><span class="chip acc">'+esc(o.tipo)+'</span><span class="m">'+esc(o.bairro)+'</span></div><div class="t">'+money(o.valor)+' · '+pr.pct+'% recebido</div><div class="m">Cliente de exemplo · '+etapaAtual(o)+'</div><button type="button" class="btn" data-act="pick" data-t="emp" data-ob="'+i+'">'+ic("camera")+'Postar foto de andamento</button></article>'}).join("");
if(S.tab==="andamento")return '<h1 class="h2">Obras em andamento</h1><p class="sub">Suas obras contratadas. A foto que você posta aparece na hora no diário da obra do cliente.</p>'+mine+(S.outras||[]).map(function(o){return '<article class="prop"><div style="display:flex;justify-content:space-between;gap:8px"><span class="chip acc">'+esc(o.tipo)+'</span><span class="m">'+esc(o.bairro)+'</span></div><div class="t">'+money(o.valor)+' · '+o.pct+'% recebido</div><div class="m">'+esc(o.cli)+' · Etapa atual: '+esc(o.etapa)+'</div></article>'}).join("");
if(S.tab==="diretos")return '<h1 class="h2">Pedidos para você</h1><p class="sub">Clientes que pediram o seu preço direto. Nenhum outro empreiteiro vê estes pedidos.</p>'+ds.replace(/^<div class="sec"[^>]*>Pedidos para você<\/div><p class="m"[^>]*>[^<]*<\/p>/,"")+(DR.length?'':'<div class="card">Nenhum pedido direto por enquanto.</div>');
return '<h1 class="h2">Pedidos na sua região</h1><p class="sub">Você manda o valor da mão de obra. O cliente compara, e você não vê o preço dos concorrentes.</p>'+
leads().map(function(x){return '<article class="prop"><div style="display:flex;justify-content:space-between;gap:8px"><span class="chip acc">'+esc(x.tipo)+'</span><span class="m">'+esc(x.bairro)+'</span></div><div>'+esc(x.desc)+'</div><div class="m">'+esc(x.prazo)+' · '+esc(x.orc)+' · '+(x.n?x.n+' propostas enviadas':'Nenhuma proposta ainda')+'</div>'+gal(x.f)+(S.eSent[x.id]?'<span class="chip ok" style="align-self:flex-start">Proposta enviada</span>':'<button type="button" class="btn" data-act="eAbrir" data-v="'+x.id+'">'+(x.seu?'Enviar proposta (pedido que você criou)':'Enviar proposta')+'</button>')+'</article>'}).join("")}

function vOp(){
var h='<h1 class="h2">Sua opinião</h1><p class="sub">Leva dois minutos. Suas respostas ajudam a decidir se esse serviço vale a pena ser feito.</p>';
QO.forEach(function(q){h+='<div class="fld"><span class="lab">'+q.t+'</span>'+(q.txt?'<textarea id="'+q.k+'" data-bind="op_'+q.k+'" placeholder="Escreva aqui.">'+esc(S.op[q.k]||"")+'</textarea>':'<div class="choices">'+q.o.map(function(o){var on=q.m?(S.op[q.k]||[]).indexOf(o)>-1:S.op[q.k]===o;return '<button type="button" class="ch" data-act="op" data-k="'+q.k+'" data-m="'+(q.m?1:0)+'" data-v="'+esc(o)+'" aria-pressed="'+on+'">'+esc(o)+'</button>'}).join("")+'</div>')+'</div>'});
h+='<button type="button" class="btn lg block" data-act="gerar">Gerar minhas respostas</button>';
if(S.opOut)h+='<div class="fld" style="margin-top:16px"><label for="out">Copie e mande para quem te enviou este protótipo</label><textarea class="out" id="out" readonly>'+esc(S.opOut)+'</textarea><button type="button" class="btn ghost lg" data-act="copiar">Copiar respostas</button></div>';
return h}

var KEY="obraclara-v1",USERS={cliente:{role:"cli",nome:"Cliente"},silva:{role:"emp",nome:"Reformas Silva"}},ETABS=["andamento","regiao","diretos"];
function lk(id){return location.origin+location.pathname+"?pedido="+id}
function chip(t,k){return '<span class="chip '+(k||"")+'">'+t+'</span>'}
function save(){if(S.noSave)return;try{var c={};Object.keys(S).forEach(function(k){if(["user","page","lu","lp","pid","noSave"].indexOf(k)<0)c[k]=S[k]});localStorage.setItem(KEY,JSON.stringify(c))}catch(e){if(!save.w){save.w=1;toast("A memória do navegador encheu. As últimas fotos podem não ficar salvas.")}}}
function load(){try{var d=JSON.parse(localStorage.getItem(KEY)||"null");if(d&&d.obras)Object.keys(d).forEach(function(k){S[k]=d[k]})}catch(e){}}
function getSess(){try{return JSON.parse(localStorage.getItem(KEY+"-sessao")||"null")}catch(e){return null}}
function etapaAtual(o){var e=o.etapas.filter(function(x){return x.st!=="paga"})[0];return e?"Etapa atual: "+e.nome+(e.st==="aprovar"?", esperando o cliente aprovar":""):"Todas as etapas pagas"}
function vLogin(){return Shell.bar({title:"ObraClara",sub:"Demonstração",right:Shell.hub()})+
'<h1 class="h2">Entrar</h1><p class="sub">Para quem está reformando e para quem faz a obra.</p>'+
'<div class="fld"><label for="lu">Usuário</label><input type="text" id="lu" data-bind="lu" autocomplete="username" autocapitalize="none" value="'+esc(S.lu||"")+'"></div>'+
'<div class="fld"><label for="lp">Senha</label><input type="password" id="lp" data-bind="lp" autocomplete="current-password" value="'+esc(S.lp||"")+'"></div>'+
'<button type="button" class="btn lg block" data-act="login">'+ic("check")+'Entrar</button>'+
'<div class="card" style="margin-top:16px"><div class="t">Acessos de demonstração</div><div class="m" style="margin-bottom:10px">Toque para preencher. A senha dos dois é <b>demo</b>.</div><div class="choices">'+[["cliente","Cliente (dono da obra)"],["silva","Empreiteiro · Reformas Silva"]].map(function(x){return '<button type="button" class="ch" data-act="fillLogin" data-v="'+x[0]+'">'+x[1]+'</button>'}).join("")+'</div></div>'+
'<div class="sec">Recebeu um pedido de orçamento?</div><p class="m" style="margin:0 0 10px">O empreiteiro abre o link que chega pelo WhatsApp e manda o preço sem criar conta.</p><a class="bigact" href="?pedido=d1"><span class="ico">'+ic("wrench",24)+'</span><span>Ver um pedido de exemplo<small>Como o empreiteiro recebe</small></span></a>'+Shell.installHint()}
function vPedido(){var D=dirs().filter(function(x){return x.id===S.pid})[0],h=Shell.bar({title:"ObraClara",sub:"Pedido de orçamento"}),who=D&&D.id==="direto"?"o cliente":D?esc(D.cli):"";
if(!D)return h+'<h1 class="h2">Pedido não encontrado</h1><p class="sub">Confira o link. Nesta demonstração, cada aparelho guarda os próprios dados: um pedido feito em outro celular não aparece aqui.</p><a class="btn lg block" href="?pedido=d1">Ver o pedido de exemplo</a>';
if(S.eScr==="ok"&&S.eSel===D.id)return h+'<h1 class="h2">Proposta enviada</h1><p class="sub">'+(D.id==="direto"?"O cliente":esc(D.cli))+' recebe agora e vê só o seu valor. Você é avisado quando ele escolher.</p>'+(D.id==="direto"?'<a class="btn lg block" href="./">'+ic("home")+'Demonstração: ver o que o cliente recebeu</a>':'')+
'<div class="card" style="margin-top:12px"><div class="t">Quer receber mais pedidos assim?</div><div class="m" style="margin-bottom:10px">Com uma conta grátis você recebe pedidos da sua região, manda fotos da obra e recebe por etapa.</div><a class="btn ghost block" href="./?u=silva">Criar minha conta grátis</a></div>';
if(S.eSent[D.id])return h+'<h1 class="h2">Você já mandou sua proposta</h1><p class="sub">'+(D.id==="direto"?"O cliente":esc(D.cli))+' já recebeu o seu valor para este pedido.</p><a class="btn ghost lg block" href="./?u=silva">Entrar como empreiteiro</a>';
S.eSel=D.id;S.eScr="form";
return h+'<div class="banner">Não precisa baixar nada nem criar conta. Só '+who+' vê o seu preço.</div>'+vEmp().replace(/^<button type="button" class="back" data-act="eVoltar">[\s\S]*?<\/button>/,"")}
function head(){var u=S.user,emp=u.role==="emp";return Shell.bar({title:"ObraClara",sub:emp?"Reformas Silva · empreiteiro":"Minhas obras",user:{name:emp?"Reformas Silva":"Cliente",role:emp?"Empreiteiro":"Dono da obra"},items:[{label:"Dar opinião",icon:"chat",run:function(){A.tab({v:"opiniao"})}}]})}
function foot(){if(S.user.role==="emp"){var n=dirs().filter(function(d){return !S.eSent[d.id]}).length;return nav([["andamento","Em andamento","hammer"],["regiao","Na região","pin"],["diretos","Para você","user",n||""]],S.tab)}
return nav([["cliente","Minhas obras","home"],["opiniao","Opinião","chat"]],S.tab)}
function view(){if(S.page==="login")return vLogin();if(S.page==="pedido")return vPedido();
var b;
if(S.tab==="opiniao")b=vOp();
else if(ETABS.indexOf(S.tab)>-1)b=vEmp();
else b={home:vHome,novo:vNovo,propostas:vProps,proposta:vProposta,contrato:vContrato,obra:vObra,direto:vDireto,diretoEnviado:vDiretoEnviado}[S.scr]();
return head()+b+foot()}
function render(){render0();Shell.after()}
function render0(){$("#app").innerHTML=view()}
function top(){window.scrollTo(0,0)}
function mk(e){return {emp:e,valor:price(e,S.job.tipo),prazo:e.prazo}}

var A={
tab:function(d){S.tab=d.v;S.eScr="lista";if(d.v==="cliente"&&S.scr!=="diretoEnviado"&&S.scr!=="obra")S.scr="home";try{history.replaceState(history.state,"","#"+d.v)}catch(e){}render();top()},
go:function(d){S.scr=d.v;render();top()},
set:function(d){if(d.k==="mat")S.ef.mat=d.v;else S.f[d.k]=d.v;render()},
sort:function(d){S.sort=d.v;render()},
postar:function(){if((S.f.desc||"").trim().length<10){toast("Descreva o que precisa ser feito, em uma frase pelo menos.");return}
S.job={tipo:S.f.tipo,desc:S.f.desc.trim(),bairro:S.f.bairro.trim(),prazo:S.f.prazo,orc:S.f.orc,fotos:S.f.fotos.slice()};S.fromDirect=false;S.props=EMP.map(mk);S.scr="propostas";render();top()},
ver:function(d){S.sel=S.props[+d.v];S.scr="proposta";render();top()},
abrir:function(d){S.ob=+d.v;S.scr="obra";render();top()},
aprovar:function(){var j=S.job,c=S.sel;S.obras.push({tipo:j.tipo,emp:c.emp,valor:c.valor,prazo:c.prazo,bairro:j.bairro||"Sua região",inicio:HOJE,rating:0,etapas:et(c.valor,["aprovar","aguarda","aguarda","aguarda"]),diario:[{d:HOJE,a:"sys",t:"Contrato assinado pelos dois lados. A obra começa quando a entrada for paga.",f:j.fotos||[]}]});S.ob=S.obras.length-1;S.scr="contrato";render();top()},
wa:function(){toast("No sistema real, abre a conversa com o empreiteiro.")},
pagar:function(d){var o=S.obras[S.ob],i=+d.v,e=o.etapas[i],nx=o.etapas[i+1];e.st="paga";if(nx)nx.st="andamento";o.diario.push({d:HOJE,a:"sys",t:(i===0?"Entrada":"Etapa "+(i+1))+" paga por Pix: "+money(e.valor)+(nx?". Etapa "+(i+2)+" liberada.":". Obra concluída."),f:[]});toast("Pix de "+money(e.valor)+" enviado (simulação)");render()},
concluir:function(d){var o=S.obras[S.ob],e=o.etapas[+d.v],k=KIND[o.tipo]||"tijolo";e.st="aprovar";e.fotos=[scene(k),scene(k==="tijolo"?"hidraulica":"tijolo")];o.diario.push({d:HOJE,a:"emp",t:"Etapa "+(+d.v+1)+" concluída. Fotos enviadas para sua aprovação.",f:e.fotos});render()},
star:function(d){S.obras[S.ob].rating=+d.v;render()},
zoom:function(d,el){$("#dzimg").src=el.querySelector("img").src;$("#dz").showModal()},
fechar:function(){$("#dz").close()},
pick:function(d){S.pick={t:d.t,ob:d.ob};$("#file").click()},
rmFoto:function(d){(d.t==="form"?S.f.fotos:S.msgFotos).splice(+d.i,1);render()},
enviarMsg:function(){var o=S.obras[S.ob];if(!S.msgTxt.trim()&&!S.msgFotos.length){toast("Escreva algo ou anexe uma foto.");return}
o.diario.push({d:HOJE,a:"cli",t:S.msgTxt.trim()||"Foto enviada.",f:S.msgFotos});S.msgTxt="";S.msgFotos=[];render();var oi=S.ob;setTimeout(function(){o.diario.push({d:HOJE,a:"emp",t:"Recebido. Qualquer dúvida, é só chamar por aqui.",f:[]});if(S.ob===oi&&S.scr==="obra"&&S.tab==="cliente")render()},1500)},
enviarDireto:function(){var f=S.f;if(f.desc.trim().length<10){toast("Descreva o serviço em uma frase pelo menos.");return}
var e=EMP.filter(function(x){return x.id===f.ep})[0];if(f.ep==="outro"){if(!f.outro.trim()){toast("Informe o nome ou o WhatsApp do empreiteiro.");return}e={id:"x",nome:f.outro.trim(),nota:4.8,obras:30,bairro:"Sua região",ver:false,f:1,prazo:20,msg:"Obrigado por pensar em mim. Segue meu orçamento."}}
S.job={tipo:f.tipo,desc:f.desc.trim(),bairro:f.bairro.trim(),prazo:f.prazo,orc:f.orc,fotos:f.fotos.slice()};S.direct=e;S.directResp=null;S.eSent.direto=false;S.props=[];S.scr="diretoEnviado";render();top()},
verResp:function(){S.sel=S.directResp;S.fromDirect=true;S.scr="proposta";render();top()},
verComoEmp:function(){S.eScr="lista";S.ef={valor:"",prazo:"",msg:"",mat:S.ef.mat};save();location.href=location.pathname+"?pedido=direto"},
verComoCli:function(){S.scr="diretoEnviado";S.eScr="lista";save();location.href=location.pathname},
fillLogin:function(d){S.lu=d.v;S.lp="demo";render()},
login:function(){var u=USERS[String(S.lu||"").trim().toLowerCase()];if(!u||String(S.lp||"").trim()!=="demo"){toast("Usuário ou senha não conferem. Use um dos acessos de demonstração.");return}
S.user=u;try{localStorage.setItem(KEY+"-sessao",JSON.stringify(u))}catch(e){}S.page="app";S.tab=u.role==="emp"?"andamento":"cliente";S.eScr="lista";if(u.role==="emp")S.eSel=null;render();top()},
eAbrir:function(d){S.eSel=d.v;S.eScr="form";S.ef={valor:"",prazo:"",msg:"",mat:S.ef.mat};render();top()},
eVoltar:function(){S.eScr="lista";render();top()},
eEnviar:function(){var v=num(S.ef.valor),p=num(S.ef.prazo);if(v<=0||p<=0){toast("Informe o valor e o prazo em dias.");return}
S.eSent[S.eSel]=true;if(S.eSel==="direto")S.directResp={emp:Object.assign({},S.direct,{msg:S.ef.msg||S.direct.msg}),valor:v,prazo:p};if(S.eSel==="novo")S.props.push({emp:{id:"voce",nome:"Você (proposta de teste)",nota:5,obras:12,bairro:"Sua região",ver:true,msg:S.ef.msg||"Proposta enviada pelo lado do empreiteiro."},valor:v,prazo:p});
S.eScr="ok";render();top()},
op:function(d){var k=d.k;if(d.m==="1"){var a=S.op[k]||[],i=a.indexOf(d.v);if(i>-1)a.splice(i,1);else a.push(d.v);S.op[k]=a}else S.op[k]=d.v;render()},
gerar:function(){var t="ObraClara, minhas respostas:\n";QO.forEach(function(q){var v=S.op[q.k];if(v&&v.length)t+="\n"+q.t+"\n"+(Array.isArray(v)?v.join("; "):v)+"\n"});if(t.length<40){toast("Responda pelo menos uma pergunta.");return}S.opOut=t;render();var o=$("#out");if(o)o.scrollIntoView({block:"center"})},
copiar:function(){var o=$("#out");function sel(){o.focus();o.select();toast("Selecione e copie o texto.")}
if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(S.opOut).then(function(){toast("Respostas copiadas.")},sel);else sel()}
};
document.addEventListener("click",function(e){var a=e.target.closest("[data-act]");if(!a)return;var f=A[a.dataset.act];if(f){f(a.dataset,a);save()}});
document.addEventListener("input",function(e){var k=e.target.dataset&&e.target.dataset.bind;if(!k)return;var v=e.target.value;
if(k==="lu")S.lu=v;else if(k==="lp")S.lp=v;else if(k==="ev")S.ef.valor=v;else if(k==="ep2")S.ef.prazo=v;else if(k==="em")S.ef.msg=v;else if(k==="msg")S.msgTxt=v;else if(k.indexOf("op_")===0)S.op[k.slice(3)]=v;else S.f[k]=v});
$("#file").addEventListener("change",function(){var p=S.pick,fl=this,fs=Array.prototype.slice.call(fl.files,0,4),out=[],n=fs.length;if(!p||!n){fl.value="";return}
fs.forEach(function(f){shrink(f,function(u){if(u)out.push(u);if(--n)return;if(!out.length){toast("Não consegui abrir a imagem.");return}
if(p.t==="form")S.f.fotos=S.f.fotos.concat(out).slice(0,6);else if(p.t==="msg")S.msgFotos=S.msgFotos.concat(out).slice(0,4);else{S.obras[+p.ob].diario.push({d:HOJE,a:"emp",t:"Atualização de andamento.",f:out});toast("Foto enviada. Ela aparece no diário da obra do cliente.")}
render();save()});});fl.value=""});
document.addEventListener("change",function(e){if(e.target.id==="aceito")$("#btnAprovar").disabled=!e.target.checked});
S.outras=[{tipo:"Cozinha",cli:"Sr. Paulo",bairro:"Centro",valor:8400,pct:50,etapa:"Execução, revestimento da parede"},{tipo:"Telhado",cli:"Dona Lúcia",bairro:"Vila Nova",valor:5200,pct:20,etapa:"Entrada e mobilização, troca das telhas quebradas"}];
load();
var qs=new URLSearchParams(location.search),sess=getSess();S.user=sess;
if(qs.get("u"))S.lu=qs.get("u");
if(qs.get("pedido")){S.page="pedido";S.pid=qs.get("pedido")}
else if(sess){S.page="app";var h0=location.hash.slice(1);if(sess.role==="emp"){S.tab=ETABS.indexOf(h0)>-1?h0:ETABS.indexOf(S.tab)>-1?S.tab:"andamento";if(S.eScr!=="form")S.eScr="lista"}else S.tab=h0==="opiniao"?h0:"cliente"}
else S.page="login";
Shell.init({render:render,onReset:function(){try{localStorage.removeItem(KEY)}catch(e){}S.noSave=1;location.href=location.pathname},onLogout:function(){try{localStorage.removeItem(KEY+"-sessao")}catch(e){}save();S.noSave=1;location.href=location.pathname}});
render();
document.addEventListener("keydown",function(e){if(e.key==="Enter"&&(e.target.id==="lp"||e.target.id==="lu"))A.login()});
if("serviceWorker" in navigator&&location.protocol==="https:")navigator.serviceWorker.register("sw.js").catch(function(){});
})();
