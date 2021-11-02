import React from 'react';
import { getByTestId, render } from '@testing-library/react';
import Button from '../Button';
import ButtonGroup, { DEFAULT_CLASS } from './ButtonGroup';
import Link from '../Link';

describe('ButtonGroup', () => {

  const checkSetup = (container, testId) => {
    const buttonGroup = getByTestId(container, testId);
    expect(buttonGroup.classList).toContain(DEFAULT_CLASS);
    return buttonGroup;
  };

  it('should handle button children appropriately', async () => {
    const GROUP_ID = 'buttonGroup';
    const BUTTON_LABELS = ['Save and continue', 'Save as draft'];
    const { container } = render(
      <ButtonGroup data-testid={GROUP_ID}>
        {BUTTON_LABELS.map(label => (
          <Button key={label}>{label}</Button>
        ))}
      </ButtonGroup>
    );
    const buttonGroup = checkSetup(container, GROUP_ID);
    expect(buttonGroup.childNodes.length).toEqual(BUTTON_LABELS.length);
    BUTTON_LABELS.forEach((label, index) => {
      const button = buttonGroup.childNodes[index];
      expect(button.innerHTML).toEqual(label);
      expect(button.tagName).toEqual('BUTTON');
    });
  });

  it('should handle link children appropriately', async () => {
    const GROUP_ID = 'buttonGroup';
    const LINK_LABELS = ['Save and continue', 'Save as draft'];
    const { container } = render(
      <ButtonGroup data-testid={GROUP_ID}>
        {LINK_LABELS.map(label => (
          <Button key={label} href="#">{label}</Button>
        ))}
      </ButtonGroup>
    );
    const buttonGroup = checkSetup(container, GROUP_ID);
    expect(buttonGroup.childNodes.length).toEqual(LINK_LABELS.length);
    LINK_LABELS.forEach((label, index) => {
      const link = buttonGroup.childNodes[index];
      expect(link.innerHTML).toEqual(label);
      expect(link.tagName).toEqual('A');
    });
  });

  it('should handle a mixture of buttons and links appropriately', async () => {
    const GROUP_ID = 'buttonGroup';
    const FIRST_CHILD = <Button>Save and continue</Button>;
    const SECOND_CHILD = <Button classModifiers="secondary">Save as draft</Button>;
    const THIRD_LINK = <Link href="#">Cancel</Link>;
    const { container } = render(
      <ButtonGroup data-testid={GROUP_ID}>
        {FIRST_CHILD}
        {SECOND_CHILD}
        {THIRD_LINK}
      </ButtonGroup>
    );
    const buttonGroup = checkSetup(container, GROUP_ID);
    expect(buttonGroup.childNodes.length).toEqual(3);
    expect(buttonGroup.childNodes[0].innerHTML).toEqual('Save and continue');
    expect(buttonGroup.childNodes[0].tagName).toEqual('BUTTON');
    expect(buttonGroup.childNodes[1].innerHTML).toEqual('Save as draft');
    expect(buttonGroup.childNodes[1].tagName).toEqual('BUTTON');
    expect(buttonGroup.childNodes[2].innerHTML).toEqual('Cancel');
    expect(buttonGroup.childNodes[2].tagName).toEqual('A');
  });

});
