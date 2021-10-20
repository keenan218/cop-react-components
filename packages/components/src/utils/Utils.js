const REGEX = /\${[^{]+}/g;

const getObjPath = (path, obj, fallback = '') => {
  return path.split('.').reduce((res, key) => res[key] || fallback, obj);
};

/**
 * Interpolate a string (potentially HTML) with variables.
 * @param {*} template The template string
 * @param {*} variables The values to be used in the interpolation
 * @param {*} fallback (defaults to '')
 * @returns A fully interpolated string
 * @example
 *  interpolateString('<span>${item.label}</span>', { item: { id: '1', label: 'Item 1' } });
 *  // <span>Item 1</span>
 * @example
 *  interpolateString('<span>${forename} ${surname}</span>', { forename: 'William' }, 'Fallback-Smith');
 *  // <span>William Fallback-Smith</span>
 */
export const interpolateString = (template, variables, fallback = '') => {
  const obj = variables ?? {};
  if (typeof template === 'string') {
    return template.replace(REGEX, (match) => {
      const path = match.slice(2, -1).trim();
      return getObjPath(path, obj, fallback);
    });
  }
  return '';
};

const Utils = {
  interpolateString
};

export default Utils;
