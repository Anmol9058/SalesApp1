import React, {useContext, useMemo} from 'react';
import {
  Modal,
  StyleSheet,
  Pressable,
  View,
  TouchableOpacity,
  Text,
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

const ImagePickerModal = (props: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  const openGallery = async () => {
    try {
      const res = await openGalleryImages();
      if (res) {
        props.action(res);
      }
    } catch (error) {
      if (error?.message === 'User cancelled image selection') {
        return;
      }
      if (
        error?.message === 'User did not grant library permission.' ||
        'User did not grant camera permission.'
      ) {
        props.openthings();
      }
    }
  };

  const PickMultipleImageModal = async () => {
    try {
      const res = await openGalleryWithMultipleImages();
      if (res) {
        props.action(res);
      }
    } catch (error) {
      if (error.message === 'User cancelled image selection') {
        return;
      }
      if (
        error.message === 'User did not grant library permission.' ||
        'User did not grant camera permission.'
      ) {
        props.openthings();
      }
    }
  };

  const openCamera = async () => {
    try {
      const res = await openCameraImages();
      if (res) {
        props.action(res);
      }
    } catch (error) {
      if (error.message === 'User cancelled image selection') {
        return;
      }
      if (
        error.message === 'User did not grant camera permission.' ||
        'User did not grant library permission.'
      ) {
        props.openthings();
      } else {
        console.log(error.message);
      }
    }
  };

  return (
    <>
      <CustomStatusBar />
      <Modal
        visible={props.visible}
        animationType="fade"
        transparent={true}
        {...props}>
        <Pressable onPress={props.pressHandler} style={styles.modalScreen}>
          <View style={styles.modalContanier}>
            <Text style={styles.title}>
              Upload <Text>Photo</Text>
            </Text>

            <View style={styles.footer}>
              <TouchableOpacity
                onPress={openCamera}
                style={styles.semifottercontanier}>
                <Text style={styles.subtitle}>Camera</Text>
                <FastImage
                  tintColor={theme.white}
                  resizeMode="contain"
                  source={require('../assets/images/common/camera.png')}
                  style={styles.icon}
                />
              </TouchableOpacity>

              <View style={styles.line} />

              <TouchableOpacity
                onPress={props.multiple ? PickMultipleImageModal : openGallery}
                style={styles.semifottercontanier}>
                <Text style={styles.subtitle}>Gallery</Text>
                <FastImage
                  tintColor={theme.white}
                  resizeMode="contain"
                  source={require('../assets/images/common/gallery.png')}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>

            <View />
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

const createStyles = theme =>
  StyleSheet.create({
    modalScreen: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContanier: {
      backgroundColor: theme.accent,
      height: getScreenHeight(30),
      width: getScreenWidth(65),
      alignSelf: 'center',
      justifyContent: 'space-between',
      padding: getScreenHeight(2),
      borderRadius: getScreenHeight(2),
    },
    title: {
      fontSize: getScreenHeight(2),
      fontFamily: fonts.semiBold,
      alignSelf: 'center',
      color: theme.white,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    subtitle: {
      fontFamily: fonts.semiBold,
      fontSize: getScreenHeight(1.8),
      marginBottom: getScreenHeight(1),
      color: theme.textcolor,
    },
    semifottercontanier: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    line: {
      height: getScreenHeight(12),
      width: getScreenWidth(0.1),
      backgroundColor: theme.textcolor,
    },
    icon: {
      width: getScreenHeight(3.5),
      height: getScreenHeight(3.5),
      marginTop: getScreenHeight(1),
    },
  });

export default ImagePickerModal;
