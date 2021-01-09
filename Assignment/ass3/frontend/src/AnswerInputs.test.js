import { shallow } from 'enzyme';
import React from 'react';
import AnswerInputs from './screens/components/answerInputs';

describe('AnswerInputs', () => {

  // Testing snapshot
  it('is matched with snapshot', () => {
    const props = {
      "answers": [
        {
          "answerId": 1,
          "content": "aaa",
          "correct": true
        },
        {
          "answerId": 2,
          "content": "bbb",
          "correct": true
        }
      ]
    }
    const ai = shallow(<AnswerInputs {...props} />)
    expect(ai).toMatchSnapshot();
  });

  // Number of inputs can be rendered depends on the number of answers in props
  it('should have 3 inputs', () => {
    const props = {
      "answers": [
        {
          "answerId": 1,
          "content": "aaa",
          "correct": true
        },
        {
          "answerId": 2,
          "content": "bbb",
          "correct": true
        },
        {
          "answerId": 3,
          "content": "cccc",
          "correct": true
        }
      ]
    }
    const ai = shallow(<AnswerInputs {...props} />)
    expect(ai.find('input').length).toBe(3);
  });

  // Placeholder of each input depends on content of answers
  it('placeholder of inputs are as expected', () => {
    const props = {
      "answers": [
        {
          "answerId": 1,
          "content": "aaa",
          "correct": true
        },
        {
          "answerId": 2,
          "content": "bbb",
          "correct": true
        },
        {
          "answerId": 3,
          "content": "cccc",
          "correct": true
        }
      ]
    }
    const ai = shallow(<AnswerInputs {...props} />)
    expect(ai.find('input').at(0).props().placeholder).toEqual('aaa');
    expect(ai.find('input').at(1).props().placeholder).toEqual('bbb');
    expect(ai.find('input').at(2).props().placeholder).toEqual('cccc');
  });

  // onChange of input is specified by index, and will return whole answer list
  it('answer can be updated correctly', () => {
    const event = { target: { value: 'test value' } };
    const props = {
      "answers": [
        {
          "answerId": 1,
          "content": "aaa",
          "correct": true
        }
      ],
      handleUpdateAnswer: jest.fn()
    }
    const ai = shallow(<AnswerInputs {...props} />);
    ai.find('input').at(0).simulate('change', event);
    expect(props.handleUpdateAnswer).toBeCalledWith([{"answerId": 1, "content": "test value", "correct": true}]);
  });

});