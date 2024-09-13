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

const getProfileCategories = (profileId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/profilecategories?profileId=${profileId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not good');
      }
      return response.json();
    })
    .then(resolve)
    .catch(reject);
});

const createProfileCat = (profileId, categoryId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/profilecategories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ profile: profileId, category: categoryId }),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const deleteProfileCat = (profileCategoryId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/profilecategories/${profileCategoryId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(() => resolve())
    .catch(reject);
});

export {
  getCategories, getSingleCategory, deleteProfileCat, createProfileCat, getProfileCategories,
};
