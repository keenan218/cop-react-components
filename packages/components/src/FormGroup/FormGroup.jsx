import React from 'react';
import PropTypes from 'prop-types';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Hint from '../Hint/Hint';
import Label from '../Label';
import './FormGroup.scss';

const FormGroup = ({
  children,
  id,
  label,
  hint,
  error,
  className,
  required
}) => {
  const BASE_CLASS = 'govuk-form-group';
  const classes = () => {
    let cs = className ? `${className} ${BASE_CLASS}` : BASE_CLASS;
    if (error) {
      cs = `${cs} ${BASE_CLASS}--error`;
    }
    return cs;
  };
  return (
    <div key={id} className={classes()}>
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
  className: PropTypes.string,
  required: PropTypes.bool
};
FormGroup.displayName = 'FormGroup';

export default FormGroup;
