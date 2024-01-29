// import CopyWebpackPlugin from 'copy-webpack-plugin';
// import TerserPlugin from 'terser-webpack-plugin';
// import { fileURLToPath } from 'url';
// import path from 'path';

// const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: {
        // include dist in entry point so that when running dev server,
        // we can access the files with /dist/...
        'dist/transformers': './src/transformers.js',
        'dist/transformers.min': './src/transformers.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname),
        // library: {
        //     type: 'module',
        // },
    },
    plugins: [
        // Copy .wasm files to dist folder
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'node_modules/onnxruntime-web/dist/*.wasm',
                    to: 'dist/[name][ext]'
                },
            ],
        }),
    ],
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            test: /\.min\.js$/,
            extractComments: false,
        })],
    },
    devServer: {
        static: {
            directory: __dirname
        },
        port: 8080
    },
    // experiments: {
    //     outputModule: true,
    // },
};
