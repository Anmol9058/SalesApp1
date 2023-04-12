import React, {useContext, useMemo} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import fonts from '../constants/fonts';

import {themeContext} from '../contexts/context';
import {getScreenHeight} from '../utils/domUtil';

const DropDownItem = (props: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>{props.title}</Text>
      <FastImage
        tintColor={theme.light_accent}
        resizeMode="contain"
        style={styles.icon}
        source={require('../assets/images/arrows/downarrow.png')}
      />
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    screen: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: getScreenHeight(6),
      borderBottomWidth: getScreenHeight(0.1),
      borderColor: theme.light_accent,
    },
    title: {
      fontFamily: fonts.regular,
      color: theme.white,
      fontSize: getScreenHeight(1.8),
    },
    icon: {
      height: getScreenHeight(2),
      width: getScreenHeight(2),
    },
  });

export default DropDownItem;
