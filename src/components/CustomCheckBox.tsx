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

const CustomCheckBox = (props: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <TouchableOpacity onPress={props.action} style={styles.screen}>
      <View style={styles.checkBoxContanier}>
        {props.selected ? (
          <FastImage
            resizeMode="contain"
            source={Images.tick}
            style={styles.icon}
          />
        ) : null}
      </View>
      {props.terms ? (
        <TouchableOpacity
          onPress={props.mainAction}
          disabled={props.mainAction ? false : true}>
          <Text style={styles.title}>
            I’ve read and accept the <Text>terms & conditions</Text>
          </Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.title}>{props.title}</Text>
      )}
    </TouchableOpacity>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    screen: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    checkBoxContanier: {
      height: getScreenHeight(2.5),
      width: getScreenHeight(2.5),
      backgroundColor: '#D9D9D9',
      borderColor: '#6F7EA8',
      borderWidth: getScreenHeight(0.1),
      marginRight: getScreenHeight(1),
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      color: theme.black,
      fontFamily: fonts.regular,
      fontSize: getScreenHeight(1.8),
    },
    icon: {
      width: getScreenHeight(1.5),
      height: getScreenHeight(1.5),
    },
  });

export default CustomCheckBox;
