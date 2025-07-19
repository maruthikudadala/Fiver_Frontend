// /** @type {import('tailwindcss').Config} */
// module.exports = {
//     content: [
//       "./index.html",
//       "./src/**/*.{js,ts,jsx,tsx}",
//     ],
//     theme: {
//       extend: {},
//     },
//     plugins: [],
//   }
  
module.exports = {
  theme: {
    extend: {},
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
    },
  },
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  plugins: [],
};
