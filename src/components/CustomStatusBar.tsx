import React, {useContext, useMemo} from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {themeContext} from '../contexts/context';

const CustomStatusBar = (props: any) => {
  const {theme, currentTheme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <StatusBar
      backgroundColor={props.color ? props.color : theme.primary_light}
      barStyle={props.light ? 'light-content' : 'dark-content'}
    />
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    status: {
      backgroundColor: theme.primary_light,
    },
  });

export default CustomStatusBar;
