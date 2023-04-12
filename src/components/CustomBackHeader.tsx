import React, {useContext, useMemo} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import fonts from '../constants/fonts';
import Images from '../constants/images';

import {themeContext} from '../contexts/context';
import {getScreenHeight} from '../utils/domUtil';

const CustomBackHeader = (props: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View
      style={[
        styles.screen,
        {backgroundColor: props.black ? theme.primary : theme.white},
      ]}>
      <TouchableOpacity onPress={props.action} style={styles.iconcontanier}>
        <FastImage
          tintColor={props.black ? theme.white : theme.black}
          resizeMode="contain"
          style={styles.icon}
          source={require('../assets/images/common/back.png')}
        />
      </TouchableOpacity>

      <Text
        style={[
          styles.title,
          {color: props.black ? theme.white : theme.black},
        ]}>
        {props.title ? props.title : 'Delhi Tyres'}
      </Text>

      {props.cart ? (
        <TouchableOpacity
          onPress={props.rightIconAction}
          style={styles.iconcontanier}>
          <FastImage
            source={Images.shoppingcart}
            tintColor={theme.white}
            resizeMode="contain"
            style={styles.icon}
          />
          {props.cartCount ? (
            <View style={styles.cartContanier}>
              <Text style={styles.cartCount}>{props.cartCount}</Text>
            </View>
          ) : null}
        </TouchableOpacity>
      ) : props.rightIcon ? (
        <TouchableOpacity
          onPress={props.rightIconAction}
          style={styles.iconcontanier}>
          <FastImage
            source={props.rightIcon}
            resizeMode="contain"
            style={styles.icon}
          />
        </TouchableOpacity>
      ) : (
        <View style={styles.iconcontanier} />
      )}
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    screen: {
      backgroundColor: theme.white,
      height: getScreenHeight(8),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    title: {
      fontFamily: fonts.bold,
      color: theme.black,
      fontSize: getScreenHeight(1.8),
    },
    icon: {
      width: getScreenHeight(2),
      height: getScreenHeight(2),
    },
    iconcontanier: {
      width: '10%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    cartContanier: {
      height: getScreenHeight(2),
      width: getScreenHeight(2),
      backgroundColor: theme.primary,
      borderRadius: getScreenHeight(2),
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      right: getScreenHeight(0.5),
      top: getScreenHeight(1.5),
      zIndex: 1000,
    },
    cartCount: {
      fontFamily: fonts.bold,
      color: theme.white,
      fontSize: getScreenHeight(1.2),
    },
  });

export default CustomBackHeader;
