const {
  override,
  addWebpackAlias,
  addWebpackPlugin,
  addDecoratorsLegacy,
  fixBabelImports,
  addLessLoader,
} = require('customize-cra')

const rewireSvg = require('./config/svg')
const rewireLess = require('./config/less-css-module')

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
  // addLessLoader({
  //   javascriptEnabled: true,
  // }),
  (config) => {
    rewireSvg(config)
    rewireLess(config)
    return config
  }
)
