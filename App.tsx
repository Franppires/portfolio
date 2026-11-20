import React, { useState, useEffect, useRef, useMemo } from 'react';
import Navbar from './components/Navbar';
import ContactForm from './components/ContactForm';
import HeroShowcase from './components/HeroShowcase';
import Typewriter from './components/Typewriter';
import ResultsPanel from './components/ResultsPanel';
import CasesPinned from './components/CasesPinned';
import WorkGallery from './components/WorkGallery';
import FreeAudit from './components/FreeAudit';
import { useSmoothScroll, useMagnetic, useSpotlight, CursorLabel, gsap, ScrollTrigger, prefersReduced } from './components/motion';
import { SplitText } from 'gsap/SplitText';
import {
  SKILL_CATEGORIES_DATA,
  SOCIALS,
  PORTFOLIO_OWNER,
  PROFILE_IMAGE_URL,
  TRANSLATIONS,
  WHATSAPP,
  EMAIL,
  GITHUB_USERNAME,
} from './constants';
import { PAGE, CLIENT_NAMES, getCases, getWork, getLab, WorkCategory } from './content';
import { Language } from './types';
import { ArrowRight, ArrowUpRight, Check, MessageCircle, Plus, ShieldCheck, Mail, Layout, ShoppingBag, MousePointerClick, Stethoscope, Briefcase, MapPin, MessagesSquare, Megaphone, Server, Award } from 'lucide-react';

gsap.registerPlugin(SplitText);

const FILTERS: Array<'all' | WorkCategory> = ['all', 'loja', 'site', 'landing', 'ferramenta'];
const SERVICE_ICONS = [Layout, ShoppingBag, MousePointerClick];
const AUDIENCE_ICONS = [Stethoscope, ShoppingBag, Briefcase, MapPin];
const WHY_ICONS = [MessagesSquare, Megaphone, Server, Award];
const STACK_KEEP = ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PHP', 'WordPress', 'MySQL', 'Firebase', 'WHM / cPanel', 'Cloudflare'];

