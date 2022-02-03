// Global imports
import React from 'react';
import PropTypes from 'prop-types';

// Local imports
import Readonly from '../Readonly';
import { classBuilder, toArray } from '../utils/Utils';
import './TextArea.scss';

export const DEFAULT_ROWS = 5;
export const DEFAULT_CLASS = 'govuk-textarea';
const TextArea = ({
  id,
  fieldId,
  rows,
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
    <textarea
      {...attrs}
      disabled={disabled}
      id={id}
      name={fieldId}
      rows={rows}
      className={classes()}
    />
  );
};

TextArea.propTypes = {
  id: PropTypes.string.isRequired,
  fieldId: PropTypes.string.isRequired,
  rows: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  readonly: PropTypes.bool,
  classBlock: PropTypes.string,
  classModifiers: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  className: PropTypes.string
};

TextArea.defaultProps = {
  rows: DEFAULT_ROWS,
  classBlock: DEFAULT_CLASS,
  classModifiers: []
};

TextArea.displayName = 'TextArea';

export default TextArea;
