import React, {useCallback, useContext, useMemo} from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import CustomNewHeader from '../components/CustomNewHeader';
import CustomStatusBar from '../components/CustomStatusBar';
import Header from '../components/Header';
import Spacer from '../components/Spacer';
import fonts from '../constants/fonts';
import {authContext, themeContext} from '../contexts/context';
import {getScreenHeight} from '../utils/domUtil';

const WarrantyPolicy = ({navigation}: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const {user_data}: any = useContext(authContext);

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <CustomStatusBar color={theme.black} light />
      <View style={styles.screen}>
        <CustomNewHeader
          subtitle={user_data?.Customer_No__c ? user_data?.Customer_No__c : ''}
          action={() => navigation.goBack()}
          title={user_data?.Name ? user_data?.Name : ''}
        />
        <ScrollView style={styles.scroll}>
          <Header dark title="Warranty Policy" />

          <Spacer height={getScreenHeight(2)} />
          <Text style={styles.subtitle}>1. TYRE WARRANTY ELIGIBILITY:</Text>
          <Text style={styles.subtitle}>
            This Warranty applies to all passenger car tyres and SUV tyres
            (excluding RFT tyres & AE30 BluEarth) sold only by authorised
            dealers of SalesApp INDIA PVT LTD.
          </Text>
          <Spacer height={getScreenHeight(2)} />
          <Text style={styles.subtitle}>
            2. WHAT TYRE IS WARRANTED (AND HOW LONG):
          </Text>
          <Text style={styles.subtitle}>
            SalesApp passenger car tyres and SUV tyres are covered under Life
            Time Protection Program for 60 months from the date of registration
            of sale (Effective from 1st July 2022) or up to 50% tread wear on
            pro-rata basis, whichever comes earlier, other than the damages
            specified on ITEM 4 warranty in proportion to tread wear.
          </Text>
          <Spacer height={getScreenHeight(2)} />
          <Text style={styles.subtitle}>
            3. Kindly note all the claims under this policy is subject to
            warranty registration done on SalesApp Smart Service application by
            authorised dealers of SalesApp INDIA PVT LTD within 7 days of
            purchase of tyre. Customer would be provided with a unique warranty
            code on their registered phone number by SMS at the end of
            registration process. The unique code needs to be provided during
            claim.
          </Text>
          <Spacer height={getScreenHeight(2)} />
          <Text style={styles.subtitle}>
            4. TYRES NOT COVERED IN THIS WARRANTY.
          </Text>
          <Spacer height={getScreenHeight(2)} />
          <Text style={styles.subtitle}>
            A. Tyres not registered by authorised dealers of SalesApp INDIA PVT
            LTD.
          </Text>
          <Spacer height={getScreenHeight(2)} />
          <Text style={styles.subtitle}>
            B. Completed the Life Time Protection Program tenure of 60 months.
          </Text>
          <Spacer height={getScreenHeight(2)} />
          <Text style={styles.subtitle}>C. Retreated or repaired tyres</Text>
          <Spacer height={getScreenHeight(2)} />
          <Text style={styles.subtitle}>D. Worn out tyres</Text>
          <Spacer height={getScreenHeight(2)} />
          <Text style={styles.subtitle}>
            E. Improper application of tyres size or specification.
          </Text>
          <Spacer height={getScreenHeight(2)} />
          <Text style={styles.subtitle}>
            F. Any type of damage due to the defective mechanical conditions of
            the vehicle, including misalignment, wheel imbalance and faulty
            suspension /brakes or vehicle
          </Text>
          <Spacer height={getScreenHeight(2)} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: '#F2F2F2',
    },
    safe: {
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
      color: theme.black,
    },
    scroll: {
      paddingHorizontal: getScreenHeight(1),
    },
  });

export default WarrantyPolicy;
