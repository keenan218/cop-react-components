import React from 'react';
import PropTypes from 'prop-types';
import { classBuilder, toArray } from '../utils/Utils';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Hint from '../Hint/Hint';
import Label from '../Label';
import './FormGroup.scss';

export const DEFAULT_CLASS = 'govuk-form-group';
const FormGroup = ({
  children,
  id,
  label,
  hint,
  error,
  required,
  classBlock,
  classModifiers: _classModifiers,
  className,
  ...attrs
}) => {
  const classModifiers = [...toArray(_classModifiers), error ? 'error' : undefined ];
  const classes = classBuilder(classBlock, classModifiers, className);
  return (
    <div {...attrs} key={id} className={classes()}>
      <Label id={id} required={required}>{label}</Label>
      {hint && <Hint id={id}>{hint}</Hint>}
      {error && <ErrorMessage id={`${id}-error`}>{error}</ErrorMessage>}
      {children}
    </div>
  );
};

FormGroup.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.node.isRequired,
  hint: PropTypes.node,
  error: PropTypes.node,
  required: PropTypes.bool,
  classBlock: PropTypes.string,
  classModifiers: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  className: PropTypes.string
};

FormGroup.defaultProps = {
  required: false,
  classBlock: DEFAULT_CLASS,
  classModifiers: []
};

FormGroup.displayName = 'FormGroup';

export default FormGroup;
