import React, {useCallback, useContext, useMemo, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import fonts from '../constants/fonts';
import Toast from 'react-native-simple-toast';

import {authContext, themeContext} from '../contexts/context';
import {formatPrice, getScreenHeight, getScreenWidth} from '../utils/domUtil';
import Images from '../constants/images';
import {BASE_URL} from '../constants/api';

const DiscountOrderItem = (props: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const {cart_Data}: any = useContext(authContext);
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState(0);

  const quantityHandler = useCallback(
    (text: any) => {
      setQuantity(text.replace(/\D/g, ''));
      if (text.replace(/\D/g, '')) {
        setPrice(parseInt(text.replace(/\D/g, '')) * 250);
        props.priceHandler(
          2500,
          parseInt(text.replace(/\D/g, '')),
          props.item.Id,
        );
      } else {
        setPrice(0);
        props.deleteProduct(props.item.Id);
      }
    },
    [props],
  );

  return (
    <View style={styles.contanier}>
      {props.productIndex === props.index.toString() ? (
        <View style={styles.activitycontanier}>
          <ActivityIndicator size={'small'} color={theme.primary} />
        </View>
      ) : (
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
          style={styles.iconcontanier}>
          <FastImage
            resizeMode="contain"
            tintColor={theme.white}
            style={styles.icon}
            source={Images.newcart}
          />
        </TouchableOpacity>
      )}
      <View style={styles.imageContanier}>
        <FastImage
          resizeMode="contain"
          source={{
            uri: `${BASE_URL}${props?.item?.Item_Code__r?.Product_Picture__c}`,
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.middleContanier}>
        <Text style={styles.title}>
          Tyre Size: {props?.item?.Item_Code__r?.Tire_Size__c}
        </Text>
        <Text style={styles.title}>
          Tread Pattern: {props?.item?.Item_Code__r?.Tread_Pattern__c}
        </Text>
        <Text style={styles.subtitle}>
          <Text>Unit Price:</Text>{' '}
          <Text style={{color: theme.black}}>
            {formatPrice(props?.item?.Discounted_pricee__c)}{' '}
            <Text style={{textDecorationLine: 'line-through'}}>
              {formatPrice(props?.item?.MRP__c)}
            </Text>
            <Text style={{color: theme.primary_light}}>
              {' '}
              {props?.item?.Line_Discount__c}% off
            </Text>
          </Text>
        </Text>
        <Text style={styles.subtitle}>
          You Save {formatPrice(props?.item?.Saved_price1__c)}
        </Text>
        <Text style={styles.subtitle}>
          {props?.item?.Line_Discount__c}% off
        </Text>

        {/* <Text style={styles.subtitle}>
          Total Price + {props?.item?.GST_Group_Code_Y__c} GST:
        </Text> */}

        <Text style={styles.subtitle}>
          {props?.item?.Item_Code__r?.Name}/{props?.item?.Variant_code__r?.Name}
        </Text>
      </View>
      <View style={styles.fotter}>
        <View style={styles.textinput}>
          <TextInput
            onChangeText={quantityHandler}
            value={quantity}
            keyboardType="numeric"
            maxLength={2}
            style={styles.input}
          />
        </View>
        <Text style={[styles.subtitle, {marginTop: getScreenHeight(1)}]}>
          Enter Qty
        </Text>
      </View>
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
      width: getScreenWidth(4.5),
      height: getScreenWidth(4.5),
      borderRadius: getScreenWidth(4),
      backgroundColor: theme.primary,
      position: 'absolute',
      right: getScreenHeight(1),
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
      width: getScreenWidth(2),
      height: getScreenWidth(2),
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

export default DiscountOrderItem;
