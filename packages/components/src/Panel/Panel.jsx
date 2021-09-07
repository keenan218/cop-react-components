
import React from 'react';
// import PropTypes from 'prop-types';
import './Panel.scss';

export const Panel = ({ children, className, title, ...attrs }) => {

  return (
    <div {...attrs} className={`govuk-panel govuk-panel--confirmation ${className}`}>
      <h1 className="govuk-panel__title">{title}</h1>
      <div className="govuk-panel__body">
        {children}
      </div>
    </div>
  );
};

// Panel.propTypes = {
//   backgroundColor: PropTypes.string,
//   label: PropTypes.string.isRequired,
//   onClick: PropTypes.func,
// };

// Panel.defaultProps = {
//   backgroundColor: null,
//   onClick: undefined,
// };

export default Panel;