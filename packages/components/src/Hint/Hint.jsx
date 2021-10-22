import React from 'react';
import './Hint.scss';

const Hint = ({ children, ...attrs }) => {
  return <span {...attrs} className="govuk-hint">
    {children}
  </span>;
};

export default Hint;
