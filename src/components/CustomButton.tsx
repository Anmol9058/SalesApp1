import React, {useContext, useMemo} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import fonts from '../constants/fonts';

import {themeContext} from '../contexts/context';
import {getScreenHeight} from '../utils/domUtil';

const CustomButton = (props: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <TouchableOpacity
      disabled={props.loading || props.disabled}
      onPress={props.action}
      style={[
        styles.screen,
        {
          justifyContent: props.align ? props.align : 'space-between',
          backgroundColor: props.color ? props.color : theme.primary,
          height: props.height ? props.height : getScreenHeight(6),
          borderRadius: props.notBorder ? 0 : getScreenHeight(0.5),
          elevation:props.Elevation?props.Elevation:3,
          width: props.width ? props.width : null,
          // margin: props.margin ? props.margin : null,
        },
      ]}>
      {/* {props.icon1 ? (
        <View style={{paddingRight: getScreenHeight(3)}}>{props.icon1}</View>
      ) : null} */}
      <Text
        numberOfLines={1}
        style={[
          styles.title,
          {
            fontSize: props.size ? props.size : getScreenHeight(2.2),
            fontFamily: props.font ? props.font : fonts.bold,
          },
        ]}>
        {props.title}
      </Text>

      {props.loading ? (
        <View style={{marginLeft: getScreenHeight(1)}}>
          <ActivityIndicator color={theme.white} />
        </View>
      ) : props.icon ? (
        <FastImage
          resizeMode="contain"
          tintColor={props.icon_color ? props.icon_color : theme.white}
          style={[
            styles.icon,
            {
              marginHorizontal: props.iconmargin ? props.iconmargin : 0,
            },
          ]}
          source={props.icon}
        />
      ) : (
        <View />
      )}
    </TouchableOpacity>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    screen: {
      paddingHorizontal: getScreenHeight(1),
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    title: {
      fontFamily: fonts.bold,
      color: theme.white,
      fontSize: getScreenHeight(2.2),
    },
    icon: {
      height: getScreenHeight(2.5),
      width: getScreenHeight(2.5),
    },
  });

export default CustomButton;
