
 # Portfólio — Franciane Pires

Este repositório contém o portfólio frontend de Franciane Pires, com integração de chat por IA (Google Gemini) e um formulário de contato que pode persistir mensagens no Firebase.

![Banner](./public/banner.svg)

## Principais funcionalidades

- Assistente por IA (Google Gemini) com suporte a links via Markdown
- Formulário de contato com opção de armazenar no Firebase Firestore
- Conteúdo em dois idiomas: Português e Inglês
- Otimizações de performance: code-splitting e lazy-loading de rotas e componentes
- Layout responsivo e foco em UI moderna

## Tradução / Como funciona a funcionalidade de idioma

O projeto já possui suporte a múltiplos idiomas através do objeto `TRANSLATIONS` em `constants.tsx`.

- O idioma atual é controlado por um estado no `App` (`language`), com valor inicial `'pt'`.
- O componente `Navbar` exibe um botão para alternar o idioma — ao clicar ele chama `setLanguage('en')` ou `setLanguage('pt')`.
- Para adicionar/ajustar textos, edite `TRANSLATIONS` em `constants.tsx`. Cada chave (ex.: `form`, `nav`, `buttons`) é passada aos componentes como `props`.

Exemplo rápido:

- `TRANSLATIONS.pt.nav.home` → texto do link "Home" em Português
- `TRANSLATIONS.en.nav.home` → texto do link "Home" em Inglês

Se quiser alterar o idioma padrão do app, abra `src/App.tsx` e altere o valor inicial de `useState<Language>('pt')` para `'en'`.

## Como rodar localmente

Pré-requisitos: Node.js 16+ e npm

1. Instale dependências:

```bash
npm install
```

2. Crie um arquivo `.env.local` na raiz com as variáveis abaixo (exemplo):

```env
# Chave Gemini (usada em vite.config.ts como process.env.API_KEY)
GEMINI_API_KEY=seu_gemini_api_key

# Firebase (disponível via import.meta.env.VITE_FIREBASE_*)
VITE_FIREBASE_API_KEY=seu_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=seu_project_id
VITE_FIREBASE_STORAGE_BUCKET=seu_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
VITE_FIREBASE_APP_ID=seu_app_id
```

3. Inicie o servidor de desenvolvimento (porta 3000):

```bash
npm run dev
```

Abra `http://localhost:3000` no navegador.

## Build e Preview (produção)

```bash
npm run build
npm run preview
```

O build de produção será gerado na pasta `dist/`.

Se o build reclamar que o `terser` está faltando, instale como dependência de desenvolvimento:

```bash
npm install --save-dev terser
```

## Notas de desempenho e otimizações já aplicadas

- `vite.config.ts` inclui configuração de `manualChunks` para dividir bibliotecas grandes (`react`, `@google/genai`, `react-markdown`, etc.)
- Rotas e o `App` são carregados com `React.lazy()` + `Suspense` em `src/main.tsx`
- `AIChat` é importado de forma lazy em `App.tsx` para evitar carregar código de IA desnecessariamente na inicialização
- `MessageRenderer` utiliza `react-markdown` para renderizar respostas da IA com links clicáveis

## Scripts úteis

- `npm run dev` — servidor de desenvolvimento
- `npm run build` — gerar build de produção
- `npm run preview` — visualizar build de produção localmente

## Próximas melhorias recomendadas

- Melhorar acessibilidade (alt text, ARIA labels) — ver `ANALISE_E_MELHORIAS.md`
- Validar formulários com `zod` para mensagens do contato
- Adicionar `ErrorBoundary` e testes com `vitest` + `@testing-library/react`
- Organizar `constants` em pasta dedicada para facilitar traduções e manutenção

## Créditos

Portfólio pessoal de Franciane Pires.

Ícones: Lucide React
IA: Google Gemini
UI: Tailwind CSS

---

Se quiser, posso também:

- Adicionar um badge de deploy (Vercel) e um workflow de CI/CD
- Gerar um arquivo `public/banner.png` de exemplo para o README

