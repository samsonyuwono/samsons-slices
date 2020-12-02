import React from 'React';
import { Link } from 'gatsby';

function SinglePizza({ pizza }) {
  return (
    <div>
      <Link to={`/pizza/${pizza.slug.currrent}`}>
        <h2>
          <span className="mark">{pizza.name}</span>
        </h2>

        <p>{pizza.toppings.map((topping) => topping.name).join(', ')}</p>
      </Link>
    </div>
  );
}

export default function PizzaList({ pizzas }) {
  return (
    <div>
      {pizzas.map((pizza, i) => (
        <SinglePizza key={pizza.id} pizza={pizza} />
      ))}
    </div>
  );
}
