import { clientCredentials } from '../utils/client';

const getProfiles = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/profiles`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleProfile = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/profiles/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getProfileByUser = (uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/profiles?uid=${uid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createProfile = (payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/profiles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateProfile = (payload, id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/profiles/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getProfiles, getSingleProfile, getProfileByUser, createProfile, updateProfile,
};
