import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import FastImage from 'react-native-fast-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import SimpleToast from 'react-native-simple-toast';
import { useQuery } from 'react-query';
import { StackActions } from '@react-navigation/native';

import {
  getCartDetails,
  getCreditAmount,
  getInvoiceAmount,
  placeOrder,
  removeCart,
} from '../api/home';
import ArrowButton from '../components/ArrowButton';
import CartItem from '../components/CartItem';
import moment from 'moment';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import CustomNewHeader from '../components/CustomNewHeader';
import CustomStatusBar from '../components/CustomStatusBar';
import DeleteModal from '../components/DeleteModal';
import Divider from '../components/Divider';
import Header from '../components/Header';
import NotFound from '../components/NotFound';
import Spacer from '../components/Spacer';
import fonts from '../constants/fonts';
import { authContext, themeContext } from '../contexts/context';
import useApi from '../hooks/useApi';
import { formatPrice, getScreenHeight, getScreenWidth } from '../utils/domUtil';
import FullScreenLoader from '../components/FullScreenLoader';

const Cart = ({ navigation }: any) => {
  const { theme } = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const {
    setCartData,
    cart_Data,
    user_data,
    availableCreditLimit,
    setAvailableCreditLimit,
    user_id,
  }: any = useContext(authContext);
  const { apiCall } = useApi();
  const [selectedId, setSelectedId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderDraftLoading, setOrderDraftLoading] = useState(false);
  const [priceData, setPriceData] = useState(null);
  const [shipAddress, setShipAddress]: any = useState({
    Address__c: 'Billing Address',
    Name: '',
    State__r: {
      Name: '',
    },
  });
  const [totalQuality, setTotalQuality] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const [totalQuantity, setTotalQuantity] = useState(0);

  const cartDetailsManager = useCallback(async () => {
    const res = await getCartDetails(apiCall);
    return res;
  }, [apiCall]);


  // const getPriceValue = async () => {
  //   try {
  //     const res = await getInvoiceAmount(apiCall, user_id);
  //     setPriceData(res?.InvoiceTDSAmount);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const calculationHandler = (data: any) => {
    let price = 0;
    let quantity = 0;
    data && data.map((item: any) => {
      quantity = quantity + item.quantity__c
      price = price + item.final_price

    }
    )
    setTotalQuantity(quantity)
    setTotalPrice(price)

  };

  
  
  useEffect(() => {
    calculationHandler(cart_Data);
  }, [cart_Data, priceData]);
  let type = {
    "cartType": 'remove'
  }

  const deleteHandler = async (id: any) => {
    setSelectedId(id);
    setShowDeleteModal(null);
    let item = {
      "sfid": id,
    }
    try {

      const res = await removeCart(apiCall, item, type.cartType);

      SimpleToast.show('Product removed from cart sucessfully!');
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const { refetch, isFetching } = useQuery(
    'getUpdatedCartDetail',
    cartDetailsManager,
    {
      retry: 0,
      enabled: true,
      onSuccess: data => {
        setCartData(data);
      },
    },
  );

  const renderItem = useCallback(
    ({ item, index }: any) => {
      return (
        <CartItem
          priceData={priceData ? priceData : 0}
          index={index}
          selectedId={selectedId}
          action={(item: any) => setShowDeleteModal(item)}
          item={item}
        />
      );
    },
    [selectedId, priceData],
  );

  // const addressHandler = useCallback((data: any) => {
  //   setShipAddress(data);
  // }, []);

  const placeOrderManager = async () => {
    // if (!shipAddress) {
    //   return SimpleToast.show('Please select a shipping address');
    // }
    setOrderLoading(true);
    console.log('cart_Data', cart_Data)
    let lineData = cart_Data && cart_Data.map((data: any) => {
console.log('secondary_uom__c',data)
      return {
        "quantity__c": data.quantity__c,
        "product__c": data.product__c,
        "item_amount": data.price_value__c,
        "total": data.final_price,
        "net_weight__c":12,
        "secondary_uom__c":data.uom,
        "offer_product__c":data.offer_product__c?data.offer_product__c:''

      };
    });

    let data = {
      OrderDate: moment().format('YYYY-MM-DD'),
      // order_month__c: moment().format('MM'),
      status__c: 'Finalized',
      order_line: lineData,
      total_amount__c: totalPrice

    };

    try {
      const res = await placeOrder(apiCall, data);
      if (res && res.message) {
        SimpleToast.show(res.message);
        navigation.dispatch(StackActions.popToTop());
        navigation.navigate('SalesOrderList');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setOrderLoading(false);
    }
  };

  const placeOrderDraftManager = async () => {
    if (!shipAddress) {
      return SimpleToast.show('Please select a shipping address');
    }
    setOrderDraftLoading(true);
    console.log('cart_Data', cart_Data)
    let lineData = cart_Data && cart_Data.map((data: any) => {

      return {
        "quantity__c": data.quantity__c,
        "product__c": data.product__c,
        "item_amount": data.price_value__c,
        "total": data.final_price,
        "net_weight__c":12,
        "secondary_uom__c":data.uom,
        "offer_product__c":data.offer_product__c?data.offer_product__c:''
        
      };
    });

    let data = {
      OrderDate: moment().format('YYYY-MM-DD'),
      // order_month__c: moment().format('MM'),
      status__c: 'Retail Draft',
      order_line: lineData,
      total_amount__c: totalPrice

    };

    try {
      const res = await placeOrder(apiCall, data);
      if (res && res.message) {
        SimpleToast.show(res.message);
        navigation.dispatch(StackActions.popToTop());
        navigation.navigate('SalesOrderList');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setOrderDraftLoading(false);
    }
  };

  return (
    <>
      {showDeleteModal ? (
        <DeleteModal
          title="Are you sure?"
          subtile="you wanted to remove this item from cart."
          no={() => {
            setShowDeleteModal(null);
          }}
          yes={() => {
            deleteHandler(showDeleteModal);
          }}
        />
      ) : null}
      <SafeAreaView edges={['top']} style={styles.safe}>
        <CustomStatusBar color={theme.primary} light />
        <View style={styles.screen}>
          <CustomNewHeader
            subtitle={'123456'}
            action={() => navigation.goBack()}
            title={"Ridham Kumar"}
          />
          <KeyboardAwareScrollView
            enableOnAndroid={true}
            bounces={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
              <Header dark title="Order" hide />
            </View>
            <View style={styles.header}>
              <View style={styles.row}>
                <View>


                  <View style={styles.newColum}>
                    <Text style={styles.title}>Total Order Qty</Text>
                    <Text numberOfLines={1} style={styles.subtitle}>
                      {totalQuantity}
                    </Text>
                  </View>
                </View>

                <View>


                  <View style={styles.newColum}>
                    <Text style={styles.title}>Total Price</Text>
                    <Text numberOfLines={1} style={styles.subtitle}>
                      {formatPrice(totalPrice)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            {/* 
            <Divider color={theme.black} />
            <Spacer /> */}
            {/* <TouchableOpacity
              onPress={() =>
                navigation.navigate('ShippingAddress', {addressHandler})
              }
              style={styles.addressContanier}>
              <Text style={styles.title}>Ship To</Text>
              <View style={styles.newRow}>
                <Text style={[styles.subtitle, {width: '80%'}]}>
                  {shipAddress
                    ? shipAddress?.Address__c
                    : 'Please Select Shipping Address'}
                </Text>
                <FastImage
                  resizeMode="contain"
                  tintColor={theme.white}
                  style={styles.icon}
                  source={require('../assets/images/arrows/downarrow.png')}
                />
              </View>
            </TouchableOpacity> */}

            {/* <Divider color={theme.black} /> */}

            <FlatList
              ListHeaderComponent={() =>
                isFetching ? (
                  <ActivityIndicator
                    size={'small'}
                    style={{ margin: getScreenHeight(1) }}
                    color={theme.primary}
                  />
                ) : null
              }
              data={cart_Data}

              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItem}
              ListEmptyComponent={isFetching ? null : NotFound}
            />

            {cart_Data?.length ? (
              <View style={styles.buttonContanier}>

                <View style={{ marginLeft: '28%' }}>
                  <ArrowButton
                    loading={orderDraftLoading}
                    action={placeOrderDraftManager}
                    title="Draft Order"
                  />
                </View>

                <View style={{ marginLeft: '15%' }}>
                  <ArrowButton
                    loading={orderLoading}
                    action={placeOrderManager}
                    title="Submit Order"
                  />
                </View>

              </View>
            ) : null}
          </KeyboardAwareScrollView>
        </View>
      </SafeAreaView>
    </>
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
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
    newColum: {
      marginVertical: getScreenHeight(1),
    },
    title: {
      fontFamily: fonts.regular,
      color: theme.black,
      fontSize: getScreenHeight(1.6),
    },
    body: {
      fontFamily: fonts.regular,
      color: theme.black,
      fontSize: getScreenHeight(1.4),
    },
    subtitle: {
      fontFamily: fonts.bold,
      color: theme.black,
      fontSize: getScreenHeight(1.6),
    },
    addressContanier: {
      paddingHorizontal: getScreenHeight(2),
    },
    newRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      flex: 1,
    },
    icon: {
      height: getScreenHeight(2),
      width: getScreenHeight(2),
    },
    footer: {
      margin: getScreenHeight(2),
      backgroundColor: theme.white,
      borderRadius: getScreenHeight(1),
      overflow: 'hidden',
    },
    footerheader: {
      padding: getScreenHeight(1),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    tableContanier: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: getScreenHeight(1),
    },
    line: {
      height: getScreenHeight(10),
      backgroundColor: theme.black,
      width: getScreenHeight(0.1),
      marginHorizontal: getScreenHeight(2),
    },
    table: {
      flex: 1,
    },
    buttonContanier: {
      width: '50%',
      // alignSelf: 'center',
      alignContent: 'space-between',
      marginVertical: getScreenHeight(4),
      flexDirection: 'row'
    },
    submitButtons: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      flex: 1,
    }
  });

export default Cart;
