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
import FastImage from 'react-native-fast-image';

const CardReport = ({navigation}: any) => {
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
            <Header title="Credit/Debit Report" />
            <Text style={styles.subtitle}>
              To Receive Credit/Debit Notes on Your Registered email-id, Please
              Select Date and Press Submit
            </Text>
          </View>

          <View style={styles.contanier}>
            <View style={styles.cal}>
              <View style={styles.calContanier}>
                <Text style={styles.title}>From Date</Text>
                <FastImage
                  tintColor={theme.yellow}
                  resizeMode="contain"
                  style={styles.icon}
                  source={require('../assets/images/calendar.png')}
                />
              </View>
              <View style={styles.calContanier}>
                <Text style={styles.title}>To Date</Text>
                <FastImage
                  tintColor={theme.yellow}
                  resizeMode="contain"
                  style={styles.icon}
                  source={require('../assets/images/calendar.png')}
                />
              </View>
            </View>
            <CustomButton notBorder title="SUBMIT" />
          </View>
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
    subtitle: {
      fontFamily: fonts.regular,
      color: theme.white,
      width: '60%',
      fontSize: getScreenHeight(1.8),
      marginVertical: getScreenHeight(2),
    },
    contanier: {
      paddingHorizontal: getScreenHeight(2),
    },
    calContanier: {
      height: getScreenHeight(6),
      backgroundColor: theme.white,
      borderColor: theme.black,
      borderBottomWidth: getScreenHeight(0.1),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: getScreenHeight(2),
    },
    cal: {
      marginBottom: getScreenHeight(4),
    },
    title: {
      fontFamily: fonts.bold,
      fontSize: getScreenHeight(1.8),
      color: theme.primary,
    },
    icon: {
      width: getScreenHeight(2.5),
      height: getScreenHeight(2.5),
    },
  });

export default CardReport;
