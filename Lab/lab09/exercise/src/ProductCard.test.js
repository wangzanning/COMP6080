import { render, screen } from '@testing-library/react'
import { ProductCard } from './ProductCard'
import { shallow } from 'enzyme'
import { App } from './App'
import React from 'react'

describe('ButtonTest', () => {
  const noop = () => {};

  it('triggers onclick', function () {
    const onClick = jest.fn()
    shallow(<button onClick={onClick} />).simulate('click')
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('check button text', function () {
    const title = '-'
    const button = shallow(<button onClick={noop}/>)
    expect(button.text()).toBe('')
  });

})
