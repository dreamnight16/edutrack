import type { Config } from 'tailwindcss';

/**
 * Colours, radii, fonts and easings are NOT defined here.
 * They live in public/vendor/dndl/tokens.css (DNDL v1.0, implementation 1.1.0)
 * and are referenced through var(--dn-*). See public/vendor/dndl/VERSION.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: 'var(--dn-canvas)',
        surface: 'var(--dn-surface)',
        divider: 'var(--dn-divider)',
        ink: 'var(--dn-text-primary)',
        'ink-secondary': 'var(--dn-text-secondary)',
      },
      borderRadius: {
        DEFAULT: 'var(--dn-radius)',
        none: 'var(--dn-radius)',
      },
      fontFamily: {
        display: 'var(--dn-font-display)',
        body: 'var(--dn-font)',
      },
      maxWidth: {
        shell: 'var(--wl-shell)',
      },
    },
  },
  /**
   * The track grid picks a modifier from the result count at runtime, so the
   * scanner cannot see it in the markup. The eight colour-field classes are
   * listed literally in src/lib/theme.ts instead.
   */
  safelist: ['wl-trackfield--half', 'wl-trackfield--featured'],
  plugins: [],
};

export default config;
