import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export const prefersReduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const finePointer = () => typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches;

/** Rolagem suave (Lenis) sincronizada com o ScrollTrigger. */
export function useSmoothScroll() {
  useEffect(() => {
    if (prefersReduced()) return;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Âncoras (#work, #contact...) com rolagem suave e desconto do menu fixo.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute('href')!;
      const target = id === '#' ? null : document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -64 });
    };
    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('click', onClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);
}

/** Botões "magnéticos": seguem levemente o cursor quando ele se aproxima. */
export function useMagnetic() {
  useEffect(() => {
    if (!finePointer() || prefersReduced()) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>('.magnetic'));
    const cleanups = els.map((el) => {
      const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
      const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });
      const move = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * 0.3);
        yTo((e.clientY - (r.top + r.height / 2)) * 0.4);
      };
      const leave = () => { xTo(0); yTo(0); };
      el.addEventListener('mousemove', move);
      el.addEventListener('mouseleave', leave);
      return () => { el.removeEventListener('mousemove', move); el.removeEventListener('mouseleave', leave); };
    });
    return () => cleanups.forEach((c) => c());
  });
}

/** Bolinha que vira "Ver" sobre elementos com data-cursor. */
export function CursorLabel() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !finePointer() || prefersReduced()) return;
    const xTo = gsap.quickTo(el, 'x', { duration: 0.35, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.35, ease: 'power3.out' });
    const move = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      const host = (e.target as Element).closest('[data-cursor]') as HTMLElement | null;
      if (host) {
        el.textContent = host.dataset.cursor || '';
        el.classList.add('is-on');
      } else {
        el.classList.remove('is-on');
      }
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);
  return <div ref={ref} className="cursor-label" aria-hidden="true" />;
}

/** Brilho que segue o mouse dentro de cartões (.spotlight). */
export function useSpotlight() {
  useEffect(() => {
    if (!finePointer()) return;
    const move = (e: MouseEvent) => {
      document.querySelectorAll<HTMLElement>('.spotlight').forEach((card) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - r.left}px`);
        card.style.setProperty('--my', `${e.clientY - r.top}px`);
      });
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);
}

export { gsap, ScrollTrigger };
