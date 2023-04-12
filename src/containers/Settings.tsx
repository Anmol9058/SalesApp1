import React, {useContext, useMemo} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {themeContext} from '../contexts/context';

const Settings = () => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View>
      <Text>Settings</Text>
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

export default Settings;
