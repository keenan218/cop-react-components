import React from 'react';
import PropTypes from 'prop-types';
import './Label.scss';

const Label = ({ id, required, children }) => {
  const LABEL_CLASS = 'govuk-label';
  const classes = () => {
    return required ? `${LABEL_CLASS} field-required` : LABEL_CLASS;
  };
  return <label htmlFor={id} className={classes()}>
    {children}
  </label>;
};

Label.propTypes = {
  id: PropTypes.string.isRequired,
  required: PropTypes.bool,
};
export default Label;
