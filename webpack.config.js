const webpack = require('webpack');

module.exports = {
  entry: './src/lambda.ts',
  target: 'node',
  externals: [],
  output: {
    filename: 'lambda.js',
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
            configFile: 'tsconfig.aws.json',
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
};
