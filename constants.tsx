import React from 'react';
import { Project, SkillCategory, SocialLink, Language, Experience } from './types';
import { Github, Linkedin, Instagram, Mail } from 'lucide-react';

// Import local images so bundler includes them and paths work after deploy
import cocreaneImg from './src/assets/cocreane.webp';
import bemEstarImg from './src/assets/bem-estar-acupuntura.webp';
import eloraImg from './src/assets/elora.webp';
import medicontrolImg from './src/assets/medicontrol.webp';
import whmReportsImg from './src/assets/whm-reports.svg';
import telegramImg from './src/assets/telegram-automation.svg';
import agencySitesImg from './src/assets/agency-sites.svg';
import maisfixImg from './src/assets/maisfix.webp';
import despesasImg from './src/assets/despesas.svg';
import locacaoImg from './src/assets/locacao.svg';
import rotinaImg from './src/assets/rotina.svg';
import dwonderImg from './src/assets/dwonder.webp';
import mprImg from './src/assets/mpr.webp';
import anaNeryImg from './src/assets/ananery.webp';
import coalaImg from './src/assets/coala.webp';
import indexnetSiteImg from './src/assets/indexnet-site.webp';
import leproImg from './src/assets/lepro.webp';
import zayaImg from './src/assets/zaya.webp';
import leproGlobalImg from './src/assets/lepro-global.webp';
import leproEsImg from './src/assets/lepro-es.webp';

export const PORTFOLIO_OWNER = "Franciane Paiva Pires";
export const GITHUB_USERNAME = "Franppires";
export const PROFILE_IMAGE_URL = `https://github.com/${GITHUB_USERNAME}.png`;
export const EMAIL = "contatofranpires@gmail.com";
export const WHATSAPP = `https://wa.me/5514998098786?text=${encodeURIComponent("Olá, Franciane! Vim pelo seu portfólio e quero saber mais sobre um site para o meu negócio.")}`;

// Socials are language agnostic
export const SOCIALS: SocialLink[] = [
  { platform: "GitHub", url: `https://github.com/${GITHUB_USERNAME}`, icon: <Github size={20} /> },
  { platform: "LinkedIn", url: "https://www.linkedin.com/in/franciane-pires/", icon: <Linkedin size={20} /> },
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
        { name: "WHM / cPanel", icon: "🖥️" },
        { name: "Cloudflare", icon: "☁️" },
        { name: "WordPress", icon: "📰" },
        { name: "Vercel", icon: "▲" },
      ]
    },
    {
      title: "Automação",
      skills: [
        { name: "Claude Skills", icon: "✦" },
        { name: "Telegram", icon: "✈️" },
        { name: "Status dos Sites", icon: "📋" },
        { name: "WooCommerce", icon: "🛒" },
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
        { name: "WHM / cPanel", icon: "🖥️" },
        { name: "Cloudflare", icon: "☁️" },
        { name: "WordPress", icon: "📰" },
        { name: "Vercel", icon: "▲" },
      ]
    },
    {
      title: "Automation",
      skills: [
        { name: "Claude Skills", icon: "✦" },
        { name: "Telegram", icon: "✈️" },
        { name: "Status dos Sites", icon: "📋" },
        { name: "WooCommerce", icon: "🛒" },
      ]
    }
  ]
};

