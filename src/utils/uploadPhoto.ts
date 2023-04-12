import axios from 'axios';
import toast from '../helpers/toast';

export const uploadPhoto = async (url, image, headers = {}, key) => {
  try {
    var FormData = require('form-data');
    var data = new FormData();
    let filename = image.filename;

    data.append(key, {
      uri: image.path,
      name: filename,
      type: image.mime,
    });

    let res = await axios.post(url, data, headers);
    if (!res.data.status) {
      throw new Error(res?.data?.message);
    }
    return res;
  } catch (error) {
    toast.error({message: error.message});
    throw new Error(error?.message);
  }
};
