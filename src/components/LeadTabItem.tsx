import React, {useContext, useMemo} from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import fonts from '../constants/fonts';

import {themeContext} from '../contexts/context';
import {formatPrice, getScreenHeight} from '../utils/domUtil';
import Spacer from './Spacer';

const LeadTabItem = (props: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <Pressable onPress={props.action} style={styles.contanier}>
      <View style={styles.header}>
        <Text
          style={[
            styles.title2,
            {fontFamily: fonts.bold, color: theme.primary},
          ]}>
          Customer Name: {"Rakesh Kumar"}
        </Text>
        <Text style={styles.title2}>
          Lead ID:  {"7031"}
        </Text>
      </View>

      <View style={styles.header}>
        <Text
          style={[
            styles.title2,
            
          ]}>
          Phone No.: {"987654321"}
        </Text>
        <Text style={styles.title2}>
          Last Visit Date:  {"2022/11/15"}
        </Text>
      </View>

      <View style={styles.header}>
        <Text
          style={[
            styles.title,
            
          ]}>
          Customer Address.: Prius Heights Sector 125, Noida
        </Text>
        
      </View>

      {/* <View style={styles.divider} /> */}

      <View style={styles.header}>
        <Text numberOfLines={1} style={styles.title}>
          Last Comment: {''}
        </Text>
        {/* <Spacer height={getScreenHeight(0.5)} />
        <View style={styles.row}>
          <Text style={styles.title}>Price</Text>
          <Text style={[styles.title, {marginLeft: getScreenHeight(4)}]}>
            {props?.item?.Price__c
              ? formatPrice(props?.item?.Price__c)
              : formatPrice(0.0)}
          </Text>
        </View> */}
      </View>

      <Spacer height={getScreenHeight(2)} />

  
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
      flexDirection:'row',
      alignContent:'space-between',
      opacity : 3

    },
    title2: {
      fontFamily: fonts.medium,
      fontSize: getScreenHeight(1.4),
      color: theme.black,
      width:getScreenHeight(24)
    },

    title: {
      fontFamily: fonts.medium,
      fontSize: getScreenHeight(1.4),
      color: theme.black,
      // width:getScreenHeight(20)
    },
    row: {
      flexDirection: 'row',
      // justifyContent: 'space-between',
      alignItems: 'center',
    },
    // footer: {
    //   backgroundColor: theme.light_accent,
    //   padding: getScreenHeight(1),
    //   flexDirection: 'row',
    //   justifyContent: 'space-between',
    //   alignItems: 'center',
    // },
    column: {
      alignItems: 'center',
    },
    footertitle: {
      fontFamily: fonts.medium,
      fontSize: getScreenHeight(1.4),
      color: theme.white,
    },
    divider: {
      // backgroundColor: theme.black,
      height: getScreenHeight(0.1),
      width: '100%',
    },
  });

export default LeadTabItem;
