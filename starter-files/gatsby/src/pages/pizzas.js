import React from 'react';
import { graphql } from 'gatsby';
import PizzaList from '../components/PizzaList';

export default function PizzasPage({ data }) {
  console.log(data.pizzas);
  const pizzas = data.pizzas.nodes;
  return (
    <>
      <PizzaList pizzas={pizzas} />
    </>
  );
}

export const page = graphql`
  query PizzaQuery {
    pizzas: allSanityPizza {
      nodes {
        name
        id
        slug {
          current
        }
        toppings {
          id
          name
        }
        image {
          asset {
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
