import React, {useContext, useMemo} from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import RNSpeedometer from 'react-native-speedometer';

import fonts from '../constants/fonts';
import {themeContext} from '../contexts/context';
import {getScreenHeight, getScreenWidth} from '../utils/domUtil';

const MonthTarget = (props: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <LinearGradient colors={['#000000', '#606060']} style={styles.screen}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <View style={styles.header}>
          <View style={styles.leftHeader}>
            <View style={styles.simpleRow}>
              <View style={styles.column}>
                <View style={styles.normalRow}>
                  <FastImage
                    resizeMode="contain"
                    tintColor={theme.white}
                    style={styles.icon}
                    source={require('../assets/images/badge.png')}
                  />
                  <Text
                    style={[
                      styles.contanierSubtitle,
                      {
                        width: '50%',
                        marginLeft: getScreenHeight(0.5),
                        fontSize: getScreenHeight(1.2),
                      },
                    ]}>
                    BOOSTER TARGET
                  </Text>
                </View>
                <Text style={styles.contanierTitle}>165</Text>
              </View>
              <View style={styles.column}>
                <View style={styles.normalRow}>
                  <FastImage
                    resizeMode="contain"
                    tintColor={theme.white}
                    style={styles.icon}
                    source={require('../assets/images/badge.png')}
                  />
                  <Text
                    style={[
                      styles.contanierSubtitle,
                      {
                        width: '50%',
                        marginLeft: getScreenHeight(0.5),
                        fontSize: getScreenHeight(1.2),
                      },
                    ]}>
                    BOOSTER TARGET
                  </Text>
                </View>
                <Text style={styles.contanierTitle}>165</Text>
              </View>
            </View>
            <RNSpeedometer
              value={60}
              size={getScreenHeight(25)}
              minValue={0}
              innerCircleStyle={{backgroundColor: '#000000'}}
              maxValue={100}
              easeDuration={500}
              labelStyle={{fontFamily: fonts.semiBold, color: theme.white}}
              labels={[
                {
                  name: '',
                  labelColor: '#f4ab44',
                  activeBarColor: '#f4ab44',
                },
                {
                  name: '',
                  labelColor: '#f2cf1f',
                  activeBarColor: '#f2cf1f',
                },
                {
                  name: '',
                  labelColor: '#14eb6e',
                  activeBarColor: '#14eb6e',
                },
              ]}
            />
          </View>
          <View style={styles.rightHeader}>
            <View style={styles.contanier}>
              <Text style={styles.contanierTitle}>115</Text>
              <Text style={styles.contanierSubtitle}>
                Remaining Booster Target
              </Text>
            </View>
            <View style={styles.contanier}>
              <Text style={styles.contanierTitle}>16</Text>
              <Text style={styles.contanierSubtitle}>Days left</Text>
            </View>
            <View style={styles.contanier}>
              <Text style={styles.contanierTitle}>7</Text>
              <Text style={styles.contanierSubtitle}>Avg Bal Qty/day</Text>
            </View>
          </View>
        </View>

        <View style={styles.fotter}>
          <View style={styles.fottercontanier}>
            <View style={[styles.fottertitle, {backgroundColor: '#00CED1'}]}>
              <Text style={styles.fottertext}>Early Bird</Text>
            </View>

            <View style={styles.mainfotter}>
              <View style={styles.row}>
                <Text style={styles.rowTitle}>Target</Text>
                <Text style={styles.rowValue}>0</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.rowTitle}>Achieved</Text>
                <Text style={styles.rowValue}>50</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.rowTitle}>Remaining</Text>
                <Text style={styles.rowValue}>0</Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingVertical: getScreenHeight(1.5),
                }}>
                <Text style={styles.rowTitle}>Days Left</Text>
                <Text style={styles.rowValue}>4</Text>
              </View>
            </View>
          </View>

          <View style={styles.fottercontanier}>
            <View style={styles.fottertitle}>
              <Text style={styles.fottertext}>Product Mix</Text>
            </View>

            <View style={styles.mainfotter}>
              <View style={styles.row}>
                <Text style={styles.rowTitle}>Target</Text>
                <Text style={styles.rowValue}>0</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.rowTitle}>Achieved</Text>
                <Text style={styles.rowValue}>24</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.rowTitle}>Remaining</Text>
                <Text style={styles.rowValue}>0</Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingVertical: getScreenHeight(1.5),
                }}>
                <Text style={styles.rowTitle}>Days Left</Text>
                <Text style={styles.rowValue}>16</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    screen: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      height: getScreenHeight(40),
    },
    leftHeader: {
      width: '60%',
      justifyContent: 'space-evenly',
      height: getScreenHeight(40),
    },
    rightHeader: {
      flex: 1,
    },
    contanier: {
      height: getScreenHeight(10),
      borderColor: theme.yellow,
      borderLeftWidth: getScreenHeight(0.2),
      marginTop: getScreenHeight(2),
      paddingHorizontal: getScreenHeight(1),
      justifyContent: 'center',
    },
    contanierTitle: {
      color: theme.green,
      fontFamily: fonts.regular,
      fontSize: getScreenHeight(3),
    },
    contanierSubtitle: {
      fontFamily: fonts.regular,
      fontSize: getScreenHeight(1.5),
      color: theme.white,
      width: '70%',
    },
    fotter: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    fottercontanier: {
      flex: 0.5,
      marginVertical: getScreenHeight(3),
    },
    fottertitle: {
      height: getScreenHeight(6),
      backgroundColor: theme.yellow,
      justifyContent: 'center',
      alignItems: 'center',
    },
    fottertext: {
      fontFamily: fonts.regular,
      color: theme.white,
      fontSize: getScreenHeight(2),
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: getScreenHeight(1.5),
      borderBottomWidth: getScreenHeight(0.1),
      borderColor: theme.white,
    },
    rowTitle: {
      fontFamily: fonts.regular,
      color: theme.white,
      fontSize: getScreenHeight(2),
    },
    rowValue: {
      fontFamily: fonts.regular,
      color: theme.green,
      fontSize: getScreenHeight(2),
    },
    mainfotter: {
      paddingHorizontal: getScreenHeight(1.5),
      borderColor: theme.white,
      borderWidth: getScreenHeight(0.1),
    },
    simpleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      // backgroundColor: 'red',
    },
    icon: {
      width: getScreenHeight(3),
      height: getScreenHeight(3),
    },
    normalRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    column: {
      alignItems: 'center',
    },
  });

export default MonthTarget;
