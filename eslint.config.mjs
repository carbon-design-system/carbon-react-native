import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ['**/*.{ts,jsx,tsx}']},
  {ignores: ['lib', 'node_modules', '**/*.{js,mjs}']},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {rules: {
    '@typescript-eslint/no-require-imports': 'off',
    'semi': 'error',
    "quotes": ["error", "single", {"avoidEscape": true}],
    "quote-props": ["error", "as-needed"],
    "object-curly-spacing": ["error", "always"],
    "array-bracket-spacing": ["error", "never"],
    "computed-property-spacing": ["error", "never"],
    "no-console": ["error", {"allow": ["warn", "error"]}],
    "comma-dangle": ["error", "always-multiline"],
  }},
];
