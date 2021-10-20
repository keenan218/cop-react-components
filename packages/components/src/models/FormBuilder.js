import PropTypes from 'prop-types';

export const ElementOptions = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  calculateValue: PropTypes.string,
  validate: PropTypes.shape({
    required: PropTypes.bool,
  }),
  tag: PropTypes.string,
  content: PropTypes.string,
  className: PropTypes.string,
  customClass: PropTypes.string,
  defaultValue: PropTypes.any,
  disabled: PropTypes.bool,
  hidden: PropTypes.bool,
  customConditional: PropTypes.string,
  attrs: PropTypes.arrayOf(PropTypes.object),
  initialiseData: PropTypes.func,
  onChange: PropTypes.func
};

const FormBuilder = {
  ElementOptions,
  ElementOptionsWithInit: {
    ...ElementOptions,
    initialiseData: PropTypes.func.isRequired
  },
  HTMLElementOptions: {
    ...ElementOptions,
    tag: PropTypes.string.isRequired
  }
};

export default FormBuilder;
