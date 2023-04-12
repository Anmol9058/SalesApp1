import moment from 'moment';
import React, {useContext, useMemo} from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import fonts from '../constants/fonts';

import {themeContext} from '../contexts/context';
import {getScreenHeight} from '../utils/domUtil';
import Spacer from './Spacer';

const TicketItem = (props: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <Pressable onPress={props.action} style={styles.contanier}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Date: {moment(props?.item?.CreatedDate).format('DD-MM-YYYY')}
        </Text>
        <Text style={styles.title}>Name: {props?.item?.Name}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.header}>
        <Spacer height={getScreenHeight(0.5)} />
        <Text style={styles.title}>Type: {props?.item?.Complaint_Type__c}</Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.column}>
          <Text style={styles.footertitle}>Status</Text>
          <Text
            style={[
              styles.title,
              {color: theme.white, fontFamily: fonts.bold},
            ]}>
            {props?.item?.Complaint_Status__c}
          </Text>
        </View>

        <View style={styles.column}></View>
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
      // alignItems: 'center',
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

export default TicketItem;
