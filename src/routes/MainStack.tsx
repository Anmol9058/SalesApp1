import React, { useCallback, useContext, useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import NetInfo from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';
import { authContext, themeContext } from '../contexts/context';
import AuthStack from './AuthStack';
import Toast from '../components/Toast';
import CustomOpenSettings from '../components/CustomOpenSettings';
import { Alert, Linking, Modal, TouchableOpacity, View } from 'react-native';
import useApi from '../hooks/useApi';
import { getCartDetails, getCreditAmount, getUserDetail } from '../api/home';
import HomeStack from './HomeStack';
import { PaymentButton } from '../utils/paymentHandler';
import { useDispatch, useSelector } from 'react-redux';
import { setImagePermission, setInternet } from '../redux/common';

const Stack = createNativeStackNavigator();

const MainStack = (props: any) => {
  const isInternet = useSelector((state: any) => state.common.isInternet);
  const userData = useSelector((state: any) => state.auth.userData);
  const imagePermission = useSelector(
    (state: any) => state.common.imagePermission,
  );
  const { setAppTheme, currentTheme, pdfLoading }: any = useContext(themeContext);

  const dispatch = useDispatch();
  useEffect(() => {

    const removeNetInfoSubscription = NetInfo.addEventListener(state => {
      const offline = !(state.isConnected && state.isInternetReachable);
      if (isInternet !== offline) {
        dispatch(setInternet(offline));
      }
    });

    return () => removeNetInfoSubscription();
  }, []);

  return (
    <>
      <CustomOpenSettings
        visible={imagePermission}
        title="Permission"
        subtitle="Please give the permission to continue!"
        opensettings={() => {
          setImagePermission(false);
          Linking.openSettings();
        }}
        close={() => {
          setImagePermission(false);
        }}
      />
      <Stack.Navigator
        initialRouteName="AuthStack"
        screenOptions={{ headerShown: false }}>
        {userData ? (
          <Stack.Screen name="HomeStack" component={HomeStack} />
        ) : (
          <Stack.Screen name="AuthStack" component={AuthStack} />
        )}
      </Stack.Navigator>
    </>
  );
};

export default MainStack;
