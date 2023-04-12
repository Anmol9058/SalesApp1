import React, {useContext, useMemo} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import moment from 'moment';

import {authContext, themeContext} from '../contexts/context';
import CustomStatusBar from '../components/CustomStatusBar';
import {getScreenHeight} from '../utils/domUtil';
import fonts from '../constants/fonts';
import CustomNewHeader from '../components/CustomNewHeader';
import Header from '../components/Header';

const WarrantyDetail = (props: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const data = props.route.params.item;
  const {user_data}: any = useContext(authContext);

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <CustomStatusBar color={theme.black} light />
      <View style={styles.screen}>
        <CustomNewHeader
          subtitle={user_data?.Customer_No__c ? user_data?.Customer_No__c : ''}
          action={() => props.navigation.goBack()}
          title={user_data?.Name ? user_data?.Name : ''}
        />
        <View style={styles.contanier}>
          <Header dark title={'Warranty Detail'} hide />

          <View style={styles.item}>
            <View style={styles.row}>
              <Text style={styles.title}>Date :</Text>
              <Text style={styles.value}>
                {moment(data.CreatedDate).format('DD-MM-YYYY')}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.title}>Warranty Registration No:</Text>
              <Text style={styles.value}>{data.Name}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.title}>No of Tyres:</Text>
              <Text style={styles.value}>
                {data.NO_Of_Tyres__c ? data.NO_Of_Tyres__c : '0'}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.title}>Tyre Pattern:</Text>
              <Text style={styles.value}>
                {data.Pattern__c ? data.Pattern__c : 'NA'}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.title}>Tyre Size:</Text>
              <Text style={styles.value}>
                {data?.Size__c ? data?.Size__c : 'NA'}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.title}>Article No:</Text>
              <Text style={styles.value}>
                {data.Article__r ? data.Article__r.Name : 'NA'}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.title}>Type of Registration:</Text>
              <Text style={styles.value}>
                {data.Types_of_Registration__c
                  ? data.Types_of_Registration__c
                  : 'NA'}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.title}>Invoice No:</Text>
              <Text style={styles.value}>
                {data.Invoice_No__c ? data.Invoice_No__c : 'NA'}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.title}>Invoice Date:</Text>
              <Text style={styles.value}>
                {data.Invoice_Date__c ? data.Invoice_Date__c : 'NA'}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.white,
    },
    safe: {
      flex: 1,
      backgroundColor: theme.black,
    },
    linearGradient: {
      flex: 1,
    },
    flatlist: {
      paddingHorizontal: getScreenHeight(2),
    },
    contanier: {
      paddingHorizontal: getScreenHeight(2),
      backgroundColor: theme.white,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: getScreenHeight(0.5),
    },
    title: {
      fontFamily: fonts.bold,
      fontSize: getScreenHeight(1.6),
      color: theme.black,
      width: '40%',
    },
    value: {
      fontFamily: fonts.bold,
      fontSize: getScreenHeight(1.6),
      color: theme.primary,
      flex: 1,
      marginLeft: getScreenHeight(2),
    },
    item: {
      padding: getScreenHeight(2),
      backgroundColor: theme.lightGrey,
      borderRadius: getScreenHeight(1),
      marginTop: getScreenHeight(2),
      width: '100%',
    },
  });

export default WarrantyDetail;
