import React from 'react';
import Navbar from './components/Navbar';
import ProjectCard from './components/ProjectCard';
import AIChat from './components/AIChat';
import { PROJECTS, SKILLS, SOCIALS, BIO, PORTFOLIO_OWNER, ROLE } from './constants';
import { ArrowDown, Mail } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-dark text-slate-200 overflow-x-hidden font-sans">
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none z-0"></div>
      
      {/* Background Glows */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse-slow"></div>
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

      <Navbar />

      <main className="relative z-10">
        
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center pt-20 px-6">
          <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                Disponível para novos projetos
              </div>
              
              <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight">
                Olá, eu sou <br/>
                <span className="gradient-text">{PORTFOLIO_OWNER}</span>
              </h1>
              
              <p className="text-xl text-slate-400 max-w-lg leading-relaxed">
                {ROLE}. {BIO}
              </p>

              <div className="flex flex-wrap gap-4">
                <a href="#contact" className="px-8 py-4 bg-white text-dark font-bold rounded-full hover:bg-indigo-50 transition-colors flex items-center gap-2">
                  Vamos conversar
                </a>
                <a href="#projects" className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-full hover:bg-white/10 transition-colors backdrop-blur-sm">
                  Ver Projetos
                </a>
              </div>
              
              <div className="flex gap-6 pt-4">
                {SOCIALS.map((social) => (
                  <a 
                    key={social.platform} 
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-white hover:scale-110 transition-all"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Abstract Visual / Image */}
            <div className="hidden md:flex justify-center relative">
              <div className="relative w-80 h-96">
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-[2rem] rotate-6 opacity-20 blur-2xl animate-float"></div>
                <div className="absolute inset-0 bg-slate-800 rounded-[2rem] border border-slate-700 overflow-hidden shadow-2xl rotate-3 transition-transform hover:rotate-0 duration-500">
                  <img src="https://picsum.photos/600/800?grayscale" alt="Profile" className="w-full h-full object-cover opacity-80" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-slate-500">
             <ArrowDown size={24} />
          </div>
        </section>

        {/* Projects Bento Grid */}
        <section id="projects" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Projetos Selecionados</h2>
              <p className="text-slate-400 text-lg max-w-2xl">Uma coleção de trabalhos que demonstram minha paixão por design e desenvolvimento.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]">
              {/* Featured Project - Span 2 cols */}
              {PROJECTS[0] && (
                <ProjectCard project={PROJECTS[0]} className="md:col-span-2" />
              )}
              
              {/* Other projects */}
              {PROJECTS.slice(1).map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-32 px-6 bg-slate-900/30">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">Tech Stack &<br/>Ferramentas</h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Estou sempre aprendendo novas tecnologias para me manter atualizada com as tendências do mercado.
                Atualmente meu foco principal é no ecossistema JavaScript/TypeScript.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                 <div className="glass-panel p-6 rounded-2xl">
                    <h4 className="text-xl font-bold mb-2 text-indigo-400">Design</h4>
                    <p className="text-sm text-slate-400">Figma, Adobe XD, Prototyping, Design Systems</p>
                 </div>
                 <div className="glass-panel p-6 rounded-2xl">
                    <h4 className="text-xl font-bold mb-2 text-purple-400">Frontend</h4>
                    <p className="text-sm text-slate-400">React, Vue, Tailwind, Framer Motion</p>
                 </div>
              </div>
            </div>

            <div className="space-y-6">
              {SKILLS.map((skill) => (
                <div key={skill.name} className="group">
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{skill.icon}</span>
                      <span className="font-medium text-lg text-slate-200">{skill.name}</span>
                    </div>
                    <span className="text-slate-500 font-display">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-1000 ease-out group-hover:shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 tracking-tighter">
              Vamos trabalhar <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">juntos?</span>
            </h2>
            <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
              Estou sempre aberta a discutir novos projetos, ideias criativas ou oportunidades de fazer parte de suas visões.
            </p>
            
            <a href="mailto:contact@franciane.dev" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-900 rounded-full font-bold text-lg hover:bg-indigo-50 hover:scale-105 transition-all duration-300 shadow-xl shadow-indigo-500/10">
              <Mail />
              Mandar Email
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 border-t border-slate-800/50 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} {PORTFOLIO_OWNER}. All rights reserved.</p>
        </footer>
      </main>

      {/* Floating AI Chat */}
      <AIChat />
    </div>
  );
}

export default App;