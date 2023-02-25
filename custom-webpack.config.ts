import type { Configuration } from 'webpack';

module.exports = {
  entry: { background: { import: 'src/background.ts', runtime: false } },
  resolve: {
    fallback: {
      "path": require.resolve("path-browserify"),
      "crypto": false,
      "fs": false
    }
  }
} as Configuration;
