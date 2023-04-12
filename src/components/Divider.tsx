import React, {useContext, useMemo} from 'react';
import {View, StyleSheet} from 'react-native';

import {themeContext} from '../contexts/context';
import {getScreenHeight, getScreenWidth} from '../utils/domUtil';

const Divider = (props: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View
      style={[
        styles.contanier,
        {
          width: props.width ? props.width : '100%',
          height: props.height ? props.height : getScreenHeight(0.1),
          backgroundColor: props.color ? props.color : theme.white,
        },
      ]}
    />
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    contanier: {
      backgroundColor: theme.white,
      height: getScreenHeight(0.2),
      marginTop: getScreenHeight(1),
    },
  });

export default Divider;
