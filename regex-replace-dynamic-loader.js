const loaderUtils = require('loader-utils');

module.exports = function(source) {
  const { match: { pattern, flags } = {}, replaceWith } = loaderUtils.getOptions(this);
  const isFunction = (typeof replaceWith === 'function');
  const doReplace = isFunction? (match) => replaceWith(match) : () => replaceWith;

  const re = new RegExp(pattern, flags);
  const machedResults = source.match(re) || [];

  let finalText = source;

  machedResults.forEach((curr) => {
    finalText = finalText.replace(curr, doReplace(curr));
  });

  return finalText;
};