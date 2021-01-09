import React from 'react';
import { shallow } from 'enzyme';

import { Stepper } from './Stepper';

const value = 3;

describe('Stepper component', () => {

  it('displays the correct value', () => {
    const wrapper = shallow(<Stepper value={3} onUpdate={() => {}} />);
    expect(wrapper.find('.value')).toHaveLength(1);
    expect(wrapper.find('.value').text()).toEqual('3');
  });

  it('decrements the value', () => {
    const wrapper = shallow(<Stepper value={value} onUpdate={v => { value = v }} />);
    wrapper.find('.minus').simulate('click');
    expect(value).toEqual(value - 1);
  });

  it('increments the value', () => {
    const wrapper = shallow(<Stepper value={value} onUpdate={v => { value = v }} />);
    wrapper.find('.plus').simulate('click');
    expect(value).toEqual(value + 1);
  });

});
