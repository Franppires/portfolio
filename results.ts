// Notas reais do Google Lighthouse (preset desktop), medidas com:
//   npx lighthouse <url> --preset=desktop --only-categories=performance,accessibility,best-practices,seo
// Para atualizar: rodar de novo e trocar os números e a data.
export interface SiteScore {
  name: string;
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
}

const SITES: SiteScore[] = [
  { name: 'Le Prö', performance: 98, accessibility: 69, bestPractices: 96, seo: 92 },
  { name: 'Ana Nery', performance: 54, accessibility: 96, bestPractices: 100, seo: 100 },
  { name: 'Indexnet', performance: 68, accessibility: 100, bestPractices: 78, seo: 100 },
  { name: 'Mais Fix', performance: 75, accessibility: 83, bestPractices: 100, seo: 92 },
  { name: 'Loja Coala', performance: 58, accessibility: 91, bestPractices: 70, seo: 92 },
  { name: 'Zaya Beauty', performance: 38, accessibility: 78, bestPractices: 74, seo: 92 },
  { name: 'Grupo MPR', performance: 76, accessibility: 90, bestPractices: 100, seo: 85 },
];

export const LIGHTHOUSE = {
  date: '19/11/2026',
  featured: SITES[0],
  sites: SITES,
};
