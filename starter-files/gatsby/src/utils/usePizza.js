import React, { useState } from 'react';

export default function usePizza({ pizzas, inputs }) {
  // 1. Create some state to hold our order
  const [order, setOrder] = useState([]);
  // 2. make a function add things to order
  function addToOrder(orderedPizza) {
    setOrder([...order, orderedPizza]);
  }
  // 3. make a function remove things to order
  function removeFromOrder(index) {
    setOrder([
      // everything before the item we want to remove
      ...order.slice(0, index),
      // everything before the item we want to remove
      ...order.slice(index + 1),
    ]);
  }
  // 4. sned this data to the serveless funciton when they chekc out
  // TODO

  return {
    order,
    addToOrder,
    removeFromOrder,
  };
}
