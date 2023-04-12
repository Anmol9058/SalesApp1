import React, {useContext, useMemo} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import fonts from '../constants/fonts';
import {themeContext} from '../contexts/context';
import {getScreenHeight, getScreenWidth} from '../utils/domUtil';

const RowItem = props => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>{props.item.name}</Text>
      <Text style={styles.value}>{props.item.value}</Text>
    </View>
  );
};

const createStyles = theme =>
  StyleSheet.create({
    screen: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      fontFamily: fonts.regular,
      fontSize: getScreenHeight(2),
      color: theme.white,
    },
    value: {
      fontFamily: fonts.regular,
      fontSize: getScreenHeight(2),
      color: theme.green,
    },
  });

export default RowItem;
