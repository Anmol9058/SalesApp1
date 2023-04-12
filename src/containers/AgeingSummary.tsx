import React, {useCallback, useContext, useMemo, useState} from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useQuery} from 'react-query';

// Files
import CustomStatusBar from '../components/CustomStatusBar';
import Header from '../components/Header';
import {formatPrice, getScreenHeight} from '../utils/domUtil';
import fonts from '../constants/fonts';
import AgeingItem from '../components/AgeingItem';
import CustomNewHeader from '../components/CustomNewHeader';
import {getAgingSummary} from '../api/home';
import {authContext, themeContext} from '../contexts/context';
import useApi from '../hooks/useApi';
import FullScreenLoader from '../components/FullScreenLoader';

const AgeingSummary = ({navigation}: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const {user_data}: any = useContext(authContext);
  const {apiCall} = useApi();
  const [dealerId, SetdealerId] = useState(user_data?.Id);

  const AgingSummaryManager = useCallback(async () => {
    const res = await getAgingSummary(apiCall, dealerId);
    return res;
  }, [apiCall, dealerId]);

  const {data: ageingData, isLoading} = useQuery(
    'getAgingSummary',
    AgingSummaryManager,
    {
      retry: 0,
      enabled: true,
    },
  );

  const renderItem = ({item}: any) => {
    return (
      <View style={styles.item}>
        <AgeingItem title={item.day} value={item.value} show={true} />
      </View>
    );
  };

  const renderHeader = () => {
    return <Text style={styles.title}>Overdue</Text>;
  };

  const data = [
    {
      day: '0-30',
      value: ageingData?.X0_30_Days_y__c
        ? formatPrice(ageingData.X0_30_Days_y__c)
        : formatPrice(0.0),
    },
    {
      day: '31-45',
      value: ageingData?.X31_45_Days__c
        ? formatPrice(ageingData.X31_45_Days__c)
        : formatPrice(0.0),
    },
    {
      day: '46-60',
      value: ageingData?.X46_60_days__c
        ? formatPrice(ageingData.X46_60_days__c)
        : formatPrice(0.0),
    },
    {
      day: '61-90',
      value: ageingData?.X60_90_Days_y__c
        ? formatPrice(ageingData.X60_90_Days_y__c)
        : formatPrice(0.0),
    },
    {
      day: '91-120',
      value: ageingData?.X90_Days_y__c
        ? formatPrice(ageingData.X90_Days_y__c)
        : formatPrice(0.0),
    },
    {
      day: '>121',
      value: ageingData?.X0_30_Days_y__c
        ? formatPrice(ageingData.X0_30_Days_y__c)
        : formatPrice(0.0),
    },
  ];
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

        <View style={styles.header}>
          <Header hide title="Ageing Summary" dark />
        </View>

        <View style={styles.customItem}>
          <AgeingItem
            title={'Total Outstanding'}
            value={
              ageingData.Total_Outstanding__c
                ? formatPrice(ageingData.Total_Outstanding__c)
                : formatPrice(0.0)
            }
            show={true}
          />
        </View>
        <View style={styles.customItem}>
          <AgeingItem
            // action={() => navigation.navigate('NotYetDue')}
            title={'Not Yet Due'}
            value={
              ageingData.Not_yet_Due__c
                ? formatPrice(ageingData.Not_yet_Due__c)
                : formatPrice(0.0)
            }
            show={true}
          />
        </View>
        <View style={styles.customItem}>
          <AgeingItem
            // action={() => navigation.navigate('NotYetDue')}
            title={'Due'}
            value={
              ageingData?.Due_Amount__c
                ? formatPrice(ageingData?.Due_Amount__c)
                : formatPrice(0.0)
            }
            show={true}
          />
        </View>
        <FlatList
          data={data}
          ListHeaderComponent={renderHeader}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.flatlist}
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
      backgroundColor: '#F2F2F2',
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
    },
    flatlist: {
      paddingHorizontal: getScreenHeight(2),
    },
    item: {
      marginBottom: getScreenHeight(2),
    },
    title: {
      fontFamily: fonts.semiBold,
      color: theme.black,
      fontSize: getScreenHeight(2.5),
      marginVertical: getScreenHeight(2),
    },
    customItem: {
      padding: getScreenHeight(1),
    },
  });

export default AgeingSummary;
