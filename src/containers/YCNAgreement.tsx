import React, {useCallback, useContext, useMemo} from 'react';
import {View, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import CustomNewHeader from '../components/CustomNewHeader';
import CustomStatusBar from '../components/CustomStatusBar';
import Header from '../components/Header';
import YcnItem from '../components/YcnItem';
import {getScreenHeight} from '../utils/domUtil';
import {getYcnAgreement} from '../api/home';
import useApi from '../hooks/useApi';
import {useQuery} from 'react-query';
import {authContext, themeContext} from '../contexts/context';
import NotFound from '../components/NotFound';

const YCNAgreement = ({navigation}: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  const {tokens, cart_Data, user_id, setCartData, user_data}: any =
    useContext(authContext);
  const {apiCall} = useApi();

  const YcnAgreementManager = useCallback(async () => {
    const res = await getYcnAgreement(apiCall, user_id);
    return res;
  }, [apiCall]);

  const {data: ageingData1, isLoading} = useQuery(
    'getYcnAgreement',
    YcnAgreementManager,
    {
      retry: 0,
      enabled: true,
    },
  );

  const renderKey = (item: any, index: any) => index.toString();

  const renderItem = useCallback(({item}: any) => {
    return (
      <View style={styles.item}>
        <YcnItem
          action={() => navigation.navigate('YCNAgreementDetail', {item: item})}
          data={item}
        />
      </View>
    );
  }, []);

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
          data={ageingData1}
          renderItem={renderItem}
          keyExtractor={renderKey}
          ListHeaderComponent={() => <Header title="YCN Agreement" hide dark />}
          contentContainerStyle={styles.list}
          ListEmptyComponent={NotFound}
          ListFooterComponent={() =>
            isLoading ? (
              <ActivityIndicator size={'small'} color={theme.primary} />
            ) : null
          }
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

export default YCNAgreement;
