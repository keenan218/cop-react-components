// Global Imports
import React from 'react';
import PropTypes from 'prop-types';

// Local imports
import { classBuilder } from '../utils/Utils';
import './DateInput.scss';
import TextInput from '../TextInput';
import Label from '../Label';
import Readonly from '../Readonly';

export const DEFAULT_CLASS = 'govuk-date-input';
const DateInput = ({
  id,
  fieldId,
  classBlock,
  classModifiers,
  className,
  error,
  value,
  onChange,
  readonly,
  ...attrs
}) => {
  const classes = classBuilder(classBlock, classModifiers, className);

  const convertMonth = (monthNum) => {
    return [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ][monthNum - 1];
  };

  if (readonly) {
    return (
      <Readonly id={id} classModifiers={classModifiers} className={className} {...attrs}>
        {value?.day} {value?.month ? convertMonth(value.month) : ''} {value?.year}
      </Readonly>
    );
  }

  return (
    <div className={DEFAULT_CLASS} id={id} {...attrs}>
      <div className={classes('item')}>
        <Label id={`${id}-day-label`} className={`${classes('label')}`} htmlFor={`${id}-day`} required>
          Day
        </Label>
        <TextInput
          id={`${id}-day`}
          fieldId={`${fieldId}-day`}
          value={value?.day}
          onChange={onChange}
          pattern='[0-9]*'
          inputMode='numeric'
          error={error?.day ? 'error' : ''}
          className={classes('input')}
          classModifiers='width-2'
        />
      </div>
      <div className={classes('item')}>
        <Label id={`${id}-month-label`} className={`${classes('label')}`} htmlFor={`${id}-month`} required>
          Month
        </Label>
        <TextInput
          id={`${id}-month`}
          fieldId={`${fieldId}-month`}
          value={value?.month}
          onChange={onChange}
          pattern='[0-9]*'
          inputMode='numeric'
          error={error?.month ? 'error' : ''}
          className={classes('input')}
          classModifiers='width-2'
        />
      </div>
      <div className={classes('item')}>
        <Label id={`${id}-year-label`} className={`${classes('label')}`} htmlFor={`${id}-year`} required>
          Year
        </Label>
        <TextInput
          id={`${id}-year`}
          fieldId={`${fieldId}-year`}
          value={value?.year}
          onChange={onChange}
          pattern='[0-9]*'
          inputMode='numeric'
          error={error?.year ? 'error' : ''}
          className={classes('input')}
          classModifiers='width-4'
        />
      </div>
    </div>
  );
};

DateInput.propTypes = {
  id: PropTypes.string.isRequired,
  fieldId: PropTypes.string.isRequired,
  classBlock: PropTypes.string,
  classModifiers: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  className: PropTypes.string,
  error: PropTypes.shape({
    day: PropTypes.bool,
    month: PropTypes.bool,
    year: PropTypes.bool,
  }),
  value: PropTypes.shape({
    day: PropTypes.number,
    month: PropTypes.number,
    year: PropTypes.number,
  }),
  onChange: PropTypes.func,
  readonly: PropTypes.bool,
};

DateInput.defaultProps = {
  classBlock: DEFAULT_CLASS,
};

export default DateInput;
