import React, {useContext, useMemo, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

import {themeContext} from '../contexts/context';
import CustomStatusBar from '../components/CustomStatusBar';
import CustomHeader from '../components/CustomHeader';
import Header from '../components/Header';
import {getScreenHeight} from '../utils/domUtil';
import CustomTextInput from '../components/CustomTextInput';
import Spacer from '../components/Spacer';
import CustomButton from '../components/CustomButton';

const RegisterWarrenty = ({navigation}) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [firstName, setFirstName] = useState('');
  const [surName, setSurName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');

  const firstNameRef = useRef(null);
  const surNameRef = useRef(null);
  const emailRef = useRef(null);
  const mobileRef = useRef(null);

  return (
    <SafeAreaView edges={['top']} style={styles.screen}>
      <CustomStatusBar color={theme.white} />
      <View style={styles.screen}>
        <CustomHeader action={() => navigation.openDrawer()} />
        <LinearGradient
          colors={['#000000', '#606060']}
          style={styles.linearGradient}>
          <View style={styles.header}>
            <Header title="Warranty Registration" />
          </View>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{flex: 1}}>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              bounces={false}>
              <View style={styles.customTextInput}>
                <CustomTextInput
                  color={theme.primary}
                  label="First Name"
                  value={firstName}
                  action={setFirstName}
                  placeholder="Enter First Name"
                  inputRef={firstNameRef}
                  type="next"
                  onSubmit={() => {
                    surNameRef.current.focus();
                  }}
                />
              </View>

              <View style={styles.customTextInput}>
                <CustomTextInput
                  color={theme.primary}
                  label="Surname"
                  value={surName}
                  action={setSurName}
                  placeholder="Enter Surname"
                  inputRef={surNameRef}
                  type="next"
                  onSubmit={() => {
                    emailRef.current.focus();
                  }}
                />
              </View>

              <View style={styles.customTextInput}>
                <CustomTextInput
                  color={theme.primary}
                  label="Email"
                  value={email}
                  action={setEmail}
                  placeholder="Enter Email"
                  inputRef={emailRef}
                  type="next"
                  onSubmit={() => {
                    mobileRef.current.focus();
                  }}
                />
              </View>

              <View style={styles.customTextInput}>
                <CustomTextInput
                  color={theme.primary}
                  label="Mobile No."
                  value={mobile}
                  action={setMobile}
                  placeholder="Enter Mobile No."
                  inputRef={mobileRef}
                  type="done"
                  onSubmit={() => {
                    Keyboard.dismiss();
                  }}
                />
              </View>

              <View style={styles.buttoncontanier}>
                <View style={styles.button}>
                  <CustomButton notBorder title="Submit To Customer" />
                </View>
                <View style={styles.button}>
                  <CustomButton notBorder title="Next" />
                </View>
              </View>

              <Spacer height={getScreenHeight(15)} />
            </ScrollView>
          </KeyboardAvoidingView>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
};

const createStyles = theme =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: 'white',
    },
    linearGradient: {
      flex: 1,
    },
    header: {
      padding: getScreenHeight(1),
    },
    customTextInput: {
      padding: getScreenHeight(2),
    },
    buttoncontanier: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: getScreenHeight(2),
      paddingHorizontal: getScreenHeight(2),
    },
    button: {
      width: '30%',
    },
  });

export default RegisterWarrenty;
