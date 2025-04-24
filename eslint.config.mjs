import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import tsParser from "@typescript-eslint/parser";

export default tseslint.config(
    {
      ignores: [
        "**/dist/**",
        "**/coverage/**",
        "**/.github/**",
        "**/*.test.ts",
        "**/*.spec.ts",
        "**/*.mock.ts",
        "**/__mocks__/**",
        "eslint.config.mjs",
        "jest.config.ts",
        "openapi.json",
      ],
    },

  // Base recommended ESLint rules
  eslint.configs.recommended,

  // TypeScript-specific recommended rules
  ...tseslint.configs.recommended,

  {
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
        sourceType: "module",
      },
    },
  },

  {
    files: ["./**/*.ts", "./**/*.tsx"],
  },

  {
    rules: {
      // Strong typing everywhere
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/typedef": [
        "error",
        {
          parameter: true,
          propertyDeclaration: true,
          variableDeclaration: true,
          memberVariableDeclaration: true,
          variableDeclarationIgnoreFunction: true,
        },
      ],

      // Handle unused variables safely
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],

      // Allow compatibility with Firebase/CommonJS-style code
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-var-requires": "off",

      // Optional polish (can comment out if too strict)
      "no-console": "warn",
      "prefer-const": "error",
    },
  }
);
