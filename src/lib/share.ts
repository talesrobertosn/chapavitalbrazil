import { site } from '../config/site';

/** Link absoluto para uma rota do site (para mensagens e prévias). */
export function linkPublico(rota = '/') {
  return `${site.url}${rota === '/' ? '/' : rota}`;
}

/** Abre o WhatsApp com texto pronto (app no celular, web no computador). */
export function whatsappUrl(texto: string) {
  return `https://wa.me/?text=${encodeURIComponent(texto)}`;
}

export const TEXTOS_WHATSAPP = {
  site: () =>
    `🟢 *Gestão Dr. Vital Brazil* · CA Medicina FAPI\n\nMais que uma gestão, um compromisso com a nossa formação.\n\nConhece o programa, a diretoria e a história por trás do nome:\n${linkPublico('/')}\n\nSegue também no Instagram: ${site.instagram.handle}`,
  programa: () =>
    `📜 *O programa inteiro da Gestão Dr. Vital Brazil*\n5 eixos, propostas que dizem o que vamos fazer, e como você pode nos cobrar.\n\n${linkPublico('/programa')}`,
  proposta: (titulo: string, eixo: string, rota: string) =>
    `💡 *${titulo}*\n${eixo} · Gestão Dr. Vital Brazil\n\n${linkPublico(rota)}`,
  votar: (data: string) =>
    `🗳️ *Eleição do CA de Medicina FAPI*\n${data}\n\nSua voz vira voto. Vê como, onde e quando:\n${linkPublico('/votar')}`,
  calouro: () => `✉️ *Querido calouro,*\numa carta da Gestão Dr. Vital Brazil pra quem está chegando.\n\n${linkPublico('/calouro')}`,
  transferido: () => `✉️ *Querido transferido,*\numa carta da Gestão Dr. Vital Brazil pra quem chegou depois: ninguém precisa descobrir tudo sozinho.\n\n${linkPublico('/transferido')}`,
  membro: (nome: string, cargo: string, rota: string) => `${nome} · ${cargo}\nGestão Dr. Vital Brazil\n\n${linkPublico(rota)}`,
};

/** Compartilhamento nativo de link (menu do sistema), com cópia como alternativa. */
export async function compartilharLink(dados: { title: string; text?: string; url: string }): Promise<'compartilhado' | 'copiado' | 'cancelado'> {
  try {
    if (navigator.share) {
      await navigator.share(dados);
      return 'compartilhado';
    }
  } catch (e) {
    if ((e as DOMException)?.name === 'AbortError') return 'cancelado';
  }
  try {
    await navigator.clipboard.writeText(dados.url);
    return 'copiado';
  } catch {
    return 'cancelado';
  }
}

/**
 * Compartilha um arquivo de imagem (Stories). No celular abre o menu nativo,
 * onde aparecem Instagram, WhatsApp etc. Sem suporte, baixa a imagem.
 */
export async function compartilharImagem(blob: Blob, nomeArquivo: string, texto: string): Promise<'compartilhado' | 'baixado' | 'cancelado'> {
  const file = new File([blob], nomeArquivo, { type: 'image/png' });
  try {
    if (navigator.canShare?.({ files: [file] })) {
      await navigator.share({ files: [file], text: texto });
      return 'compartilhado';
    }
  } catch (e) {
    if ((e as DOMException)?.name === 'AbortError') return 'cancelado';
  }
  baixar(blob, nomeArquivo);
  return 'baixado';
}

export function baixar(blob: Blob, nomeArquivo: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = nomeArquivo;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 4000);
}

/** Arquivo .ics para adicionar a eleição à agenda (iPhone, Android, Outlook). */
export function icsEleicao(dataISO: string, titulo: string, descricao: string, local: string) {
  const d = dataISO.replace(/-/g, '');
  const prox = new Date(`${dataISO}T12:00:00Z`);
  prox.setUTCDate(prox.getUTCDate() + 1);
  const fim = prox.toISOString().slice(0, 10).replace(/-/g, '');
  const esc = (s: string) => s.replace(/\\/g, '\\\\').replace(/[,;]/g, (m) => `\\${m}`).replace(/\n/g, '\\n');
  const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const linhas = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Gestao Dr. Vital Brazil//Eleicao CA//PT-BR',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:eleicao-ca-${d}@chapavitalbrazil`,
    `DTSTAMP:${stamp}`,
    `DTSTART;VALUE=DATE:${d}`,
    `DTEND;VALUE=DATE:${fim}`,
    `SUMMARY:${esc(titulo)}`,
    `DESCRIPTION:${esc(descricao)}`,
    local ? `LOCATION:${esc(local)}` : '',
    'BEGIN:VALARM',
    'TRIGGER:-PT15H',
    'ACTION:DISPLAY',
    `DESCRIPTION:${esc(titulo)}`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].filter(Boolean);
  return new Blob([linhas.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
}

export function googleAgendaUrl(dataISO: string, titulo: string, descricao: string, local: string) {
  const d = dataISO.replace(/-/g, '');
  const prox = new Date(`${dataISO}T12:00:00Z`);
  prox.setUTCDate(prox.getUTCDate() + 1);
  const fim = prox.toISOString().slice(0, 10).replace(/-/g, '');
  const p = new URLSearchParams({ action: 'TEMPLATE', text: titulo, dates: `${d}/${fim}`, details: descricao, location: local });
  return `https://calendar.google.com/calendar/render?${p.toString()}`;
}
