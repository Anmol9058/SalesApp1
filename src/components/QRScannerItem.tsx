import React, {useContext, useMemo} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import fonts from '../constants/fonts';
import Images from '../constants/images';

import {themeContext} from '../contexts/context';
import {getScreenHeight, getScreenWidth} from '../utils/domUtil';

const QRScannerItem = (props: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.contanier}>
      <Text style={styles.title}>{props.count}</Text>
      <TouchableOpacity
        disabled={props.disabled}
        onPress={props.selectItem}
        style={styles.row}>
        <Text style={styles.title}>
          {props.title ? props.title : 'Select Position'}
        </Text>
        <FastImage
          resizeMode="contain"
          tintColor={theme.black}
          style={styles.icon}
          source={Images.downarrow}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={props.action} style={styles.imageContanier}>
        {props.qrData ? (
          <Text numberOfLines={2} style={styles.itemTitle}>
            {props?.qrData?.data}
          </Text>
        ) : (
          <FastImage
            resizeMode="contain"
            tintColor={theme.black}
            style={styles.plusicon}
            source={Images.add}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    contanier: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      fontFamily: fonts.regular,
      fontSize: getScreenHeight(1.8),
      color: theme.black,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    icon: {
      height: getScreenHeight(2),
      width: getScreenHeight(2),
      marginLeft: getScreenHeight(1),
    },
    plusicon: {
      height: getScreenHeight(1.5),
      width: getScreenHeight(1.5),
    },
    imageContanier: {
      height: getScreenHeight(3.5),
      borderWidth: getScreenHeight(0.1),
      borderColor: theme.black,
      borderStyle: 'dashed',
      justifyContent: 'center',
      alignItems: 'center',
      width: getScreenWidth(18),
    },
    itemTitle: {
      color: theme.black,
      fontFamily: fonts.regular,
      fontSize: getScreenHeight(1),
    },
  });

export default QRScannerItem;
