import React from 'react';
import { shallow } from 'enzyme';

import { ProductCard } from './ProductCard';
import { Stepper } from './Stepper';
import bike3 from './images/bike3.jpg';

const testItem = {
  id: 'glow-in-the-dark-bike',
  image: bike3,
  title: 'Glow in the dark bike',
  price: 50,
  currency: 'AUD',
  descriptions: [
    'Have no more fear during your nightly bike rights, our latest glow-in-the-dark model ensures maximum visibility for maximum safety.',
    'More colours coming soon in 2021.'
  ],
  recommendationRatio: 0.75,
};

describe('ProductCard component', () => {

  it('displays an image', () => {
    const wrapper = shallow(<ProductCard item={testItem} onAddToCart={() => {}} />);
    expect(wrapper.find('img')).toHaveLength(1);
  });

  it('displays an image with an alt tag', () => {
    const wrapper = shallow(<ProductCard item={testItem} onAddToCart={() => {}} />);
    expect(wrapper.find('img').prop('alt')).toEqual(testItem.title);
  });

  it('displays a title', () => {
    const wrapper = shallow(<ProductCard item={testItem} onAddToCart={() => {}} />);
    expect(wrapper.find('.title').text()).toEqual(testItem.title);
  });

  it('displays a price with a currency', () => {
    const wrapper = shallow(<ProductCard item={testItem} onAddToCart={() => {}} />);
    expect(wrapper.find('.price').text()).toEqual(`$${testItem.price.toFixed(2)} ${testItem.currency}`);
  });

  it('displays a discounted price with a currency', () => {
    const discount = 0.2;
    const discountedPrice = testItem.price - (testItem.price * discount);
    const wrapper = shallow(<ProductCard item={testItem} onAddToCart={() => {}} discount={discount} />);
    expect(wrapper.find('.price').text()).toEqual(`$${discountedPrice.toFixed(2)} ${testItem.currency}`);
  });

  it('displays all descriptions', () => {
    const wrapper = shallow(<ProductCard item={testItem} onAddToCart={() => { }} />);
    expect(wrapper.find('.description')).toHaveLength(testItem.descriptions.length);
  });

  it('displays a rating text', () => {
    const recommendationRatio = testItem.recommendationRatio * 100;
    const wrapper = shallow(<ProductCard item={testItem} onAddToCart={() => { }} />);
    expect(wrapper.find('.recommended').text()).toEqual(`Highly recommended by ${recommendationRatio}% users`);
  });

  it('updates the quantity', () => {
    let quantity, item;

    const wrapper = shallow(<ProductCard item={testItem} onAddToCart={(id, q) => { item = id; quantity = q; }} />);
    const stepper = wrapper.find(Stepper).shallow();

    stepper.find('.plus').simulate('click');
    wrapper.find('.add-to-cart').simulate('click');

    expect(quantity).toEqual(1);
    expect(item).toEqual(testItem.id);
  });

});
