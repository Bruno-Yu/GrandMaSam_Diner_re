/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    './node_modules/tw-elements/dist/js/**/*.js',
    "./nuxt.config.{js,ts}",
  ],
  theme: {
      fontFamily: {
        'sans': [ '"Noto Sans JP"', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', "Arial", '"Noto Sans"', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"', '"Noto Color Emoji"'],
        'serif': ['Bangers', 'ui-serif', 'Georgia', 'Cambria', "Times New Roman", 'Times', 'serif'],
        'mono': ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', "Liberation Mono", "Courier New", 'monospace'],
      },
    extend: {
        animation: {
        'rotate': 'rotate 60s linear infinite',
      },
      keyframes: {
        rotate: {
          '0%': { transform: 'rotate(0deg) scale(1.25)'  },
          '100%': { transform: 'rotate(360deg)  scale(1.25)'  },
        }
      }
    },
  },
  plugins: [
    require('tw-elements/dist/plugin'),
  ],
}
