import React, {useContext, useMemo} from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import fonts from '../constants/fonts';

import {themeContext} from '../contexts/context';
import {formatPrice, getScreenHeight} from '../utils/domUtil';
import Divider from './Divider';
import Spacer from './Spacer';

const CreditDebitItem = (props: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <View style={styles.contanier}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Return Order Date:{' '}
          {props?.data?.Return_Order_Date__c
            ? props?.data?.Return_Order_Date__c
            : 'NA'}
        </Text>
        <Text style={styles.title}>
          Invoice No:{' '}
          {props?.data?.Invoice__r?.Name ? props?.data?.Invoice__r?.Name : 'NA'}
        </Text>
        <Text
          style={[
            styles.title,
            {fontFamily: fonts.bold, color: theme.primary},
          ]}>
          Return Order Name: {props?.data?.Name}
        </Text>
      </View>

      <View style={styles.divider} />

      {/* <View style={styles.header}>
        <Spacer height={getScreenHeight(0.5)} />

        <View style={styles.row}>
          <Text style={styles.title}>
            Quantity: {props?.data?.Invoice_Quantity__c}
          </Text>
          <Text style={styles.title}>
            Amount: {formatPrice(props?.data?.Amount__c)}
          </Text>
        </View>
      </View> */}

      <View style={styles.footer}>
        <View style={styles.column}>
          <Text style={styles.footertitle}>Total Quantity</Text>
          <Text
            style={[
              styles.title,
              {color: theme.white, fontFamily: fonts.bold},
            ]}>
            {props?.data?.Quantity_of_item_to_return__c
              ? props?.data?.Quantity_of_item_to_return__c
              : 'NA'}
          </Text>
        </View>

        <View style={styles.column}>
          <Text style={styles.footertitle}>Return Order Amount</Text>
          <Text
            style={[
              styles.title,
              {color: theme.white, fontFamily: fonts.bold},
            ]}>
            {formatPrice(props?.data?.Amount__c)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    contanier: {
      backgroundColor: theme.light_accent,
      borderRadius: getScreenHeight(1),
      overflow: 'hidden',
    },
    header: {
      backgroundColor: theme.white,
      padding: getScreenHeight(1),
    },
    title: {
      fontFamily: fonts.medium,
      fontSize: getScreenHeight(1.4),
      color: theme.black,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    footer: {
      backgroundColor: theme.light_accent,
      padding: getScreenHeight(1),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    column: {
      alignItems: 'center',
    },
    footertitle: {
      fontFamily: fonts.medium,
      fontSize: getScreenHeight(1.4),
      color: theme.white,
    },
    divider: {
      backgroundColor: theme.black,
      height: getScreenHeight(0.1),
      width: '100%',
    },
  });

export default CreditDebitItem;
