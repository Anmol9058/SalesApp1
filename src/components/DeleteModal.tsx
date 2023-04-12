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

const DeleteModal = (props: any) => {
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
        <Pressable onPress={props.pressHandler} style={styles.modalScreen}>
          <View style={styles.modalContanier}>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.subtitle}>{props.subtile}</Text>

            <View style={styles.row}>
              <TouchableOpacity onPress={props.no}>
                <Text style={styles.title}>NO</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={props.yes}>
                <Text style={styles.title}>YES</Text>
              </TouchableOpacity>
            </View>
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
    },
    subtitle: {
      fontFamily: fonts.regular,
      color: theme.black,
      fontSize: getScreenHeight(1.5),
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: getScreenHeight(3),
    },
  });

export default DeleteModal;
