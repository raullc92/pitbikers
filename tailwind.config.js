module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#3ABFF8",
          secondary: "#6419E6",
          accent: "#D926A9",
          neutral: "#1D283A",
          "base-100": "#191D24",
          info: "#0CA6E9",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#FB6F84",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}
