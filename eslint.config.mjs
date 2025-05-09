import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        // Add any global variables if needed, e.g., for browser environments
        // ...require('globals').browser,
      },
    },
    plugins: {
      // Example: import reactPlugin from 'eslint-plugin-react';
      // 'react': reactPlugin,
    },
    rules: {
      // Add or override rules here
      // 'react/jsx-uses-react': 'off', // Not needed with new JSX transform
      // 'react/react-in-jsx-scope': 'off', // Not needed with new JSX transform
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect the React version
      },
    },
  },
];

export default eslintConfig;
