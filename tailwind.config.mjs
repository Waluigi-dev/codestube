/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
	  extend: {
		fontFamily: {
		  'outfit': ['Outfit', 'sans-serif'],
		  'funnel': ['"Funnel Display"', 'sans-serif'],
		},
	  },
	},
	plugins: [],
}