import React, {useContext, useMemo} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SafeAreaView} from 'react-native-safe-area-context';
import ArrowButton from '../components/ArrowButton';
import CustomCircularProgressBar from '../components/CustomCircularProgressBar';
import RNSpeedometer from 'react-native-speedometer';
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryLine,
  VictoryAxis,
  VictoryScatter,
  VictoryGroup,
} from 'victory-native';

import CustomNewHeader from '../components/CustomNewHeader';
import CustomStatusBar from '../components/CustomStatusBar';
import Divider from '../components/Divider';
import Header from '../components/Header';
import Spacer from '../components/Spacer';
import fonts from '../constants/fonts';
import {themeContext} from '../contexts/context';
import {getScreenHeight} from '../utils/domUtil';

const SalesAppHome = ({navigation}: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <CustomStatusBar color={theme.black} light />
      <View style={styles.screen}>
        <View style={styles.header}>
          <FastImage
            resizeMode="contain"
            style={styles.image}
            source={require('../assets/images/logopng.png')}
          />
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <FastImage
              tintColor={theme.primary_light}
              resizeMode="contain"
              style={styles.icon}
              source={require('../assets/images/drawer/drawer.png')}
            />
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={styles.list}>
          <Text style={styles.title}>Ajnkya dealer</Text>
          <Text style={styles.subtitle}>1000000923212</Text>

          <View style={styles.chartContanier}>
            <VictoryChart
              height={getScreenHeight(20)}
              animate={{
                duration: 2000,
                onLoad: {duration: 1000},
              }}>
              <VictoryGroup
                color={theme.primary_light}
                data={[
                  {x: 1, y: 1},
                  {x: 2, y: 2},
                  {x: 3, y: 3},
                  {x: 4, y: 1},
                  {x: 5, y: 5},
                  {x: 6, y: 3},
                  {x: 7, y: 7},
                ]}>
                <VictoryLine
                  style={{
                    data: {stroke: '#c43a31'},
                    parent: {border: '1px solid #ccc'},
                  }}
                />
                <VictoryScatter size={6} symbol="circle" />
              </VictoryGroup>
              <VictoryAxis
                style={{
                  axis: {stroke: 'transparent'},
                  ticks: {stroke: 'transparent'},
                  tickLabels: {fill: 'transparent'},
                }}
              />
            </VictoryChart>
            <Text style={styles.heading}>
              67% percent dealer paying faster and ahead of youin terms of
              paymens and getting extra Incentive.
            </Text>
          </View>
          <View style={[styles.row, {marginVertical: getScreenHeight(2)}]}>
            <View style={styles.meterContanier}>
              <RNSpeedometer
                value={60}
                size={getScreenHeight(15)}
                minValue={0}
                innerCircleStyle={{backgroundColor: '#fff'}}
                maxValue={100}
                easeDuration={500}
                labelStyle={{
                  fontFamily: fonts.semiBold,
                  color: theme.white,
                }}
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
              <Spacer height={getScreenHeight(1)} />
              <Text style={styles.smallText}>75%</Text>
              <Spacer height={getScreenHeight(1)} />
              <Text style={[styles.title, {color: theme.black}]}>
                Current Month
              </Text>
              <Text style={[styles.subtitle, {color: theme.black}]}>
                Based On Quantity
              </Text>
            </View>

            {/* MIDDLE CONTANIER */}

            <View style={styles.meterContanier}>
              <RNSpeedometer
                value={35}
                size={getScreenHeight(15)}
                minValue={0}
                innerCircleStyle={{backgroundColor: '#fff'}}
                maxValue={100}
                easeDuration={500}
                labelStyle={{
                  fontFamily: fonts.semiBold,
                  color: theme.white,
                }}
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
              <Spacer height={getScreenHeight(1)} />
              <Text style={styles.smallText}>35%</Text>
              <Spacer height={getScreenHeight(1)} />
              <Text style={[styles.title, {color: theme.black}]}>
                Current Quater
              </Text>
              <Text style={[styles.subtitle, {color: theme.black}]}>
                Based On Quantity
              </Text>
            </View>
          </View>

          <View style={styles.headers}>
            <View style={styles.leftHeader}>
              <View style={styles.simpleRow}>
                <View style={styles.column}>
                  <Text
                    style={[
                      styles.contanierSubtitle,
                      {
                        marginLeft: getScreenHeight(0.5),
                        fontSize: getScreenHeight(1.2),
                      },
                    ]}>
                    Target
                  </Text>
                  <Text style={styles.contanierTitle}>165</Text>
                </View>
                <View style={styles.column}>
                  <Text
                    style={[
                      styles.contanierSubtitle,
                      {
                        marginLeft: getScreenHeight(0.5),
                        fontSize: getScreenHeight(1.2),
                      },
                    ]}>
                    Achieved Target
                  </Text>
                  <Text style={styles.contanierTitle}>165</Text>
                </View>
              </View>
              <RNSpeedometer
                value={60}
                size={getScreenHeight(20)}
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
            <View style={styles.divider} />
            <View style={styles.rightHeader}>
              <View style={styles.contanier}>
                <Text style={styles.contanierTitle}>115</Text>
                <Text style={styles.contanierSubtitle}>Remaining Target</Text>
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

          <View style={[styles.row, {marginVertical: getScreenHeight(2)}]}>
            <View>
              <Text style={styles.subtitle}>Total Limit</Text>
              <Text style={styles.title}>₹6,00,000</Text>
            </View>
            <View>
              <Text style={styles.subtitle}>Net out standing</Text>
              <Text style={styles.title}>₹115,544</Text>
            </View>
          </View>

          <Divider color="#4D4D4D" />

          <View style={styles.footer}>
            <Text style={styles.subtitle}>Available Limit</Text>
            <Text style={styles.title}>484,456</Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.white,
    },
    safe: {
      flex: 1,
      backgroundColor: theme.black,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: getScreenHeight(2),
    },
    image: {
      width: getScreenHeight(20),
      height: getScreenHeight(8),
    },
    icon: {
      width: getScreenHeight(2),
      height: getScreenHeight(2),
    },
    list: {
      paddingHorizontal: getScreenHeight(2),
    },
    title: {
      color: theme.white,
      fontFamily: fonts.bold,
      fontSize: getScreenHeight(1.8),
    },
    subtitle: {
      color: theme.white,
      fontFamily: fonts.medium,
      fontSize: getScreenHeight(1.5),
    },
    heading: {
      color: theme.white,
      fontFamily: fonts.medium,
      fontSize: getScreenHeight(1.4),
      textAlign: 'center',
    },
    smallText: {
      color: theme.black,
      fontFamily: fonts.medium,
      fontSize: getScreenHeight(1.5),
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    meterContanier: {
      width: '45%',
      padding: getScreenHeight(2),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: getScreenHeight(2),
      backgroundColor: theme.white,
    },
    headers: {
      flexDirection: 'row',
      alignItems: 'center',
      height: getScreenHeight(40),
      justifyContent: 'space-between',
      flex: 1,
    },
    divider: {
      backgroundColor: '#4D4D4D',
      width: getScreenHeight(0.1),
      height: getScreenHeight(30),
      marginRight: getScreenHeight(2),
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
      marginTop: getScreenHeight(2),
      paddingHorizontal: getScreenHeight(1),
      justifyContent: 'center',
    },
    contanierTitle: {
      color: theme.primary,
      fontFamily: fonts.bold,
      fontSize: getScreenHeight(3),
    },
    contanierSubtitle: {
      fontFamily: fonts.regular,
      fontSize: getScreenHeight(1.2),
      color: theme.white,
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
    normalRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    column: {
      alignItems: 'center',
    },
    footer: {
      marginVertical: getScreenHeight(2),
      justifyContent: 'center',
      alignItems: 'center',
    },
    chartContanier: {
      width: '80%',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      marginBottom: getScreenHeight(2),
    },
  });

export default SalesAppHome;
