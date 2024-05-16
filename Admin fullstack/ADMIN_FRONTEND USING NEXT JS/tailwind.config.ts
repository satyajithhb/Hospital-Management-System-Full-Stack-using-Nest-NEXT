import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
       
      },
      backgroundColor: {
        // Define your solid background colors here
        'solid-black': '#000', // Example of solid black background
        'solid-white': '#fff', // Example of solid white background
        // Add more colors as needed
      },
    },
  },
  plugins: [ ],
};
export default config;
