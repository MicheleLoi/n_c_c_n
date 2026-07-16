/* ============================================================
   n_c_c_n :: site engine
   Renders the homepage menu and the uniform project pages from
   window.PROJECTS. Handles boot sequence, clock and keyboard nav.
   You normally never need to edit this file — only projects.js.
   ============================================================ */
(function(){
  "use strict";

  var HOST = "nccn";
  var STAT = {
    online:  ['stat--online','ONLINE'],
    standby: ['stat--standby','STANDBY'],
    wip:     ['stat--wip','· WIP ·']
  };

  /* ---- lingua IT/EN ----------------------------------------- */
  var LANG = (function(){ try{ return localStorage.getItem('lang')||'it'; }catch(e){ return 'it'; } })();
  var CURRENT = null;
  var BOOT = ['nccn/os  boot loader v2.6',
    'checking core memory ............. <span class="ok">OK</span>',
    'mounting /catalog ................ <span class="ok">OK</span>',
    'loading dynamical-systems lab .... <span class="ok">OK</span>',
    'audio synthesis unit ............. <span class="amber">READY</span>',
    'starting console ................. <span class="ok">OK</span>'];
  var UI = {
    it:{ modules:'MODULES', system:'SYSTEM', sims:'SIMULATIONS', mathsec:'MATH · STORIA',
      subtitle:'sistemi dinamici, caos e sonificazione &mdash; suonati dal vivo nel browser. seleziona un modulo.',
      about:'about / colophon', aboutd:'informazioni sul sistema',
      navhome:'[↑]/[↓] naviga &nbsp; [1-9] apri &nbsp; [enter] esegui',
      console:'&larr; console', modstat:'stato modulo',
      nosim:'Nessuna simulazione pubblicata. &nbsp;<span class="amber">// in preparazione</span>' },
    en:{ modules:'MODULES', system:'SYSTEM', sims:'SIMULATIONS', mathsec:'MATH · HISTORY',
      subtitle:'dynamical systems, chaos and sonification &mdash; played live in the browser. select a module.',
      about:'about / colophon', aboutd:'system information',
      navhome:'[↑]/[↓] navigate &nbsp; [1-9] open &nbsp; [enter] run',
      console:'&larr; console', modstat:'module status',
      nosim:'No simulation published. &nbsp;<span class="amber">// work in progress</span>' }
  };
  function T(k){ return (UI[LANG]&&UI[LANG][k]!=null)?UI[LANG][k]:UI.it[k]; }
  function field(o,name){ if(LANG==='en' && o[name+'_en']!=null) return o[name+'_en']; return o[name]||''; }
  function rerender(){ if(!CURRENT) return; if(CURRENT.mode==='home') renderHome(CURRENT.mount); else renderProject(CURRENT.id, CURRENT.mount); }
  function setLang(l){ LANG=l; try{ localStorage.setItem('lang',l); }catch(e){} document.documentElement.lang=l; ensureLangBtn(); rerender(); }
  function ensureLangBtn(){
    var b=document.getElementById('nccn-lang');
    if(!b){ b=document.createElement('button'); b.id='nccn-lang'; b.className='langbtn';
      b.addEventListener('click',function(){ setLang(LANG==='it'?'en':'it'); }); document.body.appendChild(b); }
    b.textContent = LANG==='it'?'EN':'IT';
  }

  function el(tag, cls, html){
    var e = document.createElement(tag);
    if(cls) e.className = cls;
    if(html != null) e.innerHTML = html;
    return e;
  }
  function esc(s){ return String(s).replace(/[&<>]/g,
    function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;'}[c]; }); }
  function pad(n){ return (n<10?'0':'')+n; }

  function stamp(){
    var d = new Date();
    return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate())+
           ' '+pad(d.getHours())+':'+pad(d.getMinutes())+':'+pad(d.getSeconds());
  }
  function tickClock(node){
    if(!node) return;
    var f = function(){ node.textContent = stamp(); };
    f(); setInterval(f, 1000);
  }

  /* ---- shared chassis --------------------------------------- */
  function chassis(titleHtml){
    var ws = el('div','ws');
    var bar = el('div','ws__bar');
    bar.innerHTML =
      '<span class="ws__leds"><i class="ws__led ws__led--r"></i>'+
      '<i class="ws__led ws__led--y"></i><i class="ws__led ws__led--g"></i></span>'+
      '<span class="ws__title">'+titleHtml+'</span>'+
      '<span class="ws__spacer"></span>'+
      '<span class="dim" style="color:#9a9a8e">console tty0</span>';
    var crt = el('div','crt');
    ws.appendChild(bar); ws.appendChild(crt);
    return { ws:ws, crt:crt };
  }

  function scrHead(right){
    var h = el('div','scr-head');
    h.innerHTML = '<span><b>'+HOST+'</b>@chaosjazz :~ live sonification</span>'+
                  '<span>'+right+'</span>';
    return h;
  }

  /* ---- keyboard navigation for a list of <a> ---------------- */
  function wireNav(links){
    var i = 0;
    function sel(n){
      if(!links.length) return;
      links[i].classList.remove('sel');
      i = (n + links.length) % links.length;
      links[i].classList.add('sel');
      links[i].scrollIntoView({block:'nearest'});
    }
    links.forEach(function(a, k){
      a.addEventListener('mouseenter', function(){ sel(k); });
    });
    sel(0);
    document.addEventListener('keydown', function(e){
      var k = e.key;
      if(k==='ArrowDown' || k==='j'){ e.preventDefault(); sel(i+1); }
      else if(k==='ArrowUp' || k==='k'){ e.preventDefault(); sel(i-1); }
      else if(k==='Enter'){ if(links[i]){ links[i].click(); } }
      else if(/^[1-9]$/.test(k)){
        var idx = parseInt(k,10)-1;
        if(links[idx]){ sel(idx); links[idx].click(); }
      }
    });
  }

  /* ---- boot sequence (short, skippable, once per session) ---- */
  function boot(crt, lines, done){
    var seen = false;
    try{ seen = sessionStorage.getItem('nccn-boot')==='1'; }catch(e){}
    if(seen){ done(); return; }
    var pre = el('pre','boot');
    crt.appendChild(pre);
    var i = 0, buf = '', finished = false;
    function skip(){
      if(finished) return;
      finished = true;
      clearInterval(t); document.removeEventListener('keydown',skip);
      crt.removeEventListener('click',skip);
      try{ sessionStorage.setItem('nccn-boot','1'); }catch(e){}
      done();
    }
    document.addEventListener('keydown', skip);
    crt.addEventListener('click', skip);
    var t = setInterval(function(){
      if(i >= lines.length){ setTimeout(skip, 260); return; }
      buf += lines[i] + '\n';
      pre.innerHTML = buf;
      i++;
    }, 130);
  }

  /* ============================================================
     HOMEPAGE
     ============================================================ */
  function renderHome(mount){
    var P = window.PROJECTS || [];
    mount.innerHTML=''; CURRENT={mode:'home',mount:mount}; ensureLangBtn();
    var c = chassis('n_c_c_n');
    mount.appendChild(c.ws);
    boot(c.crt, BOOT, function(){ drawHome(c.crt, P); });
  }

  function drawHome(crt, P){
    crt.innerHTML = '';
    var clock = el('span');
    crt.appendChild(scrHead(''));
    // put live clock into the head we just made
    crt.querySelector('.scr-head span:last-child').appendChild(clock);
    tickClock(clock);

    var banner = el('div','banner');
    banner.innerHTML =
      '<pre>'+
      ' _ __     ___    ___    _ __  \n'+
      '| \'_ \\   / __|  / __|  | \'_ \\ \n'+
      '| | | | | (__  | (__   | | | |\n'+
      '|_| |_|  \\___|  \\___|  |_| |_|   <span class="tag">ChaoticJazzStation</span>\n'+
      '</pre>';
    crt.appendChild(banner);
    crt.appendChild(el('div','subtitle', T('subtitle')));

    crt.appendChild(el('div','sec',T('modules')));

    var ul = el('ul','menu');
    var links = [];
    P.forEach(function(p, k){
      var s = STAT[p.status] || STAT.standby;
      var n = (p.sims||[]).filter(function(x){return x.status==='online';}).length;
      var meta = n>0 ? (n+' sim') : (s[1]==='ONLINE'?'':'—');
      var li = el('li');
      var a = el('a', null,
        '<span class="num">'+pad(k+1)+'</span>'+
        '<span class="name">'+esc(p.title)+'</span>'+
        '<span class="desc">'+esc(field(p,'subtitle'))+'</span>'+
        '<span class="stat '+s[0]+'">'+s[1]+'</span>');
      a.href = p.id + '/';
      li.appendChild(a); ul.appendChild(li); links.push(a);
    });
    crt.appendChild(ul);

    crt.appendChild(el('div','sec',T('system')));
    var ul2 = el('ul','menu');
    var aboutLi = el('li');
    var about = el('a', null,
      '<span class="num">&nbsp;&gt;</span>'+
      '<span class="name">'+T('about')+'</span>'+
      '<span class="desc">'+T('aboutd')+'</span>');
    about.href = 'about.html';
    aboutLi.appendChild(about);
    ul2.appendChild(aboutLi);
    crt.appendChild(ul2);
    links.push(about);

    var prompt = el('div','prompt');
    prompt.innerHTML = '<span class="ps1">'+HOST+':~$</span> run '+
      '<span class="cursor"></span>';
    crt.appendChild(prompt);

    crt.appendChild(footer(T('navhome')));

    wireNav(links);
  }

  /* ============================================================
     PROJECT PAGE (uniform template)
     ============================================================ */
  function renderProject(id, mount){
    var P = window.PROJECTS || [];
    mount.innerHTML=''; CURRENT={mode:'project',id:id,mount:mount}; ensureLangBtn();
    var p = null;
    for(var i=0;i<P.length;i++){ if(P[i].id===id){ p=P[i]; break; } }
    var c = chassis('n_c_c_n / <small>'+esc(id)+'</small>');
    mount.appendChild(c.ws);
    if(!p){
      c.crt.appendChild(scrHead('ERR'));
      c.crt.appendChild(el('p','warn','modulo "'+esc(id)+'" non nel catalogo.'));
      c.crt.appendChild(el('p', null,'<a class="link" href="../">&larr; torna alla console</a>'));
      return;
    }

    var clock = el('span');
    c.crt.appendChild(scrHead(''));
    c.crt.querySelector('.scr-head span:last-child').appendChild(clock);
    tickClock(clock);

    var s = STAT[p.status] || STAT.standby;
    c.crt.appendChild(el('div','banner',
      '<pre>'+esc(p.title)+'</pre>'));
    c.crt.appendChild(el('div','subtitle', esc(field(p,'subtitle'))));
    if(field(p,'credit')){
      c.crt.appendChild(el('div','subtitle','&mdash; <span class="amber">'+esc(field(p,'credit'))+'</span>'));
    }

    if(field(p,'abstract')){
      var ab = el('div','content');
      ab.innerHTML = '<p>'+esc(field(p,'abstract'))+'</p>';
      c.crt.appendChild(ab);
    }

    if(field(p,'math')){
      c.crt.appendChild(el('div','sec',T('mathsec')));
      var mb = el('div','content');
      mb.innerHTML = '<p>'+esc(field(p,'math'))+'</p>';
      c.crt.appendChild(mb);
    }

    var sims = (p.sims||[]);
    if(sims.length){
      c.crt.appendChild(el('div','sec',T('sims')));
      var ul = el('ul','menu');
      var links = [];
      sims.forEach(function(sm, k){
        var ss = STAT[sm.status] || STAT.wip;
        var li = el('li');
        var a = el('a', null,
          '<span class="num">'+pad(k+1)+'</span>'+
          '<span class="name">'+esc(field(sm,'title'))+'</span>'+
          '<span class="desc">'+esc(field(sm,'desc'))+'</span>'+
          '<span class="stat '+ss[0]+'">'+ss[1]+'</span>');
        if(sm.status==='online'){ a.href = sm.file; }
        else { a.href='#'; a.addEventListener('click',function(e){e.preventDefault();}); }
        li.appendChild(a); ul.appendChild(li); links.push(a);
      });
      c.crt.appendChild(ul);
      wireNav(links);
    } else {
      c.crt.appendChild(el('div','sec',T('sims')));
      c.crt.appendChild(el('p','dim', T('nosim')));
    }

    var prompt = el('div','prompt');
    prompt.innerHTML = '<span class="ps1">'+HOST+':~/'+esc(id)+'$</span> '+
      '<span class="cursor"></span>';
    c.crt.appendChild(prompt);

    c.crt.appendChild(footer(
      '<a class="link" href="../">'+T('console')+'</a> &nbsp;·&nbsp; '+
      T('modstat')+': <span class="'+s[0]+'">'+s[1]+'</span>'));
  }

  function footer(midHtml){
    var f = el('div','scr-foot');
    f.innerHTML =
      '<span>'+midHtml+'</span>'+
      '<span><span class="key">'+HOST+'</span> · load 0.07 · mem ok</span>';
    return f;
  }

  window.Site = { renderHome:renderHome, renderProject:renderProject };
})();
