import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {View, StyleSheet, Text, FlatList} from 'react-native';
import {useQuery} from 'react-query';
import Toast from 'react-native-simple-toast';
import {useFocusEffect} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

// Files
import {authContext, themeContext} from '../contexts/context';
import {getScreenHeight, getScreenWidth} from '../utils/domUtil';
import fonts from '../constants/fonts';
import PlaceOrderItem from '../components/PlaceOrderItem';
import {addToCart, editCart, getCartDetails} from '../api/home';
import useApi from '../hooks/useApi';
import NotFound from '../components/NotFound';
import SimpleToast from 'react-native-simple-toast';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomStatusBar from '../components/CustomStatusBar';
import CustomNewHeader from '../components/CustomNewHeader';
import CustomBackHeader from '../components/CustomBackHeader';
import {FlashList} from '@shopify/flash-list';
import { navigate } from '../services/Routerservices';


const FilteredProducts = ({navigation, route}: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const {productSearch, setCartData, cart_Data}: any = useContext(authContext);
  const {apiCall} = useApi();
  const products = route.params.products;

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
    [],
  );
  const renderItem = useCallback(
    ({item, index}: any) => {
      return (
        <View style={styles.item}>
          <PlaceOrderItem
            productIndex={productIndex}
            index={index}
            priceHandler={priceHandler}
            action={addToCartManager}
            deleteProduct={deleteProduct}
            item={item}
            actionNavigate={()=>navigate('ApplyOfferScreen')}
          />
        </View>
      );
    },
    [productIndex],
  );

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <CustomStatusBar color={theme.black} light />
      {/* <CustomNewHeader
        subtitle={user_data?.Customer_No__c ? user_data?.Customer_No__c : ''}
        action={() => navigation.goBack()}
        title={user_data?.Name ? user_data?.Name : ''}
      /> */}
      <CustomBackHeader
        black
        cart
        rightIconAction={() => (cart_Data ? navigation.navigate('Cart') : null)}
        action={() => navigation.goBack()}
        title="Filter Results"
        cartCount={cart_Data ? cart_Data?.totalSize : 0}
      />
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        bounces={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.screen}>
          <FlashList
            bounces={false}
            data={
              products
            
          
          }
            estimatedItemSize={200}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.flatlist}
            ListEmptyComponent={NotFound}
          />

          
        </View>
      </KeyboardAwareScrollView>
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

export default FilteredProducts;


