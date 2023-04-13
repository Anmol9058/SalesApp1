import React, {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ForgotPassword from '../containers/auth/ForgotPassword';
import CustomerStack from './CustomerStack';
import ClaimStack from './ClaimStack';
import Login from '../containers/auth/Login';
import MainHome from '../containers/MainHome';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        {/* <Stack.Screen name="MainHome" component={MainHome} /> */}
        {/* <Stack.Screen name="ForgotPassword" component={ForgotPassword} /> */}
        {/* <Stack.Screen name="CustomerStack" component={CustomerStack} /> */}
        {/* <Stack.Screen name="ClaimStack" component={ClaimStack} /> */}
      </Stack.Navigator>
    </>
  );
};

export default AuthStack;
