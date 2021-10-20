import PropTypes from 'prop-types';

export const OPTIONS_TYPE = 'COP';

export const ElementOptions = {
  optionsType: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  calculateValue: PropTypes.string,
  required: PropTypes.bool,
  tag: PropTypes.string,
  content: PropTypes.string,
  className: PropTypes.string,
  customClass: PropTypes.string,
  defaultValue: PropTypes.any,
  disabled: PropTypes.bool,
  hidden: PropTypes.bool,
  showWhen: PropTypes.string,
  attrs: PropTypes.arrayOf(PropTypes.object),
  initialiseData: PropTypes.func,
  onChange: PropTypes.func,
  error: PropTypes.string
};

export const ElementOptionsWithInit = {
  ...ElementOptions,
  initialiseData: PropTypes.func.isRequired
};

export const HTMLElementOptions = {
  ...ElementOptions,
  tag: PropTypes.string.isRequired
};

export const ElementPropTypes = {
  options: PropTypes.shape(ElementOptions).isRequired,
  formValue: PropTypes.object
};

export const ElementPropTypesWithInit = {
  options: PropTypes.shape(ElementOptionsWithInit).isRequired,
  formValue: PropTypes.object.isRequired
};

export const ButtonElementPropTypes = {
  options: PropTypes.shape(ElementOptions).isRequired,
  onClick: PropTypes.func
};
