/* sanaescencia · Catálogo, orientación y pedidos. Sin cobros en la web. */
(function () {
  'use strict';
  const WA_NUMBER = '51947720840', STORAGE_KEY = 'bh_cart', MAX_QTY = 99;
  const CAPSULES = [
    { id:'relaxaplus', name:'RelaxaPlus', price:130, content:'60 cápsulas', focus:'Tu momento de calma', desc:'Conoce esta presentación de nuestra selección para tu rutina de bienestar.' },
    { id:'ashwagandha', name:'Ashwagandha', price:110, content:'90 cápsulas', focus:'Tu pausa diaria', desc:'Ashwagandha en cápsulas. Solicita la composición completa y las precauciones de esta presentación.' },
    { id:'dormicalm', name:'Dormicalm', price:110, content:'60 cápsulas', focus:'Tu ritual de noche', desc:'Una presentación de nuestra selección para conocer dentro de tu rutina nocturna. Consulta si es adecuada para ti.' },
    { id:'citrato', name:'Citrato de Magnesio', price:100, content:'120 cápsulas', focus:'Tu rutina de bienestar', desc:'Citrato de magnesio en cápsulas. Consulta el etiquetado y la cantidad de magnesio por porción antes de elegir.' },
    { id:'vitalmind', name:'VitalMind', price:130, content:'60 cápsulas', focus:'Tu espacio de enfoque', desc:'Conoce los ingredientes de VitalMind y resuelve tus dudas sobre esta presentación antes de comprar.' },
    { id:'artiforte', name:'ArtiForte+', price:110, content:'90 cápsulas', focus:'Tu bienestar físico', desc:'Conoce la presentación de ArtiForte+ y consulta su composición, modo de uso y precauciones.' },
    { id:'tiroidbalance', name:'TiroidBalance', price:130, content:'60 cápsulas', focus:'Elección con orientación', desc:'Consulta la composición de TiroidBalance con un profesional de salud antes de consumirlo, especialmente si tienes una condición tiroidea. No sustituye un tratamiento indicado.' }
  ].map(p => ({ ...p, img:'img/' + p.id + '.webp', line:'Selección en cápsulas' }));
  const CATALOG = window.CATALOG || [];
  const PRODUCTS = new Map([...CAPSULES, ...CATALOG].map(p => [p.id, p]));
  const $ = id => document.getElementById(id);
  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const money = value => 'S/ ' + value.toLocaleString('es-PE');
  const wa = message => 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(message);
  function card(p, gummy = false, extra = false) {
    const name = esc(p.name), id = esc(p.id);
    return `<article class="product-card${extra ? ' product-card--extra' : ''}"${extra ? ' hidden' : ''} data-id="${id}"><button class="product-card__media js-detail" data-id="${id}" aria-label="Ver detalles de ${name}"><img src="${esc(p.img)}" alt="${name}, ${esc(p.content)}" width="720" height="${gummy ? '720' : '960'}" loading="lazy" decoding="async"><span class="product-card__tag">${esc(p.content)}</span><span class="product-card__view" aria-hidden="true">↗</span></button><div class="product-card__body"><span class="product-card__line">${esc(gummy ? p.cat : p.focus)}</span><h3 class="product-card__name"><button class="js-detail" data-id="${id}">${name}</button></h3><p class="product-card__desc">${gummy ? esc(p.summary || 'Presentación en gomitas.') : esc(p.content) + ' · Selección sanaescencia'}</p><div class="product-card__buy"><span class="price-now">${money(p.price)}</span><button class="add-button js-add" data-id="${id}" aria-label="Agregar ${name} a mi pedido">Agregar <span aria-hidden="true">+</span></button></div></div></article>`;
  }
  $('productsGrid').innerHTML = CAPSULES.map((p,i) => card(p,false,i>3)).join('');
  $('compareBody').innerHTML = CAPSULES.map(p => `<tr><th scope="row">${esc(p.name)}</th><td>${esc(p.content)}</td><td>${money(p.price)}</td><td><button class="add-button js-add" data-id="${esc(p.id)}" aria-label="Agregar ${esc(p.name)} a mi pedido">Agregar <span aria-hidden="true">+</span></button></td></tr>`).join('');
  $('showProducts').addEventListener('click', () => {
    const expanded = $('showProducts').getAttribute('aria-expanded') !== 'true';
    document.querySelectorAll('.product-card--extra').forEach(el => { el.hidden = !expanded; });
    $('showProducts').setAttribute('aria-expanded',String(expanded));
    $('showProducts').innerHTML = expanded ? 'Ver menos cápsulas <span aria-hidden="true">↑</span>' : 'Ver las 7 cápsulas <span aria-hidden="true">↓</span>';
  });
  const categories = ['Todas',...(window.CATEGORIES || [])];
  $('catalogFilters').innerHTML = categories.map((c,i) => `<button class="cat-chip${i===0?' active':''}" data-cat="${esc(c)}" aria-pressed="${i===0}">${esc(c)}</button>`).join('');
  function renderCatalog(category='Todas') {
    const list = category==='Todas' ? CATALOG : CATALOG.filter(p => p.cat===category);
    $('catalogGrid').innerHTML = list.length ? list.map(p => card(p,true)).join('') : '<p class="empty-catalog">No hay productos en esta categoría.</p>';
    $('catalogCount').textContent = `${list.length} ${list.length===1?'presentación':'presentaciones'} · 60 gomitas por frasco · S/ 45 c/u`;
  }
  $('catalogFilters').addEventListener('click', event => {
    const button = event.target.closest('[data-cat]'); if(!button) return;
    $('catalogFilters').querySelectorAll('button').forEach(el => { el.classList.toggle('active',el===button); el.setAttribute('aria-pressed',String(el===button)); });
    renderCatalog(button.dataset.cat);
  });
  renderCatalog();
  // Native dialogs provide Escape, background inertness and keyboard focus containment.
  const returnFocus = new WeakMap();
  function openDialog(dialog) { if(dialog.open)return; returnFocus.set(dialog,document.activeElement); dialog.showModal(); }
  function closeDialog(dialog) { if(dialog.open)dialog.close(); }
  document.querySelectorAll('dialog').forEach(dialog => {
    dialog.addEventListener('close', () => { const trigger=returnFocus.get(dialog); if(trigger && trigger.isConnected && !trigger.closest('dialog:not([open])'))trigger.focus(); });
    dialog.addEventListener('click', event => { if(event.target!==dialog)return; const rect=dialog.getBoundingClientRect(); if(event.clientX<rect.left || event.clientX>rect.right || event.clientY<rect.top || event.clientY>rect.bottom)closeDialog(dialog); });
  });
  function renderViewer(id) {
    const p=PRODUCTS.get(id); if(!p)return;
    $('viewerImg').src=p.img; $('viewerImg').alt=p.name; $('viewerTitle').textContent=p.name;
    $('viewerLine').textContent=p.line; $('viewerFocus').textContent=p.focus||p.cat; $('viewerDesc').textContent=p.desc;
    $('viewerList').innerHTML=`<li>${esc(p.content)} por frasco.</li><li>Disponibilidad y entrega a confirmar por WhatsApp.</li>`;
    $('viewerNow').textContent=money(p.price); $('viewerAdd').dataset.id=id;
    $('viewerWa').href=wa(`Hola, quisiera consultar sobre ${p.name} (${p.content}, ${money(p.price)}). ¿Me pueden compartir la composición, el etiquetado y las precauciones antes de elegir?`);
    $('viewerTabs').hidden=id.startsWith('g_');
    $('viewerTabs').innerHTML=CAPSULES.map(item=>`<button class="viewer__tab${item.id===id?' is-active':''}" data-product="${item.id}" aria-pressed="${item.id===id}">${esc(item.name)}</button>`).join('');
  }
  $('viewerTabs').addEventListener('click',event=>{ const button=event.target.closest('[data-product]'); if(!button)return; const id=button.dataset.product; renderViewer(id); $('viewerTabs').querySelector(`[data-product="${id}"]`).focus(); });
  const guideTopics={sueno:'mi descanso',estres:'mis momentos de calma',cansancio:'mi energía diaria',concentracion:'mi concentración',tension:'mi bienestar físico',rutina:'mi rutina de autocuidado'};
  document.querySelectorAll('.quiz-chip').forEach(button=>button.addEventListener('click',()=>{
    document.querySelectorAll('.quiz-chip').forEach(el=>{el.classList.toggle('active',el===button);el.setAttribute('aria-pressed',String(el===button));});
    const topic=guideTopics[button.dataset.key];
    $('quizResult').querySelector('p').textContent='Hablemos de '+topic+'. Puedes contarnos más por WhatsApp antes de elegir.';
    $('guideWa').href=wa(`Hola, vengo de sanaescencia. Me gustaría conversar sobre ${topic} y resolver mis dudas antes de elegir un suplemento.`);
  }));
  const nav=$('nav'),toggle=$('navToggle');
  function setMenu(open){nav.classList.toggle('open',open);toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');}
  toggle.addEventListener('click',()=>setMenu(toggle.getAttribute('aria-expanded')!=='true'));
  nav.addEventListener('click',event=>{if(event.target.closest('a'))setMenu(false);});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&toggle.getAttribute('aria-expanded')==='true'){setMenu(false);toggle.focus();}});
  document.addEventListener('click',event=>{if(!event.target.closest('#header'))setMenu(false);});
  window.matchMedia('(max-width:760px)').addEventListener('change',()=>setMenu(false));
  $('year').textContent=new Date().getFullYear();
  function normalizeCart(value){
    const result=Object.create(null);
    if(!value||typeof value!=='object'||Array.isArray(value))return result;
    for(const [id,qty] of Object.entries(value)){if(PRODUCTS.has(id)&&Number.isInteger(qty)&&qty>0)result[id]=Math.min(qty,MAX_QTY);}
    return result;
  }
  function loadCart(){try{return normalizeCart(JSON.parse(localStorage.getItem(STORAGE_KEY)));}catch{return Object.create(null);}}
  let cart=loadCart();
  function saveCart(){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(cart));}catch{/* In-memory orders still work when storage is unavailable. */}}
  function buildWhatsAppLink(){
    const lines=['Hola, quisiera coordinar este pedido de sanaescencia:',''];let total=0;
    for(const [id,qty]of Object.entries(cart)){const p=PRODUCTS.get(id),subtotal=p.price*qty;total+=subtotal;lines.push(`• ${p.name} (${p.content}) × ${qty} — ${money(subtotal)}`);}
    lines.push('',`Subtotal de productos: ${money(total)}`,'Envío no incluido.','','¿Me confirman disponibilidad, forma de pago y costo de entrega? Gracias.');
    return wa(lines.join('\n'));
  }
  function renderCart(){
    const entries=Object.entries(cart);let count=0,total=0;
    $('cartItems').innerHTML=entries.map(([id,qty])=>{
      const p=PRODUCTS.get(id),name=esc(p.name);count+=qty;total+=p.price*qty;
      return `<div class="cart-item" data-item="${id}"><img class="cart-item__img" src="${esc(p.img)}" alt="${name}" width="68" height="90"><div><h3 class="cart-item__name">${name}</h3><div class="cart-item__price">${money(p.price)} c/u</div><div class="cart-item__qty"><button data-act="dec" data-id="${id}" aria-label="Quitar una unidad de ${name}">−</button><span aria-label="Cantidad">${qty}</span><button data-act="inc" data-id="${id}" aria-label="Agregar una unidad de ${name}"${qty>=MAX_QTY?' disabled':''}>+</button></div></div><div><div class="cart-item__sub">${money(p.price*qty)}</div><button class="cart-item__remove" data-act="rm" data-id="${id}" aria-label="Quitar ${name} del pedido">Quitar</button></div></div>`;
    }).join('');
    $('cartCount').textContent=count;$('cartToggle').setAttribute('aria-label',`Ver mi pedido, ${count} ${count===1?'producto':'productos'}`);
    $('cartTotal').textContent=money(total);$('cartEmpty').hidden=entries.length>0;$('cartFoot').hidden=entries.length===0;
    $('cartCheckout').href=entries.length?buildWhatsAppLink():wa('Hola, quisiera orientación sobre los productos.');
  }
  function addToCart(id){
    if(!PRODUCTS.has(id))return;
    if((cart[id]||0)>=MAX_QTY){showToast('Puedes agregar hasta 99 unidades por producto.');return;}
    cart[id]=(cart[id]||0)+1;saveCart();renderCart();showToast(PRODUCTS.get(id).name+' agregado a tu pedido');openDialog($('cart'));
  }
  $('cartToggle').addEventListener('click',()=>openDialog($('cart')));
  $('cartClear').addEventListener('click',()=>{cart=Object.create(null);saveCart();renderCart();$('cartEmpty').querySelector('button').focus();showToast('Tu pedido está vacío');});
  $('cartItems').addEventListener('click',event=>{
    const button=event.target.closest('[data-act]');if(!button||!cart[button.dataset.id])return;
    const{id,act}=button.dataset;
    if(act==='inc')cart[id]=Math.min(MAX_QTY,cart[id]+1);if(act==='dec')cart[id]-=1;if(act==='rm'||cart[id]<=0)delete cart[id];
    saveCart();renderCart();
    const replacement=$('cartItems').querySelector(`[data-act="${act}"][data-id="${id}"]:not(:disabled)`);
    const fallback=$('cartItems').querySelector('button')||$('cartEmpty').querySelector('button');(replacement||fallback).focus();
  });
  window.addEventListener('storage',event=>{if(event.key===STORAGE_KEY||event.key===null){cart=loadCart();renderCart();}});
  document.addEventListener('click',event=>{
    const close=event.target.closest('[data-close]');if(close){closeDialog($(close.dataset.close));return;}
    const add=event.target.closest('.js-add');if(add){addToCart(add.dataset.id);return;}
    const detail=event.target.closest('.js-detail');if(detail){renderViewer(detail.dataset.id);openDialog($('viewer'));}
  });
  let toastTimer;
  function showToast(message){$('toast').textContent=message;$('toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').classList.remove('show'),2600);}
  renderCart();
})();
