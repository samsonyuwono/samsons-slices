import React, { useContext, useState } from 'react';
import OrderContext from '../components/OrderContext';
import attachNamesAndPrices from './attachNamesAndPrices';
import calculateOrdrTotal from './calculateOrderTotal';
import formatMoney from './formatMoney';

export default function usePizza({ pizzas, values }) {
  // 1. Create some state to hold our order
  // I got rid of this becuase useState was moved up to the provider
  // const [order, setOrder] = useState([]);
  // now we access both our state and updater function via context
  // (setOrder) via context
  const [order, setOrder] = useContext(OrderContext);
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const [message, setMessage] = useState();
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

  // this function runs when the form is submitted
  async function submitOrder(e) {
    e.preventDefault();
    console.log(e);
    setLoading(true);
    setError(null);
    setMessage('go eat!');

    // gather all the data that needs to be sent
    const body = {
      order: attachNamesAndPrices(order, pizzas),
      total: formatMoney(calculateOrdrTotal(order, pizzas)),
      name: values.name,
      email: values.email,
    };
    // 4. send this data to the serveless funciton when they check out
    const res =
      (`${process.env.GATSBY_SERVERLESS_BASE}/placeOrder}`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
      });
    const text = await JSON.parse(res.text());
    // check if everything worked
    if (res.status >= 400 && res.status < 600) {
      setLoading(false); // turn off loading
      setError(text.message);
    } else {
      // it worked
      setLoading(false);
      setMessage('Success! Come on down for your pizza!');
    }
  }

  return {
    order,
    addToOrder,
    removeFromOrder,
    error,
    loading,
    message,
    submitOrder,
  };
}
