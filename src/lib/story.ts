/**
 * GERADOR DE STORIES (1080 × 1920)
 * Desenha no navegador, com as fontes e vetores oficiais, uma imagem pronta
 * para o Instagram. Margens seguras: conteúdo importante entre y≈260 e y≈1660
 * (fora das áreas cobertas pela interface do Instagram).
 */
import { MEDAL } from '../components/brand/logoPaths';
import { LEAF } from '../components/brand/leafPath';
import { site } from '../config/site';

export const W = 1080;
export const H = 1920;

const C = {
  noite: '#12241C',
  noite2: '#0c1913',
  verde: '#1E3A2F',
  verde2: '#284a3c',
  papel: '#F4F0E6',
  papel2: '#EBE4D3',
  tinta: '#0F1C16',
  ouro: '#B08D57',
  ouroClaro: '#CDB186',
  ouroEscuro: '#7A5C30',
  salvia: '#93A698',
};

const F_DISPLAY = '"Playfair Display Variable", "Playfair Display", Georgia, serif';
const F_SANS = '"Inter Variable", Inter, system-ui, sans-serif';
const F_SCRIPT = '"Cormorant Garamond", Georgia, serif';

export type StoryTema = 'noite' | 'papel';

export type StoryConteudo =
  | { tipo: 'frase'; frase: string; destaque?: string; tema?: StoryTema }
  | { tipo: 'apoio' }
  | { tipo: 'votar'; dias: number; dataTexto: string; confirmada: boolean }
  | { tipo: 'proposta'; eixoNumero: string; eixoTitulo: string; titulo: string; texto: string }
  | { tipo: 'membro'; nome: string; cargo: string; turma: number; iniciais: string; foto?: string | null };

function vb(v: string) {
  const [x, y, w, h] = v.split(' ').map(Number);
  return { x: x!, y: y!, w: w!, h: h! };
}

async function garantirFontes() {
  if (!('fonts' in document)) return;
  await Promise.all([
    document.fonts.load(`800 100px ${F_DISPLAY}`),
    document.fonts.load(`600 100px ${F_DISPLAY}`),
    document.fonts.load(`italic 600 100px ${F_DISPLAY}`),
    document.fonts.load(`500 40px ${F_SANS}`),
    document.fonts.load(`600 40px ${F_SANS}`),
    document.fonts.load(`italic 500 60px ${F_SCRIPT}`),
  ]).catch(() => undefined);
}

function letterSpacing(ctx: CanvasRenderingContext2D, px: number) {
  // Suportado nos navegadores atuais; ignorado com segurança nos demais.
  (ctx as CanvasRenderingContext2D & { letterSpacing?: string }).letterSpacing = `${px}px`;
}

function quebrarLinhas(ctx: CanvasRenderingContext2D, texto: string, larguraMax: number): string[] {
  const palavras = texto.split(/\s+/);
  const linhas: string[] = [];
  let atual = '';
  for (const p of palavras) {
    const teste = atual ? `${atual} ${p}` : p;
    if (ctx.measureText(teste).width > larguraMax && atual) {
      linhas.push(atual);
      atual = p;
    } else atual = teste;
  }
  if (atual) linhas.push(atual);
  return linhas;
}

/** Ajusta o tamanho da fonte até o bloco caber em largura e número de linhas. */
function ajustarFonte(ctx: CanvasRenderingContext2D, texto: string, fonte: (s: number) => string, largura: number, maxLinhas: number, inicio: number, minimo: number) {
  let s = inicio;
  for (; s > minimo; s -= 4) {
    ctx.font = fonte(s);
    const linhas = quebrarLinhas(ctx, texto, largura);
    const maiorPalavra = Math.max(...texto.split(/\s+/).map((w) => ctx.measureText(w).width));
    if (linhas.length <= maxLinhas && maiorPalavra <= largura) return { size: s, linhas };
  }
  ctx.font = fonte(minimo);
  return { size: minimo, linhas: quebrarLinhas(ctx, texto, largura) };
}

