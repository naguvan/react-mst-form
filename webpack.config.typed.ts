import * as path from 'path';
import * as webpack from 'webpack';

// const BundleAnalyzerPlugin: any = require("webpack-bundle-analyzer")
//   .BundleAnalyzerPlugin;

export default function configure(env: any): Array<webpack.Configuration> {
  const isDevBuild: boolean = !(env && env.prod);
  const nodeEnv: string = process.env.NODE_ENV || 'development';
  const clientBundleOutputDir: string = './dist';
  const clientBundleConfig: webpack.Configuration = {
    stats: { modules: false },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      alias: { '@sk': path.resolve('./src') }
    },
    output: {
      filename: '[name].js',
      chunkFilename: '[name]-chunk.js',
      publicPath: '/dist/',
      path: path.join(__dirname, clientBundleOutputDir)
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          include: /src/,
          exclude: /node_modules/,
          use: 'ts-loader'
        }
      ]
    },
    entry: { client: './src/index.ts' },
    plugins: [
      // new webpack.SourceMapDevToolPlugin({
      //   filename: "[file].map",
      //   moduleFilenameTemplate: path.relative(
      //     clientBundleOutputDir,
      //     "[resourcePath]"
      //   )
      // }),
      // new webpack.NamedModulesPlugin(),
      // new webpack.optimize.CommonsChunkPlugin({
      //   name: "vendor",
      //   minChunks: Infinity,
      //   filename: "vendor.bundle.js"
      // }),
      ...(isDevBuild
        ? []
        : [
            new webpack.LoaderOptionsPlugin({
              minimize: true,
              debug: false
            }), // prod
            new webpack.optimize.UglifyJsPlugin({
              compress: {
                warnings: false
              },
              comments: false,
              sourceMap: false
            }) // prod
          ]),
      new webpack.DefinePlugin({
        process: {},
        'process.env': {},
        'process.env.NODE_ENV': JSON.stringify(nodeEnv),
        __DEV__: nodeEnv === 'development',
        __TEST__: nodeEnv === 'test'
      }) // prod
      // ,
      // new BundleAnalyzerPlugin()
    ]
  };

  return [clientBundleConfig];
}
