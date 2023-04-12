import React, {useContext, useMemo} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {authContext, themeContext} from '../contexts/context';
import CustomStatusBar from '../components/CustomStatusBar';
import {formatPrice, getScreenHeight} from '../utils/domUtil';
import fonts from '../constants/fonts';
import CustomNewHeader from '../components/CustomNewHeader';
import Header from '../components/Header';
import moment from 'moment';
import FastImage from 'react-native-fast-image';

const ClaimDetail = (props: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const data = props.route.params.item;
  const {user_data}: any = useContext(authContext);

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <CustomStatusBar color={theme.black} light />
      <View style={styles.screen}>
        <CustomNewHeader
          subtitle={user_data?.Customer_No__c ? user_data?.Customer_No__c : ''}
          action={() => props.navigation.goBack()}
          title={user_data?.Name ? user_data?.Name : ''}
        />
        <View style={styles.contanier}>
          <Header dark title={'Claim Detail'} hide />

          <View style={styles.item}>
            <View style={styles.row}>
              <Text style={styles.title}>Date :</Text>
              <Text style={styles.value}>
                {moment(data.CreatedDate).format('DD-MM-YYYY')}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.title}>Claim No:</Text>
              <Text style={styles.value}>{data.Name}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.title}>Docket No:</Text>
              <Text style={styles.value}>{data.Docket_No__c}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.title}>Docket Status:</Text>
              <Text style={styles.value}>
                {data.Docket_status__c ? data.Docket_status__c : 'NA'}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.title}>Article No:</Text>
              <Text style={styles.value}>
                {data?.Article_No__r ? data?.Article_No__r?.Name : 'NA'}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.title}>Warranty Registration:</Text>
              <Text style={styles.value}>
                {data?.Warranty_Registration__r
                  ? data?.Warranty_Registration__r.Name
                  : 'NA'}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.title}>Changed Article:</Text>
              <Text style={styles.value}>
                {data.Change_Article_Tagged__r
                  ? data.Change_Article_Tagged__r.Name
                  : 'NA'}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.title}>Wear%:</Text>
              <Text style={styles.value}>
                {data.Wear__c ? data.Wear__c : 'NA'}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.title}>Amount:</Text>
              <Text style={styles.value}>
                {formatPrice(
                  data.Discount_Price_with_GST__c
                    ? data.Discount_Price_with_GST__c
                    : 0,
                )}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.title}>Invoiced:</Text>
              {data.Invoiced__c ? (
                <View style={{flex: 1, marginLeft: getScreenHeight(3)}}>
                  <FastImage
                    tintColor={theme.primary}
                    resizeMode="contain"
                    style={styles.icon}
                    source={require('../assets/images/tick.png')}
                  />
                </View>
              ) : (
                <View style={{flex: 1, marginLeft: getScreenHeight(3)}}>
                  <FastImage
                    tintColor={theme.primary}
                    resizeMode="contain"
                    style={styles.icon}
                    source={require('../assets/images/cross.png')}
                  />
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.white,
    },
    safe: {
      flex: 1,
      backgroundColor: theme.black,
    },
    linearGradient: {
      flex: 1,
    },
    flatlist: {
      paddingHorizontal: getScreenHeight(2),
    },
    contanier: {
      paddingHorizontal: getScreenHeight(2),
      backgroundColor: theme.white,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: getScreenHeight(0.5),
    },
    title: {
      fontFamily: fonts.bold,
      fontSize: getScreenHeight(1.6),
      color: theme.black,
      width: '30%',
    },
    value: {
      fontFamily: fonts.bold,
      fontSize: getScreenHeight(1.6),
      color: theme.primary,
      flex: 1,
      marginLeft: getScreenHeight(2),
    },
    item: {
      padding: getScreenHeight(2),
      backgroundColor: theme.lightGrey,
      borderRadius: getScreenHeight(1),
      marginTop: getScreenHeight(2),
      width: '100%',
    },
    icon: {
      height: getScreenHeight(1.5),
      width: getScreenHeight(1.5),
    },
  });

export default ClaimDetail;
