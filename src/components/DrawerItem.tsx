import React, {useContext, useMemo} from 'react';
import {Text, StyleSheet, Pressable, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import fonts from '../constants/fonts';
import {themeContext} from '../contexts/context';
import {getScreenHeight} from '../utils/domUtil';

const DrawerItem = (props: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);
  if (!props?.item?.name) return <View />;
  return (
    <Pressable
      onPress={() => {
        props.action();
      }}
      style={styles.item}>
      <FastImage
        tintColor={theme.primary}
        resizeMode="contain"
        style={
          props.item.name === 'Product Policy' ? styles.newIcon : styles.icon
        }
        source={props?.item?.icon}
      />
      <Text style={styles.title}>{props?.item?.name}</Text>
    </Pressable>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    item: {
      justifyContent: 'center',
      alignItems: 'center',
      height: getScreenHeight(15),
      backgroundColor: '#E6E6E6',
      width: '100%',
      borderRadius: getScreenHeight(1),
    },
    icon: {
      height: getScreenHeight(3.5),
      width: getScreenHeight(3.5),
    },
    newIcon: {
      height: getScreenHeight(5),
      width: getScreenHeight(5),
    },
    title: {
      fontSize: getScreenHeight(1.4),
      fontFamily: fonts.regular,
      color: theme.black,
      marginTop: getScreenHeight(2),
      width: '70%',
      alignSelf: 'center',
      textAlign: 'center',
    },
  });

export default DrawerItem;
