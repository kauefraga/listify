import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'listify-pink': '#F953C6',
        'listify-dark-pink': '#B91D73',
      },
    },
  },
  plugins: [],
};

// biome-ignore lint/style/noDefaultExport: tailwindcss require default export
export default config;
