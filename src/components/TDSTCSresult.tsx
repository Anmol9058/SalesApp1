import React, {useContext, useMemo} from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import fonts from '../constants/fonts';

import {themeContext} from '../contexts/context';
import {getScreenHeight} from '../utils/domUtil';
import Divider from './Divider';
import Spacer from './Spacer';

const TDSTCSresult = (props: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <Pressable onPress={props.action} style={styles.contanier}>
      <View style={styles.header}>
        <View style={styles.row}>
          <Text style={[styles.title, {width: '30%'}]}>From Date:</Text>
          <Text style={[styles.title, {flex: 1}]}>{props.data.From__c}</Text>
        </View>

        <View style={styles.row}>
          <Text style={[styles.title, {width: '30%'}]}>To Date:</Text>
          <Text style={[styles.title, {flex: 1}]}>{props.data.To__c}</Text>
        </View>

        <View style={styles.row}>
          <Text style={[styles.title, {width: '30%'}]}>Assessment Year:</Text>
          <Text style={[styles.title, {flex: 1}]}>
            {props.data.Assessment_Year__c}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={[styles.title, {width: '30%'}]}>Quarter:</Text>
          <Text style={[styles.title, {flex: 1}]}>{props.data.Quarter__c}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.column}>
          <Text style={styles.footertitle}>Dealer Name</Text>
          <Text
            style={[
              styles.title,
              {color: theme.white, fontFamily: fonts.bold},
            ]}>
            {props.data.Dealer__r.Name}
          </Text>
        </View>

        {/* <View style={styles.column}>
          <Text style={styles.footertitle}>Credit Amount</Text>
          <Text
            style={[
              styles.title,
              {color: theme.white, fontFamily: fonts.bold},
            ]}>
            43,922
          </Text>
        </View> */}
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
      marginVertical: getScreenHeight(0.5),
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

export default TDSTCSresult;
