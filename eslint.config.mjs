import react from 'eslint-plugin-react';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import importHelpers from 'eslint-plugin-import-helpers';
import testingLibrary from 'eslint-plugin-testing-library';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default [
  {
    ignores: [
      '**/node_modules/*',
      '**/out/*',
      '**/.next/*',
      '**/coverage',
      'src/styles/globals.css'
    ]
  },
  ...compat.extends(
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:storybook/recommended',
    'prettier'
  ),
  {
    plugins: {
      react,
      '@typescript-eslint': typescriptEslint,
      'import-helpers': importHelpers,
      'testing-library': testingLibrary
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest,
        ...globals.node
      },

      parser: tsParser,
      ecmaVersion: 11,
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },

    settings: {
      react: {
        version: 'detect'
      }
    },

    rules: {
      'newline-before-return': 2,
      'react/prop-types': 0,
      'react/react-in-jsx-scope': 0,
      'import-helpers/order-imports': [
        2,
        {
          newlinesBetween: 'always',

          groups: [
            ['/^next/', 'module'],
            '/^@/styles/',
            '/^@/components/',
            '/^@/lib/',
            ['parent', 'sibling', 'index']
          ],

          alphabetize: {
            order: 'asc',
            ignoreCase: true
          }
        }
      ],

      '@typescript-eslint/no-unused-vars': [
        2,
        {
          argsIgnorePattern: '^_'
        }
      ],

      'no-console': [
        2,
        {
          allow: ['warn', 'error']
        }
      ]
    }
  },
  ...compat.extends('plugin:testing-library/react').map((config) => ({
    ...config,
    files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)']
  }))
];
