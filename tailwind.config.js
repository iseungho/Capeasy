/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "main-background": "url('./asset/backgrounds/pano.mp4')",
        "loading-image": "url('./asset/images/loading.gif')",
        "loading-image-s": "url('./asset/images/loading.gif')",
        "logo-image": "url('./asset/images/logo.png')",
        "main-slogan-1":
          "url('https://ak.picdn.net/shutterstock/videos/1072316771/thumb/1.jpg')",
        "main-slogan-2":
          "url('https://cdn.naturettl.com/wp-content/uploads/2021/06/04110437/how-to-take-panoramas-of-the-night-sky-18-900x506.jpg')",
        "kakao-sns": "url('./asset/icon/kakao.png')",
        "naver-sns": "url('./asset/icon/naver.png')",

      },
    },
  },
  plugins: [],
};
