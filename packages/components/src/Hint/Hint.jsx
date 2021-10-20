import React from 'react';
import PropTypes from 'prop-types';
import './Hint.scss';

const Hint = ({ children, text }) => {
  return <span className="govuk-hint">
    {text || children}
  </span>;
};

Hint.propTypes = {
  text: PropTypes.string
};

export default Hint;
