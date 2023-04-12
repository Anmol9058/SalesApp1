import React, {useContext, useMemo} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import fonts from '../constants/fonts';

import {themeContext} from '../contexts/context';
import {getScreenHeight} from '../utils/domUtil';
import ArrowButton from './ArrowButton';
import Spacer from './Spacer';

const YcnItem = (props: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.contanier}>
      <View style={styles.row}>
        <Text style={styles.title}>Validity From</Text>
        <Text style={styles.subtitle}>{props.data.From_Date__c}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.title}>Validity To</Text>
        <Text style={styles.subtitle}>{props.data.To_Date__c}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.title}>Renewal Date</Text>
        <Text style={styles.subtitle}>{props.data.Renewal_Date__c}</Text>
      </View>
      <Spacer />
      <ArrowButton action={props.action} title="View" />
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    contanier: {
      backgroundColor: theme.white,
      padding: getScreenHeight(2),
      borderRadius: getScreenHeight(1),
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: getScreenHeight(4),
    },
    title: {
      fontFamily: fonts.regular,
      color: '#333333',
      fontSize: getScreenHeight(1.6),
      width: '30%',
    },

    subtitle: {
      fontFamily: fonts.bold,
      color: theme.black,
      fontSize: getScreenHeight(1.6),
      flex: 1,
    },
  });

export default YcnItem;
