import React, {useContext, useMemo} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import fonts from '../constants/fonts';

import {themeContext} from '../contexts/context';
import {getScreenHeight, getScreenWidth} from '../utils/domUtil';

const CustomDropDown = (props: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <TouchableOpacity
      onPress={props.action}
      disabled={props.action ? false : true}
      style={[
        styles.contanier,
        {
          borderBottomWidth: props.border ? 0 : getScreenHeight(0.2),
          justifyContent: props.align ? 'space-between' : 'flex-start',
        },
      ]}>
      <View style={{flex: 1}}>
        <Text
          numberOfLines={2}
          style={[
            styles.title,
            {color: props.black ? theme.black : theme.white},
          ]}>
          {props.title}
        </Text>
      </View>
      <FastImage
        tintColor={theme.black}
        resizeMode="contain"
        style={styles.icon}
        source={require('../assets/images/common/dropdown.png')}
      />
    </TouchableOpacity>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    contanier: {
      height: getScreenHeight(6),
      borderColor: theme.accent,
      borderBottomWidth: getScreenHeight(0.2),
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    title: {
      fontSize: getScreenHeight(1.6),
      fontFamily: fonts.regular,
      color: theme.white,
      textTransform: 'capitalize',
    },
    icon: {
      width: getScreenHeight(1.5),
      height: getScreenHeight(1.5),
      marginLeft: getScreenHeight(2.5),
    },
  });

export default CustomDropDown;
