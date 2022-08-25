import { IS_BROWSER } from "$fresh/runtime.ts";
import { Configuration, setup } from "twind";
export * from "twind";
export const config: Configuration = {
  darkMode: "class",
  mode: "silent",
  theme: {
    fontFamily: {
      "sans": ["Georgia", "Georgia"],
    },
    extend: {
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      colors: {
        "light-beige": "#ede0d4",
        "medium-beige": "#e6ccb2",
        "dark-beige": "#ddb892",
        "light-brown": "#b08968",
        "medium-brown": "#9c6644",
        "dark-brown": "#7f5539",
      },
    },
  },
};

if (IS_BROWSER) setup(config);
