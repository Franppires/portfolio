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
      challenge: 'Uma marca brasileira de cosméticos queria conquistar clientes fora do país, que falam outra língua e pagam em outra moeda.',
      solution: 'Uma loja global em inglês e espanhol, com país e moeda escolhidos pelo próprio cliente, sem perder a identidade da marca.',
    },
    {
      id: 'zaya',
      kind: 'Loja virtual · Shopify',
      challenge: 'Como vender perfume pela internet se o cliente não pode sentir o cheiro antes de comprar?',
      solution: 'Um quiz rápido que entende o gosto de quem visita e indica a fragrância ideal, levando direto ao produto e aos kits.',
    },
    {
      id: 'maisfix',
      kind: 'Loja B2B · WooCommerce',
      challenge: 'A empresa só vende a partir de 10 caixas, mas um carrinho comum deixa o cliente fechar pedidos abaixo do mínimo.',
      solution: 'Um carrinho que já começa em 10 caixas e sobe de 10 em 10, com catálogo, busca por referência e o WhatsApp do vendedor a um clique.',
    },
  ],
  en: [
    {
      id: 'lepro-global',
      kind: 'International store · Shopify',
      challenge: 'A Brazilian cosmetics brand wanted to win customers abroad, who speak another language and pay in another currency.',
      solution: 'A global store in English and Spanish, with country and currency picked by the customer, keeping the brand’s identity intact.',
    },
    {
      id: 'zaya',
      kind: 'Online store · Shopify',
      challenge: 'How do you sell perfume online when customers can’t smell it before buying?',
      solution: 'A quick quiz that learns the visitor’s taste and recommends the ideal scent, leading straight to the product and kits.',
    },
    {
      id: 'maisfix',
      kind: 'B2B store · WooCommerce',
      challenge: 'The company only sells from 10 boxes up, but a regular cart lets customers check out below the minimum.',
      solution: 'A cart that starts at 10 boxes and steps by 10, with a catalog, search by reference, and the sales rep’s WhatsApp one click away.',
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
      kicker: '',
      titlePre: 'Sites e lojas virtuais que',
      words: ['vendem.', 'trazem clientes.', 'aparecem no Google.', 'passam confiança.'],
      titlePost: 'Do texto que vende ao servidor que não cai.',
      desc: 'Sem intermediários: você fala direto com quem escreve, desenha, programa e cuida da hospedagem do seu site. Menos ruído, mais agilidade e um site pensado do primeiro ao último detalhe para transformar visitas em contatos.',
      primary: 'Quero um orçamento',
      secondary: 'Ver projetos',
      clients: 'Marcas com quem já trabalhei',
    },
    cases: {
      kicker: 'Cases em destaque',
      title: 'Cada negócio tem um desafio. Cada site, uma solução.',
      challenge: 'O desafio',
      solution: 'A solução',
      visit: 'Ver o site no ar',
    },
    work: {
      title: 'Mais projetos',
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
      title: 'Bonito é o mínimo. Seu site precisa ser encontrado.',
      ringsTitle: 'Nota no Google Lighthouse',
      barsTitle: 'SEO nos sites medidos',
      avg: 'de nota média em SEO: sites prontos para serem achados no Google',
      categories: { performance: 'Desempenho', accessibility: 'Acessibilidade', bestPractices: 'Boas práticas', seo: 'SEO' },
      stats: [
        { value: 20, suffix: '+', label: 'projetos criados' },
        { value: CLIENT_NAMES_COUNT, suffix: '', label: 'marcas atendidas' },
        { value: YEARS, suffix: '+', label: 'anos criando sites em agência' },
      ],
      note: NOTE_PT,
    },
    audit: {
      kicker: 'Diagnóstico gratuito',
      title: 'E o seu site, quanto tira no Google?',
      desc: 'Mande o link e eu analiso o seu site com as mesmas ferramentas que uso nos meus projetos. Você recebe um resumo claro do que está travando seus resultados e do que dá para melhorar, sem custo e sem compromisso.',
      points: ['Velocidade de carregamento', 'SEO: como o Google enxerga o site', 'Experiência no celular'],
      placeholder: 'www.seusite.com.br',
      button: 'Quero meu diagnóstico',
      note: 'Abre o WhatsApp com o link já na mensagem.',
      error: 'Digite um endereço válido, por exemplo: www.seusite.com.br',
      message: 'Olá, Franciane! Vim pelo seu portfólio e quero o diagnóstico gratuito do meu site: {url}',
    },
    audience: {
      kicker: 'Para quem eu crio',
      title: 'Feito para negócios que querem ser encontrados.',
      items: [
        { title: 'Clínicas e consultórios', text: 'Serviços explicados com clareza, confiança logo no primeiro clique e agendamento pelo WhatsApp.' },
        { title: 'Lojas e marcas', text: 'Venda online com as regras do seu negócio: frete, pedido mínimo, kits e catálogo organizado.' },
        { title: 'Prestadores de serviço', text: 'Um site que apresenta o seu trabalho e traz pedidos de orçamento todos os dias.' },
        { title: 'Negócios de Bauru e região', text: 'Apareça para quem procura o seu serviço perto de casa, no Google e no Maps.' },
      ],
    },
    why: {
      kicker: 'Por que trabalhar comigo',
      title: 'Uma pessoa só, do texto ao servidor.',
      items: [
        { title: 'Você fala direto com quem faz', text: 'A mesma pessoa que ouve você escreve, desenha e programa. Nada se perde no caminho, e as respostas vêm rápido.' },
        { title: 'Olhar de publicidade', text: 'Sei o que faz alguém comprar. O texto, as imagens e a ordem das seções são pensados para converter, não só para enfeitar.' },
        { title: 'Do domínio ao servidor', text: 'Experiência com cPanel, WHM e Cloudflare: seu site no ar, seguro e rápido, sem você precisar entender nada disso.' },
        { title: 'Bagagem de agência', text: 'Mais de 3 anos entregando sites e lojas para marcas como Le Prö e Zaya, na equipe da Indexnet.' },
      ],
      cta: 'Vamos conversar sobre o seu projeto',
    },
    backToTop: 'Voltar ao topo',
    lab: {
      title: 'Nas horas vagas, também crio apps próprios:',
      subtitle: '',
    },
    services: {
      kicker: 'Serviços',
      title: 'Escolha o ponto de partida. O resto é comigo.',
      time: 'Prazo médio',
      items: [
        {
          title: 'Site institucional',
          desc: 'Para passar credibilidade e ser encontrado: sua empresa apresentada do jeito certo, com o contato a um clique.',
          includes: ['Layout exclusivo, pensado primeiro para o celular', 'Painel para você atualizar textos e fotos', 'SEO, certificado de segurança e formulário'],
          time: '3 a 5 semanas',
        },
        {
          title: 'Loja virtual',
          desc: 'Para vender todos os dias, até enquanto você dorme. Catálogo, carrinho e pagamento funcionando do seu jeito.',
          includes: ['WooCommerce, Shopify ou Tray', 'Regras do seu negócio: frete, pedido mínimo, kits', 'Primeiros produtos já cadastrados'],
          time: 'A combinar',
        },
        {
          title: 'Landing page',
          desc: 'Para campanhas e anúncios: uma página com um único objetivo, transformar visita em contato.',
          includes: ['Texto e estrutura pensados para converter', 'Integrada ao WhatsApp e aos anúncios', 'Leve e rápida, até no 4G'],
          time: '1 a 2 semanas',
        },
      ],
      ownership: 'Em todos os projetos, o site é 100% seu: você recebe todos os acessos e atualiza quando quiser, sem depender de ninguém.',
    },
    process: {
      title: 'Do primeiro "oi" ao site no ar',
      steps: [
        { title: 'Conversa', text: 'Você me conta sobre o negócio e aonde quer chegar.' },
        { title: 'Estratégia', text: 'Planejo as páginas e o caminho que leva o visitante até o contato.' },
        { title: 'Layout', text: 'Você vê o visual antes de qualquer código e aprova cada detalhe.' },
        { title: 'Desenvolvimento', text: 'Programo, testo em vários aparelhos e coloco no ar.' },
        { title: 'Acompanhamento', text: 'Fico por perto depois da entrega e te ensino a atualizar.' },
      ],
    },
    about: {
      kicker: 'Sobre mim',
      title: 'Oi, eu sou a Franciane.',
      text: 'Comecei na publicidade, onde aprendi o que faz alguém parar, prestar atenção e comprar. Hoje junto isso ao código: cada site que eu crio é bonito e rápido e, principalmente, feito para vender.',
      stack: 'Ferramentas',
      journeyTitle: 'Trajetória',
      journey: [
        { when: 'Origem', tag: '', title: 'Publicidade', text: 'Comunicação e marketing: entender o público, a mensagem certa e o que faz alguém decidir. É a base de cada página que eu desenho.' },
        { when: '2023 – hoje', tag: 'transição de carreira', title: 'Desenvolvedora web · Indexnet Publicidade Digital', text: 'Sites, lojas e landing pages em WordPress, Tray, Shopify e Loja Integrada, com SEO e a hospedagem dos clientes da agência.' },
        { when: '2023 – hoje', tag: 'em paralelo', title: 'Projetos próprios', text: 'Sites e aplicações em React e Next.js para clientes diretos, do primeiro rascunho no Figma até a publicação.' },
      ],
      quotesTitle: 'O que dizem sobre trabalhar comigo',
    },
    faq: {
      title: 'Ficou alguma dúvida?',
      items: [
        { q: 'Quanto custa um site?', a: 'Depende do que o seu negócio precisa: uma landing page é bem diferente de uma loja completa. Me conte sua ideia no WhatsApp e eu mando um orçamento claro, sem compromisso.' },
        { q: 'Em quanto tempo fica pronto?', a: 'Uma landing page costuma ficar pronta em 1 a 2 semanas, e um site institucional em 3 a 5. Lojas variam conforme o número de produtos e as regras de venda.' },
        { q: 'Vou conseguir atualizar o site sozinho?', a: 'Sim, sem complicação. O site vem com painel de edição e eu mostro, passo a passo, como trocar textos, fotos e produtos.' },
        { q: 'Você cuida do domínio e da hospedagem?', a: 'Cuido de tudo: domínio, hospedagem, certificado de segurança (SSL) e e-mails profissionais. Se você já tem algum desses, aproveito o que existe.' },
        { q: 'E depois que o site estiver no ar?', a: 'Eu não sumo. Faço os ajustes depois da entrega e, se você quiser tranquilidade, sigo com manutenção mensal.' },
      ],
    },
    contact: {
      title: 'Seu próximo cliente pode estar procurando você agora.',
      desc: 'Me conte sobre o seu negócio. Em até 1 dia útil eu respondo com ideias e um orçamento, sem compromisso.',
      whatsapp: 'Quero conversar no WhatsApp',
      or: 'ou, se preferir, envie uma mensagem',
    },
  },
  en: {
    hero: {
      kicker: '',
      titlePre: 'Websites and online stores that',
      words: ['sell.', 'bring clients.', 'rank on Google.', 'build trust.'],
      titlePost: 'From copy that sells to a server that stays up.',
      desc: 'No middlemen: you talk directly to the person who writes, designs, codes, and hosts your site. Less noise, faster answers, and a site built down to the last detail to turn visitors into leads.',
      primary: 'Get a quote',
      secondary: 'See projects',
      clients: 'Brands I’ve worked with',
    },
    cases: {
      kicker: 'Featured cases',
      title: 'Every business has a challenge. Every site, a solution.',
      challenge: 'The challenge',
      solution: 'The solution',
      visit: 'See it live',
    },
    work: {
      title: 'More projects',
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
      title: 'Looking good is the baseline. Your site needs to be found.',
      ringsTitle: 'Google Lighthouse score',
      barsTitle: 'SEO across measured sites',
      avg: 'average SEO score: sites ready to be found on Google',
      categories: { performance: 'Performance', accessibility: 'Accessibility', bestPractices: 'Best practices', seo: 'SEO' },
      stats: [
        { value: 20, suffix: '+', label: 'projects built' },
        { value: CLIENT_NAMES_COUNT, suffix: '', label: 'brands served' },
        { value: YEARS, suffix: '+', label: 'years building sites at an agency' },
      ],
      note: NOTE_EN,
    },
    audit: {
      kicker: 'Free audit',
      title: 'How does your site score on Google?',
      desc: 'Send me the link and I’ll analyze your site with the same tools I use on my projects. You get a clear summary of what’s holding your results back and what can be improved, free and with no strings attached.',
      points: ['Loading speed', 'SEO: how Google sees your site', 'Mobile experience'],
      placeholder: 'www.yoursite.com',
      button: 'Get my audit',
      note: 'Opens WhatsApp with the link already in the message.',
      error: 'Enter a valid address, for example: www.yoursite.com',
      message: 'Hi Franciane! I found your portfolio and would like the free audit of my site: {url}',
    },
    audience: {
      kicker: 'Who I build for',
      title: 'Made for businesses that want to be found.',
      items: [
        { title: 'Clinics and practices', text: 'Services explained clearly, trust from the first click, and booking via WhatsApp.' },
        { title: 'Stores and brands', text: 'Online sales with your business rules: shipping, minimum order, kits, and an organized catalog.' },
        { title: 'Service providers', text: 'A site that showcases your work and brings in quote requests every day.' },
        { title: 'Local businesses', text: 'Show up for people searching for your service nearby, on Google and Maps.' },
      ],
    },
    why: {
      kicker: 'Why work with me',
      title: 'One person, from copy to server.',
      items: [
        { title: 'You talk to the person who builds it', text: 'The same person who listens to you writes, designs, and codes. Nothing gets lost along the way, and answers come fast.' },
        { title: 'An advertising mindset', text: 'I know what makes people buy. Copy, images, and section order are designed to convert, not just to look nice.' },
        { title: 'From domain to server', text: 'Experience with cPanel, WHM, and Cloudflare: your site live, secure, and fast, without you needing to understand any of it.' },
        { title: 'Agency experience', text: 'Over 3 years delivering sites and stores for brands like Le Prö and Zaya, as part of the Indexnet team.' },
      ],
      cta: 'Let’s talk about your project',
    },
    backToTop: 'Back to top',
    lab: {
      title: 'In my spare time, I also build my own apps:',
      subtitle: '',
    },
    services: {
      kicker: 'Services',
      title: 'Pick your starting point. I’ll handle the rest.',
      time: 'Typical timeline',
      items: [
        {
          title: 'Business website',
          desc: 'To build credibility and get found: your company presented the right way, with contact one click away.',
          includes: ['Custom layout, designed mobile-first', 'Panel to update text and photos yourself', 'SEO, SSL certificate, and contact form'],
          time: '3 to 5 weeks',
        },
        {
          title: 'Online store',
          desc: 'To sell every day, even while you sleep. Catalog, cart, and checkout working your way.',
          includes: ['WooCommerce, Shopify, or Tray', 'Your business rules: shipping, minimum order, kits', 'First products already set up'],
          time: 'Scoped per project',
        },
        {
          title: 'Landing page',
          desc: 'For campaigns and ads: one page with one goal, turning visits into leads.',
          includes: ['Copy and structure built to convert', 'Connected to WhatsApp and your ads', 'Light and fast, even on mobile data'],
          time: '1 to 2 weeks',
        },
      ],
      ownership: 'In every project, the site is 100% yours: you get every login and update it whenever you want, without depending on anyone.',
    },
    process: {
      title: 'From the first "hello" to a live site',
      steps: [
        { title: 'Talk', text: 'You tell me about the business and where you want to go.' },
        { title: 'Strategy', text: 'I plan the pages and the path that leads visitors to contact you.' },
        { title: 'Layout', text: 'You see the design before any code and approve every detail.' },
        { title: 'Build', text: 'I code, test on several devices, and launch.' },
        { title: 'Follow-up', text: 'I stay close after delivery and show you how to update.' },
      ],
    },
    about: {
      kicker: 'About me',
      title: 'Hi, I’m Franciane.',
      text: 'I started in advertising, where I learned what makes people stop, pay attention, and buy. Now I bring that into code: every site I build is beautiful and fast, and above all, made to sell.',
      stack: 'Tools',
      journeyTitle: 'Journey',
      journey: [
        { when: 'Origin', tag: '', title: 'Advertising', text: 'Communication and marketing: understanding the audience, the right message, and what makes someone decide. It’s the foundation of every page I design.' },
        { when: '2023 – now', tag: 'career change', title: 'Web developer · Indexnet Publicidade Digital', text: 'Sites, stores, and landing pages on WordPress, Tray, Shopify, and Loja Integrada, with SEO and hosting for the agency’s clients.' },
        { when: '2023 – now', tag: 'in parallel', title: 'Own projects', text: 'Sites and apps in React and Next.js for direct clients, from the first Figma sketch to launch.' },
      ],
      quotesTitle: 'What people say about working with me',
    },
    faq: {
      title: 'Questions?',
      items: [
        { q: 'How much does a website cost?', a: 'It depends on what your business needs: a landing page is very different from a full store. Tell me your idea on WhatsApp and I’ll send a clear, no-strings quote.' },
        { q: 'How long does it take?', a: 'A landing page usually takes 1 to 2 weeks, and a business website 3 to 5. Stores vary with the number of products and sales rules.' },
        { q: 'Can I update the site myself?', a: 'Yes, easily. The site comes with an editing panel, and I walk you through changing text, photos, and products.' },
        { q: 'Do you handle domain and hosting?', a: 'I handle everything: domain, hosting, SSL certificate, and professional email. If you already have some of these, I use what exists.' },
        { q: 'What happens after launch?', a: 'I don’t disappear. I make adjustments after delivery and, if you want peace of mind, continue with monthly maintenance.' },
      ],
    },
    contact: {
      title: 'Your next client might be looking for you right now.',
      desc: 'Tell me about your business. Within 1 business day I’ll reply with ideas and a no-strings quote.',
      whatsapp: 'Chat on WhatsApp',
      or: 'or, if you prefer, send a message',
    },
  },
};
