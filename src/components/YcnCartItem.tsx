import React, {useContext, useMemo} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import fonts from '../constants/fonts';
import Images from '../constants/images';

import {themeContext} from '../contexts/context';
import {getScreenHeight, getScreenWidth} from '../utils/domUtil';
import Divider from './Divider';
import Spacer from './Spacer';

const YcnCartItem = (props: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.footer}>
      <View style={styles.footerheader}>
        <View style={styles.row}>
          <FastImage
            source={Images.greentick}
            style={[styles.icon, {marginRight: getScreenHeight(2)}]}
          />
          <Text style={[styles.title, {color: theme.black}]}>Product Code</Text>
        </View>
        <Text style={[styles.subtitle, {color: theme.black}]}>
          {props.item.Name}
        </Text>
        <TouchableOpacity
          onPress={() => {
            props.action(props.item.Id);
          }}>
          {props.item.Id === props.selectedId ? (
            <ActivityIndicator size={'small'} color={theme.primary} />
          ) : (
            <FastImage
              resizeMode="contain"
              tintColor={theme.black}
              style={styles.icon}
              source={require('../assets/images/common/delete.png')}
            />
          )}
        </TouchableOpacity>
      </View>
      <Divider color={theme.black} />
      <Spacer />
      <View style={styles.tableContanier}>
        <Text style={[styles.subtitle, {color: theme.black}]}>1</Text>
        <View style={styles.line} />
        <View style={styles.table}>
          <View style={styles.newRow}>
            <Text style={styles.body}>Price</Text>
            <Text style={styles.body}>
              {props?.item?.Price__c ? props.item.Price__c : 'NA'}
            </Text>

            <Text style={styles.body}>Qty</Text>
            <Text
              style={[
                styles.body,
                {
                  backgroundColor: '#D9D9D9',
                  paddingHorizontal: getScreenHeight(1),
                },
              ]}>
              {props.item.Quantity__c}
            </Text>
          </View>
        </View>
      </View>
      <Spacer />
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    footer: {
      margin: getScreenHeight(2),
      backgroundColor: theme.white,
      borderRadius: getScreenHeight(1),
      overflow: 'hidden',
    },
    footerheader: {
      padding: getScreenHeight(1),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    tableContanier: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: getScreenHeight(1),
    },
    line: {
      height: getScreenHeight(5),
      backgroundColor: theme.black,
      width: getScreenHeight(0.1),
      marginHorizontal: getScreenHeight(2),
    },
    table: {
      flex: 1,
    },
    buttonContanier: {
      width: '80%',
      alignSelf: 'center',
      marginVertical: getScreenHeight(4),
    },
    body: {
      fontFamily: fonts.regular,
      color: theme.black,
      fontSize: getScreenHeight(1.4),
    },
    subtitle: {
      fontFamily: fonts.bold,
      color: theme.white,
      fontSize: getScreenHeight(1.6),
    },
    newRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      flex: 1,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    icon: {
      height: getScreenHeight(2),
      width: getScreenHeight(2),
    },
    title: {
      fontFamily: fonts.regular,
      color: theme.white,
      fontSize: getScreenHeight(1.6),
    },
  });

export default YcnCartItem;
