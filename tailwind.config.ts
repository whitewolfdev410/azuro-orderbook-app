import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
    extend: {
      colors: {
        button: {
          green: 'rgba(29, 129, 93, 1)', // #1D815D
          red: 'rgba(255, 101, 130, 1)', // #A34325
          LightGreen: {
            DEFAULT: 'rgba(84, 208, 158, 1)', // #54D09E
            50: 'rgba(84, 208, 158, 0.05)',
          },
          gradientBet:
            'background: linear-gradient(253.66deg, #54D09E 11.33%, #945DCB 88.76%)',
        },
        appGray: {
          50: 'rgba(255, 255, 255, 0.05)',
          100: 'rgba(255, 255, 255, 0.1)',
          500: 'rgba(255, 255, 255, 0.5)',
          600: 'rgba(255, 255, 255, 0.6)',
          800: 'rgba(255, 255, 255, 0.8)',
          1100: 'rgba(230, 230, 230, 1.0)',
        },
        appBlack: {
          50: 'rgba(0, 0, 0, 0.05)',
        },
        pink: {
          DEFAULT: 'rgba(255, 101, 166, 1)',
        },
        tag: {
          active: 'rgba(203, 245, 229, 1)',
          activeText: 'rgba(23, 100, 72, 1)',
          unredeemed: 'rgba(23, 100, 72, 1)',
          settled: 'rgba(144, 94, 234, 1)',
          redeemedBg: 'rgba(32, 146, 104, 0.1)',
          redeemed: 'rgba(94, 255, 190, 1)',
        },
        yellowDanger: {
          DEFAULT: 'rgba(194, 170, 134, 1)',
          bg: 'rgba(248, 201, 210, 0.05)',
          noti: 'rgba(255, 185, 103, 1)',
        },
        primary: {
          DEFAULT: 'rgba(61, 103, 255, 1)',
        },
      },
    },
  },
  plugins: [],
};
export default config;
