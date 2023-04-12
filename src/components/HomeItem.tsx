import React, {useContext, useMemo} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import fonts from '../constants/fonts';
import {themeContext} from '../contexts/context';
import {getScreenHeight, getScreenWidth} from '../utils/domUtil';
import Divider from './Divider';

const HomeItem = (props: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.item}>
      <FastImage
        style={styles.icon}
        resizeMode="contain"
        source={props.image}
      />
      <View style={{marginHorizontal: getScreenHeight(0.5)}}>
        <Text style={[styles.itemText, {color: theme.black}]}>
          {props.title}
        </Text>
        <Text numberOfLines={1} style={styles.itemText}>
          {props.price}
        </Text>
      </View>
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    item: {
      shadowColor: theme.primary_light,
      shadowOffset: {width: -2, height: 4},
      shadowOpacity: 0.2,
      shadowRadius: 3,
      backgroundColor: 'white',
      width: '45%',
      height: getScreenHeight(7),
      elevation: 5,
      borderRadius: getScreenHeight(1),
      borderColor: theme.primary_light,
      borderLeftWidth: getScreenHeight(0.5),
      justifyContent: 'space-between',
      paddingHorizontal: getScreenHeight(2),
      alignItems: 'center',
      flexDirection: 'row',
    },
    itemText: {
      fontSize: getScreenHeight(1.5),
      color: theme.black,
      fontFamily: fonts.medium,
    },
    icon: {
      width: getScreenHeight(3),
      height: getScreenHeight(3),
    },
  });

export default HomeItem;
