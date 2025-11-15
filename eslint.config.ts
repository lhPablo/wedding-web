import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import pluginAstro from "eslint-plugin-astro";
import parserAstro from "astro-eslint-parser";

export default defineConfig([
  // JS/TS
  {
    files: ["**/*.{js,ts,jsx,tsx}"],
    languageOptions: {
      parser: tsParser,
      globals: globals.browser,
    },
    plugins: {
      js: js,
    },
    extends: ["js/recommended"],
    rules: {
      "@typescript-eslint/no-unused-vars": ["warn"],
      "@typescript-eslint/no-explicit-any": "off",
    },
  },

  // Astro
  {
    files: ["**/*.astro"],
    plugins: { astro: pluginAstro },
    languageOptions: {
      parser: parserAstro,
      parserOptions: {
        parser: tsParser,
      },
    },
    extends: ["plugin:astro/recommended"],
    rules: {},
  },
]);
