const {
    fixBabelImports,
    addBabelPlugins,
    addPostcssPlugins,
    override,
    addBabelPresets,
    addWebpackResolve,
    addWebpackPlugin,
} = require('customize-cra')
const path = require('path')
const { DefinePlugin, ProvidePlugin } = require('webpack')

module.exports = override(
    addPostcssPlugins([require('tailwindcss'), require('postcss-preset-env')({ stage: 1 })]),
    ...addBabelPlugins(
        'babel-plugin-react-native-web'
        // '@babel/plugin-proposal-class-properties',
    ),
    ...addBabelPresets('@babel/preset-flow', '@babel/preset-react', '@babel/preset-typescript'),
    fixBabelImports('module-resolver', {
        alias: {
            '^react-native$': 'react-native-web',
        },
    }),
    addWebpackResolve({
        fallback: {
            stream: require.resolve('stream-browserify'),
            https: require.resolve('https-browserify'),
            crypto: require.resolve('crypto-browserify'),
            process: require.resolve('process/browser.js'),
            http: require.resolve('stream-http'),
            https: require.resolve('https-browserify'),
            assert: require.resolve('assert'),
            buffer: require.resolve('buffer'),
            os: require.resolve('os-browserify/browser'),
            path: require.resolve('path-browserify'),
            url: require.resolve('url'),
        },
    }),
    addWebpackPlugin(
        // new DefinePlugin({
        //     Buffer: ['buffer', 'Buffer'],
        // }),
        // new DefinePlugin({
        //     process: 'process/browser.js',
        // }),
        new ProvidePlugin({
            process: 'process/browser.js',
            Buffer: ['buffer', 'Buffer'],
        })
    )
)
// const webpack = require('webpack')

// module.exports = function override(config) {
//     const fallback = config.resolve.fallback || {}
//     Object.assign(fallback, {
//         crypto: require.resolve('crypto-browserify'),
//         stream: require.resolve('stream-browserify'),
//         assert: require.resolve('assert'),
//         http: require.resolve('stream-http'),
//         https: require.resolve('https-browserify'),
//         os: require.resolve('os-browserify'),
//         url: require.resolve('url'),
//         process: require.resolve('process/browser.js'),
//     })
//     config.resolve.fallback = fallback
//     config.plugins = (config.plugins || []).concat([
//         new webpack.ProvidePlugin({
//             process: 'process/browser.js',
//             Buffer: ['buffer', 'Buffer'],
//         }),
//     ])
//     config.resolve.alias = {
//         '^react-native$': 'react-native-web',
//     }
//     return config
// }
