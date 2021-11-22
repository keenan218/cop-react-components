// Global imports
import React from 'react';
import PropTypes from 'prop-types';

// Local imports
import { classBuilder } from '../utils/Utils';
import './ErrorSummary.scss';

export const DEFAULT_CLASS = 'govuk-error-summary';
export const DEFAULT_ID = 'error-summary';
export const DEFAULT_TITLE = 'There is a problem';
const ErrorSummary = ({
  id,
  title,
  errors,
  classBlock,
  classModifiers,
  className,
  ...attrs
}) => {
  const classes = classBuilder(classBlock, classModifiers, className);
  return (
    <div {...attrs} id={id} className={classes()} aria-labelledby={`${id}-title`} role="alert" tabIndex="-1" data-module={DEFAULT_CLASS}>
      <h2 className={classes('title')} id={`${id}-title`}>{title}</h2>
      <div className={classes('body')}>
        <ul className={`govuk-list ${classes('list')}`}>
          {errors.map((error, index) => (
            <li key={`error-${index}`}>
              <a href={`#${error.id}`}>{error.error}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

ErrorSummary.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string.isRequired,
  errors: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired
  })).isRequired,
  classBlock: PropTypes.string,
  classModifiers: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  className: PropTypes.string
};

ErrorSummary.defaultProps = {
  id: DEFAULT_ID,
  title: DEFAULT_TITLE,
  classBlock: DEFAULT_CLASS,
  classModifiers: []
};

export default ErrorSummary;