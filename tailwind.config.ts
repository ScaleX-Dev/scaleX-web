import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'theme-main': '#4ADE80', // Replace with your main color (e.g., green)
        'theme-sub': '#D1D5DB', // Replace with your sub-color (e.g., gray-300)
        'theme-text': '#FFFFFF', // Replace with your primary text color (e.g., white)
        'theme-secondary-text': '#9CA3AF', // Replace with your secondary text color (e.g., gray-400)
        'theme-background': '#FAFAFA', // Replace with your background color (e.g., light gray)
        'theme-black': '#000000', // Replace with your black color if different
        'primary-green': 'var(--color-primary-green)',
        'grey': 'var(--color-grey)',
      },
      fontFamily: {
        'theme-sans': ['Inter', 'sans-serif'], // Replace with your primary font (e.g., Inter, Roboto)
        'theme-serif': ['Georgia', 'serif'], // Optional secondary font if needed
      },
      filters: {
        'blur-xl': 'blur(50px)', // Keep for existing blur effect
        'blur-2xl': 'blur(70px)', // Increased blur as per your request
      },
      screens: {
        '900': '56.25rem', // Use string key for custom breakpoint
      },
    },
  },
  plugins: [
    function ({ addUtilities }: { addUtilities: (utilities: Record<string, Record<string, string>>) => void }) {
      const newUtilities = {
        '.blur-xl': {
          filter: 'blur(50px)',
        },
        '.blur-2xl': {
          filter: 'blur(70px)',
        },
      };
      addUtilities(newUtilities);
    },
  ],
}
export default config
