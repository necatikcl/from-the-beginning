module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
    'vue/setup-compiler-macros': true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    '@vue/typescript/recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb-base',
    './.eslintrc-auto-import.json',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaVersion: 2021,
  },
  plugins: ['@typescript-eslint', 'unused-imports'],
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
    'unused-imports/no-unused-vars': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    '@typescript-eslint/no-unused-vars': ['off'],
    'vue/no-v-html': 'off',
    'vue/multi-word-component-names': 'off',
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
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        'max-len': 'off',
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
