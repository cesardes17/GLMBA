module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Soporte para transformaciones de React Native Reanimated
      'react-native-reanimated/plugin',

      // Soporte para importaciones absolutas desde la raíz del proyecto
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
            '@': '.', // Add this line to support @/src imports
            '@src': './src', // Add this line as an alternative
          },
        },
      ],
    ],
  };
};
