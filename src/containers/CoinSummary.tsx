import React, {useContext, useMemo, useState} from 'react';
import {View, StyleSheet, Text, FlatList, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

import {themeContext} from '../contexts/context';
import CustomStatusBar from '../components/CustomStatusBar';
import CustomHeader from '../components/CustomHeader';
import Header from '../components/Header';
import {getScreenHeight} from '../utils/domUtil';
import fonts from '../constants/fonts';
import CustomButton from '../components/CustomButton';
import CoinItem from '../components/CoinItem';

const CoinSummary = ({navigation}) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  const renderItem = ({ item }) => {
    return (
      <View style = {styles.item}>
        <CoinItem />
    </View>
  )
}

  return (
    <SafeAreaView edges={['top']} style={styles.screen}>
      <CustomStatusBar color={theme.white} />
      <View style={styles.screen}>
        <CustomHeader action={() => navigation.openDrawer()} />
        <LinearGradient
          colors={['#000000', '#606060']}
          style={styles.linearGradient}>
          <View style={styles.header}>
            <Header title="Coin Summary" />
          </View>

          <FlatList
            data={[1, 2, 3]}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderItem}
            contentContainerStyle = {styles.flatlist}
          />

        </LinearGradient>
      </View>
    </SafeAreaView>
  );
};

const createStyles = theme =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: 'white',
    },
    linearGradient: {
      flex: 1,
    },
    header: {
      padding: getScreenHeight(1),
    },
    flatlist: {
      padding: getScreenHeight(2),
    },
    item: {
      marginBottom: getScreenHeight(2)
    }
  });

export default CoinSummary;
