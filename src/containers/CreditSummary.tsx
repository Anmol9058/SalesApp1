import React, {useCallback, useContext, useMemo, useState} from 'react';
import {View, StyleSheet, Text, FlatList, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useQuery} from 'react-query';
import CustomStatusBar from '../components/CustomStatusBar';
import Header from '../components/Header';
import {formatPrice, getScreenHeight} from '../utils/domUtil';
import fonts from '../constants/fonts';
import CustomNewHeader from '../components/CustomNewHeader';
import {getCreditSummary} from '../api/home';
import {authContext, themeContext} from '../contexts/context';
import useApi from '../hooks/useApi';
import FullScreenLoader from '../components/FullScreenLoader';

const CreditSummary = ({navigation}: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const {user_data}: any = useContext(authContext);
  const [dealerId, SetdealerId] = useState(user_data?.Id);

  const {apiCall} = useApi();

  const CreditSummaryManager = useCallback(async () => {
    const res = await getCreditSummary(apiCall, dealerId);
    return res;
  }, [apiCall, dealerId]);

  const {data: creditData, isLoading} = useQuery(
    'getSummaryCredit',
    CreditSummaryManager,
    {
      retry: 0,
      enabled: true,
    },
  );

  const data = [
    {
      title: 'Customer Account',
      value: creditData ? creditData.Name : '',
      btn: false,
    },
    {
      title: 'Virtual Bank Account Number',
      value: creditData ? creditData.Virtual_Account__c : '',
      btn: false,
    },
    {
      title: 'Total Credit Limit',
      value: creditData
        ? formatPrice(creditData.Credit_Limit__c)
        : formatPrice(0.0),
      btn: false,
    },
    {
      title: 'Total Outstanding',
      value: creditData
        ? formatPrice(creditData.Total_Outstanding__c)
        : formatPrice(0.0),
      btn: false,
    },
    {
      title: 'Overdue Amount',
      value: creditData
        ? formatPrice(creditData.Overdue_Amount__c)
        : formatPrice(0.0),
      btn: true,
    },
    {
      title: 'Available Credit',
      value: creditData
        ? formatPrice(creditData.Available_Credit_Limit__c)
        : formatPrice(0.0),
      btn: false,
    },
    {
      title: '',
      value: '',
      btn: false,
    },
  ];

  const renderItem = ({item}: any) => {
    return (
      <View style={{flexDirection: 'row'}}>
        <View style={styles.item}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.value}</Text>
        </View>
        {/* {item.btn ? (
          <TouchableOpacity
            style={{
              backgroundColor: '#E6E6E6',
              height: 30,
              width: 120,
              borderRadius: 5,
              justifyContent: 'center',
              marginTop: 18,
              marginLeft: 50,
            }}>
            <Text
              style={{color: 'black', fontWeight: 'bold', textAlign: 'center'}}>
              Make Payment
            </Text>
          </TouchableOpacity>
        ) : null} */}
      </View>
    );
  };

  const seprator = useCallback(() => <View style={styles.seprator} />, []);

  const renderHeader = () => {
    return <Text style={styles.title}>Overdue</Text>;
  };

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <CustomStatusBar color={theme.black} light />
      <View style={styles.screen}>
        <CustomNewHeader
          subtitle={user_data?.Customer_No__c ? user_data?.Customer_No__c : ''}
          action={() => navigation.goBack()}
          title={user_data?.Name ? user_data?.Name : ''}
        />
        {/* <CustomHeader action={() => navigation.openDrawer()} />
        <LinearGradient
          colors={['#000000', '#606060']}
          style={styles.linearGradient}> */}
        <View style={styles.header}>
          <Header hide title="Credit Summary" dark />
        </View>
        <FlatList
          style={styles.list}
          data={data}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
          ItemSeparatorComponent={seprator}
        />
        {/* </LinearGradient> */}
      </View>
    </SafeAreaView>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: 'white',
    },
    safe: {
      flex: 1,
      backgroundColor: theme.black,
    },
    linearGradient: {
      flex: 1,
    },
    header: {
      padding: getScreenHeight(1),
      marginBottom: getScreenHeight(2),
    },

    item: {
      height: getScreenHeight(9),
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      paddingHorizontal: getScreenHeight(2),
    },
    title: {
      fontFamily: fonts.semiBold,
      color: theme.black,
      fontSize: getScreenHeight(1.8),
      marginTop: getScreenHeight(1),
    },
    customItem: {
      padding: getScreenHeight(2),
    },
    list: {
      backgroundColor: theme.white,
    },
    subtitle: {
      fontFamily: fonts.bold,
      color: theme.black,
      fontSize: getScreenHeight(2),
    },
    seprator: {
      height: getScreenHeight(0.1),
      width: '100%',
      backgroundColor: theme.black,
    },
  });

export default CreditSummary;
