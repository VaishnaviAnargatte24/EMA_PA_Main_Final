const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const path = require('path');
const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');

// Required for custom module resolution (optional)
const nodeModulesPaths = [path.resolve(path.join(__dirname, './node_modules'))];

// Base config for extra folders or monorepos
const baseConfig = {
  resolver: {
    nodeModulesPaths,
  },
  
  watchFolders: [path.resolve(__dirname, '../')], // Adjust for monorepo if needed
};


const defaultConfig = getDefaultConfig(__dirname);

const customConfig = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    assetExts: defaultConfig.resolver.assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...defaultConfig.resolver.sourceExts, 'svg'],
  },
};

// Merge all together
const mergedConfig = mergeConfig(defaultConfig, baseConfig, customConfig);

// Final wrapped config (required for Reanimated to work properly)
module.exports = wrapWithReanimatedMetroConfig(mergedConfig);
