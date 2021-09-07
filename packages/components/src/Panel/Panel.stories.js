import React from 'react';

import Panel from './Panel';

export default {
  title: 'Atoms/Panel',
  component: Panel,
};

const Template = (args) => (
    <Panel {...args}>
      Your reference number<br/><strong>HDJ2123F</strong>
    </Panel>
  );

export const Default = Template.bind({});
Default.args = {
  title: 'Application complete',
};
