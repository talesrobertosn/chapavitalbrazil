import { motion } from 'motion/react';
import { MEDAL } from './logoPaths';
import { EASE_IN_OUT, EASE_OUT } from '../../lib/motion';

/**
 * Envelope de papel com selo de cera verde (desenho próprio, em traço fino).
 * `aberto`: o selo se parte, a aba vira e a carta desliza para fora.
 */
export function Envelope({ aberto = false, className }: { aberto?: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 320 240" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="env-papel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F7F3EA" />
          <stop offset="1" stopColor="#E6DDC8" />
        </linearGradient>
        <radialGradient id="env-cera" cx="0.4" cy="0.35" r="0.75">
          <stop offset="0" stopColor="#3d6a56" />
          <stop offset="0.6" stopColor="#1E3A2F" />
          <stop offset="1" stopColor="#0f1f18" />
        </radialGradient>
        <clipPath id="env-corpo">
          <rect x="20" y="70" width="280" height="160" rx="3" />
        </clipPath>
      </defs>

      {/* Fundo do envelope */}
      <rect x="20" y="70" width="280" height="160" rx="3" fill="#DCD1B8" />

      {/* Carta */}
      <motion.g initial={false} animate={{ y: aberto ? -78 : 0 }} transition={{ duration: 0.9, ease: EASE_OUT, delay: aberto ? 0.45 : 0 }}>
        <rect x="42" y="86" width="236" height="150" rx="2" fill="#FBF8F1" stroke="#B08D57" strokeOpacity="0.35" />
        <rect x="48" y="92" width="224" height="138" rx="1" fill="none" stroke="#1E3A2F" strokeOpacity="0.25" strokeWidth="0.8" />
        <text x="160" y="122" textAnchor="middle" fontFamily="'Cormorant Garamond', Georgia, serif" fontStyle="italic" fontSize="17" fill="#1E3A2F">
          Fala. A gente escuta.
        </text>
        {[138, 148, 158, 168].map((y, i) => (
          <line key={y} x1="70" x2={i === 3 ? 190 : 250} y1={y} y2={y} stroke="#1E3A2F" strokeOpacity="0.18" strokeWidth="1" />
        ))}
      </motion.g>

      {/* Frente (bolso) */}
      <g clipPath="url(#env-corpo)">
        <path d="M20 230 L160 140 L300 230 Z" fill="url(#env-papel)" />
        <path d="M20 70 L132 160 L20 230 Z" fill="#EFE8D8" />
        <path d="M300 70 L188 160 L300 230 Z" fill="#EAE2CF" />
        <path d="M20 230 L160 140 L300 230" fill="none" stroke="#B08D57" strokeOpacity="0.35" strokeWidth="0.8" />
      </g>
      <rect x="20" y="70" width="280" height="160" rx="3" fill="none" stroke="#B08D57" strokeOpacity="0.5" />

      {/* Aba superior */}
      <motion.g
        style={{ transformOrigin: '160px 70px', transformBox: 'view-box' }}
        initial={false}
        animate={{ scaleY: aberto ? -1 : 1 }}
        transition={{ duration: 0.7, ease: EASE_IN_OUT, delay: aberto ? 0.15 : 0.35 }}
      >
        <path d="M20 70 L160 168 L300 70 Z" fill="#F2ECDD" stroke="#B08D57" strokeOpacity="0.45" strokeWidth="0.8" />
      </motion.g>

      {/* Selo de cera */}
      <motion.g
        style={{ transformOrigin: '160px 166px', transformBox: 'view-box' }}
        initial={false}
        animate={aberto ? { scale: 0.6, opacity: 0, rotate: -25 } : { scale: 1, opacity: 1, rotate: 0 }}
        transition={{ duration: 0.45, ease: EASE_OUT }}
      >
        <path
          d="M160 138 c8 0 11 4 16 6 s9 6 10 12 -1 10 0 14 -3 10 -9 13 -10 5 -17 5 -12-2 -17-5 -9-7 -9-13 1-9 0-14 4-9 10-12 9-6 16-6z"
          fill="url(#env-cera)"
        />
        <circle cx="160" cy="166" r="19" fill="none" stroke="#0c1913" strokeOpacity="0.5" />
        <svg x="143" y="149" width="34" height="34" viewBox={MEDAL.viewBox}>
          <path d={MEDAL.d} fillRule="evenodd" fill="#0c1913" fillOpacity="0.55" />
        </svg>
      </motion.g>
    </svg>
  );
}
