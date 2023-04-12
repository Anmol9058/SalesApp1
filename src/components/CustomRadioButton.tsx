import React, {useContext, useMemo} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import fonts from '../constants/fonts';

import {themeContext} from '../contexts/context';
import {getScreenHeight} from '../utils/domUtil';

const CustomRadioButton = (props: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <TouchableOpacity
      disabled={props.disabled}
      onPress={props.action}
      style={styles.screen}>
      <View style={styles.outerCircle}>
        {props.selected ? <View style={styles.innerCircle} /> : null}
      </View>
      <Text style={styles.title}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    screen: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    outerCircle: {
      width: getScreenHeight(1.5),
      height: getScreenHeight(1.5),
      backgroundColor: '#D9D9D9',
      borderRadius: getScreenHeight(1),
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: '#6F7EA8',
      borderWidth: getScreenHeight(0.1),
    },
    innerCircle: {
      width: getScreenHeight(0.8),
      height: getScreenHeight(0.8),
      backgroundColor: theme.primary_light,
      borderRadius: getScreenHeight(1),
    },
    title: {
      fontFamily: fonts.regular,
      fontSize: getScreenHeight(1.5),
      marginLeft: getScreenHeight(1),
      color: theme.black,
    },
  });

export default CustomRadioButton;
