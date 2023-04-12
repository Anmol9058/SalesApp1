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
import FastImage from 'react-native-fast-image';

const ChequeDepositRegister = ({navigation}: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <SafeAreaView edges={['top']} style={styles.screen}>
      <CustomStatusBar color={theme.white} />
      <View style={styles.screen}>
        <CustomHeader action={() => navigation.openDrawer()} />
        <LinearGradient
          colors={['#000000', '#606060']}
          style={styles.linearGradient}>
          <View style={styles.header}>
            <Header title="Cheque Deposit Register" />
          </View>

          <View style={styles.contanier}>
            <Text style={styles.title}>No Data Available</Text>
          </View>
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
      padding: getScreenHeight(1),
    },

    contanier: {
      paddingHorizontal: getScreenHeight(2),
    },
    title: {
      fontFamily: fonts.medium,
      color: theme.subtitle,
      margin: getScreenHeight(2),
      alignSelf: 'center',
    },
  });

export default ChequeDepositRegister;
