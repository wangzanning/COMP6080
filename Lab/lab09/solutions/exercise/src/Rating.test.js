import React from 'react';
import { shallow } from 'enzyme';

import { Rating } from './Rating';

describe('Rating component', () => {

  it('displays 0 filled in circles if the rating is 0', () => {
    const wrapper = shallow(<Rating value={0} size={5} />);
    expect(wrapper.find('.filled')).toHaveLength(0);
  });

  it('displays 4 filled in circles if the rating is 4', () => {
    const wrapper = shallow(<Rating value={4} size={5} />);
    expect(wrapper.find('.filled')).toHaveLength(4);
  });

  it('displays 4 filled in circles if the rating is 4.5', () => {
    const wrapper = shallow(<Rating value={4.5} size={5} />);
    expect(wrapper.find('.filled')).toHaveLength(4);
  });

  it('displays 5 filled in circles if the rating is 5', () => {
    const wrapper = shallow(<Rating value={5} size={5} />);
    expect(wrapper.find('.filled')).toHaveLength(5);
  });

});
