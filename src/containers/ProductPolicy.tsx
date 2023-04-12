import React, {useCallback, useContext, useMemo} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import CustomNewHeader from '../components/CustomNewHeader';
import CustomStatusBar from '../components/CustomStatusBar';
import Header from '../components/Header';
import Spacer from '../components/Spacer';
import fonts from '../constants/fonts';
import {authContext, themeContext} from '../contexts/context';
import {getScreenHeight} from '../utils/domUtil';

const ProductPolicy = ({navigation}: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const {user_data}: any = useContext(authContext);

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <CustomStatusBar color={theme.black} light />
      <View style={styles.screen}>
        <CustomNewHeader
          subtitle={user_data?.Customer_No__c ? user_data?.Customer_No__c : ''}
          action={() => navigation.goBack()}
          title={user_data?.Name ? user_data?.Name : ''}
        />

        <ScrollView style={styles.scroll}>
          <Header dark title="Product Policy" />
          <Spacer height={getScreenHeight(2)} />

          <Text style={styles.title}>Product, services and pricing </Text>
          <Spacer height={getScreenHeight(2)} />

          <Text style={styles.subtitle}>
            Orders will be executed at the price, discount, and terms prevailing
            on the date of dispatch, whether payment has been made in part or in
            full. Price, discount, and terms are subject to change without
            notice and the Company reserve its rights to decline or accept every
            effort that has been made by the Company to secure the highest
            possible standard of excellence in both material and workmanship and
            the Company takes no representation or guarantee/warranty whatsoever
            in respect of any products sold or supplied by the Company and all
            conditions and warranties whatsoever, whether statutory or otherwise
            are hereby expressly excluded. The Company shall not be liable for
            any consequential loss/injury/claim whatsoever arising out of the
            use of any product of the Company. The purchaser cannot extend the
            scope of warranty in case of resale
          </Text>

          <Spacer height={getScreenHeight(2)} />
          <Text style={styles.title}>
            Cancellation, Shipping, and Refund/Return policy{' '}
          </Text>
          <Spacer height={getScreenHeight(2)} />

          <Text style={styles.subtitle}>
            Goods once sent according to order will not be taken back except by
            the consumer making special requests and arrangements with the
            Company and the purchaser has received the Company's written
            permission signed by a duly authorized official to return the goods.
            In such a case buyer must prepay the freight charges and other
            charges to the Company.
          </Text>
          <Spacer height={getScreenHeight(2)} />
          <View style={styles.row}>
            <View style={styles.dot} />
            <Text style={styles.subtitle}>E Commerce or business flow: NA</Text>
          </View>
          <Spacer />
          <TouchableOpacity
            onPress={() => Linking.openURL('https://www.SalesApp-india.com')}
            style={styles.row}>
            <View style={styles.dot} />
            <Text style={styles.subtitle}>
              Contact us page:{' '}
              <Text style={{color: 'blue'}}>
                https://www.SalesApp-india.com
              </Text>
            </Text>
          </TouchableOpacity>
          <Spacer height={getScreenHeight(2)} />
        </ScrollView>
      </View>
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
    header: {
      padding: getScreenHeight(2),
    },
    list: {
      paddingHorizontal: getScreenHeight(2),
    },
    item: {
      marginTop: getScreenHeight(2),
    },
    subtitle: {
      fontSize: getScreenHeight(1.6),
      fontFamily: fonts.regular,
      color: theme.black,
    },
    title: {
      fontSize: getScreenHeight(1.8),
      fontFamily: fonts.semiBold,
      color: theme.black,
    },
    scroll: {
      paddingHorizontal: getScreenHeight(1),
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    dot: {
      height: getScreenHeight(1.5),
      width: getScreenHeight(1.5),
      backgroundColor: theme.light_accent,
      borderRadius: getScreenHeight(2),
      marginRight: getScreenHeight(1),
    },
  });

export default ProductPolicy;
