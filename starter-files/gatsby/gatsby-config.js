import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export default {
  siteMetadata: {
    title: `Slicks Slices`,
    siteUrl: 'https://gatsby.pizza',
    description: 'The best pizza place in NYC!',
    twitter: '@slicks-slices',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    {
      // this is the naame of the plugin you're adding
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: 'v50hqd3r',
        dataset: 'production',
        watchMode: true,
        token: process.env.SANITY_TOKEN,
      },
    },
  ],
};
