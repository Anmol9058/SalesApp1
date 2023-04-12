import React, {useContext, useMemo} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Platform, StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';

import {getScreenHeight} from '../utils/domUtil';
import {authContext} from '../contexts/context';
import fonts from '../constants/fonts';
import {themeContext} from '../contexts/context';
import Menu from '../containers/home/Menu';
import MainHome from '../containers/MainHome';
import MyProfile from '../containers/MyProfile';

const Tab = createBottomTabNavigator();

const TabButton = (props: any) => {
  const {setIcon}: any = useContext(authContext);
  const {item, onPress, accessibilityState, styles} = props;
console.log(item,"itemmm");

  if (item.name === 'Dashboard') {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        style={styles.contanier}>
        <View style={styles.outerContanier}>
          <View style={styles.innerContanier}>{item.icon}</View>
        </View>
        <Text style={[styles.title, {marginTop: getScreenHeight(4)}]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  }
  // if (item.name === 'Profile') {
  //   return (
  //     <TouchableOpacity
  //       activeOpacity={1}
  //       onPress={() => setIcon(true)}
  //       style={styles.contanier}>
  //       <View>{item.icon}</View>
  //       <Text style={styles.title}>{item.name}</Text>
  //     </TouchableOpacity>
  //   );
  // }

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={styles.contanier}>
      <View>{item.icon}</View>
      <Text style={styles.title}>{item.name}</Text>
    </TouchableOpacity>
  );
};

const BottomBar = () => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  const TabBarArr = [
    {
      route: 'MyProfile',
      component: MyProfile,
      name: 'Profile',
      icon: (
        <FastImage
          tintColor={theme.primary_light}
          resizeMode="contain"
          style={styles.icon}
          source={require('../assets/images/bottombar/orders.png')}
        />
      ),
    },
    {
      route: 'SalesAppHome',
      component: MainHome,
      name: 'Dashboard',
      icon: (
        <FastImage
          tintColor={theme.white}
          resizeMode="contain"
          style={styles.icon}
          source={require('../assets/images/bottombar/home.png')}
        />
      ),
    },
    {
      route: 'Menu',
      component: Menu,
      name: 'Menu',
      icon: (
        <FastImage
          tintColor={theme.primary_light}
          resizeMode="contain"
          style={styles.icon}
          source={require('../assets/images/bottombar/menu.png')}
        />
      ),
    },
  ];

  return (
    <Tab.Navigator
      initialRouteName="SalesAppHome"
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabbar,
      }}>
      {TabBarArr.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            options={{
              tabBarShowLabel: false,
              tabBarButton: props => (
                <TabButton
                  {...props}
                  item={item}
                  styles={styles}
                  theme={theme}
                />
              ),
            }}
          
            name={item.route}
            component={item.component}
          />
        );
      })}
    </Tab.Navigator>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    contanier: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: theme.primary,
      height: Platform.OS === 'ios' ? getScreenHeight(8) : getScreenHeight(8),
    },
    title: {
      fontFamily: fonts.regular,
      fontSize: getScreenHeight(1.5),
      color: theme.white,
      marginTop: getScreenHeight(0.5),
    },
    tabbar: {
      height: Platform.OS === 'ios' ? getScreenHeight(8) : getScreenHeight(8),
      backgroundColor: theme.black,
    },
    icon: {
      width: getScreenHeight(3),
      height: getScreenHeight(3),
    },
    homeicon: {
      width: getScreenHeight(10),
      height: getScreenHeight(10),
      bottom: getScreenHeight(3),
    },
    outerContanier: {
      borderColor: theme.white,
      borderWidth: getScreenHeight(1),
      borderRadius: getScreenHeight(100),
      bottom: getScreenHeight(4),
      position: 'absolute',
      zIndex: 1000,
    },
    innerContanier: {
      backgroundColor: theme.primary_light,
      padding: getScreenHeight(1),
      borderRadius: getScreenHeight(100),
    },
  });

export default BottomBar;
