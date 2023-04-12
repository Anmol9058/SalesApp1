import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import NewClaim from '../containers/NewClaim/NewClaim';
import ClaimPhotos from '../containers/NewClaim/ClaimPhotos';
import ClaimReview from '../containers/NewClaim/ClaimReview';

const Stack = createNativeStackNavigator();

const ClaimStack = () => {
  return (
    <>
      <Stack.Navigator
        initialRouteName="NewClaim"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="NewClaim" component={NewClaim} />
        <Stack.Screen name="ClaimPhotos" component={ClaimPhotos} />
        <Stack.Screen name="ClaimReview" component={ClaimReview} />
      </Stack.Navigator>
    </>
  );
};

export default ClaimStack;
