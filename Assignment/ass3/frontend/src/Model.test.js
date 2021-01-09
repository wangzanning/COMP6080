import { shallow } from 'enzyme';
import React from 'react';
import Modal from './screens/components/modal';

describe('Modal', () => {
  let modalStart, modalStop, props, propsStop, propsNotShow, modalNotShow;

  beforeAll(() => {
    props = {
      show: true,
      close: jest.fn(),
      content: `Session ID is 11111`,
      operation: 'Copy Link',
      copy: jest.fn(),
      sessionId: 11111
    };
    propsStop = {
      show: true,
      close: jest.fn(),
      content: 'Would you like to view the results?',
      operation: 'Yes',
      sessionId: 11111
    }
    propsNotShow = {
      show: false
    }
    modalStart = shallow(<Modal {...props} />);
    modalStop = shallow(<Modal {...propsStop} />);
    modalNotShow = shallow(<Modal {...propsNotShow} />);
  });

  // Testing snapshot
  it('is matched with snapshot', () => {
    expect(modalStart).toMatchSnapshot();
    expect(modalStop).toMatchSnapshot();
    expect(modalNotShow).toMatchSnapshot();
  });

  // Testing props
  it('can display correct content when start game', () => {
    expect(modalStart.find('p').text()).toEqual('Session ID is 11111');
  });
  it('can display correct content when stop game', () => {
    expect(modalStop.find('p').text()).toEqual('Would you like to view the results?');
  });



  // Testing buttons
  it('should have three buttons when started', () => {
    expect(modalStart.find('button').length).toBe(3);
    expect(modalStart.find('button').at(0).text()).toEqual('Join Game');
    expect(modalStart.find('button').at(1).text()).toEqual('Copy Link');
    expect(modalStart.find('button').at(2).text()).toEqual('Close');
  });

  it('should have two buttons when closed', () => {
    expect(modalStop.find('button').length).toBe(2);
    expect(modalStop.find('button').at(0).text()).toEqual('Yes');
    expect(modalStop.find('button').at(1).text()).toEqual('Close');
  });

  it('close button can trigger onClick function from GameCard', () => {
    modalStart.find('button').at(2).simulate('click');
    expect(props.close).toHaveBeenCalled();
    modalStop.find('button').at(1).simulate('click');
    expect(propsStop.close).toHaveBeenCalled();
  });

  it('copy button can trigger function', () => {
    modalStart.find('button').at(1).simulate('click');
    expect(props.copy).toHaveBeenCalled();
  })

});