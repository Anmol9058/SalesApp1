const authStore = {
  setting_status: false,
  logged_in: false,
  is_verified: false,
  is_initialized: false,
  user_data: null,
  tokens: null,
  invoicedata: null,
  currentlocation: null,
  location: null,
  updatetoken: false,
  app_current_mode: 'light',
  splash_screen_status: true,
  last_request: null,
  error: {
    status: false,
    action: null,
  },
  no_internet: true,
  is_blocked_by_admin: false,
  socketInstance: null,
  welcome: false,
  emojis: [],
  imagePermission: false,
  cart_Data: null,
  user_id: '',
  modal_icon: false,
  ycn_cart_Data: null,
  qrData: null,
  productSearch: "",
  availableCreditLimit: null,
  pdfLoading: false,

  
  orderData:[]
};

export default authStore;
