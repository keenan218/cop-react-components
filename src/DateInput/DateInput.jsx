// Global Imports
import PropTypes from 'prop-types';

// Local imports
import { DEFAULT_CLASS as DEFAULT_LABEL_CLASS } from '../Label/Label';
import { classBuilder } from '../utils/Utils';
import './DateInput.scss';
import TextInput from '../TextInput/TextInput';
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

  if (readonly) {
    return (
      <div id={id} {...attrs}>
        <div className={classes('item')}>
          <label className={`${DEFAULT_LABEL_CLASS} ${classes('label')}`} htmlFor={`${id}-day`}>
            Day
          </label>
          <Readonly id={`${id}-day`}>{value?.day}</Readonly>
        </div>
        <div className={classes('item')}>
          <label className={`${DEFAULT_LABEL_CLASS} ${classes('label')}`} htmlFor={`${id}-month`}>
            Month
          </label>
          <Readonly id={`${id}-month`}>{value?.month}</Readonly>
        </div>
        <div className={classes('item')}>
          <label className={`${DEFAULT_LABEL_CLASS} ${classes('label')}`} htmlFor={`${id}-year`}>
            Year
          </label>
          <Readonly id={`${id}-year`}>{value?.year}</Readonly>
        </div>
      </div>
    );
  }

  return (
    <div className={DEFAULT_CLASS} id={id} {...attrs}>
      <div className={classes('item')}>
        <label className={`${DEFAULT_LABEL_CLASS} ${classes('label')}`} htmlFor={`${id}-day`}>
          Day
        </label>
        <TextInput
          classBlock={`govuk-input ${classes('input')} govuk-input--width-2 ${
            error?.day && 'govuk-input--error'
          }`}
          id={`${id}-day`}
          fieldId={`${fieldId}-day`}
          value={value?.day}
          onChange={onChange}
        ></TextInput>
      </div>
      <div className={classes('item')}>
        <label className={`${DEFAULT_LABEL_CLASS} ${classes('label')}`} htmlFor={`${id}-month`}>
          Month
        </label>
        <TextInput
          classBlock={`govuk-input ${classes('input')} govuk-input--width-2 ${
            error?.month && 'govuk-input--error'
          }`}
          id={`${id}-month`}
          fieldId={`${fieldId}-month`}
          value={value?.month}
          onChange={onChange}
        ></TextInput>
      </div>
      <div className={classes('item')}>
        <label className={`${DEFAULT_LABEL_CLASS} ${classes('label')}`} htmlFor={`${id}-year`}>
          Year
        </label>
        <TextInput
          classBlock={`govuk-input ${classes('input')} govuk-input--width-4 ${
            error?.year && 'govuk-input--error'
          }`}
          id={`${id}-year`}
          fieldId={`${fieldId}-year`}
          value={value?.year}
          onChange={onChange}
        ></TextInput>
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
