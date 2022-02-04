import React from 'react';
import { fireEvent, getByTestId, render } from '@testing-library/react';
import TextArea, { DEFAULT_CLASS, DEFAULT_ROWS } from './TextArea';
import { DEFAULT_CLASS as DEFAULT_READONLY_CLASS } from '../Readonly';

describe('TextArea', () => {

  const checkSetup = (container, testId) => {
    const textarea = getByTestId(container, testId);
    expect(textarea.classList).toContain(DEFAULT_CLASS);
    return textarea;
  };

  it('should be appropriately set up with id and name', async () => {
    const TEXT_AREA_ID = 'textarea';
    const TEXT_AREA_FIELD_ID = 'textareaFieldId';
    const { container } = render(
      <TextArea data-testid={TEXT_AREA_ID} id={TEXT_AREA_ID} fieldId={TEXT_AREA_FIELD_ID} />
    );
    const textarea = checkSetup(container, TEXT_AREA_ID);
    expect(textarea.name).toEqual(TEXT_AREA_FIELD_ID);
    expect(textarea.value).toEqual('');
    expect(textarea.getAttribute('disabled')).toBeNull();
    expect(textarea.getAttribute('rows')).toEqual(`${DEFAULT_ROWS}`); // String vs number
  });

  it('should accept a specified number of rows', async () => {
    const TEXT_AREA_ID = 'textarea';
    const TEXT_AREA_FIELD_ID = 'textareaFieldId';
    const ROWS = 23;
    const { container } = render(
      <TextArea data-testid={TEXT_AREA_ID} id={TEXT_AREA_ID} fieldId={TEXT_AREA_FIELD_ID} rows={ROWS} />
    );
    const textarea = checkSetup(container, TEXT_AREA_ID);
    expect(textarea.getAttribute('rows')).toEqual(`${ROWS}`); // String vs number
  });

  it('should accept a specified number of rows as a string', async () => {
    const TEXT_AREA_ID = 'textarea';
    const TEXT_AREA_FIELD_ID = 'textareaFieldId';
    const ROWS = "12";
    const { container } = render(
      <TextArea data-testid={TEXT_AREA_ID} id={TEXT_AREA_ID} fieldId={TEXT_AREA_FIELD_ID} rows={ROWS} />
    );
    const textarea = checkSetup(container, TEXT_AREA_ID);
    expect(textarea.getAttribute('rows')).toEqual(ROWS);
  });

  it('should accept an invalid row value and revert to the default', async () => {
    const TEXT_AREA_ID = 'textarea';
    const TEXT_AREA_FIELD_ID = 'textareaFieldId';
    const ROWS = "this is not a number";
    const { container } = render(
      <TextArea data-testid={TEXT_AREA_ID} id={TEXT_AREA_ID} fieldId={TEXT_AREA_FIELD_ID} rows={ROWS} />
    );
    const textarea = checkSetup(container, TEXT_AREA_ID);
    expect(textarea.getAttribute('rows')).toEqual(`${DEFAULT_ROWS}`); // String vs number
  });

  it('should accept the disabled flag', async () => {
    const TEXT_AREA_ID = 'textarea';
    const TEXT_AREA_FIELD_ID = 'textareaFieldId';
    const { container } = render(
      <TextArea data-testid={TEXT_AREA_ID} id={TEXT_AREA_ID} fieldId={TEXT_AREA_FIELD_ID} disabled={true} />
    );
    const textarea = checkSetup(container, TEXT_AREA_ID);
    expect(textarea.getAttribute('disabled')).not.toBeNull();
  });

  it('should accept the readonly flag', async () => {
    const TEXT_AREA_ID = 'textarea';
    const TEXT_AREA_FIELD_ID = 'textareaFieldId';
    const { container } = render(
      <TextArea data-testid={TEXT_AREA_ID} id={TEXT_AREA_ID} fieldId={TEXT_AREA_FIELD_ID} readonly={true} />
    );
    const textarea = getByTestId(container, TEXT_AREA_ID);
    expect(textarea.tagName).toEqual('DIV');
    expect(textarea.classList).toContain(DEFAULT_READONLY_CLASS);
  });

  it('should be in an error state when the error is set', async () => {
    const TEXT_AREA_ID = 'textarea';
    const TEXT_AREA_FIELD_ID = 'textareaFieldId';
    const ERROR = 'This is in error';
    const { container } = render(
      <TextArea data-testid={TEXT_AREA_ID} id={TEXT_AREA_ID} fieldId={TEXT_AREA_FIELD_ID} error={ERROR} />
    );
    const textarea = checkSetup(container, TEXT_AREA_ID);
    expect(textarea.classList).toContain(`${DEFAULT_CLASS}--error`);
    expect(textarea.value).toEqual('');
  });

  it('should not be in an error state when the error is an empty string', async () => {
    const TEXT_AREA_ID = 'textarea';
    const TEXT_AREA_FIELD_ID = 'textareaFieldId';
    const ERROR = '';
    const { container } = render(
      <TextArea data-testid={TEXT_AREA_ID} id={TEXT_AREA_ID} fieldId={TEXT_AREA_FIELD_ID} error={ERROR} />
    );
    const textarea = checkSetup(container, TEXT_AREA_ID);
    expect(textarea.classList).not.toContain(`${DEFAULT_CLASS}--error`);
    expect(textarea.value).toEqual('');
  });

  it('should set the value and onChange on the underlying textarea appropriately', async () => {
    const TEXT_AREA_ID = 'textarea';
    const TEXT_AREA_FIELD_ID = 'textareaFieldId';
    const VALUE = 'This is the value';
    let onChangeCalls = 0;
    const ON_CHANGE = () => {
      onChangeCalls++;
    };
    const { container } = render(
      <TextArea
        data-testid={TEXT_AREA_ID} id={TEXT_AREA_ID} fieldId={TEXT_AREA_FIELD_ID}
        value={VALUE} onChange={ON_CHANGE} />
    );
    const textarea = checkSetup(container, TEXT_AREA_ID);
    expect(textarea.value).toEqual(VALUE);
    expect(onChangeCalls).toEqual(0);
    const EVENT = { target: { name: TEXT_AREA_FIELD_ID, value: `${VALUE}.` } };
    fireEvent.change(textarea, EVENT);
    expect(onChangeCalls).toEqual(1);
  });

});
