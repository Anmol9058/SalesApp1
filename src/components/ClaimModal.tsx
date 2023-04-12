import React, {useContext, useMemo} from 'react';
import {Modal, StyleSheet, Pressable, View, Text} from 'react-native';

import {getScreenHeight, getScreenWidth} from '../utils/domUtil';
import fonts from '../constants/fonts';
import {themeContext} from '../contexts/context';
import CustomStatusBar from './CustomStatusBar';
import FastImage from 'react-native-fast-image';
import Spacer from './Spacer';

const ClaimModal = (props: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <>
      <CustomStatusBar />
      <Modal
        visible={props.visible}
        animationType="fade"
        transparent={true}
        {...props}>
        <Pressable onPress={props.pressHandler} style={styles.modalScreen}>
          <View style={styles.modalContanier}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                padding: getScreenHeight(2),
              }}>
              <FastImage
                resizeMode="contain"
                style={{
                  height: getScreenHeight(10),
                  width: getScreenHeight(10),
                  alignSelf: 'center',
                }}
                source={require('../assets/images/greentick.png')}
              />
              <Spacer />
              <Text
                style={{
                  fontFamily: fonts.bold,
                  fontSize: getScreenHeight(2.5),
                  alignSelf: 'center',
                }}>
                Thank You
              </Text>
              <Spacer height={getScreenHeight(2)} />
              <Text style={{color: theme.black, fontFamily: fonts.bold}}>
                Percentage Wear:{' '}
                <Text style={{fontFamily: fonts.regular}}>
                  {props.data?.records[0]?.Wear__c}%
                </Text>
              </Text>
              <Spacer />

              <Text style={{color: theme.black, fontFamily: fonts.bold}}>
                Chargeable Amount:{' '}
                <Text style={{fontFamily: fonts.regular}}>
                  INR {props.data?.records[0]?.Discount_Price_with_GST__c}{' '}
                  (Inclusive all taxes)
                </Text>
              </Text>
              <Spacer />

              <Text style={{color: theme.black, fontFamily: fonts.bold}}>
                T&C:{' '}
                <Text style={{fontFamily: fonts.regular}}>
                  The above-mentioned amount and percentage wear is
                  provisional,based on the primary information filled in at the
                  point of sales.The final amount shall be calculated upon
                  review by SalesApp India representative as per SalesApp India
                  warranty policy.
                </Text>
              </Text>
            </View>
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    modalScreen: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContanier: {
      backgroundColor: theme.white,
      height: getScreenHeight(100),
      width: getScreenWidth(100),
      justifyContent: 'center',
      padding: getScreenHeight(2),
      // borderRadius: getScreenHeight(2),
      alignItems: 'center',
    },
    title: {
      fontFamily: fonts.bold,
      color: theme.primary,
      fontSize: getScreenHeight(2.5),
    },
    subtitle: {
      fontFamily: fonts.bold,
      color: theme.accent,
      fontSize: getScreenHeight(2),
      textAlign: 'center',
      marginTop: getScreenHeight(2),
    },
    circle: {
      width: getScreenWidth(10),
      height: getScreenWidth(10),
      backgroundColor: theme.primary,
      borderRadius: getScreenWidth(10),
      position: 'absolute',
      zIndex: 1000,
      top: getScreenHeight(1),
      justifyContent: 'center',
      alignItems: 'center',
    },
    icon: {
      height: getScreenHeight(2),
      width: getScreenHeight(2),
    },
  });

export default ClaimModal;