const CLIENT_PROJECTS: Record<Language, Project[]> = {
  pt: [
    {
      id: 'maisfix',
      title: "Mais Fix",
      description: "Loja WooCommerce de acessórios para fixação. O carrinho abre em 10 caixas e sobe de 10 em 10, que é o pedido mínimo.",
      tags: ["WordPress", "WooCommerce", "PHP"],
      imageUrl: maisfixImg,
      link: "https://maisfix.com.br/"
    },
    {
      id: 'elora',
      title: "Elora Creative",
      description: "Presença digital para posicionamento de marca, saindo da guerra de preço e ganhando autoridade.",
      tags: ["React", "TypeScript", "TailwindCSS", "UI/UX"],
      imageUrl: eloraImg
    },
    {
      id: 'cocreane',
      title: "Cocreane",
      description: "Site e aplicações sob medida, com foco em performance, engajamento e crescimento.",
      tags: ["React", "TypeScript", "TailwindCSS", "UI/UX"],
      imageUrl: cocreaneImg,
      link: "https://cocreane.vercel.app/"
    },
    {
      id: 'bem-estar',
      title: "Bem Estar Acupuntura",
      description: "Site de tratamentos de acupuntura e terapias integrativas, com apresentação clara dos serviços.",
      tags: ["React", "TypeScript", "TailwindCSS", "UI/UX"],
      imageUrl: bemEstarImg
    },
    {
      id: 'medicontrol',
      title: "Medicontrol",
      description: "Aplicação para controlar medicamentos de uso contínuo em família.",
      tags: ["React", "Figma", "UI/UX"],
      imageUrl: medicontrolImg
    },
    {
      id: 'despesas',
      title: "Minhas despesas",
      description: "Controle de gastos, contas e renda. Funciona no navegador e instala no celular, com a mesma conta no computador.",
      tags: ["PWA", "JavaScript", "Firebase"],
      imageUrl: despesasImg,
      link: "https://franppires.github.io/expenses/"
    },
    {
      id: 'locacao',
      title: "Locação",
      description: "Ranking pessoal de imóveis para alugar: cadastro, comparação lado a lado e importação da lista.",
      tags: ["JavaScript", "HTML", "PWA"],
      imageUrl: locacaoImg
    },
    {
      id: 'rotina',
      title: "Rotina Bebê & Mãe",
      description: "Rotina diária com o bloco do horário atual em destaque, checklist que zera a cada dia e login da família para dividir os dados.",
      tags: ["JavaScript", "Firebase", "PWA"],
      imageUrl: rotinaImg,
      link: "https://franppires.github.io/routine/"
    },
  ],
  en: [
    {
      id: 'maisfix',
      title: "Mais Fix",
      description: "WooCommerce store for fastening accessories. The cart starts at 10 boxes and steps by 10, which is the minimum order.",
      tags: ["WordPress", "WooCommerce", "PHP"],
      imageUrl: maisfixImg,
      link: "https://maisfix.com.br/"
    },
    {
      id: 'elora',
      title: "Elora Creative",
      description: "Digital presence for brand positioning, moving away from price wars toward authority.",
      tags: ["React", "TypeScript", "TailwindCSS", "UI/UX"],
      imageUrl: eloraImg
    },
    {
      id: 'cocreane',
      title: "Cocreane",
      description: "Custom website and apps focused on performance, engagement, and growth.",
      tags: ["React", "TypeScript", "TailwindCSS", "UI/UX"],
      imageUrl: cocreaneImg,
      link: "https://cocreane.vercel.app/"
    },
    {
      id: 'bem-estar',
      title: "Bem Estar Acupuntura",
      description: "Website for acupuncture and integrative therapies, with a clear presentation of services.",
      tags: ["React", "TypeScript", "TailwindCSS", "UI/UX"],
      imageUrl: bemEstarImg
    },
    {
      id: 'medicontrol',
      title: "Medicontrol",
      description: "App to track ongoing medication for families.",
      tags: ["React", "Figma", "UI/UX"],
      imageUrl: medicontrolImg
    },
    {
      id: 'despesas',
      title: "Minhas despesas",
      description: "Monthly spending, bills, and income. Runs in the browser, installs on the phone, and stays in sync with the same account on the computer.",
      tags: ["PWA", "JavaScript", "Firebase"],
      imageUrl: despesasImg,
      link: "https://franppires.github.io/expenses/"
    },
    {
      id: 'locacao',
      title: "Locação",
      description: "Personal ranking of homes to rent: saved listings, side-by-side comparison, and list import.",
      tags: ["JavaScript", "HTML", "PWA"],
      imageUrl: locacaoImg
    },
    {
      id: 'rotina',
      title: "Rotina Bebê & Mãe",
      description: "Daily routine that highlights the current time block, a checklist that resets each day, and family login to share the data.",
      tags: ["JavaScript", "Firebase", "PWA"],
      imageUrl: rotinaImg,
      link: "https://franppires.github.io/routine/"
    },
  ]
};

