import React, { useState, useEffect } from 'react';
import { Menu, X, User, Send, Layout, Globe, Moon, Sun, Workflow } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS, WHATSAPP } from '../constants';

interface NavbarProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  texts: typeof TRANSLATIONS.pt.nav;
}

const Navbar: React.FC<NavbarProps> = ({ language, setLanguage, texts }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'));

  const toggleTheme = () => {
    const next = !document.documentElement.classList.contains('dark');
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
    setDark(next);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ['home', 'work', 'services', 'about', 'contact'];
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
    { name: texts.work, href: '#work', id: 'work', icon: <Layout size={14} /> },
    { name: texts.services, href: '#services', id: 'services', icon: <Workflow size={14} /> },
    { name: texts.about, href: '#about', id: 'about', icon: <User size={14} /> },
    { name: texts.contact, href: '#contact', id: 'contact', icon: <Send size={14} /> },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'pt' ? 'en' : 'pt');
  };

  return (
    <>
      <nav className="site-header fixed top-0 left-0 right-0 z-50 border-b border-line">
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-16 flex items-center gap-2">
            <a href="#home" className="tracking-tight text-lg font-medium text-ink mr-4">
              Franciane
            </a>
            <div className="hidden md:flex items-center gap-1 ml-auto">
              {navLinks.map((link) => (
                <a 
                  key={link.id} 
                  href={link.href}
                  className={`nav-link px-3 py-1.5 rounded-full text-[11px] font-medium uppercase tracking-widest transition-colors ${activeSection === link.id ? 'is-active text-ink' : 'text-zinc-500 hover:text-ink'}`}
                >
                  <span>{link.name}</span>
                </a>
              ))}
            </div>

            {/* Language Toggle */}
            <div className="hidden md:flex items-center ml-1 gap-1">
                <button 
                  onClick={toggleLanguage}
                  className="px-3 py-1.5 rounded-md flex items-center gap-2 text-xs font-medium text-muted hover:text-ink hover:bg-surface border border-transparent hover:border-line transition-colors"
                >
                  <Globe size={14} />
                  <span>{language.toUpperCase()}</span>
                </button>
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="p-2 rounded-md text-muted hover:text-ink hover:bg-surface border border-transparent hover:border-line"
                  aria-label={dark ? 'Usar tema claro' : 'Usar tema escuro'}
                >
                  {dark ? <Sun size={16} /> : <Moon size={16} />}
                </button>
                <a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn-glow ml-3 !py-2 !px-4 text-sm">
                  {texts.cta}
                </a>
            </div>

            {/* Mobile Header */}
            <div className="md:hidden flex items-center justify-between ml-auto gap-1">
              <button
                type="button"
                onClick={toggleTheme}
                className="p-2 text-ink"
                aria-label={dark ? 'Usar tema claro' : 'Usar tema escuro'}
              >
                {dark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button 
                className="p-2 text-ink"
                aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
                aria-expanded={mobileMenuOpen}
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
        <div className="fixed inset-0 z-40 bg-paper md:hidden flex items-center justify-center">
          <div className="flex flex-col gap-8 text-center w-full max-w-xs">
            {navLinks.map((link, idx) => (
              <a 
                key={link.id} 
                href={link.href}
                style={{ animationDelay: `${idx * 50}ms` }}
                className={`text-3xl font-display uppercase flex items-center justify-center gap-4 ${activeSection === link.id ? 'text-ink' : 'text-muted'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.icon}
                {link.name}
              </a>
            ))}
            <div className="mt-8 pt-8 border-t border-line flex justify-center gap-6">
                <button 
                  onClick={toggleLanguage}
                  className="px-6 py-2 rounded-md border border-line text-ink flex items-center gap-2 hover:bg-surface"
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