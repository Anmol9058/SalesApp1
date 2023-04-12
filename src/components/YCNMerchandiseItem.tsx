import React, {useContext, useMemo} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import fonts from '../constants/fonts';
import Spacer from '../components/Spacer';
import {themeContext} from '../contexts/context';
import {formatPrice, getScreenHeight, getScreenWidth} from '../utils/domUtil';

const YCNMerchandiseItem = (props: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View>
      <Spacer height={getScreenHeight(2)} />
      <TouchableOpacity
        style={styles.screen}
        onPress={props.action}
        // onPress={() => navigation.navigate('EditProfile')}
      >
        {/* {console.log('cduyvcs',props)} */}
        <View style={styles.header}>
          <Text style={styles.title}>
            Order Date:{' '}
            {props?.data?.Order_Date__c ? props.data.Order_Date__c : 'NA'}
          </Text>
          <Text style={styles.mainTitle}>
            Order No: {props?.data?.Name ? props.data.Name : 'NA'}
          </Text>

          <Text style={styles.title}>
            Order Status:{' '}
            {props?.data?.Order_Status__c ? props.data.Order_Status__c : 'NA'}
          </Text>
        </View>
        <View style={styles.footer}>
          <View style={styles.column}>
            <Text style={styles.footertitle}>Order Price</Text>
            <Text
              style={[
                styles.title,
                {color: theme.white, fontFamily: fonts.bold},
              ]}>
              {props?.data?.Total_Price__c
                ? formatPrice(props.data.Total_Price__c)
                : formatPrice(0.0)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    header: {
      padding: getScreenHeight(2),
      backgroundColor: theme.white,
    },
    screen: {
      backgroundColor: theme.white,
      borderRadius: getScreenHeight(2),
      overflow: 'hidden',
    },
    title: {
      fontFamily: fonts.medium,
      color: theme.black,
      fontSize: getScreenHeight(1.6),
    },
    mainTitle: {
      fontFamily: fonts.bold,
      color: theme.primary,
      fontSize: getScreenHeight(1.6),
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
  });

export default YCNMerchandiseItem;
