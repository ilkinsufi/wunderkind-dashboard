/**
 *  @type {import('eslint').ESLint.ConfigData}
 */
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  plugins: ['perfectionist', 'unused-imports', '@typescript-eslint', 'prettier'],
  extends: ['airbnb', 'airbnb-typescript', 'airbnb/hooks', 'prettier'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest',
    ecmaFeatures: { jsx: true },
    project: './tsconfig.json',
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: './tsconfig.json',
      },
    },
  },
  /**
   * 0 ~ 'off'
   * 1 ~ 'warn'
   * 2 ~ 'error'
   */
  rules: {
    // general
    'no-alert': 0,
    camelcase: 0,
    'no-console': 0,
    'no-unused-vars': 0,
    'no-nested-ternary': 0,
    'no-param-reassign': 0,
    'no-underscore-dangle': 0,
    'no-restricted-exports': 0,
    'no-promise-executor-return': 0,
    'import/prefer-default-export': 0,
    'prefer-destructuring': [1, { object: true, array: false }],
    // typescript
    '@typescript-eslint/naming-convention': 0,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/consistent-type-exports': 0,
    '@typescript-eslint/consistent-type-imports': 0,
    '@typescript-eslint/no-unused-vars': [0, { args: 'none' }],
    // react
    'react/no-children-prop': 0,
    'react/react-in-jsx-scope': 0,
    'react/no-array-index-key': 0,
    'react/require-default-props': 0,
    'react/jsx-props-no-spreading': 0,
    'react/function-component-definition': 0,
    'react/jsx-no-duplicate-props': [0, { ignoreCase: false }],
    'react/jsx-no-useless-fragment': [0, { allowExpressions: false }],
    'react/no-unstable-nested-components': [0, { allowAsProps: true }],
    // jsx-a11y
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/control-has-associated-label': 0,
    // unused imports
    'unused-imports/no-unused-imports': 0,
    'unused-imports/no-unused-vars': [
      0,
      { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
    ],
    // perfectionist
    'perfectionist/sort-exports': [0, { order: 'asc', type: 'line-length' }],
    'perfectionist/sort-named-imports': [0, { order: 'asc', type: 'line-length' }],
    'perfectionist/sort-named-exports': [0, { order: 'asc', type: 'line-length' }],
    'perfectionist/sort-imports': [
      0,
      {
        order: 'asc',
        type: 'line-length',
        'newlines-between': 'always',
        groups: [
          'style',
          'type',
          ['builtin', 'external'],
          'custom-mui',
          'custom-routes',
          'custom-hooks',
          'custom-utils',
          'internal',
          'custom-components',
          'custom-sections',
          'custom-auth',
          'custom-types',
          ['parent', 'sibling', 'index'],
          ['parent-type', 'sibling-type', 'index-type'],
          'object',
          'unknown',
        ],
        'custom-groups': {
          value: {
            ['custom-mui']: '@mui/**',
            ['custom-auth']: 'src/auth/**',
            ['custom-hooks']: 'src/hooks/**',
            ['custom-utils']: 'src/utils/**',
            ['custom-types']: 'src/types/**',
            ['custom-routes']: 'src/routes/**',
            ['custom-sections']: 'src/sections/**',
            ['custom-components']: 'src/components/**',
          },
        },
        'internal-pattern': ['src/**'],
      },
    ],
  },
};
