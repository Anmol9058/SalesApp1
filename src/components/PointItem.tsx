import React, {useContext, useMemo} from 'react';
import {View, StyleSheet, Text, Platform} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import fonts from '../constants/fonts';
import {themeContext} from '../contexts/context';
import {getScreenHeight} from '../utils/domUtil';

const PointItem = (props: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.contanier}>
      <Text style={styles.title}>{props.item.title}</Text>
      <Text style={styles.value}>{props.item.value}</Text>
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    contanier: {
      backgroundColor: theme.white,
      padding: getScreenHeight(2),
      borderRadius: getScreenHeight(1),
    },
    title: {
      fontFamily: fonts.bold,
      fontSize: getScreenHeight(1.8),
      color: theme.black,
    },
    value: {
      fontFamily: fonts.bold,
      fontSize: getScreenHeight(3),
      color: theme.primary,
    },
  });

export default PointItem;