export const PROJECTS_DATA: Record<Language, Project[]> = {
  pt: CLIENT_PROJECTS.pt,
  en: CLIENT_PROJECTS.en,
};

export const INDEXNET_SITES: Record<Language, Project[]> = {
  pt: [
    {
      id: 'dwonder',
      title: "D'Wonder",
      description: "Site de bonés personalizados: dois caminhos de pedido, catálogo e contato.",
      tags: ["WordPress", "Site"],
      imageUrl: dwonderImg,
      link: "https://indexhost.com.br/dwonder/"
    },
    {
      id: 'grupompr',
      title: "Grupo MPR",
      description: "Site do grupo de limpeza e higiene, com as marcas, o blog e o contato. Ajustes finais, SEO e paginação.",
      tags: ["Site", "SEO"],
      imageUrl: mprImg,
      link: "https://grupompr.com.br/"
    },
    {
      id: 'ananery',
      title: "Ana Nery",
      description: "Site dos cursos técnicos e livres nas unidades de Bauru, Marília e Duartina.",
      tags: ["Site", "Indexnet"],
      imageUrl: anaNeryImg,
      link: "https://ananery.com.br/"
    },
    {
      id: 'lojacoala',
      title: "Loja Coala",
      description: "Loja da Coala organizada por fragrância. Novo menu para o Dia do Consumidor.",
      tags: ["E-commerce", "Indexnet"],
      imageUrl: coalaImg,
      link: "https://www.lojacoala.com.br/"
    },
    {
      id: 'indexnet-site',
      title: "Indexnet",
      description: "Site da agência: soluções, portfólio, blog e contato.",
      tags: ["Site", "Indexnet"],
      imageUrl: indexnetSiteImg,
      link: "https://indexnet.com.br/"
    },
    {
      id: 'lepro-br',
      title: "Le Prö",
      description: "Loja brasileira de realinhamento e recuperação capilar, com linhas, kits e tratamentos.",
      tags: ["E-commerce", "Indexnet"],
      imageUrl: leproImg,
      link: "https://www.lepro.com.br/"
    },
    {
      id: 'zaya',
      title: "Zaya Beauty",
      description: "Loja de fragrance mist, kits e um quiz que indica a fragrância.",
      tags: ["Shopify", "E-commerce"],
      imageUrl: zayaImg,
      link: "https://www.zayabeauty.com.br/"
    },
    {
      id: 'lepro-global',
      title: "Le Prö Global",
      description: "Loja internacional da Le Prö, em inglês e espanhol, com país e moeda.",
      tags: ["Shopify", "E-commerce"],
      imageUrl: leproGlobalImg,
      link: "https://leprocosmetics.com/"
    },
    {
      id: 'lepro-es',
      title: "Organic Single Pass",
      description: "Página em espanhol do tratamento: fórmula, modo de uso, resultados e perguntas.",
      tags: ["Landing page", "Indexnet"],
      imageUrl: leproEsImg,
      link: "https://leprocosmetics.es/organic-single-pass/"
    },
  ],
  en: [
    {
      id: 'dwonder',
      title: "D'Wonder",
      description: "Custom caps site: two ways to order, a catalog, and a contact form.",
      tags: ["WordPress", "Site"],
      imageUrl: dwonderImg,
      link: "https://indexhost.com.br/dwonder/"
    },
    {
      id: 'grupompr',
      title: "Grupo MPR",
      description: "Site for the cleaning and hygiene group, with brands, a blog, and contact. Final adjustments, SEO, and pagination.",
      tags: ["Site", "SEO"],
      imageUrl: mprImg,
      link: "https://grupompr.com.br/"
    },
    {
      id: 'ananery',
      title: "Ana Nery",
      description: "Site for technical and short courses in Bauru, Marília, and Duartina.",
      tags: ["Site", "Indexnet"],
      imageUrl: anaNeryImg,
      link: "https://ananery.com.br/"
    },
    {
      id: 'lojacoala',
      title: "Loja Coala",
      description: "Coala store organized by fragrance. A new menu for Consumer Day.",
      tags: ["E-commerce", "Indexnet"],
      imageUrl: coalaImg,
      link: "https://www.lojacoala.com.br/"
    },
    {
      id: 'indexnet-site',
      title: "Indexnet",
      description: "The agency site: services, portfolio, blog, and contact.",
      tags: ["Site", "Indexnet"],
      imageUrl: indexnetSiteImg,
      link: "https://indexnet.com.br/"
    },
    {
      id: 'lepro-br',
      title: "Le Prö",
      description: "Brazilian store for hair smoothing and recovery, with lines, kits, and treatments.",
      tags: ["E-commerce", "Indexnet"],
      imageUrl: leproImg,
      link: "https://www.lepro.com.br/"
    },
    {
      id: 'zaya',
      title: "Zaya Beauty",
      description: "Fragrance mist store, kits, and a quiz that suggests a scent.",
      tags: ["Shopify", "E-commerce"],
      imageUrl: zayaImg,
      link: "https://www.zayabeauty.com.br/"
    },
    {
      id: 'lepro-global',
      title: "Le Prö Global",
      description: "Le Prö's international store, in English and Spanish, with country and currency.",
      tags: ["Shopify", "E-commerce"],
      imageUrl: leproGlobalImg,
      link: "https://leprocosmetics.com/"
    },
    {
      id: 'lepro-es',
      title: "Organic Single Pass",
      description: "Spanish page for the treatment: formula, how to use it, results, and questions.",
      tags: ["Landing page", "Indexnet"],
      imageUrl: leproEsImg,
      link: "https://leprocosmetics.es/organic-single-pass/"
    },
  ],
};

