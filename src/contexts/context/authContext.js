import {createContext} from 'react';
import {authStore} from '../store';
const authContext = createContext(authStore);

export default authContext;
