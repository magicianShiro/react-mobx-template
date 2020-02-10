const { createMatcher, findIndexAndRules, addBeforeRule, resolve } = require('./common')
const svgoConfig = require('../svgo-config.json')

function createRewireSvg() {
  return function (config) {
    const rulesSource = config.module.rules
    const fileLoaderMatcher = createMatcher('file-loader')
    const { index, rule, rules } = findIndexAndRules(rulesSource, fileLoaderMatcher)
    const svgPath = resolve('../src/icons/svg')
    rule.exclude.push(svgPath)

    addBeforeRule(rules, index, [{
      test: /\.svg$/,
      include: svgPath,
      use: [
        {
          loader: 'svg-sprite-loader',
          options: {
            symbolId: 'icon-[name]'
          }
        },
        {
          loader: 'svgo-loader',
          options: svgoConfig,
        }
      ]
    }])
    return config
  }
}

const rewireSvg = createRewireSvg()

module.exports = rewireSvg


