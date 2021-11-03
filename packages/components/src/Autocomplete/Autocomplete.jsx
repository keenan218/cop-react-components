import React, { useEffect, useRef } from 'react'
import { default as AlphaAutocomplete } from 'accessible-autocomplete/react';
import PropTypes from 'prop-types';
import { getFilterFunction, getTemplates, setValue } from './Autocomplete.utils';
import { concatClasses } from '../utils/Utils';
import './Autocomplete.scss';
import { TextInput } from '..';

export const DEFAULT_CLASS = 'hods-autocomplete';
const Autocomplete = ({
  id,
  disabled,
  error,
  source,
  item,
  value,
  defaultValue,
  displayMenu,
  templates: _templates,
  onChange,
  onConfirm: _onConfirm,
  classBlock,
  className: _className,
  ...attrs
}) => {
  const aacRef = useRef(null);
  const className = concatClasses(_className, error ? 'error' : undefined);
  const filterFunction = getFilterFunction(source, item);
  const templates = getTemplates(_templates, item);
  useEffect(() => {
    if (aacRef.current) {
      setValue(aacRef.current, value, filterFunction, templates);
    }
  }, [value, aacRef, filterFunction, templates]);
  const onConfirm = (item) => {
    value = item;
    if (typeof onChange === 'function') {
      onChange(value);
    }
  };
  return (
    <div className={`${DEFAULT_CLASS}__outer-wrapper ${className ?? ''}`}>
      {disabled && <TextInput {...attrs} id={id} value={templates.inputValue(value)} disabled error={error} />}
      {!disabled && <AlphaAutocomplete
        ref={aacRef}
        {...attrs}
        id={id}
        cssNamespace={classBlock}
        displayMenu={displayMenu}
        onConfirm={onConfirm}
        confirmOnBlur={false}
        showAllValues={false}
        templates={templates}
        source={filterFunction}
      />}
    </div>
  );
};

Autocomplete.propTypes = {
  id: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  /** A list of items or a function that takes a query and callback method, which is called with the resultant list of items. */
  source: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.any), PropTypes.func]).isRequired,
  /** The structure of the item. If this is not provided, it is assumed to be a string. */
  item: PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    format: PropTypes.string
  }),
  /** The selected item. */
  value: PropTypes.any,
  /** Deprecated. Use value. */
  defaultValue: PropTypes.any,
  /** Whether the menu of items should overlay elements below it or move those elements down the page. */
  displayMenu: PropTypes.oneOf(['overlay', 'inline']),
  /** Functions for formatting the labels that appear in the options menu and in the input when a selection is made. */
  templates: PropTypes.shape({ inputValue: PropTypes.func.isRequired, suggestion: PropTypes.func.isRequired }),
  /** Handler for when the value changes. */
  onChange: PropTypes.func,
  /** Deprecated. Use onChange. */
  onConfirm: PropTypes.func,
  classBlock: PropTypes.string,
  className: PropTypes.string
};

Autocomplete.defaultProps = {
  displayMenu: 'overlay',
  classBlock: DEFAULT_CLASS
};

export const RefDataAutocomplete = ({
  ...attrs
}) => {
  return <Autocomplete
    {...attrs}
    item={{ value: 'id', label: 'name' }}
  />;
};

export default Autocomplete;
