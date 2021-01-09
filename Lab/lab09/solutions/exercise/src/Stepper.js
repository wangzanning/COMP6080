import * as React from 'react';

export const Stepper = ({ value, onUpdate }) => {
  const vChange = (inc) => () => onUpdate(value + inc);
  return (
    <div className="stepper">
      <span className="minus" aria-label="subtract 1 from quantity" onClick={vChange(-1)}>-</span>
      <span className="value">{value}</span>
      <span className="plus" aria-label="add 1 to quantity" onClick={vChange(1)}>+</span>
    </div>
  );
};
