module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      'babel-preset-expo',
      'module:metro-react-native-babel-preset',
      'module:react-native-dotenv',
    ],
    plugins: [
      [
        require.resolve('babel-plugin-module-resolver'),
        {
          root: [ './src' ],
          alias: {
            '@core': './src/core',
            '@assets': './assets',
          },
        },
      ],
    ],
  };
};
