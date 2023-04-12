import React, {useReducer} from 'react';
import {authContext} from '../context';
import {authStore} from '../store';
import {authReducer} from '../reducer';
import {authActions} from '../actions';

const AuthContextProvider = props => {
  const [state, dispatch] = useReducer(authReducer, authStore);
  const value = {
    
    is_verified: state.is_verified,
    logged_in: state.logged_in,
    is_initialized: state.is_initialized,
    user_data: state.user_data,
    tokens: state.tokens,
    invoicedata: state.invoicedata,
    setting_status: state.setting_status,
    currentlocation: state.currentlocation,
    location: state.location,
    updatetoken: state.updatetoken,
    app_current_mode: state.app_current_mode,
    splash_screen_status: state.splash_screen_status,
    error: state.error,
    last_request: state.last_request,
    no_internet: state.no_internet,
    is_blocked_by_admin: state.is_blocked_by_admin,
    socketInstance: state.socketInstance,
    welcome: state.welcome,
    emojis: state.emojis,
    imagePermission: state.imagePermission,
    cart_Data: state.cart_Data,
    user_id: state.user_id,
    modal_icon: state.modal_icon,
    ycn_cart_Data: state.ycn_cart_Data,
    qrData: state.qrData,
    productSearch: state.productSearch,
    availableCreditLimit: state.availableCreditLimit,
    pdfLoading: state.pdfLoading,

    orderData: state.orderData,

    setPdfLoading: _value => {
      dispatch({type: authActions.SET_PDF_LOADING, value: _value});
    },
    setSettingStatus: _value => {
      dispatch({type: authActions.OPEN_SETTINGS, value: _value});
    },

    setAvailableCreditLimit: _value => {
      dispatch({type: authActions.SET_AVAILABLE_CREDIT_LIMIT, value: _value});
    },

    setProductSearch: _value => {
      dispatch({type: authActions.PRODUCT_SEARCH, value: _value});
    },

    setQrData: _value => {
      dispatch({type: authActions.SET_QR_DATA, value: _value});
    },

    setIsVerified: _value => {
      dispatch({type: authActions.SET_IS_VERIFIED, value: _value});
    },

    setUserData: _value => {
      dispatch({type: authActions.SET_USER_DATA, value: _value});
    },

    setIsInitialized: _value => {
      dispatch({type: authActions.SET_IS_INITIALIZED, value: _value});
    },

    setTokens: _value => {
      dispatch({type: authActions.SET_TOKENS, value: _value});
    },
    setIcon: _value => {
      dispatch({type: authActions.SET_ICON, value: _value});
    },

    setInvoiceData: _value => {
      dispatch({type: authActions.SET_INVOICEDATA, value: _value});
    },

    setCurrentLocation: _value => {
      dispatch({type: authActions.SET_CURRENT_LOCATION, value: _value});
    },

    setLocation: _value => {
      dispatch({type: authActions.SET_LOCATION, value: _value});
    },

    logOut: _value => {
      dispatch({type: authActions.LOG_OUT, value: _value});
    },
    setUpdateToken: _value => {
      dispatch({type: authActions.UPDATED_TOKEN, value: _value});
    },
    setAppCurrentMode: _value => {
      dispatch({type: authActions.SET_APP_CURRENT_MODE, value: _value});
    },
    setSplashScreenStatus: _value => {
      dispatch({type: authActions.SET_SPLASH_SCREEN_STATUS, value: _value});
    },
    setError: _value => {
      dispatch({type: authActions.SET_ERROR, value: _value});
    },
    setLastRequest: _value => {
      dispatch({type: authActions.SET_LAST_REQUEST, value: _value});
    },
    setNoInternet: _value => {
      dispatch({type: authActions.SET_NO_INTERNET, value: _value});
    },
    setIsBlockedByAdmin: _value => {
      dispatch({type: authActions.SET_IS_BLOCKED_BY_ADMIN, value: _value});
    },
    setSocket: _value => {
      dispatch({type: authActions.SET_SOCKET_INSTANCE, value: _value});
    },
    setWelcome: _value => {
      dispatch({type: authActions.SET_WELCOME, value: _value});
    },
    setEmojis: _value => {
      dispatch({type: authActions.SET_EMOJIS, value: _value});
    },
    setImagePermission: _value => {
      dispatch({type: authActions.SET_IMAGE_PERMISSION, value: _value});
    },
    setCartData: _value => {
      dispatch({type: authActions.SET_CART_DATA, value: _value});
    },
    setUserId: _value => {
      dispatch({type: authActions.SET_USER_ID, value: _value});
    },
    setYcnCartData: _value => {
      dispatch({type: authActions.SET_YCN_CART_DATA, value: _value});
    },

    setOrderData: _value => {
      dispatch({type: authActions.SET_ORDER_DATA, value: _value});
    },
  };

  return (
    <authContext.Provider value={value}>{props.children}</authContext.Provider>
  );
};

export default AuthContextProvider;
