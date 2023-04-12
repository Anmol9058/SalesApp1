import React, {useContext, useMemo} from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import FastImage from 'react-native-fast-image';
import fonts from '../constants/fonts';

import {themeContext} from '../contexts/context';
import {getScreenHeight, getScreenWidth} from '../utils/domUtil';

const AgeingItem = (props: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <Pressable onPress={props.action} style={styles.screen}>
      <Text style={styles.headerTitle}>{props.title}</Text>
      <View style={styles.row}>
        <Text
          style={[styles.headerTitle, {color: theme.black, marginRight: 15}]}>
          {props.value}
        </Text>
        {props.show ? (
          []
        ) : (
          <FastImage
            tintColor={theme.accent}
            resizeMode="contain"
            style={styles.icon}
            source={require('../assets/images/common/rightarrow.png')}
          />
        )}
      </View>
    </Pressable>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    screen: {
      backgroundColor: theme.white,
      height: getScreenHeight(6),
      borderRadius: getScreenHeight(1),
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: getScreenHeight(2),
      justifyContent: 'space-between',
    },
    headerTitle: {
      color: theme.black,
      fontFamily: fonts.bold,
      fontSize: getScreenHeight(2),
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    icon: {
      height: getScreenHeight(2.5),
      width: getScreenHeight(2.5),
      marginLeft: getScreenHeight(2),
    },
  });

export default AgeingItem;
