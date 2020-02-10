const path = require('path');

const ruleChildren = (loader) => loader.use || loader.oneOf || (Array.isArray(loader.loader) && loader.loader) || []

const findIndexAndRules = (rulesSource, ruleMatcher) => {
  let result = undefined
  const rules = Array.isArray(rulesSource) ? rulesSource : ruleChildren(rulesSource)
  rules.some((rule, index) => result = ruleMatcher(rule) ? { index, rule, rules} : findIndexAndRules(ruleChildren(rule), ruleMatcher))
  return result
}

const createMatcher = (value, target = 'loader') => (rule) => {
  if(target === 'loader') {
    return rule.loader && rule.loader.indexOf(`${path.sep}${value}${path.sep}`) !== -1
  } else if (target === 'test') {
    return rule.test && String(rule.test) === String(value)
  }
  return false
}

const addBeforeRule = (rules, index, values) => {
  rules.splice(index, 0, ...values)
}

const addAfterRule = (rules, index, values) => {
  rules.splice(index + 1, 0, ...values)
}

function resolve(url) {
  return path.resolve(__dirname, url)
}

module.exports = {
  findIndexAndRules,
  createMatcher,
  addBeforeRule,
  addAfterRule,
  resolve,
}