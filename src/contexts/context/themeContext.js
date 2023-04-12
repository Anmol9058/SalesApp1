import {createContext} from 'react';
import {themeStore} from '../store';
const themeContext = createContext(themeStore);

export default themeContext;
