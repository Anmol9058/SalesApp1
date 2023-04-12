import React, {useContext, useMemo} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import fonts from '../constants/fonts';

import {themeContext} from '../contexts/context';
import {getScreenHeight} from '../utils/domUtil';

const CustomPressable = (props: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <TouchableOpacity
      disabled={props.disabled}
      onPress={props.action}
      style={[
        styles.screen,
        {borderBottomColor: props.black ? theme.black : theme.white},
      ]}>
      <View
        style={[
          styles.textinputcontanier,
          {
            borderBottomWidth: props.border ? getScreenHeight(0.1) : 0,
            justifyContent: props.align ? 'flex-start' : 'space-between',
          },
        ]}>
        {props.leftIcon ? (
          <View
            style={[
              styles.iconcontanier,
              {
                marginRight: props.marginRight ? props.marginRight : 0,
                width: props.width ? props.width : '15%',
              },
            ]}>
            {props.leftIcon}
          </View>
        ) : null}
        <Text
          style={[
            styles.title,
            {color: props.black ? theme.black : theme.white},
          ]}>
          {props.value ? props.value : props.title}
        </Text>
        {props.icon ? (
          <View
            style={[
              styles.iconcontanier,
              {width: props.width ? props.width : '15%'},
            ]}>
            {props.icon}
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    screen: {
      borderBottomWidth: getScreenHeight(0.1),
      height: getScreenHeight(6),
      justifyContent: 'center',
    },

    textinputcontanier: {
      flexDirection: 'row',
      alignItems: 'center',

      color: theme.textinput,
    },
    textinput: {
      width: '85%',
      fontSize: getScreenHeight(1.8),
      fontFamily: fonts.semiBold,
      height: getScreenHeight(6),
    },
    title: {
      fontSize: getScreenHeight(1.8),
      fontFamily: fonts.semiBold,
    },
    iconcontanier: {
      width: '15%',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default CustomPressable;
