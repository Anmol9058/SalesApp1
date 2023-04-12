import React, {useContext, useMemo} from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import fonts from '../../constants/fonts';

import {themeContext} from '../../contexts/context';
import {getScreenHeight} from '../../utils/domUtil';
import Divider from '../Divider';
import Spacer from '../Spacer';

const data = [
  'Ship110099876-Gala No.Datihave Vasi East-Paighar',
  'Ship110099876-Gala No.Datihave Vasi East-Paighar',
];

const ShipTo = (props: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  const renderItem = ({item}: any) => {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{item}</Text>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={['#000000', '#000000']}
      style={styles.linearGradient}>
      <Spacer height={getScreenHeight(3)} />
      <FlatList
        data={data}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <Divider color="#393A3A" />}
      />
    </LinearGradient>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    contanier: {
      padding: getScreenHeight(2),
    },
    linearGradient: {
      flex: 1,
    },
    item: {
      height: getScreenHeight(8),
      justifyContent: 'center',
      paddingHorizontal: getScreenHeight(2),
    },
    title: {
      color: theme.white,
      fontFamily: fonts.bold,
      fontSize: getScreenHeight(1.6),
    },
  });

export default ShipTo;
