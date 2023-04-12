import {Dimensions} from 'react-native';
import "intl"
import 'intl/locale-data/jsonp/en';
import SimpleToast from 'react-native-simple-toast';
import strings from '../localization';
import { z } from 'zod';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export const getScreenWidth = (value: any) => {
  if (value) {
    let finalValue = (screenWidth * value) / 100;
    return finalValue;
  } else {
    return screenWidth;
  }
};

export const getScreenHeight = (value: any) => {
  if (value) {
    let finalValue = (screenHeight * value) / 100;
    return finalValue;
  } else {
    return screenHeight;
  }
};

export const getNumbersOnly = (value: any) => {
  return value.replace(/[^0-9]/g, '');
};

export const verifypass = (password: any) => {
  if (password) {
    if (password.length >= 6) {
      return true;
    } else {
      // return toast.info({message: 'Password must be atleast 6 characters'});
    }
  } else {
    // return toast.info({message: 'Password is required'});
  }
};

export const verifyEmail = (text: any) => {
  if (text) {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) == false) {
      // return toast.info({message: 'Invalid email'});
    } else {
      return true;
    }
  } else {
    // return toast.info({message: 'Email is required'});
  }
};

export const verifyName = (name: any) => {
  if (name) {
    if (name.length < 3) {
      // return toast.info({message: 'Name must be atleast 3 characters'});
    } else {
      return true;
    }
  } else {
    // return toast.info({message: 'Name is required'});
  }
};

export const verifyPhone = (phone: any, phoneLength: any) => {
  if (phone) {
    if (phone.length === phoneLength) {
      return true;
    }
  } else {
    return false;
  }
  return false;
};

export const verifyConfirmPassword = (password: any, confirmPassword: any) => {
  if (confirmPassword === password) {
    return true;
  } else {
    // return toast.info({message: 'Password and confirm password must be same'});
  }
};

export const getValidUrl = (url: any) => {
  if (url.indexOf('http') === 0) {
    return true;
  } else {
    return false;
  }
};

export const formatPhoneNumber =(phoneNumberString: any) => {
  var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
  var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    var intlCode = (match[1] ? '+1 ' : '');
    return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
  }
  return null;
}

export const formatPrice = (price: any) => {
  var formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  });
  
 return formatter.format(price); /* $2,500.00 */
}

export const dateReadableFormatWithHyphen = (timestamp: any) => {
  let dateObj = timestamp ? new Date(timestamp) : new Date();
  let date = dateObj.getDate();
  let month = dateObj.getMonth() + 1;
  let year = dateObj.getFullYear();
  let date1 = date < 10 ? '0' + date : date;
  let month1 = month < 10 ? '0' + month : month;
  return `${year}-${month1}-${date1}`;
};


// export const loginSchema = (obj: any) => {
//   try {
//     console.log()
//     const FormData = z.object({
//       credential: z.string().trim(),
//       password: z.string().trim()
//     });
//     const res = FormData.parse(obj);
//     return res;
//   } catch (err) {
//     if (err instanceof z.ZodError) {
//       SimpleToast.show(err.issues[0].message);
//     }
//   }
// };
