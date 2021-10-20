import React from 'react';
import Label from './Label';

export default {
  title: 'Atoms/Label',
  component: Label,
};

const Template = (args) => <Label {...args}>{args.label}</Label>;

export const Default = Template.bind({});
Default.args = {
  id: 'id',
  label: 'This is optional',
  required: false
};
export const Required = Template.bind({});
Required.args = {
  id: 'id',
  label: 'This is required',
  required: true
};