export const AGENCY_PROJECTS: Record<Language, Project[]> = {
  pt: [
    {
      id: 'status-sites',
      title: "Status dos Sites",
      description: "Painel da Indexnet com ativos, suspensos e ex-clientes. No mesmo sistema: Repositórios, Vencimentos e Checklist Cloudflare.",
      tags: ["Indexnet", "WHM", "Cloudflare", "GitHub"],
      imageUrl: whmReportsImg,
      featured: true
    },
    {
      id: 'telegram',
      title: "Bot de ausência",
      description: "Bot no Telegram da Indexnet que responde sozinho fora do horário, com os modos ausente, online e automático.",
      tags: ["Telegram", "Indexnet"],
      imageUrl: telegramImg
    },
    {
      id: 'controle-tempo',
      title: "Controle de Tempo",
      description: "Registro das horas na Indexnet: sessões do Claude, commits e lançamento manual, reunidos num painel.",
      tags: ["Indexnet", "Claude", "GitHub"],
      imageUrl: agencySitesImg
    },
  ],
  en: [
    {
      id: 'status-sites',
      title: "Status dos Sites",
      description: "Indexnet panel for active, suspended, and former clients. The same system also holds Repositórios, Vencimentos, and Checklist Cloudflare.",
      tags: ["Indexnet", "WHM", "Cloudflare", "GitHub"],
      imageUrl: whmReportsImg,
      featured: true
    },
    {
      id: 'telegram',
      title: "Bot de ausência",
      description: "Indexnet's Telegram bot. It replies on its own outside office hours, with away, online, and automatic modes.",
      tags: ["Telegram", "Indexnet"],
      imageUrl: telegramImg
    },
    {
      id: 'controle-tempo',
      title: "Controle de Tempo",
      description: "Indexnet time log: Claude sessions, commits, and manual entries, collected in one dashboard.",
      tags: ["Indexnet", "Claude", "GitHub"],
      imageUrl: agencySitesImg
    },
  ]
};

