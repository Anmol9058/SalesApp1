import React, {useCallback, useContext, useMemo} from 'react';
import {View, StyleSheet, Text, ScrollView, FlatList} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useQuery} from 'react-query';
import {getAttachments, getTDSAndTCS, getYcnAgreement} from '../api/home';
import ArrowButton from '../components/ArrowButton';

import CustomNewHeader from '../components/CustomNewHeader';
import CustomStatusBar from '../components/CustomStatusBar';
import Divider from '../components/Divider';
import FullScreenLoader from '../components/FullScreenLoader';
import Header from '../components/Header';
import Spacer from '../components/Spacer';
import TDSItem from '../components/TDSItem';
import {BASE_URL} from '../constants/api';
import fonts from '../constants/fonts';
import {authContext, themeContext} from '../contexts/context';
import useApi from '../hooks/useApi';
import {getScreenHeight} from '../utils/domUtil';

const YCNAgreementDetail = ({navigation, route}: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const {user_data}: any = useContext(authContext);
  const item = route.params.item;
  const {apiCall} = useApi();

  console.log(item.Id);

  const getTDSAndTCSCerificateManager = useCallback(async () => {
    const res = await getTDSAndTCS(apiCall, user_data.Id);
    return res;
  }, [apiCall, user_data]);

  const {data, isLoading} = useQuery(
    'getTDSDetail',
    getTDSAndTCSCerificateManager,
    {
      retry: 0,
      enabled: true,
    },
  );

  const getAttachmentsManager = useCallback(async () => {
    const res = await getAttachments(apiCall, item.Id);
    return res;
  }, [apiCall, user_data]);

  const {data: attachementData} = useQuery(
    'getAttachments',
    getAttachmentsManager,
    {
      retry: 0,
      enabled: true,
      onSuccess(data) {
        console.log('SKKSKS>S>S>S>S>', data.records[0].Body);
        console.log(`${BASE_URL}${data.records[0].Body}`);
      },
    },
  );

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
        <ScrollView style={styles.contanier}>
          <Header dark title="YCN Agreement Detail" />

          <View>
            <View style={styles.contanier}>
              <View style={styles.row}>
                <Text style={styles.title}>Name:</Text>
                <Text style={styles.subtitle}>{item?.Name}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.title}>Validity From:</Text>
                <Text style={styles.subtitle}>{item?.From_Date__c}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.title}>Validity To:</Text>
                <Text style={styles.subtitle}>{item?.To_Date__c}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.title}>Renewal Date</Text>
                <Text style={styles.subtitle}>{item?.Renewal_Date__c}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: '#F2F2F2',
    },
    safe: {
      flex: 1,
      backgroundColor: theme.black,
    },
    contanier: {
      margin: getScreenHeight(2),
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      flex: 1,
      marginTop: getScreenHeight(2),
    },
    title: {
      fontFamily: fonts.regular,
      color: '#333333',
      fontSize: getScreenHeight(1.6),
      width: '40%',
    },

    subtitle: {
      fontFamily: fonts.bold,
      color: theme.black,
      fontSize: getScreenHeight(1.6),
      flex: 1,
    },
  });

export default YCNAgreementDetail;
