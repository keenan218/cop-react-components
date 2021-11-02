import React from 'react';
import { getByTestId, render } from '@testing-library/react';
import Panel, { DEFAULT_CLASS } from './Panel';

describe('Panel', () => {

  const checkSetup = (container, testId) => {
    const panel = getByTestId(container, testId);
    expect(panel.classList).toContain(DEFAULT_CLASS);
    const firstChild = panel.childNodes[0];
    expect(firstChild.tagName).toEqual('H1');
    expect(firstChild.classList).toContain(`${DEFAULT_CLASS}__title`);
    const secondChild = panel.childNodes[1];
    expect(secondChild.tagName).toEqual('DIV');
    expect(secondChild.classList).toContain(`${DEFAULT_CLASS}__body`);
    return { panel, firstChild, secondChild };
  };

  it('should display the appropriate title text in the panel', async () => {
    const PANEL_ID = 'panel';
    const PANEL_TITLE = 'Hello world!'
    const PANEL_TEXT = `Here's some important information for you`;
    const { container } = render(
      <Panel data-testid={PANEL_ID} title={PANEL_TITLE}>{PANEL_TEXT}</Panel>
    );
    const { firstChild, secondChild } = checkSetup(container, PANEL_ID);
    expect(firstChild.innerHTML).toEqual(PANEL_TITLE);
    expect(secondChild.innerHTML).toEqual(PANEL_TEXT);
  });

  it('should appropriately support classModifiers', async () => {
    const PANEL_ID = 'modifiers';
    const PANEL_TITLE = 'Breaking news';
    const PANEL_TEXT = 'Something useful and interesting';
    const CLASS_MODIFIERS = ['warning', 'test'];
    const { container } = render(
      <Panel data-testid={PANEL_ID} title={PANEL_TITLE} classModifiers={CLASS_MODIFIERS}>{PANEL_TEXT}</Panel>
    );
    const { panel } = checkSetup(container, PANEL_ID);
    CLASS_MODIFIERS.forEach(cm => {
      expect(panel.classList).toContain(`${DEFAULT_CLASS}--${cm}`);
    });
  });

});
