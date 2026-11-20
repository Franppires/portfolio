import { Language, Project } from './types';
import { PROJECTS_DATA, INDEXNET_SITES, AGENCY_PROJECTS } from './constants';
import { LIGHTHOUSE } from './results';

export type WorkCategory = 'loja' | 'site' | 'landing' | 'ferramenta';

// Categoria de cada trabalho para o filtro da grade.
const CATEGORY: Record<string, WorkCategory> = {
  maisfix: 'loja',
  lojacoala: 'loja',
  'lepro-br': 'loja',
  zaya: 'loja',
  'lepro-global': 'loja',
  elora: 'site',
  cocreane: 'site',
  'bem-estar': 'site',
  dwonder: 'site',
  grupompr: 'site',
  ananery: 'site',
  'indexnet-site': 'site',
  'lepro-es': 'landing',
  'status-sites': 'ferramenta',
  telegram: 'ferramenta',
  'controle-tempo': 'ferramenta',
};

const FEATURED_IDS = ['lepro-global', 'zaya', 'maisfix'];
// Capas em SVG claras, que escurecem no tema escuro.
export const LIGHT_COVERS = ['status-sites', 'despesas', 'locacao', 'rotina'];
const LAB_IDS = ['despesas', 'locacao', 'rotina', 'medicontrol'];

// Trabalhos feitos como parte da equipe da Indexnet (recebem a etiqueta).
const agencyIds = (lang: Language) => new Set([...INDEXNET_SITES[lang], ...AGENCY_PROJECTS[lang]].map((p) => p.id));
export const isAgency = (id: string) => agencyIds('pt').has(id);

const allProjects = (lang: Language): Project[] => [
  ...PROJECTS_DATA[lang],
  ...INDEXNET_SITES[lang],
  ...AGENCY_PROJECTS[lang],
];

export const getWork = (lang: Language) =>
  allProjects(lang)
    .filter((p) => !FEATURED_IDS.includes(p.id) && !LAB_IDS.includes(p.id))
    .map((p) => ({ ...p, category: CATEGORY[p.id] ?? 'site' }));

export const getLab = (lang: Language) =>
  LAB_IDS.map((id) => allProjects(lang).find((p) => p.id === id)).filter(Boolean) as Project[];

interface CaseCopy {
  id: string;
  kind: string;
  challenge: string;
  solution: string;
}

const CASES: Record<Language, CaseCopy[]> = {
  pt: [
    {
      id: 'lepro-global',
      kind: 'Loja internacional · Shopify',
      challenge: 'A marca brasileira precisava vender fora do país, para clientes que falam outra língua e pagam em outra moeda.',
      solution: 'Loja em inglês e espanhol, com seleção de país e moeda, mantendo a identidade da loja brasileira.',
    },
    {
      id: 'zaya',
      kind: 'Loja virtual · Shopify',
      challenge: 'Fragrância é difícil de escolher pela tela: o cliente não sente o cheiro antes de comprar.',
      solution: 'Um quiz que faz perguntas simples e indica a fragrância certa, levando direto ao produto e aos kits.',
    },
    {
      id: 'maisfix',
      kind: 'Loja B2B · WooCommerce',
      challenge: 'A venda só vale a partir de 10 caixas, e o cliente não podia fechar um pedido abaixo do mínimo.',
      solution: 'Carrinho que já começa em 10 caixas e sobe de 10 em 10, com catálogo, busca por referência e WhatsApp do vendedor.',
    },
  ],
  en: [
    {
      id: 'lepro-global',
      kind: 'International store · Shopify',
      challenge: 'The Brazilian brand needed to sell abroad, to customers who speak another language and pay in another currency.',
      solution: 'A store in English and Spanish, with country and currency selection, keeping the Brazilian store’s identity.',
    },
    {
      id: 'zaya',
      kind: 'Online store · Shopify',
      challenge: 'Fragrance is hard to choose on a screen: customers can’t smell it before buying.',
      solution: 'A quiz with simple questions that suggests the right scent and leads straight to the product and kits.',
    },
    {
      id: 'maisfix',
      kind: 'B2B store · WooCommerce',
      challenge: 'Orders only work from 10 boxes up, and customers could not check out below the minimum.',
      solution: 'A cart that starts at 10 boxes and steps by 10, with a catalog, search by reference, and the sales rep’s WhatsApp.',
    },
  ],
};

