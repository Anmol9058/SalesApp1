import React, { useCallback, useContext, useMemo, useState,useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Pressable, Modal
} from 'react-native';
import FastImage from 'react-native-fast-image';
import fonts from '../constants/fonts';
import Toast from 'react-native-simple-toast';
// import {formatPrice, getScreenHeight,dateReadableFormatWithHyphen} from '../utils/domUtil';
import { authContext, themeContext } from '../contexts/context';
import { getScreenHeight, formatPrice, getScreenWidth } from '../utils/domUtil';
import Images from '../constants/images';
import { BASE_URL } from '../constants/api';
import ClaimModal from './ClaimModal';
import ImageModal from './ImageModal';
import { goBack, navigate } from "../services/Routerservices";

const PlaceOrderItem = (props: any) => {
  const { theme } = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { cart_Data }: any = useContext(authContext);
  const [quantity, setQuantity] = useState('');
  const [openModal, setOpenModal] = useState('false');

  useEffect(() => {
    setQuantity('');
  }, []);

  const quantityHandler = useCallback(
    (text: any) => {
      setQuantity(text.replace(/\D/g, ''));
      if (text.replace(/\D/g, '')) {
        props.priceHandler(
          props?.item?.Price_Lists__r?.records[0]?.Unit_Price__c
            ? props?.item?.Price_Lists__r?.records[0]?.Unit_Price__c
            : 0,
          parseInt(text.replace(/\D/g, '')),
          props.item.Id,
        );
      } else {
        props.deleteProduct(props.item.Id);
      }
    },
    [props],
  );

  return (
    <View style={styles.contanier}>
{props.item.schemes_exist__c?
      <TouchableOpacity

        onPress={() => {
          if (quantity) { navigate('ApplyOfferScreen', { detail: props.item ,totalquantity:quantity}) }
          else {
            Toast.show('Please enter some quantity');
          }
        }}
        style={styles.iconcontanier1}
      >
        <FastImage
          resizeMode="contain"
          tintColor={theme.white}
          style={styles.icon}
          source={Images.OffersMYK}
        />

      </TouchableOpacity>
      :[]
}

      <TouchableOpacity
        onPress={() => {
          if (quantity) {
            props.action(
              {
                quantity: quantity,
                data: props.item,
                index: props.index,
              },
              cart_Data,
            );
            setQuantity('');
          } else {
            Toast.show('Please enter some quantity');
          }
        }}
        style={styles.iconcontanier}
      >
        <FastImage
          resizeMode="contain"
          tintColor={theme.white}
          style={styles.icon}
          source={Images.newcart}
        />

      </TouchableOpacity>



      <TouchableOpacity style={styles.imageContanier} onPress={() => setOpenModal('true')}>
        <FastImage
          resizeMode="contain"
          source={require("../assets/images/Myk_Product.webp")}
          style={styles.image}
        />
      </TouchableOpacity>
      {/* {console.log('closeModal',props.item)} */}
      <View style={styles.middleContanier}>

        <Text >
          <Text style={styles.title}>Product Name: </Text>
          <Text style={styles.title}>
            {props.item && props.item.name ? props.item.name : 'NA'}
          </Text>
        </Text>

        <Text >
          <Text style={styles.title}>
            Product Code : </Text >
          <Text style={styles.title}>{props.item.material_code__c}</Text>
        </Text>
        {/* material_code__c */}
        {/* <Text style={styles.title}>UOM - LOB</Text> */}
        <Text style={styles.title}>
          <Text>UOM:</Text>
          <Text style={{ color: theme.black }}>
            {props.item && props.item.secondary_sale_uom__c ? props.item.secondary_sale_uom__c : 'NA'}
          </Text>
        </Text>
        <Text style={styles.title}>
          <Text>Net Weight:</Text>
          <Text style={{ color: theme.black }}>
            {props.item && props.item.net_weight__c ? props.item.net_weight__c : 'NA'}
          </Text>
        </Text>


        <Text style={styles.subtitle}>
          <Text>Unit Price:</Text>{' '}
          <Text style={{ color: theme.black }}>
            {props.item && props.item.mop__c ? formatPrice(props.item.mop__c) : 'NA'}
          </Text>
        </Text>


        {/* <Text style={styles.subtitle}>
          Total Price + {props?.item?.GST_Group_Code_Y__c} GST:
        </Text> */}

        <Text style={styles.subtitle}>{props.item.Name}</Text>
      </View>
      <View style={styles.fotter}>
        <View style={styles.textinput}>
          <TextInput
            onChangeText={quantityHandler}
            value={quantity}
            keyboardType="numeric"
            // maxLength={3}
            style={styles.input}
          />
        </View>
        <Text style={[styles.subtitle, { marginTop: getScreenHeight(1) }]}>
          Enter Qty
        </Text>
      </View>
      {/* <ClaimModal/> */}
      {/* {console.log('openModal2',openModal)} */}

      {openModal == "true" ? <Modal
        visible={props.visible}
        animationType="fade"
        transparent={true}
      >

        <Pressable style={styles.modalScreen} onPress={() => setOpenModal('false')}>
          <View style={styles.modalContanier} >
            <FastImage
              source={require("../assets/images/Myk_Product.webp")}
              style={styles.profileImage}
            />
          </View>

          <View>
          </View>
        </Pressable>
      </Modal> : []}

    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    contanier: {
      padding: getScreenHeight(1),
      backgroundColor: theme.white,
      borderRadius: getScreenHeight(2),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    profileImage: {
      height: getScreenHeight(30),
      width: getScreenHeight(30),
      borderRadius: getScreenHeight(5),
      borderColor: theme.primary_light,
      borderWidth: getScreenHeight(0.2),
    },
    image2: {
      marginTop: getScreenHeight(20),
      // marginRight: getScreenHeight(60),
      height: getScreenHeight(5),
      width: getScreenHeight(12),
    },
    modalScreen: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',


    },
    modalContanier: {
      backgroundColor: theme.white,
      height: getScreenHeight(45),
      width: getScreenWidth(75),
      justifyContent: 'center',
      padding: getScreenHeight(2),
      borderRadius: getScreenHeight(2),
      alignItems: 'center',
    },
    image: {
      height: getScreenHeight(12),
      width: getScreenHeight(12),
    },
    imageContanier: {
      height: getScreenHeight(12),
      width: getScreenWidth(20),
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: getScreenHeight(1.5),
      fontFamily: fonts.regular,
      color: theme.black,
    },
    middleContanier: {
      flex: 1,
      marginLeft: getScreenWidth(2),
    },
    subtitle: {
      color: '#6F7EA8',
      fontSize: getScreenHeight(1.2),
      fontFamily: fonts.regular,
    },
    fotter: {
      width: getScreenWidth(15),
      height: getScreenHeight(12),
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    textinput: {
      height: getScreenWidth(10),
      backgroundColor: '#D9D9D9',
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconcontanier: {
      width: getScreenWidth(6.5),
      height: getScreenWidth(7.5),
      borderRadius: getScreenWidth(4),
      backgroundColor: theme.primary,
      position: 'absolute',
      right: getScreenHeight(1),
      top: getScreenHeight(1),
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    iconcontanier1: {
      width: getScreenWidth(6.5),
      height: getScreenWidth(7.5),
      borderRadius: getScreenWidth(4),
      backgroundColor: theme.primary,
      position: 'absolute',
      right: getScreenHeight(5),
      top: getScreenHeight(1),
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    activitycontanier: {
      position: 'absolute',
      right: getScreenHeight(1),
      top: getScreenHeight(1),
      zIndex: 1000,
    },
    icon: {
      width: getScreenWidth(5),
      height: getScreenWidth(4),
    },
    input: {
      fontSize: getScreenHeight(1.5),
      fontFamily: fonts.regular,
      color: theme.black,
      flex: 1,
      width: getScreenWidth(10),
      textAlign: 'center',
      // height: getScreenWidth(8),
      // width: getScreenWidth(8),
    },
  });

export default PlaceOrderItem;
