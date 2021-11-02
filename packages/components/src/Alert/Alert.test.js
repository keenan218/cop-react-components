import React from 'react';
import { getByTestId, render } from '@testing-library/react';
import Alert, { DEFAULT_CLASS } from './Alert';

describe('Alert', () => {

  const checkSetup = (container, testId) => {
    const alert = getByTestId(container, testId);
    expect(alert.classList).toContain(DEFAULT_CLASS);
    const firstChild = alert.childNodes[0];
    expect(firstChild.tagName).toEqual('H2');
    expect(firstChild.classList).toContain(`${DEFAULT_CLASS}__heading`);
    const secondChild = alert.childNodes[1];
    expect(secondChild.tagName).toEqual('P');
    return { alert, firstChild, secondChild };
  };

  it('should display the appropriate text in the alert', async () => {
    const ALERT_ID = 'alert';
    const ALERT_HEADING = 'Hello world!'
    const ALERT_TEXT = `Don't panic!`;
    const { container } = render(
      <Alert data-testid={ALERT_ID} heading={ALERT_HEADING}>{ALERT_TEXT}</Alert>
    );
    const { firstChild, secondChild } = checkSetup(container, ALERT_ID);
    expect(firstChild.innerHTML).toEqual(ALERT_HEADING);
    expect(secondChild.innerHTML).toEqual(ALERT_TEXT);
  });

  it('should appropriately support classModifiers', async () => {
    const ALERT_ID = 'modifiers';
    const ALERT_HEADING = 'It worked!'
    const ALERT_TEXT = 'Great news, everyone.';
    const CLASS_MODIFIERS = ['success', 'test'];
    const { container } = render(
      <Alert data-testid={ALERT_ID} heading={ALERT_HEADING} classModifiers={CLASS_MODIFIERS}>{ALERT_TEXT}</Alert>
    );
    const { alert } = checkSetup(container, ALERT_ID);
    CLASS_MODIFIERS.forEach(cm => {
      expect(alert.classList).toContain(`${DEFAULT_CLASS}--${cm}`);
    });
  });

});
