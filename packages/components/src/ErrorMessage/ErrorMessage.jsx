import React from 'react';
import VisuallyHidden from '../VisuallyHidden';
import './ErrorMessage.scss';

const ErrorMessage = ({ children }) => {
  return <span className="govuk-error-message">
    <VisuallyHidden>Error:</VisuallyHidden>
    {children}
  </span>;
};

export default ErrorMessage;
