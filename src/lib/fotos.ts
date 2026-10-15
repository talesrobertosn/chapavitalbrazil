/**
 * Fotos da diretoria: qualquer arquivo em src/assets/diretoria/<slug>.<ext>
 * é encontrado automaticamente, otimizado (WebP) e associado ao membro.
 */
const grandes = import.meta.glob<string>('../assets/diretoria/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG}', {
  eager: true,
  import: 'default',
  query: '?w=900&format=webp&quality=80',
});
const pequenas = import.meta.glob<string>('../assets/diretoria/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG}', {
  eager: true,
  import: 'default',
  query: '?w=320&format=webp&quality=78',
});

function indexar(mapa: Record<string, string>) {
  const out: Record<string, string> = {};
  for (const [caminho, url] of Object.entries(mapa)) {
    const nome = caminho.split('/').pop()!.replace(/\.[^.]+$/, '').toLowerCase();
    out[nome] = url;
  }
  return out;
}

const G = indexar(grandes);
const P = indexar(pequenas);

export function fotoDe(slug: string): { grande: string; pequena: string } | null {
  const g = G[slug];
  return g ? { grande: g, pequena: P[slug] ?? g } : null;
}
