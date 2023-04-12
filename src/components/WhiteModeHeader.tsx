import React, {useContext, useMemo} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import fonts from '../constants/fonts';
import Images from '../constants/images';

import {authContext, themeContext} from '../contexts/context';
import {getScreenHeight, getScreenWidth} from '../utils/domUtil';
import Spacer from './Spacer';

const WhiteModeHeader = (props: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const {user_data}: any = useContext(authContext);

  return (
    <View style={styles.screen}>
      <FastImage
        resizeMode="contain"
        style={styles.logo}
        source={require('../assets/images/logopng.png')}
      />
      <View style={styles.row}>
        {props.back ? (
          <TouchableOpacity onPress={props.action} style={styles.iconContanier}>
            <FastImage
              tintColor={theme.white}
              source={Images.back}
              style={styles.icon}
            />
          </TouchableOpacity>
        ) : null}
        <View>
          <Text style={styles.title}>{user_data?.Name}</Text>
          <Text style={styles.subtitle}>{user_data?.Customer_No__c}</Text>
        </View>
      </View>
      <Spacer />
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    screen: {
      backgroundColor: theme.black,
      paddingHorizontal: getScreenHeight(1),
    },
    logo: {
      width: getScreenWidth(50),
      height: getScreenHeight(8),
    },
    title: {
      fontFamily: fonts.medium,
      color: theme.white,
      fontSize: getScreenHeight(2),
    },
    subtitle: {
      fontFamily: fonts.regular,
      color: theme.light_accent,
      fontSize: getScreenHeight(1.5),
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    icon: {
      width: getScreenHeight(2),
      height: getScreenHeight(2),
    },
    iconContanier: {
      width: '10%',
    },
  });

export default WhiteModeHeader;
