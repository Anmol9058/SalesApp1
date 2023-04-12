import axios from 'axios';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Platform,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useQuery} from 'react-query';
import {getSecurityDeposit} from '../api/home';
import {useFocusEffect} from '@react-navigation/native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFetchBlob from 'rn-fetch-blob';

import CustomNewHeader from '../components/CustomNewHeader';
import CustomStatusBar from '../components/CustomStatusBar';
import FullScreenLoader from '../components/FullScreenLoader';
import Header from '../components/Header';
import NotFound from '../components/NotFound';
import SecurityItem from '../components/SecurityItem';
import {authContext, themeContext} from '../contexts/context';
import useApi from '../hooks/useApi';
import {getScreenHeight, getScreenWidth} from '../utils/domUtil';
import Spacer from '../components/Spacer';
import fonts from '../constants/fonts';

const SecurityDeposit = ({navigation}: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const {apiCall} = useApi();
  const {user_data, setPdfLoading}: any = useContext(authContext);
  const [htmlContent, setHtmlContent] = useState('');
  const [options, setOptions] = useState('');

  const securityDepositManager = useCallback(async () => {
    const res = await getSecurityDeposit(apiCall, user_data?.Id);
    return res;
  }, [apiCall, user_data?.Id]);

  const {
    data: securityData,
    isFetching,
    refetch,
  } = useQuery('getSecurityDeposit', securityDepositManager, {
    retry: 0,
    enabled: false,
    onSuccess(data) {
      //     console.log(data?.length);
      //     let content = `<apex:repeat value="{!Deposit}" var="dep" id="theRepeat">
      //     <tr>
      //         <td>{!dep.posting_daat}</td>
      //         <td>{!dep.Customer_No__r.Name}</td>
      //         <td>{!dep.Opening__c}</td>
      //         <td>{!dep.Debit_Amount__c}</td>
      //         <td>{!dep.Credit_Amount__c}</td>
      //         <td>{!dep.Amount__c}</td>
      //         <td>{!dep.Balance__c}</td>
      //     </tr>
      // </apex:repeat>`;
      //   for (let i = 1; i <= data.length; i++) {}
    },
  });

  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, []),
  );

  useEffect(() => {
    let content = `
    <apex:page standardController="SD_Ledger__c" extensions="SecurityDepositPDFController" renderAs="PDF">
    <head>
        <style type="text/css">
            @page {
            border: 1px;}
           
        </style>
    </head>
   
    <body style=" border: 1px solid black ; padding:1px,1px,1px,1px">
        <div>
            <center>
                <img src="{!$Resource.SalesApp_logo}" width="30%" height="15%"/><br/>
                <p><b>SalesApp INDIA PRIVATE LIMITED</b></p>
                <p style="font-size:12px">
                    <b>
                        <span>Plot No.1, Sector 4B Bahadurgarh Industrial Estate HSIIDC Bahadurgarh,Dist</span><br/>
                        <span>Jhajjar, Haryana-124507</span><br/>
                        <span>BAHADURGARH-124507</span>
                    </b>
                </p>
            </center>
            <p style="text-align:right;font-size:12px">
                <apex:outputText value="{0, date, MMMM d','  yyyy}">
                    <apex:param value="{!TodayDate}" />
                </apex:outputText>
            </p>
        </div>
        <center><b>Security Deposit Statement</b></center>
       
        <div style="text-align:left; font-size:12px">
            <span><b>${user_data.Bank_Account_Number_c__c}</b></span><br/>
            <span>${user_data.Name}</span><br/>
            <span>${user_data.Address_line_1__c}</span><br/>
            <p>From: <apex:outputText value="{0, date, MMMM d','  yyyy}">
                <apex:param value="{!startdate}" />
                </apex:outputText> -
                To: <apex:outputText value="{0, date, MMMM d','  yyyy}">
                <apex:param value="{!enddate}" />
                </apex:outputText>
            </p>
        </div>
       
        <br/>
       
        <div>
            <table border="1" width="100%" cellpadding="0" cellspacing="0" style="font-size:12px">
                <thead>
                    <tr>
                        <th>Posting Date</th>
                        <th>Name</th>
                        <th>Opening</th>
                        <th>Debit Amt</th>
                        <th>Credit Amt</th>
                        <th>Amount</th>
                        <th>Balance</th>
                    </tr>
                </thead>
                <tbody>
                    ${htmlContent}
                </tbody>
            </table>
        </div>
       
    </body>
</apex:page>`;
    setOptions(content);
  }, [htmlContent]);

  const createPdf = async (content: any) => {
    setPdfLoading(true);
    try {
      let options = {
        html: content,
        fileName: 'Customer Ledger',
        directory: 'Downloads',
        base64: true,
        height: 1024,
        width: 1024,
        bgColor: '#ffffff',
      };
      let file = await RNHTMLtoPDF.convert(options);
      console.log(file);
      if (Platform.OS === 'android') {
        const android = RNFetchBlob.android;
        android.actionViewIntent(file.filePath, 'application/pdf');
      } else {
        RNFetchBlob.ios.openDocument(file.filePath);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPdfLoading(false);
    }
  };

  const renderKey = (item: any, index: any) => index.toString();

  const renderItem = ({item}: any) => {
    return (
      <View style={styles.item}>
        <SecurityItem item={item} />
      </View>
    );
  };

  if (isFetching) {
    return <FullScreenLoader />;
  }

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <CustomStatusBar color={theme.black} light />
      <View style={{...styles.screen, position: 'relative'}}>
        <CustomNewHeader
          subtitle={user_data?.Customer_No__c ? user_data?.Customer_No__c : ''}
          action={() => navigation.goBack()}
          title={user_data?.Name ? user_data?.Name : ''}
        />
        <FlatList
          ListHeaderComponent={() => (
            <>
              <Header title="Security Deposit" hide dark />
              {/* <TouchableOpacity
                onPress={() => {
                  createPdf(options);
                }}
                style={styles.buttonContanier}>
                <Text style={styles.buttonText}>Download</Text>
              </TouchableOpacity> */}
            </>
          )}
          data={securityData}
          keyExtractor={renderKey}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          ListEmptyComponent={NotFound}
          ListFooterComponent={Spacer}
        />

        <TouchableOpacity
          onPress={() => navigation.navigate('SelectSdModel')}
          style={styles.customButton}>
          <FastImage
            source={require('../assets/images/common/plus.png')}
            style={styles.icon}
            resizeMode="contain"
            tintColor={theme.white}
          />
          <Text
            style={[
              styles.title,
              {fontSize: getScreenHeight(1.5), color: theme.white},
            ]}>
            Add New
          </Text>
        </TouchableOpacity>
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
    list: {
      paddingHorizontal: getScreenHeight(2),
    },
    item: {
      marginTop: getScreenHeight(2),
    },
    title: {
      fontFamily: fonts.bold,
      color: theme.black,
      fontSize: getScreenHeight(2),
    },
    customButton: {
      alignSelf: 'flex-end',
      backgroundColor: theme.primary,
      padding: getScreenHeight(1),
      borderRadius: getScreenHeight(2),
      flexDirection: 'row',
      position: 'absolute',
      bottom: getScreenHeight(5),
      left: getScreenWidth(68),
      alignItems: 'center',
    },
    icon: {
      height: getScreenHeight(2.5),
      width: getScreenHeight(2.5),
      marginRight: getScreenHeight(1),
    },
    buttonContanier: {
      paddingHorizontal: getScreenHeight(2),
      paddingVertical: getScreenHeight(0.5),
      backgroundColor: theme.white,
      width: '30%',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: getScreenHeight(0.5),
      alignSelf: 'flex-end',
      marginVertical: getScreenHeight(2),
    },
    buttonText: {
      fontFamily: fonts.regular,
      fontSize: getScreenHeight(1.8),
      color: theme.primary,
    },
  });

export default SecurityDeposit;
