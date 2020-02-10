// const path = require("path");
// const { getLoader, loaderNameMatches } = require("react-app-rewired");

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

    // console.log(cssRule)
    // console.log(cssModuleRule.use[1])
    // console.log(cssModuleRule.use[2])
    
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
    lessRules.use[1].options.modules = lessModuleRules.use[1].options.modules
    console.log(lessRules)
    // console.log(lessRules.use[1])
    // console.log(lessModuleRules.use[0])
    // console.log(lessModuleRules.use[1])
    // console.log(lessModuleRules.use[1].options)
    // console.log(lessModuleRules.use[1].options.modules)
    // console.log(lessModuleRules.use[2])
    // console.log(lessModuleRules.use[3])
    
    addAfterRule(rules, cssModuleIndex, [ lessRules, lessModuleRules ])
    // const oneOfRule = config.module.rules.find(
    //   rule => rule.oneOf !== undefined,
    // );
    // if (oneOfRule) {
    //   oneOfRule.oneOf.unshift(lessRules);
    //   oneOfRule.oneOf.unshift(lessModuleRules);
    // } else {
    //   // Fallback to previous behaviour of adding to the end of the rules list.
    //   config.module.rules.push(lessRules);
    //   config.module.rules.push(lessModuleRules);
    // }

    return config;
  };
}

const rewireLess = createRewireLess();

rewireLess.withLoaderOptions = createRewireLess;

module.exports = rewireLess;