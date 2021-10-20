import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';
import { addDecorator, addParameters } from '@storybook/react';
import globalDecorator from './decorators';

addParameters({
  docs: {
    container: DocsContainer,
    page: DocsPage
  }
});

// global decorators
addDecorator(globalDecorator);
