// Global Imports
import { useState } from 'react';
import PropTypes from 'prop-types';

// Local imports
import { DEFAULT_CLASS as DEFAULT_LABEL_CLASS } from '../Label/Label';
import { classBuilder } from '../utils/Utils';
import './DateInput.scss';

export const DEFAULT_CLASS = 'govuk-date-input';
const DateInput = ({
  id,
  name,
  classBlock,
  classModifiers,
  className,
  error,
  day,
  month,
  year,
  ...attrs
}) => {
  const classes = classBuilder(classBlock, classModifiers, className);

  const initialState = {
    [name + '-day']: day || '',
    [name + '-month']: month || '',
    [name + '-year']: year || '',
  }

  const [date, setDate] = useState(initialState);

  const onChange = (event) => {
    setDate({...date, [event.target.name] : event.target.value})
  };

  return (
    <div className={DEFAULT_CLASS} id={id} {...attrs}>
      <div className={classes('item')}>
        <div className='govuk-form-group'>
          <label
            className={`${DEFAULT_LABEL_CLASS} ${classes('label')}`}
            htmlFor={`${id}-day`}
          >
            Day
          </label>
          <input
            className={`govuk-input ${classes('input')} govuk-input--width-2 ${
              error?.day && 'govuk-input--error'
            }`}
            id={`${id}-day`}
            name={`${name}-day`}
            type='text'
            pattern='[0-9]*'
            inputMode='numeric'
            value={date[name + '-day']}
            onChange={onChange}
          />
        </div>
      </div>
      <div className={classes('item')}>
        <div className='govuk-form-group'>
          <label
            className={`${DEFAULT_LABEL_CLASS} ${classes('label')}`}
            htmlFor={`${id}-month`}
          >
            Month
          </label>
          <input
            className={`govuk-input ${classes('input')} govuk-input--width-2 ${
              error?.month && 'govuk-input--error'
            }`}
            id={`${id}-month`}
            name={`${name}-month`}
            type='text'
            pattern='[0-9]*'
            inputMode='numeric'
            value={date[name + '-month']}
            onChange={onChange}
          />
        </div>
      </div>
      <div className={classes('item')}>
        <div className='govuk-form-group'>
          <label
            className={`${DEFAULT_LABEL_CLASS} ${classes('label')}`}
            htmlFor={`${id}-year`}
          >
            Year
          </label>
          <input
            className={`govuk-input ${classes('input')} govuk-input--width-4 ${
              error?.year && 'govuk-input--error'
            }`}
            id={`${id}-year`}
            name={`${name}-year`}
            type='text'
            pattern='[0-9]*'
            inputMode='numeric'
            value={date[name + '-year']}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
};

DateInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  classBlock: PropTypes.string,
  classModifiers: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  className: PropTypes.string,
  error: PropTypes.shape({
    day: PropTypes.bool,
    month: PropTypes.bool,
    year: PropTypes.bool,
  }),
  day: PropTypes.number,
  month: PropTypes.number,
  year: PropTypes.number,
};

DateInput.defaultProps = {
  classBlock: DEFAULT_CLASS,
};

export default DateInput;
