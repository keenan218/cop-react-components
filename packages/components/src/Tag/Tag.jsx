import React from 'react';
import PropTypes from 'prop-types';
import './Tag.scss';

const Tag = ({ children, text, className }) => {
  const BASE_CLASS = 'govuk-tag';
  const classes = () => {
    return className ? `${BASE_CLASS} ${className}` : BASE_CLASS;
  };
  return <strong className={classes()}>
    {text || children}
  </strong>;
};

Tag.propTypes = {
  text: PropTypes.string
};

export default Tag;
