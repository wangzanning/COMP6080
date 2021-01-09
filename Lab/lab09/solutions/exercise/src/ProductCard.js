import * as React from 'react';

import { Rating } from './Rating';
import { Stepper } from './Stepper';

export const ProductCard = ({ item, onAddToCart, discount = 0 }) => {
  const [quantity, setQuantity] = React.useState(0);
  const discountedPrice = item.price - (item.price * discount);

  return (
    <div className="product">
      <div className="image">
        <img src={item.image} alt={item.title} />
      </div>

      <div className="info">
        <h3 className="title">{item.title}</h3>
        <p className="price">${discountedPrice.toFixed(2)} {item.currency}</p>
        {item.descriptions.map(desc => <p key={desc} className="description">{desc}</p>)}
        <p className="recommended">Highly recommended by {item.recommendationRatio * 100}% users</p>

        <Rating value={Math.ceil(item.recommendationRatio * 5)} size={5} />

        <div className="cart">
          <Stepper value={quantity} onUpdate={v => setQuantity(Math.max(v, 0))} />
          <button className="add-to-cart" onClick={() => onAddToCart(item.id, quantity)}>Add to cart</button>
        </div>
      </div>
    </div>
  );
};
