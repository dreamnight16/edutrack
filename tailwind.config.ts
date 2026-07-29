import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB',
          light: '#3B82F6',
          dark: '#1D4ED8',
        },
        accent: '#F59E0B',
        background: '#F0F4FF',
        surface: '#FFFFFF',
        foreground: '#1E293B',
        muted: '#64748B',
        competition: '#7C3AED',
        enrollment: '#059669',
        art: '#DB2777',
        sport: '#EA580C',
        overseas: '#0891B2',
        vocational: '#4F46E5',
      },
      borderRadius: {
        card: '12px',
        chip: '999px',
      },
      fontFamily: {
        display: ['"Noto Sans SC"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 8px rgba(0,0,0,0.06)',
        'card-hover': '0 4px 16px rgba(37,99,235,0.12)',
      },
    },
  },
  plugins: [],
};

export default config;
