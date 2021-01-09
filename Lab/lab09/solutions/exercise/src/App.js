import React from "react";
import { ProductCard } from "./ProductCard";
import bike1 from './images/bike1.jpg';
import bike2 from './images/bike2.jpg';
import bike3 from './images/bike3.jpg';

const item = {
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

function App() {
  return (
    <ProductCard item={item} onAddToCart={(id, quantity) => { console.log(`${id}:${quantity}`)}} />
  );
}

export default App;
