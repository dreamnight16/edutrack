import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2F78C4',
          light: '#5A9BD6',
          dark: '#225A96',
        },
        accent: '#F2B84B',
        background: '#F2F5F7',
        surface: '#FFFFFF',
        foreground: '#17202A',
        muted: '#61707C',
        competition: '#6F67D8',
        enrollment: '#2EA79B',
        art: '#D85B8A',
        sport: '#E09B35',
        overseas: '#2F9FB7',
        vocational: '#5D76C8',
      },
      borderRadius: {
        card: '0px',
        chip: '0px',
      },
      fontFamily: {
        display: ['"Noto Sans SC"', 'sans-serif'],
        body: ['"Noto Sans SC"', '"PingFang SC"', 'Microsoft YaHei', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 8px rgba(0,0,0,0.06)',
        'card-hover': '0 16px 32px rgba(23,32,42,0.11), 0 0 0 1px rgba(242,184,75,0.16)',
      },
    },
  },
  plugins: [],
};

export default config;
