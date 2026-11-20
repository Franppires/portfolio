import React, { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { gsap, ScrollTrigger } from './motion';
import { Project } from '../types';
import { LIGHT_COVERS, isAgency } from '../content';

interface Props {
  title: string;
  items: Project[];
  filters: React.ReactNode;
  cursorLabel: string;
  agencyTag: string;
  agencyNote: string;
  swipeHint: string;
}

/**
 * Desktop: a seção fica presa e os trabalhos passam na horizontal com a rolagem.
 * Celular: carrossel horizontal com arraste e encaixe.
 */
const WorkGallery: React.FC<Props> = ({ title, items, filters, cursorLabel, agencyTag, agencyNote, swipeHint }) => {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!section.current || !track.current) return;
    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const el = track.current!;
      const distance = () => Math.max(0, el.scrollWidth - el.clientWidth);
      gsap.to(el, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section.current,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => { if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`; },
        },
      });
    });
    ScrollTrigger.refresh();
    return () => mm.revert();
  }, [items]);

  return (
    <section ref={section} className="relative lg:h-screen lg:flex lg:flex-col lg:justify-center py-24 lg:py-0 overflow-hidden">
      <div className="max-w-7xl w-full mx-auto px-6 flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h2 className="split-title text-3xl md:text-6xl font-medium tracking-tighter text-ink">{title}</h2>
          <p className="text-xs text-muted mt-3">{agencyNote}</p>
        </div>
        {filters}
      </div>

      <div
        ref={track}
        className="work-track flex gap-6 lg:gap-8 px-6 lg:pl-[max(1.5rem,calc((100vw_-_80rem)/2_+_1.5rem))] lg:pr-[10vw] overflow-x-auto snap-x snap-mandatory scroll-px-6"
      >
        {items.map((p, i) => {
          const inner = (
            <>
              <div className="work-media relative">
                {isAgency(p.id) && <span className="agency-tag">{agencyTag}</span>}
                <img src={p.imageUrl} alt="" loading="lazy" className={LIGHT_COVERS.includes(p.id) ? 'cover-light' : ''} />
              </div>
              <div className="flex items-start justify-between gap-4 pt-4">
                <div>
                  <p className="text-xs text-muted tabular-nums mb-1">{String(i + 1).padStart(2, '0')}</p>
                  <h3 className="text-base font-medium text-ink">{p.title}</h3>
                  <p className="text-sm text-muted leading-relaxed mt-1 line-clamp-2">{p.description}</p>
                </div>
                {p.link && <ArrowUpRight size={18} className="text-muted shrink-0 mt-5" />}
              </div>
            </>
          );
          return p.link ? (
            <a key={p.id} href={p.link} target="_blank" rel="noreferrer" data-cursor={cursorLabel} className="work-card snap-start">{inner}</a>
          ) : (
            <div key={p.id} className="work-card snap-start">{inner}</div>
          );
        })}
      </div>

      <p className="lg:hidden px-6 mt-5 text-xs text-muted flex items-center gap-2" aria-hidden="true">
        <span className="swipe-hint">←→</span> {swipeHint}
      </p>

      <div className="hidden lg:block max-w-7xl w-full mx-auto px-6 mt-10">
        <div className="h-px bg-line overflow-hidden">
          <span ref={bar} className="block h-full bg-accent origin-left" style={{ transform: 'scaleX(0)' }} />
        </div>
      </div>
    </section>
  );
};

export default WorkGallery;
