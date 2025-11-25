import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import ProjectCard from './components/ProjectCard';
const AIChat = lazy(() => import('./components/AIChat'));
import ContactForm from './components/ContactForm';
import { 
  PROJECTS_DATA, 
  SKILL_CATEGORIES_DATA, 
  ALL_SKILLS, 
  SOCIALS, 
  PORTFOLIO_OWNER, 
  PROFILE_IMAGE_URL, 
  TRANSLATIONS 
} from './constants';
import { Language } from './types';
import { ArrowDown, Mail, Sparkles, MapPin, ExternalLink, Download } from 'lucide-react';

function App() {
  const [loading, setLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  
  // Language State
  const [language, setLanguage] = useState<Language>('pt');
  
  // Derived Data based on language
  const t = TRANSLATIONS[language];
  const currentProjects = PROJECTS_DATA[language];
  const currentSkills = SKILL_CATEGORIES_DATA[language];
  
  // Refs for smooth cursor animation
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | null>(null);

  // Preloader Logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Cursor Logic
  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Direct update for dot (instant)
      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = `${e.clientX}px`;
        cursorDotRef.current.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener("mousemove", mouseMove);

    // Smooth follow for outline
    const animateOutline = () => {
      if (cursorOutlineRef.current) {
        const outline = cursorOutlineRef.current;
        const currentX = parseFloat(outline.style.left || "0");
        const currentY = parseFloat(outline.style.top || "0");
        
        const dx = mousePosition.x - currentX;
        const dy = mousePosition.y - currentY;
        
        // Lerp for smooth delay
        outline.style.left = `${currentX + dx * 0.15}px`;
        outline.style.top = `${currentY + dy * 0.15}px`;
        
        // Apply expanding class based on variant
        if (cursorVariant === "hover") {
           document.body.classList.add('hovering');
        } else {
           document.body.classList.remove('hovering');
        }
      }
      requestRef.current = requestAnimationFrame(animateOutline);
    };
    requestRef.current = requestAnimationFrame(animateOutline);

    // Add hover listeners to interactive elements
    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll('a, button, input, textarea, .project-card');
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => setCursorVariant("hover"));
        el.addEventListener('mouseleave', () => setCursorVariant("default"));
      });
    };

    // Wait for loading to finish then add listeners
    if (!loading) {
      setTimeout(addHoverListeners, 500);
    }

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [mousePosition, cursorVariant, loading]);


  // Scroll Reveal Observer
  useEffect(() => {
    if (loading) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => observer.observe(el));

    return () => reveals.forEach(el => observer.unobserve(el));
  }, [loading]);

  // Double the skills for seamless marquee loop
  const marqueeSkills = [...ALL_SKILLS, ...ALL_SKILLS];

  return (
    <div className="min-h-screen bg-dark text-slate-200 font-sans relative selection:bg-indigo-500/30 overflow-x-hidden">
      
      {/* Custom Cursor Elements */}
      <div ref={cursorDotRef} className="cursor-dot hidden md:block"></div>
      <div ref={cursorOutlineRef} className="cursor-outline hidden md:block"></div>

      {/* Preloader */}
      <div className={`preloader ${!loading ? 'loaded' : ''}`}>
        <div className="flex flex-col items-center gap-4">
          <div className="text-4xl md:text-6xl font-display font-bold text-white tracking-tighter animate-pulse">
            FRAN<span className="text-indigo-500">.</span>
          </div>
          <div className="w-48 h-1 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500 animate-[shimmer_1s_infinite]" style={{ width: '50%' }}></div>
          </div>
        </div>
      </div>

      {/* Dynamic Background */}
      <div 
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99,102,241,0.07), transparent 40%)`
        }}
      />
      {/* Noise Overlay */}
      <div className="bg-noise"></div>
      
      <div className="fixed inset-0 bg-grid-white/[0.02] bg-[length:60px_60px] pointer-events-none z-0"></div>
      
      {/* Ambient Orbs - Animated Blobs */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-[128px] pointer-events-none mix-blend-screen animate-blob"></div>
      <div className="fixed top-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px] pointer-events-none mix-blend-screen animate-blob" style={{ animationDelay: '2s' }}></div>
      <div className="fixed bottom-0 left-20 w-96 h-96 bg-pink-600/20 rounded-full blur-[128px] pointer-events-none mix-blend-screen animate-blob" style={{ animationDelay: '4s' }}></div>


      <Navbar language={language} setLanguage={setLanguage} texts={t.nav} />

      <main className="relative z-10">
        
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden pt-24">
          <div className="max-w-7xl mx-auto w-full grid md:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Text */}
            <div className="md:col-span-8 flex flex-col items-start z-10 order-2 md:order-1">
              <div>
                <div className="reveal animate-fade-in-up delay-100">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md mb-8 hover:bg-white/10 transition-colors cursor-default">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                    </span>
                    {t.available}
                  </div>
                </div>
                
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold tracking-tighter leading-[0.95] text-white mb-6 overflow-hidden">
                   <span className="block overflow-hidden">
                     <span className="block animate-reveal-text" style={{ animationDelay: '0.1s' }}>Software</span>
                   </span>
                   <span className="block overflow-hidden mt-1">
                     <span className="block animate-reveal-text glitch" data-text="Developer" style={{ animationDelay: '0.3s' }}>Developer</span>
                   </span>
                </h1>
                
                <div className="reveal animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                  <p className="text-lg md:text-2xl text-indigo-400 font-medium mb-2">
                    React, Next.js, JavaScript & TypeScript
                  </p>
                  <p className="text-base md:text-lg text-slate-400 max-w-2xl leading-relaxed mb-10 font-light">
                    {t.heroDesc}
                  </p>

                  <div className="flex flex-wrap gap-6">
                    <a href="#projects" className="group relative px-8 py-4 bg-white text-dark font-bold text-lg rounded-full overflow-hidden transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-indigo-200/50 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite]"></div>
                      <span className="relative flex items-center gap-2">{t.buttons.projects} <ArrowDown size={20} className="-rotate-90 group-hover:rotate-0 transition-transform duration-300" /></span>
                    </a>
                    <a href="#contact" className="px-8 py-4 bg-transparent border border-white/20 text-white font-medium text-lg rounded-full hover:bg-white/5 transition-all hover:border-white/40 backdrop-blur-sm flex items-center gap-2 group">
                      <Download size={20} className="group-hover:translate-y-1 transition-transform" /> {t.buttons.cv}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Profile Card (3D Floating) */}
            <div className="md:col-span-4 flex justify-center md:justify-end order-1 md:order-2 reveal delay-300">
               <div className="relative w-72 h-96 md:w-80 md:h-[450px] glass-card rounded-[2rem] p-6 flex flex-col items-center justify-between border border-white/10 shadow-2xl animate-float hover:animation-pause transition-transform duration-500 group">
                  
                  {/* Background Pattern inside card */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-transparent to-purple-500/20 rounded-[2rem] pointer-events-none opacity-50"></div>
                  
                  {/* Avatar */}
                  <div className="relative mt-6 mb-6 group-hover:scale-105 transition-transform duration-500">
                    <div className="absolute inset-0 bg-indigo-500 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                    <img src={PROFILE_IMAGE_URL} alt="Profile" className="relative w-32 h-32 rounded-full object-cover border-2 border-white/20 shadow-2xl bg-slate-800" />
                    <div className="absolute bottom-0 right-0 bg-dark border border-white/10 p-2 rounded-full">
                       <Sparkles size={16} className="text-yellow-400" fill="currentColor" />
                    </div>
                  </div>

                  <div className="text-center w-full relative z-10 mb-4">
                     <h3 className="text-2xl font-bold text-white mb-1">{PORTFOLIO_OWNER}</h3>
                     <p className="text-indigo-300 font-mono text-sm">{t.role}</p>
                  </div>

                  <div className="w-full bg-black/40 rounded-xl p-4 backdrop-blur-md border border-white/5 group-hover:border-indigo-500/30 transition-colors">
                     <div className="flex items-center justify-between text-sm text-slate-400 mb-3">
                        <span className="flex items-center gap-2"><MapPin size={14} /> {t.location}</span>
                        <span className="text-white font-mono">GMT-3</span>
                     </div>
                     <div className="flex justify-between items-center pt-3 border-t border-white/10">
                        <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500">{t.titles.stack}</span>
                        <div className="flex -space-x-2">
                           <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px]">TS</div>
                           <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px]">R</div>
                           <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px]">+</div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

          </div>
        </section>

        {/* Infinite Skills Marquee */}
        <div className="w-full py-10 bg-dark border-y border-white/5 overflow-hidden relative z-20">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-dark to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-dark to-transparent z-10 pointer-events-none"></div>
          
          <div className="flex w-[200%] animate-scroll hover:[animation-play-state:paused]">
            {marqueeSkills.map((skill, index) => (
              <div key={`${skill.name}-${index}`} className="flex items-center gap-4 mx-8 px-6 py-3 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-sm transition-all hover:bg-white/10 hover:scale-105 cursor-default group">
                <span className="text-2xl group-hover:scale-125 transition-transform duration-300">{skill.icon}</span>
                <span className="text-slate-300 font-display font-medium text-lg whitespace-nowrap">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Projects Section */}
        <section id="projects" className="py-40 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-8 reveal">
              <div>
                <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-6">
                  {t.titles.selectedWorks} <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">{t.titles.selectedWorksHighlight}</span>
                </h2>
                <div className="h-1 w-24 bg-indigo-500 rounded-full"></div>
              </div>
              <p className="text-slate-400 text-lg max-w-md leading-relaxed md:text-right">
                {t.subtitles.selectedWorks}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-[550px]">
              {currentProjects[0] && (
                <div className="md:col-span-2 md:row-span-1 reveal project-card">
                  <ProjectCard project={currentProjects[0]} className="h-full" />
                </div>
              )}
              
              {currentProjects.slice(1).map((project, idx) => (
                <div key={project.id} className="reveal project-card" style={{ transitionDelay: `${(idx + 1) * 150}ms` }}>
                   <ProjectCard project={project} className="h-full" />
                </div>
              ))}
            </div>
            
            <div className="mt-16 text-center reveal">
               <a href="https://github.com/Franppires" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-slate-400 hover:text-white border-b border-transparent hover:border-white transition-all pb-1">
                  {t.buttons.viewRepos} <ExternalLink size={16} />
               </a>
            </div>
          </div>
        </section>

        {/* Skills / Expertise Section */}
        <section id="skills" className="py-32 px-6 relative bg-surface/30">
           <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:40px_40px] pointer-events-none"></div>
           
           <div className="max-w-6xl mx-auto relative z-10">
              <div className="text-center mb-20 reveal">
                 <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 text-white">{t.titles.expertise}</h2>
                 <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                    {t.subtitles.expertise}
                 </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {currentSkills.map((category, idx) => (
                     <div key={category.title} className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 backdrop-blur-sm hover:border-indigo-500/20 transition-colors reveal" style={{ transitionDelay: `${idx * 100}ms` }}>
                        <h3 className="text-2xl font-display font-bold text-white mb-6 flex items-center gap-3">
                           {category.title.includes("Frontend") && "🎨"}
                           {category.title.includes("Backend") && "⚙️"}
                           {(category.title.includes("Banco de Dados") || category.title.includes("Database")) && "🗄️"}
                           {(category.title.includes("Hospedagem") || category.title.includes("Infrastructure")) && "☁️"}
                           {category.title}
                        </h3>
                        <div className="flex flex-wrap gap-3">
                           {category.skills.map(skill => (
                              <div key={skill.name} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/5 rounded-full hover:bg-white/10 hover:border-indigo-500/30 transition-all cursor-default group">
                                 <span className="text-lg group-hover:scale-110 transition-transform">{skill.icon}</span>
                                 <span className="text-slate-300 text-sm font-medium">{skill.name}</span>
                              </div>
                           ))}
                        </div>
                     </div>
                  ))}
              </div>
           </div>
        </section>

        {/* Contact Section - Updated with Form */}
        <section id="contact" className="py-32 px-6 relative overflow-hidden bg-dark">
          {/* Decorative Background */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-gradient-to-b from-indigo-900/10 to-transparent opacity-50 pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
              
              {/* Left Column: Info */}
              <div className="lg:col-span-5 flex flex-col justify-center reveal">
                <div className="w-16 h-16 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-indigo-500/30 animate-float">
                   <Mail className="text-white w-8 h-8" />
                </div>
                
                <h2 className="text-5xl md:text-6xl font-display font-bold mb-6 tracking-tighter text-white">
                  {t.titles.contact}
                </h2>
                <p className="text-xl text-slate-400 mb-10 leading-relaxed">
                  {t.subtitles.contact}
                </p>

                <div className="space-y-6 mb-10">
                  <div className="flex items-center gap-4 text-slate-300">
                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-white/5">
                      <Mail size={18} />
                    </div>
                    <a href="mailto:contatofranpires@gmail.com" className="hover:text-white transition-colors">contatofranpires@gmail.com</a>
                  </div>
                  <div className="flex items-center gap-4 text-slate-300">
                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-white/5">
                      <MapPin size={18} />
                    </div>
                    <span>{t.location}</span>
                  </div>
                </div>
                
                <div className="flex gap-4">
                   {SOCIALS.map((social) => (
                     <a 
                       key={social.platform}
                       href={social.url}
                       className="w-12 h-12 flex items-center justify-center rounded-full border border-slate-700 text-slate-400 hover:text-white hover:border-white hover:bg-white/5 transition-all duration-300"
                       aria-label={social.platform}
                     >
                       {social.icon}
                     </a>
                   ))}
                </div>
              </div>

              {/* Right Column: Form */}
              <div className="lg:col-span-7 reveal delay-200">
                 <ContactForm texts={t.form} buttons={t.buttons} />
              </div>

            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-white/5 bg-dark text-center relative z-10">
          <div className="flex items-center justify-center gap-2 mb-4 opacity-50 hover:opacity-100 transition-opacity cursor-default">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
             <span className="text-xs font-mono text-slate-400">{t.footer.system}</span>
          </div>
          <p className="text-slate-600 text-sm font-medium">
            &copy; {new Date().getFullYear()} {PORTFOLIO_OWNER}  
          </p>
        </footer>
      </main>

      {/* Floating AI Chat */}
      <Suspense fallback={null}>
        <AIChat />
      </Suspense>
    </div>
  );
}

export default App;