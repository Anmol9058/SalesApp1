import React, {useContext, useMemo} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import fonts from '../constants/fonts';

import {themeContext} from '../contexts/context';
import {getScreenHeight, getScreenWidth} from '../utils/domUtil';

const NotFound = (props: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>
        {props.title ? props.title : 'No Data Found!'}
      </Text>
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    screen: {
      margin: getScreenHeight(2),
    },
    title: {
      fontSize: getScreenHeight(1.5),
      fontFamily: fonts.regular,
      color: theme.black,
    },
  });

export default NotFound;
