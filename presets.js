/* Presets do OverlayKit. Cada preset é uma configuração completa (o mesmo formato do editor). */
(function (g) {
  const T = (o) => Object.assign({ p: '#7B2CF2', a: '#A970FF', pn: '#11111a', tx: '#ffffff', font: 'poppins', r: 28, bw: 6 }, o || {});

  const nuvem = {
    nome: { pt: 'Jogo + câmera + chat', en: 'Game + cam + chat' },
    cfg: {
      v: 1, canvas: { w: 1920, h: 1080 }, theme: T(), bg: { type: 'none', c1: '#0a0618', c2: '#1d0b45', angle: 160, stars: false, op: 100 },
      els: [
        { id: 'jogo', type: 'frame', x: 24, y: 24, w: 1344, h: 756, bw: 8, r: 28, bc: 'p', glow: 0 },
        { id: 'cam', type: 'frame', x: 1392, y: 24, w: 504, h: 284, bw: 8, r: 28, bc: 'p', tag: 'CAM', tfs: 18 },
        { id: 'chat', type: 'frame', x: 1392, y: 332, w: 504, h: 724, bw: 8, r: 28, bc: 'p', fill: 'pn', fa: 85 },
        { id: 'chatem', type: 'embed', x: 1400, y: 340, w: 488, h: 708, r: 20, url: '', ph: 'URL do chat (ex.: https://www.twitch.tv/popout/SEUCANAL/chat?popout=)' },
        { id: 'barra', type: 'lower', x: 24, y: 804, w: 1344, h: 252, bw: 4, r: 30, bc: 'a', fill: 'pn', fa: 95, t1: 'seucanal', t2: 'twitch.tv/seucanal', t3: 'apoie via pix' }
      ]
    }
  };

  const conversa = {
    nome: { pt: 'Só conversando', en: 'Just chatting' },
    cfg: {
      v: 1, canvas: { w: 1920, h: 1080 }, theme: T(), bg: { type: 'radial', c1: '#05030d', c2: '#2a1060', angle: 160, stars: false, op: 100 },
      els: [
        { id: 'cam', type: 'frame', x: 40, y: 40, w: 1240, h: 800, bw: 8, r: 34, bc: 'p', glow: 30, tag: 'CAMERA', tfs: 20 },
        { id: 'chat', type: 'frame', x: 1320, y: 40, w: 560, h: 1000, bw: 8, r: 34, bc: 'p', fill: 'pn', fa: 85, glow: 24 },
        { id: 'chatem', type: 'embed', x: 1330, y: 50, w: 540, h: 980, r: 26, url: '', ph: 'URL do chat' },
        { id: 'barra', type: 'lower', x: 40, y: 870, w: 1240, h: 170, bw: 4, r: 30, bc: 'a', fill: 'pn', fa: 95, t1: 'seucanal', t2: 'twitch.tv/seucanal', t3: '{hora}' }
      ]
    }
  };

  const afk = {
    nome: { pt: 'Já volto / AFK', en: 'Be right back' },
    cfg: {
      v: 1, canvas: { w: 1920, h: 1080 }, theme: T(), bg: { type: 'radial', c1: '#05030d', c2: '#2a1060', angle: 160, stars: true, op: 100 },
      els: [
        { id: 'quadro', type: 'frame', x: 360, y: 220, w: 1200, h: 640, bw: 8, r: 40, bc: 'p', fill: 'pn', fa: 88, glow: 40, an: 'breathe' },
        { id: 'titulo', type: 'text', x: 420, y: 290, w: 1080, h: 140, txt: 'JÁ VOLTO', fs: 120, fw: 800, al: 'center', sh: true, an: 'in' },
        { id: 'sub', type: 'text', x: 420, y: 440, w: 1080, h: 80, txt: 'Pega uma água e já já eu estou de volta 💜', fs: 40, fw: 600, c: 'a', al: 'center' },
        { id: 'hora', type: 'clock', x: 720, y: 560, w: 480, h: 150, fs: 110, al: 'center', sh: true, lab: 'horário de Brasília', tz: 'America/Sao_Paulo' },
        { id: 'dicas', type: 'ticker', x: 460, y: 740, w: 1000, h: 70, fs: 30, c: 'a', sec: 8, items: 'Aproveite para seguir o canal!\nChat ativo faz o streamer sorrir\nJá volto, não saia daí 👀' }
      ]
    }
  };

  const madrugada = {
    nome: { pt: 'Madrugada / live 24h', en: 'Overnight / 24h' },
    cfg: {
      v: 1, canvas: { w: 1920, h: 1080 }, theme: T(), bg: { type: 'radial', c1: '#05030d', c2: '#2a1060', angle: 160, stars: true, op: 100 },
      els: [
        { id: 'topo', type: 'lower', x: 40, y: 40, w: 1160, h: 150, bw: 8, r: 34, bc: 'p', fill: 'pn', fa: 90, glow: 30, t1: 'Madrugada no canal', t2: 'O streamer foi dormir, a live continua 🌙', t3: '{hora}' },
        { id: 'c1', type: 'frame', x: 40, y: 210, w: 570, h: 470, bw: 8, r: 34, bc: 'p', fill: 'pn', fa: 90, glow: 30 },
        { id: 'c1t', type: 'text', x: 70, y: 232, w: 520, h: 60, txt: '⚔️ Comandos do jogo', fs: 38, fw: 800 },
        { id: 'c1d', type: 'text', x: 70, y: 300, w: 520, h: 330, txt: '!comando1\n!comando2\n!comando3', fs: 32, fw: 700, c: 'a', va: 'top', lh: 1.5, fam: 'mono' },
        { id: 'c2', type: 'frame', x: 630, y: 210, w: 570, h: 470, bw: 8, r: 34, bc: 'p', fill: 'pn', fa: 90, glow: 30 },
        { id: 'c2t', type: 'text', x: 660, y: 232, w: 520, h: 60, txt: '🎁 Sorteios e drops', fs: 38, fw: 800 },
        { id: 'c2d', type: 'text', x: 660, y: 300, w: 520, h: 330, txt: 'Escreva aqui as regras,\npremiações e dicas\nque o chat precisa saber.', fs: 28, fw: 600, c: 'tx', va: 'top', lh: 1.4 },
        { id: 'chat', type: 'frame', x: 1240, y: 40, w: 640, h: 380, bw: 8, r: 34, bc: 'p', fill: 'pn', fa: 90, glow: 24 },
        { id: 'chatem', type: 'embed', x: 1250, y: 50, w: 620, h: 360, r: 26, url: '', ph: 'URL do chat' },
        { id: 'meta', type: 'bar', x: 1240, y: 440, w: 640, h: 90, bw: 6, r: 28, bc: 'p', fill: 'pn', fa: 90, lab: 'Meta', val: 50, max: 100, fs: 28, pct: true },
        { id: 'pedido', type: 'text', x: 1240, y: 545, w: 640, h: 135, txt: 'Quem puder ajudar com a meta, manda uma força pra agradecer o canal 💜', fs: 26, fw: 600, c: 'tx', al: 'center' },
        { id: 'jogo', type: 'frame', x: 24, y: 722, w: 1872, h: 340, bw: 8, r: 30, bc: 'p', fill: 'pn', fa: 70, tag: 'JOGO NO CHAT', tfs: 22 }
      ]
    }
  };

  const vazio = {
    nome: { pt: 'Em branco', en: 'Blank' },
    cfg: { v: 1, canvas: { w: 1920, h: 1080 }, theme: T(), bg: { type: 'none', c1: '#0a0618', c2: '#1d0b45', angle: 160, stars: false, op: 100 }, els: [] }
  };


  /* ---------- Cenas extras (horizontal 1920x1080) ---------- */
  const BGN = { type: 'none', c1: '#0a0618', c2: '#1d0b45', angle: 160, stars: false, op: 100 };
  const BGR = { type: 'radial', c1: '#05030d', c2: '#2a1060', angle: 160, stars: true, op: 100 };
  const H = (nome, bg, els, extra) => Object.assign({ grupo: 'h', nome, cfg: { v: 1, canvas: { w: 1920, h: 1080 }, theme: T(), bg, els } }, extra || {});
  const CHAT = (x, y, w, h, r) => ({ id: 'chatem', type: 'embed', x: x + 8, y: y + 8, w: w - 16, h: h - 16, r: r || 20, url: '', ph: 'URL do chat (ex.: https://www.twitch.tv/popout/SEUCANAL/chat?popout=)' });

  const comecando = H({ pt: 'Começando (com contagem)', en: 'Starting soon (countdown)' }, BGR, [
    { id: 'quadro', type: 'frame', x: 360, y: 190, w: 1200, h: 700, bw: 8, r: 44, bc: 'p', fill: 'pn', fa: 88, glow: 40, an: 'breathe' },
    { id: 'titulo', type: 'text', x: 420, y: 250, w: 1080, h: 130, txt: 'JÁ VAMOS COMEÇAR', fs: 92, fw: 800, al: 'center', sh: true, an: 'in' },
    { id: 'cont', type: 'countdown', x: 520, y: 400, w: 880, h: 220, min: 5, done: 'Começando!', fs: 190, al: 'center', sh: true, lab: 'a live começa em' },
    { id: 'sub', type: 'text', x: 420, y: 680, w: 1080, h: 70, txt: 'Pega uma bebida e se ajeita 💜', fs: 38, fw: 600, c: 'a', al: 'center' },
    { id: 'info', type: 'lower', x: 560, y: 770, w: 800, h: 90, bw: 4, r: 28, bc: 'a', fill: 'pn', fa: 95, t1: 'seucanal', t2: 'twitch.tv/seucanal', t3: '{hora}' }
  ]);

  const soJogo = H({ pt: 'Só jogo', en: 'Game only' }, BGN, [
    { id: 'jogo', type: 'frame', x: 24, y: 24, w: 1872, h: 1032, bw: 8, r: 32, bc: 'p', glow: 0 }
  ]);

  const jogoMeta = H({ pt: 'Jogo + câmera + meta/QR', en: 'Game + cam + goal/QR' }, BGN, [
    { id: 'jogo', type: 'frame', x: 24, y: 24, w: 1344, h: 756, bw: 8, r: 28, bc: 'p', glow: 0 },
    { id: 'cam', type: 'frame', x: 1392, y: 24, w: 504, h: 284, bw: 8, r: 28, bc: 'p', tag: 'CAM', tfs: 18 },
    { id: 'meta', type: 'bar', x: 1392, y: 332, w: 504, h: 100, bw: 6, r: 28, bc: 'p', fill: 'pn', fa: 92, lab: 'Meta do mês', val: 40, max: 100, fs: 26, pct: true },
    { id: 'qrq', type: 'frame', x: 1392, y: 456, w: 504, h: 600, bw: 8, r: 28, bc: 'p', fill: 'pn', fa: 90 },
    { id: 'qrt', type: 'text', x: 1412, y: 476, w: 464, h: 60, txt: '💜 Apoie o canal', fs: 34, fw: 800, al: 'center' },
    { id: 'qr', type: 'image', x: 1462, y: 556, w: 364, h: 364, r: 18, src: '', ph: 'QR do seu Pix/LivePix (envie a imagem)' },
    { id: 'qrs', type: 'text', x: 1412, y: 940, w: 464, h: 90, txt: 'Escaneie e ajude a bater a meta', fs: 24, fw: 600, c: 'a', al: 'center' },
    { id: 'barra', type: 'lower', x: 24, y: 804, w: 1344, h: 252, bw: 4, r: 30, bc: 'a', fill: 'pn', fa: 95, t1: 'seucanal', t2: 'twitch.tv/seucanal', t3: '{hora}' }
  ]);

  const jogoChatSemCam = H({ pt: 'Jogo + chat (sem câmera)', en: 'Game + chat (no cam)' }, BGN, [
    { id: 'jogo', type: 'frame', x: 24, y: 24, w: 1344, h: 756, bw: 8, r: 28, bc: 'p', glow: 0 },
    { id: 'chat', type: 'frame', x: 1392, y: 24, w: 504, h: 1032, bw: 8, r: 28, bc: 'p', fill: 'pn', fa: 85 },
    CHAT(1392, 24, 504, 1032),
    { id: 'barra', type: 'lower', x: 24, y: 804, w: 1344, h: 252, bw: 4, r: 30, bc: 'a', fill: 'pn', fa: 95, t1: 'seucanal', t2: 'twitch.tv/seucanal', t3: 'apoie via pix' }
  ]);

  const encerrando = H({ pt: 'Encerrando (com contagem)', en: 'Ending (countdown)' }, BGR, [
    { id: 'quadro', type: 'frame', x: 360, y: 190, w: 1200, h: 700, bw: 8, r: 44, bc: 'p', fill: 'pn', fa: 88, glow: 40, an: 'breathe' },
    { id: 'titulo', type: 'text', x: 420, y: 250, w: 1080, h: 130, txt: 'OBRIGADO POR VIR!', fs: 96, fw: 800, al: 'center', sh: true, an: 'in' },
    { id: 'sub', type: 'text', x: 420, y: 390, w: 1080, h: 70, txt: 'A live termina em', fs: 40, fw: 600, c: 'a', al: 'center' },
    { id: 'cont', type: 'countdown', x: 520, y: 470, w: 880, h: 200, min: 3, done: 'Até a próxima!', fs: 170, al: 'center', sh: true },
    { id: 'raid', type: 'text', x: 420, y: 720, w: 1080, h: 80, txt: 'Segue lá no canal e passa na próxima 💜', fs: 34, fw: 600, al: 'center' }
  ]);

  const metaCena = H({ pt: 'Widget de meta (fundo transparente)', en: 'Goal widget (transparent)' }, BGN, [
    { id: 'meta', type: 'bar', x: 40, y: 40, w: 900, h: 120, bw: 6, r: 32, bc: 'p', fill: 'pn', fa: 92, glow: 22, lab: 'Meta', val: 50, max: 100, fs: 34, pct: true },
    { id: 'txt', type: 'text', x: 40, y: 176, w: 900, h: 60, txt: 'Ajude a bater a meta 💜', fs: 30, fw: 700, c: 'a' }
  ]);

  const pngTuber = (nome, comChat, comJogo) => H(nome, BGN, [].concat(
    comJogo ? [{ id: 'jogo', type: 'frame', x: 24, y: 24, w: comChat ? 1344 : 1560, h: comChat ? 756 : 880, bw: 8, r: 28, bc: 'p', glow: 0 }] : [],
    [{ id: 'avatar', type: 'frame', x: comJogo ? (comChat ? 1392 : 1608) : 40, y: comJogo ? 24 : 40, w: comJogo ? (comChat ? 504 : 288) : 800, h: comJogo ? (comChat ? 504 : 288) : 800, bw: 8, r: 34, bc: 'p', glow: comJogo ? 0 : 30, tag: 'PNGTUBER', tfs: 16 }],
    comChat ? [{ id: 'chat', type: 'frame', x: comJogo ? 1392 : 880, y: comJogo ? 548 : 40, w: comJogo ? 504 : 1000, h: comJogo ? 508 : 800, bw: 8, r: 28, bc: 'p', fill: 'pn', fa: 85 }, CHAT(comJogo ? 1392 : 880, comJogo ? 548 : 40, comJogo ? 504 : 1000, comJogo ? 508 : 800)] : [],
    [{ id: 'barra', type: 'lower', x: comJogo ? 24 : 40, y: comJogo ? 804 : 870, w: comJogo ? 1344 : 1840, h: comJogo ? 252 : 170, bw: 4, r: 30, bc: 'a', fill: 'pn', fa: 95, t1: 'seucanal', t2: 'twitch.tv/seucanal', t3: '{hora}' }]
  ));
  const pngJogo = pngTuber({ pt: 'PNGtuber · Jogo', en: 'PNGtuber · Game' }, false, true);
  const pngJogoChat = pngTuber({ pt: 'PNGtuber · Jogo + chat', en: 'PNGtuber · Game + chat' }, true, true);
  const pngConversa = pngTuber({ pt: 'PNGtuber · Conversando', en: 'PNGtuber · Chatting' }, true, false);

  const pngRift = H({ pt: 'PNGtuber · Jogo + faixa de overlay do jogo', en: 'PNGtuber · Game + game-overlay strip' }, BGN, [
    { id: 'jogo', type: 'frame', x: 24, y: 24, w: 1344, h: 680, bw: 8, r: 28, bc: 'p', glow: 0 },
    { id: 'avatar', type: 'frame', x: 1392, y: 24, w: 504, h: 504, bw: 8, r: 34, bc: 'p', tag: 'PNGTUBER', tfs: 16 },
    { id: 'chat', type: 'frame', x: 1392, y: 548, w: 504, h: 508, bw: 8, r: 28, bc: 'p', fill: 'pn', fa: 85 },
    CHAT(1392, 548, 504, 508),
    { id: 'faixa', type: 'frame', x: 24, y: 722, w: 1344, h: 340, bw: 6, r: 28, bc: 'a', fill: 'pn', fa: 90, tag: 'OVERLAY DO JOGO (embed ou captura)', tfs: 14 },
    { id: 'faixaem', type: 'embed', x: 32, y: 730, w: 1328, h: 324, r: 20, url: '', ph: 'URL do overlay do jogo (browser source)' }
  ]);

  /* ---------- Vertical 1080x1920 ---------- */
  const V = (nome, bg, els) => ({ grupo: 'v', nome, cfg: { v: 1, canvas: { w: 1080, h: 1920 }, theme: T(), bg, els } });
  const vComecando = V({ pt: 'Vertical · Começando', en: 'Vertical · Starting' }, BGR, [
    { id: 'quadro', type: 'frame', x: 60, y: 520, w: 960, h: 880, bw: 8, r: 44, bc: 'p', fill: 'pn', fa: 88, glow: 40, an: 'breathe' },
    { id: 'titulo', type: 'text', x: 100, y: 580, w: 880, h: 220, txt: 'JÁ VAMOS\nCOMEÇAR', fs: 100, fw: 800, al: 'center', sh: true, lh: 1.05, an: 'in' },
    { id: 'cont', type: 'countdown', x: 140, y: 840, w: 800, h: 300, min: 5, done: 'Começando!', fs: 200, al: 'center', sh: true, lab: 'começa em' },
    { id: 'sub', type: 'text', x: 100, y: 1220, w: 880, h: 90, txt: '@seucanal 💜', fs: 44, fw: 700, c: 'a', al: 'center' }
  ]);
  const vConversa = V({ pt: 'Vertical · Conversando', en: 'Vertical · Chatting' }, BGN, [
    { id: 'cam', type: 'frame', x: 30, y: 30, w: 1020, h: 1020, bw: 8, r: 36, bc: 'p', glow: 24, tag: 'CAMERA', tfs: 20 },
    { id: 'chat', type: 'frame', x: 30, y: 1080, w: 1020, h: 640, bw: 8, r: 36, bc: 'p', fill: 'pn', fa: 85 },
    CHAT(30, 1080, 1020, 640, 28),
    { id: 'barra', type: 'lower', x: 30, y: 1745, w: 1020, h: 145, bw: 4, r: 30, bc: 'a', fill: 'pn', fa: 95, t1: 'seucanal', t2: 'twitch.tv/seucanal', t3: '{hora}' }
  ]);
  const vJogo = V({ pt: 'Vertical · Jogo', en: 'Vertical · Game' }, BGN, [
    { id: 'jogo', type: 'frame', x: 30, y: 30, w: 1020, h: 1020, bw: 8, r: 36, bc: 'p' },
    { id: 'cam', type: 'frame', x: 30, y: 1075, w: 500, h: 600, bw: 8, r: 36, bc: 'p', tag: 'CAM', tfs: 18 },
    { id: 'meta', type: 'bar', x: 550, y: 1075, w: 500, h: 110, bw: 6, r: 28, bc: 'p', fill: 'pn', fa: 92, lab: 'Meta', val: 50, max: 100, fs: 28, pct: true },
    { id: 'chat', type: 'frame', x: 550, y: 1205, w: 500, h: 470, bw: 8, r: 28, bc: 'p', fill: 'pn', fa: 85 },
    CHAT(550, 1205, 500, 470),
    { id: 'barra', type: 'lower', x: 30, y: 1700, w: 1020, h: 190, bw: 4, r: 30, bc: 'a', fill: 'pn', fa: 95, t1: 'seucanal', t2: 'twitch.tv/seucanal', t3: 'apoie via pix' }
  ]);
  const vAfk = V({ pt: 'Vertical · Já volto', en: 'Vertical · Be right back' }, BGR, [
    { id: 'quadro', type: 'frame', x: 60, y: 520, w: 960, h: 880, bw: 8, r: 44, bc: 'p', fill: 'pn', fa: 88, glow: 40, an: 'breathe' },
    { id: 'titulo', type: 'text', x: 100, y: 600, w: 880, h: 180, txt: 'JÁ VOLTO', fs: 130, fw: 800, al: 'center', sh: true, an: 'in' },
    { id: 'sub', type: 'text', x: 100, y: 800, w: 880, h: 140, txt: 'Pega uma água e já volto 💜', fs: 46, fw: 600, c: 'a', al: 'center' },
    { id: 'hora', type: 'clock', x: 240, y: 990, w: 600, h: 220, fs: 140, al: 'center', sh: true, lab: 'horário de Brasília', tz: 'America/Sao_Paulo' }
  ]);
  const vFim = V({ pt: 'Vertical · Encerrando', en: 'Vertical · Ending' }, BGR, [
    { id: 'quadro', type: 'frame', x: 60, y: 520, w: 960, h: 880, bw: 8, r: 44, bc: 'p', fill: 'pn', fa: 88, glow: 40, an: 'breathe' },
    { id: 'titulo', type: 'text', x: 100, y: 580, w: 880, h: 230, txt: 'OBRIGADO\nPOR VIR!', fs: 110, fw: 800, al: 'center', sh: true, lh: 1.05, an: 'in' },
    { id: 'sub', type: 'text', x: 100, y: 830, w: 880, h: 70, txt: 'a live termina em', fs: 40, fw: 600, c: 'a', al: 'center' },
    { id: 'cont', type: 'countdown', x: 140, y: 920, w: 800, h: 280, min: 3, done: 'Até a próxima!', fs: 190, al: 'center', sh: true }
  ]);

  const marcar = (p, g) => { p.grupo = g; return p; };
  marcar(nuvem, 'h'); marcar(conversa, 'h'); marcar(afk, 'h'); marcar(madrugada, 'h'); marcar(vazio, 'x');

  const TEMAS = {
    roxo: { nome: { pt: 'Roxo', en: 'Purple' }, t: { p: '#7B2CF2', a: '#A970FF', pn: '#11111a', tx: '#ffffff' } },
    ciano: { nome: { pt: 'Ciano neon', en: 'Neon cyan' }, t: { p: '#00B8D9', a: '#6FF3FF', pn: '#06141c', tx: '#ffffff' } },
    rosa: { nome: { pt: 'Rosa', en: 'Pink' }, t: { p: '#E91E8C', a: '#FF7BC4', pn: '#1a0a14', tx: '#ffffff' } },
    verde: { nome: { pt: 'Verde', en: 'Green' }, t: { p: '#1FAA59', a: '#7CF0A6', pn: '#0a1510', tx: '#ffffff' } },
    laranja: { nome: { pt: 'Laranja', en: 'Orange' }, t: { p: '#F26B1D', a: '#FFB36B', pn: '#1a0f08', tx: '#ffffff' } },
    vermelho: { nome: { pt: 'Vermelho', en: 'Red' }, t: { p: '#D7263D', a: '#FF7F8E', pn: '#1a0a0d', tx: '#ffffff' } },
    mono: { nome: { pt: 'Preto e branco', en: 'Black & white' }, t: { p: '#ffffff', a: '#bdbdbd', pn: '#0d0d0d', tx: '#ffffff' } }
  };

  g.OverlayPresets = {
    comecando, jogo: nuvem, jogoMeta, jogoChat: jogoChatSemCam, soJogo, conversa, afk, madrugada, encerrando, metaCena,
    pngJogo, pngJogoChat, pngConversa, pngRift,
    vComecando, vConversa, vJogo, vAfk, vFim,
    vazio
  };
  g.OverlayThemes = TEMAS;
})(window);
