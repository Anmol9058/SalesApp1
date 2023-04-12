//Experiment


import React, { useCallback, useContext, useMemo, useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SimpleToast from 'react-native-simple-toast';
import { useQuery } from 'react-query';
import { getCartDetails, getSalesOrderList } from '../api/home';

import CustomNewHeader from '../components/CustomNewHeader';
import CustomStatusBar from '../components/CustomStatusBar';
import FullScreenLoader from '../components/FullScreenLoader';
import Header from '../components/Header';
import NotFound from '../components/NotFound';
import SaleOrderItem from '../components/SaleOrderItem';
import Spacer from '../components/Spacer';
import { authContext, themeContext } from '../contexts/context';
import useApi from '../hooks/useApi';
import { getScreenHeight } from '../utils/domUtil';

const SalesOrderList = ({ navigation }: any) => {
  const { theme } = useContext(themeContext);
  const { tokens, user_data, setOrderData, orderData }: any = useContext(authContext);

  const styles = useMemo(() => createStyles(theme), [theme]);
  const { apiCall } = useApi();
  const renderKeyExtractor = (item: any, index: any) => index.toString();

  const [allData, SetAllData] = useState([]);

  const [offset, setOffset] = useState(0);
  useEffect(() => {
    salesOrderListManager();
  }, [offset]);

  const renderItem = useCallback(({ item }: any) => {
    return (
      <View style={styles.item}>
        <SaleOrderItem
          item={item}
          action={() => {
            if (item?.sfid) {
              navigation.navigate("SalesOrderDetail", {
                item: item.sfid,
              })
            }
            else {
              return SimpleToast.show('No data found!');
            }
          }
          }
          actionForPencil={() => {
            if (item?.sfid) {
              navigation.navigate("UpdateCart", {
                item: item.sfid,
              })
            }
            else {
              return SimpleToast.show('No data found!');
            }
          }
          }

        />
      </View>
    );
  }, []);



  const salesOrderListManager = async () => {

    const res = await getSalesOrderList(apiCall, user_data.sfid, offset);
    SetAllData(allData.concat(res))
    console.log('allData', allData)
    return allData;
  };

  const { data, isLoading } = useQuery(
    'salesOrderListManager',
    salesOrderListManager,
    {
      retry: 0,
      enabled: true,
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
          subtitle={'123456'}
          action={() => navigation.goBack()}
          title={'Ridham Kumar'}
        />

        <FlatList
          contentContainerStyle={styles.list}
          ListHeaderComponent={() => <Header dark title="Order List" hide />}
          data={allData}
          keyExtractor={renderKeyExtractor}
          renderItem={renderItem}
          onEndReachedThreshold={0.5}
          onEndReached={() => { setOffset(offset + 10), console.log('In Flatlist::>>', offset) }}
          ListFooterComponent={() => <Spacer height={getScreenHeight(3)} />}
          ListEmptyComponent={NotFound}
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

export default SalesOrderList;


