import React, { useContext, useEffect, useMemo, useState,useCallback } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Pressable, Modal
} from 'react-native';
import FastImage from 'react-native-fast-image';
import fonts from '../constants/fonts';
import Images from '../constants/images';

import { authContext, themeContext } from '../contexts/context';
import { formatPrice, getScreenHeight, getScreenWidth } from '../utils/domUtil';
import Divider from './Divider';
import Spacer from './Spacer';
import CustomInput from '../components/CustomInput';
import ArrowButton from './ArrowButton';
import {
  addToCart,
  getCartDetails,
} from '../api/home';
import useApi from '../hooks/useApi';
import Toast from 'react-native-simple-toast';
import { useQuery } from 'react-query';
import { useFocusEffect } from '@react-navigation/native';


const CartItem = (props: any) => {
  const { theme } = useContext(themeContext);
  const { user_data } = useContext(authContext);
  const styles = useMemo(() => createStyles(theme), [theme]);
  // const [finalQuantity, setFinalQuantity] = useState('');
  const [openModal, setOpenModal] = useState('false');
  const [quantityValue, setQuantityValue] = useState("");
  const { apiCall } = useApi();
 
  const cartDetailsManager = useCallback(async () => {
    const res = await getCartDetails(apiCall);
    return res;
  }, [apiCall]);
  const { refetch, isFetching } = useQuery(
    'getUpdatedCartDetail',
    cartDetailsManager,
    {
      retry: 0,
      enabled: true,
    },
  );
  
  useFocusEffect(
    useCallback(() => {
     
      refetch();

    }, [openModal]),
  );
  // console.log("quantityValue2",quantityValue)
  const addToCartManager = async () => {
  
    let records =
      {
        "sfid":props?.item?.sfid, //Cart Item SFID to be sent in update,remove
        "quantity__c": quantityValue, //Quantity To Be Sent In create,addqty,dec,qty
     'price':props?.item?.price_value__c ?? 0
      }
      let type = {
        "cartType": 'update_qty'
      }



    const res = await addToCart(apiCall, { records }, type.cartType);
    setQuantityValue("")
    setOpenModal('false')
    return res;
   
  };



  return (
    <View style={styles.footer}>
      {/* {console.log("props",props.item)} */}
      <View style={styles.footerheader}>
        <View style={styles.row}>
          <FastImage
            source={Images.greentick}
            style={[styles.icon, { marginRight: getScreenHeight(2) }]}
          />
          <Text style={[styles.title, { color: theme.black }]}>Product Code</Text>
        </View>
        <Text style={[styles.subtitle, { color: theme.black }]}>
          {props?.item?.product_code}
        </Text>
        <TouchableOpacity
          onPress={() => {
            props.action(props.item.sfid);
          }}>

          {props.item.Id === props.selectedId ? (
            <ActivityIndicator size={'small'} color={theme.primary} />
          ) : (
            <FastImage
              resizeMode="contain"
              tintColor={theme.black}
              style={styles.icon}
              source={require('../assets/images/common/delete.png')}

            />
          )}
        </TouchableOpacity>
      </View>
      <Divider color={theme.black} />
      <Spacer />
      <View style={styles.tableContanier}>
        <Text style={[styles.subtitle, { color: theme.black }]}>
          {props.index + 1}
        </Text>
        <View style={styles.line} />
        <View style={styles.table}>
          <View style={styles.newRow}>
            <View style={[styles.column, { width: '33%' }]}>
              <Text style={styles.body}>Product Name</Text>
              <Text style={styles.body}>Unit Price</Text>
              <Text style={styles.body}>Quantity</Text>
              <Text style={styles.body}>UOM</Text>
              <Text style={styles.body}>Approx Weight</Text>
             {/* {console.log("props?.item?.offer_product_name",props?.item?.offer_product_name)} */}
              {
                props.item?.offer_product_name?
                <Text style={styles.body}>Free Product</Text>:[]
              }

            </View>



            <View style={[styles.column]}>
              <Text numberOfLines={2} style={styles.body}>
                {props?.item?.product_name ?? 'NA'}
              </Text>
              <Text numberOfLines={1} style={styles.body}>
                {formatPrice(props?.item?.price_value__c ?? 0)}
              </Text>

              {/* <TouchableOpacity style={{ backgroundColor: '#f2f6fa', width: getScreenHeight(10), flexDirection: 'row' }} > */}
                <Text numberOfLines={1} style={styles.body}>
                  {props?.item?.quantity__c ?? 0}
                </Text>

                {/* <FastImage
                  resizeMode="contain"
                  tintColor={theme.white}
                  style={styles.icon2}
                  source={require('../assets/images/arrows/downarrow.png')}
                /> */}
              {/* </TouchableOpacity> */}

              <Text numberOfLines={1} style={styles.body}>
                {props?.item?.uom}
              </Text>
              <Text style={styles.body}>{props?.item?.net_weight__c}</Text>
              {
                props.item?.offer_product_name?
                <Text style={styles.body}>{props?.item?.offer_product_name}</Text>:[]
              }

            </View>


          </View>

          <Text
            numberOfLines={1}
            style={[
              styles.body,
              {
                fontFamily: fonts.semiBold,
                marginTop: getScreenHeight(3),
              },
            ]}>
            Final Price:{' '}
            {formatPrice(props?.item?.final_price)}
          </Text>
        </View>
      </View>

      <Spacer />
      {openModal == "true" ? <Modal
        visible={props.visible}
        animationType="fade"
        transparent={true}
      >
        <Pressable style={styles.modalScreen} >
          <View style={styles.modalContanier} >


            <View style={styles.modalView}>
              <Text style={{ marginLeft: getScreenHeight(15) }}>Select Quantity</Text>
              <TouchableOpacity onPress={() => setOpenModal('false')} >
                <FastImage
                  source={require("../assets/images/cross.png")}
                  style={styles.profileImage}

                />
              </TouchableOpacity>
            </View>
            <View>

              <CustomInput
                // black
                placeholder="Enter Quantity"
                value={quantityValue}
                action={setQuantityValue}
              />
            </View>

            <View style={{marginTop:getScreenHeight(3),paddingLeft:60,paddingRight:60}}>
                  <ArrowButton
                    
                    action={addToCartManager}
                    title="Save"
                  />
                </View>
          </View>


        </Pressable>
      </Modal> : []}
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    footer: {
      margin: getScreenHeight(2),
      backgroundColor: theme.white,
      borderRadius: getScreenHeight(1),
      overflow: 'hidden',
    },
    profileImage: {
      height: getScreenHeight(4),
      width: getScreenHeight(4),
      borderRadius: getScreenHeight(5),
      marginLeft: getScreenHeight(13)
      // backgroundColor: theme.primary_light,
      // borderWidth: getScreenHeight(0.2),
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
      width: '80%',
      alignSelf: 'center',
      marginVertical: getScreenHeight(4),
    },
    body: {
      fontFamily: fonts.regular,
      color: theme.black,
      fontSize: getScreenHeight(1.4),
      marginVertical: getScreenHeight(0.5),
    },
    body2: {
      fontFamily: fonts.regular,
      color: theme.black,
      width: getScreenWidth(25),
      fontSize: getScreenHeight(1.4),
      textAlign: 'left',
    },
    subtitle: {
      fontFamily: fonts.bold,
      color: theme.white,
      fontSize: getScreenHeight(1.6),
    },
    newRow: {
      flexDirection: 'row',
      width: getScreenWidth(70),
      alignItems: 'center',
      justifyContent: 'space-between',
      flex: 1,
    },
    newRow2: {
      flexDirection: 'row',
      // alignItems: 'center',
      justifyContent: 'space-between',
      flex: 1,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    icon: {
      height: getScreenHeight(2),
      width: getScreenHeight(2),
    },
    icon2: {
      height: getScreenHeight(2.8),
      width: getScreenHeight(2.5),
      backgroundColor: theme.primary,
      marginLeft: getScreenWidth(13)
    },
    title: {
      fontFamily: fonts.regular,
      color: theme.white,
      fontSize: getScreenHeight(1.6),
    },
    column: {
      // flex: 1,
    },
    textInput: {
      borderWidth: getScreenHeight(0.1),
      borderColor: 'grey',
      height: getScreenHeight(5),
      width: getScreenHeight(3),
      borderRadius: getScreenHeight(0.5),
      justifyContent: 'center',
      alignItems: 'center',
      // backgroundColor:theme.blue

    },
    textContanier: {
      fontFamily: fonts.regular,
      fontSize: getScreenHeight(1.5),
    },
    modalScreen: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',


    },
    modalContanier: {
      backgroundColor: theme.white,
      height: getScreenHeight(25),
      width: getScreenWidth(100),
      // justifyContent: 'center',
      padding: getScreenHeight(2),
      borderRadius: getScreenHeight(2),
      // alignItems: 'center',
      marginTop: 'auto',


    },
    modalView: {
      flexDirection: 'row'
    },
    

  });

export default CartItem;
