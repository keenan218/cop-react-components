import * as COP from '../models/COP';
import TextInput from '../TextInput';

export const showComponent = (options, state) => {
  if (!options) {
    return false;
  }
  if (options.hidden && options.disabled) {
    return false;
  }
  if (options.customConditional) {
    // eslint-disable-next-line no-new-func
    const fn = Function(
      'data',
      `let show; try { ${options.customConditional} } catch (e) { } return show;`
    );
    return fn(state);
  }
  return true;
};

export const TYPES_WITH_LABELS = ['select', 'text', 'textfield', 'phonenumber'];
export const hasLabel = (options) => {
  if (TYPES_WITH_LABELS.indexOf(options?.type) > -1) {
    return true;
  }
  return false;
};

export const getComponent = (options) => {
  // if (!showComponent(component, state)) {
  //   return <element.HiddenInput options={options} formValue={state} />;
  // }
  console.log('getComponent', options);
  switch (options.type) {
    // case 'hidden':
    //   return <element.HiddenInput options={opts} formValue={state} />;
    // case 'select': {
    //   if (opts.widget === 'choicesjs') {
    //     return <element.TypeaheadInput options={opts} formValue={state} />;
    //   }
    //   return <element.SelectInput options={opts} formValue={state} />;
    // }
    // case 'htmlelement':
    //   return <element.HTMLElement options={opts} formValue={state} />;
    case 'text':
    case 'textfield':
      return <TextInput id={options.id} key={options.key} {...options} />;
    case 'phoneNumber': {
      // eslint-disable-next-line no-console
      console.log('NOT YET IMPLEMENTED: type=phonenumber', options.key);
      return <TextInput {...options} />;
    }
    // case 'columns':
    //   return <Columns options={opts} formValue={state} />;
    default:
      return null;
    //   return <element.UnknownElement options={opts} formValue={state} />;
  }
};

export const Columns = ({ options, formValue }) => {
  const columnKey = (index) => {
    return `${options.id}_${index}`;
  };
  return (
    <div className="row">
      {options.columns &&
        options.columns.map((col, index) => (
          <div
            key={columnKey(index)}
            className={`govuk-form-group col sm-12 ${col.size}-${col.width}`}
          >
            {/* {col.components.map((component) => (
              <element.FormGroup options={component}>
                {getComponent(component, formValue, options.initialiseData, options.onChange)}
              </element.FormGroup>
            ))} */}
          </div>
        ))}
    </div>
  );
};
Columns.propTypes = COP.ElementPropTypesWithInit;

const Component = {
  get: getComponent,
  hasLabel: hasLabel,
  show: showComponent,
  TYPES_WITH_LABELS
};

export default Component;
