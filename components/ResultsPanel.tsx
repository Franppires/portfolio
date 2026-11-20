import React, { useEffect, useRef } from 'react';
import { gsap, prefersReduced } from './motion';
import { LIGHTHOUSE } from '../results';

interface Props {
  labels: {
    kicker: string;
    title: string;
    ringsTitle: string;
    barsTitle: string;
    avg: string;
    categories: { performance: string; accessibility: string; bestPractices: string; seo: string };
    stats: { value: number; suffix: string; label: string }[];
    note: string;
  };
}

const R = 34;
const C = 2 * Math.PI * R;

function Ring({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-24 h-24 md:w-28 md:h-28">
        <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
          <circle cx="40" cy="40" r={R} fill="none" stroke="var(--line)" strokeWidth="5" />
          <circle
            className="ring-progress"
            data-value={value}
            cx="40" cy="40" r={R} fill="none"
            stroke={value >= 90 ? '#3ecf8e' : value >= 50 ? '#f5a524' : '#f04438'}
            strokeWidth="5" strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={C * (1 - value / 100)}
          />
        </svg>
        <span className="count absolute inset-0 flex items-center justify-center text-2xl md:text-3xl font-medium text-ink tabular-nums" data-value={value}>
          {value}
        </span>
      </div>
      <span className="text-xs text-muted text-center">{label}</span>
    </div>
  );
}

const ResultsPanel: React.FC<Props> = ({ labels }) => {
  const root = useRef<HTMLElement>(null);
  const best = LIGHTHOUSE.featured;
  const sites = [...LIGHTHOUSE.sites].sort((a, b) => b.seo - a.seo);
  const seoAvg = Math.round(sites.reduce((n, s) => n + s.seo, 0) / sites.length);

  useEffect(() => {
    if (!root.current || prefersReduced()) return;
    const ctx = gsap.context(() => {
      // Cada cartão anima quando ele mesmo aparece na tela.
      gsap.utils.toArray<HTMLElement>('.bento-card').forEach((card) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: card, start: 'top 85%', once: true } });
        tl.from(card, { y: 50, opacity: 0, duration: 0.8, ease: 'power3.out' });
        const rings = card.querySelectorAll('.ring-progress');
        if (rings.length) tl.from(rings, { strokeDashoffset: C, duration: 2, ease: 'power2.out', stagger: 0.15 }, 0.2);
        const bars = card.querySelectorAll('.bar-fill');
        if (bars.length) tl.from(bars, { scaleX: 0, duration: 1.6, ease: 'power3.out', stagger: 0.1 }, 0.25);
        card.querySelectorAll<HTMLElement>('.count').forEach((el) => {
          const end = Number(el.dataset.value);
          const obj = { v: 0 };
          el.textContent = '0';
          tl.to(obj, {
            v: end, duration: 2.2, ease: 'power2.out',
            onUpdate: () => { el.textContent = String(Math.round(obj.v)); },
          }, 0.2);
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);


  return (
    <section ref={root} className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-14">
          <p className="text-[11px] uppercase tracking-widest text-accent mb-3">{labels.kicker}</p>
          <h2 className="split-title text-3xl md:text-6xl font-medium tracking-tighter text-ink max-w-3xl">{labels.title}</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Anéis */}
          <div className="bento-card spotlight lg:col-span-7 p-7 md:p-9 flex flex-col">
            <div className="flex items-center justify-between gap-4 mb-8">
              <p className="text-sm text-ink font-medium">{labels.ringsTitle}</p>
              <span className="text-xs text-muted px-2.5 py-1 rounded-full border border-line">{best.name}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 my-auto">
              <Ring value={best.performance} label={labels.categories.performance} />
              <Ring value={best.accessibility} label={labels.categories.accessibility} />
              <Ring value={best.bestPractices} label={labels.categories.bestPractices} />
              <Ring value={best.seo} label={labels.categories.seo} />
            </div>
          </div>

          {/* Barras + linha */}
          <div className="bento-card spotlight lg:col-span-5 p-7 md:p-9">
            <p className="text-sm text-ink font-medium mb-4">{labels.barsTitle}</p>
            <div className="flex items-end gap-3 mb-7">
              <span className="count text-7xl font-medium tracking-tighter text-ink tabular-nums leading-none" data-value={seoAvg}>{seoAvg}</span>
              <span className="text-sm text-muted pb-2">{labels.avg}</span>
            </div>
            <ul className="space-y-3">
              {sites.map((s) => (
                <li key={s.name} className="grid grid-cols-[7.5rem_1fr_2rem] items-center gap-3 text-sm">
                  <span className="text-muted truncate">{s.name}</span>
                  <span className="h-2 rounded-full bg-[var(--line)] overflow-hidden">
                    <span className="bar-fill block h-full rounded-full origin-left" style={{ width: `${s.seo}%`, background: s.seo >= 90 ? '#3ecf8e' : s.seo >= 50 ? '#f5a524' : '#f04438' }} />
                  </span>
                  <span className="count text-ink tabular-nums text-right" data-value={s.seo}>{s.seo}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Números */}
          {labels.stats.map((st) => (
            <div key={st.label} className="bento-card spotlight lg:col-span-4 p-7 md:p-9">
              <p className="text-6xl md:text-8xl font-medium tracking-tighter text-ink leading-none">
                <span className="count tabular-nums" data-value={st.value}>{st.value}</span>{st.suffix}
              </p>
              <p className="text-sm text-muted mt-3">{st.label}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted mt-6">{labels.note}</p>
      </div>
    </section>
  );
};

export default ResultsPanel;
