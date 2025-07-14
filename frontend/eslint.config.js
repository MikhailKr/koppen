import js from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import prettier from "eslint-plugin-prettier";
import globals from "globals";
import { defineConfig } from "eslint-define-config";

export default defineConfig([
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'build/**',
      '*.config.js',
      '**/*.min.js',
    ],
  },
  {
    files: ["**/*.{js,ts,jsx,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      react,
      prettier,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      // JS базовые
      ...js.configs.recommended.rules,

      // TS рекомендуемые
      ...tseslint.configs.recommended[0].rules,

      // React рекомендуемые
      ...react.configs.recommended.rules,

      // ❌ Отключаем лишнее
      "react/react-in-jsx-scope": "off",

      // ✅ Prettier как ESLint-правило
      "prettier/prettier": "error",
    },
  },
]);
