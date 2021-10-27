import React from 'react';
import { getByTestId, render } from '@testing-library/react';
import InsetText from './InsetText';

describe('InsetText', () => {

  const checkSetup = (container, testId) => {
    const insetText = getByTestId(container, testId);
    expect(insetText.classList).toContain('govuk-inset-text');
    return insetText;
  };

  it('should display the appropriate text', async () => {
    const TEXT_ID = 'indent';
    const TEXT = 'Hello Inset World';
    const { container } = render(
      <InsetText data-testid={TEXT_ID}>{TEXT}</InsetText>
    );
    const insetText = checkSetup(container, TEXT_ID);
    expect(insetText.innerHTML).toEqual(TEXT);
  });

  it('should display the appropriate markup', async () => {
    const TEXT_ID = 'markup';
    const INNER_DIV_ID = 'inner-div';
    const INNER_DIV_TEXT = 'Inner div text';
    const INNER_MARKUP = <div data-testid={INNER_DIV_ID}>
      {INNER_DIV_TEXT}
    </div>;
    const { container } = render(
      <InsetText data-testid={TEXT_ID}>{INNER_MARKUP}</InsetText>
    );
    const insetText = checkSetup(container, TEXT_ID);
    const innerDiv = getByTestId(insetText, INNER_DIV_ID);
    expect(innerDiv.innerHTML).toEqual(INNER_DIV_TEXT);
  });

});
