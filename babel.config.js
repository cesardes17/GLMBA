module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          root: ['.'],
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
          alias: {
            '@components': './components',
            '@screens': './app',
            '@assets': './assets',
            '@utils': './utils',
            '@': '.', // Supports @/src imports
            '@src': './src', // Supports @src imports
          },
        },
      ],
    ],
  };
};
