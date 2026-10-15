import type { Transition } from 'motion/react';

/**
 * LINGUAGEM DE MOVIMENTO
 * Tudo no site se move com estas curvas e molas. Consistência > quantidade.
 */

/** Desaceleração longa e macia: revelações e entradas. */
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;
/** Entrada e saída simétricas: cortinas e trocas de cena. */
export const EASE_IN_OUT = [0.76, 0, 0.24, 1] as const;
/** Saídas: rápidas, nunca atrasam a próxima cena. */
export const EASE_IN = [0.5, 0, 0.75, 0] as const;

export const DUR = { micro: 0.2, curta: 0.4, media: 0.7, longa: 1.1 } as const;

/** Mola de interface: rápida e amortecida, sem quique. */
export const SPRING_UI: Transition = { type: 'spring', stiffness: 420, damping: 38, mass: 0.8 };
/** Mola de layout: com massa, para elementos que viajam e crescem. */
export const SPRING_LAYOUT: Transition = { type: 'spring', stiffness: 170, damping: 26, mass: 1 };
/** Mola suave para seguir o mouse (paralaxe, inclinação). */
export const SPRING_SOFT = { stiffness: 120, damping: 22, mass: 0.6 } as const;

export const reveal = (delay = 0): Transition => ({ duration: DUR.longa, ease: EASE_OUT, delay });
