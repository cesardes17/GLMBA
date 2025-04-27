// .eslintrc.js
module.exports = {
  extends: ['expo', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'es5',
        endOfLine: 'auto',
      },
    ],
    quotes: ['error', 'single', { avoidEscape: true }],
  },
  settings: {
    'import/resolver': {
      'babel-module': {
        alias: {
          '@components': './components',
          '@screens': './app',
          '@assets': './assets',
          '@utils': './utils',
          '@': '.',
          '@src': './src',
        },
      },
    },
  },
};
