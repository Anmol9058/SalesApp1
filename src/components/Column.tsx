import React, {useContext, useMemo} from 'react';
import {View, StyleSheet} from 'react-native';

import {themeContext} from '../contexts/context';

const Column = ({children}: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  return <View style={styles.contanier}>{children}</View>;
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    contanier: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default Column;
