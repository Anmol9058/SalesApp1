import React, {useCallback, useContext, useMemo, useState} from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

import {themeContext} from '../contexts/context';
import CustomStatusBar from '../components/CustomStatusBar';
import CustomHeader from '../components/CustomHeader';
import {getScreenHeight} from '../utils/domUtil';
import fonts from '../constants/fonts';
import FastImage from 'react-native-fast-image';
import CustomSearchBar from '../components/CustomSearchBar';
import CustomDropDown from '../components/CustomDropDown';
import PlaceOrderItem from '../components/PlaceOrderItem';

const Redeem = ({navigation}) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [search, setSearch] = useState('');

  const renderItem = useCallback(({ item }) => { 
    return (
      <View style={styles.item}>
        <PlaceOrderItem />
        </View>
        )
  }, [])

  return (
    <SafeAreaView edges={['top']} style={styles.screen}>
      <CustomStatusBar color={theme.white} />
      <View style={styles.screen}>
        <CustomHeader action={() => navigation.openDrawer()} />
        <LinearGradient
          colors={['#000000', '#606060']}
          style={styles.linearGradient}>
         
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
    fotter: {
      padding: getScreenHeight(2),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: theme.primary,
    },
    title: {
      fontFamily: fonts.regular,
      color: theme.white,
      fontSize: getScreenHeight(1.5),
    },
    header: {
      padding: getScreenHeight(2),
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconContanier: {
      width: '10%',
      height: getScreenHeight(6),
      justifyContent: 'center',
    },
    icon: {
      width: getScreenHeight(3.5),
      height: getScreenHeight(3.5),
      alignSelf: 'center',
    },
    dot: {
      width: getScreenHeight(2),
      height: getScreenHeight(2),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.white,
      borderRadius: getScreenHeight(2),
      position: 'absolute',
      right: -getScreenHeight(0.5),
      top: 0,
    },
    cartText: {
      fontFamily: fonts.bold,
      color: theme.accent,
      fontSize: getScreenHeight(1.2),
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingBottom: getScreenHeight(1),
    },
    item: {
      marginBottom: getScreenHeight(2)
    },
    flatlist: {
      padding: getScreenHeight(2),
    }
  });

export default Redeem;
