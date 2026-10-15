/// <reference types="vite/client" />

// Imagens otimizadas pelo vite-imagetools (sempre terminando em &as=srcset).
declare module '*&as=srcset' {
  const srcset: string;
  export default srcset;
}
