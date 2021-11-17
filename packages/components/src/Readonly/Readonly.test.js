// Global imports
import React from 'react';
import { getByTestId, render } from '@testing-library/react';

// Local imports
import Readonly, { DEFAULT_CLASS } from './Readonly';

describe('Readonly', () => {

  it('should set up the component appropriately', async () => {
    const ID = 'readonly';
    const VALUE = 'Readonly text';
    const { container } = render(
      <Readonly data-testid={ID} id={ID}>{VALUE}</Readonly>
    );
    const readonly = getByTestId(container, ID);
    expect(readonly.tagName).toEqual('DIV');
    expect(readonly.classList).toContain(DEFAULT_CLASS);
    expect(readonly.innerHTML).toEqual(VALUE);
  });

  it('should accept the classBlock parameter', async () => {
    const ID = 'readonly';
    const VALUE = 'Readonly text';
    const CLASS_BLOCK = 'different-class-block';
    const { container } = render(
      <Readonly data-testid={ID} id={ID} classBlock={CLASS_BLOCK}>{VALUE}</Readonly>
    );
    const readonly = getByTestId(container, ID);
    expect(readonly.classList).toContain(CLASS_BLOCK);
    expect(readonly.innerHTML).toEqual(VALUE);
  });

  it('should accept the className parameter', async () => {
    const ID = 'readonly';
    const VALUE = 'Readonly text';
    const CLASS_NAME = 'different-class-name';
    const { container } = render(
      <Readonly data-testid={ID} id={ID} className={CLASS_NAME}>{VALUE}</Readonly>
    );
    const readonly = getByTestId(container, ID);
    expect(readonly.classList).toContain(DEFAULT_CLASS);
    expect(readonly.classList).toContain(CLASS_NAME);
    expect(readonly.innerHTML).toEqual(VALUE);
  });

  it('should accept the classModifiers parameter', async () => {
    const ID = 'readonly';
    const VALUE = 'Readonly text';
    const CLASS_MODIFIERS = ['mod1', 'mod2'];
    const { container } = render(
      <Readonly data-testid={ID} id={ID} classModifiers={CLASS_MODIFIERS}>{VALUE}</Readonly>
    );
    const readonly = getByTestId(container, ID);
    expect(readonly.classList).toContain(DEFAULT_CLASS);
    CLASS_MODIFIERS.forEach(mod => {
      expect(readonly.classList).toContain(`${DEFAULT_CLASS}--${mod}`);
    });
    expect(readonly.innerHTML).toEqual(VALUE);
  });

});
