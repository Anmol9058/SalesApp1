import React, {useContext, useMemo} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {themeContext} from '../contexts/context';

const WebLinks = () => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View>
      <Text>WebLinks</Text>
    </View>
  );
};

const createStyles = theme =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: 'white',
    },
  });

export default WebLinks;
