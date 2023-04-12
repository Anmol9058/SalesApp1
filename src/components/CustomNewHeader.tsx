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

const CustomNewHeader = (props: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.screen}>
      <View style={styles.row}>
        <TouchableOpacity onPress={props.action} style={styles.iconcontanier}>
          <FastImage
            tintColor={theme.white}
            resizeMode="contain"
            style={styles.icon}
            source={require('../assets/images/common/back.png')}
          />
        </TouchableOpacity>

        <View style={styles.textContanier}>
          <Text style={styles.title}>
            {props.title ? props.title : 'Delhi Tyres'}
          </Text>
          {props.subtitle ? (
            <Text style={styles.subtitle}>{props.subtitle}</Text>
          ) : null}
        </View>
      </View>

      {props.rightIcon ? (
        <TouchableOpacity
          onPress={props.rightIconAction}
          style={styles.iconcontanier}>
          <FastImage
            tintColor={theme.primary_light}
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
      backgroundColor: theme.primary,
      height: getScreenHeight(8),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    title: {
      fontFamily: fonts.bold,
      color: theme.white,
      fontSize: getScreenHeight(1.8),
    },
    subtitle: {
      fontFamily: fonts.regular,
      color: theme.white,
      fontSize: getScreenHeight(1.4),
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
    textContanier: {
      marginLeft: getScreenHeight(2),
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      height: getScreenHeight(8),
    },
  });

export default CustomNewHeader;
