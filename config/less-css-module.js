const { createMatcher, findIndexAndRules, addAfterRule } = require('./common')

const lessExtension = /\.less$/;
const lessModuleExtension = /\.module\.less$/;

function createRewireLess(lessLoaderOptions = {}) {
  return function(config, env) {
   
    const rulesSource = config.module.rules
    const fileLoaderMatcher = createMatcher('file-loader')
    const { rule } = findIndexAndRules(rulesSource, fileLoaderMatcher)
    rule.exclude.push(lessExtension);

    const cssTestMatcher = createMatcher(String(/\.css$/), 'test')
    const { rule: cssRule } = findIndexAndRules(rulesSource, cssTestMatcher)
    const cssMoudleTestMatcher = createMatcher(String(/\.module\.css$/), 'test')
    const { index: cssModuleIndex, rule: cssModuleRule, rules } = findIndexAndRules(rulesSource, cssMoudleTestMatcher)
    
    const createRule = (rule, cssRules) => {
      if(!cssRules) return rule;
      if (cssRules.loader) {
        return {
          ...rule,
          loader: [
            ...cssRules.loader,
            { loader: "less-loader", options: lessLoaderOptions },
          ],
        };
      } else {
        return {
          ...rule,
          use: [
            ...cssRules.use,
            { loader: "less-loader", options: lessLoaderOptions },
          ],
        };
      }
    };

    const lessRules = createRule(
      {
        test: lessExtension,
        exclude: [lessModuleExtension, /node_modules/],
      },
      // Get a copy of the CSS loader
      cssRule
    );

    const lessModuleRules = createRule(
      { test: lessModuleExtension },
      // Get a copy of the CSS module loader
      cssModuleRule
    );
    lessRules.use[1] = lessModuleRules.use[1]
    
    addAfterRule(rules, cssModuleIndex, [ lessRules, lessModuleRules ])
  

    return config;
  };
}

const rewireLess = createRewireLess();

rewireLess.withLoaderOptions = createRewireLess;

module.exports = rewireLess;