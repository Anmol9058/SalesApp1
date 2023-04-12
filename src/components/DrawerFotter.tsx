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

import {themeContext} from '../contexts/context';
import {getScreenHeight} from '../utils/domUtil';

const DrawerFotter = (props: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.contanier}>
      <View style={styles.header}>
        {/* <TouchableOpacity onPress={props.leftAction}>
          <Text style={styles.fotterTitle}>Privacy policy</Text>
        </TouchableOpacity> */}
        <View style={styles.divider} />
        {/* <TouchableOpacity onPress={props.rightAction}>
          <Text style={styles.fotterTitle}>Terms and conditions</Text>
        </TouchableOpacity> */}
      </View>

      <View style={styles.fotter}>
        <FastImage
          resizeMode={'contain'}
          style={styles.icon}
          source={require('../assets/images/social/instagram.png')}
        />

        <FastImage
          resizeMode={'contain'}
          style={styles.icon}
          source={require('../assets/images/social/facebook.png')}
        />

        <FastImage
          resizeMode={'contain'}
          style={styles.icon}
          source={require('../assets/images/social/twitter.png')}
        />

        <FastImage
          resizeMode={'contain'}
          style={styles.icon}
          source={require('../assets/images/social/youtube.png')}
        />
      </View>
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    contanier: {
      alignItems: 'center',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    fotterTitle: {
      fontSize: getScreenHeight(1.5),
      fontFamily: fonts.regular,
      color: theme.white,
      padding: getScreenHeight(2),
      textDecorationLine: 'underline',
    },
    divider: {
      height: getScreenHeight(1.5),
      width: getScreenHeight(0.1),
      backgroundColor: theme.white,
    },
    fotter: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    icon: {
      height: getScreenHeight(2),
      width: getScreenHeight(2),
      marginHorizontal: getScreenHeight(0.5),
    },
  });

export default DrawerFotter;
