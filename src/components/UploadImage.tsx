import React, {useCallback, useContext, useMemo} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import fonts from '../constants/fonts';
import Images from '../constants/images';
import {authContext, themeContext} from '../contexts/context';
import {getScreenHeight} from '../utils/domUtil';
import {openCameraImages, openGalleryImages} from '../utils/uploadSingleImage';

const UploadImage = (props: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const {setImagePermission}: any = useContext(authContext);

  const openCamera = useCallback(async () => {
    try {
      const res = await openCameraImages();
      if (res) {
        props.action(res);
      }
    } catch (error: any) {
      if (error?.message === 'User cancelled image selection') {
        return;
      }
      if (
        error?.message === 'User did not grant library permission.' ||
        'User did not grant camera permission.'
      ) {
        setImagePermission(true);
      }
    }
  }, []);

  return (
    <View style={styles.screen}>
      <Text numberOfLines={1} style={styles.title}>
        {props.title}
      </Text>
      <TouchableOpacity onPress={openCamera}>
        {props.value ? (
          <FastImage style={styles.image} source={{uri: props.value.path}} />
        ) : (
          <View style={styles.photoContanier}>
            <FastImage
              resizeMode="contain"
              style={styles.icon}
              source={Images.gallery}
            />
          </View>
        )}
      </TouchableOpacity>

      {/* <View style={styles.buttonContanier}>
        <CustomButton
          loading={props.loading}
          disabled={props.uploaded}
          action={props.uploadImage}
          height={getScreenHeight(3.5)}
          title="Upload"
          font={fonts.regular}
          size={getScreenHeight(1.5)}
          width={'60%'}
        />

        {props.uploaded ? (
          <FastImage
            source={Images.tick}
            resizeMode="contain"
            style={styles.tickIcon}
          />
        ) : null}
      </View> */}
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    screen: {
      backgroundColor: '#D9D9D9',
      padding: getScreenHeight(2),
      borderRadius: getScreenHeight(1),
    },
    title: {
      color: theme.black,
      fontFamily: fonts.bold,
      fontSize: getScreenHeight(1.5),
    },
    photoContanier: {
      backgroundColor: '#E2E5E9',
      height: getScreenHeight(10),
      marginVertical: getScreenHeight(2),
      borderRadius: getScreenHeight(1),
      borderWidth: getScreenHeight(0.1),
      borderColor: theme.black,
      borderStyle: 'dashed',
      justifyContent: 'center',
      alignItems: 'center',
    },
    icon: {
      height: getScreenHeight(3),
      width: getScreenHeight(3),
    },
    image: {
      backgroundColor: 'white',
      height: getScreenHeight(10),
      marginVertical: getScreenHeight(2),
      borderRadius: getScreenHeight(1),
      borderWidth: getScreenHeight(0.1),
      borderColor: theme.black,
      borderStyle: 'dashed',
    },
    buttonContanier: {
      alignSelf: 'center',
    },
    tickIcon: {
      width: getScreenHeight(2),
      height: getScreenHeight(2),
      alignSelf: 'center',
      marginTop: getScreenHeight(1),
    },
  });

export default UploadImage;
