/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "loading-image": "url('./asset/images/loading.gif')",
        "loading-image-s": "url('./asset/images/loading.gif')",
        "logo-image": "url('./asset/images/logo.png')",
        "profile-image": "url('./asset/icon/Cabbi.jpg')",
        "filter-image": "url('./asset/images/filter.png')",
        "about-image": "url('./asset/backgrounds/background.jpg')",
        "capture-image": "url('./asset/images/capture.png')",
        "howto1-image": "url('./asset/images/howto1.png')",
        "howto2-image": "url('./asset/images/howto2.png')",
        "introduce1-image": "url('./asset/images/introduce1.png')",
        "introduce2-image": "url('./asset/images/introduce2.png')",
        "introduce3-image": "url('./asset/images/introduce3.png')",
      },
    },
  },
  plugins: [],
};