import React, {useCallback, useContext, useMemo} from 'react';
import {View, StyleSheet, Text, ScrollView, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import CustomNewHeader from '../components/CustomNewHeader';
import CustomStatusBar from '../components/CustomStatusBar';
import fonts from '../constants/fonts';
import {authContext, themeContext} from '../contexts/context';

import FullScreenLoader from '../components/FullScreenLoader';
import useApi from '../hooks/useApi';
import {useQuery} from 'react-query';
import {formatPrice, getScreenHeight,dateReadableFormatWithHyphen} from '../utils/domUtil';

import Header from '../components/Header';

import {getSalesOrderListDetails} from '../api/home';

const SalesOrderDetail = (navigation: any) => {
  const {theme} = useContext(themeContext);
  const SalesDetails = navigation.route.params.item;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const {user_data, modal_icon, setIcon}: any = useContext(authContext);
  const {apiCall} = useApi();
 
  const salesOrderListDetailsManager = useCallback(async () => {
    const res = await getSalesOrderListDetails(apiCall,SalesDetails);
    console.log("res",res);
    return res;
  }, [ apiCall]);
  const {data, isLoading} = useQuery(
    'salesOrderListDetailsManager',
    salesOrderListDetailsManager,
    {
      retry: 0,
      enabled: true,
    },
  );
  if (isLoading) {
    return <FullScreenLoader />;
  }



  const renderItem = ({item}: any) => {
    return (
      <View style={styles.item}>
        <View style={styles.row}>
          <Text style={styles.title}>Order Line</Text>
          <Text style={styles.value}>{item.name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Product Name</Text>
          <Text style={styles.value}>{item.product_name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Product Code</Text>
          <Text style={styles.value}>{item.product_code}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Order Date</Text>
          <Text style={styles.value}>{dateReadableFormatWithHyphen(item.createddate)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Quantity</Text>
          <Text style={styles.value}>{item.item_quantity__c}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Total Amount</Text>
          <Text style={styles.value}>{formatPrice(item.total__c)}</Text>
        </View>
        {item.offer_product_name?<View style={styles.row}>
          <Text style={styles.title}>Free Product</Text>
          <Text style={styles.value}>{item.offer_product_name}</Text>
        </View>:[]}
       
      </View>
    );
  };
  
  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <CustomStatusBar color={theme.primary} light />
      <View style={styles.screen}>
        <CustomNewHeader
          subtitle={"123456"}
          action={() => navigation.navigation.goBack()}
          title={"Ridham Kumar"}
        />
        {/* <Header style={{padding: getScreenHeight(2)}} dark title="Order Details" hide /> */}

        <ScrollView contentContainerStyle={styles.list}>
          <FlatList
            ListHeaderComponent={() => <Header dark title="Order Details" hide />}
            keyExtractor={(item, index) => index.toString()}
            data={data[0].order_line}
            renderItem={renderItem}
            contentContainerStyle={styles.flatlist}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.light_grey,
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
      padding: getScreenHeight(2),
      backgroundColor: theme.white,
      borderRadius: getScreenHeight(1),
      marginVertical: getScreenHeight(2),
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: getScreenHeight(1),
    },
    title: {
      fontFamily: fonts.bold,
      color: theme.black,
      fontSize: getScreenHeight(1.5),
      width: '30%',
    },
    value: {
      fontFamily: fonts.regular,
      color: theme.black,
      fontSize: getScreenHeight(1.5),
      flex: 1,
    },
    flatlist: {
      paddingHorizontal: getScreenHeight(2),
    },
  });

export default SalesOrderDetail;
