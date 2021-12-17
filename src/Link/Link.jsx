import React from 'react';
import PropTypes from 'prop-types';
import { classBuilder } from '../utils/Utils';
import './Link.scss';

export const DEFAULT_CLASS = 'govuk-link';
export const Link = ({
  children,
  href,
  classBlock,
  classModifiers,
  className,
  ...attrs
}) => {
  const classes = classBuilder(classBlock, classModifiers, className);
  return <a data-module={DEFAULT_CLASS} href={href} {...attrs} className={classes()}>
    {children}
  </a>;
};

Link.propTypes = {
  href: PropTypes.string,
  classBlock: PropTypes.string,
  classModifiers: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  className: PropTypes.string
};

Link.defaultProps = {
  classBlock: DEFAULT_CLASS,
  classModifiers: []
};

export default Link;
