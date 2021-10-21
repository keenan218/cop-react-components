import React from 'react';
import { getByTestId, render } from '@testing-library/react';
import Label from './Label';

describe('Label', () => {

  const checkSetup = (container, testId, required) => {
    const label = getByTestId(container, testId);
    expect(label.getAttribute('for')).toEqual(testId);
    expect(label.classList).toContain('govuk-label');
    if (required) {
      expect(label.classList).toContain('field-required');
    } else {
      expect(label.classList).not.toContain('field-required');
    }
    return label;
  };

  it('should display the appropriate text in the label', async () => {
    const LABEL_ID = 'opt';
    const LABEL_TEXT = 'Optional label';
    const { container } = render(
      <Label data-testid={LABEL_ID} id={LABEL_ID}>{LABEL_TEXT}</Label>
    );
    const label = checkSetup(container, LABEL_ID, false);
    expect(label.innerHTML).toEqual(LABEL_TEXT);
  });

  it('should have the appropriate CSS class set up when required', async () => {
    const LABEL_ID = 'req';
    const LABEL_TEXT = 'Required label';
    const { container } = render(
      <Label data-testid={LABEL_ID} id={LABEL_ID} required={true}>{LABEL_TEXT}</Label>
    );
    const label = checkSetup(container, LABEL_ID, true);
    expect(label.innerHTML).toEqual(LABEL_TEXT);
  });

  it('should appropriately embed HTML as a child', async () => {
    const LABEL_ID = 'embed';
    const INNER_DIV_ID = 'inner-div';
    const INNER_DIV_TEXT = 'Inner div text';
    const LABEL_MARKUP = <div data-testid={INNER_DIV_ID}>
      {INNER_DIV_TEXT}
    </div>;
    const { container } = render(
      <Label data-testid={LABEL_ID} id={LABEL_ID}>{LABEL_MARKUP}</Label>
    );
    const label = checkSetup(container, LABEL_ID, false);
    const innerDiv = getByTestId(label, INNER_DIV_ID);
    expect(innerDiv.innerHTML).toEqual(INNER_DIV_TEXT);
  });

});
