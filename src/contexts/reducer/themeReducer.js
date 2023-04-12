import {themeActions} from '../actions';
import {dark_theme, light_theme} from '../store/themeStore';

const themeReducer = (state, action) => {
  switch (action.type) {
    case themeActions.SET_THEME:
      return {
        ...state,
        theme: action.value.currentTheme === 'light' ? light_theme : dark_theme,
        currentTheme: action.value.currentTheme,
        userTheme: action.value.userTheme,
      };

    default:
      throw new Error(action.type);
  }
};

export default themeReducer;
