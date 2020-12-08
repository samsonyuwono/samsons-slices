import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';

const BeerGridStyles = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

const SingleBeerStyles = styled.div`
  border: 1px solid var(--grey);
  padding: 2rem;
  text-align: center;
  img {
    width: 100%;
    height: 200px;
    object-fit: contain;
    display: block;
    display: grid;
    align-items: center;
    font-size: 10px;
  }
`;

export default function BeersPage({ data }) {
  console.log(data.beers.nodes.length);
  const beers = data.beers.nodes;
  return (
    <>
      <h2 className="center">
        WE HAVE {beers.length} BEERS AVAILABLE. DINE IN ONLY
      </h2>
      <BeerGridStyles>
        {beers.map((beer) => (
          <SingleBeerStyles key={beer.id}>
            <img src={beer.image} alt={beer.name} />
            <p>{beer.name}</p>
            <p>{beer.price}</p>
            <p title={`${Math.round(beer.rating.average)} out of five stars`}>
              {`⭐`.repeat(Math.round(beer.rating.average))}
              <span style={{ filter: `grayscale(100%)` }}>
                {`⭐`.repeat(5 - Math.round(beer.rating.average))}
              </span>
              <span>({beer.rating.reviews})</span>
            </p>
            ;
          </SingleBeerStyles>
        ))}
      </BeerGridStyles>
    </>
  );
}
