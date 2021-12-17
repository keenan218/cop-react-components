import React from 'react';
import PropTypes from 'prop-types';
import InsetText from '../InsetText';
import { classBuilder } from '../utils/Utils';
import './Alert.scss';

export const DEFAULT_CLASS = 'hods-alert';
const Alert = ({
  children,
  heading,
  classBlock,
  classModifiers,
  className,
  ...attrs
}) => {
  const classes = classBuilder(classBlock, classModifiers, className);
  return (
    <InsetText {...attrs} classBlock={classBlock} classModifiers={classModifiers} className={className}>
      <h2 className={classes('heading')}>{heading}</h2>
      <p>{children}</p>
    </InsetText>
  );
};

Alert.propTypes = {
  heading: PropTypes.string.isRequired,
  classBlock: PropTypes.string,
  classModifiers: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  className: PropTypes.string
};

Alert.defaultProps = {
  classBlock: DEFAULT_CLASS
};

export default Alert;
