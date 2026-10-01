import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import tsParser from "@typescript-eslint/parser";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import sortKeysFixPlugin from "eslint-plugin-sort-keys-fix";
import unicornPlugin from "eslint-plugin-unicorn";
import unusedImportsPlugin from "eslint-plugin-unused-imports";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "public/**",
      "*.config.js",
      "*.config.mjs",
    ],
  },
  ...nextCoreWebVitals,
  unicornPlugin.configs.recommended,
  ...compat.extends(
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:prettier/recommended",
    "plugin:promise/recommended",
    "plugin:import/errors",
    "plugin:import/typescript",
    "plugin:import/warnings",
    "plugin:sonarjs/recommended-legacy",
    "plugin:i18next/recommended",
  ),
  {
    plugins: {
      "sort-keys-fix": sortKeysFixPlugin,
      "unused-imports": unusedImportsPlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: "./tsconfig.json",
        sourceType: "module",
      },
    },
    rules: {
      "arrow-parens": [2, "always"],
      semi: [2],
      quotes: ["error", "double"],
      "linebreak-style": ["error", "unix"],
      "no-empty": "warn",
      "react/react-in-jsx-scope": "off",
      curly: "error",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
      "@typescript-eslint/no-empty-function": "warn",
      "@typescript-eslint/no-empty-object-type": [
        "error",
        { allowInterfaces: "with-single-extends" },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/no-misused-promises": "warn",
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/no-unnecessary-condition": "error",
      "@typescript-eslint/no-unsafe-argument": "error",
      "@typescript-eslint/no-unsafe-assignment": "warn",
      "@typescript-eslint/no-unsafe-call": "warn",
      "@typescript-eslint/no-unsafe-member-access": "warn",
      "@typescript-eslint/no-unsafe-return": "warn",
      "@typescript-eslint/no-unused-expressions": "warn",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/prefer-regexp-exec": "warn",
      "@typescript-eslint/restrict-plus-operands": "warn",
      "@typescript-eslint/restrict-template-expressions": "warn",
      "@typescript-eslint/unbound-method": "warn",
      "import/order": "error",
      "import/default": "error",
      "import/export": "warn",
      "import/extensions": "off",
      "import/first": "error",
      "import/group-exports": "off",
      "import/namespace": "error",
      "import/no-absolute-path": "error",
      "import/no-anonymous-default-export": "error",
      "import/no-cycle": "warn",
      "import/no-deprecated": "error",
      "import/no-duplicates": "error",
      "import/no-dynamic-require": "off",
      "import/no-extraneous-dependencies": "error",
      "import/no-mutable-exports": "error",
      "import/no-namespace": "warn",
      "import/no-restricted-paths": "error",
      "import/no-self-import": "error",
      "import/no-unresolved": "off",
      "import/no-unused-modules": "error",
      "import/no-useless-path-segments": "error",
      "import/no-webpack-loader-syntax": "error",
      "max-lines": ["warn", { max: 300, skipBlankLines: true, skipComments: true }],
      "max-lines-per-function": ["warn", { max: 100, skipBlankLines: true, skipComments: true }],
      "unused-imports/no-unused-imports": "error",
      "unicorn/consistent-destructuring": "error",
      "unicorn/consistent-function-scoping": "error",
      "unicorn/error-message": "error",
      "unicorn/explicit-length-check": "error",
      "unicorn/filename-case": "off",
      "unicorn/import-style": "error",
      "unicorn/no-abusive-eslint-disable": "error",
      "unicorn/no-array-callback-reference": "error",
      "unicorn/no-array-method-this-argument": "error",
      "unicorn/no-array-reduce": "off",
      "unicorn/no-await-expression-member": "error",
      "unicorn/no-new-array": "error",
      "unicorn/no-null": "error",
      "unicorn/no-object-as-default-parameter": "error",
      "unicorn/no-useless-undefined": ["error", { checkArguments: false }],
      "unicorn/prefer-array-some": "error",
      "unicorn/prefer-at": "off",
      "unicorn/prefer-module": "off",
      "unicorn/prefer-node-protocol": "off",
      "unicorn/prefer-number-properties": "error",
      "unicorn/prefer-prototype-methods": "error",
      "unicorn/prefer-spread": "error",
      "unicorn/prefer-string-slice": "error",
      "unicorn/prefer-ternary": "off",
      "unicorn/prefer-top-level-await": "error",
      "unicorn/name-replacements": [
        "error",
        {
          ignore: ["i18n", "e2e"],
        },
      ],
      "sonarjs/cognitive-complexity": "error",
      "sonarjs/no-all-duplicated-branches": "error",
      "sonarjs/no-collapsible-if": "error",
      "sonarjs/no-identical-expressions": "error",
      "sonarjs/no-identical-functions": "error",
      "sonarjs/no-redundant-jump": "error",
      "sonarjs/no-small-switch": "error",
      "sonarjs/no-use-of-empty-return-value": "error",
      "sonarjs/no-nested-template-literals": "warn",
      "sonarjs/todo-tag": "warn",
      "sort-keys-fix/sort-keys-fix": "off",
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["../*"],
              message: "Relative imports from parent directories are not allowed.",
            },
          ],
        },
      ],
    },
  },
];

export default eslintConfig;
