import React, {useCallback, useContext, useMemo, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useQuery} from 'react-query';
import Toast from 'react-native-simple-toast';
import {useFocusEffect} from '@react-navigation/native';

import {authContext, themeContext} from '../contexts/context';
import CustomStatusBar from '../components/CustomStatusBar';
import {getScreenHeight, getScreenWidth} from '../utils/domUtil';
import fonts from '../constants/fonts';
import CustomSearchBar from '../components/CustomSearchBar';
import PlaceOrderItem from '../components/PlaceYcnOrderItem';
import CustomBackHeader from '../components/CustomBackHeader';
import {
  addToYcnCart,
  editYcnCart,
  getAllDiscountedProducts,
  getYcnProducts,
  getYcnCartDetails,
} from '../api/home';
import useApi from '../hooks/useApi';
import FullScreenLoader from '../components/FullScreenLoader';
import NotFound from '../components/NotFound';
import SimpleToast from 'react-native-simple-toast';
import YcnOrderItem from '../components/YcnOrderItem';

const CreateYcnMerchandise = ({navigation}: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const {ycn_cart_Data, setYcnCartData}: any = useContext(authContext);
  const {apiCall} = useApi();

  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState('all');
  const [productIndex, setProductIndex] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);

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
      const isExists = cartProducts.findIndex((item: any) => item.Id === id);
      if (isExists !== -1) {
        let arr: any = [...cartProducts];
        arr.splice(isExists, 1);
        setCartProducts(arr);
      }
    },
    [cartProducts],
  );

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, []),
  );

  const YcnProductsManager = useCallback(async () => {
    const res = await getYcnProducts(apiCall);
    return res;
  }, [apiCall]);

  const {data: products, isLoading} = useQuery(
    'getYcnProducts',
    YcnProductsManager,
    {
      retry: 0,
      enabled: true,
    },
  );

  const cartDetailsManager = useCallback(async () => {
    const res = await getYcnCartDetails(apiCall);
    return res;
  }, [apiCall]);

  const {data: cardData, refetch} = useQuery(
    'getYcnCartDetails',
    cartDetailsManager,
    {
      retry: 0,
      enabled: false,
      onSuccess: data => {
        setYcnCartData(data);
      },
    },
  );

  const addToCartManager = useCallback(
    async (productData: any) => {
      let findIndex = null;
      console.log('Card ', cardData.length);
      if (cardData.length !== 0) {
        findIndex = cardData.records.find(
          (item: any) => item.Promotional_Catalogue__c === productData.data.Id,
        );
      }
      if (!findIndex) {
        setProductIndex(productData.index.toString());
        let recordss = {
          records: [
            {
              attributes: {
                type: 'Add_to_cart_2__c',
                referenceId: `ref${productData.index}`,
              },
              Name: productData.data.Name,
              Price__c: productData.data.Price__c,
              Promotional_Catalogue__c: productData.data.Id,
              Quantity__c: productData.quantity,
            },
          ],
        };
        try {
          const res = await addToYcnCart(apiCall, {recordss});
          if (!res.data.hasErrors) {
            refetch();
            Toast.show('Product added to cart successfully');
          }
        } catch (error) {
          console.log('Error', error);
        } finally {
          setProductIndex(null);
        }
      } else {
        setProductIndex(productData.index.toString());
        let data = {
          batchRequests: [
            {
              method: 'PATCH',
              url: 'v45.0/sobjects/Add_to_cart_2__c/' + findIndex.Id,
              richInput: {
                Name: productData.data.Name,
                Price__c: productData.data.Price__c,
                Promotional_Catalogue__c: productData.data.Id,
                Quantity__c:
                  parseInt(productData.quantity) + findIndex.Quantity__c,
              },
            },
            {
              method: 'GET',
              url:
                'v34.0/sobjects/Add_to_cart_2__c/' +
                findIndex.Id +
                '?fields=Id',
            },
          ],
        };
        try {
          const res = await editYcnCart(apiCall, data);
          console.log('RES >>>>>', res);
          if (!res.hasErrors) {
            return SimpleToast.show('Product updated successfully');
          }
        } catch (err) {
          console.log('>>>', err);
        } finally {
          setProductIndex(null);
        }
      }
    },
    [cardData],
  );

  const renderItem = useCallback(
    ({item, index}: any) => {
      return (
        <View style={styles.item}>
          <YcnOrderItem
            productIndex={productIndex}
            index={index}
            priceHandler={priceHandler}
            action={addToCartManager}
            deleteProduct={deleteProduct}
            item={item}
            selected={selected}
          />
        </View>
      );
    },
    [selected, productIndex],
  );

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <CustomStatusBar light color={theme.black} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <View style={styles.screen}>
          {/* <CustomHeader action={() => navigation.openDrawer()} /> */}
          <CustomBackHeader
            black
            cart
            rightIconAction={() =>
              ycn_cart_Data ? navigation.navigate('YcnCart') : null
            }
            action={() => navigation.goBack()}
            title="Promotional Catalogue"
            cartCount={ycn_cart_Data ? ycn_cart_Data?.totalSize : 0}
          />

          <View style={styles.header}>
            <View style={{width: '100%'}}>
              <CustomSearchBar
                rightAction={() => navigation.navigate('OrderFilters')}
                value={search}
                action={setSearch}
                placeholder="Search By Product Code Or Name"
              />
            </View>
          </View>

          <FlatList
            data={products.records?.filter((item: any) =>
              item.Name.toLocaleLowerCase().includes(
                search.toLocaleLowerCase(),
              ),
            )}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.flatlist}
            ListEmptyComponent={NotFound}
          />

          {/* <View style={styles.fotter}>
            <Text style={styles.title}>
              Grand Quantity:{' '}
              <Text style={{fontFamily: fonts.bold}}>{totalQuantity}</Text>
            </Text>
            <Text style={styles.title}>
              Grand Total:{' '}
              <Text style={{fontFamily: fonts.bold}}>{total}.00</Text>
            </Text>
          </View> */}
        </View>
      </KeyboardAvoidingView>
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
      backgroundColor: theme.primary,
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

export default CreateYcnMerchandise;
