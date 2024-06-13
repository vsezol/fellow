const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

module.exports = {
  content: [
    join(__dirname, 'src/**/*!(*.stories|*.spec).{ts,tsx,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      backgroundImage: {
        'anime-dark':
          "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/src/assets/wallpaper.png')",
        'anime-light':
          "linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3)), url('/src/assets/wallpaper.png')",
      },
    },
    fontFamily: {
      logo: ['Logo', 'sans-serif'],
    },
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    themes: ['light', 'dark'],
  },
};
