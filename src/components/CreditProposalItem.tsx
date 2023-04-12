import React, {useContext, useMemo} from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import fonts from '../constants/fonts';

import {themeContext} from '../contexts/context';
import {formatPrice, getScreenHeight} from '../utils/domUtil';
import Spacer from './Spacer';

const CreditProposalItem = (props: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <Pressable style={styles.contanier}>
      <View style={styles.header}>
        <Text numberOfLines={1} style={styles.title}>
          Proposal No. {props.data.Name}
        </Text>

        <Text numberOfLines={1} style={styles.title}>
          Cheque No. {props.data.Cheque_No__c}
        </Text>
        <Text numberOfLines={1} style={styles.title}>
          Dealer. {props.data.Dealer__r.Name}
        </Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.column}>
          <Text style={styles.footertitle}>Bank</Text>
          <Text
            style={[
              styles.title,
              {color: theme.white, fontFamily: fonts.bold},
            ]}>
            {props?.data?.Bank_Name__c}
          </Text>
        </View>

        <View style={styles.column}>
          <Text style={styles.footertitle}>Amount</Text>
          <Text
            style={[
              styles.title,
              {color: theme.white, fontFamily: fonts.bold},
            ]}>
            {formatPrice(props?.data?.Amount__c)}
          </Text>
        </View>
      </View>
    </Pressable>
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

export default CreditProposalItem;