function App() {
  const [language, setLanguage] = useState<Language>('pt');
  const [filter, setFilter] = useState<'all' | WorkCategory>('all');
  const pageRef = useRef<HTMLDivElement>(null);

  const t = TRANSLATIONS[language];
  const p = PAGE[language];
  const cases = getCases(language);
  const work = useMemo(() => getWork(language).filter((w) => filter === 'all' || w.category === filter), [language, filter]);
  const lab = getLab(language);
  const stack = SKILL_CATEGORIES_DATA[language].flatMap((c) => c.skills.map((s) => s.name)).filter((n, i, a) => STACK_KEEP.includes(n) && a.indexOf(n) === i);

  useSmoothScroll();
  useMagnetic();
  useSpotlight();

  // Animações de entrada e de rolagem.
  useEffect(() => {
    const reduced = prefersReduced();
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set('.reveal', { opacity: 1, y: 0 });
        return;
      }

      // Topo: entra em sequência.
      gsap.from('.hero-in', { y: 40, opacity: 0, duration: 1, ease: 'power3.out', stagger: 0.12, delay: 0.15 });

      // Títulos de seção: palavras sobem de trás de uma máscara.
      document.querySelectorAll<HTMLElement>('.split-title').forEach((el) => {
        SplitText.create(el, {
          type: 'words,lines',
          mask: 'lines',
          autoSplit: true, // refaz a divisão quando a fonte carrega ou a tela muda
          onSplit: (self) => gsap.from(self.words, {
            yPercent: 110, duration: 0.9, ease: 'power4.out', stagger: 0.04,
            scrollTrigger: { trigger: el, start: 'top 85%' },
          }),
        });
      });

      // Blocos genéricos.
      ScrollTrigger.batch('.reveal', {
        start: 'top 88%',
        onEnter: (els) => gsap.fromTo(els, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.08, overwrite: true }),
      });

      // Linha do processo se desenhando com a rolagem.
      const process = document.querySelector('.process-track');
      if (process) {
        const steps = gsap.utils.toArray<HTMLElement>('.process-step');
        const mm = gsap.matchMedia();
        // Computador: linha horizontal; as etapas acendem em sequência.
        mm.add('(min-width: 768px)', () => {
          gsap.fromTo('.process-line-fill', { scaleX: 0, scaleY: 1 }, {
            scaleX: 1, ease: 'none',
            scrollTrigger: { trigger: process, start: 'top 75%', end: 'bottom 45%', scrub: 0.6 },
          });
          steps.forEach((step, i) => ScrollTrigger.create({
            trigger: process,
            start: () => `top+=${(i / steps.length) * 200} 75%`,
            onEnter: () => step.classList.add('is-lit'),
            onLeaveBack: () => step.classList.remove('is-lit'),
          }));
        });
        // Celular: linha vertical que desce; cada etapa acende quando chega nela.
        mm.add('(max-width: 767px)', () => {
          gsap.fromTo('.process-line-fill', { scaleY: 0, scaleX: 1 }, {
            scaleY: 1, ease: 'none',
            scrollTrigger: { trigger: process, start: 'top 70%', end: 'bottom 70%', scrub: 0.4 },
          });
          steps.forEach((step) => ScrollTrigger.create({
            trigger: step,
            start: 'top 70%',
            onEnter: () => step.classList.add('is-lit'),
            onLeaveBack: () => step.classList.remove('is-lit'),
          }));
        });
      }

      // Contato: o bloco cresce ao entrar.
      gsap.from('.cta-block', {
        scale: 0.94, borderRadius: 48, ease: 'none',
        scrollTrigger: { trigger: '.cta-block', start: 'top bottom', end: 'top 55%', scrub: 0.6 },
      });
    }, pageRef);

    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 600);
    return () => { window.clearTimeout(refresh); ctx.revert(); };
  }, [language]);

  const filterChips = (
    <div className="flex flex-wrap gap-2" role="tablist">
      {FILTERS.map((f) => (
        <button
          key={f}
          type="button"
          role="tab"
          aria-selected={filter === f}
          onClick={() => setFilter(f)}
          className={`filter-chip ${filter === f ? 'is-active' : ''}`}
        >
          {p.work.filters[f]}
        </button>
      ))}
    </div>
  );

  return (
    <div ref={pageRef} className="min-h-screen bg-paper text-ink font-sans relative overflow-x-clip">
      <div className="grain" aria-hidden="true" />
      <CursorLabel />
      <Navbar language={language} setLanguage={setLanguage} texts={t.nav} />

      <main>
        {/* 1. Topo */}
        <section id="home" className="hero relative min-h-[min(100svh,980px)] flex flex-col overflow-hidden">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-glow" aria-hidden="true" />
          <HeroShowcase />
          <div className="hero-fade" />

          <div className="relative z-10 flex-1 flex items-center max-w-7xl w-full mx-auto px-6 pt-28 pb-16">
            <div className="max-w-3xl">
              <h1 className="hero-in text-[2.4rem] leading-[1.04] sm:text-6xl lg:text-[4.6rem] lg:leading-[1] font-medium tracking-tighter text-ink mb-8">
                {p.hero.titlePre}{' '}
                <Typewriter key={language} words={p.hero.words} className="text-gradient" startDelay={1200} />
                <span className="block text-muted text-[0.6em] tracking-tight mt-3">{p.hero.titlePost}</span>
              </h1>
              <p className="hero-in text-base md:text-lg text-muted max-w-xl leading-relaxed mb-10">
                {p.hero.desc}
              </p>
              <div className="hero-in flex flex-wrap gap-3">
                <a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn-glow magnetic">
                  <MessageCircle size={16} /> {p.hero.primary}
                </a>
                <a href="#work" className="btn-ghost magnetic">
                  {p.hero.secondary} <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>

          <div className="relative z-10 border-t border-line py-7">
            <p className="max-w-7xl mx-auto px-6 text-[11px] uppercase tracking-widest text-muted mb-4">{p.hero.clients}</p>
            <div className="marquee">
              <ul className="marquee-track">
                {[...CLIENT_NAMES, ...CLIENT_NAMES].map((name, i) => (
                  <li key={i} className="flex items-center text-xl md:text-2xl font-medium tracking-tight text-ink opacity-50 hover:opacity-100 transition-opacity whitespace-nowrap">
                    <span className="px-8 md:px-12">{name}</span>
                    <span className="text-accent opacity-70">✦</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 2. Painel de resultados */}
        <ResultsPanel labels={p.results} />

        {/* Diagnóstico gratuito */}
        <FreeAudit labels={p.audit} phone="5514998098786" />

        {/* 3. Cases */}
        <CasesPinned cases={cases} labels={p.cases} agencyTag={p.work.agencyTag} />

        {/* 4. Mais trabalhos */}
        <WorkGallery title={p.work.title} items={work} filters={filterChips} cursorLabel={p.work.cursor} agencyTag={p.work.agencyTag} agencyNote={p.work.agencyNote} swipeHint={p.work.swipe} />

        {/* Laboratório (linha discreta) */}
        <section className="pb-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="reveal flex flex-col md:flex-row md:items-center gap-3 md:gap-6 border-y border-line py-6 text-sm">
              <span className="text-muted shrink-0">{p.lab.title}</span>
              <ul className="flex flex-wrap gap-x-5 gap-y-2 flex-1">
                {lab.map((item) => (
                  <li key={item.id}>
                    {item.link ? (
                      <a href={item.link} target="_blank" rel="noreferrer" className="text-ink hover:text-accent transition-colors inline-flex items-center gap-1">
                        {item.title} <ArrowUpRight size={13} className="opacity-60" />
                      </a>
                    ) : (
                      <span className="text-ink opacity-80">{item.title}</span>
                    )}
                  </li>
                ))}
              </ul>
              <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noreferrer" className="text-muted hover:text-ink inline-flex items-center gap-1 shrink-0">
                GitHub <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        </section>

        {/* Para quem eu crio */}
        <section className="py-24 md:py-28 border-t border-line">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-12">
              <p className="text-[11px] uppercase tracking-widest text-accent mb-3">{p.audience.kicker}</p>
              <h2 className="split-title text-3xl md:text-5xl font-medium tracking-tighter text-ink max-w-3xl">{p.audience.title}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {p.audience.items.map((it, idx) => {
                const Icon = AUDIENCE_ICONS[idx % AUDIENCE_ICONS.length];
                return (
                  <div key={it.title} className="reveal bento-card spotlight p-6 md:p-7">
                    <span className="w-11 h-11 rounded-xl border border-line bg-paper flex items-center justify-center text-accent mb-5"><Icon size={20} /></span>
                    <h3 className="text-lg font-medium text-ink">{it.title}</h3>
                    <p className="text-sm text-muted leading-relaxed mt-2">{it.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 5. Serviços + processo */}
        <section id="services" className="py-24 md:py-32 border-t border-line">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-14">
              <p className="text-[11px] uppercase tracking-widest text-accent mb-3">{p.services.kicker}</p>
              <h2 className="split-title text-3xl md:text-6xl font-medium tracking-tighter text-ink max-w-3xl">{p.services.title}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {p.services.items.map((s, idx) => {
                const Icon = SERVICE_ICONS[idx];
                return (
                  <div key={s.title} className="reveal bento-card spotlight flex flex-col p-7 md:p-8">
                    <span className="w-11 h-11 rounded-xl border border-line flex items-center justify-center text-accent mb-6 bg-paper">
                      <Icon size={20} />
                    </span>
                    <h3 className="text-xl font-medium text-ink">{s.title}</h3>
                    <p className="text-sm text-muted leading-relaxed mt-2">{s.desc}</p>
                    <ul className="mt-6 space-y-3 flex-1">
                      {s.includes.map((inc) => (
                        <li key={inc} className="flex gap-3 text-sm text-ink">
                          <Check size={16} className="text-accent shrink-0 mt-0.5" /> {inc}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-8 pt-5 border-t border-line text-sm">
                      <span className="text-muted">{p.services.time}: </span>
                      <span className="text-ink font-medium">{s.time}</span>
                    </p>
                  </div>
                );
              })}
            </div>

            <p className="reveal mt-8 flex items-start gap-3 text-sm text-ink">
              <ShieldCheck size={18} className="text-accent shrink-0" /> {p.services.ownership}
            </p>

            <div className="mt-28">
              <h3 className="split-title text-2xl md:text-4xl font-medium tracking-tight text-ink mb-14">{p.process.title}</h3>
              <div className="process-track relative">
                <div className="process-line" aria-hidden="true"><span className="process-line-fill" /></div>
                <ol className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10 md:gap-8">
                  {p.process.steps.map((step, idx) => (
                    <li key={step.title} className="process-step relative pl-10 md:pl-0 md:pt-10">
                      <span className="process-dot" aria-hidden="true" />
                      <p className="text-xs font-medium text-accent tabular-nums">0{idx + 1}</p>
                      <p className="text-lg font-medium text-ink mt-1">{step.title}</p>
                      <p className="text-sm text-muted leading-relaxed mt-1">{step.text}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* Por que trabalhar comigo */}
        <section className="py-24 md:py-32 border-t border-line">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <p className="text-[11px] uppercase tracking-widest text-accent mb-3">{p.why.kicker}</p>
              <h2 className="split-title text-3xl md:text-5xl font-medium tracking-tighter text-ink">{p.why.title}</h2>
              <a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn-glow magnetic mt-8">
                <MessageCircle size={16} /> {p.why.cta}
              </a>
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {p.why.items.map((it, idx) => {
                const Icon = WHY_ICONS[idx % WHY_ICONS.length];
                return (
                  <div key={it.title} className="reveal bento-card spotlight p-6 md:p-7">
                    <span className="w-11 h-11 rounded-xl border border-line bg-paper flex items-center justify-center text-accent mb-5"><Icon size={20} /></span>
                    <h3 className="text-lg font-medium text-ink">{it.title}</h3>
                    <p className="text-sm text-muted leading-relaxed mt-2">{it.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 6. Sobre mim */}
        <section id="about" className="py-24 md:py-32 border-t border-line">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <p className="text-[11px] uppercase tracking-widest text-accent mb-3">{p.about.kicker}</p>
              <div className="flex items-center gap-5 mb-6">
                <img src={PROFILE_IMAGE_URL} alt="" className="w-16 h-16 rounded-full object-cover ring-2 ring-[var(--line)]" />
                <h2 className="split-title text-3xl md:text-5xl font-medium tracking-tighter text-ink">{p.about.title}</h2>
              </div>
              <p className="reveal text-muted leading-relaxed">{p.about.text}</p>

              <p className="text-[11px] uppercase tracking-widest text-muted mt-10 mb-3">{p.about.stack}</p>
              <div className="reveal flex flex-wrap gap-2">
                {stack.map((s) => (
                  <span key={s} className="px-2.5 py-1 bg-surface border border-line rounded-md text-xs text-ink">{s}</span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7">
              <p className="text-[11px] uppercase tracking-widest text-muted mb-6">{p.about.journeyTitle}</p>
              <ol className="relative border-l border-line ml-2">
                {p.about.journey.map((step, i) => (
                  <li key={step.title} className="reveal relative pl-8 pb-10 last:pb-0">
                    <span className={`absolute -left-[7px] top-1.5 w-3.5 h-3.5 rounded-full border-2 ${i === 0 ? 'bg-paper border-[var(--muted)]' : 'bg-accent border-accent'}`} />
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="text-xs font-medium text-accent uppercase tracking-widest">{step.when}</span>
                      {step.tag && <span className="text-[11px] text-muted px-2 py-0.5 rounded-full border border-line">{step.tag}</span>}
                    </div>
                    <h3 className="text-lg md:text-xl font-medium text-ink mt-2">{step.title}</h3>
                    <p className="text-sm text-muted leading-relaxed mt-1 max-w-xl">{step.text}</p>
                  </li>
                ))}
              </ol>

              <div className="mt-14 pt-8 border-t border-line">
                <p className="text-[11px] uppercase tracking-widest text-muted mb-5">{p.about.quotesTitle}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {t.quotes.map((item) => (
                    <blockquote key={item.by} className="reveal text-sm text-muted leading-relaxed">
                      <p>“{item.text}”</p>
                      <footer className="mt-3 text-xs text-muted opacity-80">— {item.by}</footer>
                    </blockquote>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Dúvidas + contato */}
        <section id="contact" className="pb-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 border-t border-line pt-24">
              <div className="lg:col-span-4">
                <h2 className="split-title text-3xl md:text-5xl font-medium tracking-tighter text-ink">{p.faq.title}</h2>
              </div>
              <div className="reveal lg:col-span-8 border-b border-line">
                {p.faq.items.map((item) => (
                  <details key={item.q} name="faq" className="group border-t border-line" onToggle={(e) => {
                    const el = e.currentTarget;
                    if (el.open) el.parentElement?.querySelectorAll('details[open]').forEach((d) => { if (d !== el) (d as HTMLDetailsElement).open = false; });
                  }}>
                    <summary className="flex items-center justify-between gap-6 py-6 cursor-pointer list-none text-base md:text-lg font-medium text-ink">
                      {item.q}
                      <Plus size={18} className="shrink-0 text-accent transition-transform duration-300 group-open:rotate-45" />
                    </summary>
                    <p className="text-sm md:text-base text-muted leading-relaxed pb-6 pr-10">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>

            <div className="cta-block relative overflow-hidden mt-24 rounded-3xl border border-line p-8 md:p-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              <div className="cta-glow" aria-hidden="true" />
              <div className="relative lg:col-span-5">
                <h2 className="split-title text-3xl md:text-[2.75rem] lg:text-5xl font-medium tracking-tighter leading-[1.05] text-ink">{p.contact.title}</h2>
                <p className="mt-5 text-muted leading-relaxed">{p.contact.desc}</p>
                <a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn-whatsapp magnetic mt-8">
                  <MessageCircle size={18} /> {p.contact.whatsapp}
                </a>
                <a href={`mailto:${EMAIL}`} className="mt-6 flex items-center gap-2 text-sm text-muted hover:text-ink">
                  <Mail size={14} /> {EMAIL}
                </a>
                <div className="flex gap-3 mt-6">
                  {SOCIALS.filter((s) => s.platform !== 'Email').map((social) => (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.platform}
                      className="w-10 h-10 flex items-center justify-center rounded-full border border-line text-muted hover:text-ink hover:border-[var(--ink)] transition-colors"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
              <div className="relative lg:col-span-7">
                <p className="text-[11px] uppercase tracking-widest text-muted mb-4">{p.contact.or}</p>
                <ContactForm texts={t.form} buttons={t.buttons} />
              </div>
            </div>
          </div>
        </section>

        <footer className="py-10 border-t border-line">
          <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between gap-3 text-xs text-muted">
            <p>&copy; {new Date().getFullYear()} {PORTFOLIO_OWNER}</p>
            <a href="#home" className="hover:text-ink">{p.backToTop} ↑</a>
          </div>
        </footer>
      </main>

      <a
        href={WHATSAPP}
        target="_blank"
        rel="noreferrer"
        aria-label={p.contact.whatsapp}
        title={p.contact.whatsapp}
        className="fixed bottom-6 right-6 z-[60] w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
      >
        <MessageCircle size={26} />
      </a>
    </div>
  );
}

export default App;
