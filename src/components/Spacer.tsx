import React, {useContext, useMemo} from 'react';
import {View, StyleSheet} from 'react-native';

import {themeContext} from '../contexts/context';
import {getScreenHeight} from '../utils/domUtil';

const Spacer = (props: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={{height: props.height ? props.height : getScreenHeight(1)}} />
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    contanier: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default Spacer;
