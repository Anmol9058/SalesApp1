import axios from 'axios';
import {BASE_URL} from '../constants/api';

const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.request.use(
  req => {
    return req;
  },
  error => {
    console.log('error', error);
  },
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (err) {
    console.log('HERE ', err);
    const status = err.response?.status || 500;
    switch (status) {
      case 401: {
        console.log('401', err.message);
        throw new Error(err.response?.data?.message || err.message);
      }

      // forbidden (permission related issues)
      case 403: {
        console.log('403', err.message);
        throw new Error(err.response?.data?.message || err.message);
      }

      // bad request
      case 400: {
        console.log('400', err.message);
        throw new Error(err.response?.data?.message || err.message);
      }

      // not found
      case 404: {
        console.log('404', err.message);
        throw new Error(err.response?.data?.message || err.message);
      }

      // conflict
      case 409: {
        console.log('409', err.message);
        throw new Error(err.response?.data?.message || err.message);
      }

      // unprocessable
      case 422: {
        console.log('422', err.message);
        throw new Error(err.response?.data?.message || err.message);
      }

      // generic api error (server related) unexpected
      default: {
        console.log('default', err.message);
        throw new Error(err.response?.data?.message || err.message);
      }
    }
  },
);

export default instance;
