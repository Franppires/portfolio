import React, { useMemo } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Carousel from './Carousel';
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

/** "Mais trabalhos": carrossel que passa sozinho e pausa quando a pessoa interage. */
const WorkGallery: React.FC<Props> = ({ title, items, filters, cursorLabel, agencyTag, agencyNote, swipeHint }) => {
  const slides = useMemo(() => items.map((p, i) => {
    const inner = (
      <>
        <div className="work-media relative">
          {isAgency(p.id) && <span className="agency-tag">{agencyTag}</span>}
          <img src={p.imageUrl} alt="" loading="lazy" draggable={false} className={LIGHT_COVERS.includes(p.id) ? 'cover-light' : ''} />
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
      <a href={p.link} target="_blank" rel="noreferrer" data-cursor={cursorLabel} className="work-card block" draggable={false}>{inner}</a>
    ) : (
      <div className="work-card">{inner}</div>
    );
  }), [items, cursorLabel, agencyTag]);

  return (
    <section className="relative py-24 md:py-32 overflow-hidden border-t border-line">
      <div className="max-w-7xl w-full mx-auto px-6 flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h2 className="split-title text-3xl md:text-6xl font-medium tracking-tighter text-ink">{title}</h2>
          <p className="text-xs text-muted mt-3">{agencyNote}</p>
        </div>
        {filters}
      </div>

      <Carousel
        items={slides}
        autoplay={3500}
        ariaLabel={title}
        itemClassName="w-[78vw] sm:w-[44vw] lg:w-[29vw] xl:w-[360px]"
        trackClassName="carousel-bleed"
      />

      <p className="md:hidden px-6 mt-4 text-xs text-muted flex items-center gap-2" aria-hidden="true">
        <span className="swipe-hint">←→</span> {swipeHint}
      </p>
    </section>
  );
};

export default WorkGallery;
