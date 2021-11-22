// Global imports
import React from 'react';
import PropTypes from 'prop-types';

// Local imports
import Readonly from '../Readonly';
import { classBuilder, toArray } from '../utils/Utils';
import './TextInput.scss';

export const DEFAULT_CLASS = 'govuk-input';
const TextInput = ({
  id,
  fieldId,
  disabled,
  error,
  readonly,
  classBlock,
  classModifiers: _classModifiers,
  className,
  ...attrs
}) => {
  const classModifiers = [...toArray(_classModifiers), error ? 'error' : undefined ];
  const classes = classBuilder(classBlock, classModifiers, className);
  if (readonly) {
    return (
      <Readonly id={id} classModifiers={classModifiers} className={className} {...attrs}>
        {attrs.value}
      </Readonly>
    );
  }
  return (
    <input
      {...attrs}
      disabled={disabled}
      id={id}
      name={fieldId}
      type="text"
      className={classes()}
    />
  );
};

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  fieldId: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  readonly: PropTypes.bool,
  classBlock: PropTypes.string,
  classModifiers: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  className: PropTypes.string
};

TextInput.defaultProps = {
  classBlock: DEFAULT_CLASS,
  classModifiers: []
};

TextInput.displayName = 'TextInput';

export default TextInput;
