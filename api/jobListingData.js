import { clientCredentials } from '../utils/client';

const getJobs = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/joblistings`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleJob = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/joblistings/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getJobByUser = (uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/joblistings?uid=${uid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createJob = (payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/joblistings`, {
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

const updateJob = (payload, id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/joblistings/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteJob = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/joblistings/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getJobs, getSingleJob, getJobByUser, createJob, updateJob, deleteJob,
};
