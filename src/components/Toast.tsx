import React, {
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
  } from 'react';
  import {DeviceEventEmitter, Text, StyleSheet, Animated} from 'react-native';
  import fonts from '../constants/fonts';
  import {themeContext} from '../contexts/context';
  import {getScreenHeight} from '../utils/domUtil';

  
  const Toast = () => {
    let disableTimer;
    const opacity = new Animated.Value(0);
  
    Animated.timing(opacity, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  
    const {theme} = useContext(themeContext);
    const styles = useMemo(() => createStyles(theme), [theme]);
    const [message, setMessage] = useState('');
    const [bgColor, setBgColor] = useState(`${theme.infocolor}`);
  
    const disableToast = () => {
      if (disableTimer) {
        clearTimeout(disableTimer);
      }
      disableTimer = setTimeout(() => {
        setMessage('');
      }, 2000);
    };
  
    const onNewToast = useCallback(
      data => {
        setMessage(data.message);
        disableToast();
        switch (data.type) {
          case 'success':
            setBgColor(theme.successcolor);
            break;
          case 'error':
            setBgColor(theme.errorcolor);
            break;
          case 'info':
            setBgColor(theme.infocolor);
            break;
          default:
            setBgColor(theme.infocolor);
            break;
        }
      },
      [theme.errorcolor, theme.infocolor, theme.successcolor],
    );
  
    useEffect(() => {
      DeviceEventEmitter.addListener('SHOW_TOAST', onNewToast);
  
      return () => {
        DeviceEventEmitter.removeAllListeners();
      };
    }, [onNewToast]);
  
    if (message?.length === 0) {
      return null;
    }
  
    return (
      <Animated.View
        style={[styles.screen, {backgroundColor: 'white', opacity: opacity}]}>
        <Text numberOfLines={2} style={styles.title}>
          {message?.length === 0 ? 'Something went wrong!' : message}
        </Text>
      </Animated.View>
    );
  };
  
  const createStyles = theme =>
    StyleSheet.create({
      screen: {
        position: 'absolute',
        bottom: getScreenHeight(3),
        width: '80%',
        height: getScreenHeight(6),
        alignSelf: 'center',
        paddingHorizontal: getScreenHeight(2),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: getScreenHeight(1),
        zIndex: 200,
        elevation: 10,
      },
      title: {
        fontFamily: fonts.medium,
        color: theme.textcolor,
        fontSize: getScreenHeight(1.8),
        textAlign: 'center',
      },
    });
  
  export default Toast;
  