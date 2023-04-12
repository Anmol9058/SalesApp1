import { combineReducers } from "redux"

import AuthReducer from "./auth"
import ThemeReducer from "./theme"
import CommonReducer from "./common"
import HomeReducer from "./home"
import cartReducer from "./cart"
// import ycnCartReducer from "./ycncart"

export default combineReducers({
    auth: AuthReducer,
    theme: ThemeReducer,
    common: CommonReducer,
    home: HomeReducer,
    cart: cartReducer,
    // ycncart: ycnCartReducer
})