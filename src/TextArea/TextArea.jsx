// Global imports
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

// Local imports
import Readonly from '../Readonly';
import { classBuilder, toArray } from '../utils/Utils';
import './TextArea.scss';

export const DEFAULT_ROWS = 5;
export const DEFAULT_CLASS = 'govuk-textarea';
const TextArea = ({
  id,
  fieldId,
  rows: _rows,
  disabled,
  error,
  readonly,
  classBlock,
  classModifiers: _classModifiers,
  className,
  ...attrs
}) => {
  const [rows, setRows] = useState(DEFAULT_ROWS);
  useEffect(() => {
    const rowsNumber = parseInt(_rows, 10);
    setRows(isNaN(rowsNumber) ? DEFAULT_ROWS : rowsNumber);
  }, [_rows, setRows]);
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
  rows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
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