function ruido(ctx: CanvasRenderingContext2D, alpha: number, claro: boolean) {
  const n = document.createElement('canvas');
  n.width = n.height = 180;
  const nc = n.getContext('2d')!;
  const img = nc.createImageData(180, 180);
  for (let i = 0; i < img.data.length; i += 4) {
    const v = Math.random() * 255;
    img.data[i] = img.data[i + 1] = img.data[i + 2] = claro ? v : v * 0.6;
    img.data[i + 3] = 255;
  }
  nc.putImageData(img, 0, 0);
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.globalCompositeOperation = claro ? 'overlay' : 'multiply';
  ctx.fillStyle = ctx.createPattern(n, 'repeat')!;
  ctx.fillRect(0, 0, W, H);
  ctx.restore();
}

function desenharPath(ctx: CanvasRenderingContext2D, d: string, viewBox: string, x: number, y: number, largura: number, cor: string, opts: { alpha?: number; flipX?: boolean; rot?: number; evenodd?: boolean } = {}) {
  const v = vb(viewBox);
  const escala = largura / v.w;
  ctx.save();
  ctx.globalAlpha = opts.alpha ?? 1;
  ctx.translate(x, y);
  if (opts.rot) ctx.rotate(opts.rot);
  if (opts.flipX) ctx.scale(-1, 1);
  ctx.scale(escala, escala);
  ctx.translate(-v.x, -v.y);
  ctx.fillStyle = cor;
  ctx.fill(new Path2D(d), opts.evenodd ? 'evenodd' : 'nonzero');
  ctx.restore();
  return { altura: v.h * escala };
}

function fundo(ctx: CanvasRenderingContext2D, tema: StoryTema) {
  if (tema === 'noite') {
    const g = ctx.createRadialGradient(W / 2, H * 0.42, 80, W / 2, H * 0.5, H * 0.75);
    g.addColorStop(0, C.verde2);
    g.addColorStop(0.45, C.verde);
    g.addColorStop(1, C.noite2);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
    // Folhagem em gravura nos cantos
    desenharPath(ctx, LEAF.d, LEAF.viewBox, -60, 1180, 520, C.ouro, { alpha: 0.32 });
    desenharPath(ctx, LEAF.d, LEAF.viewBox, W + 70, -120, 470, C.ouro, { alpha: 0.22, flipX: true });
    ruido(ctx, 0.07, true);
  } else {
    ctx.fillStyle = C.papel;
    ctx.fillRect(0, 0, W, H);
    desenharPath(ctx, LEAF.d, LEAF.viewBox, W + 40, 1140, 520, C.verde, { alpha: 0.12, flipX: true });
    desenharPath(ctx, LEAF.d, LEAF.viewBox, -80, -160, 440, C.verde, { alpha: 0.08 });
    ruido(ctx, 0.1, false);
  }
}

