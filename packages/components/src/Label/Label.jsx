import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Label.scss';

export const OPTIONAL_SUFFIX = ' (optional)';
const Label = ({
  children,
  id,
  required,
  ...attrs
}) => {
  const [suffix, setSuffix] = useState('');
  useEffect(() => {
    if (!required && typeof(children) === 'string') {
      setSuffix(OPTIONAL_SUFFIX);
    } else {
      setSuffix('');
    }
  }, [required, children]);
  return <label {...attrs} htmlFor={id} className="govuk-label">
    {children}
    {suffix}
  </label>;
};

Label.propTypes = {
  id: PropTypes.string.isRequired,
  required: PropTypes.bool
};
Label.defaultProps = {
  required: false
};
export default Label;
