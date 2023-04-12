import {BASE_URL} from '../constants/api';
import {getValidUrl} from './domUtil';

const getProfileUrl = id => {
  if (id) {
    if (getValidUrl(id)) {
      return id;
    } else {
      return `${BASE_URL}/static/${id ? id : ''}`;
    }
  } else {
    return '';
  }
};

export default getProfileUrl;