export const getCases = (lang: Language) =>
  CASES[lang].map((c) => ({ ...c, project: allProjects(lang).find((p) => p.id === c.id)! }));

export const CLIENT_NAMES = ['Le Prö', 'Zaya Beauty', 'Loja Coala', 'Grupo MPR', 'Ana Nery', 'Mais Fix', "D'Wonder", 'Indexnet', 'Cocreane'];

const CLIENT_NAMES_COUNT = CLIENT_NAMES.length;
const YEARS = new Date().getFullYear() - 2023;
const NOTE_PT = `Medido com o Lighthouse do Google (versão desktop) em ${LIGHTHOUSE.date}. A nota varia a cada medição.`;
const NOTE_EN = `Measured with Google Lighthouse (desktop) on ${LIGHTHOUSE.date}. Scores vary between runs.`;

export const PAGE = {
  pt: {
    hero: {
      kicker: 'Desenvolvedora web · Bauru/SP',
      titlePre: 'Sites e lojas virtuais que',
      words: ['vendem.', 'convertem.', 'encantam.', 'crescem.'],
      titlePost: 'Do layout ao servidor.',
      desc: 'Crio sites institucionais, lojas e landing pages em WordPress, Shopify, Tray e React. Cuido também do domínio, da hospedagem e do SEO, para você não depender de mais ninguém.',
      primary: 'Pedir orçamento no WhatsApp',
      secondary: 'Ver trabalhos',
      clients: 'Marcas que já atendi',
    },
    cases: {
      kicker: 'Cases em destaque',
      title: 'Problemas reais, resolvidos no site.',
      challenge: 'Desafio',
      solution: 'Solução',
      visit: 'Ver site',
    },
    work: {
      title: 'Mais trabalhos',
      filters: { all: 'Todos', loja: 'Lojas', site: 'Sites', landing: 'Landing pages', ferramenta: 'Ferramentas' },
      more: 'Ver mais',
      less: 'Mostrar menos',
      cursor: 'Ver',
      agencyTag: 'com a Indexnet',
      swipe: 'Arraste para ver mais',
      agencyNote: 'Os projetos com a etiqueta “com a Indexnet” foram feitos como parte da equipe da agência.',
    },
    results: {
      kicker: 'Resultados',
      title: 'Bem feitos e encontrados no Google.',
      ringsTitle: 'Nota no Lighthouse (Google)',
      barsTitle: 'SEO por site',
      avg: 'de média em SEO nos sites medidos',
      categories: { performance: 'Desempenho', accessibility: 'Acessibilidade', bestPractices: 'Boas práticas', seo: 'SEO' },
      stats: [
        { value: 20, suffix: '+', label: 'projetos no portfólio' },
        { value: CLIENT_NAMES_COUNT, suffix: '', label: 'marcas atendidas' },
        { value: YEARS, suffix: '+', label: 'anos criando sites em agência' },
      ],
      note: NOTE_PT,
    },
    backToTop: 'Voltar ao topo',
    lab: {
      title: 'Também crio apps próprios:',
      subtitle: '',
    },
    services: {
      kicker: 'Serviços',
      title: 'O que posso fazer pelo seu negócio',
      time: 'Prazo médio',
      items: [
        {
          title: 'Site institucional',
          desc: 'Para apresentar a empresa, os serviços e receber contatos.',
          includes: ['Layout próprio, pensado no celular', 'Painel para você editar textos e fotos', 'SEO básico, SSL e formulário'],
          time: '3 a 5 semanas',
        },
        {
          title: 'Loja virtual',
          desc: 'Para vender online com catálogo, carrinho e pagamento.',
          includes: ['WooCommerce, Shopify ou Tray', 'Regras sob medida (frete, mínimo, kits)', 'Cadastro inicial de produtos'],
          time: 'A combinar',
        },
        {
          title: 'Landing page',
          desc: 'Uma página focada em um produto, campanha ou captação.',
          includes: ['Texto e ordem pensados para conversão', 'Integração com WhatsApp e anúncios', 'Carregamento rápido'],
          time: '1 a 2 semanas',
        },
      ],
      ownership: 'Em todos: o site é seu. Você recebe os acessos e consegue atualizar o conteúdo sozinho.',
    },
    process: {
      title: 'Como trabalho',
      steps: [
        { title: 'Conversa', text: 'Entendo o negócio e o objetivo do site.' },
        { title: 'Estrutura', text: 'Defino páginas, conteúdo e caminho até o contato.' },
        { title: 'Layout', text: 'Desenho no Figma e ajusto com você.' },
        { title: 'Desenvolvimento', text: 'Programo, testo e coloco no ar.' },
        { title: 'Acompanhamento', text: 'Ajusto o que precisar e ensino a atualizar.' },
      ],
    },
    about: {
      kicker: 'Sobre mim',
      title: 'Oi, eu sou a Franciane.',
      text: 'Vim da publicidade e migrei para o desenvolvimento. Por isso penso o site como peça de venda: além de funcionar bem, ele precisa falar com o público certo e levar ao contato.',
      stack: 'Ferramentas',
      journeyTitle: 'Trajetória',
      journey: [
        { when: 'Origem', tag: '', title: 'Publicidade', text: 'Comunicação e marketing: entender o público, a mensagem e o que faz alguém comprar. É a base de como penso cada página.' },
        { when: '2023 – hoje', tag: 'transição de carreira', title: 'Desenvolvedora web · Indexnet Publicidade Digital', text: 'Sites, lojas e landing pages em WordPress, Tray, Shopify e Loja Integrada, com SEO e a hospedagem dos clientes no cPanel e no WHM.' },
        { when: '2023 – hoje', tag: 'em paralelo', title: 'Projetos próprios', text: 'Sites e aplicações em React e Next.js para clientes diretos, do layout no Figma até a publicação.' },
      ],
      quotesTitle: 'Recomendações no LinkedIn',
    },
    faq: {
      title: 'Dúvidas frequentes',
      items: [
        { q: 'Quanto custa um site?', a: 'Depende do tipo e do tamanho. Me chame no WhatsApp contando o que você precisa e eu mando um orçamento sem compromisso.' },
        { q: 'Vou conseguir atualizar o site sozinho?', a: 'Sim. Entrego com painel de edição e mostro como trocar textos, imagens e produtos.' },
        { q: 'Você cuida do domínio e da hospedagem?', a: 'Posso cuidar de tudo: domínio, hospedagem, SSL e e-mails. Se você já tem, configuro no que existe.' },
        { q: 'E depois que o site estiver no ar?', a: 'Faço os ajustes após a entrega e posso seguir com manutenção mensal, se você preferir.' },
      ],
    },
    contact: {
      title: 'Vamos tirar seu projeto do papel?',
      desc: 'Conte o que você precisa. Respondo em até 1 dia útil.',
      whatsapp: 'Chamar no WhatsApp',
      or: 'ou envie uma mensagem',
    },
  },
  en: {
    hero: {
      kicker: 'Web developer · Bauru, Brazil',
      titlePre: 'Websites and online stores that',
      words: ['sell.', 'convert.', 'delight.', 'grow.'],
      titlePost: 'From layout to server.',
      desc: 'I build brochure sites, stores, and landing pages on WordPress, Shopify, Tray, and React. I also handle domain, hosting, and SEO, so you don’t depend on anyone else.',
      primary: 'Get a quote on WhatsApp',
      secondary: 'See work',
      clients: 'Brands I’ve worked with',
    },
    cases: {
      kicker: 'Featured cases',
      title: 'Real problems, solved on the site.',
      challenge: 'Challenge',
      solution: 'Solution',
      visit: 'Visit site',
    },
    work: {
      title: 'More work',
      filters: { all: 'All', loja: 'Stores', site: 'Sites', landing: 'Landing pages', ferramenta: 'Tools' },
      more: 'See more',
      less: 'Show less',
      cursor: 'View',
      agencyTag: 'with Indexnet',
      swipe: 'Swipe to see more',
      agencyNote: 'Projects tagged “with Indexnet” were built as part of the agency team.',
    },
    results: {
      kicker: 'Results',
      title: 'Well built and found on Google.',
      ringsTitle: 'Lighthouse score (Google)',
      barsTitle: 'SEO by site',
      avg: 'average SEO score across measured sites',
      categories: { performance: 'Performance', accessibility: 'Accessibility', bestPractices: 'Best practices', seo: 'SEO' },
      stats: [
        { value: 20, suffix: '+', label: 'projects in the portfolio' },
        { value: CLIENT_NAMES_COUNT, suffix: '', label: 'brands served' },
        { value: YEARS, suffix: '+', label: 'years building sites at an agency' },
      ],
      note: NOTE_EN,
    },
    backToTop: 'Back to top',
    lab: {
      title: 'I also build my own apps:',
      subtitle: '',
    },
    services: {
      kicker: 'Services',
      title: 'What I can do for your business',
      time: 'Typical timeline',
      items: [
        {
          title: 'Business website',
          desc: 'To present the company and services and receive inquiries.',
          includes: ['Custom, mobile-first layout', 'Panel to edit text and photos', 'SEO basics, SSL, and contact form'],
          time: '3 to 5 weeks',
        },
        {
          title: 'Online store',
          desc: 'To sell online with a catalog, cart, and checkout.',
          includes: ['WooCommerce, Shopify, or Tray', 'Custom rules (shipping, minimums, kits)', 'Initial product setup'],
          time: 'Scoped per project',
        },
        {
          title: 'Landing page',
          desc: 'One page focused on a product, campaign, or lead capture.',
          includes: ['Copy and order built for conversion', 'WhatsApp and ads integration', 'Fast loading'],
          time: '1 to 2 weeks',
        },
      ],
      ownership: 'In every case, the site is yours. You get the logins and can update the content yourself.',
    },
    process: {
      title: 'How I work',
      steps: [
        { title: 'Talk', text: 'I learn the business and the site’s goal.' },
        { title: 'Structure', text: 'I define pages, content, and the path to contact.' },
        { title: 'Layout', text: 'I design in Figma and refine it with you.' },
        { title: 'Build', text: 'I code, test, and launch.' },
        { title: 'Follow-up', text: 'I adjust what’s needed and show you how to update.' },
      ],
    },
    about: {
      kicker: 'About me',
      title: 'Hi, I’m Franciane.',
      text: 'I came from advertising and moved into development. That is why I treat a website as a sales piece: besides working well, it has to speak to the right audience and lead to contact.',
      stack: 'Tools',
      journeyTitle: 'Journey',
      journey: [
        { when: 'Origin', tag: '', title: 'Advertising', text: 'Communication and marketing: understanding the audience, the message, and what makes someone buy. It shapes how I think about every page.' },
        { when: '2023 – now', tag: 'career change', title: 'Web developer · Indexnet Publicidade Digital', text: 'Sites, stores, and landing pages on WordPress, Tray, Shopify, and Loja Integrada, with SEO and client hosting on cPanel and WHM.' },
        { when: '2023 – now', tag: 'in parallel', title: 'Own projects', text: 'Sites and apps in React and Next.js for direct clients, from the Figma layout to launch.' },
      ],
      quotesTitle: 'LinkedIn recommendations',
    },
    faq: {
      title: 'FAQ',
      items: [
        { q: 'How much does a website cost?', a: 'It depends on the type and size. Message me on WhatsApp with what you need and I’ll send a free quote.' },
        { q: 'Can I update the site myself?', a: 'Yes. It comes with an editing panel, and I show you how to change text, images, and products.' },
        { q: 'Do you handle domain and hosting?', a: 'I can handle all of it: domain, hosting, SSL, and email. If you already have them, I set up on what exists.' },
        { q: 'What happens after launch?', a: 'I make adjustments after delivery and can continue with monthly maintenance if you prefer.' },
      ],
    },
    contact: {
      title: 'Ready to get your project off the ground?',
      desc: 'Tell me what you need. I reply within 1 business day.',
      whatsapp: 'Chat on WhatsApp',
      or: 'or send a message',
    },
  },
};
