import { useState, useEffect } from 'react';

export default function useLatestData() {
  // hot slices
  const [hotSlices, setHotSlices] = useState();
  // slicemasters
  const [slicemasters, setSlicemaster] = useState();
  // Use a side effect to fetcht he data from the graphql endpoint
  useEffect(function () {
    // when the component loads, fetch the data
    console.log(process.env.GATSBY_GRAPHQL_ENDPOINT);
    fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query {
  StoreSettings(id: "downtown") {
    name
    slicemaster {
      name
    }
    hotSlices {
      name
    }
  }
}
        `,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        // TODO: check for errors
        // set the data to state
        setHotSlices(res.data.StoreSettings.hotSlices);
        setSlicemaster(res.data.StoreSettings.slicemaster);
      });
  }, []);
  return {
    hotSlices,
    slicemasters,
  };
}
