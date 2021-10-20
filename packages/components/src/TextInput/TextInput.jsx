import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './TextInput.scss';

const TextInput = ({
  id,
  fieldId,
  disabled,
  error,
  formValue,
  onChange
}) => {
  const [value, setValue] = useState('');
  const BASE_CLASS = 'govuk-input';
  const classes = () => {
    if (error) {
      return `${BASE_CLASS} ${BASE_CLASS}--error`;
    }
    return BASE_CLASS
  };
  const handleChange = (e) => {
    if (typeof onChange === 'function') onChange(fieldId, e.target.value)
  };
  useEffect(() => {
    console.log('TextInput.useEffect: formValue', formValue, 'fieldId', fieldId);
    if (formValue && Object.keys(formValue).indexOf(fieldId) > -1) {
      setValue(formValue[fieldId]);
    }
  }, [setValue, fieldId, formValue]);
  return (
    <input
      disabled={disabled}
      id={id}
      name={fieldId}
      type="text"
      className={classes()}
      value={value}
      onChange={handleChange}
    />
  );
};

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  fieldId: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  formValue: PropTypes.object,
  onChange: PropTypes.func
};
TextInput.displayName = 'TextInput';

export default TextInput;
