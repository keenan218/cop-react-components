import React from 'react';
import { fireEvent, getByTestId, render } from '@testing-library/react';
import Autocomplete, { DEFAULT_CLASS } from './Autocomplete';
import * as TextInput from '../TextInput/TextInput';

describe('Autocomplete', () => {
  const checkOuterWrapper = (element) => {
    expect(element.classList).toContain(`${DEFAULT_CLASS}__outer-wrapper`);
    return element;
  };
  const getChildElement = (autocomplete, tagName) => {
    let child;
    autocomplete.childNodes.forEach(element => {
      if (element.tagName === tagName) {
        child = element;
      }
    });
    return child;
  };

  it('should handle the disabled flag appropriately', async () => {
    const AUTOCOMPLETE_ID = 'autocompleteId';
    const AUTOCOMPLETE_FIELD_ID = 'autocompleteFieldId';
    const AUTOCOMPLETE_TEST_ID = 'autocompleteTestId';
    const VALUE = 'Autocomplete value';
    const OPTIONS = {
      id: AUTOCOMPLETE_ID,
      fieldId: AUTOCOMPLETE_FIELD_ID,
      value: VALUE,
      source: [],
      disabled: true
    };
    const { container } = render(
      <Autocomplete data-testid={AUTOCOMPLETE_TEST_ID} {...OPTIONS} />
    );
    const autocomplete = getByTestId(container, AUTOCOMPLETE_TEST_ID);
    expect(autocomplete.classList).toContain(TextInput.DEFAULT_CLASS);
    expect(autocomplete.tagName).toEqual('INPUT');
    expect(autocomplete.type).toEqual('text');
    expect(autocomplete.value).toEqual(VALUE);
    expect(autocomplete.id).toEqual(AUTOCOMPLETE_ID);
    expect(autocomplete.name).toEqual(AUTOCOMPLETE_FIELD_ID);
    const outerWrapper = checkOuterWrapper(autocomplete.parentNode);
    expect(outerWrapper.classList).not.toContain('error');
  });

  it('should handle an enabled control and have a fully wired-up autocomplete', async () => {
    const AUTOCOMPLETE_ID = 'autocompleteId';
    const AUTOCOMPLETE_FIELD_ID = 'autocompleteFieldId';
    const VALUE = 'Autocomplete value';
    const OPTIONS = {
      id: AUTOCOMPLETE_ID,
      fieldId: AUTOCOMPLETE_FIELD_ID,
      value: VALUE,
      source: [],
      disabled: false
    };
    const { container } = render(
      <Autocomplete {...OPTIONS} />
    );
    // getByTestId doesn't work as the AlphaGov autocomplete ignores unknown attributes.
    const outerWrapper = checkOuterWrapper(container.childNodes[0]);
    expect(outerWrapper.classList).not.toContain('error');
    const autocomplete = outerWrapper.childNodes[0];
    expect(autocomplete.classList).toContain(`${DEFAULT_CLASS}__wrapper`);
    expect(autocomplete.tagName).toEqual('DIV');
    const input = getChildElement(autocomplete, 'INPUT');
    expect(input.classList).toContain(`${DEFAULT_CLASS}__input`);
    expect(input.type).toEqual('text');
    expect(input.getAttribute('role')).toEqual('combobox');
    expect(input.value).toEqual(VALUE);
    expect(input.id).toEqual(AUTOCOMPLETE_ID);
    expect(input.getAttribute('aria-autocomplete')).toEqual('list');
    const menu = getChildElement(autocomplete, 'UL');
    expect(menu.classList).toContain(`${DEFAULT_CLASS}__menu`);
    expect(menu.getAttribute('role')).toEqual('listbox');
    expect(menu.id).toEqual(`${AUTOCOMPLETE_ID}__listbox`);
    const hint = getChildElement(autocomplete, 'SPAN');
    expect(hint.id).toEqual(`${AUTOCOMPLETE_ID}__assistiveHint`);

    // The input should be linked to the menu and hint.
    expect(input.getAttribute('aria-owns')).toEqual(menu.id);
    expect(input.getAttribute('aria-describedby')).toEqual(hint.id);
  });

  it('should handle the disabled and error flags appropriately', async () => {
    const AUTOCOMPLETE_ID = 'autocompleteId';
    const AUTOCOMPLETE_FIELD_ID = 'autocompleteFieldId';
    const AUTOCOMPLETE_TEST_ID = 'autocompleteTestId';
    const VALUE = 'Autocomplete value';
    const OPTIONS = {
      id: AUTOCOMPLETE_ID,
      fieldId: AUTOCOMPLETE_FIELD_ID,
      value: VALUE,
      source: [],
      disabled: true,
      error: 'Error'
    };
    const { container } = render(
      <Autocomplete data-testid={AUTOCOMPLETE_TEST_ID} {...OPTIONS} />
    );
    const autocomplete = getByTestId(container, AUTOCOMPLETE_TEST_ID);
    expect(autocomplete.classList).toContain(TextInput.DEFAULT_CLASS);
    expect(autocomplete.classList).toContain(`${TextInput.DEFAULT_CLASS}--error`);
    const outerWrapper = checkOuterWrapper(autocomplete.parentNode);
    expect(outerWrapper.classList).toContain('error');
  });

  it('should handle an enabled control with an error', async () => {
    const AUTOCOMPLETE_ID = 'autocompleteId';
    const AUTOCOMPLETE_FIELD_ID = 'autocompleteFieldId';
    const VALUE = 'Autocomplete value';
    const OPTIONS = {
      id: AUTOCOMPLETE_ID,
      fieldId: AUTOCOMPLETE_FIELD_ID,
      value: VALUE,
      source: [],
      disabled: false,
      error: 'Error'
    };
    const { container } = render(
      <Autocomplete {...OPTIONS} />
    );
    // getByTestId doesn't work as the AlphaGov autocomplete ignores unknown attributes.
    const outerWrapper = checkOuterWrapper(container.childNodes[0]);
    expect(outerWrapper.classList).toContain('error');
    const autocomplete = outerWrapper.childNodes[0];
    expect(autocomplete.classList).toContain(`${DEFAULT_CLASS}__wrapper`);
  });

  it('should show menu with appropriate options when searching', async () => {
    const AUTOCOMPLETE_ID = 'autocompleteId';
    const AUTOCOMPLETE_FIELD_ID = 'autocompleteFieldId';
    const SOURCE = [
      { id: 'a', name: 'apple' },
      { id: 'b', name: 'banana' },
      { id: 'c', name: 'cherry' },
      { id: 'd', name: 'DURIAN' }
    ];
    const STRUCTURE = { value: 'id', label: 'name' };
    const OPTIONS = {
      id: AUTOCOMPLETE_ID,
      fieldId: AUTOCOMPLETE_FIELD_ID,
      source: SOURCE,
      item: STRUCTURE
    };
    const { container } = render(
      <Autocomplete {...OPTIONS} />
    );
    const outerWrapper = checkOuterWrapper(container.childNodes[0]);
    const autocomplete = outerWrapper.childNodes[0];
    const input = getChildElement(autocomplete, 'INPUT');
    const menu = getChildElement(autocomplete, 'UL');
    expect(menu.classList).toContain(`${DEFAULT_CLASS}__menu--hidden`);
    expect(menu.classList).not.toContain(`${DEFAULT_CLASS}__menu--visible`);
    fireEvent.change(input, { target: { value: 'n' } });
    expect(menu.classList).not.toContain(`${DEFAULT_CLASS}__menu--hidden`);
    expect(menu.classList).toContain(`${DEFAULT_CLASS}__menu--visible`);
    expect(menu.childNodes.length).toEqual(2);
    expect(menu.childNodes[0].tagName).toEqual('LI');
    expect(menu.childNodes[0].innerHTML).toEqual('banana');
    expect(menu.childNodes[1].innerHTML).toEqual('DURIAN');
  });

  it('should make appropriate selection when clicking on menu option', async () => {
    const AUTOCOMPLETE_ID = 'autocompleteId';
    const AUTOCOMPLETE_FIELD_ID = 'autocompleteFieldId';
    const SOURCE = [
      { id: 'a', name: 'apple' },
      { id: 'b', name: 'banana' },
      { id: 'c', name: 'cherry' },
      { id: 'd', name: 'DURIAN' }
    ];
    const STRUCTURE = { value: 'id', label: 'name' };
    let selection;
    const OPTIONS = {
      id: AUTOCOMPLETE_ID,
      fieldId: AUTOCOMPLETE_FIELD_ID,
      source: SOURCE,
      item: STRUCTURE,
      onChange: (e) => {
        selection = e.target.value;
      }
    };
    const { container } = render(
      <Autocomplete {...OPTIONS} />
    );
    const outerWrapper = checkOuterWrapper(container.childNodes[0]);
    const autocomplete = outerWrapper.childNodes[0];
    const input = getChildElement(autocomplete, 'INPUT');
    const menu = getChildElement(autocomplete, 'UL');

    // Do the search.
    fireEvent.change(input, { target: { value: 'n' } });
    expect(menu.classList).not.toContain(`${DEFAULT_CLASS}__menu--hidden`);
    expect(menu.classList).toContain(`${DEFAULT_CLASS}__menu--visible`);
    
    // And now the click.
    expect(selection).toBeUndefined();
    fireEvent.click(menu.childNodes[0], {});
    expect(selection).toEqual({ id: 'b', name: 'banana' });

    // And the menu should have hidden again.
    expect(menu.classList).toContain(`${DEFAULT_CLASS}__menu--hidden`);
    expect(menu.classList).not.toContain(`${DEFAULT_CLASS}__menu--visible`);
  });
});