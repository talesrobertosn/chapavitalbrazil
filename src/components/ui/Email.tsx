import { useEffect, useState } from 'react';
import { Mail } from 'lucide-react';
import { site } from '../../config/site';
import { cn } from '../../lib/cn';

/** Link de e-mail montado só no navegador (robôs que leem o HTML não veem o endereço). */
export function Email({ className, icone = true }: { className?: string; icone?: boolean }) {
  const [end, setEnd] = useState('');
  useEffect(() => setEnd(`${site.email.usuario}@${site.email.dominio}`), []);
  if (!end) return <span className={className}>e-mail</span>;
  return (
    <a href={`mailto:${end}`} className={cn('inline-flex items-center gap-2 break-all', className)}>
      {icone && <Mail size={16} strokeWidth={1.4} className="shrink-0" />}
      {end}
    </a>
  );
}
