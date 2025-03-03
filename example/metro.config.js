const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");
const path = require("path");

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const extraNodeModules = {
  shared: path.resolve(__dirname + "/../src"),
};

const watchFolders = [path.resolve(__dirname + "/../src")];

const nodeModulesPaths = [path.resolve(path.join(__dirname, "./node_modules"))];

const config = {
  resolver: {
    extraNodeModules,
    nodeModulesPaths,
  },
  watchFolders,
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
