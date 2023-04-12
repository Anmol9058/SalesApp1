import React, {useCallback, useContext, useMemo} from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomNewHeader from '../../components/CustomNewHeader';
import CustomStatusBar from '../../components/CustomStatusBar';
import Spacer from '../../components/Spacer';
import fonts from '../../constants/fonts';

import {themeContext} from '../../contexts/context';
import {getScreenHeight} from '../../utils/domUtil';

const Orders = ({navigation}: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <SafeAreaView edges={['top']} style={styles.screen}>
      <CustomStatusBar color={theme.black} light />
      <View style={styles.screen}>
        <CustomNewHeader action={() => navigation.goBack()} title="About Us" />
        <ScrollView style={styles.scroll}>
          <Text style={styles.subtitle}>
            SalesApp Rubber company with a legacy of over 100 years was
            established in October 1917, Tokyo Japan, with a founding spirit
            that values economic efficiency and social qualities with a core
            values of aim to producing some of the finest product in the world
            for motorist SalesApp India, 100% subsidiary of SalesApp Rubber
            company ltd, Japan was established in April 2007. Working on the
            same philosophy as its parent company, SalesApp India is committed
            to supply best quality range of Passenger car/SUV radial tyres
            aiding Indian motorist get more from their motoring lifestyle.
          </Text>
          <Spacer height={getScreenHeight(2)} />
          <Text style={styles.subtitle}>
            In line with various drivers’ preferences, SalesApp boasts a tyre
            lineup that meets a diversity of driving scenarios, including tyres
            for sports cars, luxury sedans, sport utility vehicles and dress-up
            vehicles as well as stud less tyres. Passenger car tyres, which
            respond to all kinds of driving needs are the embodiment of
            SalesApp’s technologies.
          </Text>
          <Spacer height={getScreenHeight(4)} />

          <View style={styles.fotter}>
            <View style={styles.titleItem}>
              <Text style={styles.title}>Company legal name:</Text>
              <Text style={styles.subtitle}>
                SalesApp India Private Limited
              </Text>
            </View>

            <View style={styles.titleItem}>
              <Text style={styles.title}>PAN number:</Text>
              <Text style={styles.subtitle}>AAACY3005G</Text>
            </View>

            <View style={styles.titleItem}>
              <Text style={styles.title}>Telephone Number:</Text>
              <Text style={styles.subtitle}>1276-662200</Text>
            </View>

            <View style={styles.titleItem}>
              <Text style={styles.title}>CIN number:</Text>
              <Text style={styles.subtitle}>U25190HR2007FTC081296</Text>
            </View>

            <View style={styles.titleItem}>
              <Text style={styles.title}>GSTN number:</Text>
              <Text style={styles.subtitle}>06AAACy3005G1ZR</Text>
            </View>

            <View style={styles.titleItem}>
              <Text style={styles.title}>
                Operation and registered address:
              </Text>
              <Text style={styles.subtitle}>
                HSIIDC, Plot No. 1 - 4B, Bahadurgarh Industrial Estate,
                Bahadurgarh, Haryana 124507
              </Text>
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
      backgroundColor: theme.black,
    },
    header: {
      padding: getScreenHeight(2),
    },
    list: {
      paddingHorizontal: getScreenHeight(2),
    },
    item: {
      marginTop: getScreenHeight(2),
    },
    subtitle: {
      fontSize: getScreenHeight(1.6),
      fontFamily: fonts.regular,
      color: theme.white,
    },
    title: {
      fontSize: getScreenHeight(1.6),
      fontFamily: fonts.semiBold,
      color: theme.white,
    },
    scroll: {
      paddingHorizontal: getScreenHeight(1),
    },
    fotter: {
      backgroundColor: '#333333',
      paddingHorizontal: getScreenHeight(2),
      borderRadius: getScreenHeight(1),
      paddingTop: getScreenHeight(2),
    },
    titleItem: {
      marginBottom: getScreenHeight(2),
    },
  });

export default Orders;
