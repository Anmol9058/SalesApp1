import React, { useContext, useMemo, useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
  Image
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import RNSpeedometer from 'react-native-speedometer';
import {

  Title,
  Body
} from "native-base";
import {
  VictoryChart,
  VictoryTheme,
  VictoryLine,
  VictoryAxis,
  VictoryScatter,
  VictoryGroup,
} from 'victory-native';

import CustomStatusBar from '../components/CustomStatusBar';
import Spacer from '../components/Spacer';
import fonts from '../constants/fonts';
import { authContext, themeContext } from '../contexts/context';
import { formatPrice, getScreenHeight } from '../utils/domUtil';
import HomeItem from '../components/HomeItem';
import CustomButton from '../components/CustomButton';

const MainHome = ({ navigation }: any) => {
  const { theme } = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { user_data, availableCreditLimit, setIcon }: any =
    useContext(authContext);

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <CustomStatusBar color={theme.primary} light />
      <View style={styles.screen}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            alignSelf: "center",
            marginBottom: getScreenHeight(1),
          }}
        >
          <Image
            style={{ top: "1%", width: getScreenHeight(8), height: getScreenHeight(8), borderRadius: 36, marginLeft: '-14%' }}
            source={require("../assets/images/pic.jpg")}
          />
        <View style={{ display: "flex", flexDirection: "column" }}>
         
            <Text
              style={{ fontSize: 22, left: "10%", color: "black" }}>
              Hello, Ridham!!
            </Text>

            <Text
              style={{ fontSize: 13, left: "10%", color: "#9A9A9A" }}>
              Welcome back to your account
            </Text>
          </View> 
          <TouchableOpacity
            onPress={() => navigation.navigate('Notification')}
          >
            <Image
              source={require("../assets/images/bell.png")}
              style={{ width: 30, height: 32, bottom: "2%", left: "75%" }}

            />
          </TouchableOpacity>
        </View>
        <View style={styles.headerContanier}>

          <Text style={styles.title}> ***** IMPORTANT INFORMATION *****</Text>
          {/* <Text style={styles.subtitle}>1234567</Text> */}
        </View>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Spacer height={getScreenHeight(2)} />
          <View style={styles.row}>
            <HomeItem
              price={user_data&&user_data.Credit_Limit__c?formatPrice(user_data.Credit_Limit__c):'0'}
              title="Total Limit"
              image={require('../assets/images/home/totallimit.png')}
            />
            <HomeItem
              price={user_data&&user_data.Credit_Limit__c?formatPrice(user_data.Credit_Limit__c):"0"}
              title="Outstanding"
              image={require('../assets/images/home/outstanding.png')}
            />
          </View>
          <Spacer height={getScreenHeight(2)} />
          <View style={styles.row}>
            <HomeItem
              price={formatPrice(
                user_data?.Overdue_Amount__c ? user_data?.Overdue_Amount__c : 0,
              )}
              title="Overdue"
              image={require('../assets/images/home/overdue.png')}
            />
            <HomeItem
              price={formatPrice(
                availableCreditLimit
                  ? availableCreditLimit[0]?.AvailableBalance
                  : 0,
              )}
              title="Available Limit"
              image={require('../assets/images/home/avalimit.png')}
            />
          </View>
          <Spacer height={getScreenHeight(2)} />
          <Text
            style={[
              styles.itemText,
              { textAlign: 'center', width: '90%', alignSelf: 'center' },
            ]}>
            <Text style={{ fontFamily: fonts.bold }}>
              {user_data?.Percentage_of_dealer_ahead__c}{' '}
            </Text>
            dealers are ahead of you in terms of payment. Pay faster to get
            higher benefits!
          </Text>
          <Spacer height={getScreenHeight(2)} />
          <ScrollView horizontal>
            <View
              style={[
                styles.textContanier,
                { borderWidth: getScreenHeight(0.1) },
              ]}>
              <Text style={styles.itemText}>Registered</Text>
            </View>
            <View style={styles.textContanier}>
              <Text style={styles.itemText}>On Hold</Text>
            </View>
            <View style={styles.textContanier}>
              <Text style={styles.itemText}>Accepted</Text>
            </View>
            <View style={styles.textContanier}>
              <Text style={styles.itemText}>Completed</Text>
            </View>
          </ScrollView>
          <View style={styles.chartContanier}>
            <VictoryChart
              theme={VictoryTheme.grayscale}
              height={getScreenHeight(25)}
              animate={{
                duration: 2000,
                onLoad: { duration: 0 },
              }}>
              <VictoryGroup
                color={theme.primary_light}
                data={[
                  { x: 100, y: 100 },
                  { x: 400, y: 300 },
                  { x: 200, y: 500 },
                  { x: 700, y: 700 },
                  { x: 500, y: 900 },
                ]}>
                <VictoryLine
                  style={{
                    data: { stroke: theme.primary_light },
                    parent: { border: '1px solid #000' },
                  }}
                />
                <VictoryScatter size={6} symbol="circle" />
              </VictoryGroup>
              <VictoryAxis
                dependentAxis
                tickFormat={tick => `${tick}`}
                style={{
                  axisLabel: {
                    fontSize: getScreenHeight(2),
                    fontFamily: fonts.regular,
                  },
                  axis: { stroke: 'transparent' },
                  ticks: { stroke: 'transparent' },
                  grid: { stroke: '#CCCCCC', strokeWidth: 0.5 },
                  tickLabels: {
                    fontSize: getScreenHeight(1.2),
                    fontFamily: fonts.regular,
                  },
                }}
              />
            </VictoryChart>
          </View>
          <Spacer height={getScreenHeight(2)} />

          <View style={styles.contanier}>
            <View>
              <View style={styles.normalRow}>
                <Text style={styles.itemText}>All</Text>
                <FastImage
                  style={styles.icon}
                  resizeMode="contain"
                  source={require('../assets/images/arrows/downarrow.png')}
                />
              </View>
              <Text style={styles.itemText}>Claim status</Text>
            </View>

            <View>
              <Text style={styles.itemText}>Registered</Text>
              <Text style={[styles.mainTitle, { color: theme.black }]}>700</Text>
            </View>
          </View>
          <Spacer height={getScreenHeight(4)} />

          <View style={styles.normalRow}>
            <View style={{ width: '60%' }}>
              <View style={styles.row}>
                <View>
                  <Text style={styles.itemText}>Target</Text>
                  <Text style={[styles.mainTitle, { color: theme.black }]}>
                    165
                  </Text>
                </View>
                <View>
                  <Text style={styles.itemText}> Achieved Target</Text>
                  <Text style={[styles.mainTitle, { color: theme.black }]}>
                    50
                  </Text>
                </View>
              </View>
              <RNSpeedometer
                value={70}
                size={getScreenHeight(20)}
                minValue={0}
                innerCircleStyle={{ backgroundColor: theme.white }}
                maxValue={200}
                easeDuration={5000}
                labelStyle={{ fontFamily: fonts.semiBold, color: theme.white }}
                labels={[
                  {
                    name: '',
                    labelColor: theme.primary_light,
                    activeBarColor: theme.primary_light,
                  },
                  {
                    name: '',
                    labelColor: '#DEDCDC',
                    activeBarColor: '#DEDCDC',
                  },
                ]}
              />
            </View>
            <View style={styles.divider} />
            <View style={{ width: '60%' }}>
              <View>
                <Text style={[styles.mainTitle, { color: theme.black }]}>
                  115
                </Text>
                <Text style={styles.itemText}>Remaining Target</Text>
              </View>
              <Spacer height={getScreenHeight(4)} />
              <View>
                <Text style={[styles.mainTitle, { color: theme.black }]}>16</Text>
                <Text style={styles.itemText}>Days Left</Text>
              </View>
            </View>
          </View>
          <Spacer height={getScreenHeight(4)} />
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
      height: getScreenHeight(8),
      backgroundColor: theme.white,
      flexDirection: 'row'
    },
    logo: {
      height: getScreenHeight(9),
      width: getScreenHeight(26),
    },
    headerContanier: {
      backgroundColor: theme.primary,
      height: getScreenHeight(4),
      paddingHorizontal: getScreenHeight(2),
      justifyContent: 'center',
    },
    title: {
      fontSize: getScreenHeight(1.8),
      color: '#ffffff',
      fontFamily: fonts.bold,
    },
    subtitle: {
      fontSize: getScreenHeight(1.5),
      color: '#ffffff',
      fontFamily: fonts.regular,
    },
    scrollView: {
      paddingHorizontal: getScreenHeight(2),
    },
    row: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    itemText: {
      fontSize: getScreenHeight(1.5),
      color: theme.black,
      fontFamily: fonts.medium,
    },
    textContanier: {
      marginRight: getScreenHeight(4),
      borderColor: theme.primary_light,
      padding: getScreenHeight(1),
      borderRadius: getScreenHeight(2),
    },
    chartContanier: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
    },
    contanier: {
      backgroundColor: '#E6E6E6',
      padding: getScreenHeight(2),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderRadius: getScreenHeight(2),
    },
    normalRow: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    icon: {
      height: getScreenHeight(2),
      width: getScreenHeight(2),
      marginLeft: getScreenHeight(1),
    },
    mainTitle: {
      fontFamily: fonts.bold,
      fontSize: getScreenHeight(2.5),
      color: theme.primary,
    },
    divider: {
      backgroundColor: '#4D4D4D',
      width: getScreenHeight(0.1),
      height: getScreenHeight(20),
      marginHorizontal: getScreenHeight(2),
    },
  });

export default MainHome;
