import React from 'react';
import './VisuallyHidden.scss';

const VisuallyHidden = ({ children }) => {
  return <span className="govuk-visually-hidden">{children}</span>;
};

export default VisuallyHidden;
