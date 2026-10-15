/**
 * Imagens das artes da chapa, otimizadas em WebP em dois tamanhos.
 * `src` é a versão maior (para navegadores que ignoram srcset).
 */
import retrato from './portrait-snake.jpg?w=425;850&format=webp&quality=82&as=srcset';
import laboratorio from './portrait-lab.jpg?w=360;720&format=webp&quality=82&as=srcset';
import butantan from './butantan.jpg?w=434;868&format=webp&quality=80&as=srcset';
import butantan2 from './butantan2.jpg?w=380;760&format=webp&quality=80&as=srcset';
import serpente from './snake.jpg?w=400;800&format=webp&quality=78&as=srcset';

function img(srcset: string) {
  const partes = srcset.split(',').map((p) => p.trim().split(' ')[0]!);
  return { srcSet: srcset, src: partes[partes.length - 1]! };
}

export const IMG = {
  retrato: img(retrato),
  laboratorio: img(laboratorio),
  butantan: img(butantan),
  butantan2: img(butantan2),
  serpente: img(serpente),
};
