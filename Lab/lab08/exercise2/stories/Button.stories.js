 import React from 'react';

import { Button } from './Button';

export default {
  title: 'Example/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Button',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: 'Button',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'Button',
};

 //implement a new components called extremeSmall button
 export const extremeSmall = Template.bind({});
 extremeSmall.args = {
   size: '5px',
   label: 'Button',
   backgroundColor: 'Green',
   color: 'rgb(255,255,255)',
   opacity:'0.5',
   border: 'white'
 };

 //implement a new components called extremeSmall button
 export const extremeLarge = Template.bind({});
 extremeLarge.args = {
   size: 'large',
   label: 'Button',
   backgroundColor: 'red',
   color: 'rgb(1,1,1)',
   opacity:'0.5',
   border: 'black'
 };