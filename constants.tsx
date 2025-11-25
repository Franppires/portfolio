import React from 'react';
import { Project, SkillCategory, SocialLink, Language } from './types';
import { Github, Linkedin, Instagram, Mail } from 'lucide-react';

export const PORTFOLIO_OWNER = "Franciane Pires";
export const GITHUB_USERNAME = "Franppires";
export const PROFILE_IMAGE_URL = `https://github.com/${GITHUB_USERNAME}.png`;
export const EMAIL = "contatofranppires@gmail.com";
export const WHATSAPP = "https://wa.me/5514998098786"

// Socials are language agnostic
export const SOCIALS: SocialLink[] = [
  { platform: "GitHub", url: `https://github.com/${GITHUB_USERNAME}`, icon: <Github size={20} /> },
  { platform: "LinkedIn", url: "https://linkedin.com", icon: <Linkedin size={20} /> },
  // { platform: "Instagram", url: "https://instagram.com", icon: <Instagram size={20} /> },
  { platform: "Email", url: "mailto:contatofranpires@gmail.com", icon: <Mail size={20} /> },
];

// Skills are technical terms, so they don't change, but categories titles might need translation if they weren't generic.
// However, "Frontend", "Backend" are standard globally. "Banco de Dados" needs translation.
export const SKILL_CATEGORIES_DATA: Record<string, SkillCategory[]> = {
  pt: [
    {
      title: "Frontend",
      skills: [
        { name: "React", icon: "⚛️" },
        { name: "Next.js", icon: "▲" },
        { name: "JavaScript (ES6+)", icon: "🟨" },
        { name: "TypeScript", icon: "🔷" },
        { name: "HTML5", icon: "🌐" },
        { name: "CSS3", icon: "🎨" },
        { name: "Tailwind CSS", icon: "🌊" },
        { name: "Bootstrap", icon: "🅱️" },
        { name: "Styled-Components", icon: "💅" },
      ]
    },
    {
      title: "Backend",
      skills: [
        { name: "Node.js", icon: "🟢" },
        { name: "PHP", icon: "🐘" },
        { name: "Python", icon: "🐍" },
      ]
    },
    {
      title: "Banco de Dados",
      skills: [
        { name: "MySQL", icon: "🐬" },
        { name: "Firebase", icon: "🔥" },
      ]
    },
    {
      title: "Infraestrutura",
      skills: [
        { name: "Vercel", icon: "▲" },
        { name: "Hostinger", icon: "🟣" },
        { name: "HostGator", icon: "🐊" },
        { name: "Cloudflare", icon: "☁️" },
      ]
    }
  ],
  en: [
    {
      title: "Frontend",
      skills: [
        { name: "React", icon: "⚛️" },
        { name: "Next.js", icon: "▲" },
        { name: "JavaScript (ES6+)", icon: "🟨" },
        { name: "TypeScript", icon: "🔷" },
        { name: "HTML5", icon: "🌐" },
        { name: "CSS3", icon: "🎨" },
        { name: "Tailwind CSS", icon: "🌊" },
        { name: "Bootstrap", icon: "🅱️" },
        { name: "Styled-Components", icon: "💅" },
      ]
    },
    {
      title: "Backend",
      skills: [
        { name: "Node.js", icon: "🟢" },
        { name: "PHP", icon: "🐘" },
        { name: "Python", icon: "🐍" },
      ]
    },
    {
      title: "Database",
      skills: [
        { name: "MySQL", icon: "🐬" },
        { name: "Firebase", icon: "🔥" },
      ]
    },
    {
      title: "Infrastructure",
      skills: [
        { name: "Vercel", icon: "▲" },
        { name: "Hostinger", icon: "🟣" },
        { name: "HostGator", icon: "🐊" },
        { name: "Cloudflare", icon: "☁️" },
      ]
    }
  ]
};

export const PROJECTS_DATA: Record<Language, Project[]> = {
  pt: [
    {
      id: '1',
      title: "Cocreane",
      description: "A Cocreane cria websites e aplicações personalizadas, otimizadas para performance, engajamento e crescimento exponencial.",
      tags: ["React", "TypeScript", "TailwindCSS", "UI/UX", "Node.js"],
      imageUrl: "src/assets/cocreane.png",
      featured: true,
      link: "https://cocreane.vercel.app/"
    },
    {
      id: '2',
      title: "Bem Estar Acupuntura",
      description: "Tratamentos personalizados de acupuntura e terapias integrativas para restaurar sua vitalidade.",
      tags: ["React", "TypeScript", "TailwindCSS", "Lucide React", "UI/UX", "Node.js"],
      imageUrl: "src/assets/bem-estar-acupuntura.png",
      link: "#"
    },
    {
      id: '3',
      title: "Elora Creative",
      description: "Posicionamento de marca que desejam sair da guerra de preços e se tornarem autoridade.",
      tags: ["React", "TypeScript", "TailwindCSS", "UI/UX"],
      imageUrl: "/src/assets/elora.png",
      link: "#"
    },
    {
      id: '4',
      title: "Medicontrol",
      description: "Aplicação desenvolvida para facilitar o controle de medicamentos de uso contínuo para famílias.",
      tags: ["React", "Figma", "UI/UX"],
      imageUrl: "/src/assets/medicontrol.png",
      link: "#"
    },
    
  ],
  en: [
    {
      id: '1',
      title: "Medicontrol",
      description: "Health management and medical control system, focused on ease of use and data security.",
      tags: ["React", "Node.js", "Tailwind", "Health"],
      imageUrl: "https://picsum.photos/800/600?random=10",
      featured: true,
      link: "#"
    },
    {
      id: '2',
      title: "Cookup",
      description: "Interactive recipe and culinary management platform focusing on mobile performance and UX.",
      tags: ["Next.js", "Vite", "TypeScript"],
      imageUrl: "https://picsum.photos/800/600?random=20",
      link: "#"
    },
    {
      id: '3',
      title: "Cocreane",
      description: "Corporate website developed with a focus on visual identity and high performance.",
      tags: ["Wordpress", "PHP", "Bootstrap"],
      imageUrl: "https://picsum.photos/800/600?random=30",
      link: "#"
    },
    {
      id: '4',
      title: "Monica Magalhaes",
      description: "Professional portfolio and personal blog with exclusive design and CMS integration.",
      tags: ["React", "Figma", "UI/UX"],
      imageUrl: "https://picsum.photos/800/600?random=40",
      link: "#"
    }
  ]
};

