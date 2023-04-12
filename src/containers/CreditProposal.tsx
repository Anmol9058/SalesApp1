import React, {useCallback, useContext, useMemo} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import useApi from '../hooks/useApi';

// import {themeContext} from '../contexts/context';
import CustomStatusBar from '../components/CustomStatusBar';
import Header from '../components/Header';
import {getScreenHeight, getScreenWidth} from '../utils/domUtil';
import fonts from '../constants/fonts';
import CreditProposalItem from '../components/CreditProposalItem';
import CustomNewHeader from '../components/CustomNewHeader';
import {getInvoice, getCreditProposal} from '../api/home';
import {authContext, themeContext} from '../contexts/context';
import {setAsyncItem} from '../api/async';
import FastImage from 'react-native-fast-image';

import {useQuery} from 'react-query';
import Spacer from '../components/Spacer';

const CreditProposal = ({navigation}: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const {apiCall} = useApi();
  const {invoicedata, user_data}: any = useContext(authContext);

  const getCreditProposalManager = useCallback(async () => {
    const res = await getCreditProposal(apiCall, user_data.Name);
    return res;
  }, [user_data.Name, apiCall]);

  const {isLoading, data: creditProposalData} = useQuery(
    'getCreditProposalManager',
    getCreditProposalManager,
    {
      retry: 0,
      enabled: true,
    },
  );

  const renderItem = ({item}: any) => {
    return (
      <View style={styles.item}>
        <CreditProposalItem
          data={item}
          action={() => navigation.navigate('InvoiceDetail', {item: item})}
        />
      </View>
    );
  };

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <CustomStatusBar color={theme.black} light />
      <View style={styles.screen}>
        {/* <CustomHeader action={() => navigation.openDrawer()} /> */}
        <CustomNewHeader
          subtitle={user_data?.Customer_No__c ? user_data?.Customer_No__c : ''}
          action={() => navigation.goBack()}
          title={user_data?.Name ? user_data?.Name : ''}
        />
        <LinearGradient
          colors={[theme.lightGrey, theme.lightGrey]}
          style={styles.linearGradient}>
          <View style={styles.header}>
            <Header title="Credit Limit Proposal" hide dark />
          </View>
          <Spacer height={getScreenHeight(1.5)} />
          <FlatList
            ListHeaderComponent={() =>
              isLoading ? (
                <ActivityIndicator
                  size={'small'}
                  color={theme.primary}
                  style={{marginBottom: getScreenHeight(2)}}
                />
              ) : null
            }
            keyExtractor={(item, index) => index.toString()}
            data={creditProposalData}
            renderItem={renderItem}
            contentContainerStyle={styles.flatlist}
          />
        </LinearGradient>
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
    customButton: {
      // alignSelf: 'flex-end',
      backgroundColor: '#4D4D4D',
      padding: getScreenHeight(1),
      borderRadius: getScreenHeight(2),
      flexDirection: 'row',
      // position:'absolute',
      // bottom:getScreenHeight(10),
      left: getScreenWidth(70),
      alignItems: 'flex-end',
      width: getScreenWidth(25),
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
      backgroundColor: theme.primary,
    },
    title: {
      fontFamily: fonts.regular,
      color: theme.white,
      fontSize: getScreenHeight(1.5),
    },
    footerItem: {
      alignItems: 'center',
    },
  });

export default CreditProposal;
