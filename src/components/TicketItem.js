import React, {useContext, useMemo} from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import fonts from '../constants/fonts';
import {themeContext} from '../contexts/context';
import {getScreenHeight} from '../utils/domUtil';
import Spacer from './Spacer';

const TicketItem = (props: any) => {
  const {theme} = useContext(themeContext);
  // console.log(props)
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <Pressable onPress={props.action} style={styles.contanier}>
      <View style={styles.header}>
        <Text
          style={[
            styles.title,
            {fontFamily: fonts.bold, color: theme.primary},
          ]}>
          Ticket No: {"T-123"}
        </Text>
        {/* <Text style={styles.title}>
          Order Date: {props?.item?.Order_Date__c}
        </Text> */}
      </View>

      <View style={styles.row} />

      <View style={styles.header}>
      <View style={styles.row}>
          <Text style={styles.title}>Ticket Status</Text>
          <Text style={[styles.title1, {marginLeft: getScreenHeight(2)}]}>
            {"Draft Status"}
          </Text>
        </View>
        <Spacer height={getScreenHeight(0.5)} />

        <View style={styles.row}>
          <Text style={styles.title}>Description</Text>
          <Text style={[styles.title1, {marginLeft: getScreenHeight(2)}]}>
            {"Ticket To Add Complaint"}
          </Text>
        </View>
        <Spacer height={getScreenHeight(0.5)} />

        <View style={styles.row}>
          <Text style={styles.title}>Type</Text>
          <Text style={[styles.title1, {marginLeft: getScreenHeight(2)}]}>
            {" Complaints"}
          </Text>
        </View>
        <Spacer height={getScreenHeight(0.5)} />

        <View style={styles.row}>
          <Text style={styles.title}>Category</Text>
          <Text style={[styles.title1, {marginLeft: getScreenHeight(2)}]}>
            {props.item.Complaint_category__c}
          </Text>
        </View>
        <Spacer height={getScreenHeight(0.5)} />

        <View style={styles.row}>
          <Text style={styles.title}>Sub-Category</Text>
          <Text style={[styles.title1, {marginLeft: getScreenHeight(2)}]}>
            {props.item.Complaint_sub_category__c}
          </Text>
        </View>
      </View>

      <Spacer height={getScreenHeight(2)} />

      <View style={styles.footer}></View>
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
      width:getScreenHeight(15),
        // backgroundColor:"pink"
    },
    title1: {
        fontFamily: fonts.medium,
        fontSize: getScreenHeight(1.4),
        color: theme.black,
        width:getScreenHeight(25),
        
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
  });

export default TicketItem;