export const EXPERIENCE: Record<Language, Experience[]> = {
  pt: [
    {
      id: 'indexnet',
      initials: 'IN',
      company: 'Indexnet Publicidade Digital',
      period: '2023 – atual',
      role: 'Desenvolvedora web',
      description: 'Dezenas de sites, landing pages e lojas em WordPress, Tray e Loja Integrada. SEO, funções sob medida e a hospedagem no cPanel e no WHM. Entre os trabalhos: Lepro Cosmetics, Loja Coala, Grupo MPR e Sercon Bauru.',
      tags: ['PHP', 'JavaScript', 'WordPress', 'Tray', 'Loja Integrada', 'cPanel/WHM', 'SEO'],
    },
    {
      id: 'autonoma',
      initials: 'FP',
      company: 'Autônoma',
      period: '2023 – atual',
      role: 'Desenvolvedora',
      description: 'Landing pages, sites institucionais e aplicações em React e Next.js, do layout no Figma até a publicação, com APIs e versionamento no Git.',
      tags: ['React', 'Next.js', 'TypeScript', 'Figma', 'APIs', 'Git'],
    },
  ],
  en: [
    {
      id: 'indexnet',
      initials: 'IN',
      company: 'Indexnet Publicidade Digital',
      period: '2023 – present',
      role: 'Web developer',
      description: 'Dozens of sites, landing pages, and stores on WordPress, Tray, and Loja Integrada. SEO, custom features, and hosting on cPanel and WHM. Among the work: Lepro Cosmetics, Loja Coala, Grupo MPR, and Sercon Bauru.',
      tags: ['PHP', 'JavaScript', 'WordPress', 'Tray', 'Loja Integrada', 'cPanel/WHM', 'SEO'],
    },
    {
      id: 'autonoma',
      initials: 'FP',
      company: 'Freelance',
      period: '2023 – present',
      role: 'Developer',
      description: 'Landing pages, brochure sites, and React and Next.js apps, from the Figma layout through release, with APIs and Git.',
      tags: ['React', 'Next.js', 'TypeScript', 'Figma', 'APIs', 'Git'],
    },
  ],
};

