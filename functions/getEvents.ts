 import { createClient } from '@sanity/client';

const sanity = createClient({
  projectId: process.env['SANITY_PROJECT_ID'],
  dataset: process.env['SANITY_DATASET'],
  useCdn: true,
   apiVersion: 'v2022-03-07'
});

 const query = `*[_type=='event']{
  _id,image{asset->{url}},doorsOpen,tickets,name
}`
export const handler = async () => {
  const products = await sanity
    .fetch(query)
    .then((data) => {
      console.log('data', data);
      return data
    })
    .catch((err) => console.log('err', err));
  return { statusCode: 200, body: JSON.stringify(products) };
};
