import React, {useCallback, useContext, useMemo, useState} from 'react';
import {View, StyleSheet, Text, ScrollView, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import SimpleToast from 'react-native-simple-toast';
import {useQuery} from 'react-query';

// Files
import CustomInput from '../components/CustomInput';
import {
  getBudgetAndUsage,
  getYcnCartDetails,
  placeYcnOrder,
  removeYcnCart,
} from '../api/home';
import ArrowButton from '../components/ArrowButton';
import YcnCartItem from '../components/YcnCartItem';
import CustomNewHeader from '../components/CustomNewHeader';
import CustomStatusBar from '../components/CustomStatusBar';
import DeleteModal from '../components/DeleteModal';
import Divider from '../components/Divider';
import Header from '../components/Header';
import NotFound from '../components/NotFound';
import Spacer from '../components/Spacer';
import fonts from '../constants/fonts';
import {authContext, themeContext} from '../contexts/context';
import useApi from '../hooks/useApi';
import {formatPrice, getScreenHeight, getScreenWidth} from '../utils/domUtil';

const YcnCart = ({navigation}: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const {setYcnCartData, cart_Data, ycn_cart_Data, user_id, user_data}: any =
    useContext(authContext);
  const {apiCall} = useApi();
  const [remark, setRemark] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const [orderLoading, setOrderLoading] = useState(false);

  const cartDetailsManager = useCallback(async () => {
    const res = await getYcnCartDetails(apiCall);
    return res;
  }, [apiCall]);

  const deleteHandler = async (id: any) => {
    setSelectedId(id);
    setShowDeleteModal(null);
    try {
      const res = await removeYcnCart(apiCall, id);
      SimpleToast.show('Product removed from cart sucessfully!');
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const getBudgetAndUsageManager = useCallback(async () => {
    const res2 = await getBudgetAndUsage(apiCall, user_data.Id);
    return res2;
  }, [user_data, apiCall]);

  const {data: budgetData} = useQuery(
    'getBudgetAndUsage',
    getBudgetAndUsageManager,
    {
      retry: 0,
      enabled: true,
    },
  );

  const {refetch} = useQuery('getUpdatedCartDetail', cartDetailsManager, {
    retry: 0,
    enabled: true,
    onSuccess: data => {
      setYcnCartData(data);
    },
  });

  const renderItem = useCallback(
    ({item}: any) => {
      return (
        <YcnCartItem
          selectedId={selectedId}
          action={(item: any) => setShowDeleteModal(item)}
          item={item}
        />
      );
    },
    [selectedId],
  );

  const placeOrderManager = async () => {
    setOrderLoading(true);
    if (!remark) {
      setOrderLoading(false);
      return SimpleToast.show('Please Enter Remarks');
    }
    setOrderLoading(true);
    let lineData = ycn_cart_Data?.records?.map((data: any) => {
      return {
        Dealer: '',
        Item: data.Promotional_Catalogue__c,
        Quantity: data.Quantity__c,
        UnitPrice: data.Price__c,
      };
    });
    let data = {
      Dealer: user_id,
      OrderDate: '',
      DealerRemarks: remark,
      DeliveryDate: '2022-09-29',
      TotalPrice: '',
      OrderStatus: '',
      line: lineData,
    };
    try {
      const res = await placeYcnOrder(apiCall, data);
      if (res.Status === 'Success') {
        SimpleToast.show('Order placed successfully!');
        navigation.goBack();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setOrderLoading(false);
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
        <CustomStatusBar color={theme.black} light />
        <View style={styles.screen}>
          <CustomNewHeader
            subtitle={user_data?.Customer_No__c}
            action={() => navigation.goBack()}
            title={user_data?.Name}
          />
          <ScrollView>
            <View style={styles.header}>
              <Header dark title="Online Order" hide />
            </View>

            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: getScreenHeight(2),
                justifyContent: 'space-between',
              }}>
              <View>
                <Text style={styles.title}>Available Budget</Text>
                <Text numberOfLines={1} style={styles.subtitle}>
                  {formatPrice(budgetData ? budgetData[0]?.Budget_Value__c : 0)}
                </Text>
              </View>

              <View>
                <Text style={styles.title}>Unused and Expired</Text>
                <Text numberOfLines={1} style={styles.subtitle}>
                  {formatPrice(
                    budgetData ? budgetData[0]?.Unused_Amount__c : 0,
                  )}
                </Text>
              </View>
            </View>

            <Spacer height={getScreenHeight(3)} />

            <View style={styles.input}>
              <CustomInput
                black
                placeholder="Enter Remarks"
                value={remark}
                action={setRemark}
              />
            </View>
            <Spacer height={getScreenHeight(3)} />

            <Divider color={theme.black} />

            <FlatList
              data={ycn_cart_Data?.records}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItem}
              ListEmptyComponent={NotFound}
            />

            {ycn_cart_Data?.records?.length ? (
              <View style={styles.buttonContanier}>
                <ArrowButton
                  loading={orderLoading}
                  action={placeOrderManager}
                  title="Confirm Order"
                />
              </View>
            ) : (
              []
            )}
          </ScrollView>
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
    Remark: {
      padding: getScreenWidth(1),
    },

    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
    column: {},
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
      width: '90%',
      marginVertical: getScreenHeight(4),
      alignSelf: 'center',
    },
    input: {
      // marginTop: getScreenHeight(1),
      marginRight: getScreenHeight(2),
      marginLeft: getScreenHeight(2),
      flex: 1,
    },
  });

export default YcnCart;
