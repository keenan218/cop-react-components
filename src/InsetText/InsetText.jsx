import React from 'react';
import PropTypes from 'prop-types';
import { classBuilder } from '../utils/Utils';
import './InsetText.scss';

export const DEFAULT_CLASS = 'govuk-inset-text';
const InsetText = ({ children, classBlock, classModifiers, className, ...attrs }) => {
  const classes = classBuilder(classBlock, classModifiers, className);
  return <div {...attrs} className={classes()}>
    {children}
  </div>;
};

InsetText.propTypes = {
  classBlock: PropTypes.string,
  classModifiers: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  className: PropTypes.string
};

InsetText.defaultProps = {
  classBlock: DEFAULT_CLASS
};

export default InsetText;
