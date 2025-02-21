/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.php", // Escanea todos los archivos PHP
    "./js/**/*.js", // Escanea todos los archivos JS en la carpeta js
    "./assets/js/**/*.js", // Escanea todos los archivos JS en la carpeta assets/js
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
