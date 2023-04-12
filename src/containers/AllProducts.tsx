import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { useQuery } from 'react-query';
import Toast from 'react-native-simple-toast';
import { useFocusEffect } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { FlashList } from '@shopify/flash-list';

// Files
import { authContext, themeContext } from '../contexts/context';
import { getScreenHeight, getScreenWidth } from '../utils/domUtil';
import fonts from '../constants/fonts';
import PlaceOrderItem from '../components/PlaceOrderItem';
import {
  addToCart,
  editCart,
  getAllProducts,
  getCartDetails,
  getInvoiceAmount,
} from '../api/home';
import useApi from '../hooks/useApi';
import FullScreenLoader from '../components/FullScreenLoader';
import NotFound from '../components/NotFound';
import SimpleToast from 'react-native-simple-toast';

const AllProducts = (props: any) => {
  const { theme } = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const {productSearch, setCartData, user_data,cart_Data_Length, user_id}: any =
    useContext(authContext);
  const { apiCall } = useApi();
 
  const [productIndex, setProductIndex] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);


  const priceHandler = (price: any, quantity: any, id: any) => {
    let isExists = false;
    let index = 0;
    if (cartProducts.length === 0) {
      let arr = [...cartProducts];
      arr.push({
        id,
        price,
        quantity,
      });
      setCartProducts(arr);
    } else {
      for (let i = 0; i < cartProducts.length; i++) {
        if (cartProducts[i].id === id) {
          isExists = true;
          index = i;
          break;
        }
      }
      if (isExists) {
        let arr = [...cartProducts];
        arr[index].price = price;
        arr[index].quantity = quantity;
        setCartProducts(arr);
      } else {
        let arr = [...cartProducts];
        arr.push({
          id,
          price,
          quantity,
        });
        setCartProducts(arr);
      }
    }
  };

  const deleteProduct = useCallback(
    (id: any) => {
      const isExists = cartProducts.findIndex((item: any) => item.id === id);
      if (isExists !== -1) {
        let arr: any = [...cartProducts];
        arr.splice(isExists, 1);
        setCartProducts(arr);
      }
    },
    [cartProducts],
  );

  const totalHandler = useCallback(() => {
    let total = 0;
    let totalQuantity = 0;
    cartProducts.map((item: any) => {
      total += item.price * item.quantity;
      totalQuantity += item.quantity;
    }),
      setTotal(total);
    setTotalQuantity(totalQuantity);
  }, [cartProducts]);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, []),
  );

  useEffect(() => {
    totalHandler();
  }, [cartProducts]);

  const ProductsManager = useCallback(async () => {
    const res = await getAllProducts(apiCall, user_data.sfid, user_data.state__c);
    return res;
  }, [apiCall]);

  const { data: products, isLoading } = useQuery('getProducts', ProductsManager, {
    retry: 0,
    enabled: true,
  });

  const cartDetailsManager = useCallback(async () => {
    const res = await getCartDetails(apiCall);
    return res;
  }, []);

  const { refetch } = useQuery('getCartDetails', cartDetailsManager, {
    retry: 0,
    enabled: false,
    onSuccess: data => {
      setCartData(data);
    },
  });


  const addToCartManager = useCallback(
    async (productData: any, cart_Data: any) => {
      setProductIndex(productData.index.toString());
      let records =
      {
        // "sfid":"a1G9D000001G8o6UAC", //Cart Item SFID to be sent in update,remove
        "quantity__c": productData.quantity, //Quantity To Be Sent In create,addqty,dec,qty
        "price": productData.data.mop__c, //Price to Be Sent In create
        "product__c": productData.data.sfid //Product T
      }
      let type = {
        "cartType": 'create'
      }
      try {
        const res = await addToCart(apiCall, { records }, type.cartType);

      } catch (error) {
        console.log('Error', error);
      } finally {
        setProductIndex(null);
      }

    },
    [user_id],
  );

  const renderItem = useCallback(

    ({ item, index }: any) => {
      return (
        <View style={styles.item}>
          <PlaceOrderItem
            productIndex={productIndex}
            index={index}
            priceHandler={priceHandler}
            action={addToCartManager}
            deleteProduct={deleteProduct}
            item={item}
            actionNavigate={props.action}
            
          />
        </View>
      );
    },
    [productIndex],
  );

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <KeyboardAwareScrollView
      enableOnAndroid={true}
      bounces={false}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}>
      <View style={styles.screen}>
        <FlashList
          bounces={false}
          // data={products}
          data={products?.filter(
            (item: any) =>
              item.name.toLocaleLowerCase().includes(
                productSearch.toLocaleLowerCase(),
              ) ||
              item.material_code__c.toLocaleLowerCase().includes(
                productSearch.toLocaleLowerCase(),
              )
          )}
          estimatedItemSize={2000}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
          // onRefresh={() => console.log("ggggg")}a
				  refreshing={isLoading}
          contentContainerStyle={styles.flatlist}
          ListEmptyComponent={NotFound}
        />

        {/* <View style={styles.fotter}>
          <Text style={[styles.title]}>
            Grand Quantity:{' '}
            <Text style={{fontFamily: fonts.bold}}>{totalQuantity}</Text>
          </Text>
          <Text style={[styles.title]}>
            Grand Total:{' '}
            <Text style={{fontFamily: fonts.bold}}>{total}.00</Text>
          </Text>
        </View> */}
      </View>
    </KeyboardAwareScrollView>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: '#F2F2F2',
      paddingHorizontal: getScreenHeight(2),
    },
    safe: {
      flex: 1,
      backgroundColor: theme.black,
    },
    linearGradient: {
      flex: 1,
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
    header: {
      padding: getScreenHeight(2),
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconContanier: {
      width: '10%',
      height: getScreenHeight(6),
      justifyContent: 'center',
    },
    icon: {
      width: getScreenHeight(3.5),
      height: getScreenHeight(3.5),
      alignSelf: 'center',
    },
    dot: {
      width: getScreenHeight(2),
      height: getScreenHeight(2),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.white,
      borderRadius: getScreenHeight(2),
      position: 'absolute',
      right: -getScreenHeight(0.5),
      top: 0,
    },
    cartText: {
      fontFamily: fonts.bold,
      color: theme.accent,
      fontSize: getScreenHeight(1.2),
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingBottom: getScreenHeight(1),
      paddingHorizontal: getScreenHeight(2),
    },
    item: {
      marginBottom: getScreenHeight(2),
    },
    flatlist: {
      padding: getScreenHeight(2),
    },
    spacer: {
      width: getScreenWidth(5),
    },
  });

export default AllProducts;
