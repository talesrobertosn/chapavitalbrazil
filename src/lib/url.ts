/** Junta o caminho base do site (GitHub Pages ou domínio próprio) a uma rota. */
export function asset(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
}
