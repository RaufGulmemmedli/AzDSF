import type { Config } from 'tailwindcss';

/**
 * Brand values precisely calibrated from the official AzDSF logo:
 * - Primary Royal Navy: #1B467A (rich, prestigious federation navy)
 * - Accent Magenta: #ED018A (spirited DanceSport passion, used with premium discipline)
 * Neutral surfaces are delicately tuned to complement the logo tones.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1B467A',
          50: '#F0F5FA',
          100: '#E1ECF7',
          200: '#C2D9EE',
          300: '#94BEE2',
          400: '#5F9DD2',
          500: '#357EC0',
          600: '#225E9E',
          700: '#1B467A', // Official logo blue
          800: '#15365E',
          900: '#0E2442',
          950: '#09172B'
        },
        mag: {
          DEFAULT: '#ED018A', // Official logo magenta
          50: '#FDF2F8',
          100: '#FCE7F3',
          200: '#FBCFE8',
          300: '#F472B6',
          400: '#E11D85',
          500: '#ED018A',
          600: '#D00179',
          700: '#AC0164',
          800: '#8A0150',
          900: '#700142'
        },
        surface: {
          DEFAULT: '#F7F9FC',
          2: '#EEF3F8',
          3: '#E2EAF3',
          card: '#FFFFFF'
        },
        line: {
          DEFAULT: '#DFE7F1',
          2: '#C9D6E5',
          dark: 'rgba(255, 255, 255, 0.12)'
        },
        ink: {
          DEFAULT: '#0F2137',
          2: '#4B5E76',
          3: '#788DA6'
        },
        'on-dark': '#FFFFFF',
        'on-dark-2': '#A2B7D4',
        ok: '#0D8A5B',
        warn: '#B9770E'
      },
      fontFamily: {
        display: ['var(--font-archivo)', 'Arial Narrow', 'Arial', 'sans-serif'],
        sans: ['var(--font-plex-sans)', 'Segoe UI', 'system-ui', 'sans-serif'],
        mono: ['var(--font-plex-mono)', 'Consolas', 'monospace']
      },
      maxWidth: {
        measure: '1800px'
      },
      transitionTimingFunction: {
        swift: 'cubic-bezier(0.22, 1, 0.36, 1)'
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        'fade-up': 'fade-up .6s cubic-bezier(0.22, 1, 0.36, 1) both'
      }
    }
  },
  plugins: []
};

export default config;
