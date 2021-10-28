import React from 'react';
import { getByTestId, render } from '@testing-library/react';
import Link, { DEFAULT_CLASS } from './Link';

describe('Link', () => {

  const checkSetup = (container, testId) => {
    const link = getByTestId(container, testId);
    expect(link.classList).toContain(DEFAULT_CLASS);
    expect(link.getAttribute('data-module')).toEqual(DEFAULT_CLASS);
    return link;
  };

  it('should display the appropriate text in the link and have the correct href', async () => {
    const LINK_ID = 'link';
    const LINK_HREF = 'http://homeoffice.gov.uk/';
    const LINK_TEXT = `Here's some important information for you`;
    const { container } = render(
      <Link data-testid={LINK_ID} href={LINK_HREF}>{LINK_TEXT}</Link>
    );
    const link = checkSetup(container, LINK_ID);
    expect(link.innerHTML).toEqual(LINK_TEXT);
    expect(link.href).toEqual(LINK_HREF);
  });

  it('should appropriately support classModifiers', async () => {
    const LINK_ID = 'link';
    const LINK_HREF = 'http://homeoffice.gov.uk/';
    const LINK_TEXT = `Here's some important information for you`;
    const CLASS_MODIFIERS = ['warning', 'test'];
    const { container } = render(
      <Link data-testid={LINK_ID} href={LINK_HREF} classModifiers={CLASS_MODIFIERS}>{LINK_TEXT}</Link>
    );
    const link = checkSetup(container, LINK_ID);
    expect(link.innerHTML).toEqual(LINK_TEXT);
    expect(link.href).toEqual(LINK_HREF);
    CLASS_MODIFIERS.forEach(cm => {
      expect(link.classList).toContain(`${DEFAULT_CLASS}--${cm}`);
    });
  });

  it('should appropriately support an additional role attribute', async () => {
    const LINK_ID = 'link';
    const LINK_HREF = 'http://homeoffice.gov.uk/';
    const LINK_TEXT = `Here's some important information for you`;
    const LINK_ROLE = 'button';
    const { container } = render(
      <Link data-testid={LINK_ID} href={LINK_HREF} role={LINK_ROLE}>{LINK_TEXT}</Link>
    );
    const link = checkSetup(container, LINK_ID);
    expect(link.innerHTML).toEqual(LINK_TEXT);
    expect(link.href).toEqual(LINK_HREF);
    expect(link.getAttribute('role')).toEqual(LINK_ROLE);
  });

});
