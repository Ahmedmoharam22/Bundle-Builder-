/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#4E2FD2", // Primary Brand Color (Checkout, Total, Badges)
          "primary-hover": "#3D24A8", // Primary Hover
          success: "#0AA288", // Savings Banner & Success Messages ("Congrats! You're saving...")
          link: "#0000EE", // Learn More & External Links
          "link-hover": "#0000B3", // Link Hover
          bg: "#EDF4FF", // Panels & Cards Background
          heading: "#1F1F1F", // Main Headings & Primary Text
          body: "#1F1F1FBF", // Body & Paragraphs (75% Opacity)
          price: "#575757", // Base Price & Subdued Text
          strike: "#D8392B", // Card Discount Red Strikethrough
          "muted-strike": "#6F7882", // Review Panel Strikethrough Price
        },
      },
        fontFamily: {
    sans: ["Inter", "sans-serif"],
  },
    },
  },
  plugins: [],
};
