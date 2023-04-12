import React, {useCallback, useContext, useMemo} from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

import {themeContext} from '../contexts/context';
import CustomStatusBar from '../components/CustomStatusBar';
import CustomHeader from '../components/CustomHeader';
import Header from '../components/Header';
import {getScreenHeight} from '../utils/domUtil';
import CardNoteItem from '../components/CardNoteItem';

const data = [
  {
    name: 'Scheme Name: Online Paid By SalesApp',
    date: '14',
    amount: 454,
    no: '302022112333',
  },
  {
    name: 'Scheme Name: Online Paid By SalesApp',
    date: '14',
    amount: 454,
    no: '302022112333',
  },
  {
    name: 'Scheme Name: Online Paid By SalesApp',
    date: '14',
    amount: 454,
    no: '302022112333',
  },
];

const CardsNotes = ({navigation}) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  const renderItem = useCallback(({item}) => {
    return (
      <View style={styles.item}>
        <CardNoteItem item={item} />
      </View>
    );
  }, []);

  return (
    <SafeAreaView edges={['top']} style={styles.screen}>
      <CustomStatusBar color={theme.white} />
      <View style={styles.screen}>
        <CustomHeader action={() => navigation.openDrawer()} />
        <LinearGradient
          colors={['#000000', '#606060']}
          style={styles.linearGradient}>
          <View style={styles.header}>
            <Header title="All Details" />
          </View>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={data}
            renderItem={renderItem}
            contentContainerStyle={styles.flatlist}
          />
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: 'white',
    },
    linearGradient: {
      flex: 1,
    },
    header: {
      padding: getScreenHeight(2),
    },
    flatlist: {
      paddingHorizontal: getScreenHeight(2),
    },
    item: {
      marginBottom: getScreenHeight(2),
    },
  });

export default CardsNotes;
