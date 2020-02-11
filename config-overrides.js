const {
  override,
  addWebpackAlias,
  addWebpackPlugin,
  addDecoratorsLegacy,
  fixBabelImports,
  addLessLoader,
  addBabelPlugin,
} = require('customize-cra')

const rewireSvg = require('./config/svg')

const AntDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin')

const path = require('path')

function resolve(url) {
  return path.resolve(__dirname, url)
}


module.exports = override(
  addDecoratorsLegacy(),
  addWebpackAlias({
    '@': resolve('src')
  }),
  addWebpackPlugin(
    new AntDayjsWebpackPlugin()
  ),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css',
  }),
  addLessLoader({
    cssModules: {
      localIdentName: "[local]--[hash:base64:5]",
    },
    cssLoaderOptions: {
      modules: {
        localIdentName: "[local]--[hash:base64:5]",
      },
    }
    // javascriptEnabled: true,
  }),
  addBabelPlugin([
    'react-css-modules', {
      generateScopedName: '[local]--[hash:base64:5]',
      filetypes: {
        '.less': {
          syntax: 'postcss-less'
        }
      },
    }
  ]),
  (config) => {
    rewireSvg(config)
    return config
  }
)
