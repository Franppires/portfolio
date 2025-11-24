import React from 'react';
import { Project, Skill, SocialLink } from './types';
import { Github, Linkedin, Instagram, Mail } from 'lucide-react';

export const PORTFOLIO_OWNER = "Franciane Pires";
export const ROLE = "Frontend Developer & UI/UX Designer";
export const BIO = "Criando experiências digitais excepcionais com foco em performance, acessibilidade e design inovador. Transformo ideias complexas em interfaces elegantes e intuitivas.";

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: "Portfólio Mônica Magalhães",
    description: "Portfólio da UX Designer Mônica nele contem seus melhores trabalhos na área de designer, informações pessoais e contato.",
    tags: ["HTML", "CSS", "JavaScript"],
    imageUrl: "/src/assets/monica-magalhaes.svg",
    featured: true,
    link: "https://monicamagalhaes.netlify.app/"
  },
  {
    id: '2',
    title: "App de Pagamentos",
    description: "Aplicação que simula o envio de dinheiro para uma outra pessoa, via cartão de crédito usando api.",
    tags: ["HTML", "CSS", "JavaScript"],
    imageUrl: "https://francianepires.netlify.app/assets/app_pagamentos-d05fce4e.svg",
    link: "#"
  },
  {
    id: '3',
    title: "Controle Financeiro",
    description: "Sistema para cadastrar transação de compra e venda, listagem desses cadastros com total.",
    tags: ["HTML", "CSS", "JavaScript"],
    imageUrl: "https://francianepires.netlify.app/assets/controle_financeiro-5e653aaf.svg",
    link: "#"
  },
  {
    id: '4',
    title: "Lembrete de Aniversários",
    description: "Lista de aniversários e componente para redenrizar.",
    tags: ["React, CSS"],
    imageUrl: "https://francianepires.netlify.app/assets/lembrete_aniversarios-80b44448.svg",
    link: "#"
  }
];

export const SKILLS: Skill[] = [
  { name: "React / Next.js", level: 95, icon: "⚛️", category: "frontend" },
  { name: "TypeScript", level: 90, icon: "📘", category: "frontend" },
  { name: "Tailwind CSS", level: 98, icon: "🎨", category: "frontend" },
  { name: "Node.js", level: 75, icon: "🟢", category: "backend" },
  { name: "Figma / UI Design", level: 85, icon: "🖌️", category: "design" },
  { name: "Git / CI/CD", level: 80, icon: "🔧", category: "tools" },
];

export const SOCIALS: SocialLink[] = [
  { platform: "GitHub", url: "https://github.com", icon: <Github size={20} /> },
  { platform: "LinkedIn", url: "https://linkedin.com", icon: <Linkedin size={20} /> },
  { platform: "Instagram", url: "https://instagram.com", icon: <Instagram size={20} /> },
  { platform: "Email", url: "mailto:contact@franciane.dev", icon: <Mail size={20} /> },
];

// Context for the AI to understand who Franciane is
export const AI_SYSTEM_INSTRUCTION = `
Você é a assistente virtual do portfólio de Franciane Pires. 
Sua função é responder perguntas de recrutadores e visitantes sobre a experiência profissional, projetos e habilidades da Franciane.
Use um tom profissional, amigável e entusiasmado.
Fale em Português do Brasil por padrão.

Dados da Franciane:
- Nome: ${PORTFOLIO_OWNER}
- Papel: ${ROLE}
- Bio: ${BIO}
- Habilidades Principais: React, TypeScript, Tailwind, UI/UX.
- Projetos de destaque: E-Commerce Ultra (com Stripe), Dashboard Financeiro (Visualização de dados), App de Saúde Mental (PWA).
- Estilo de trabalho: Foca em código limpo, performance e design pixel-perfect.

Se perguntarem o contato, diga para enviar um email para contact@franciane.dev ou usar o formulário no rodapé.
Responda de forma concisa e direta.
`;