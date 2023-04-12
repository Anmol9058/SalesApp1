import React, {useContext, useMemo} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import fonts from '../constants/fonts';

import {themeContext} from '../contexts/context';
import {getScreenHeight} from '../utils/domUtil';

const CoinItem = props => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.contanier}>
      <Text style={styles.title}>Total Coins Earned</Text>
      <Text style={styles.subtitle}>16543566</Text>
    </View>
  );
};

const createStyles = theme =>
  StyleSheet.create({
    contanier: {
      backgroundColor: theme.white,
      height: getScreenHeight(15),
      width: '50%',
      borderRadius: getScreenHeight(2),
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    title: {
      fontFamily: fonts.bold,
      color: theme.black,
      fontSize: getScreenHeight(2),
    },
    subtitle: {
      fontFamily: fonts.regular,
      color: theme.primary,
      fontSize: getScreenHeight(2.5),
    },
  });

export default CoinItem;
