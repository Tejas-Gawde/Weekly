module.exports = function (api) {
  api.cache(true);
  const plugins = [];

  plugins.push(["@babel/plugin-proposal-decorators", { legacy: true }]);

  return {
    presets: ["babel-preset-expo"],

    plugins,
  };
};
