import React from 'react';
import { fireEvent, getByTestId, render } from '@testing-library/react';
import Button, { DEFAULT_CLASS, START_BUTTON_LABEL, StartButton } from './Button';
import { DEFAULT_CLASS as LINK_DEFAULT_CLASS } from '../Link/Link';

describe('Button', () => {

  const checkSetup = (container, testId, dataModule = DEFAULT_CLASS) => {
    const button = getByTestId(container, testId);
    expect(button.classList).toContain(DEFAULT_CLASS);
    expect(button.getAttribute('data-module')).toEqual(dataModule);
    return button;
  };

  const checkIcon = (button) => {
    const icon = button.childNodes[1];
    expect(icon.tagName).toEqual('svg');
    expect(icon.classList).toContain(`${DEFAULT_CLASS}__start-icon`);
  };

  it('should display the appropriate text in the button', async () => {
    const BUTTON_ID = 'button';
    const BUTTON_TEXT = 'Save and continue';
    const { container } = render(
      <Button data-testid={BUTTON_ID}>{BUTTON_TEXT}</Button>
    );
    const button = checkSetup(container, BUTTON_ID);
    expect(button.innerHTML).toEqual(BUTTON_TEXT);
    expect(button.tagName).toEqual('BUTTON');
  });

  it('should render as an anchor when an href is provided', async () => {
    const BUTTON_ID = 'button';
    const BUTTON_HREF = 'http://homeoffice.gov.uk/';
    const BUTTON_TEXT = 'Save and continue';
    const { container } = render(
      <Button data-testid={BUTTON_ID} href={BUTTON_HREF}>{BUTTON_TEXT}</Button>
    );
    const button = checkSetup(container, BUTTON_ID, LINK_DEFAULT_CLASS);
    expect(button.innerHTML).toEqual(BUTTON_TEXT);
    expect(button.tagName).toEqual('A');
    expect(button.href).toEqual(BUTTON_HREF);
    expect(button.getAttribute('role')).toEqual('button');
  });

  it('should render a start button appropriately', async () => {
    const BUTTON_ID = 'startButton';
    const BUTTON_HREF = 'http://homeoffice.gov.uk/';
    const { container } = render(
      <StartButton data-testid={BUTTON_ID} href={BUTTON_HREF} />
    );
    const button = checkSetup(container, BUTTON_ID, LINK_DEFAULT_CLASS);
    expect(button.classList).toContain(`${DEFAULT_CLASS}--start`);
    expect(button.innerHTML).toContain(START_BUTTON_LABEL);
    expect(button.tagName).toEqual('A');
    expect(button.href).toEqual(BUTTON_HREF);
    expect(button.getAttribute('role')).toEqual('button');
    checkIcon(button);
  });

  it('should render a start icon when attribute is passed', async () => {
    const BUTTON_ID = 'distinctStart';
    const BUTTON_TEXT = 'Distinct start';
    const { container } = render(
      <Button data-testid={BUTTON_ID} start>{BUTTON_TEXT}</Button>
    );
    const button = checkSetup(container, BUTTON_ID);
    expect(button.classList).toContain(`${DEFAULT_CLASS}--start`);
    expect(button.innerHTML).toContain(BUTTON_TEXT);
    expect(button.tagName).toEqual('BUTTON');
    checkIcon(button);
  });

  it('should appropriately set up onClick handler', async () => {
    const BUTTON_ID = 'distinctStart';
    const BUTTON_TEXT = 'Distinct start';
    let clicks = 0;
    const ON_CLICK = (e) => {
      clicks++;
    };
    const { container } = render(
      <Button data-testid={BUTTON_ID} onClick={ON_CLICK}>{BUTTON_TEXT}</Button>
    );
    const button = checkSetup(container, BUTTON_ID);
    expect(button.innerHTML).toContain(BUTTON_TEXT);
    expect(button.tagName).toEqual('BUTTON');
    expect(clicks).toEqual(0);
    fireEvent.click(button, {});
    expect(clicks).toEqual(1);
  });

  it('should appropriately disable the button', async () => {
    const BUTTON_ID = 'distinctStart';
    const BUTTON_TEXT = 'Distinct start';
    let clicks = 0;
    const ON_CLICK = (e) => {
      clicks++;
    };
    const { container } = render(
      <Button data-testid={BUTTON_ID} onClick={ON_CLICK} disabled>{BUTTON_TEXT}</Button>
    );
    const button = checkSetup(container, BUTTON_ID);
    expect(button.classList).toContain(`${DEFAULT_CLASS}--disabled`);
    expect(button.disabled).toEqual(true);
    expect(button.getAttribute('aria-disabled')).toEqual('true');
    expect(button.innerHTML).toContain(BUTTON_TEXT);
    expect(button.tagName).toEqual('BUTTON');
    expect(clicks).toEqual(0);
    fireEvent.click(button, {});
    expect(clicks).toEqual(0);
  });

});
