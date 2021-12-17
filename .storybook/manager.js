// Global imports
import { addons } from '@storybook/addons';

// Local imports
import GovUKTheme from './govuk-theme';

addons.setConfig({
  theme: GovUKTheme,
  sidebar: {
    showRoots: true
  },
  isToolshown: false,
  initialActive: 'docs'
});