function fio(ctx: CanvasRenderingContext2D, cx: number, y: number, meia: number, cor: string) {
  ctx.save();
  ctx.strokeStyle = cor;
  ctx.fillStyle = cor;
  ctx.lineWidth = 2;
  ctx.globalAlpha = 0.85;
  ctx.beginPath();
  ctx.moveTo(cx - meia, y);
  ctx.lineTo(cx - 18, y);
  ctx.moveTo(cx + 18, y);
  ctx.lineTo(cx + meia, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx, y - 9);
  ctx.lineTo(cx + 9, y);
  ctx.lineTo(cx, y + 9);
  ctx.lineTo(cx - 9, y);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function pincel(ctx: CanvasRenderingContext2D, x1: number, x2: number, y: number, cor: string) {
  ctx.save();
  ctx.strokeStyle = cor;
  ctx.lineCap = 'round';
  ctx.lineWidth = 9;
  ctx.beginPath();
  ctx.moveTo(x1, y + 6);
  ctx.bezierCurveTo(x1 + (x2 - x1) * 0.3, y - 4, x1 + (x2 - x1) * 0.7, y - 2, x2, y + 2);
  ctx.stroke();
  ctx.lineWidth = 3;
  ctx.globalAlpha = 0.6;
  ctx.beginPath();
  ctx.moveTo(x1 + 40, y + 16);
  ctx.bezierCurveTo(x1 + (x2 - x1) * 0.4, y + 10, x1 + (x2 - x1) * 0.7, y + 12, x2 - 30, y + 14);
  ctx.stroke();
  ctx.restore();
}

function cabecalho(ctx: CanvasRenderingContext2D, tema: StoryTema) {
  const claro = tema === 'noite';
  const cor = claro ? C.papel : C.verde;
  const ouro = claro ? C.ouroClaro : C.ouroEscuro;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = ouro;
  ctx.font = `600 26px ${F_SANS}`;
  letterSpacing(ctx, 9);
  ctx.fillText('GESTÃO', W / 2, 300);
  letterSpacing(ctx, 0);
  ctx.fillStyle = cor;
  ctx.font = `800 64px ${F_DISPLAY}`;
  ctx.fillText('DR. VITAL BRAZIL', W / 2, 372);
  ctx.fillStyle = ouro;
  ctx.font = `500 24px ${F_SANS}`;
  letterSpacing(ctx, 8);
  ctx.fillText('CA MEDICINA FAPI', W / 2, 418);
  letterSpacing(ctx, 0);
  fio(ctx, W / 2, 462, 120, claro ? C.ouro : C.ouroEscuro);
}

function rodape(ctx: CanvasRenderingContext2D, tema: StoryTema) {
  const claro = tema === 'noite';
  ctx.textAlign = 'center';
  fio(ctx, W / 2, 1560, 90, claro ? C.ouro : C.ouroEscuro);
  ctx.fillStyle = claro ? C.papel : C.verde;
  ctx.font = `600 34px ${F_SANS}`;
  letterSpacing(ctx, 2);
  ctx.fillText(site.instagram.handle, W / 2, 1626);
  letterSpacing(ctx, 0);
  ctx.fillStyle = claro ? C.salvia : C.ouroEscuro;
  ctx.font = `500 24px ${F_SANS}`;
  letterSpacing(ctx, 4);
  ctx.fillText(site.url.replace(/^https?:\/\//, '').toUpperCase(), W / 2, 1670);
  letterSpacing(ctx, 0);
}

function fraseGrande(ctx: CanvasRenderingContext2D, frase: string, destaque: string | undefined, tema: StoryTema, yCentro: number, maxLinhas = 6) {
  const claro = tema === 'noite';
  const texto = frase.toUpperCase();
  const { size, linhas } = ajustarFonte(ctx, texto, (s) => `800 ${s}px ${F_DISPLAY}`, 900, maxLinhas, 150, 64);
  const lh = size * 1.02;
  const total = lh * linhas.length;
  let y = yCentro - total / 2 + size * 0.8;
  ctx.textAlign = 'center';
  const alvo = destaque?.toUpperCase();
  for (const linha of linhas) {
    ctx.font = `800 ${size}px ${F_DISPLAY}`;
    ctx.fillStyle = claro ? C.papel : C.verde;
    ctx.fillText(linha, W / 2, y);
    if (alvo) {
      const idx = linha.indexOf(alvo);
      if (idx >= 0) {
        const larguraLinha = ctx.measureText(linha).width;
        const antes = ctx.measureText(linha.slice(0, idx)).width;
        const w = ctx.measureText(alvo).width;
        const x1 = W / 2 - larguraLinha / 2 + antes;
        // palavra destacada em ouro + pincelada
        ctx.fillStyle = claro ? C.ouroClaro : C.ouroEscuro;
        ctx.textAlign = 'left';
        ctx.fillText(alvo, x1, y);
        ctx.textAlign = 'center';
        pincel(ctx, x1 - 6, x1 + w + 6, y + size * 0.16, C.ouro);
      }
    }
    y += lh;
  }
  return { fim: y };
}

async function carregarImagem(src: string) {
  const img = new Image();
  img.decoding = 'async';
  img.src = src;
  await img.decode();
  return img;
}

export async function gerarStory(c: StoryConteudo): Promise<Blob> {
  await garantirFontes();
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d')!;

  switch (c.tipo) {
    case 'frase': {
      const tema = c.tema ?? 'noite';
      fundo(ctx, tema);
      cabecalho(ctx, tema);
      fraseGrande(ctx, c.frase, c.destaque, tema, 1010);
      rodape(ctx, tema);
      break;
    }
    case 'apoio': {
      fundo(ctx, 'noite');
      cabecalho(ctx, 'noite');
      // Medalhão em papel, retrato vazado
      desenharPath(ctx, MEDAL.d, MEDAL.viewBox, W / 2 - 250, 560, 500, C.papel, { evenodd: true });
      ctx.textAlign = 'center';
      ctx.fillStyle = C.ouroClaro;
      ctx.font = `italic 500 72px ${F_SCRIPT}`;
      ctx.fillText('Eu apoio a', W / 2, 1210);
      ctx.fillStyle = C.papel;
      ctx.font = `800 96px ${F_DISPLAY}`;
      ctx.fillText('GESTÃO', W / 2, 1310);
      ctx.fillText('VITAL BRAZIL', W / 2, 1408);
      pincel(ctx, 250, 830, 1438, C.ouro);
      rodape(ctx, 'noite');
      break;
    }
    case 'votar': {
      fundo(ctx, 'noite');
      cabecalho(ctx, 'noite');
      ctx.textAlign = 'center';
      if (c.dias > 1) {
        ctx.fillStyle = C.ouroClaro;
        ctx.font = `600 30px ${F_SANS}`;
        letterSpacing(ctx, 10);
        ctx.fillText('FALTAM', W / 2, 640);
        letterSpacing(ctx, 0);
        ctx.fillStyle = C.ouro;
        ctx.font = `800 ${c.dias > 99 ? 300 : 420}px ${F_DISPLAY}`;
        ctx.fillText(String(c.dias), W / 2, 1000);
        ctx.fillStyle = C.papel;
        ctx.font = `600 64px ${F_DISPLAY}`;
        ctx.fillText('dias para a eleição', W / 2, 1110);
      } else {
        ctx.fillStyle = C.papel;
        ctx.font = `800 120px ${F_DISPLAY}`;
        const linhas = c.dias === 1 ? ['AMANHÃ,', 'SUA VOZ', 'VIRA VOTO.'] : c.dias === 0 ? ['HOJE É', 'DIA DE', 'VOTAR.'] : ['OBRIGADO', 'PELA', 'CONFIANÇA.'];
        linhas.forEach((l, i) => ctx.fillText(l, W / 2, 800 + i * 124));
        pincel(ctx, 240, 840, 1080, C.ouro);
      }
      ctx.fillStyle = C.ouroClaro;
      ctx.font = `italic 500 58px ${F_SCRIPT}`;
      ctx.fillText(c.dataTexto, W / 2, 1250);
      if (!c.confirmada) {
        ctx.fillStyle = C.salvia;
        ctx.font = `500 26px ${F_SANS}`;
        letterSpacing(ctx, 6);
        ctx.fillText('DATA A CONFIRMAR', W / 2, 1310);
        letterSpacing(ctx, 0);
      }
      ctx.fillStyle = C.papel;
      ctx.font = `500 34px ${F_SANS}`;
      ctx.fillText('Eleição do CA de Medicina FAPI', W / 2, 1420);
      rodape(ctx, 'noite');
      break;
    }
    case 'proposta': {
      fundo(ctx, 'papel');
      cabecalho(ctx, 'papel');
      ctx.textAlign = 'center';
      ctx.fillStyle = C.ouroEscuro;
      ctx.font = `600 28px ${F_SANS}`;
      letterSpacing(ctx, 8);
      ctx.fillText(`EIXO ${c.eixoNumero}`, W / 2, 600);
      letterSpacing(ctx, 0);
      ctx.fillStyle = C.verde;
      ctx.font = `600 40px ${F_DISPLAY}`;
      ctx.fillText(c.eixoTitulo, W / 2, 660);
      // Título
      const { size, linhas } = ajustarFonte(ctx, c.titulo.toUpperCase(), (s) => `800 ${s}px ${F_DISPLAY}`, 880, 4, 110, 60);
      let y = 820;
      ctx.fillStyle = C.tinta;
      for (const l of linhas) {
        ctx.font = `800 ${size}px ${F_DISPLAY}`;
        ctx.fillText(l, W / 2, y);
        y += size * 1.04;
      }
      pincel(ctx, W / 2 - 200, W / 2 + 200, y - size * 0.6, C.ouro);
      // Texto
      ctx.font = `500 40px ${F_SANS}`;
      ctx.fillStyle = '#3a4a42';
      const corpo = quebrarLinhas(ctx, c.texto, 820).slice(0, 6);
      y += 60;
      for (const l of corpo) {
        ctx.fillText(l, W / 2, y);
        y += 58;
      }
      rodape(ctx, 'papel');
      break;
    }
    case 'membro': {
      fundo(ctx, 'noite');
      cabecalho(ctx, 'noite');
      const cx = W / 2;
      const cy = 800;
      const r = 230;
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      const g = ctx.createRadialGradient(cx, cy - 60, 20, cx, cy, r);
      g.addColorStop(0, C.verde2);
      g.addColorStop(1, C.noite);
      ctx.fillStyle = g;
      ctx.fillRect(cx - r, cy - r, r * 2, r * 2);
      let desenhou = false;
      if (c.foto) {
        try {
          const img = await carregarImagem(c.foto);
          const s = Math.max((r * 2) / img.width, (r * 2) / img.height);
          const w = img.width * s;
          const h = img.height * s;
          ctx.drawImage(img, cx - w / 2, cy - h * 0.4, w, h);
          desenhou = true;
        } catch {
          /* usa iniciais */
        }
      }
      if (!desenhou) {
        ctx.fillStyle = C.papel;
        ctx.textAlign = 'center';
        ctx.font = `600 190px ${F_DISPLAY}`;
        ctx.fillText(c.iniciais, cx, cy + 66);
      }
      ctx.restore();
      ctx.strokeStyle = C.ouro;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(cx, cy, r + 14, 0, Math.PI * 2);
      ctx.stroke();
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(cx, cy, r + 26, 0, Math.PI * 2);
      ctx.stroke();

      ctx.textAlign = 'center';
      ctx.fillStyle = C.ouroClaro;
      ctx.font = `italic 500 60px ${F_SCRIPT}`;
      ctx.fillText('Eu estou na chapa', W / 2, 1150);
      const { size, linhas } = ajustarFonte(ctx, c.nome, (s) => `700 ${s}px ${F_DISPLAY}`, 900, 2, 76, 48);
      let y = 1250;
      ctx.fillStyle = C.papel;
      for (const l of linhas) {
        ctx.font = `700 ${size}px ${F_DISPLAY}`;
        ctx.fillText(l, W / 2, y);
        y += size * 1.1;
      }
      ctx.fillStyle = C.ouroClaro;
      ctx.font = `600 28px ${F_SANS}`;
      letterSpacing(ctx, 6);
      ctx.fillText(c.cargo.toUpperCase(), W / 2, y + 20);
      ctx.fillStyle = C.salvia;
      ctx.font = `500 26px ${F_SANS}`;
      ctx.fillText(`TURMA ${c.turma}`, W / 2, y + 70);
      letterSpacing(ctx, 0);
      rodape(ctx, 'noite');
      break;
    }
  }

  return new Promise((resolve, reject) => canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('Falha ao gerar imagem'))), 'image/png'));
}
