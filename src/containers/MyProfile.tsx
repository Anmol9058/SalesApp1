import React, {useCallback, useContext, useMemo, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import FastImage from 'react-native-fast-image';

import {authContext, themeContext} from '../contexts/context';
import CustomStatusBar from '../components/CustomStatusBar';
import {getScreenHeight} from '../utils/domUtil';
import fonts from '../constants/fonts';
import Basic from '../components/Profile/Basic';
import CompanyInformation from '../components/Profile/CompanyInformation';
import Account from '../components/Profile/Account';
import ShipTo from '../components/Profile/ShipTo';
import ImagePickerModal from '../components/ImagePickerModal';
import CustomBackHeader from '../components/CustomBackHeader';

const MyProfile = ({navigation}: any) => {
  const {theme} = useContext(themeContext);
  const {setImagePermission}: any = useContext(authContext);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [openModal, setOpenModal] = useState(false);
  const [image, setImage] = useState(null);

  const Tab = createMaterialTopTabNavigator();

  const CustomTabBar = useCallback((props: any) => {
    const {navigationState, navigation} = props;
    console.log("navigationState",navigation.canGoBack())
    return (
      <View style={styles.tabContanier}>
        {navigationState.routes.map((route: any, index: any) => {
          return (
            <Pressable
              onPress={() => navigation.navigate(route.name)}
              style={[
                styles.textContanier,
                {
                  backgroundColor: theme.white,
                  borderLeftWidth: 1,
                },
              ]}>
              <Text
                style={[
                  styles.tabTitle,
                  {
                    color:
                      navigationState.index === index
                        ? theme.primary
                        : theme.black,
                  },
                ]}>
                {route.name}
              </Text>
            </Pressable>
          );
        })}
      </View>
    );
  }, []);

  const hideModal = useCallback(() => {
    setOpenModal(false);
  }, []);

  const modalAction = useCallback(() => {
    setOpenModal(true);
  }, []);

  const openSetting = useCallback(() => {
    setImagePermission(true);
    setOpenModal(false);
  }, []);

  const imageHandler = useCallback((res: any) => {
    setOpenModal(false);
    setImage(res);
  }, []);

  return (
    <>
      <ImagePickerModal
        visible={openModal}
        pressHandler={hideModal}
        openthings={openSetting}
        action={imageHandler}
      />
      <SafeAreaView edges={['top']} style={styles.screen}>
        <CustomStatusBar color={theme.white} />
        <View style={styles.screen}>
          {/* <CustomHeader action={() => navigation.openDrawer()} /> */}
          {/* <CustomBackHeader action={()=> navigation.goBack()} title="My Profile" /> */}

          <View style={styles.profileContanier}>
            {/* <TouchableOpacity
              onPress={() => navigation.navigate('EditProfile')}
              style={styles.iconContanier}>
              <FastImage
                resizeMode="contain"
                tintColor={theme.white}
                style={styles.smallIcon}
                source={require('../assets/images/common/pencil.png')}
              />
            </TouchableOpacity> */}

            <View style={styles.imageContanier}>
              <FastImage
                style={styles.profileImage}
                source={{uri: 'https://wallpapercave.com/wp/6FB0mg6.jpg'}}
              />
            </View>

            <View style={styles.infoContanier}>
              <Text style={styles.title}>Anmol Sharma</Text>
              <Text style={styles.subtitle}>+91 9999999999</Text>
            </View>
          </View>
{/* 
          <Tab.Navigator
            initialRouteName="MONTHLY"
            tabBar={props => <CustomTabBar {...props} />}>
            <Tab.Screen
              name="General Information"
              component={Basic}
              options={{tabBarLabel: 'MONTHLY'}}
            />
            <Tab.Screen
              name="Company Information"
              component={CompanyInformation}
              options={{tabBarLabel: 'QUARTERLY'}}
            />
             <Tab.Screen
              name="Ship To"
              component={ShipTo}
              options={{tabBarLabel: 'QUARTERLY'}}
            /> 
          </Tab.Navigator> */}
        </View>
      </SafeAreaView>
    </>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: 'white',
    },
    linearGradient: {
      flex: 1,
    },
    profileContanier: {
      width: '100%',
      height: getScreenHeight(20),
      backgroundColor: theme.primary,
      flexDirection: 'row',
      padding: getScreenHeight(2),
      alignItems: 'center',
    },
    profile: {
      backgroundColor: theme.white,
      width: getScreenHeight(15),
      height: getScreenHeight(15),
      borderRadius: getScreenHeight(15),
      justifyContent: 'center',
      alignItems: 'center',
    },
    icon: {
      width: getScreenHeight(7),
      height: getScreenHeight(7),
    },
    smallIcon: {
      width: '100%',
      height: '100%',
    },
    imageIcon: {
      width: '100%',
      height: '100%',
      borderRadius: getScreenHeight(7),
    },
    cameraicon: {
      width: getScreenHeight(3),
      height: getScreenHeight(3),
      bottom: 0,
      zIndex: 1000,
      position: 'absolute',
      right: getScreenHeight(1),
    },
    title: {
      fontFamily: fonts.bold,
      fontSize: getScreenHeight(2),
      color: theme.white,
    },
    subtitle: {
      fontFamily: fonts.regular,
      fontSize: getScreenHeight(1.5),
      color: theme.white,
    },
    tabContanier: {
      height: getScreenHeight(6),
      backgroundColor: 'transparent',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    tabTitle: {
      color: theme.black,
      fontFamily: fonts.medium,
      fontSize: getScreenHeight(1.5),
      textTransform: 'uppercase',
    },
    textContanier: {
      flex: 0.5,
      height: getScreenHeight(6),
      justifyContent: 'center',
      alignItems: 'center',
    },
    profileImage: {
      height: '90%',
      width: '90%',
      borderRadius: getScreenHeight(100),
    },
    imageContanier: {
      width: getScreenHeight(12),
      height: getScreenHeight(12),
      borderRadius: getScreenHeight(6),
      borderWidth: getScreenHeight(0.3),
      borderColor: theme.white,
      justifyContent: 'center',
      alignItems: 'center',
    },
    infoContanier: {
      marginLeft: getScreenHeight(2),
    },
    iconContanier: {
      width: getScreenHeight(4),
      height: getScreenHeight(4),
      position: 'absolute',
      right: getScreenHeight(1),
      top: getScreenHeight(3),
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default MyProfile;
