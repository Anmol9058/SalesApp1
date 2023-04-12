import React, {useContext, useMemo} from 'react';
import {Vibration, View, StyleSheet, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import fonts from '../constants/fonts';

import {themeContext} from '../contexts/context';
import {getScreenHeight} from '../utils/domUtil';

const CustomDropDownLabel = (props: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.screen}>
      <Text style={styles.label}>{props.label}</Text>
      <View style={styles.row}>
        <Text
          numberOfLines={2}
          style={[
            styles.value,
            {color: props.black ? theme.black : theme.white},
          ]}>
          {props.value}
        </Text>
        <FastImage
          style={styles.icon}
          tintColor={props.black ? theme.black : theme.white}
          resizeMode="contain"
          source={require('../assets/images/arrows/downarrow.png')}
        />
      </View>
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    screen: {
      height: getScreenHeight(10),
      flex: 1,
      borderColor: theme.accent,
      borderWidth: getScreenHeight(0.1),
      borderRadius: getScreenHeight(1),
      padding: getScreenHeight(1),
      justifyContent: 'space-around',
    },
    label: {
      fontSize: getScreenHeight(1.5),
      fontFamily: fonts.regular,
      color: theme.textinput,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    value: {
      fontFamily: fonts.regular,
      fontSize: getScreenHeight(1.5),
    },
    icon: {
      width: getScreenHeight(2),
      height: getScreenHeight(2),
    },
  });

export default CustomDropDownLabel;
