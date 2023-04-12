// import React, {
//   useCallback,
//   useContext,
//   useEffect,
//   useMemo,
//   useState,
// } from 'react';
// import {View, StyleSheet, Text, FlatList} from 'react-native';
// import {useQuery} from 'react-query';
// import Toast from 'react-native-simple-toast';
// import {useFocusEffect} from '@react-navigation/native';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// import {FlashList} from '@shopify/flash-list';

// // Files
// import {authContext, themeContext} from '../contexts/context';
// import {getScreenHeight, getScreenWidth} from '../utils/domUtil';
// import fonts from '../constants/fonts';
// import {
//   addToCart,
//   editCart,
//   getAllDiscountedProducts,
//   getCartDetails,
// } from '../api/home';
// import useApi from '../hooks/useApi';
// import FullScreenLoader from '../components/FullScreenLoader';
// import NotFound from '../components/NotFound';
// import SimpleToast from 'react-native-simple-toast';
// import DiscountOrderItem from '../components/DiscountOrderItem';

// const DiscountedProducts = ({navigation}: any) => {
//   const {theme} = useContext(themeContext);
//   const styles = useMemo(() => createStyles(theme), [theme]);
//   const {setCartData, productSearch}: any = useContext(authContext);
//   const {apiCall} = useApi();

//   const [productIndex, setProductIndex] = useState(null);
//   const [cartProducts, setCartProducts] = useState([]);
//   const [total, setTotal] = useState(0);
//   const [totalQuantity, setTotalQuantity] = useState(0);

//   const priceHandler = (price: any, quantity: any, id: any) => {
//     let isExists = false;
//     let index = 0;
//     if (cartProducts.length === 0) {
//       let arr = [...cartProducts];
//       arr.push({
//         id,
//         price,
//         quantity,
//       });
//       setCartProducts(arr);
//     } else {
//       for (let i = 0; i < cartProducts.length; i++) {
//         if (cartProducts[i].id === id) {
//           isExists = true;
//           index = i;
//           break;
//         }
//       }
//       if (isExists) {
//         let arr = [...cartProducts];
//         arr[index].price = price;
//         arr[index].quantity = quantity;
//         setCartProducts(arr);
//       } else {
//         let arr = [...cartProducts];
//         arr.push({
//           id,
//           price,
//           quantity,
//         });
//         setCartProducts(arr);
//       }
//     }
//   };

//   const deleteProduct = useCallback(
//     (id: any) => {
//       const isExists = cartProducts.findIndex((item: any) => item.id === id);
//       if (isExists !== -1) {
//         let arr: any = [...cartProducts];
//         arr.splice(isExists, 1);
//         setCartProducts(arr);
//       }
//     },
//     [cartProducts],
//   );

//   const totalHandler = useCallback(() => {
//     let total = 0;
//     let totalQuantity = 0;
//     cartProducts.map((item: any) => {
//       total += item.price * item.quantity;
//       totalQuantity += item.quantity;
//     }),
//       setTotal(total);
//     setTotalQuantity(totalQuantity);
//   }, [cartProducts]);

//   useFocusEffect(
//     useCallback(() => {
//       refetch();
//     }, []),
//   );

//   useEffect(() => {
//     totalHandler();
//   }, [cartProducts]);

//   const cartDetailsManager = useCallback(async () => {
//     const res = await getCartDetails(apiCall);
//     return res;
//   }, [apiCall]);

//   const {refetch} = useQuery('getCartDetails', cartDetailsManager, {
//     retry: 0,
//     enabled: false,
//     onSuccess: data => {
//       setCartData(data);
//     },
//   });

//   const DiscountedProductsManager = useCallback(async () => {
//     const res = await getAllDiscountedProducts(apiCall);
//     return res;
//   }, [apiCall]);

//   const addToCartManager = useCallback(
//     async (productData: any, cart_Data: any) => {
//       let findindex = cart_Data.records.findIndex(
//         (item: any) => item.Product_ID__c === productData.data.Id,
//       );
//       if (findindex === -1) {
//         setProductIndex(productData.index.toString());
//         let records = [
//           {
//             attributes: {
//               type: 'Add_to_cart__c',
//               referenceId: `ref${productData.index}`,
//             },
//             // OwnerId: user_id,
//             Name: `${productData?.data?.Item_Code__r?.Name}`,
//             Product_ID__c: productData.data.Id,
//             Discounted_Price__c: productData.data.Discounted_pricee__c,
//             Price__c: productData.data.Discounted_pricee__c,
//             Quantity__c: productData.quantity,
//             GST__c: parseInt(
//               productData.data.Item_Code__r.GST_Group_Code_Y__c.trim()
//                 .split('')
//                 .map((num: any) => Number(num))
//                 .filter((x: any) => Number.isInteger(x))
//                 .join(''),
//             ),
//             Type__c: 'Inventory',
//             Tyre_Size__c: productData.data.Item_Code__r.Tire_Size__c,
//             Tread_Pattern__c: productData.data.Item_Code__r.Tread_Pattern__c,
//           },
//         ];
//         try {
//           const res = await addToCart(apiCall, {records});
//           if (!res.data.hasErrors) {
//             deleteProduct(productData.data.Id);
//             Toast.show('Product added to cart successfully');
//             refetch();
//           }
//         } catch (error) {
//           console.log('Error', error);
//         } finally {
//           setProductIndex(null);
//         }
//       } else {
//         setProductIndex(productData.index.toString());
//         let data = {
//           // Name: `${productData?.data?.Item_Code__r?.Name}/${productData?.data?.Variant_code__r?.Name}`,
//           Name: `${productData?.data?.Item_Code__r?.Name}`,
//           ProductId: productData.data.Id,
//           // Discounted_Price__c: productData.data.Discounted_pricee__c,
//           Price: productData.data.Discounted_pricee__c,
//           AvailableQuantity: 10.33,
//           Quantity:
//             parseInt(productData.quantity) +
//             parseInt(cart_Data.records[findindex].Quantity__c),
//           Types: '',
//         };
//         try {
//           const res = await editCart(apiCall, data);
//           if (res.code === '0001') {
//             deleteProduct(productData.data.Id);
//             SimpleToast.show(res.message);
//           }
//         } catch (err) {
//         } finally {
//           setProductIndex(null);
//         }
//       }
//     },
//     [],
//   );

