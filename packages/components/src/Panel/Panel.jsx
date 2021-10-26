import React from 'react';
import PropTypes from 'prop-types';
import { classBuilder } from '../utils/Utils';
import './Panel.scss';

export const DEFAULT_CLASS = 'govuk-panel';
export const Panel = ({ children, title, classBlock, classModifiers, className, ...attrs }) => {
  const classes = classBuilder(classBlock, classModifiers, className);
  return <div {...attrs} className={classes()}>
    <h1 className={classes('title')}>{title}</h1>
    <div className={classes('body')}>
      {children}
    </div>
  </div>;
};

Panel.propTypes = {
  title: PropTypes.string.isRequired,
  classBlock: PropTypes.string,
  classModifiers: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  className: PropTypes.string
};

Panel.defaultProps = {
  classBlock: DEFAULT_CLASS,
  classModifiers: 'confirmation'
};

export default Panel;