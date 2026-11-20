import React, { useEffect, useRef } from 'react';
import { gsap, prefersReduced } from './motion';
import leproGlobal from '../src/assets/hero/lepro-global.webp';
import zaya from '../src/assets/hero/zaya.webp';
import maisfix from '../src/assets/hero/maisfix.webp';
import coala from '../src/assets/hero/coala.webp';
import mpr from '../src/assets/hero/mpr.webp';
import ananery from '../src/assets/hero/ananery.webp';
import lepro from '../src/assets/hero/lepro.webp';
import dwonder from '../src/assets/hero/dwonder.webp';
import indexnet from '../src/assets/hero/indexnet-site.webp';
import leproEs from '../src/assets/hero/lepro-es.webp';
import cocreane from '../src/assets/hero/cocreane.webp';

// Três colunas de prints reais; cada coluna rola em loop (lista duplicada).
const COLUMNS = [
  [leproGlobal, coala, ananery, leproEs],
  [zaya, maisfix, indexnet, dwonder],
  [lepro, mpr, cocreane, leproGlobal],
];

const Shot: React.FC<{ src: string }> = ({ src }) => {
  return (
    <div className="showcase-shot">
      <div className="showcase-bar"><i /><i /><i /></div>
      <img src={src} alt="" decoding="async" />
    </div>
  );
};

const HeroShowcase: React.FC = () => {
  const root = useRef<HTMLDivElement>(null);
  const tilt = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReduced() || !root.current || !tilt.current || !stage.current) return;

    const ctx = gsap.context(() => {
      gsap.set(tilt.current, { transformPerspective: 1800, rotateX: 18, rotateZ: -22, transformOrigin: '60% 40%' });
      // Entrada: a colagem sobe e acende.
      gsap.from(tilt.current, { opacity: 0, y: 120, rotateZ: -32, duration: 1.6, ease: 'power3.out', delay: 0.2 });

      // Rolagem: a colagem se endireita, aproxima e sobe enquanto o topo sai da tela.
      gsap.to(tilt.current, {
        rotateX: 8,
        rotateZ: -16,
        scale: 1.06,
        yPercent: -6,
        ease: 'none',
        scrollTrigger: { trigger: root.current!.parentElement, start: 'top top', end: 'bottom top', scrub: 0.6 },
      });
    }, root);

    // Parallax com o mouse.
    let cleanupMouse = () => {};
    if (window.matchMedia('(pointer: fine)').matches) {
      const xTo = gsap.quickTo(stage.current, 'x', { duration: 1.2, ease: 'power3.out' });
      const yTo = gsap.quickTo(stage.current, 'y', { duration: 1.2, ease: 'power3.out' });
      const onMove = (e: MouseEvent) => {
        xTo((e.clientX / window.innerWidth - 0.5) * -14);
        yTo((e.clientY / window.innerHeight - 0.5) * -8);
      };
      window.addEventListener('mousemove', onMove);
      cleanupMouse = () => window.removeEventListener('mousemove', onMove);
    }

    return () => { ctx.revert(); cleanupMouse(); };
  }, []);

  return (
    <div ref={root} className="showcase" aria-hidden="true">
      <div ref={tilt} className="showcase-tilt">
        <div ref={stage} className="showcase-stage">
          {COLUMNS.map((col, i) => (
            <div key={i} className={`showcase-col ${i % 2 ? 'is-down' : ''}`} style={{ animationDuration: `${110 + i * 20}s` }}>
              {[...col, ...col].map((src, j) => <Shot key={j} src={src} />)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroShowcase;
