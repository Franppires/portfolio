/** Configuração do Tailwind (antes ficava inline no index.html, via CDN). */
const base = {
        theme: {
          extend: {
            fontFamily: {
              sans: ['Inter', 'sans-serif'],
              display: ['Inter', 'sans-serif'],
            },
            colors: {
              paper: 'var(--paper)',
              ink: 'var(--ink)',
              muted: 'var(--muted)',
              line: 'var(--line)',
              dark: 'var(--ink)',
              surface: 'var(--surface)',
              accent: 'var(--accent)',
              'accent-light': 'var(--accent-light)',
            },
            backgroundImage: {
              'grid-white': "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgba(255, 255, 255, 0.03)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e\")",
            },
            animation: {
              'float': 'float 6s ease-in-out infinite',
              'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
              'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              'scroll': 'scroll 30s linear infinite',
              'shimmer': 'shimmer 2s linear infinite',
              'spin-slow': 'spin 12s linear infinite',
              'reveal-text': 'revealText 1s cubic-bezier(0.77, 0, 0.175, 1) forwards',
              'blob': 'blob 18s ease-in-out infinite',
              'draw': 'draw 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards',
            },
            keyframes: {
              float: {
                '0%, 100%': { transform: 'translateY(0)' },
                '50%': { transform: 'translateY(-20px)' },
              },
              fadeInUp: {
                '0%': { opacity: '0', transform: 'translateY(40px)' },
                '100%': { opacity: '1', transform: 'translateY(0)' },
              },
              revealText: {
                '0%': { transform: 'translateY(100%)', opacity: '0' },
                '100%': { transform: 'translateY(0)', opacity: '1' },
              },
              scroll: {
                '0%': { transform: 'translateX(0)' },
                '100%': { transform: 'translateX(-50%)' },
              },
              shimmer: {
                'from': { backgroundPosition: '0 0' },
                'to': { backgroundPosition: '-200% 0' },
              },
              blob: {
                '0%': { transform: 'translate(0px, 0px) scale(1)' },
                '50%': { transform: 'translate(24px, -18px) scale(1.04)' },
                '100%': { transform: 'translate(0px, 0px) scale(1)' },
              },
              draw: {
                '0%': { transform: 'scaleX(0)' },
                '100%': { transform: 'scaleX(1)' },
              }
            }
          },
        },
      };

export default {
  content: ['./index.html', './*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  ...base,
};
