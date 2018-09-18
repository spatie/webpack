const merge = require('webpack-merge');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const browsers = '>0.25%, > 5% in BE, not ie 11, not op_mini all';

module.exports = config => (env, argv) =>
    merge(
        {
            output: {
                path: `${__dirname}/../../../public`,
                publicPath: '/',
                filename: '[name]-[hash].js',
                chunkFilename: 'js/[name]-[chunkhash].js',
            },

            module: {
                rules: [
                    {
                        test: /\.vue$/,
                        use: 'vue-loader',
                    },
                    {
                        test: /\.js$/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    [
                                        '@babel/preset-env',
                                        { targets: browsers },
                                    ],
                                ],
                                plugins: [
                                    '@babel/plugin-syntax-dynamic-import',
                                ],
                            },
                        },
                        exclude: /node_modules/,
                    },
                    {
                        test: /\.css$/,
                        use: [
                            MiniCssExtractPlugin.loader,
                            'css-loader',
                            {
                                loader: 'postcss-loader',
                                options: {
                                    plugins: () =>
                                        [
                                            require('postcss-easy-import')(),
                                            require('tailwindcss')(
                                                './tailwind.js'
                                            ),
                                            require('postcss-preset-env')({
                                                browsers,
                                            }),
                                        ].concat(
                                            argv.mode === 'production'
                                                ? [require('cssnano')()]
                                                : []
                                        ),
                                },
                            },
                        ],
                    },
                ],
            },

            resolve: {
                extensions: ['.vue', '.js', '.css'],

                alias: {
                    vue$: 'vue/dist/vue.esm.js',
                },
            },

            plugins: [
                new VueLoaderPlugin(),

                new MiniCssExtractPlugin({
                    filename: '[name]-[hash].css',
                }),

                new WebpackNotifierPlugin({
                    alwaysNotify: true,
                    excludeWarnings: true,
                }),

                new ManifestPlugin({
                    fileName: 'mix-manifest.json',
                    basePath: '/',
                    publicPath: '/',
                }),
            ].concat(
                argv.analyze !== undefined ? [new BundleAnalyzerPlugin()] : []
            ),

            stats: {
                hash: false,
                version: false,
                timings: false,
                entrypoints: false,
                children: false,
                errorDetails: false,
                chunks: false,
                modules: false,
                reasons: false,
                source: false,
                publicPath: false,
            },

            performance: {
                hints: false,
            },

            optimization: {
                splitChunks: {
                    cacheGroups: {
                        vendor: {
                            chunks: 'all',
                            test: /[\\/]node_modules[\\/]/,
                        },
                    },
                },
            },
        },
        config
    );
