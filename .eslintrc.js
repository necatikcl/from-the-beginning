module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:storybook/recommended',
    '@vue/typescript/recommended',
    'eslint:recommended',
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 2021,
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-this-alias': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'prefer-spread': 'off',
    'no-case-declarations': 'off',
    'no-console': 'off',
    'no-unused-vars': 'off',
    'no-param-reassign': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    'import/order': ['error', {
      'newlines-between': 'always',
      alphabetize: { order: 'asc', caseInsensitive: true },
      pathGroups: [
        {
          pattern: '@/**',
          group: 'external',
          position: 'after',
        },
      ],
      pathGroupsExcludedImportTypes: ['builtin'],
    },
    ],
    'arrow-body-style': 'off',
    'newline-before-return': 'error',
    'qwik/use-method-usage': 'off',
    'qwik/jsx-img': 'off',
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        'max-len': ['error', {
          code: 120,
        }],
      },
    },
    {
      files: ['*.tsx'],
      rules: {
        'import/prefer-default-export': 'off',
      },
    },
  ],
};