//   const {data: discountProducts, isLoading: discountLoading} = useQuery(
//     'getDiscountedProducts',
//     DiscountedProductsManager,
//     {
//       retry: 0,
//       enabled: true,
//     },
//   );

//   const renderDiscountItem = useCallback(
//     ({item, index}: any) => {
//       return (
//         <View style={styles.item}>
//           <DiscountOrderItem
//             productIndex={productIndex}
//             index={index}
//             priceHandler={priceHandler}
//             action={addToCartManager}
//             deleteProduct={deleteProduct}
//             item={item}
//           />
//         </View>
//       );
//     },
//     [productIndex],
//   );

//   if (discountLoading) {
//     return <FullScreenLoader />;
//   }

//   return (
//     <KeyboardAwareScrollView
//       enableOnAndroid={true}
//       bounces={false}
//       keyboardShouldPersistTaps="handled"
//       contentContainerStyle={{flexGrow: 1}}
//       showsVerticalScrollIndicator={false}>
//       <View style={styles.screen}>
//         <FlashList
//           bounces={false}
//           // data={discountProducts[0].Sales_Line_Discount}
//           data={discountProducts&&discountProducts[0]?.Sales_Line_Discount?.filter(
//             (item: any) =>
//               item?.Item_Code__r?.Name.toLocaleLowerCase().includes(
//                 productSearch.toLocaleLowerCase(),
//               ) ||
//               item?.Item_Code__r?.Tire_Size__c.toLocaleLowerCase().includes(
//                 productSearch.toLocaleLowerCase(),
//               ) ||
//               item?.Item_Code__r?.Tread_Pattern__c.toLocaleLowerCase().includes(
//                 productSearch.toLocaleLowerCase(),
//               ),
//           )}
//           estimatedItemSize={200}
//           keyExtractor={(_, index) => index.toString()}
//           renderItem={renderDiscountItem}
//           contentContainerStyle={styles.flatlist}
//           ListEmptyComponent={NotFound}
//         />

//         <View style={styles.fotter}>
//           <Text style={[styles.title]}>
//             Grand Quantity:{' '}
//             <Text style={{fontFamily: fonts.bold}}>{totalQuantity}</Text>
//           </Text>
//           <Text style={styles.title}>
//             Grand Total:{' '}
//             <Text style={{fontFamily: fonts.bold}}>{total}.00</Text>
//           </Text>
//         </View>
//       </View>
//     </KeyboardAwareScrollView>
//   );
// };

// const createStyles = (theme: any) =>
//   StyleSheet.create({
//     screen: {
//       flex: 1,
//       backgroundColor: '#F2F2F2',
//       paddingHorizontal: getScreenHeight(2),
//     },
//     safe: {
//       flex: 1,
//       backgroundColor: theme.black,
//     },
//     linearGradient: {
//       flex: 1,
//     },
//     fotter: {
//       padding: getScreenHeight(2),
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       backgroundColor: theme.textinput,
//     },
//     title: {
//       fontFamily: fonts.regular,
//       color: theme.white,
//       fontSize: getScreenHeight(1.5),
//     },
//     header: {
//       padding: getScreenHeight(2),
//       flexDirection: 'row',
//       alignItems: 'center',
//     },
//     iconContanier: {
//       width: '10%',
//       height: getScreenHeight(6),
//       justifyContent: 'center',
//     },
//     icon: {
//       width: getScreenHeight(3.5),
//       height: getScreenHeight(3.5),
//       alignSelf: 'center',
//     },
//     dot: {
//       width: getScreenHeight(2),
//       height: getScreenHeight(2),
//       alignItems: 'center',
//       justifyContent: 'center',
//       backgroundColor: theme.white,
//       borderRadius: getScreenHeight(2),
//       position: 'absolute',
//       right: -getScreenHeight(0.5),
//       top: 0,
//     },
//     cartText: {
//       fontFamily: fonts.bold,
//       color: theme.accent,
//       fontSize: getScreenHeight(1.2),
//     },
//     row: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       paddingBottom: getScreenHeight(1),
//       paddingHorizontal: getScreenHeight(2),
//     },
//     item: {
//       marginBottom: getScreenHeight(2),
//     },
//     flatlist: {
//       padding: getScreenHeight(2),
//     },
//     spacer: {
//       width: getScreenWidth(5),
//     },
//   });

// export default DiscountedProducts;
