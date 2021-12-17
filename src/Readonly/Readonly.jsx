// Global imports
import React from 'react';
import PropTypes from 'prop-types';

// Local imports
import { classBuilder } from '../utils/Utils';
import './Readonly.scss';

export const DEFAULT_CLASS = 'hods-readonly';
const Readonly = ({
  children,
  classBlock,
  classModifiers,
  className,
  ...attrs
}) => {
  const classes = classBuilder(classBlock, classModifiers, className);
  return (
    <div {...attrs} className={classes()}>
      {children}
    </div>
  );
};

Readonly.propTypes = {
  classBlock: PropTypes.string,
  classModifiers: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  className: PropTypes.string
};

Readonly.defaultProps = {
  classBlock: DEFAULT_CLASS
};

export default Readonly;
