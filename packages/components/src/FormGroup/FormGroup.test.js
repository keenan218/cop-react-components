import React from 'react';
import { getByTestId, render } from '@testing-library/react';
import FormGroup, { DEFAULT_CLASS } from './FormGroup';

describe('FormGroup', () => {

  const checkSetup = (container, testId) => {
    const formGroup = getByTestId(container, testId);
    expect(formGroup.classList).toContain(DEFAULT_CLASS);
    expect(formGroup.tagName).toEqual('DIV');
    return formGroup;
  };

  it('should appropriately set up a minimal form group', async () => {
    const OPTIONS = {
      id: 'fieldId',
      label: 'Field label'
    };
    const CHILD_ID = 'child';
    const { container } = render(
      <FormGroup data-testid={OPTIONS.id} {...OPTIONS}>
        <input data-testid={CHILD_ID} type="text" />
      </FormGroup>
    );
    const formGroup = checkSetup(container, OPTIONS.id);
    expect(formGroup.classList).not.toContain(`${DEFAULT_CLASS}--error`);
    const input = getByTestId(formGroup, CHILD_ID);
    expect(input.type).toEqual('text');
    const label = formGroup.childNodes[0];
    expect(label.getAttribute('for')).toEqual(OPTIONS.id);
    expect(label.innerHTML).toEqual(`${OPTIONS.label} (optional)`); // This is an optional field so should include the suffix
    expect(formGroup.children.length).toEqual(2); // Just the label and input
  });

  it('should appropriately set up a required form group', async () => {
    const OPTIONS = {
      id: 'fieldId',
      label: 'Field label',
      required: true
    };
    const CHILD_ID = 'child';
    const { container } = render(
      <FormGroup data-testid={OPTIONS.id} {...OPTIONS}>
        <input data-testid={CHILD_ID} type="text" />
      </FormGroup>
    );
    const formGroup = checkSetup(container, OPTIONS.id);
    expect(formGroup.classList).not.toContain(`${DEFAULT_CLASS}--error`);
    const input = getByTestId(formGroup, CHILD_ID);
    expect(input.type).toEqual('text');
    const label = formGroup.childNodes[0];
    expect(label.getAttribute('for')).toEqual(OPTIONS.id);
    expect(label.innerHTML).toEqual(OPTIONS.label); // This is a required field so should NOT include the suffix
    expect(formGroup.children.length).toEqual(2); // Just the label and input
  });

  it('should include a hint where specified', async () => {
    const OPTIONS = {
      id: 'fieldId',
      label: 'Field label',
      required: true,
      hint: 'This field needs to be completed.'
    };
    const CHILD_ID = 'child';
    const { container } = render(
      <FormGroup data-testid={OPTIONS.id} {...OPTIONS}>
        <input data-testid={CHILD_ID} type="text" />
      </FormGroup>
    );
    const formGroup = checkSetup(container, OPTIONS.id);
    expect(formGroup.classList).not.toContain(`${DEFAULT_CLASS}--error`);
    const input = getByTestId(formGroup, CHILD_ID);
    expect(input.type).toEqual('text');
    const label = formGroup.childNodes[0];
    expect(label.getAttribute('for')).toEqual(OPTIONS.id);
    expect(label.innerHTML).toEqual(OPTIONS.label); // This is a required field so should NOT include the suffix
    const hint = formGroup.childNodes[1]; // Second child.
    expect(hint.innerHTML).toEqual(OPTIONS.hint);
    expect(formGroup.children.length).toEqual(3); // The label, the hint, and input
  });

  it('should include an error where specified', async () => {
    const OPTIONS = {
      id: 'fieldId',
      label: 'Field label',
      required: true,
      error: 'Field label is required'
    };
    const CHILD_ID = 'child';
    const { container } = render(
      <FormGroup data-testid={OPTIONS.id} {...OPTIONS}>
        <input data-testid={CHILD_ID} type="text" />
      </FormGroup>
    );
    const formGroup = checkSetup(container, OPTIONS.id);
    expect(formGroup.classList).toContain(`${DEFAULT_CLASS}--error`);
    const input = getByTestId(formGroup, CHILD_ID);
    expect(input.type).toEqual('text');
    const label = formGroup.childNodes[0];
    expect(label.getAttribute('for')).toEqual(OPTIONS.id);
    expect(label.innerHTML).toEqual(OPTIONS.label); // This is a required field so should NOT include the suffix
    const error = formGroup.childNodes[1]; // Second child.
    expect(error.innerHTML).toContain('Error:'); // Visually-hidden
    expect(error.innerHTML).toContain(OPTIONS.error);
    expect(formGroup.children.length).toEqual(3); // The label, the error, and input
  });

  it('should include a hint and an error where specified', async () => {
    const OPTIONS = {
      id: 'fieldId',
      label: 'Field label',
      required: true,
      hint: 'This field needs to be completed.',
      error: 'Field label is required'
    };
    const CHILD_ID = 'child';
    const { container } = render(
      <FormGroup data-testid={OPTIONS.id} {...OPTIONS}>
        <input data-testid={CHILD_ID} type="text" />
      </FormGroup>
    );
    const formGroup = checkSetup(container, OPTIONS.id);
    expect(formGroup.classList).toContain(`${DEFAULT_CLASS}--error`);
    const input = getByTestId(formGroup, CHILD_ID);
    expect(input.type).toEqual('text');
    const label = formGroup.childNodes[0];
    expect(label.getAttribute('for')).toEqual(OPTIONS.id);
    expect(label.innerHTML).toEqual(OPTIONS.label); // This is a required field so should NOT include the suffix
    const hint = formGroup.childNodes[1]; // Second child.
    expect(hint.innerHTML).toEqual(OPTIONS.hint);
    const error = formGroup.childNodes[2]; // Third child.
    expect(error.innerHTML).toContain('Error:'); // Visually-hidden
    expect(error.innerHTML).toContain(OPTIONS.error);
    expect(formGroup.children.length).toEqual(4); // All of the possible components
  });

});
