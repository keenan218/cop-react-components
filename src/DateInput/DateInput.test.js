// Global imports
import { fireEvent, getByTestId, render } from '@testing-library/react';
import '@testing-library/jest-dom';

// Local imports
import DateInput, { DEFAULT_CLASS } from './DateInput';
import { DEFAULT_CLASS as DEFAULT_LABEL_CLASS } from '../Label/Label';

describe('DateInput', () => {
  const checkSetup = (container, testId) => {
    const wrapper = getByTestId(container, testId);
    expect(wrapper.classList).toContain(`${DEFAULT_CLASS}`);
    return wrapper;
  };

  it('should appropriately set up the necessary components', async () => {
    const ID = 'dateinput';
    const NAME = 'dateinputId';
    const { container } = render(
      <DateInput data-testid={ID} id={ID} name={NAME} />
    );
    const wrapper = checkSetup(container, ID);

    expect(wrapper.childNodes.length).toEqual(3); // 3 for day, month, year

    //day
    const day = wrapper.childNodes[0];
    expect(day.classList).toContain(`${DEFAULT_CLASS}__item`);
    expect(day.childNodes[0].classList).toContain('govuk-form-group');

    const dayLabel = day.childNodes[0].childNodes[0];
    expect(dayLabel.classList).toContain(DEFAULT_LABEL_CLASS);
    expect(dayLabel).toHaveTextContent('Day');

    const dayInput = day.childNodes[0].childNodes[1];
    expect(dayInput.classList).toContain('govuk-input--width-2');
    expect(dayInput.id).toEqual(`${ID}-day`);
    expect(dayInput.name).toEqual(`${NAME}-day`);

    //month
    const month = wrapper.childNodes[1];
    expect(month.classList).toContain(`${DEFAULT_CLASS}__item`);
    expect(month.childNodes[0].classList).toContain('govuk-form-group');

    const monthLabel = month.childNodes[0].childNodes[0];
    expect(monthLabel.classList).toContain(DEFAULT_LABEL_CLASS);
    expect(monthLabel).toHaveTextContent('Month');

    const monthInput = month.childNodes[0].childNodes[1];
    expect(monthInput.classList).toContain('govuk-input--width-2');
    expect(monthInput.id).toEqual(`${ID}-month`);
    expect(monthInput.name).toEqual(`${NAME}-month`);

    //year
    const year = wrapper.childNodes[2];
    expect(year.classList).toContain(`${DEFAULT_CLASS}__item`);
    expect(year.childNodes[0].classList).toContain('govuk-form-group');

    const yearLabel = year.childNodes[0].childNodes[0];
    expect(yearLabel.classList).toContain(DEFAULT_LABEL_CLASS);
    expect(yearLabel).toHaveTextContent('Year');

    const yearInput = year.childNodes[0].childNodes[1];
    expect(yearInput.classList).toContain('govuk-input--width-4');
    expect(yearInput.id).toEqual(`${ID}-year`);
    expect(yearInput.name).toEqual(`${NAME}-year`);
  });

  it('should show errors with appropriate styling', async () => {
    const ID = 'dateinput';
    const NAME = 'dateinputId';
    const { container } = render(
      <DateInput
        data-testid={ID}
        id={ID}
        name={NAME}
        error={{ year: true, month: true, day: true }}
      />
    );
    const wrapper = checkSetup(container, ID);

    //day
    const day = wrapper.childNodes[0];
    const dayInput = day.childNodes[0].childNodes[1];
    expect(dayInput.classList).toContain('govuk-input--error');

    //month
    const month = wrapper.childNodes[1];
    const monthInput = month.childNodes[0].childNodes[1];
    expect(monthInput.classList).toContain('govuk-input--error');

    //year
    const year = wrapper.childNodes[2];
    const yearInput = year.childNodes[0].childNodes[1];
    expect(yearInput.classList).toContain('govuk-input--error');
  });

  it('should update values when entered', async () => {
    const ID = 'dateinput';
    const NAME = 'dateinputId';
    const { container } = render(
      <DateInput
        data-testid={ID}
        id={ID}
        name={NAME}
        error={{ year: true, month: true, day: true }}
      />
    );
    const wrapper = checkSetup(container, ID);

    //day
    const dayInput = wrapper.childNodes[0].childNodes[0].childNodes[1];
    expect(dayInput.value).toEqual('');
    fireEvent.change(dayInput, { target: { value: 12 } });
    expect(dayInput.value).toEqual('12');

    //month
    const monthInput = wrapper.childNodes[1].childNodes[0].childNodes[1];
    expect(monthInput.value).toEqual('');
    fireEvent.change(monthInput, { target: { value: 2 } });
    expect(monthInput.value).toEqual('2');

    //year
    const yearInput = wrapper.childNodes[2].childNodes[0].childNodes[1];
    expect(yearInput.value).toEqual('');
    fireEvent.change(yearInput, { target: { value: 1999 } });
    expect(yearInput.value).toEqual('1999');
  });
});
