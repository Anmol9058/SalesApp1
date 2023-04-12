import moment from 'moment';
import React, {useContext, useMemo} from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import FastImage from 'react-native-fast-image';
import fonts from '../constants/fonts';

import {themeContext} from '../contexts/context';
import {formatPrice, getScreenHeight} from '../utils/domUtil';

const SecurityItem = (props: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.contanier}>
      <View
        style={[
          styles.dot,
          {backgroundColor: props.item.selected ? '#99C817' : '#D9D9D9'},
        ]}>
        <FastImage
          source={require('../assets/images/common/tick.png')}
          resizeMode="contain"
          tintColor={theme.white}
          style={styles.icon}
        />
      </View>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.title}>Created Date</Text>
          <Text style={styles.value}>
            {moment(props?.item?.CreatedDate).format('DD-MMM')}
          </Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.title}>Type</Text>
          <Text style={styles.value}>
            {props?.item?.Request_Type__c ? props?.item?.Request_Type__c : 'NA'}
          </Text>
        </View>
      </View>

      <View style={[styles.row, {marginTop: getScreenHeight(2)}]}>
        <View style={styles.column}>
          <Text style={styles.title}>UTR No</Text>
          <Text style={styles.value}>
            {props?.item?.UTR_No__c ? props.item.UTR_No__c : 'NA'}
          </Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.title}>Amount</Text>
          <Text style={styles.value}>
            {formatPrice(props?.item?.Currency__c)}
          </Text>
        </View>
      </View>
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
    },
    title: {
      fontFamily: fonts.regular,
      color: theme.black,
      fontSize: getScreenHeight(1.5),
    },
    value: {
      fontFamily: fonts.bold,
      color: theme.black,
      fontSize: getScreenHeight(1.5),
    },
    column: {
      width: '40%',
    },
    dot: {
      backgroundColor: '#D9D9D9',
      width: getScreenHeight(3),
      height: getScreenHeight(3),
      borderRadius: getScreenHeight(3),
      position: 'absolute',
      zIndex: 1000,
      right: getScreenHeight(2),
      top: getScreenHeight(2),
      justifyContent: 'center',
      alignItems: 'center',
    },
    icon: {
      width: getScreenHeight(1.5),
      height: getScreenHeight(1.5),
    },
  });

export default SecurityItem;
