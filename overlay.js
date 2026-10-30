/* OverlayKit - renderizador compartilhado (overlay.html e editor).
   Sem dependencias. Funciona em file:// e em qualquer hospedagem estatica. */
(function (g) {
  'use strict';

  const FONTS = {
    system: { label: 'Sistema (Segoe UI)', css: '"Segoe UI",system-ui,sans-serif' },
    poppins: { label: 'Poppins', css: '"Poppins","Segoe UI",sans-serif', gf: 'Poppins:wght@400;600;700;800' },
    inter: { label: 'Inter', css: '"Inter","Segoe UI",sans-serif', gf: 'Inter:wght@400;600;700;800' },
    montserrat: { label: 'Montserrat', css: '"Montserrat","Segoe UI",sans-serif', gf: 'Montserrat:wght@400;600;700;800' },
    nunito: { label: 'Nunito', css: '"Nunito","Segoe UI",sans-serif', gf: 'Nunito:wght@400;600;700;800' },
    fredoka: { label: 'Fredoka', css: '"Fredoka","Segoe UI",sans-serif', gf: 'Fredoka:wght@400;600;700' },
    rajdhani: { label: 'Rajdhani', css: '"Rajdhani","Segoe UI",sans-serif', gf: 'Rajdhani:wght@500;600;700' },
    orbitron: { label: 'Orbitron', css: '"Orbitron","Segoe UI",sans-serif', gf: 'Orbitron:wght@500;700;900' },
    bebas: { label: 'Bebas Neue', css: '"Bebas Neue","Segoe UI",sans-serif', gf: 'Bebas+Neue' },
    press: { label: 'Press Start 2P (pixel)', css: '"Press Start 2P","Courier New",monospace', gf: 'Press+Start+2P' },
    mono: { label: 'Monoespaçada', css: 'Consolas,"Courier New",monospace' }
  };

  const DEFAULT_THEME = { p: '#7B2CF2', a: '#A970FF', pn: '#11111a', tx: '#ffffff', font: 'poppins', r: 28, bw: 6 };

  /* ---------- utilidades ---------- */
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const num = (v, d) => (typeof v === 'number' && isFinite(v) ? v : (isFinite(parseFloat(v)) ? parseFloat(v) : d));

  function color(v, th) {            // 'p' | 'a' | 'pn' | 'tx' | '#rrggbb'
    if (!v) return 'transparent';
    return Object.prototype.hasOwnProperty.call({ p: 1, a: 1, pn: 1, tx: 1 }, v) ? th[v] : v;
  }
  function rgba(hex, alpha) {
    let h = String(hex || '#000').replace('#', '');
    if (h.length === 3) h = h.split('').map(x => x + x).join('');
    const n = parseInt(h, 16); if (isNaN(n) || h.length < 6) return hex;
    return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${clamp(alpha, 0, 1)})`;
  }
  function b64enc(obj) {
    const bytes = new TextEncoder().encode(JSON.stringify(obj));
    let s = ''; bytes.forEach(b => s += String.fromCharCode(b));
    return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
  function b64dec(str) {
    str = String(str).replace(/-/g, '+').replace(/_/g, '/'); while (str.length % 4) str += '=';
    const bin = atob(str), bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return JSON.parse(new TextDecoder().decode(bytes));
  }

  function normalize(cfg) {
    cfg = cfg && typeof cfg === 'object' ? cfg : {};
    const out = {
      v: 1,
      canvas: { w: clamp(num(cfg.canvas && cfg.canvas.w, 1920), 100, 7680), h: clamp(num(cfg.canvas && cfg.canvas.h, 1080), 100, 7680) },
      theme: Object.assign({}, DEFAULT_THEME, cfg.theme || {}),
      bg: Object.assign({ type: 'none', c1: '#0a0618', c2: '#1d0b45', angle: 160, stars: false, op: 100 }, cfg.bg || {}),
      els: Array.isArray(cfg.els) ? cfg.els.filter(e => e && typeof e === 'object') : []
    };
    out.els.forEach((e, i) => { if (!e.id) e.id = 'e' + (i + 1) + Math.random().toString(36).slice(2, 5); });
    return out;
  }

  /* ---------- tokens de texto dinamicos ---------- */
  function tokens(txt, tz) {
    const d = new Date();
    const f = (opt) => { try { return d.toLocaleString('pt-BR', Object.assign({ timeZone: tz || undefined }, opt)); } catch (e) { return d.toLocaleString('pt-BR', opt); } };
    return String(txt == null ? '' : txt)
      .replace(/\{hora\}/gi, f({ hour: '2-digit', minute: '2-digit' }))
      .replace(/\{time\}/gi, f({ hour: '2-digit', minute: '2-digit' }))
      .replace(/\{data\}/gi, f({ day: '2-digit', month: '2-digit', year: 'numeric' }))
      .replace(/\{date\}/gi, f({ day: '2-digit', month: '2-digit', year: 'numeric' }))
      .replace(/\{dia\}/gi, f({ weekday: 'long' }));
  }

  /* ---------- fundo ---------- */
  function renderBg(cfg, root) {
    const b = cfg.bg; if (b.type === 'none') return;
    const l = document.createElement('div'); l.className = 'ok-bg';
    l.style.cssText = 'position:absolute;inset:0;pointer-events:none;opacity:' + (num(b.op, 100) / 100);
    if (b.type === 'solid') l.style.background = color(b.c1, cfg.theme);
    if (b.type === 'gradient') l.style.background = `linear-gradient(${num(b.angle, 160)}deg,${color(b.c1, cfg.theme)},${color(b.c2, cfg.theme)})`;
    if (b.type === 'radial') l.style.background = `radial-gradient(1200px 800px at 20% 10%,${color(b.c2, cfg.theme)} 0,transparent 70%),${color(b.c1, cfg.theme)}`;
    root.appendChild(l);
    if (b.stars) {
      const s = document.createElement('div'); s.className = 'ok-stars';
      s.style.cssText = 'position:absolute;inset:0;pointer-events:none;';
      root.appendChild(s);
    }
  }

  /* ---------- elementos ---------- */
  function boxStyle(e, th) {
    const bw = num(e.bw, th.bw), r = num(e.r, th.r), glow = num(e.glow, 0);
    const bc = color(e.bc || 'p', th);
    let s = `border-radius:${r}px;`;
    if (bw > 0) s += `border:${bw}px solid ${bc};`;
    if (glow > 0) s += `box-shadow:0 0 ${glow}px ${rgba(bc, .55)};`;
    if (e.fill) s += `background:${rgba(color(e.fill, th), num(e.fa, 100) / 100)};`;
    return s;
  }

  const BUILDERS = {
    frame(e, th, opts) {
      const n = document.createElement('div');
      n.style.cssText = boxStyle(e, th) + 'box-sizing:border-box;';
      if (e.tag && !(opts && opts.noText)) {
        const t = document.createElement('div');
        t.textContent = e.tag;
        t.style.cssText = `position:absolute;left:${num(e.r, th.r) + 6}px;top:${-num(e.bw, th.bw) - Math.round(num(e.tfs, 22) * .75)}px;` +
          `background:${color(e.bc || 'p', th)};color:${color(e.tc || 'tx', th)};border-radius:14px;padding:2px 18px;font-weight:800;font-size:${num(e.tfs, 22)}px;letter-spacing:.06em;white-space:nowrap`;
        n.appendChild(t);
      }
      return n;
    },
    text(e, th) {
      const n = document.createElement('div');
      const al = e.al || 'left', va = e.va || 'middle';
      n.style.cssText = `display:flex;flex-direction:column;justify-content:${va === 'top' ? 'flex-start' : va === 'bottom' ? 'flex-end' : 'center'};` +
        `text-align:${al};color:${color(e.c || 'tx', th)};font-size:${num(e.fs, 40)}px;font-weight:${num(e.fw, 700)};line-height:${num(e.lh, 1.15)};` +
        (e.up ? 'text-transform:uppercase;' : '') + (e.it ? 'font-style:italic;' : '') +
        (e.ls ? `letter-spacing:${num(e.ls, 0)}px;` : '') +
        (e.sh ? `text-shadow:0 2px 14px ${rgba(color(e.shc || 'p', th), .8)},0 0 2px rgba(0,0,0,.6);` : '') +
        (e.fam && FONTS[e.fam] ? `font-family:${FONTS[e.fam].css};` : '') + 'overflow:hidden;white-space:pre-wrap;word-break:break-word;';
      const span = document.createElement('div'); span.dataset.raw = e.txt || ''; span.dataset.tz = e.tz || '';
      span.textContent = tokens(e.txt, e.tz);
      n.appendChild(span); n._dyn = /\{(hora|time|data|date|dia)\}/i.test(e.txt || '');
      return n;
    },
    image(e, th, opts) {
      const n = document.createElement('div');
      n.style.cssText = boxStyle(Object.assign({ bw: 0 }, e), th) + 'overflow:hidden;box-sizing:border-box;';
      if (e.src) {
        const im = document.createElement('img'); im.src = e.src; im.alt = ''; im.referrerPolicy = 'no-referrer';
        im.style.cssText = `width:100%;height:100%;object-fit:${e.fit || 'cover'};display:block;`;
        im.onerror = () => { im.style.display = 'none'; };
        n.appendChild(im);
      } else {
        n.style.background = n.style.background || rgba(color('a', th), .25);
        if (!(opts && opts.still)) n.innerHTML = '<div style="position:absolute;inset:0;display:grid;place-content:center;font-size:40px;opacity:.6">🖼️</div>';
      }
      return n;
    },
    lower(e, th, opts) {
      if (opts && opts.noText) e = Object.assign({}, e, { t1: '', t2: '', t3: '', _nt: 1 });
      const n = document.createElement('div');
      const h = num(e.h, 180), pad = Math.round(h * .12), fs = num(e.fs, 100) / 100;
      n.style.cssText = boxStyle(Object.assign({ fill: 'pn' }, e), th) +
        `display:flex;align-items:center;gap:${pad}px;padding:0 ${pad * 1.4}px;box-sizing:border-box;overflow:hidden;`;
      const avs = Math.round(h - 2 * pad - 2 * num(e.bw, th.bw));
      if (!e.noav) {
        const av = document.createElement('div');
        av.style.cssText = `flex:none;width:${avs}px;height:${avs}px;border-radius:${e.avsq ? Math.round(avs * .18) : 999}px;border:${Math.max(3, Math.round(avs * .05))}px solid ${color(e.avc || 'a', th)};` +
          `background:${rgba(color('p', th), .35)} center/cover;display:grid;place-content:center;font-weight:800;font-size:${Math.round(avs * .4)}px;color:${color('tx', th)};overflow:hidden`;
        if (e.av) { av.style.backgroundImage = `url("${String(e.av).replace(/"/g, '%22')}")`; } else if (!e._nt) av.textContent = (e.t1 || '?').trim().charAt(0).toUpperCase();
        n.appendChild(av);
      }
      const box = document.createElement('div'); box.style.cssText = 'flex:1;min-width:0;display:flex;flex-direction:column;justify-content:center;';
      box.innerHTML = `<div style="font-weight:800;font-size:${Math.round(h * .34 * fs)}px;line-height:1.05;color:${color(e.c1 || 'tx', th)};white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(tokens(e.t1))}</div>` +
        (e.t2 ? `<div style="font-weight:700;font-size:${Math.round(h * .2 * fs)}px;color:${color(e.c2 || 'a', th)};white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:2px">${esc(tokens(e.t2))}</div>` : '');
      n.appendChild(box);
      if (e.t3) {
        const r = document.createElement('div');
        r.style.cssText = `flex:none;font-weight:800;font-size:${Math.round(h * .17 * fs)}px;color:${color(e.c3 || 'a', th)};text-align:right;max-width:40%`;
        r.textContent = tokens(e.t3); n.appendChild(r);
      }
      return n;
    },
    clock(e, th) {
      const n = document.createElement('div');
      n.style.cssText = `display:flex;flex-direction:column;align-items:${e.al === 'left' ? 'flex-start' : e.al === 'center' ? 'center' : 'flex-end'};justify-content:center;` +
        `color:${color(e.c || 'tx', th)};overflow:hidden;` + (e.fam && FONTS[e.fam] ? `font-family:${FONTS[e.fam].css};` : '');
      const t = document.createElement('div'); t.className = 'ok-clock'; t.dataset.tz = e.tz || ''; t.dataset.sec = e.sec ? '1' : '';
      t.style.cssText = `font-weight:800;font-size:${num(e.fs, 80)}px;line-height:1;font-variant-numeric:tabular-nums;` +
        (e.sh ? `text-shadow:0 0 22px ${rgba(color('a', th), .7)};` : '');
      n.appendChild(t);
      if (e.lab) { const l = document.createElement('div'); l.textContent = e.lab; l.style.cssText = `font-size:${Math.max(12, Math.round(num(e.fs, 80) * .22))}px;font-weight:600;opacity:.75;margin-top:4px`; n.appendChild(l); }
      n._clock = true; return n;
    },
    countdown(e, th) {
      const n = document.createElement('div');
      n.style.cssText = `display:flex;flex-direction:column;align-items:${e.al === 'left' ? 'flex-start' : e.al === 'right' ? 'flex-end' : 'center'};justify-content:center;` +
        `color:${color(e.c || 'tx', th)};overflow:hidden;` + (e.fam && FONTS[e.fam] ? `font-family:${FONTS[e.fam].css};` : '');
      const t = document.createElement('div'); t.className = 'ok-count';
      let end = Date.now() + Math.max(0, num(e.min, 5)) * 60000;
      if (e.at && /^\d{1,2}:\d{2}$/.test(e.at)) { const [hh, mm] = e.at.split(':').map(Number); const d = new Date(); d.setHours(hh, mm, 0, 0); if (d.getTime() < Date.now()) d.setDate(d.getDate() + 1); end = d.getTime(); }
      t.dataset.end = end; t.dataset.done = e.done || ''; t.dataset.hours = e.hours ? '1' : '';
      t.style.cssText = `font-weight:800;font-size:${num(e.fs, 120)}px;line-height:1;font-variant-numeric:tabular-nums;text-align:center;` +
        (e.sh ? `text-shadow:0 0 26px ${rgba(color('a', th), .7)};` : '');
      n.appendChild(t);
      if (e.lab) { const l = document.createElement('div'); l.textContent = e.lab; l.style.cssText = `font-size:${Math.max(14, Math.round(num(e.fs, 120) * .22))}px;font-weight:600;opacity:.8;margin-top:6px;text-align:center`; n.appendChild(l); }
      n._count = true; return n;
    },
    embed(e, th, opts) {
      const n = document.createElement('div');
      n.style.cssText = `overflow:hidden;border-radius:${num(e.r, 20)}px;` + (num(e.bw, 0) > 0 ? `border:${num(e.bw, 0)}px solid ${color(e.bc || 'p', th)};` : '') +
        (e.fill ? `background:${rgba(color(e.fill, th), num(e.fa, 100) / 100)};` : '') + 'box-sizing:border-box;';
      if (e.url && !(opts && opts.noEmbed)) {
        const f = document.createElement('iframe'); f.src = e.url; f.setAttribute('allowtransparency', 'true'); f.setAttribute('scrolling', 'no');
        f.style.cssText = `position:absolute;inset:0;width:100%;height:100%;border:0;background:transparent;` + (opts && opts.editor ? 'pointer-events:none;' : '');
        n.appendChild(f);
      } else if (opts && opts.editor) {
        n.innerHTML = `<div style="position:absolute;inset:0;display:grid;place-content:center;text-align:center;font-size:22px;opacity:.6;padding:20px;word-break:break-all">💬<br>${esc(e.url ? e.url : (e.ph || 'Cole a URL do chat / widget'))}</div>`;
      }
      return n;
    },
    ticker(e, th) {
      const n = document.createElement('div');
      n.style.cssText = `display:flex;align-items:center;justify-content:${e.al === 'left' ? 'flex-start' : e.al === 'right' ? 'flex-end' : 'center'};text-align:${e.al || 'center'};` +
        `color:${color(e.c || 'tx', th)};font-size:${num(e.fs, 34)}px;font-weight:${num(e.fw, 700)};overflow:hidden;` + boxStyle(Object.assign({ bw: 0 }, e), th) + 'box-sizing:border-box;padding:0 20px;';
      const items = String(e.items || '').split('\n').map(s => s.trim()).filter(Boolean);
      const sp = document.createElement('div'); sp.className = 'ok-ticker'; sp.dataset.sec = num(e.sec, 8);
      sp.dataset.items = JSON.stringify(items); sp.textContent = tokens(items[0] || '');
      n.appendChild(sp); n._ticker = true; return n;
    },
    bar(e, th, opts) {
      const n = document.createElement('div');
      const val = num(e.val, 0), max = Math.max(1, num(e.max, 100)), pct = clamp(val / max * 100, 0, 100);
      const fs = num(e.fs, 26), h = num(e.h, 60);
      n.style.cssText = boxStyle(Object.assign({ fill: 'pn', bw: 4 }, e), th) + 'overflow:hidden;box-sizing:border-box;';
      const fill = document.createElement('div');
      fill.style.cssText = `position:absolute;left:0;top:0;bottom:0;width:${pct}%;background:linear-gradient(90deg,${color(e.fc || 'p', th)},${color(e.fc2 || 'a', th)});` + (num(e.an0, 0) ? '' : 'transition:width .6s');
      const lab = document.createElement('div');
      lab.style.cssText = `position:absolute;inset:0;display:flex;align-items:center;justify-content:space-between;padding:0 ${Math.round(h * .3)}px;font-weight:800;font-size:${fs}px;color:${color(e.c || 'tx', th)};text-shadow:0 1px 6px rgba(0,0,0,.7)`;
      const fmt = x => (e.cur ? e.cur + ' ' : '') + x.toLocaleString('pt-BR', { maximumFractionDigits: 2 });
      if (opts && opts.noText) lab.innerHTML = ''; else lab.innerHTML = `<span>${esc(tokens(e.lab || ''))}</span><span>${e.pct ? Math.round(pct) + '%' : esc(fmt(val) + ' / ' + fmt(max))}</span>`;
      n.appendChild(fill); n.appendChild(lab); return n;
    }
  };

  function loadFont(key) {
    const f = FONTS[key]; if (!f || !f.gf) return;
    const id = 'ok-font-' + key; if (document.getElementById(id)) return;
    const l = document.createElement('link'); l.id = id; l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=' + f.gf + '&display=swap'; document.head.appendChild(l);
  }

  const CSS = `
  .ok-root{position:relative;overflow:hidden;transform-origin:0 0}
  .ok-root *{box-sizing:border-box}
  .ok-el{position:absolute}
  .ok-stars{background-image:radial-gradient(2px 2px at 8% 20%,#fff 50%,transparent),radial-gradient(1.5px 1.5px at 22% 70%,#cdb8ff 50%,transparent),radial-gradient(2px 2px at 36% 35%,#fff 50%,transparent),radial-gradient(1.5px 1.5px at 51% 82%,#fff 50%,transparent),radial-gradient(2px 2px at 64% 12%,#cdb8ff 50%,transparent),radial-gradient(1.5px 1.5px at 78% 55%,#fff 50%,transparent),radial-gradient(2px 2px at 91% 30%,#fff 50%,transparent),radial-gradient(1.5px 1.5px at 14% 92%,#cdb8ff 50%,transparent),radial-gradient(1.5px 1.5px at 44% 8%,#fff 50%,transparent),radial-gradient(2px 2px at 70% 90%,#fff 50%,transparent);animation:ok-twinkle 5s ease-in-out infinite}
  @keyframes ok-twinkle{0%,100%{opacity:.35}50%{opacity:1}}
  @keyframes ok-pulse{0%,100%{filter:brightness(1)}50%{filter:brightness(1.35)}}
  @keyframes ok-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
  @keyframes ok-in{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
  @keyframes ok-breathe{0%,100%{transform:scale(1)}50%{transform:scale(1.035)}}
  .ok-an-pulse{animation:ok-pulse 3s ease-in-out infinite}
  .ok-an-float{animation:ok-float 4s ease-in-out infinite}
  .ok-an-in{animation:ok-in .8s ease both}
  .ok-an-breathe{animation:ok-breathe 5s ease-in-out infinite}
  .ok-fade{transition:opacity .45s}`;

  function render(cfgIn, root, opts) {
    opts = opts || {};
    const cfg = normalize(cfgIn), th = cfg.theme;
    if (!document.getElementById('ok-css')) { const st = document.createElement('style'); st.id = 'ok-css'; st.textContent = CSS; document.head.appendChild(st); }
    loadFont(th.font);
    (cfg.els || []).forEach(e => e.fam && loadFont(e.fam));
    root.innerHTML = ''; root.className = 'ok-root';
    root.style.cssText += `;width:${cfg.canvas.w}px;height:${cfg.canvas.h}px;font-family:${(FONTS[th.font] || FONTS.system).css};color:${th.tx}`;
    renderBg(cfg, root);
    const nodes = {};
    cfg.els.forEach(e => {
      if (e.hide && !opts.editor) return;
      if (opts.noText && /^(text|clock|countdown|ticker)$/.test(e.type)) return;
      const b = BUILDERS[e.type]; if (!b) return;
      const inner = b(e, th, opts);
      const wrap = document.createElement('div'); wrap.className = 'ok-el' + (!opts.still && e.an && e.an !== 'none' ? ' ok-an-' + e.an : '');
      wrap.dataset.id = e.id;
      wrap.style.cssText = `left:${num(e.x, 0)}px;top:${num(e.y, 0)}px;width:${num(e.w, 200)}px;height:${num(e.h, 100)}px;` +
        (e.rot ? `transform:rotate(${num(e.rot, 0)}deg);` : '') + (num(e.op, 100) < 100 ? `opacity:${num(e.op, 100) / 100};` : '') +
        (e.hide ? 'opacity:.25;' : '');
      inner.style.position = 'absolute'; inner.style.inset = '0';
      wrap.appendChild(inner);
      if (inner._dyn) wrap.dataset.dyn = '1';
      if (inner._clock) wrap.dataset.clock = '1';
      if (inner._ticker) wrap.dataset.ticker = '1';
      root.appendChild(wrap); nodes[e.id] = wrap;
    });
    startLive(root);
    return { cfg, nodes };
  }

  /* ---------- atualizacoes ao vivo (relogio, tokens, rotacao) ---------- */
  const timers = new WeakMap();
  function startLive(root) {
    (timers.get(root) || []).forEach(clearInterval); const list = []; timers.set(root, list);
    const tickClock = () => {
      root.querySelectorAll('.ok-clock').forEach(c => {
        const d = new Date();
        try { c.textContent = d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: c.dataset.sec ? '2-digit' : undefined, timeZone: c.dataset.tz || undefined }); }
        catch (e) { c.textContent = d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }); }
      });
      root.querySelectorAll('[data-dyn="1"] > div > div').forEach(s => { s.textContent = tokens(s.dataset.raw, s.dataset.tz); });
    };
    const tickCount = () => {
      root.querySelectorAll('.ok-count').forEach(c => {
        let ms = +c.dataset.end - Date.now();
        if (ms <= 0) { c.textContent = c.dataset.done || '00:00'; return; }
        const tot = Math.ceil(ms / 1000), h = Math.floor(tot / 3600), m = Math.floor(tot % 3600 / 60), sc = tot % 60, p = x => String(x).padStart(2, '0');
        c.textContent = (h > 0 || c.dataset.hours) ? `${p(h)}:${p(m)}:${p(sc)}` : `${p(m)}:${p(sc)}`;
      });
    };
    tickClock(); tickCount(); list.push(setInterval(() => { tickClock(); tickCount(); }, 1000));
    root.querySelectorAll('.ok-ticker').forEach(t => {
      let items = []; try { items = JSON.parse(t.dataset.items || '[]'); } catch (e) {}
      if (items.length < 2) return;
      let i = 0; const ms = Math.max(2, +t.dataset.sec || 8) * 1000;
      list.push(setInterval(() => {
        t.style.transition = 'opacity .45s'; t.style.opacity = 0;
        setTimeout(() => { i = (i + 1) % items.length; t.textContent = tokens(items[i]); t.style.opacity = 1; }, 450);
      }, ms));
    });
  }

  /* ---------- exportar como imagem / ZIP ---------- */
  function stop(root) { (timers.get(root) || []).forEach(clearInterval); timers.delete(root); }
  const blobToDataUrl = b => new Promise((ok, ko) => { const r = new FileReader(); r.onload = () => ok(r.result); r.onerror = ko; r.readAsDataURL(b); });
  async function urlToData(u) { const r = await fetch(u, { mode: 'cors', referrerPolicy: 'no-referrer' }); if (!r.ok) throw new Error('http ' + r.status); return blobToDataUrl(await r.blob()); }
  const fontCache = {};
  async function fontCss(keys) {
    let out = '';
    for (const k of keys) {
      const f = FONTS[k]; if (!f || !f.gf) continue;
      if (fontCache[k] == null) {
        fontCache[k] = '';
        try {
          const css = await (await fetch('https://fonts.googleapis.com/css2?family=' + f.gf + '&display=swap')).text();
          let res = '';
          for (const part of css.split(/\/\*\s*/).slice(1)) {
            const i = part.indexOf('*/'), nome = part.slice(0, i).trim(), body = part.slice(i + 2);
            if (nome !== 'latin' && nome !== 'latin-ext') continue;
            const m = body.match(/url\((https:[^)]+)\)/); if (!m) continue;
            res += body.replace(m[0], 'url(' + await urlToData(m[1]) + ')');
          }
          fontCache[k] = res;
        } catch (e) { fontCache[k] = ''; }
      }
      out += fontCache[k];
    }
    return out;
  }

  /* Gera uma imagem do overlay. o: { scale, format:'png'|'jpg', bg:'#rrggbb'|null (transparente), noText, theme }
     Retorna Blob. Chat/widgets (iframes) nao entram na imagem. */
  async function toImage(cfgIn, o) {
    o = Object.assign({ scale: 1, format: 'png', bg: null, noText: false }, o || {});
    const c0 = JSON.parse(JSON.stringify(cfgIn)); if (o.theme) c0.theme = Object.assign({}, c0.theme, o.theme);
    const host = document.createElement('div'); host.style.cssText = 'position:fixed;left:-100000px;top:0;pointer-events:none';
    const root = document.createElement('div'); host.appendChild(root); document.body.appendChild(host);
    try {
      const { cfg } = render(c0, root, { noEmbed: true, noText: o.noText, still: true });
      stop(root);
      const w = cfg.canvas.w, h = cfg.canvas.h;
      // imagens externas viram data: URL (senao a tela fica "suja" e nao exporta)
      for (const im of root.querySelectorAll('img')) {
        try { if (/^https?:/i.test(im.getAttribute('src') || '')) im.src = await urlToData(im.getAttribute('src')); } catch (e) { im.remove(); }
      }
      for (const el of root.querySelectorAll('[style*="url("]')) {
        const m = el.style.backgroundImage.match(/url\(["']?(https?:[^"')]+)["']?\)/);
        if (m) { try { el.style.backgroundImage = 'url("' + await urlToData(m[1]) + '")'; } catch (e) { el.style.backgroundImage = 'none'; } }
      }
      const fams = new Set([cfg.theme.font]); cfg.els.forEach(e => e.fam && fams.add(e.fam));
      const fonts = await fontCss([...fams]);
      const xml = new XMLSerializer().serializeToString(root);
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><foreignObject x="0" y="0" width="${w}" height="${h}">` +
        `<div xmlns="http://www.w3.org/1999/xhtml" style="width:${w}px;height:${h}px"><style>${CSS}\n.ok-root *{animation:none!important}\n${fonts}</style>${xml}</div></foreignObject></svg>`;
      const img = new Image();
      await new Promise((ok, ko) => { img.onload = ok; img.onerror = () => ko(new Error('nao consegui desenhar a imagem')); img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg); });
      try { await img.decode(); } catch (e) {}
      const cv = document.createElement('canvas'); const s = clamp(num(o.scale, 1), 0.1, 4);
      cv.width = Math.round(w * s); cv.height = Math.round(h * s);
      const x = cv.getContext('2d');
      if (o.format === 'jpg' || o.bg) { x.fillStyle = o.bg || '#000000'; x.fillRect(0, 0, cv.width, cv.height); }
      x.drawImage(img, 0, 0, cv.width, cv.height);
      const blob = await new Promise(r => { try { cv.toBlob(r, o.format === 'jpg' ? 'image/jpeg' : 'image/png', 0.95); } catch (e) { r(null); } });
      if (!blob) throw new Error('o navegador bloqueou a exportacao (imagem externa sem permissao)');
      return blob;
    } finally { stop(root); host.remove(); }
  }

  /* ZIP simples (sem compressao). files: [{name, blob}] -> Blob */
  const CRC = (() => { const t = []; for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; })();
  const crc32 = u8 => { let c = 0xFFFFFFFF; for (let i = 0; i < u8.length; i++) c = CRC[(c ^ u8[i]) & 255] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0; };
  async function zip(files) {
    const enc = new TextEncoder(), parts = [], central = []; let off = 0;
    const now = new Date(), dt = ((now.getHours() << 11) | (now.getMinutes() << 5) | (now.getSeconds() >> 1)), dd = (((now.getFullYear() - 1980) << 9) | ((now.getMonth() + 1) << 5) | now.getDate());
    for (const f of files) {
      const data = new Uint8Array(await f.blob.arrayBuffer()), name = enc.encode(f.name), crc = crc32(data);
      const lh = new DataView(new ArrayBuffer(30)); lh.setUint32(0, 0x04034b50, true); lh.setUint16(4, 20, true); lh.setUint16(6, 0x0800, true); lh.setUint16(8, 0, true);
      lh.setUint16(10, dt, true); lh.setUint16(12, dd, true); lh.setUint32(14, crc, true); lh.setUint32(18, data.length, true); lh.setUint32(22, data.length, true); lh.setUint16(26, name.length, true); lh.setUint16(28, 0, true);
      parts.push(lh.buffer, name, data);
      const ch = new DataView(new ArrayBuffer(46)); ch.setUint32(0, 0x02014b50, true); ch.setUint16(4, 20, true); ch.setUint16(6, 20, true); ch.setUint16(8, 0x0800, true); ch.setUint16(10, 0, true);
      ch.setUint16(12, dt, true); ch.setUint16(14, dd, true); ch.setUint32(16, crc, true); ch.setUint32(20, data.length, true); ch.setUint32(24, data.length, true); ch.setUint16(28, name.length, true); ch.setUint32(42, off, true);
      central.push(ch.buffer, name); off += 30 + name.length + data.length;
    }
    const csize = central.reduce((a, b) => a + (b.byteLength !== undefined ? b.byteLength : b.length), 0);
    const end = new DataView(new ArrayBuffer(22)); end.setUint32(0, 0x06054b50, true); end.setUint16(8, files.length, true); end.setUint16(10, files.length, true); end.setUint32(12, csize, true); end.setUint32(16, off, true);
    return new Blob([...parts, ...central, end.buffer], { type: 'application/zip' });
  }
  function baixar(blob, nome) { const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = nome; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000); }
  const slug = s => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  g.OverlayKit = { FONTS, DEFAULT_THEME, normalize, render, stop, toImage, zip, baixar, slug, b64enc, b64dec, color, rgba, esc, num, clamp, tokens };
})(window);
