import js from '@eslint/js';
import nextConfig from 'eslint-config-next/core-web-vitals';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import react from 'eslint-plugin-react';
import storybook from 'eslint-plugin-storybook';
import testingLibrary from 'eslint-plugin-testing-library';
import importHelpers from 'eslint-plugin-import-helpers';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import globals from 'globals';

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
  js.configs.recommended,
  ...nextConfig,
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],
  ...storybook.configs['flat/recommended'],
  prettierRecommended,
  {
    plugins: {
      '@typescript-eslint': typescriptEslint,
      'import-helpers': importHelpers
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
  {
    ...testingLibrary.configs['flat/react'],
    files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)']
  }
];
