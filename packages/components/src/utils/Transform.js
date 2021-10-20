import { OPTIONS_TYPE } from '../models/COP';

export const TRANSFORM_TYPES = {
  FORM_BUILDER: 'FormBuilder'
};
const ALLOWABLE_TYPES = Object.keys(TRANSFORM_TYPES).map(key => TRANSFORM_TYPES[key]);

/**
 * Transforms FormBuilder.ElementOptions into COP ElementOptions.
 * @param {FormBuilder.ElementOptions} options 
 */
export const TransformFormBuilder = (options) => {
  const classes = [options.className, options.customClass];
  return {
    optionsType: OPTIONS_TYPE,
    id: options.id,
    label: options.label,
    calculateValue: options.calculateValue,
    required: options.validate ? options.validate.required : false,
    tag: options.tag,
    content: options.content,
    className: classes.filter(c => !!c).join(' '),
    defaultValue: options.defaultValue,
    disabled: options.disabled,
    hidden: options.hidden,
    showWhen: options.customConditional,
    attrs: options.attrs,
    initialiseData: options.initialiseData,
    onChange: options.onChange
  };
};

const Transform = (type, options) => {
  switch (type) {
    case TRANSFORM_TYPES.FORM_BUILDER:
      return TransformFormBuilder(options);
    default:
      throw new Error(`Unsupported type: '${type}'. Choose from ${ALLOWABLE_TYPES.join(', ')}.`);
  }
};

export default Transform;
