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

const ArrowButton = (props: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <TouchableOpacity
      disabled={props.loading}
      onPress={props.action}
      style={styles.screen}>
      <View />
      <Text numberOfLines={1} style={styles.title}>
        {props.title}
      </Text>

      {props.loading ? (
        <View style={{marginLeft: getScreenHeight(1)}}>
          <ActivityIndicator color={theme.white} />
        </View>
      ) : (
        <FastImage
          resizeMode="contain"
          tintColor={theme.white}
          style={styles.icon}
          source={require('../assets/images/arrows/arrowright.png')}
        />
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
      backgroundColor: theme.primary,
      height: getScreenHeight(6),
      borderRadius: getScreenHeight(1),
      justifyContent: 'center',
    },
    title: {
      fontFamily: fonts.regular,
      color: theme.white,
      fontSize: getScreenHeight(1.8),
    },
    icon: {
      height: getScreenHeight(2),
      width: getScreenHeight(2),
      marginLeft: getScreenHeight(1),
    },
  });

export default ArrowButton;
