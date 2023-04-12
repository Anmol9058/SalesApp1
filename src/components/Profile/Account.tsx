import React, {useContext, useMemo} from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import fonts from '../../constants/fonts';

import {themeContext} from '../../contexts/context';
import {getScreenHeight} from '../../utils/domUtil';
import Divider from '../Divider';
import Spacer from '../Spacer';

const data = [
  {
    name: 'PAN No.',
    email: 'ABCTY2345D',
  },
  {
    name: 'GST No.',
    email: '09FGTYR6578H0ZF',
  },
  {
    name: 'Proprieter/Partner Name',
    email: 'abc',
  },
];

const Account = (props: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  const renderItem = ({item}: any) => {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.title}>{item.email}</Text>
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
      paddingHorizontal: getScreenHeight(2),
      height: getScreenHeight(8),
      justifyContent: 'center',
    },
    title: {
      color: theme.white,
      fontFamily: fonts.bold,
      fontSize: getScreenHeight(1.6),
    },
  });

export default Account;
