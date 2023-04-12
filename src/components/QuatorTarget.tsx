import React, {useCallback, useContext, useMemo} from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import RNSpeedometer from 'react-native-speedometer';
import fonts from '../constants/fonts';

import {themeContext} from '../contexts/context';
import {getScreenHeight, getScreenWidth} from '../utils/domUtil';

const data = [
  {
    title: 'Booster Remaining Target',
    value: 'NA',
  },
  {
    title: 'Days Left',
    value: 'NA',
  },
  {
    title: 'Average Balance Quantity(Per day)',
    value: 'NA',
  },
];

const QuatorTarget = (props: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  const renderItem = useCallback(({item}: any) => {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.value}>{item.value}</Text>
      </View>
    );
  }, []);

  const seperator = useCallback(() => <View style={styles.sperator} />, []);

  return (
    <LinearGradient colors={['#000000', '#606060']} style={styles.screen}>
      <View style={styles.header}>
        <View style={styles.simpleRow}>
          <View>
            <View style={styles.normalRow}>
              <FastImage
                resizeMode="contain"
                tintColor={theme.white}
                style={styles.icon}
                source={require('../assets/images/badge.png')}
              />
              <View>
                <Text
                  style={[
                    styles.contanierSubtitle,
                    {
                      marginLeft: getScreenHeight(0.5),
                      fontSize: getScreenHeight(1.2),
                    },
                  ]}>
                  BOOSTER TARGET UNIT
                </Text>
                <Text style={styles.contanierTitle}>NA</Text>
              </View>
            </View>
          </View>
          <View>
            <View style={styles.normalRow}>
              <FastImage
                resizeMode="contain"
                tintColor={theme.white}
                style={styles.icon}
                source={require('../assets/images/badge.png')}
              />
              <View>
                <Text
                  style={[
                    styles.contanierSubtitle,
                    {
                      marginLeft: getScreenHeight(0.5),
                      fontSize: getScreenHeight(1.2),
                    },
                  ]}>
                  ACHIEVED
                </Text>
                <Text style={styles.contanierTitle}>NA</Text>
              </View>
            </View>
          </View>
        </View>
        <RNSpeedometer
          value={70}
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
      <FlatList
        data={data}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        ItemSeparatorComponent={seperator}
      />
    </LinearGradient>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    screen: {
      flex: 1,
    },
    header: {
      width: '100%',
      justifyContent: 'space-evenly',
      height: getScreenHeight(30),
      marginBottom: getScreenHeight(5),
    },
    contanierTitle: {
      color: theme.green,
      fontFamily: fonts.regular,
      fontSize: getScreenHeight(3),
    },
    contanierSubtitle: {
      fontFamily: fonts.regular,
      fontSize: getScreenHeight(1.2),
      color: theme.white,
    },
    icon: {
      width: getScreenHeight(3),
      height: getScreenHeight(3),
    },
    normalRow: {
      flexDirection: 'row',
    },
    simpleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      paddingHorizontal: getScreenHeight(2),
    },
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: getScreenHeight(1),
      height: getScreenHeight(6),
    },
    title: {
      fontFamily: fonts.medium,
      fontSize: getScreenHeight(1.5),
      color: theme.white,
    },
    value: {
      fontFamily: fonts.medium,
      fontSize: getScreenHeight(1.5),
      color: theme.yellow,
    },
    sperator: {
      backgroundColor: theme.light_accent,
      height: getScreenHeight(0.1),
      width: '100%',
    },
  });

export default QuatorTarget;
