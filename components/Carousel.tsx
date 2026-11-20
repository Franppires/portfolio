import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { prefersReduced } from './motion';

interface Props {
  items: React.ReactNode[];
  /** Largura de cada item (classes Tailwind). */
  itemClassName?: string;
  /** Intervalo da troca automática em ms (0 = sem troca automática). */
  autoplay?: number;
  ariaLabel: string;
  /** Mostra setas (no computador). */
  arrows?: boolean;
  /** Mostra bolinhas em vez da barra de progresso. */
  dots?: boolean;
  className?: string;
  trackClassName?: string;
}

/**
 * Carrossel com rolagem nativa (arraste no celular, arraste com o mouse no computador),
 * setas, indicador e troca automática que pausa quando a pessoa interage.
 */
const Carousel: React.FC<Props> = ({
  items, itemClassName = 'w-[80vw]', autoplay = 0, ariaLabel, arrows = true, dots = false, className = '', trackClassName = '',
}) => {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const paused = useRef(false);
  const visible = useRef(false);
  const resumeTimer = useRef<number>();
  const activeRef = useRef(0);
  activeRef.current = active;

  const slides = () => Array.from(track.current?.children ?? []) as HTMLElement[];

  const goTo = useCallback((i: number) => {
    const el = track.current;
    if (!el) return;
    const list = slides();
    if (!list.length) return;
    const idx = (i + list.length) % list.length;
    const pad = parseFloat(getComputedStyle(el).paddingLeft) || 0;
    el.scrollTo({ left: list[idx].offsetLeft - pad, behavior: prefersReduced() ? 'auto' : 'smooth' });
  }, []);

  // Descobre qual item está no início da faixa.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => {
      const pad = parseFloat(getComputedStyle(el).paddingLeft) || 0;
      const x = el.scrollLeft + pad;
      let best = 0, dist = Infinity;
      slides().forEach((s, i) => { const d = Math.abs(s.offsetLeft - x); if (d < dist) { dist = d; best = i; } });
      // No fim da faixa, considera o último.
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 4) best = slides().length - 1;
      setActive(best);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener('scroll', onScroll);
  }, [items]);

  // Volta ao início quando a lista muda (ex.: filtro).
  useEffect(() => { track.current?.scrollTo({ left: 0 }); setActive(0); }, [items]);

  // Só anda sozinho quando está na tela.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { visible.current = e.isIntersecting; }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Troca automática.
  useEffect(() => {
    if (!autoplay || prefersReduced()) return;
    const t = window.setInterval(() => {
      if (paused.current || !visible.current || document.hidden) return;
      const el = track.current!;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
      goTo(atEnd ? 0 : active + 1);
    }, autoplay);
    return () => window.clearInterval(t);
  }, [autoplay, active, goTo]);

  const pause = () => { paused.current = true; window.clearTimeout(resumeTimer.current); };
  const resumeLater = (ms = 5000) => {
    window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => { paused.current = false; }, ms);
  };

  // Arrastar com o mouse no computador.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let down = false, startX = 0, startLeft = 0, moved = false;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      down = true; moved = false; startX = e.clientX; startLeft = el.scrollLeft;
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 5 && !moved) { moved = true; el.classList.add('is-dragging'); }
      if (moved) el.scrollLeft = startLeft - dx;
    };
    const onUp = () => {
      if (!down) return;
      down = false;
      if (moved) {
        el.classList.remove('is-dragging');
        goTo(activeRef.current);
      }
    };
    // Evita abrir o link ao terminar um arraste.
    const onClick = (e: MouseEvent) => { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } };
    el.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    el.addEventListener('click', onClick, true);
    return () => {
      el.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      el.removeEventListener('click', onClick, true);
    };
  }, [goTo]);

  const total = items.length;

  return (
    <div
      className={`relative ${className}`}
      role="region"
      aria-roledescription="carrossel"
      aria-label={ariaLabel}
      onMouseEnter={pause}
      onMouseLeave={() => resumeLater(1500)}
      onTouchStart={pause}
      onTouchEnd={() => resumeLater()}
      onFocus={pause}
      onBlur={() => resumeLater()}
    >
      <div ref={track} className={`carousel-track relative flex gap-5 lg:gap-7 overflow-x-auto snap-x snap-mandatory ${trackClassName}`}>
        {items.map((node, i) => (
          <div key={i} className={`snap-start shrink-0 ${itemClassName}`} aria-roledescription="slide" aria-label={`${i + 1} de ${total}`}>
            {node}
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-6 flex items-center gap-5">
        {dots ? (
          <div className="flex gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Ir para ${i + 1}`}
                onClick={() => { pause(); goTo(i); resumeLater(); }}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? 'w-6 bg-accent' : 'w-1.5 bg-[var(--line)]'}`}
              />
            ))}
          </div>
        ) : (
          <div className="flex-1 flex items-center gap-4">
            <span className="text-xs text-ink tabular-nums">{String(active + 1).padStart(2, '0')}</span>
            <span className="flex-1 h-px bg-line relative overflow-hidden">
              <span className="absolute inset-y-0 left-0 bg-accent transition-all duration-500" style={{ width: `${((active + 1) / Math.max(1, total)) * 100}%` }} />
            </span>
            <span className="text-xs text-muted tabular-nums">{String(total).padStart(2, '0')}</span>
          </div>
        )}
        {arrows && (
          <div className="hidden md:flex gap-2 ml-auto">
            <button type="button" aria-label="Anterior" onClick={() => { pause(); goTo(active - 1); resumeLater(); }} className="carousel-arrow">
              <ArrowLeft size={16} />
            </button>
            <button type="button" aria-label="Próximo" onClick={() => { pause(); goTo(active + 1); resumeLater(); }} className="carousel-arrow">
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Carousel;
