import * as path from 'path';
import * as webpack from 'webpack';

export default function configure(env: any): Array<webpack.Configuration> {
    const isDevBuild: boolean = !(env && env.prod);
    const nodeEnv: string = process.env.NODE_ENV || 'development';
  const clientBundleOutputDir: string = './'; // './dist';
    const clientBundleConfig: webpack.Configuration = {
        stats: { modules: false },
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
            alias: {
                '@root': path.resolve('./src')
            }
        },
        entry: {
            'dist/index': './src/index.ts',
            'demo/client': './demo/client.tsx'
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
                    include: [/src/, /demo/],
                    exclude: /node_modules/,
                    use: 'ts-loader'
                }
            ]
        },
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
        ]
    };

    return [clientBundleConfig];
}
