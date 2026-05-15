import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import colors from "tailwindcss/colors";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // Added src directory
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "425px",
      sm: "525px",
      md: "768px",
      midMd: "900px", //blog card
      lg: "1024px",
      midXl: "1220px",
      xl: "1440px",
      xxl: "1920px",
    },
    fontFamily: {
      sans: ["Arial", "sans-serif"],
      // urbanist: ["Urbanist", "sans-serif"],
      // heading: ["Gilroy", "sans-serif"],
      // body: ["Gilroy", "sans-serif"],
      // accent: ["Gilroy", "sans-serif"],
    },
    colors: {
      primary: "var(--color-primary)",
      error: "var(--color-error)",
      success: "var(--color-success)",
      info: "var(--color-info)",
      warning: "var(--color-warning)",

      headingfront: "var(--color-headingfront)",
      parafront: "var(--color-parafront)",
      btnpri: "var(--color-buttonpri)",
      btnsec: "var(--color-buttonsec)",

      ...colors,
    },
    extend: {
      keyframes: {
        l14: {
          "100%": { transform: "rotate(1turn)" },
        },
      },
      clipPath: {
        custom:
          'path("M40,20 C60,-10,180,-10,200,20 C220,50,220,150,200,180 C180,210,60,210,40,180 C20,150,20,50,40,20 Z")',
      },
      animation: {
        l14: "l14 4s infinite",
        "l14-reverse": "l14 1s infinite linear reverse",
        "l14-normal": "l14 1s infinite linear",
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities, theme, addComponents }) {
      addComponents({
        ".container": {
          margin: theme("margin.auto"),
          maxWidth: theme("screens.midXl"),
          paddingLeft: theme("spacing.4"),
          paddingRight: theme("spacing.4"),
          "@media (min-width: 425px)": {
            paddingLeft: theme("spacing.8"),
            paddingRight: theme("spacing.8"),
          },
          "@media (min-width: 768px)": {
            paddingLeft: theme("spacing.24"),
            paddingRight: theme("spacing.24"),
          },
          "@media (min-width: 1024px)": {
            paddingLeft: theme("spacing.8"),
            paddingRight: theme("spacing.8"),
          },
        },
        ".container-fluid": {
          margin: theme("margin.auto"),
          maxWidth: theme("screens.xl"),
          paddingLeft: theme("spacing.5"),
          paddingRight: theme("spacing.5"),
          "@media (min-width: 425px)": {
            paddingLeft: theme("spacing.8"),
            paddingRight: theme("spacing.8"),
          },
          "@media (min-width: 768px)": {
            paddingLeft: theme("spacing.14"),
            paddingRight: theme("spacing.14"),
          },
          "@media (min-width: 1024px)": {
            paddingLeft: theme("spacing.20"),
            paddingRight: theme("spacing.20"),
          },
        },

        ".card": {
          padding: theme("spacing.4"),
          "@media (min-width: 425px)": {
            padding: theme("spacing.5"),
          },
          "@media (min-width: 768px)": {
            padding: theme("spacing.6"),
          },
          "@media (min-width: 1024px)": {
            padding: theme("spacing.7"),
          },
        },
        ".box": {
          padding: theme("spacing.3"),
          "@media (min-width: 768px)": {
            padding: theme("spacing.4"),
          },
          "@media (min-width: 1440px)": {
            padding: theme("spacing.5"),
          },
        },
        ".packet": {
          padding: theme("spacing.2"),
          "@media (min-width: 1024px)": {
            padding: theme("spacing.3"),
          },
        },

        ".btn": {
          with: "fit-content",
          height: "fit-content",
          fontFamily: theme("fontFamily.gilroy"),
          fontWeight: theme("fontWeight.semibold"),

          textAlign: "center",
          fontSize: theme("fontSize.base"),
          paddingLeft: theme("spacing.6"),
          paddingRight: theme("spacing.6"),
          paddingTop: theme("spacing.2"),
          paddingBottom: theme("spacing.2"),
          gap: theme("spacing.3"),
          display: "inline-flex",
          alignItems: "center",
          borderRadius: theme("borderRadius.md"),
          transitionProperty: "all",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
          transitionDuration: "150ms",

          "&:hover": {
            transform: "scale(1.05)",
          },
        },

        ".btn-primary": {
          backgroundColor: theme("colors.black"),

          color: theme("colors.white"),
        },
        ".btn-secondary": {
          backgroundColor: theme("colors.secondary"),
          border: "2px solid #33333333",
          color: "#333333B2",
        },
        ".btn-tertiary": {
          backgroundColor: theme("colors.transparent"),
          borderColor: theme("borderColor.transparent"),
          color: theme("colors.primary"),
          border: "2px solid #ffbb00",
        },

        ".btn.btn-lg": {
          fontSize: theme("fontSize.xl"),
          paddingLeft: theme("spacing.8"),
          paddingRight: theme("spacing.8"),
          paddingTop: theme("spacing.3"),
          paddingBottom: theme("spacing.3"),
          gap: theme("spacing.4"),
        },
        ".btn.btn-md": {
          fontSize: theme("fontSize.base"),
          paddingLeft: theme("spacing.6"),
          paddingRight: theme("spacing.6"),
          paddingTop: theme("spacing.2"),
          paddingBottom: theme("spacing.2"),
          gap: theme("spacing.4"),
        },
        ".btn.btn-sm": {
          fontSize: theme("fontSize.sm"),
          paddingLeft: theme("spacing.4"),
          paddingRight: theme("spacing.4"),
          paddingTop: theme("spacing.2"),
          paddingBottom: theme("spacing.2"),
          gap: theme("spacing.2"),
          fontWeight: theme("fontWeight.medium"),
        },
        ".btn.btn-xs": {
          fontSize: theme("fontSize.sm"),
          paddingLeft: theme("spacing.3"),
          paddingRight: theme("spacing.3"),
          paddingTop: theme("spacing.1"),
          paddingBottom: theme("spacing.1"),
          gap: theme("spacing.2"),
          fontWeight: theme("fontWeight.medium"),
        },

        ".chip": {
          // padding: ".25rem .5rem",
          width: "fit-content",
          height: "fit-content",
          fontFamily: theme("fontFamily.gilroy"),
          fontWeight: theme("fontWeight.semibold"),
          textAlign: "center",
          borderRadius: "9999px",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: theme("fontSize.base"),
          textTransform: "uppercase",
          color: "#fff",
          borderWidth: "1px",
          borderStyle: "solid",
        },

        ".chip.chip-lg": {
          fontSize: theme("fontSize.xl"),
          paddingLeft: theme("spacing.8"),
          paddingRight: theme("spacing.8"),
          paddingTop: theme("spacing.3"),
          paddingBottom: theme("spacing.3"),
          gap: theme("spacing.4"),
        },

        ".chip.chip-md": {
          fontSize: theme("fontSize.sm"),
          paddingLeft: theme("spacing.4"),
          paddingRight: theme("spacing.4"),
          paddingTop: theme("spacing.2"),
          paddingBottom: theme("spacing.2"),
          gap: theme("spacing.2"),
          fontWeight: theme("fontWeight.medium"),
        },

        ".chip.chip-sm": {
          fontSize: theme("fontSize.xs"),
          paddingLeft: theme("spacing.2"),
          paddingRight: theme("spacing.2"),
          paddingTop: theme("spacing.1"),
          paddingBottom: theme("spacing.1"),
          marginTop: theme("spacing.0"),
          marginBottom: theme("spacing.0"),

          gap: theme("spacing.2"),
          fontWeight: theme("fontWeight.medium"),
        },
      });

      addUtilities({
        // ! ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Container (Margins, Paddings & Gaps)
        ".mt-container": {
          marginTop: theme("spacing.10"),
          "@media (min-width: 768px)": {
            marginTop: theme("spacing.12"),
          },
          "@media (min-width: 1024px)": {
            marginTop: theme("spacing.16"),
          },
          "@media (min-width: 1440px)": {
            marginTop: theme("spacing.24"),
          },
        },
        ".mb-container": {
          marginBottom: theme("spacing.10"),
          "@media (min-width: 768px)": {
            marginBottom: theme("spacing.12"),
          },
          "@media (min-width: 1024px)": {
            marginBottom: theme("spacing.16"),
          },
          "@media (min-width: 1440px)": {
            marginBottom: theme("spacing.24"),
          },
        },

        //padding
        ".pt-container": {
          paddingTop: theme("spacing.6"),
          "@media (min-width: 525px)": {
            paddingTop: theme("spacing.10"),
          },
          "@media (min-width: 768px)": {
            paddingTop: theme("spacing.12"),
          },
          "@media (min-width: 1024px)": {
            paddingTop: theme("spacing.24"),
          },
        },
        ".pb-container": {
          paddingBottom: theme("spacing.6"),
          "@media (min-width: 525px)": {
            paddingBottom: theme("spacing.10"),
          },
          "@media (min-width: 768px)": {
            paddingBottom: theme("spacing.12"),
          },
          "@media (min-width: 1024px)": {
            paddingBottom: theme("spacing.24"),
          },
        },

        // gap-theme('spacing.4') sm:gap-8 md:gap-14
        ".gap-container": {
          gap: theme("spacing.4"),
          "@media (min-width: 425px)": {
            gap: theme("spacing.8"),
          },
          "@media (min-width: 768px)": {
            gap: theme("spacing.14"),
          },
        },
        ".gap-y-container": {
          rowGap: theme("spacing.4"),
          "@media (min-width: 425px)": {
            rowGap: theme("spacing.8"),
          },
          "@media (min-width: 768px)": {
            rowGap: theme("spacing.14"),
          },
        },
        ".gap-x-container": {
          columnGap: theme("spacing.4"),
          "@media (min-width: 425px)": {
            columnGap: theme("spacing.8"),
          },
          "@media (min-width: 768px)": {
            columnGap: theme("spacing.14"),
          },
        },

        // ! ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Card (Style, Margins, Paddings & Gaps)
        ".style-card": {
          boxShadow: theme("boxShadow.lg"),
          borderRadius: theme("borderRadius.lg"),
        },
        ".mt-card": {
          marginTop: theme("spacing.4"),
          "@media (min-width: 425px)": {
            marginTop: theme("spacing.5"),
          },
          "@media (min-width: 768px)": {
            marginTop: theme("spacing.6"),
          },
          "@media (min-width: 1024px)": {
            marginTop: theme("spacing.7"),
          },
        },
        ".mb-card": {
          marginBottom: theme("spacing.4"),
          "@media (min-width: 425px)": {
            marginBottom: theme("spacing.5"),
          },
          "@media (min-width: 768px)": {
            marginBottom: theme("spacing.6"),
          },
          "@media (min-width: 1024px)": {
            marginBottom: theme("spacing.7"),
          },
        },
        ".pt-card": {
          paddingTop: theme("spacing.4"),
          "@media (min-width: 425px)": {
            paddingTop: theme("spacing.5"),
          },
          "@media (min-width: 768px)": {
            paddingTop: theme("spacing.6"),
          },
          "@media (min-width: 1024px)": {
            paddingTop: theme("spacing.7"),
          },
        },
        ".pb-card": {
          paddingBottom: theme("spacing.4"),
          "@media (min-width: 425px)": {
            paddingBottom: theme("spacing.5"),
          },
          "@media (min-width: 768px)": {
            paddingBottom: theme("spacing.6"),
          },
          "@media (min-width: 1024px)": {
            paddingBottom: theme("spacing.7"),
          },
        },
        ".gap-card": {
          gap: theme("spacing.4"),
          "@media (min-width: 425px)": {
            gap: theme("spacing.5"),
          },
          "@media (min-width: 768px)": {
            gap: theme("spacing.6"),
          },
          "@media (min-width: 1024px)": {
            gap: theme("spacing.7"),
          },
        },
        ".gap-y-card": {
          rowGap: theme("spacing.4"),
          "@media (min-width: 425px)": {
            rowGap: theme("spacing.5"),
          },
          "@media (min-width: 768px)": {
            rowGap: theme("spacing.6"),
          },
          "@media (min-width: 1024px)": {
            rowGap: theme("spacing.7"),
          },
        },
        ".gap-x-card": {
          columnGap: theme("spacing.4"),
          "@media (min-width: 425px)": {
            columnGap: theme("spacing.5"),
          },
          "@media (min-width: 768px)": {
            columnGap: theme("spacing.6"),
          },
          "@media (min-width: 1024px)": {
            columnGap: theme("spacing.7"),
          },
        },

        // ! ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Box (Style, Margins, Paddings & Gaps)
        ".style-box": {
          boxShadow: theme("boxShadow.sm"),
          borderRadius: theme("borderRadius.md"),
        },
        ".mt-box": {
          marginTop: theme("spacing.3"),
          "@media (min-width: 768px)": {
            marginTop: theme("spacing.4"),
          },
          "@media (min-width: 1440px)": {
            marginTop: theme("spacing.5"),
          },
        },
        ".mb-box": {
          marginBottom: theme("spacing.3"),
          "@media (min-width: 768px)": {
            marginBottom: theme("spacing.4"),
          },
          "@media (min-width: 1440px)": {
            marginBottom: theme("spacing.5"),
          },
        },
        ".pt-box": {
          paddingTop: theme("spacing.3"),
          "@media (min-width: 768px)": {
            paddingTop: theme("spacing.4"),
          },
          "@media (min-width: 1440px)": {
            paddingTop: theme("spacing.5"),
          },
        },
        ".pb-box": {
          paddingBottom: theme("spacing.3"),
          "@media (min-width: 768px)": {
            paddingBottom: theme("spacing.4"),
          },
          "@media (min-width: 1440px)": {
            paddingBottom: theme("spacing.5"),
          },
        },
        ".gap-box": {
          gap: theme("spacing.3"),
          "@media (min-width: 768px)": {
            gap: theme("spacing.4"),
          },
          "@media (min-width: 1440px)": {
            gap: theme("spacing.5"),
          },
        },
        ".gap-y-box": {
          rowGap: theme("spacing.3"),
          "@media (min-width: 768px)": {
            rowGap: theme("spacing.4"),
          },
          "@media (min-width: 1440px)": {
            rowGap: theme("spacing.5"),
          },
        },
        ".gap-x-box": {
          columnGap: theme("spacing.3"),
          "@media (min-width: 768px)": {
            columnGap: theme("spacing.4"),
          },
          "@media (min-width: 1440px)": {
            columnGap: theme("spacing.5"),
          },
        },
        // ! ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Packet (Style, Margins, Paddings & Gaps)
        ".style-packet": {
          boxShadow: theme("boxShadow.DEFAULT"),
          borderRadius: theme("borderRadius.DEFAULT"),
        },
        ".mt-packet": {
          marginTop: theme("spacing.2"),
          "@media (min-width: 1024px)": {
            marginTop: theme("spacing.3"),
          },
        },
        ".mb-packet": {
          marginBottom: theme("spacing.2"),
          "@media (min-width: 1024px)": {
            marginBottom: theme("spacing.3"),
          },
        },
        ".pt-packet": {
          paddingTop: theme("spacing.2"),
          "@media (min-width: 1024px)": {
            paddingTop: theme("spacing.3"),
          },
        },
        ".pb-packet": {
          paddingBottom: theme("spacing.2"),
          "@media (min-width: 1024px)": {
            paddingBottom: theme("spacing.3"),
          },
        },
        ".gap-packet": {
          gap: theme("spacing.2"),
          "@media (min-width: 1024px)": {
            gap: theme("spacing.3"),
          },
        },
        ".gap-y-packet": {
          rowGap: theme("spacing.2"),
          "@media (min-width: 1024px)": {
            rowGap: theme("spacing.3"),
          },
        },
        ".gap-x-packet": {
          columnGap: theme("spacing.2"),
          "@media (min-width: 1024px)": {
            columnGap: theme("spacing.3"),
          },
        },

        // ! ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Text Responsive Size
        // text-3xl md:text-5xl lg:text-6xl
        ".text-responsive-6xl": {
          fontSize: theme("fontSize.3xl"),
          "@media (min-width: 768px)": {
            fontSize: theme("fontSize.5xl"),
          },
          "@media (min-width: 1024px)": {
            fontSize: theme("fontSize.6xl"),
          },
        },
        // text-3xl md:text-4xl lg:text-5xl
        ".text-responsive-5xl": {
          fontSize: theme("fontSize.3xl"),
          "@media (min-width: 768px)": {
            fontSize: theme("fontSize.4xl"),
          },
          "@media (min-width: 1024px)": {
            fontSize: theme("fontSize.5xl"),
          },
        },
        // text-3xl md:text-4xl
        ".text-responsive-4xl": {
          fontSize: theme("fontSize.3xl"),
          "@media (min-width: 768px)": {
            fontSize: theme("fontSize.4xl"),
          },
        },
        // text-2xl md:text-3xl
        ".text-responsive-3xl": {
          fontSize: theme("fontSize.2xl"),
          "@media (min-width: 768px)": {
            fontSize: theme("fontSize.3xl"),
          },
        },
        // text-xl md:text-2xl
        ".text-responsive-2xl": {
          fontSize: theme("fontSize.xl"),
          "@media (min-width: 768px)": {
            fontSize: theme("fontSize.2xl"),
          },
        },
        // text-lg md:text-xl
        ".text-responsive-xl": {
          fontSize: theme("fontSize.lg"),
          "@media (min-width: 768px)": {
            fontSize: theme("fontSize.xl"),
          },
        },
        // text-base md:text-lg
        ".text-responsive-lg": {
          fontSize: theme("fontSize.base"),
          "@media (min-width: 768px)": {
            fontSize: theme("fontSize.lg"),
          },
        },
        // text-sm md:text-base
        ".text-responsive-base": {
          fontSize: theme("fontSize.sm"),
          "@media (min-width: 768px)": {
            fontSize: theme("fontSize.base"),
          },
        },
        // text-xs md:text-sm
        ".text-responsive-sm": {
          fontSize: theme("fontSize.xs"),
          "@media (min-width: 768px)": {
            fontSize: theme("fontSize.sm"),
          },
        },
      });
    }),
  ],
  layers: {
    "no-tailwindcss": {
      target: false,
    },
  },
};

export default config;
