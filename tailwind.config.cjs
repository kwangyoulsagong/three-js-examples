/** @type {import('tailwindcss').Config} */
import { semanticFontSize } from "./src/assets/styles/theme/font-size";
import defaultTheme from "tailwindcss/defaultTheme";

module.exports = {
  // corePlugins: {
  //   preflight: false,
  // },
  mode: "jit",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    screens: {
      ...defaultTheme.screens,
      tablet: { max: "1440px" },
      smallTablet: { max: "768px" },
      mobile: { max: "544px" },
    },
    extend: {
      width: {
        "7/10": "70%",
        "3/10": "30%",
      },
      fontFamily: {
        Manrope: ["Manrope", "sans-serif"],
        Urbanist: ["Urbanist", "Urbanist"],
      },
      fontWeight: {
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
      fontSize: {
        32: ["32px", "40px"],
        26: ["26px", "34px"],
        24: ["24px", "32px"],
        20: ["20px", "28px"],
        18: ["18px", "26px"],
        16: ["16px", "24px"],
        14: ["14px", "20px"],
        12: ["12px", "16px"],
        "top-headline-b": semanticFontSize["top-headline-b"],
        "top-headline-sb": semanticFontSize["top-headline-sb"],
        "headline-b": semanticFontSize["headline-b"],
        "headline-sb": semanticFontSize["headline-sb"],
        "sub-headline-b": semanticFontSize["sub-headline-b"],
        "sub-headline-sb": semanticFontSize["sub-headline-sb"],
        "title-b": semanticFontSize["title-b"],
        "title-sb": semanticFontSize["title-sb"],
        "semi-title-b": semanticFontSize["semi-title-b"],
        "semi-title-sb": semanticFontSize["semi-title-sb"],
        "body-b": semanticFontSize["body-b"],
        "body-sb": semanticFontSize["body-sb"],
        "body-m": semanticFontSize["body-m"],
        "body-r": semanticFontSize["body-r"],
        "caption-b": semanticFontSize["caption-b"],
        "caption-sb": semanticFontSize["caption-sb"],
        "caption-m": semanticFontSize["caption-m"],
        "caption-r": semanticFontSize["caption-r"],
        "sub-caption": semanticFontSize["sub-caption"],
        "korean-body-m": semanticFontSize["korean-body-m"],
        "korean-caption-m": semanticFontSize["korean-caption-m"],
      },
      colors: {
        basic: {
          black: "#000000",
          white: "#FFFFFF",
        },
        primary: {
          "000": "#292929",
          100: "#227BFF",
        },
        secondary: {
          50: "#1A56DB",
          100: "#4D91FF",
          200: "#76A9FA",
          300: "#AAD1FF",
          400: "#D4E7FF",
          500: "#DFF3FE",
        },
        neutral: {
          "000": "#292929",
          50: "#63666C",
          100: "#8E8E93",
          200: "#AEAEB2",
          300: "#C7C7CC",
        },
        light: {
          100: "#D1D1D6",
          200: "#E5E5EA",
          300: "#F2F2F7",
          400: "#F9F9FB",
        },
        red: {
          50: "#CC0200",
          100: "#EB0000",
          200: "#FF2600",
          300: "#F05252",
          400: "#F98080",
          500: "#FFD2D2",
        },
        yellow: {
          50: "#8E4B10",
          100: "#C27803",
          200: "#E3A008",
          300: "#FACA15",
          400: "#FCE96A",
          500: "#FFF5BE",
        },
        green: {
          50: "#035624",
          100: "#057A55",
          200: "#0E9F6E",
          300: "#31C48D",
          400: "#84E1BC",
          500: "#D4F5E1",
        },
        purple: {
          50: "#451FB0",
          100: "#6C2BD9",
          200: "#7E3AF2",
          300: "#9061F9",
          400: "#CABFFD",
          500: "#E8E2F9",
        },
        blue: {
          "000": "#227BFF",
          50: "#1A56DB",
          100: "#4D91FF",
          200: "#76A9FA",
          300: "#AAD1FF",
          400: "#D4E7FF",
          500: "#DFF3FE",
        },
        psOpacity: {
          7: "rgba(0, 0, 0, 0.07)",
          10: "rgba(0, 0, 0, 0.1)",
          15: "rgba(0, 0, 0, 0.15)",
          20: "rgba(0, 0, 0, 0.2)",
          40: "rgba(0, 0, 0, 0.4)",
          60: "rgba(0, 0, 0, 0.6)",
        },
        transitionProperty: {
          spacing: "margin, padding",
        },
      },
      spacing: {
        narrowSidebar: "60px",
        wideSidebar: "232px",
      },
      left: {
        narrowSidebar: "60px",
        wideSidebar: "232px",
      },
      gridTemplateColumns: {
        labeledToolButton: "20px 1fr",
      },
      screens: {
        hp: "0px",
      },
      boxShadow: {
        google: "rgba(0, 0, 0, 0.3) 0px 1px 4px -1px",
      },
      fill: {
        google: "rgb(86 86 89 / var(--tw-text-opacity))",
      },
      keyframes: {
        shake: {
          "0%, 100%": { transform: "translateX(0) translateY(0) rotate(0deg)" },
          "10%, 30%, 50%, 70%, 90%": {
            transform: "translateX(-0.5px) translateY(-0.5px) rotate(-1deg)",
          },
          "20%, 40%, 60%, 80%": {
            transform: "translateX(0.5px) translateY(0.5px) rotate(1deg)",
          },
        },
      },
      animation: {
        shake: "shake 0.35s ease-in-out infinite",
      },
      scale: {
        102: "1.02",
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("child", "& > *");
      addVariant("child-hover", "& > *:hover");
      addVariant("grand-child-path", "& > * > svg > path");
    },
    require("@tailwindcss/container-queries"),
  ],
};
