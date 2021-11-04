import { interpolateString } from '../utils/Utils';

const getItemLabel = (property) => {
  return (item) => {
    return item && item[property] ? item[property] : '';
  }
};

const interpolateLabel = (format) => {
  return (item) => {
    return interpolateString(format, item).trim();
  }
};

const itemLabel = (structure) => {
  if (structure) {
    return structure.format ? interpolateLabel(structure.format) : getItemLabel(structure.label);
  }
  return (item) => item || '';
};

const queryMatchesCI = (item, query) => {
  return typeof(item) === 'string' && item.toLowerCase().indexOf(query.toLowerCase()) !== -1;
};

const isFunction = (fn) => {
  return typeof fn === 'function';
};

export const getFilterFunction = (source, itemStructure) => {
  if (typeof source === 'function') {
    return source;
  }
  const label = itemLabel(itemStructure);
  return (query, populateResults) => {
    const found = (source || []).filter(item => {
      if (!!query) {
        return queryMatchesCI(label(item), query);
      }
      return true;
    });
    populateResults(found);
  };
};

export const getTemplates = (templates, itemStructure) => {
  if (templates) {
    // If we only have one property, mirror it on the other one.
    if (isFunction(templates.inputValue)) {
      if (!isFunction(templates.suggestion)) {
        templates.suggestion = templates.inputValue;
      }
      return templates;
    } else if (isFunction(templates.suggestion)) {
      templates.inputValue = templates.suggestion;
      return templates;
    }
  }
  // We don't have a usable templates object so build a whole new one.
  const label = itemLabel(itemStructure);
  return {
    inputValue: label,
    suggestion: label
  };
};

/**
 * Workaround to set up the default value as there seems to be a bug with simply
 * passing the value in - an exception is thrown on blur and the value is not
 * actually set within the component.
 *
 * In addition, there is no other way to set the value directly and this also
 * fulfils that requirement.
 *
 * @param {*} autocomplete A reference to the AlphaGov.Autocomplete component.
 * @param {*} value The value to set the component to.
 */
export const setValue = (autocomplete, value) => {
  if (autocomplete && typeof(autocomplete.setState) === 'function') {
    if (value) {
      const query = autocomplete.props.templates.inputValue(value);
      autocomplete.props.source(query, (found) => {
        const validChoiceMade = found.length > 0;
        autocomplete.setState({
          query,
          validChoiceMade,
          options: validChoiceMade ? [value] : []
        });
      });
    } else {
      autocomplete.setState({
        query: '',
        menuOpen: false,
        options: [],
        validChoiceMade: false
      });
    }
  }
};
