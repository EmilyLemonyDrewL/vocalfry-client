import { clientCredentials } from '../utils/client';

const getCategories = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/categories`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleCategory = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/categories/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getCategories, getSingleCategory,
};
