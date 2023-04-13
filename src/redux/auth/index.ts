import {createSlice} from '@reduxjs/toolkit';
import SimpleToast from 'react-native-simple-toast';

import {forgotPassword, login} from '../../api/auth';
import strings from '../../localization';
import {navigate} from '../../services/Routerservices';
import {forgotPasswordSchema, loginSchema} from '../../utils/domUtil';
import {resetCart} from '../cart';
import {resetCommon} from '../common';
import {resetHome} from '../home';
// import {resetYCNCart} from '../ycncart';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userData: null,
    token: null,
  },
  reducers: {
    setUserData(state, action) {
      state.userData = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    logout(state) {
      (state.userData = null), (state.token = null);
    },
  },
});

export const logoutManager = () => {
  return async (dispatch: any) => {
    dispatch(logout());
    dispatch(resetCart());
    dispatch(resetHome());
    dispatch(resetCommon());
    // dispatch(resetYCNCart());
  };
};

export const loginManager = (apiCall: any, data: any) => {
  return async (dispatch: any) => {
    console.log('data',data)
    // let result = loginSchema(data);
    // console.log('result',result)
    try {
      if (data) {
        let url = `https://myk-backend-staging.herokuapp.com/login/login`;
        console.log('res')
        const res = await login(apiCall, url,data);
      
        if (res.isSuccess) {
          // dispatch(setUserData(res.AccountDetail));
          // dispatch(setToken({access_token: res.sessionId}));
        } else {
           dispatch(setUserData(res.AccountDetail));

          // return SimpleToast.show(strings.invalidCredentials);
        }
      }
    } catch (error) {
      dispatch(setUserData(data));
      console.log("hhh",error);
    }
  };
};

export const {setUserData, setToken, logout} = authSlice.actions;

export default authSlice.reducer;
