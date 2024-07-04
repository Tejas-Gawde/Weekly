module.exports = function (api) {
  api.cache(true);
  const plugins = [];

  plugins.push([
    "@tamagui/babel-plugin",
    {
      components: ["tamagui"],
      config: "./tamagui.config.ts",
    },
  ]);

  plugins.push(["@babel/plugin-proposal-decorators", { legacy: true }]);

  return {
    presets: ["babel-preset-expo"],

    plugins,
  };
};
