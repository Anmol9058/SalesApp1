import React, { useContext, useMemo } from 'react';
import { View, StyleSheet, Text, Pressable,TouchableOpacity } from 'react-native';
import fonts from '../constants/fonts';

import { themeContext } from '../contexts/context';
import { formatPrice, getScreenHeight, dateReadableFormatWithHyphen } from '../utils/domUtil';
import Spacer from './Spacer';
import FastImage from 'react-native-fast-image';

const SaleOrderItem = (props: any, navigation:any) => {
  const { theme } = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
   
    <Pressable onPress={props.action} style={styles.contanier}>
    <>
    <View style={{flexDirection:'row'}}>
      <View style={styles.header}>
        <Text
          style={[
            styles.title,
            { fontFamily: fonts.bold, color: theme.primary },
          ]}>
          Order No: {props.item.name}
        </Text>
        <Text style={styles.title}>
          Order Date: {dateReadableFormatWithHyphen(props?.item?.order_date__c)}
        </Text>



      </View>

      {props.item.status__c == "Retail Draft" ? <View style={styles.profileContanier}>
        <TouchableOpacity
              onPress={() =>  props.actionForPencil()}
              style={styles.iconContanier}>
              <FastImage
                resizeMode="contain"
                tintColor={theme.primary}
                style={styles.smallIcon}
                source={require('../assets/images/common/pencil.png')}
              />
            </TouchableOpacity>
      </View> : []
      }
      </View>
      <View style={styles.divider} />

      <View style={styles.header}>
        <Text numberOfLines={1} style={styles.title}>
          Order Status: {props?.item.status__c}
        </Text>
        <Spacer height={getScreenHeight(0.5)} />
        <View style={styles.row}>
          <Text style={styles.title}>Price</Text>
          <Text style={[styles.title, { marginLeft: getScreenHeight(4) }]}>
            {props?.item?.total_amount__c
              ? formatPrice(props?.item?.total_amount__c)
              : formatPrice(0.0)}
          </Text>
        </View>
      </View>

      <Spacer height={getScreenHeight(2)} />

      <View style={styles.footer}>

      </View>
      </>
    </Pressable>
   
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    contanier: {
      backgroundColor: theme.white,
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
      // justifyContent: 'space-between',
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
    iconContanier: {
      width: getScreenHeight(4),
      height: getScreenHeight(4),
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
     
    },
    smallIcon: {
      width: '100%',
      height: '100%',
      marginLeft:"-130%"
    },
    profileContanier: {
      width: '50%',
      height: getScreenHeight(6),
     
      flexDirection: 'row',
      padding: getScreenHeight(2),
      alignItems: 'flex-end',
      marginLeft: getScreenHeight(23)
    },
  });

export default SaleOrderItem;