export const TRANSLATIONS = {
  pt: {
    role: "Software Developer",
    location: "Bauru/SP",
    available: "Disponível para novos projetos",
    heroDesc: "Transformando ideias em software robusto e interfaces de alta performance.",
    buttons: {
      projects: "Ver Projetos",
      cv: "CV",
      send: "Enviar Mensagem",
      sending: "Enviando...",
      sendAnother: "Enviar outra mensagem",
      viewRepos: "Ver todos os repositórios"
    },
    nav: {
      home: "Home",
      projects: "Projetos",
      skills: "Skills",
      contact: "Contato"
    },
    titles: {
      selectedWorks: "Trabalhos",
      selectedWorksHighlight: "Selecionados",
      expertise: "Expertise Técnica",
      contact: "Vamos conversar?",
      contactHighlight: "",
      stack: "Stack"
    },
    subtitles: {
      selectedWorks: "Projetos que combinam código complexo com design intuitivo para resolver problemas reais.",
      expertise: "Um stack tecnológico completo para desenvolvimento web moderno, do conceito ao deploy.",
      contact: "Estou disponível para novos projetos e oportunidades. Se você busca elevar o nível do seu produto digital, preencha o formulário."
    },
    form: {
      name: "Nome",
      email: "Email",
      subject: "Assunto",
      message: "Mensagem",
      placeholders: {
        name: "Seu nome",
        email: "seu@email.com",
        subject: "Sobre o que vamos conversar?",
        message: "Conte-me mais sobre seu projeto..."
      },
      successTitle: "Mensagem Enviada!",
      successDesc: "Obrigado pelo contato. Retornarei sua mensagem o mais breve possível.",
      error: "Ocorreu um erro ao enviar. Tente novamente.",
      validation: "Por favor, preencha todos os campos obrigatórios."
    },
    footer: {
      rights: "Developed with",
      system: "Todos os sistemas normais"
    }
  },
  en: {
    role: "Software Developer",
    location: "Bauru, Brazil",
    available: "Available for new projects",
    heroDesc: "Transforming ideas into robust software and high-performance interfaces.",
    buttons: {
      projects: "View Projects",
      cv: "Resume",
      send: "Send Message",
      sending: "Sending...",
      sendAnother: "Send another message",
      viewRepos: "View all repositories"
    },
    nav: {
      home: "Home",
      projects: "Projects",
      skills: "Skills",
      contact: "Contact"
    },
    titles: {
      selectedWorks: "Selected",
      selectedWorksHighlight: "Works",
      expertise: "Technical Expertise",
      contact: "Let's talk?",
      contactHighlight: "",
      stack: "Stack"
    },
    subtitles: {
      selectedWorks: "Projects that combine complex code with intuitive design to solve real problems.",
      expertise: "A complete tech stack for modern web development, from concept to deploy.",
      contact: "I am available for new projects and opportunities. If you are looking to elevate your digital product, fill out the form."
    },
    form: {
      name: "Name",
      email: "Email",
      subject: "Subject",
      message: "Message",
      placeholders: {
        name: "Your name",
        email: "you@email.com",
        subject: "What shall we talk about?",
        message: "Tell me more about your project..."
      },
      successTitle: "Message Sent!",
      successDesc: "Thanks for reaching out. I'll get back to you as soon as possible.",
      error: "An error occurred. Please try again.",
      validation: "Please fill in all required fields."
    },
    footer: {
      rights: "Developed with",
      system: "All systems normal"
    }
  }
};

// Flatten skills for marquee (language independent for icons/names usually, but we use PT data for now as source)
export const ALL_SKILLS = SKILL_CATEGORIES_DATA.pt.flatMap(cat => cat.skills);

export const AI_SYSTEM_INSTRUCTION = `
Você é a assistente virtual do portfólio de ${PORTFOLIO_OWNER}.
Responda no idioma em que o usuário perguntar (Português ou Inglês).
Use um tom profissional e direto.

Dados da Franciane:
- Nome: ${PORTFOLIO_OWNER}
- Papel: Software Developer
- Frontend: React, Next.js, JavaScript, TypeScript, Tailwind, Bootstrap, Styled-Components.
- Backend: Node.js, PHP, Python.
- Github: https://github.com/${GITHUB_USERNAME}

Se perguntarem o contato, diga para enviar um email para [${EMAIL}](mailto:${EMAIL}) ou [WhatsApp](${WHATSAPP}).`;
