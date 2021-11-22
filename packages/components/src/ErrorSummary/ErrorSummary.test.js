// Global imports
import React from 'react';
import { getByTestId, render } from '@testing-library/react';

// Local imports
import ErrorSummary, { DEFAULT_CLASS, DEFAULT_ID, DEFAULT_TITLE } from './ErrorSummary';

describe('ErrorSummary', () => {

  const checkSetup = (container, testId, classBlock) => {
    const errorSummary = getByTestId(container, testId);
    expect(errorSummary.classList).toContain(classBlock);
    const title = errorSummary.childNodes[0];
    expect(title.tagName).toEqual('H2');
    expect(title.classList).toContain(`${classBlock}__title`);
    const body = errorSummary.childNodes[1];
    expect(body.tagName).toEqual('DIV');
    expect(body.classList).toContain(`${classBlock}__body`);
    const list = body.childNodes[0];
    expect(list.tagName).toEqual('UL');
    expect(list.classList).toContain('govuk-list');
    expect(list.classList).toContain(`${classBlock}__list`);
    return { errorSummary, title, body, list };
  };

  it('should set the default title', () => {
    const ID = 'summaryId';
    const ERRORS = [];
    const { container } = render(
      <ErrorSummary data-testid={ID} errors={ERRORS} />
    );
    const { errorSummary, title, list } = checkSetup(container, ID, DEFAULT_CLASS);
    expect(errorSummary.id).toEqual(DEFAULT_ID);
    expect(title.id).toEqual(`${DEFAULT_ID}-title`);
    expect(title.innerHTML).toContain(DEFAULT_TITLE);
    expect(list.childNodes.length).toEqual(0);
  });

  it('should accept a title parameter', () => {
    const ID = 'summaryId';
    const TITLE = 'Oops, you did it again';
    const ERRORS = [];
    const { container } = render(
      <ErrorSummary data-testid={ID} title={TITLE} errors={ERRORS} />
    );
    const { title, list } = checkSetup(container, ID, DEFAULT_CLASS);
    expect(title.innerHTML).toContain(TITLE);
    expect(list.childNodes.length).toEqual(0);
  });

  it('should accept an id parameter', () => {
    const ID = 'summaryId';
    const ERRORS = [];
    const { container } = render(
      <ErrorSummary data-testid={ID} id={ID} errors={ERRORS} />
    );
    const { errorSummary, title } = checkSetup(container, ID, DEFAULT_CLASS);
    expect(errorSummary.id).toEqual(ID);
    expect(title.id).toEqual(`${ID}-title`);
  });

  it('should display a list item for each error', () => {
    const ID = 'summaryId';
    const ERRORS = [
      { id: 'fieldA', error: 'Field A is required' },
      { id: 'fieldB', error: 'Field B is invalid in some interesting way' }
    ];
    const { container } = render(
      <ErrorSummary data-testid={ID} errors={ERRORS} />
    );
    const { list } = checkSetup(container, ID, DEFAULT_CLASS);
    expect(list.childNodes.length).toEqual(ERRORS.length);
    ERRORS.forEach((error, index) => {
      const item = list.childNodes[index];
      expect(item.tagName).toEqual('LI');
      const link = item.childNodes[0];
      expect(link.tagName).toEqual('A');
      expect(link.getAttribute('href')).toEqual(`#${error.id}`);
      expect(link.innerHTML).toEqual(error.error);
    });
  });

});
