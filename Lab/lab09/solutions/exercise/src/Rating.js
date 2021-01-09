import * as React from 'react';

export const Rating = ({ value, size }) => (
  <div className="rating">
    {[0,1,2,3,4].map(c => (
  	  <span key={c} className={c <= value ? "circle filled" : "circle"}></span>
    ))}
  </div>
);
