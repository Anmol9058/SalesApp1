import React, {useContext, useMemo, useRef, useState} from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SafeAreaView} from 'react-native-safe-area-context';
import ArrowButton from '../components/ArrowButton';
import CustomInput from '../components/CustomInput';

import CustomNewHeader from '../components/CustomNewHeader';
import CustomStatusBar from '../components/CustomStatusBar';
import Divider from '../components/Divider';
import Header from '../components/Header';
import Spacer from '../components/Spacer';
import fonts from '../constants/fonts';
import {themeContext} from '../contexts/context';
import {getScreenHeight} from '../utils/domUtil';

const EditProfile = ({navigation}: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const phoneRef: any = useRef(null);
  const emailRef: any = useRef(null);

  return (
    <SafeAreaView edges={['top']} style={styles.screen}>
      <CustomStatusBar color={theme.black} light />
      <View style={styles.screen}>
        <View style={styles.header}>
          <FastImage
            resizeMode="contain"
            style={styles.logo}
            source={require('../assets/images/logopng.png')}
          />
        </View>

        <View style={styles.contanier}>
          <Header title="Update Profile" hide />

          <View style={styles.input}>
            <CustomInput
              placeholder="Mobile Number"
              value={phone}
              inputRef={phoneRef}
              type="next"
              onSubmit={() => {
                emailRef.current.focus();
              }}
              action={(text: any) => setPhone(text.replace(/\D/g, ''))}
              keyboardType="number-pad"
              maxLength={10}
            />
          </View>

          <View style={styles.input}>
            <CustomInput
              placeholder="Email"
              value={phone}
              inputRef={phoneRef}
              type="next"
              onSubmit={() => {
                emailRef.current.focus();
              }}
              action={setPhone}
              keyboardType="email-address"
              maxLength={10}
            />
          </View>
        </View>
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
      height: getScreenHeight(8),
      width: '100%',
      alignItems: 'flex-start',
    },
    logo: {
      height: '100%',
      width: '50%',
    },
    contanier: {
      padding: getScreenHeight(2),
    },
    input: {
      marginTop: getScreenHeight(2),
    },
  });

export default EditProfile;
