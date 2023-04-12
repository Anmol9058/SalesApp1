import React, {useCallback, useContext, useMemo, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  ScrollView,
  Keyboard,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SafeAreaView} from 'react-native-safe-area-context';
import ArrowButton from '../components/ArrowButton';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';

import CustomNewHeader from '../components/CustomNewHeader';
import CustomStatusBar from '../components/CustomStatusBar';
import Header from '../components/Header';
import fonts from '../constants/fonts';
import {themeContext} from '../contexts/context';
import {getScreenHeight} from '../utils/domUtil';

const ChangePassword = ({navigation}: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [oldPassword, setOldPassword] = useState('');
  const [oldSecure, setOldSecure] = useState(true);
  const [newPassword, setNewPassword] = useState('');
  const [loginNewPassword, setLoginNewPassword] = useState('');
  const [loginNewSecure, setLoginNewSecure] = useState(true);
  const [newSecure, setNewSecure] = useState(true);

  const passwordRef: any = useRef(null);
  const oldPasswordRef: any = useRef(null);
  const loginPasswordRef: any = useRef(null);

  const secureHandler = useCallback(() => {
    setOldSecure(pre => !pre);
  }, []);

  const secureNewHandler = useCallback(() => {
    setNewSecure(pre => !pre);
  }, []);

  const secureNewLogiHnandler = useCallback(() => {
    setLoginNewSecure(pre => !pre);
  }, []);

  return (
    <SafeAreaView edges={['top']} style={styles.screen}>
      <CustomStatusBar color={theme.black} light />
      <View style={styles.screen}>
        <CustomNewHeader action={() => navigation.goBack()} title="Security" />
        <ScrollView style={styles.list}>
          <Header hide title="Change Password" />

          <View style={styles.textContanier}>
            <View style={styles.wrappper}>
              <CustomInput
                black
                color={theme.black}
                placeholder="Old Password"
                secure={oldSecure}
                value={oldPassword}
                action={setOldPassword}
                inputRef={passwordRef}
                type="next"
                onSubmit={() => {
                  oldPasswordRef.current.focus();
                }}
                icon={
                  <FastImage
                    resizeMode="contain"
                    tintColor={theme.black}
                    source={
                      oldSecure
                        ? require('../assets/images/common/eye.png')
                        : require('../assets/images/common/eyeoff.png')
                    }
                    style={styles.inputicon}
                  />
                }
                rightAction={secureHandler}
                frontIcon={
                  <FastImage
                    resizeMode="contain"
                    tintColor={theme.black}
                    source={require('../assets/images/common/password.png')}
                    style={styles.inputicon}
                  />
                }
              />
            </View>

            <View style={styles.wrappper}>
              <CustomInput
                black
                color={theme.black}
                placeholder="New Password"
                secure={newSecure}
                value={newPassword}
                action={setNewPassword}
                inputRef={oldPasswordRef}
                type="next"
                onSubmit={() => {
                  loginPasswordRef.current.focus();
                }}
                icon={
                  <FastImage
                    resizeMode="contain"
                    tintColor={theme.black}
                    source={
                      newSecure
                        ? require('../assets/images/common/eye.png')
                        : require('../assets/images/common/eyeoff.png')
                    }
                    style={styles.inputicon}
                  />
                }
                rightAction={secureNewHandler}
                frontIcon={
                  <FastImage
                    resizeMode="contain"
                    tintColor={theme.black}
                    source={require('../assets/images/common/password.png')}
                    style={styles.inputicon}
                  />
                }
              />
            </View>

            <View style={styles.wrappper}>
              <CustomInput
                black
                color={theme.black}
                placeholder="Login New Password"
                secure={loginNewSecure}
                value={loginNewPassword}
                action={setLoginNewPassword}
                inputRef={loginPasswordRef}
                type="done"
                onSubmit={() => {
                  Keyboard.dismiss();
                }}
                icon={
                  <FastImage
                    resizeMode="contain"
                    tintColor={theme.black}
                    source={
                      loginNewSecure
                        ? require('../assets/images/common/eye.png')
                        : require('../assets/images/common/eyeoff.png')
                    }
                    style={styles.inputicon}
                  />
                }
                rightAction={secureNewLogiHnandler}
                frontIcon={
                  <FastImage
                    resizeMode="contain"
                    tintColor={theme.black}
                    source={require('../assets/images/common/password.png')}
                    style={styles.inputicon}
                  />
                }
              />
            </View>
          </View>

          <ArrowButton title="Submit" />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.black,
    },
    header: {
      padding: getScreenHeight(2),
    },
    list: {
      paddingHorizontal: getScreenHeight(2),
    },
    textContanier: {
      backgroundColor: theme.white,
      padding: getScreenHeight(1),
      borderRadius: getScreenHeight(1),
      marginVertical: getScreenHeight(3),
    },
    inputicon: {
      width: getScreenHeight(2),
      height: getScreenHeight(2),
    },
    wrappper: {
      marginBottom: getScreenHeight(1),
    },
  });

export default ChangePassword;
