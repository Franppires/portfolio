import React, { useState, useEffect } from 'react';
import { Menu, X, Code, User, Send, Layout, Globe } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface NavbarProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  texts: typeof TRANSLATIONS.pt.nav;
}

const Navbar: React.FC<NavbarProps> = ({ language, setLanguage, texts }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ['home', 'projects', 'skills', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 300 && rect.bottom >= 300) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: texts.home, href: '#home', id: 'home', icon: <User size={14} /> },
    { name: texts.projects, href: '#projects', id: 'projects', icon: <Layout size={14} /> },
    { name: texts.skills, href: '#skills', id: 'skills', icon: <Code size={14} /> },
    { name: texts.contact, href: '#contact', id: 'contact', icon: <Send size={14} /> },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'pt' ? 'en' : 'pt');
  };

  return (
    <>
      <nav className={`fixed top-6 left-0 right-0 z-50 flex justify-center transition-all duration-500 ${scrolled ? 'translate-y-0' : 'translate-y-2'}`}>
        <div className="mx-4 md:mx-0 perspective-1000">
          <div className={`rounded-full pl-2 pr-2 py-1.5 flex items-center gap-1 transition-all duration-500 shadow-2xl ${
            scrolled 
              ? 'bg-slate-900/80 border border-white/10 backdrop-blur-2xl shadow-black/50' 
              : 'bg-slate-900/60 border border-white/5 backdrop-blur-lg'
          }`}>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center p-1">
              {navLinks.map((link) => (
                <a 
                  key={link.id} 
                  href={link.href}
                  className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 group overflow-hidden
                    ${activeSection === link.id 
                      ? 'text-white shadow-lg' 
                      : 'text-slate-400 hover:text-white'}`}
                >
                  {activeSection === link.id && (
                    <div className="absolute inset-0 bg-white/10 rounded-full border border-white/5 shadow-inner"></div>
                  )}
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 rounded-full transition-opacity duration-300"></div>

                  <span className={`relative z-10 transition-colors duration-300 ${activeSection === link.id ? 'text-indigo-400' : 'group-hover:text-indigo-300'}`}>{link.icon}</span>
                  <span className="relative z-10">{link.name}</span>
                </a>
              ))}
            </div>

            {/* Language Toggle */}
            <div className="flex items-center ml-2 border-l border-white/10 pl-2">
                <button 
                  onClick={toggleLanguage}
                  className="relative px-3 py-1.5 rounded-full flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white hover:bg-white/5 transition-all group"
                >
                  <Globe size={14} className="text-indigo-400" />
                  <span>{language.toUpperCase()}</span>
                </button>
            </div>

            {/* Mobile Header */}
            <div className="md:hidden flex items-center justify-between px-4 ml-2 gap-4">
              <span className="font-display font-bold text-white tracking-wide text-lg">Fran<span className="text-indigo-500">.</span></span>
              <button 
                className="p-2 text-slate-300 hover:text-white active:scale-95 transition-transform"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-dark/95 backdrop-blur-3xl md:hidden flex items-center justify-center animate-fade-in-up">
          <div className="flex flex-col gap-8 text-center w-full max-w-xs">
            {navLinks.map((link, idx) => (
              <a 
                key={link.id} 
                href={link.href}
                style={{ animationDelay: `${idx * 50}ms` }}
                className={`text-3xl font-display font-bold flex items-center justify-center gap-4 transition-colors animate-fade-in-up ${activeSection === link.id ? 'text-indigo-400' : 'text-slate-300'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.icon}
                {link.name}
              </a>
            ))}
            <div className="mt-8 pt-8 border-t border-white/10 flex justify-center gap-6">
                <button 
                  onClick={toggleLanguage}
                  className="px-6 py-2 rounded-full border border-white/10 text-white flex items-center gap-2 hover:bg-white/10"
                >
                  <Globe size={16} />
                  Mudar para {language === 'pt' ? 'Inglês' : 'Portuguese'}
                </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;