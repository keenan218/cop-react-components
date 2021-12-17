// Global imports
import React from 'react';
import { getByTestId, render } from '@testing-library/react';

// Local imports
import Heading, { LargeHeading, MediumHeading, SmallHeading, XLargeHeading } from './Heading';

describe('Heading', () => {
  it(`should default to size of 'l'`, () => {
    const ID = 'headingId';
    const TEXT = 'Heading text';
    const { container } = render(
      <Heading data-testid={ID}>{TEXT}</Heading>
    );
    const heading = getByTestId(container, ID);
    expect(heading.tagName).toEqual('H2');
    expect(heading.innerHTML).toContain(TEXT);
    expect(heading.classList).toContain('govuk-heading-l');
  });

  describe('known sizes', () => {
    // s, m, l, and xl are known sizes
    ['s', 'm', 'l', 'xl'].forEach(size => {
      it(`should accept ${size} as a known size`, () => {
        const ID = 'headingId';
        const TEXT = 'Heading text';
        const { container } = render(
          <Heading data-testid={ID} size={size}>{TEXT}</Heading>
        );
        const heading = getByTestId(container, ID);
        expect(heading.innerHTML).toContain(TEXT);
        expect(heading.classList).toContain(`govuk-heading-${size}`);
      });
    });
  });

  describe('unknown sizes', () => {
    const spy = { console: undefined };
    const errorMessages = [];
    beforeEach(() => {
      spy.console = jest.spyOn(console, 'error').mockImplementation((message, ...optionalParams) => {
        errorMessages.push({ ...optionalParams, message });
      });
    });
    afterEach(() => {
      spy.console.mockRestore();
      errorMessages.length = 0;
    });
    it('should reject a size other than the known ones', () => {
      const ID = 'headingId';
      const TEXT = 'Heading text';
      const SIZE = 'bob';
      render(
        <Heading data-testid={ID} size={SIZE}>{TEXT}</Heading>
      );
      expect(console.error).toHaveBeenCalled();
      expect(errorMessages.length).toEqual(1);
      expect(errorMessages[0][1]).toContain(`Invalid prop \`size\` of value \`${SIZE}\` supplied to \`Heading\``);
    });
  });
});

describe('XLargeHeading', () => {
  it('should render as an h1 with an appropriate class', () => {
    const ID = 'headingId';
    const TEXT = 'Heading text';
    const { container } = render(
      <XLargeHeading data-testid={ID}>{TEXT}</XLargeHeading>
    );
    const heading = getByTestId(container, ID);
    expect(heading.tagName).toEqual('H1');
    expect(heading.innerHTML).toContain(TEXT);
    expect(heading.classList).toContain('govuk-heading-xl');
  });
  it('should accept a caption where specified', () => {
    const ID = 'headingId';
    const TEXT = 'Heading text';
    const CAPTION = 'Caption text';
    const { container } = render(
      <XLargeHeading data-testid={ID} caption={CAPTION}>{TEXT}</XLargeHeading>
    );
    const heading = getByTestId(container, ID);
    expect(heading.tagName).toEqual('H1');
    expect(heading.innerHTML).toContain(TEXT);
    expect(heading.classList).toContain('govuk-heading-xl');
    expect(heading.childNodes.length).toEqual(2);
    const caption = heading.childNodes[0];
    expect(caption.tagName).toEqual('SPAN');
    expect(caption.innerHTML).toContain(CAPTION);
    expect(caption.classList).toContain('govuk-caption-xl');
  });
});

describe('LargeHeading', () => {
  it('should render as an h2 with an appropriate class', () => {
    const ID = 'headingId';
    const TEXT = 'Heading text';
    const { container } = render(
      <LargeHeading data-testid={ID}>{TEXT}</LargeHeading>
    );
    const heading = getByTestId(container, ID);
    expect(heading.tagName).toEqual('H2');
    expect(heading.innerHTML).toContain(TEXT);
    expect(heading.classList).toContain('govuk-heading-l');
  });
  it('should accept a caption where specified', () => {
    const ID = 'headingId';
    const TEXT = 'Heading text';
    const CAPTION = 'Caption text';
    const { container } = render(
      <LargeHeading data-testid={ID} caption={CAPTION}>{TEXT}</LargeHeading>
    );
    const heading = getByTestId(container, ID);
    expect(heading.tagName).toEqual('H2');
    expect(heading.innerHTML).toContain(TEXT);
    expect(heading.classList).toContain('govuk-heading-l');
    expect(heading.childNodes.length).toEqual(2);
    const caption = heading.childNodes[0];
    expect(caption.tagName).toEqual('SPAN');
    expect(caption.innerHTML).toContain(CAPTION);
    expect(caption.classList).toContain('govuk-caption-l');
  });
});

describe('MediumHeading', () => {
  it('should render as an h3 with an appropriate class', () => {
    const ID = 'headingId';
    const TEXT = 'Heading text';
    const { container } = render(
      <MediumHeading data-testid={ID}>{TEXT}</MediumHeading>
    );
    const heading = getByTestId(container, ID);
    expect(heading.tagName).toEqual('H3');
    expect(heading.innerHTML).toContain(TEXT);
    expect(heading.classList).toContain('govuk-heading-m');
  });
  it('should accept a caption where specified', () => {
    const ID = 'headingId';
    const TEXT = 'Heading text';
    const CAPTION = 'Caption text';
    const { container } = render(
      <MediumHeading data-testid={ID} caption={CAPTION}>{TEXT}</MediumHeading>
    );
    const heading = getByTestId(container, ID);
    expect(heading.tagName).toEqual('H3');
    expect(heading.innerHTML).toContain(TEXT);
    expect(heading.classList).toContain('govuk-heading-m');
    expect(heading.childNodes.length).toEqual(2);
    const caption = heading.childNodes[0];
    expect(caption.tagName).toEqual('SPAN');
    expect(caption.innerHTML).toContain(CAPTION);
    expect(caption.classList).toContain('govuk-caption-m');
  });
});

describe('SmallHeading', () => {
  it('should render as an h3 with an appropriate class', () => {
    const ID = 'headingId';
    const TEXT = 'Heading text';
    const { container } = render(
      <SmallHeading data-testid={ID}>{TEXT}</SmallHeading>
    );
    const heading = getByTestId(container, ID);
    expect(heading.tagName).toEqual('H3');
    expect(heading.innerHTML).toContain(TEXT);
    expect(heading.classList).toContain('govuk-heading-s');
  });
  it('should ignore a caption where specified', () => {
    const ID = 'headingId';
    const TEXT = 'Heading text';
    const CAPTION = 'Caption text';
    const { container } = render(
      <SmallHeading data-testid={ID} caption={CAPTION}>{TEXT}</SmallHeading>
    );
    const heading = getByTestId(container, ID);
    expect(heading.tagName).toEqual('H3');
    expect(heading.innerHTML).toContain(TEXT);
    expect(heading.classList).toContain('govuk-heading-s');
    expect(heading.childNodes.length).toEqual(1);
  });
});
