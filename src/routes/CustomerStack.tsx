import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import CustomerInfo from '../containers/checkCustomer/CustomerInfo';
import AddPhotos from '../containers/checkCustomer/AddPhotos';
import VehicleDetails from '../containers/checkCustomer/VehicleDetails';

const Stack = createNativeStackNavigator();

const CustomerStack = () => {
  return (
    <>
      <Stack.Navigator
        initialRouteName="CustomerInfo"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="CustomerInfo" component={CustomerInfo} />
        <Stack.Screen name="AddPhotos" component={AddPhotos} />
        <Stack.Screen name="VehicleDetails" component={VehicleDetails} />
      </Stack.Navigator>
    </>
  );
};

export default CustomerStack;
