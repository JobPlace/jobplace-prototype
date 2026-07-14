/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"Space Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        ink: '#14181F',
        paper: '#F5F6F9',
        brand: { DEFAULT: '#2547E6', dark: '#1B37B8', soft: '#EAEEFF' },
        pos: { DEFAULT: '#0E9F6E', soft: '#E7F7F0' },
        neg: { DEFAULT: '#E02424', soft: '#FDECEC' },
        warn: { DEFAULT: '#B45309', soft: '#FBF3E4' },
        line: { DEFAULT: '#E6E8EE', strong: '#D3D7E0' },
        muted: '#5B6472',
        faint: '#8A91A0',
      },
      boxShadow: { card: '0 1px 2px rgba(20,24,31,.04), 0 4px 16px rgba(20,24,31,.05)' },
    },
  },
  plugins: [],
}
