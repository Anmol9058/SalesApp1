import React, {useCallback, useContext, useMemo} from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import CustomNewHeader from '../components/CustomNewHeader';
import CustomStatusBar from '../components/CustomStatusBar';
import Spacer from '../components/Spacer';
import fonts from '../constants/fonts';
import {themeContext} from '../contexts/context';
import {getScreenHeight} from '../utils/domUtil';

const PrivacyPolicy = ({navigation}: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <SafeAreaView edges={['top']} style={styles.screen}>
      <CustomStatusBar color={theme.black} light />
      <View style={styles.screen}>
        <CustomNewHeader
          action={() => navigation.goBack()}
          title="Product Policy"
        />
        <ScrollView style={styles.scroll}>
          <Text style={styles.subtitle}>
            Product, services and pricing – Orders will be executed at the
            price, discount and terms prevailing on the date of dispatch whether
            or not payment in part or in full has been made. Price, discount and
            terms are subject to change without notice and Company reserve its
            rights to decline or accept any order.
          </Text>
          <Spacer height={getScreenHeight(2)} />
          <Text style={styles.subtitle}>
            Every effort has been made by the Company to secure the highest
            possible standard of excellence of both material and workmanship and
            the Company takes no representation or guarantee/warranty whatsoever
            in respect of any products sold or supplied by the Company and all
            conditions and warranties whatsoever, whether statutory or otherwise
            are hereby expressly excluded. The Company shall not be liable for
            any consequential loss/injury/claim whatsoever arising out of the
            use of any product of the Company.
          </Text>
          <Spacer height={getScreenHeight(2)} />
          <Text style={styles.subtitle}>
            esale Cancellation, Shipping and Refund/Return policy Goods once
            sent according to order will not be taken back except by the
            consumer making special requests and arrangement with the Company
            and the purchaser has received the Company's written permission
            signed by a duly authorized official to return the goods. In such
            case buyer must prepaid the freight charges and other charges to the
            Company
          </Text>
          <Spacer height={getScreenHeight(2)} />
          <Text style={styles.subtitle}>
            E Commerce or business flow: NA Contact us page:
            https://www.SalesApp-india.com
          </Text>
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
      color: theme.white,
    },
    scroll: {
      paddingHorizontal: getScreenHeight(1),
    },
  });

export default PrivacyPolicy;
