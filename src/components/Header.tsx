import React, {useContext, useMemo} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import fonts from '../constants/fonts';
import {themeContext} from '../contexts/context';
import {getScreenHeight, getScreenWidth} from '../utils/domUtil';
import Divider from './Divider';

const Header = (props: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View>
      <Text
        style={[styles.title, {color: props.dark ? theme.black : theme.white}]}>
        {props.title}
      </Text>
      {/* <Divider
        color={theme.black}
        width={getScreenWidth(20)}
        height={getScreenHeight(0.2)}
      /> */}
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    title: {
      fontFamily: fonts.bold,
      color: theme.white,
      fontSize: getScreenHeight(2.5),
      marginTop: getScreenHeight(1),
    },
  });

export default Header;
