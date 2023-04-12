import React, {useContext, useMemo} from 'react';
import {
  Modal,
  StyleSheet,
  Pressable,
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';

import {getScreenHeight, getScreenWidth} from '../utils/domUtil';
import fonts from '../constants/fonts';
import {
  openCameraImages,
  openGalleryImages,
  openGalleryWithMultipleImages,
} from '../utils/uploadSingleImage';
import {themeContext} from '../contexts/context';
import CustomStatusBar from './CustomStatusBar';
import FastImage from 'react-native-fast-image';

const ModalLoading = (props: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <>
      <CustomStatusBar />
      <Modal
        visible={props.visible}
        animationType="fade"
        transparent={true}
        {...props}>
        <View style={styles.modalScreen}>
          <View style={styles.contanier}>
            <ActivityIndicator size={'large'} color={theme.primary} />
            <Text style={styles.title}>Loading...</Text>
          </View>
        </View>
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
      width: '90%',
      alignSelf: 'center',
      justifyContent: 'space-between',
      padding: getScreenHeight(2),
      borderRadius: getScreenHeight(1),
    },
    title: {
      fontFamily: fonts.medium,
      color: theme.black,
      fontSize: getScreenHeight(1.8),
      marginLeft: getScreenHeight(1),
    },
    contanier: {
      backgroundColor: theme.white,
      padding: getScreenHeight(2),
      flexDirection: 'row',
      alignItems: 'center',
      width: '90%',
      borderRadius: getScreenHeight(1),
      justifyContent: 'center',
    },
  });

export default ModalLoading;
