import React, {useCallback, useContext, useMemo} from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import CustomNewHeader from '../components/CustomNewHeader';
import CustomStatusBar from '../components/CustomStatusBar';
import Spacer from '../components/Spacer';
import fonts from '../constants/fonts';
import {themeContext} from '../contexts/context';
import {getScreenHeight} from '../utils/domUtil';

const Terms = ({navigation}: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <SafeAreaView edges={['top']} style={styles.screen}>
      <CustomStatusBar color={theme.black} light />
      <View style={styles.screen}>
        <CustomNewHeader
          action={() => navigation.goBack()}
          title="Terms and conditions"
        />
        <ScrollView style={styles.scroll}>
          <Text style={styles.subtitle}>
            All orders booked by the Company are subject to these conditions of
            sale and all purchasers/buyers are deemed to have signified their
            acceptance to these conditions in addition to the other commercial
            policies of the Company while placing an order. It will be optional
            to the Company to cancel in whole or in part any order at any time
            even though the Company has accepted it. 3.Price, discount and terms
            are subject to change without notice and Company reserve its rights
            to decline or accept any order.
          </Text>
          <Spacer height={getScreenHeight(2)} />
          <Text style={styles.subtitle}>
            The Purchaser shall ensure to make payment against the Invoices
            within 30 days from the date of Invoice. The company reserves the
            Right to charge interest @ 18% Per annum (or such other rates of
            int. as may be determined by co. from time to time) in case of
            delayed payments.
          </Text>
          <Spacer height={getScreenHeight(2)} />
          <Text style={styles.subtitle}>
            The Purchaser shall be solely responsible for all compliances with
            respect to Goods and Service tax and the company shall not be
            responsible if any liability arises on the purchaser for any reason
            whatsoever. Orders will be executed at the price, discount and terms
            prevailing on the date of dispatch whether or not payment in part or
            in full has been made. Goods once sent according to order will not
            be taken back except by the consumer making special requests and
            arrangement with the Company and the purchaser has received the
            Company's written permission signed by a duly authorized official to
            return the goods. In such case buyer must prepaid the freight
            charges and other charges to the Company.
          </Text>
          <Spacer height={getScreenHeight(2)} />
          <Text style={styles.subtitle}>
            All levies of the central government/state government of local
            authority shall be payable extra by the purchaser. Where any
            declaration / form provided by the purchaser for the purpose of
            exemption of such levies is rejected by the concerned authority for
            any reason whatsoever, the purchaser shall be liable to pay all such
            levies along with consequential damages etc. Every efforts have been
            made by the Company to secure the highest possible standard of
            excellence of both material and workmanship and the Company takes no
            representation or guarantee/warranty whatsoever in respect of any
            products sold or supplied by the Company and all conditions and
            warranties whatsoever, whether statutory or otherwise are hereby
            expressly excluded. The Company shall not be liable for any
            consequential loss/injury/claim whatsoever arising out of the use of
            any product of the Company. Purchaser cannot extend scope of
            warranty incase of resale.
          </Text>
          <Spacer height={getScreenHeight(2)} />
          <Text style={styles.subtitle}>
            Without prejudice to the generality of Condition No. 6, Company
            reserves the right to consider claim brought to the Company in
            respect of a defective product as per the "Company limited warranty
            policy " of the Company at its absolute discretion. In all such
            cases the person returning the goods must prepay freight. Material
            should lie properly verified with the Invoice before accepting
            delivery from the transport carriers. All claims for goods lost or
            damaged or in transit must be made upon the carriers. The Company
            does not accept responsibility for goods after they have left the
            Company's premises Alleged defective goods submitted under claim
            will be received for examination as per the "Company limited
            warranty policy" of the Company and on the understanding that, if
            any, award/claim is passed should get acceptance within 21 days from
            the date of notification thereof. In the absence of such acceptance
            Company reserve its right to withdraw the award and to
            destroy/return the said goods at the cost of the claimant.
          </Text>
          <Spacer height={getScreenHeight(2)} />
          <Text style={styles.subtitle}>
            The Company neither assume nor accepts any legal responsibility from
            any damages to persons or property, which may arise from failure of
            any of its products. In the event of purchaser failing to take
            delivery of goods ordered by them, the Company may in addition to
            its other legal remedies recall or deal with the goods at its
            absolute discretion. In such cases purchasers will be liable to
            reimburse the Company all charges, costs and expenses incurred in
            dispatching and reselling the goods including actual
            Bank/VPP/Freight, handling and demurrage charges. Company's
            statement of claim will be final and binding on purchasers.
          </Text>
          <Spacer height={getScreenHeight(2)} />
          <Text style={styles.subtitle}>
            No arrangement or contract is binding on the Company unless in
            writing and signed by duly authorized officer of the Company.
          </Text>
          <Spacer height={getScreenHeight(2)} />
          <Text style={styles.subtitle}>
            The Company will, make every reasonable effort to effect prompt
            delivery of the goods, however, it shall not be liable for any delay
            in delivery due to unforeseen circumstances or the circumstances
            beyond its control. The purchaser undertakes not to trade the goods
            sold under this invoice without the written permission of the
            Company except when fitted to vehicles or machines. All dispute
            arising out of, or in connection with this invoice shall, fall
            within the Jurisdiction of the Courts at Delhi ONLY to the exclusion
            of all other Courts.
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

export default Terms;
