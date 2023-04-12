import React, {useContext, useMemo} from 'react';
import {Modal, StyleSheet, Pressable, View, Text} from 'react-native';

import {getScreenHeight, getScreenWidth} from '../utils/domUtil';
import fonts from '../constants/fonts';
import {themeContext} from '../contexts/context';
import CustomStatusBar from './CustomStatusBar';
import FastImage from 'react-native-fast-image';
import Spacer from './Spacer';

const ImageModal = (props: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <>
      {/* <CustomStatusBar /> */}
      <Modal
        visible={props.visible}
        animationType="fade"
        transparent={true}
        {...props}>
        <Pressable onPress={props.pressHandler} style={styles.modalScreen}>
          <View style={styles.modalContanier}>
          
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    modalScreen: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContanier: {
      backgroundColor: theme.white,
      height: getScreenHeight(50),
      width: getScreenWidth(70),
      justifyContent: 'center',
      padding: getScreenHeight(2),
      // borderRadius: getScreenHeight(2),
      alignItems: 'center',
    },
    title: {
      fontFamily: fonts.bold,
      color: theme.primary,
      fontSize: getScreenHeight(2.5),
    },
    subtitle: {
      fontFamily: fonts.bold,
      color: theme.accent,
      fontSize: getScreenHeight(2),
      textAlign: 'center',
      marginTop: getScreenHeight(2),
    },
    circle: {
      width: getScreenWidth(10),
      height: getScreenWidth(10),
      backgroundColor: theme.primary,
      borderRadius: getScreenWidth(10),
      position: 'absolute',
      zIndex: 1000,
      top: getScreenHeight(1),
      justifyContent: 'center',
      alignItems: 'center',
    },
    icon: {
      height: getScreenHeight(2),
      width: getScreenHeight(2),
    },
  });

export default ImageModal;
