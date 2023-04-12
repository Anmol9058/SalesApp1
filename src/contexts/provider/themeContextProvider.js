import React, {useReducer} from 'react';

import {themeContext} from '../context';
import {themeStore} from '../store';
import {themeReducer} from '../reducer';
import {themeActions} from '../actions';

const ThemeContextProvider = props => {
  const [state, dispatch] = useReducer(themeReducer, themeStore);

  const value = {
    theme: state.theme,
    currentTheme: state.currentTheme,
    userTheme: state.userTheme,
    setAppTheme: _value => {
      dispatch({type: themeActions.SET_THEME, value: _value});
    },
  };

  return (
    <themeContext.Provider value={value}>
      {props.children}
    </themeContext.Provider>
  );
};

export default ThemeContextProvider;
