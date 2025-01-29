import { FlatCompat } from '@eslint/eslintrc'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

export const __filename = fileURLToPath(import.meta.url) // file:///Users/wa-pc261/Develop/travel-like-a-local/eslint.config.mjs
const __dirname = dirname(__filename) // /Users/wa-pc261/Develop/travel-like-a-local

// This is for next/core-web-vitals
const compat = new FlatCompat({
  baseDirectory: __dirname
})

const eslintConfig = [
  ...compat.config(
    {
      extends: ['next/core-web-vitals', 'next/typescript', 'next', 'prettier']
    },
    {
      languageOptions: {
        parser: '@typescript-eslint/parser',
        parserOptions: {
          project: './tsconfig.json'
        }
      }
    },
    {
      rules: {
        eqeqeq: 'error',
        'no-console': 'warn',
        'no-unused-vars': 'warn',
        'no-implicit-globals': 'error',
        'no-var': 'error',
        'prefer-const': 'error',
        'no-multi-spaces': 'error',
        'consistent-return': 'error',
        'no-duplicate-imports': 'error',
        'no-useless-catch': 'warn',
        'dot-notation': 'error',
        'no-lonely-if': 'error',
        'no-const-assign': 'error',
        'no-new-object': 'error',
        'no-array-constructor': 'error',
        'no-implicit-coercion': 'error'
      }
    }
  )
]

export default eslintConfig

