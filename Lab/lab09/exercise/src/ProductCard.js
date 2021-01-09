import * as React from "react";
import {useState, useEffect} from "react";
import './ProductCard.css';

export const ProductCard = ({ item, onAddToCart, discount = 0.5 }) => {
  const[count, setCount] = useState(0);
  const[result, setResult] = useState(0);
  const[totalCount, setTotalCount] = useState(0);
  const recommend = item.recommendationRatio * 100 + '%';
  let currentPrice = 0;
  //show each comment one by one
  function ShowComment() {
    const commentContent = item.descriptions.map((comment,index)=>{
      return(
        <div className='eachComment' key={index}>{comment}</div>
      )
    })
    return (
      <div>
        {commentContent}
      </div>
    )
  }
  function minusOne () {
    setCount(count-1)
  }
  function addOne () {
    setCount(count+1)
  }
  //add to cart and calculate the total price
  function addCart () {
    setTotalCount(totalCount+count);
    setCount(0);
  }
  //show
  function ShowPercentRecommend() {
    const percent = item.recommendationRatio * 100
    console.log(percent);
    return (
      <div>
        <svg className='circle'>
          {percent>=0?<circle cx="100" cy="25" r="15" stroke="grey" strokeWidth="1" fill="yellow" />:<circle cx="100" cy="25" r="15" stroke="grey" strokeWidth="1" fill="white" />}
          {percent>=20?<circle cx="130" cy="25" r="15" stroke="grey" strokeWidth="1" fill="yellow" />:<circle cx="130" cy="25" r="15" stroke="grey" strokeWidth="1" fill="white" />}
          {percent>=40?<circle cx="160" cy="25" r="15" stroke="grey" strokeWidth="1" fill="yellow" />:<circle cx="160" cy="25" r="15" stroke="grey" strokeWidth="1" fill="white" />}
          {percent>=60?<circle cx="190" cy="25" r="15" stroke="grey" strokeWidth="1" fill="yellow" />:<circle cx="190" cy="25" r="15" stroke="grey" strokeWidth="1" fill="white" />}
          {percent>=80?<circle cx="220" cy="25" r="15" stroke="grey" strokeWidth="1" fill="yellow" />:<circle cx="220" cy="25" r="15" stroke="grey" strokeWidth="1" fill="white" />}
        </svg>
      </div>
    )
  }
  //show
  useEffect(()=>{
    currentPrice = totalCount * item.price * (1-discount);
    setResult(currentPrice);
  },[totalCount])

  return (
    <div id='content'>
      <div id='leftPart'>
        <img src={item.image} alt={item.title}/>
      </div>
      <div id='rightPart'>
        <div className='title' title={item.title}>{item.title}</div>
        <div className='price'>$ {item.price} {item.currency}</div>
        <ShowComment />
        <div className='recommend'>Highly recommend by {recommend} users</div>
        <ShowPercentRecommend />
        <div className='bottom'>
          <button onClick={minusOne}>-</button><span>{count}</span><button onClick={addOne}>+</button>
          <input className='cart' type='button' value='Add to cart' onClick={addCart}/>
        </div>
        <div>Total Price: {result}</div>
      </div>
    </div>
  );
};
