//<!--z5224151	Zangning Wang-->
// <!--2020.11.01	Monday-->
// <!--Lab08-exercise2-->

import React from 'react';

import { Input } from './Input';

export default {
  title: 'Example/Input',
  component: Input,
  // argTypes: {
  //   // width: '30',
  //   // align: 'right',
  //
  // },
};

const Template = (args) => <Input {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  size: '30',
  // label: 'Input',
};

export const Secondary = Template.bind({});
Secondary.args = {
  // label: 'Input',
  size: '40',
};