import axios from 'axios';

export const apiCall = async (type: any, url:any, data: any, headers = {}, params = {}) => {
  try {
    switch (type) {
      case 'POST': {
        let res = await axios.post(url, data, {
          params: params,
          headers: headers,
          validateStatus: () => {
            return true;
          },
        });
        if (!res.data.success) {
          // eslint-disable-next-line radix
          if (parseInt(res?.data?.code) === 401) {
          } else {
            // Toast.show(res.data.message);
          }
          console.log('apiCall POST', res?.data?.code);
          throw new Error(res?.data?.code);
        }
        return res;
      }

      case 'PUT': {
        let res = await axios.put(url, data, {
          params: params,
          headers: headers,
          validateStatus: () => {
            return true;
          },
        });
        if (!res.data.success) {
          // Toast.show(res.data.message);
          throw new Error(res?.data?.code);
        }
        return res;
      }

      case 'GET': {
        let res = await axios.get(url, {
          params: params,
          headers: headers,
          validateStatus: () => {
            return true;
          },
        });
        if (!res.data.success) {
          console.log("success",res)
          // Toast.show(res.data.message);
          throw new Error(res?.data?.code);
        }
        return res;
      }

      default: {
        let res = await axios.get(url, {
          params: params,
          headers: headers,
          validateStatus: () => {
            return true;
          },
        });
        if (!res.data.success) {
          // Toast.show(res.data.message);
          throw new Error(res?.data?.code);
        }
        return res;
      }
    }
  } catch (error) {
    throw new Error(error?.message);
  }
};
