import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { QueryClientProvider, QueryClient } from 'react-query';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/redux/Store';
import { NavigationRef } from './src/services/Routerservices';
import {
  AuthContextProvider,
  ThemeContextProvider,
} from './src/contexts/provider';
import MainStack from './src/routes/MainStack';

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer theme={DarkTheme} ref={NavigationRef}>
          <MainStack />
        </NavigationContainer>
      </PersistGate>
    </Provider>



  );
};

export default App;
