const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: './src/main.ts',
  target: 'node',
  externals: [],
  output: {
    filename: 'main.js',
    libraryTarget: 'commonjs2',
    library: {
      type: 'commonjs2',
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: 'tsconfig.prod.json',
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.IgnorePlugin({
      checkResource: (resource, context) => {
        const skip = [
          '@nestjs/websockets/socket-module',
          '@nestjs/microservices/microservices-module',
          '@nestjs/microservices',
          'class-validator',
          'class-transformer',
        ];
        if (!skip.includes(resource)) {
          return false;
        }
        try {
          require.resolve(resource);
        } catch (err) {
          return true;
        }
        return false;
      },
    }),
  ],
  optimization: {
    minimize: true,
  },
};
