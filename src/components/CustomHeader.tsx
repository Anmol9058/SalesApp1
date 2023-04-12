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

const CustomHeader = (props: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.title}>Delhi Tyres</Text>
        <Text style={styles.title}>1000092321</Text>
      </View>

      <View style={styles.contanier}>
        <FastImage
          resizeMode="contain"
          style={styles.logo}
          source={require('../assets/images/logolight.jpeg')}
        />
        <Pressable onPress={props.action} style={styles.drawercontanier}>
          <FastImage
            tintColor={theme.white}
            resizeMode="contain"
            style={styles.icon}
            source={require('../assets/images/drawer/home.png')}
          />
        </Pressable>
      </View>
    </View>
  );
};

const createStyles = theme =>
  StyleSheet.create({
    screen: {
      backgroundColor: theme.white,
      height: getScreenHeight(8),
      paddingHorizontal: getScreenHeight(1),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    title: {
      fontFamily: fonts.regular,
      color: theme.black,
      fontSize: getScreenHeight(1.8),
    },
    contanier: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '50%',
      justifyContent: 'space-evenly',
      height: getScreenHeight(10),
    },
    header: {
      width: '30%',
    },
    logo: {
      width: '70%',
      height: '100%',
    },
    drawercontanier: {
      width: getScreenHeight(4),
      height: getScreenHeight(4),
      backgroundColor: theme.black,
      borderRadius: getScreenHeight(5),
      justifyContent: 'center',
      alignItems: 'center',
    },
    icon: {
      width: getScreenHeight(2),
      height: getScreenHeight(2),
    },
  });

export default CustomHeader;
