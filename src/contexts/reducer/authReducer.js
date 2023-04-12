import {authActions} from '../actions';

const authReducer = (state, action) => {
  switch (action.type) {
    case authActions.OPEN_SETTINGS:
      return {
        ...state,
        setting_status: action.value,
      };

    case authActions.SET_IS_VERIFIED:
      return {
        ...state,
        is_verified: action.value,
      };
    
      case authActions.SET_PDF_LOADING:
        return {
          ...state,
          pdfLoading: action.value,
        };
    
      case authActions.SET_QR_DATA:
        return {
          ...state,
          qrData: action.value,
        };

        case authActions.SET_AVAILABLE_CREDIT_LIMIT:
          return {
            ...state,
            availableCreditLimit: action.value,
          };
  
    case authActions.SET_CART_DATA:
      return {
        ...state,
        cart_Data: action.value,
      };
    case authActions.SET_USER_ID:
      return {
        ...state,
        user_id: action.value,
      };

    case authActions.SET_IS_BLOCKED_BY_ADMIN:
      return {
        ...state,
        is_blocked_by_admin: action.value,
      };

    case authActions.SET_IMAGE_PERMISSION:
      return {
        ...state,
        imagePermission: action.value,
      };

    case authActions.SET_SOCKET_INSTANCE:
      return {
        ...state,
        socketInstance: action.value,
      };

    case authActions.SET_EMOJIS:
      return {
        ...state,
        emojis: action.value,
      };

    case authActions.SET_IS_INITIALIZED:
      return {
        ...state,
        is_initialized: action.value,
      };
    case authActions.SET_CURRENT_LOCATION:
      return {
        ...state,
        currentlocation: action.value,
      };
    case authActions.SET_APP_CURRENT_MODE:
      return {
        ...state,
        app_current_mode: action.value,
      };
    case authActions.SET_USER_DATA:
      return {
        ...state,
        user_data: action.value,
      };
    case authActions.SET_WELCOME:
      return {
        ...state,
        welcome: action.value,
      };
    case authActions.SET_TOKENS:
      return {
        ...state,
        tokens: action.value,
        logged_in: true,
      };

    case authActions.SET_INVOICEDATA:
      return {
        ...state,
        invoicedata: action.value,
        logged_in: true,
      };

    case authActions.SET_NO_INTERNET:
      return {
        ...state,
        no_internet: action.value,
      };

    case authActions.SET_ERROR:
      return {
        ...state,
        error: action.value,
      };

    case authActions.SET_LOCATION:
      return {
        ...state,
        location: action.value,
      };

    case authActions.SET_LAST_REQUEST:
      return {
        ...state,
        last_request: action.value,
      };

    case authActions.UPDATED_TOKEN:
      return {
        ...state,
        updatetoken: action.value,
      };

      case authActions.PRODUCT_SEARCH:
        return {
          ...state,
          productSearch: action.value,
        };
  
    case authActions.SET_ICON:
      return {
        ...state,
        modal_icon: action.value,
      };

    case authActions.SET_SPLASH_SCREEN_STATUS:
      return {
        ...state,
        splash_screen_status: action.value,
      };

      case authActions.SET_YCN_CART_DATA:
        return {
          ...state,
          ycn_cart_Data: action.value,
        };

    case authActions.LOG_OUT:
      return {
        ...state,
        tokens: null,
        user_data: null,
        logged_in: false,
        is_verified: false,
        is_initialized: false,
        updatetoken: false,
      };

      case authActions.SET_ORDER_DATA:
        return {
          ...state,
          orderData: action.value,
        
        };
  

    default:
      throw new Error(action.type);
  }
};

export default authReducer;
