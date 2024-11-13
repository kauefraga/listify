import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {},
  plugins: [],
};

// biome-ignore lint/style/noDefaultExport: tailwindcss require default export
export default config;
