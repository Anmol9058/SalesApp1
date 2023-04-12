import React, { useCallback, useContext, useMemo, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';

import CustomStatusBar from '../../components/CustomStatusBar';
import { authContext, themeContext } from '../../contexts/context';
import { getScreenHeight, getScreenWidth } from '../../utils/domUtil';
import CustomButton from '../../components/CustomButton';
import fonts from '../../constants/fonts';
import CustomInput from '../../components/CustomInput';
import { login } from '../../api/auth';
import useApi from '../../hooks/useApi';
import { useMutation } from 'react-query';
import { setAsyncItem } from '../../api/async';
import {useDispatch, useSelector} from 'react-redux';
import {loginManager} from '../../redux/auth';

const Login = ({ navigation }: any) => {

  const theme1 = useSelector((state: any) => state);
  const dispatch = useDispatch();


  const { theme } = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { setTokens, setUserId, setUserData }: any = useContext(authContext);
  const { apiCall } = useApi();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);

  const usernameRef: any = useRef(null);
  const passwordRef: any = useRef(null);


  const onLoginPress = () => {
    console.log('username',username)
    console.log('username',password)

    dispatch<any>(
      loginManager(apiCall, {
       credential: username,
       password: password,
      }),
    );
  };
  
  const secureHandler = useCallback(() => {
    setSecure(pre => !pre);
  }, []);


  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <CustomStatusBar color={theme.black} light />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}>
        {/* <ImageBackground
          style={styles.imageBackground}
          source={require('../../assets/images/login.png')}> */}
        <View style={styles.header}>
          {/* <FastImage
            resizeMode="contain"
            style={styles.logo}
            source={require('../../assets/images/logoMyk.png')}
          /> */}

          <View style={{position:'absolute',bottom:getScreenHeight(4),left:getScreenHeight(4)}}> 
          <Text style={{color:'white',fontSize:getScreenHeight(2.5),fontWeight:'bold',marginBottom:getScreenHeight(1.8)}}>Welcome</Text>

            <Text style={{color:'white',fontWeight:'500',fontSize:getScreenHeight(2.3)}}>to CloudXperts Field Sales App</Text>
          </View>
        </View>

        <View style={{ padding: getScreenHeight(2) }}>
          <Text style={styles.title}>Login</Text>

          <View style={styles.wrappper}>
            <CustomInput
              color={theme.black}
              placeholder="Username"
              value={username}
              placeholderTextColor={theme.black}
              action={setUsername}
              inputRef={usernameRef}
              type="next"
              onSubmit={() => {
                passwordRef.current.focus();
              }}
              frontIcon={
                <FastImage
                  resizeMode="contain"
                  tintColor={theme.black}
                  source={require('../../assets/images/common/username.png')}
                  style={styles.inputicon}
                />
              }
            />
          </View>
          <View style={styles.wrappper}>
            <CustomInput
              color={theme.black}
              placeholder="Password"
              secure={secure}
              value={password}
              action={setPassword}
              inputRef={passwordRef}
              type="done"
              onSubmit={() => {
                Keyboard.dismiss();
              }}
              icon={
                <FastImage
                  resizeMode="contain"
                  tintColor={theme.black}
                  source={
                    secure
                      ? require('../../assets/images/common/eye.png')
                      : require('../../assets/images/common/eyeoff.png')
                  }
                  style={styles.inputicon}
                />
              }
              rightAction={secureHandler}
              frontIcon={
                <FastImage
                  resizeMode="contain"
                  tintColor={theme.black}
                  source={require('../../assets/images/common/password.png')}
                  style={styles.inputicon}
                />
              }
            />
          </View>

          <View style={{ marginTop: getScreenHeight(4) }}><View style={styles.wrappper}>
            <CustomButton
              action={onLoginPress}
              title={'SIGN IN'}
              Elevation={3}
              color="#01a79b"
              // icon={require('../../assets/images/common/rightarrow.png')}
              align="center"
              size={getScreenHeight(2.5)}
              iconmargin={getScreenHeight(1)}
              // font={fonts.medium}
              // loading={loginLoading}
            />
          </View>
          <View style={styles.BottomText}>

          <Text style={{fontSize:getScreenHeight(1.8),color:theme.textinput}}>{"Don't have an account?  "}</Text>
          <TouchableOpacity style={{alignItems:'baseline'}}><Text style={{color:'#01a79b',fontWeight:'bold'}}>{"SIGN UP"}</Text></TouchableOpacity>
          </View>
          </View>


        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.primary,
    },
    safe: {
      flex: 1,
      backgroundColor: theme.white,
    },
    header: {
      height: getScreenHeight(50),
      backgroundColor:'black',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    logo: {
      height: getScreenHeight(80),
      width: getScreenWidth(80),
    },
    contanier: {
      backgroundColor: '#333333',
      width: '85%',
      height: getScreenHeight(50),
      alignSelf: 'center',
      borderRadius: getScreenHeight(2),
      bottom: getScreenHeight(6),
      paddingHorizontal: getScreenHeight(2),
    },
    userContanier: {
      backgroundColor: '#FFFFFF',
      width: getScreenHeight(8),
      height: getScreenHeight(8),
      borderRadius: getScreenHeight(15),
      alignSelf: 'center',
      bottom: getScreenHeight(4),
      justifyContent: 'center',
      alignItems: 'center',
    },
    icon: {
      width: getScreenHeight(5),
      height: getScreenHeight(5),
    },
    title: {
      fontFamily: fonts.bold,
      color: '#FFFFFF',
      fontSize: getScreenHeight(2.5),
    },
    wrappper: {
      width: '90%',
      alignSelf: 'center',
      marginTop: getScreenHeight(2),
    },
    inputicon: {
      width: getScreenHeight(3),
      height: getScreenHeight(3),
    },
    body: {
      color: theme.white,
      fontFamily: fonts.regular,
      fontSize: getScreenHeight(1.6),
      alignSelf: 'center',
      marginTop: getScreenHeight(3),
    },
    imageBackground: {
      width: '100%',
      height: '100%',
    },
    BottomText:{
      alignSelf:'center',
      marginTop:getScreenHeight(6),
      flexDirection:'row'
    }
  });

export default Login;
