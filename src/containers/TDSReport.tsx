import React, {useCallback, useContext, useMemo} from 'react';
import {View, StyleSheet, Text, ScrollView, FlatList} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useQuery} from 'react-query';
import {getTDSAndTCS, getYcnAgreement} from '../api/home';
import ArrowButton from '../components/ArrowButton';

import CustomNewHeader from '../components/CustomNewHeader';
import CustomStatusBar from '../components/CustomStatusBar';
import Divider from '../components/Divider';
import FullScreenLoader from '../components/FullScreenLoader';
import Header from '../components/Header';
import Spacer from '../components/Spacer';
import TDSItem from '../components/TDSItem';
import fonts from '../constants/fonts';
import {authContext, themeContext} from '../contexts/context';
import useApi from '../hooks/useApi';
import {getScreenHeight} from '../utils/domUtil';

const TDSReport = ({navigation}: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const {user_data}: any = useContext(authContext);
  const renderKey = (item: any, index: any) => index.toString();
  const {apiCall} = useApi();

  const getTDSAndTCSCerificateManager = useCallback(async () => {
    const res = await getTDSAndTCS(apiCall, user_data.Id);
    return res;
  }, [apiCall, user_data]);

  const {data, isLoading} = useQuery(
    'getTDSAndTCSCerificate',
    getTDSAndTCSCerificateManager,
    {
      retry: 0,
      enabled: true,
    },
  );

  const renderItem = useCallback(({item}: any) => {
    return (
      <View style={styles.item}>
        <TDSItem
          action={() => {
            navigation.navigate('TDSReportDetail', {item: item});
          }}
          item={item}
        />
      </View>
    );
  }, []);

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
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={renderKey}
          ListHeaderComponent={() => (
            <Header title="TDS/TCS Certificate" hide dark />
          )}
          contentContainerStyle={styles.list}
        />
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
    header: {
      padding: getScreenHeight(2),
    },
    list: {
      paddingHorizontal: getScreenHeight(2),
    },
    item: {
      marginTop: getScreenHeight(2),
    },
  });

export default TDSReport;
