module.exports = function babel(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'inline-dotenv',
        {
          path: '.env',
        },
      ],
      'date-fns',
      'ramda',
    ],
  };
};
