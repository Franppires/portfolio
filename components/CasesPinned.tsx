import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { gsap, ScrollTrigger, prefersReduced } from './motion';
import { Project } from '../types';
import { isAgency } from '../content';
import Carousel from './Carousel';

interface CaseItem {
  id: string;
  kind: string;
  challenge: string;
  solution: string;
  project: Project;
}

interface Props {
  cases: CaseItem[];
  labels: { kicker: string; title: string; challenge: string; solution: string; visit: string };
  agencyTag: string;
}

/**
 * Desktop: a imagem fica fixa à esquerda e troca conforme o texto de cada case passa à direita.
 * Celular: cada case com a imagem em cima.
 */
const CasesPinned: React.FC<Props> = ({ cases, labels, agencyTag }) => {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.case-block').forEach((block, i) => {
        ScrollTrigger.create({
          trigger: block,
          start: 'top 55%',
          end: 'bottom 55%',
          onToggle: (self) => self.isActive && setActive(i),
        });
        if (!prefersReduced()) {
          gsap.from(block.querySelectorAll('.case-anim'), {
            y: 40, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.08,
            scrollTrigger: { trigger: block, start: 'top 75%' },
          });
        }
      });
    }, root);
    return () => ctx.revert();
  }, [cases]);

  return (
    <section ref={root} id="work" className="relative py-24 md:py-32 border-t border-line">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 lg:mb-8">
          <p className="text-[11px] uppercase tracking-widest text-accent mb-3">{labels.kicker}</p>
          <h2 className="split-title text-3xl md:text-6xl font-medium tracking-tighter text-ink max-w-3xl">{labels.title}</h2>
        </div>

        <div className="hidden lg:grid lg:grid-cols-12 lg:gap-16">
          {/* Imagem fixa (desktop) */}
          <div className="hidden lg:block lg:col-span-7">
            <div className="sticky top-[14vh] h-[72vh] flex items-center">
              <div className="relative w-full aspect-[16/10]">
                {cases.map((c, i) => (
                  <a
                    key={c.id}
                    href={c.project.link}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor={labels.visit}
                    className={`case-frame ${i === active ? 'is-active' : ''}`}
                    tabIndex={i === active ? 0 : -1}
                  >
                    <div className="showcase-bar"><i /><i /><i /></div>
                    <img src={c.project.imageUrl} alt={c.project.title} loading="lazy" />
                  </a>
                ))}
                <div className="absolute -bottom-12 left-0 flex items-center gap-4 text-sm text-muted">
                  <span className="text-ink font-medium tabular-nums">0{active + 1}</span>
                  <span className="w-24 h-px bg-line relative overflow-hidden">
                    <span className="absolute inset-y-0 left-0 bg-accent transition-all duration-500" style={{ width: `${((active + 1) / cases.length) * 100}%` }} />
                  </span>
                  <span className="tabular-nums">0{cases.length}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Textos */}
          <div className="lg:col-span-5">
            {cases.map((c) => (
              <article key={c.id} className="case-block py-12 lg:min-h-[80vh] lg:flex lg:flex-col lg:justify-center">
                <p className="case-anim flex flex-wrap items-center gap-3 text-xs uppercase tracking-widest text-accent mb-3">
                  {c.kind}
                  {isAgency(c.id) && <span className="normal-case tracking-normal text-[11px] text-muted px-2 py-0.5 rounded-full border border-line">{agencyTag}</span>}
                </p>
                <h3 className="case-anim text-3xl md:text-5xl font-medium tracking-tighter text-ink mb-10">{c.project.title}</h3>
                <dl className="space-y-7">
                  <div className="case-anim">
                    <dt className="text-xs uppercase tracking-widest text-muted mb-2">{labels.challenge}</dt>
                    <dd className="text-lg leading-relaxed text-ink">{c.challenge}</dd>
                  </div>
                  <div className="case-anim">
                    <dt className="text-xs uppercase tracking-widest text-muted mb-2">{labels.solution}</dt>
                    <dd className="text-lg leading-relaxed text-ink">{c.solution}</dd>
                  </div>
                </dl>
                <div className="case-anim mt-8 flex flex-wrap gap-2">
                  {c.project.tags.map((tag) => (
                    <span key={tag} className="tag-pill px-2.5 py-1 rounded-md text-xs">{tag}</span>
                  ))}
                </div>
                {c.project.link && (
                  <a href={c.project.link} target="_blank" rel="noreferrer" className="case-anim case-link inline-flex items-center gap-2 mt-8 text-sm font-medium text-ink w-fit">
                    {labels.visit} <ArrowUpRight size={16} />
                  </a>
                )}
              </article>
            ))}
          </div>
        </div>
        {/* Celular: carrossel de cases */}
        <div className="lg:hidden -mx-6">
          <Carousel
            ariaLabel={labels.kicker}
            dots
            arrows={false}
            itemClassName="w-[86vw]"
            trackClassName="px-6 scroll-px-6"
            items={cases.map((c) => (
              <article className="h-full flex flex-col">
                <a href={c.project.link} target="_blank" rel="noreferrer" className="block mb-6 rounded-xl overflow-hidden border border-line" draggable={false}>
                  <img src={c.project.imageUrl} alt={c.project.title} className="w-full aspect-[16/10] object-cover object-top" loading="lazy" draggable={false} />
                </a>
                <p className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-widest text-accent mb-2">
                  {c.kind}
                  {isAgency(c.id) && <span className="normal-case tracking-normal text-[11px] text-muted px-2 py-0.5 rounded-full border border-line">{agencyTag}</span>}
                </p>
                <h3 className="text-2xl font-medium tracking-tight text-ink mb-5">{c.project.title}</h3>
                <dl className="space-y-4 text-[15px]">
                  <div>
                    <dt className="text-[11px] uppercase tracking-widest text-muted mb-1">{labels.challenge}</dt>
                    <dd className="leading-relaxed text-ink">{c.challenge}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] uppercase tracking-widest text-muted mb-1">{labels.solution}</dt>
                    <dd className="leading-relaxed text-ink">{c.solution}</dd>
                  </div>
                </dl>
                {c.project.link && (
                  <a href={c.project.link} target="_blank" rel="noreferrer" className="case-link inline-flex items-center gap-2 mt-6 text-sm font-medium text-ink w-fit">
                    {labels.visit} <ArrowUpRight size={16} />
                  </a>
                )}
              </article>
            ))}
          />
        </div>
      </div>
    </section>
  );
};

export default CasesPinned;
