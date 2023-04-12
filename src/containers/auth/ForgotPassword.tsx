import React, {useContext, useMemo, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomButton from '../../components/CustomButton';
import CustomStatusBar from '../../components/CustomStatusBar';
import CustomTextInput from '../../components/CustomTextInput';
import fonts from '../../constants/fonts';
import {themeContext} from '../../contexts/context';
import {getScreenHeight, getScreenWidth} from '../../utils/domUtil';

const ForgotPassword = ({navigation}) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [userName, setUserName] = useState('');

  return (
    <SafeAreaView style={styles.screen}>
      <CustomStatusBar light color={theme.black} />
      <View style={styles.screen}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}>
          <ScrollView
            bounces={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <View style={styles.logocontainer}>
              <FastImage
                resizeMode="contain"
                style={styles.logo}
                source={require('../../assets/images/logo.jpeg')}
              />
            </View>
            <View style={styles.main}>
              <Text style={styles.title}>Forget Password</Text>

              <View style={styles.wrapper}>
                <CustomTextInput
                  border
                  placeholder="Username"
                  value={userName}
                  action={setUserName}
                  type="done"
                  onSubmit={() => {
                    Keyboard.dismiss();
                  }}
                />
              </View>

              <View style={styles.wrapper}>
                <CustomButton
                  action = {() => navigation.goBack()}
                  color={theme.primary_light} title="SUBMIT" />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

const createStyles = theme =>
  StyleSheet.create({
    screen: {
      backgroundColor: theme.black,
      flex: 1,
    },
    logo: {
      width: getScreenWidth(60),
      height: getScreenHeight(10),
      marginVertical: getScreenHeight(6),
    },
    main: {
      backgroundColor: theme.white,
      height: getScreenHeight(80),
      borderTopLeftRadius: getScreenHeight(5),
      borderTopRightRadius: getScreenHeight(5),
    },
    title: {
      fontSize: getScreenHeight(3),
      fontFamily: fonts.bold,
      alignSelf: 'center',
      marginVertical: getScreenHeight(4),
      color: theme.titlecolor,
    },
    logocontainer: {
      width: '100%',
      height: getScreenHeight(20),
      justifyContent: 'center',
      alignItems: 'center',
    },
    wrapper: {
      width: '90%',
      alignSelf: 'center',
      marginVertical: getScreenHeight(4),
    },
  });

export default ForgotPassword;