export const TRANSLATIONS = {
  pt: {
    role: "Sites, WordPress e servidores",
    location: "Bauru/SP",
    available: "Disponível para novos projetos",
    heroLine: "Desenvolvedora web",
    heroDesc: "Faço sites, lojas e páginas de captação. Na Indexnet, o dia a dia é WordPress, WooCommerce, Tray, Loja Integrada, SEO e a hospedagem. Nos projetos próprios, a interface é em React e Next.js.",
    facts: [
      { label: "Desde 2023", value: "Indexnet Publicidade" },
      { label: "Entrego", value: "Sites, lojas e landing pages" },
      { label: "Operação", value: "SEO, cPanel e WHM" },
      { label: "Cidade", value: "Bauru, SP" },
    ],
    quotes: [
      {
        text: "É com muita certeza que eu recomendo a Franciane como desenvolvedora front-end. Além de ser educada e respeitosa, compartilha o que sabe e ajuda a equipe além das próprias obrigações.",
        by: "Moises Azevedo"
      },
      {
        text: "A primeira pessoa que me fez ter um salto de evolução foi você. É esforçada, prestativa, trabalha muito bem em equipe e sabe lidar com problemas mesmo inesperados. Recomendaria sua participação em qualquer projeto de olhos fechados.",
        by: "Gabriel Tomaz"
      }
    ],
    buttons: {
      projects: "Ver projetos",
      cv: "Contato",
      send: "Quero meu orçamento",
      sending: "Enviando...",
      sendAnother: "Enviar outra mensagem",
      viewRepos: "Ver todos os repositórios",
      moreSites: "Ver mais sites",
      fewerSites: "Mostrar menos"
    },
    nav: {
      work: "Trabalhos",
      services: "Serviços",
      about: "Sobre",
      contact: "Contato",
      cta: "Pedir orçamento"
    },
    titles: {
      selectedWorks: "Trabalhos",
      selectedWorksHighlight: "Selecionados",
      experience: "Experiência",
      agency: "Com a agência",
      agencyHighlight: "Indexnet",
      expertise: "Expertise Técnica",
      contact: "Vamos conversar?",
      contactHighlight: "",
      stack: "Stack"
    },
    subtitles: {
      selectedWorks: "Sites e produtos que desenhei e desenvolvi.",
      experience: "O que está no LinkedIn: a agência e os projetos por conta própria.",
      agency: "Sites e ferramentas feitos com a Indexnet, no dia a dia da carteira.",
      expertise: "Frontend, WordPress e operação de servidor — do layout ao diagnóstico.",
      contact: "Estou disponível para novos projetos e oportunidades. Se você busca elevar o nível do seu produto digital, preencha o formulário."
    },
    form: {
      name: "Nome",
      email: "Email",
      subject: "Assunto",
      message: "Mensagem",
      placeholders: {
        name: "Como posso te chamar?",
        email: "seu@email.com",
        subject: "Ex.: site para minha clínica",
        message: "Conte um pouco sobre o seu negócio e o que você precisa..."
      },
      successTitle: "Mensagem recebida!",
      successDesc: "Obrigada pelo contato! Já estou lendo e respondo em até 1 dia útil.",
      error: "Ocorreu um erro ao enviar. Tente novamente.",
      validation: "Por favor, preencha todos os campos obrigatórios."
    },
    footer: {
      rights: "Developed with",
      system: "Todos os sistemas normais"
    }
  },
  en: {
    role: "Websites, WordPress, and servers",
    location: "Bauru, Brazil",
    available: "Available for new projects",
    heroLine: "Web developer",
    heroDesc: "I build sites, stores, and landing pages. At Indexnet, the day-to-day is WordPress, WooCommerce, Tray, Loja Integrada, SEO, and hosting. On my own projects, the interface is React and Next.js.",
    facts: [
      { label: "Since 2023", value: "Indexnet Publicidade" },
      { label: "I deliver", value: "Sites, stores, and landing pages" },
      { label: "Operations", value: "SEO, cPanel, and WHM" },
      { label: "City", value: "Bauru, Brazil" },
    ],
    quotes: [
      {
        text: "I recommend Franciane as a front-end developer without hesitation. She is polite and respectful, shares what she knows, and helps the team beyond her own duties.",
        by: "Moises Azevedo"
      },
      {
        text: "She was the first person who pushed me forward. She is hardworking, helpful, works well on a team, and handles problems even when they are unexpected. I would bring her onto any project with my eyes closed.",
        by: "Gabriel Tomaz"
      }
    ],
    buttons: {
      projects: "View projects",
      cv: "Contact",
      send: "Get my quote",
      sending: "Sending...",
      sendAnother: "Send another message",
      viewRepos: "View all repositories",
      moreSites: "See more sites",
      fewerSites: "Show less"
    },
    nav: {
      work: "Work",
      services: "Services",
      about: "About",
      contact: "Contact",
      cta: "Get a quote"
    },
    titles: {
      selectedWorks: "Selected",
      selectedWorksHighlight: "Works",
      experience: "Experience",
      agency: "With the agency",
      agencyHighlight: "Indexnet",
      expertise: "Technical Expertise",
      contact: "Let's talk?",
      contactHighlight: "",
      stack: "Stack"
    },
    subtitles: {
      selectedWorks: "Sites and products I designed and built.",
      experience: "What is on LinkedIn: the agency and freelance work.",
      agency: "Sites and tools built with Indexnet, for the day-to-day of the portfolio.",
      expertise: "Frontend, WordPress, and server operations — from layout to diagnosis.",
      contact: "I am available for new projects and opportunities. If you are looking to elevate your digital product, fill out the form."
    },
    form: {
      name: "Name",
      email: "Email",
      subject: "Subject",
      message: "Message",
      placeholders: {
        name: "What should I call you?",
        email: "you@email.com",
        subject: "E.g. a website for my clinic",
        message: "Tell me a bit about your business and what you need..."
      },
      successTitle: "Message received!",
      successDesc: "Thanks for reaching out! I'm already reading it and will reply within 1 business day.",
      error: "An error occurred. Please try again.",
      validation: "Please fill in all required fields."
    },
    footer: {
      rights: "Developed with",
      system: "All systems normal"
    }
  }
};

