module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  'eslint.workingDirectories': [],
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  parser: '@babel/eslint-parser',
  plugins: ['react'],
  rules: {},
};
