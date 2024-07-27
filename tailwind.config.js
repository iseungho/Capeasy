/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'main-background':"url('./asset/backgrounds/pano.mp4')",
        'loading-image':"url('./asset/images/loading.gif')",
        'loading-image-s':"url('./asset/images/loading.gif')",
        'logo-image':"url('./asset/images/logo.png')",
        'main-slogan-1':"url('https://i.imgur.com/DaMIdBi.gif')",
        'main-slogan-2':"url('https://t1.daumcdn.net/cafeattach/1VDSG/f123f2ee4ba997553f50b4b5a832b2653f87da59_re_1680505858751')"
      }

    },
  },
  plugins: [],
}

