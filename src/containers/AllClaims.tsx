import React, {useCallback, useContext, useMemo, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import useApi from '../hooks/useApi';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useQuery} from 'react-query';
import SimpleToast from 'react-native-simple-toast';
import FastImage from 'react-native-fast-image';

import CustomStatusBar from '../components/CustomStatusBar';
import Header from '../components/Header';
import {getScreenHeight} from '../utils/domUtil';
import fonts from '../constants/fonts';
import PurchaseSummaryItem from '../components/PurchaseSummaryItem';
import CustomNewHeader from '../components/CustomNewHeader';
import {getAllClaims, getInvoice, getYcnAgreement} from '../api/home';
import {authContext, themeContext} from '../contexts/context';
import CustomPressable from '../components/CustomPressable';
import Spacer from '../components/Spacer';
import ArrowButton from '../components/ArrowButton';
import NotFound from '../components/NotFound';
import FullScreenLoader from '../components/FullScreenLoader';
import ClaimItem from '../components/ClaimItem';

const AllClaims = ({navigation}: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const {apiCall} = useApi();
  const {user_id, user_data}: any = useContext(authContext);
  const [invoiceData, setInvoiceData]: any = useState(null);

  const getAllClaimsManager = useCallback(async () => {
    const res = await getAllClaims(apiCall, user_id);
    return res;
  }, [apiCall]);

  const {data, isLoading} = useQuery(
    'getAllClaimsManager',
    getAllClaimsManager,
    {
      retry: 0,
      enabled: true,
    },
  );

  const renderItem = ({item}: any) => {
    return (
      <View style={styles.item}>
        <ClaimItem
          data={item}
          action={() => navigation.navigate('ClaimDetail', {item: item})}
        />
      </View>
    );
  };

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <>
      <SafeAreaView edges={['top']} style={styles.safe}>
        <CustomStatusBar color={theme.black} light />
        <View style={styles.screen}>
          <CustomNewHeader
            subtitle={
              user_data?.Customer_No__c ? user_data?.Customer_No__c : ''
            }
            action={() => navigation.goBack()}
            title={user_data?.Name ? user_data?.Name : ''}
          />
          <LinearGradient
            colors={[theme.lightGrey, theme.lightGrey]}
            style={styles.linearGradient}>
            <View style={styles.header}>
              <Header title="Claim List" hide dark />
            </View>
            <View style={{flex: 1}}>
              <FlatList
                ListHeaderComponent={() =>
                  isLoading ? (
                    <ActivityIndicator size={'large'} color={theme.primary} />
                  ) : null
                }
                keyExtractor={(item, index) => index.toString()}
                data={data}
                renderItem={renderItem}
                contentContainerStyle={styles.flatlist}
                ListEmptyComponent={invoiceData?.length ? null : NotFound}
              />
            </View>
          </LinearGradient>
        </View>
      </SafeAreaView>
    </>
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
      padding: getScreenHeight(2),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    flatlist: {
      paddingHorizontal: getScreenHeight(2),
    },
    item: {
      marginBottom: getScreenHeight(2),
    },
    date: {
      fontFamily: fonts.regular,
      fontSize: getScreenHeight(1.2),
      color: theme.white,
    },
    icon: {
      width: getScreenHeight(2),
      height: getScreenHeight(2),
      marginTop: getScreenHeight(0.5),
    },
    rightheader: {
      alignItems: 'flex-end',
    },
    fotter: {
      padding: getScreenHeight(2),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: theme.textinput,
    },
    title: {
      fontFamily: fonts.regular,
      color: theme.white,
      fontSize: getScreenHeight(1.5),
    },
    footerItem: {
      alignItems: 'center',
    },
    press: {
      width: '35%',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      flex: 1,
    },
  });

export default AllClaims;
