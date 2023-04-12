import React, {useContext, useMemo} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import fonts from '../constants/fonts';

import {themeContext} from '../contexts/context';
import {getScreenHeight, getScreenWidth} from '../utils/domUtil';

const CustomSearchBar = (props: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.screen}>
      <View style={styles.iconContanier}>
        <FastImage
          tintColor={theme.accent}
          style={styles.icon}
          source={require('../assets/images/common/search.png')}
        />
      </View>
      <TextInput
        value={props.value}
        onChangeText={props.action}
        style={styles.textinput}
        placeholder={props.placeholder}
        placeholderTextColor={theme.subtitle}
      />
      {props.rightIcon ? (
        <TouchableOpacity
          onPress={props.rightAction}
          style={styles.iconContanier}>
          <FastImage
            tintColor={theme.accent}
            style={styles.icon}
            source={require('../assets/images/common/filter.png')}
          />
        </TouchableOpacity>
      ) : null}
    </View>
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
      // paddingHorizontal: getScreenHeight(2),
      width: '100%',
      borderColor: theme.black,
      borderWidth: getScreenHeight(0.1),
    },
    icon: {
      height: getScreenHeight(2),
      width: getScreenHeight(2),
    },
    textinput: {
      fontFamily: fonts.regular,
      fontSize: getScreenHeight(1.8),
      flex: 1,
      color: theme.black,
    },
    iconContanier: {
      width: '10%',
      justifyContent: 'center',
      alignItems: 'center',
      height: getScreenHeight(6),
      // backgroundColor: 'red',
    },
  });

export default CustomSearchBar;
