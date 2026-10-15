// Exporta ícones Lucide (traço fino) como SVG em texto, para usar nas artes.
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import * as L from 'lucide-react';

export function icone(nome, { size = 64, stroke = 1.15, cor = '#CDB186' } = {}) {
  const C = L[nome];
  if (!C) throw new Error(`Ícone não encontrado: ${nome}`);
  return renderToStaticMarkup(createElement(C, { size, strokeWidth: stroke, color: cor }));
}
