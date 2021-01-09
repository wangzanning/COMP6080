import { shallow } from 'enzyme';
import React from 'react';
import GameCard from './screens/components/gameCard';
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

describe('GameCard', () => {
  let gameCard, props, gameCardNull, propsNull;

  beforeEach(() => {
    React.useEffect = jest.spyOn(React, "useEffect").mockImplementationOnce(f => f());
    props = {
      id: 464907009,
      thumbnail: '',
      title: 'Test Game Title',
      time: 50,
      numQuestions: 10
    };
    propsNull = {
      id: null,
      thumbnail: null,
      title: null,
      time: null,
      numQuestions: null
    };
    gameCard = shallow(<GameCard {...props} />);
    gameCardNull = shallow(<GameCard {...propsNull} />);
  });

  // Testing snapshot
  it('is matched with snapshot', () => {
    expect(gameCard).toMatchSnapshot();
    expect(gameCardNull).toMatchSnapshot();
  });

  // Testing props
  it('can display correct title', () => {
    expect(gameCard.find(Typography).at(0).text()).toEqual('Test Game Title');
  });

  it('can display correct number of questions', () => {
    expect(gameCard.find(Typography).at(1).text()).toEqual(`Number of Questions: 10`);
  });

  it('can display correct duration', () => {
    expect(gameCard.find(Typography).at(2).text()).toEqual(`Duration: 50 Seconds`);
  });

  it('can display correct null value of title', () => {
    expect(gameCardNull.find(Typography).at(0).text()).toEqual('');
  });

  it('can display correct number of questions', () => {
    expect(gameCardNull.find(Typography).at(1).text()).toEqual('Number of Questions: ');
  });

  it('can display correct duration', () => {
    expect(gameCardNull.find(Typography).at(2).text()).toEqual('Duration:  Seconds');
  });

  // Testing buttons
  it('should have three buttons', () => {
    expect(gameCard.find(Button).length).toBe(3);
  });

  it('start button change to stop button after click', () => {
    expect(gameCard.find(Button).at(0).text()).toEqual('Start Game');
    gameCard.find(Button).at(0).simulate('click');
    expect(gameCard.find(Button).at(0).text()).toEqual('Stop Game');
    gameCard.find(Button).at(0).simulate('click');
    expect(gameCard.find(Button).at(0).text()).toEqual('Start Game');
  });

  it('check props of modal', () => {
    let modal = gameCard.find('Modal');
    expect(modal.props().show).toEqual(false);
  });

  afterEach(() => {
    gameCard = null;
  });
});