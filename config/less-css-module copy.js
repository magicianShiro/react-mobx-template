const { createMatcher, findIndexAndRules } = require('./common')

const lessExtension = /\.less$/;
const lessModuleExtension = /\.module\.less$/;

function createRewireLess() {
  return function(config) {
    const rulesSource = config.module.rules
    const lessTestMatcher = createMatcher(lessExtension, 'test')
    const { rule: lessRule } = findIndexAndRules(rulesSource, lessTestMatcher)
    // const lessMoudleTestMatcher = createMatcher(lessModuleExtension, 'test')
    // const { rule: lessModuleRule } = findIndexAndRules(rulesSource, lessMoudleTestMatcher)
    
    console.log('=================')
    lessRule.use[1].options.module = true
    
    // lessRule.use = lessModuleRule.use
    console.log(lessRule.use[1].options.module = true)
    console.log(lessRule.use[2])
    console.log(lessRule.use[3])
    return config
  };
}

const rewireLess = createRewireLess()

// rewireLess.withLoaderOptions = createRewireLess;

module.exports = rewireLess