import { useCallback, useContext } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import dayjs from 'dayjs';
import Toast from "react-native-simple-toast"

import { authContext } from '../contexts/context';
import { removeAsyncItem, setAsyncItem } from '../api/async';
import { BASE_URL } from '../constants/api';
import Config from 'react-native-config';


const getInstance = ({ tokens, setTokens, logOut, customUrl,user_data, url }: any) => {
  // const { user_data}: any = useContext(authContext);


  const instance = axios.create({
    baseURL: Config.BASE_URL
  });

  instance.interceptors.request.use(
    config => {
      // console.log("data",user_data)
      if (tokens) {
        config.headers['token'] = 'test_token'

      }
      if (user_data&&user_data.sfid) {
        config.headers['account_id'] = user_data.sfid

      }
      config.headers['client-name'] = 'Mobile_App';
      return config
    },
    error => {
      Promise.reject(error)
    }
  )
  
  instance.interceptors.response.use(
    function (response) {
      return response;
    },
  function (err) {
      // console.log("MAIN ERROR", err)
      const status = err.response?.status || 500;
      switch (status) {
        case 401: {
          // logOut()
          //   removeAsyncItem("userData")
          throw new Error(err?.response?.data[0]?.message);
        }

        // forbidden (permission related issues)
        case 403: {
          throw new Error(err?.response?.data[0]?.message);
        }

        // bad request
        case 400: {
          throw new Error(err?.response?.data[0]?.message);
        }

        // not found
        case 404: {
          throw new Error(err?.response?.data[0]?.message);
        }

        // conflict
        case 409: {
          throw new Error(err?.response?.data[0]?.message);
        }

        // unprocessable
        case 422: {
          throw new Error(err?.response?.data[0]?.message);
        }

        // generic api error (server related) unexpected
        default: {
          throw new Error(err?.response);
        }
      }
    },
  );

  return instance;
};

const useApi = () => {
  const { tokens, setTokens, logOut,user_data }: any = useContext(authContext);

  const apiCall = useCallback(
    async ({ customUrl = false, type, url, data, headers = {}, params = {} }: any) => {
      const instance = getInstance({ tokens, setTokens, logOut, customUrl, url ,user_data});

      console.log(tokens)

      try {
        switch (type) {
          case 'POST': {
            let res = await instance.post(url, data, {
              params: params,
            });
            return res;
          }

          case 'PUT': {
            let res = await instance.put(url, data, {
              params: params,
              headers: headers,
            });
            return res;
          }

          case 'DELETE': {
            let res = await instance.delete(url, {
            });
            return res;
          }

          case 'GET': {
            let res = await instance.get(url);
            console.log(res);
            return res;
          }

          default: {
            let res = await instance.get(url);
            return res;
          }
        }
      } catch (error: any) {
        console.log("ERROR", error.response)
        
        throw new Error(error);
      }
    },
    [logOut, setTokens, tokens],
  );

  return { apiCall };
};

export default useApi;