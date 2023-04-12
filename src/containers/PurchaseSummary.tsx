import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import useApi from '../hooks/useApi';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useQuery} from 'react-query';
import SimpleToast from 'react-native-simple-toast';
import FastImage from 'react-native-fast-image';

import CustomStatusBar from '../components/CustomStatusBar';
import Header from '../components/Header';
import {getScreenHeight} from '../utils/domUtil';
import fonts from '../constants/fonts';
import PurchaseSummaryItem from '../components/PurchaseSummaryItem';
import CustomNewHeader from '../components/CustomNewHeader';
import {getInvoice, getPurchaseSummary} from '../api/home';
import {authContext, themeContext} from '../contexts/context';
import CustomPressable from '../components/CustomPressable';
import Spacer from '../components/Spacer';
import ArrowButton from '../components/ArrowButton';
import NotFound from '../components/NotFound';
import {createPdf} from '../utils/createPdf';

const PurchaseSummary = ({navigation}: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const {apiCall} = useApi();
  const {user_id, user_data}: any = useContext(authContext);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisible1, setDatePickerVisibility1] = useState(false);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [invoiceData, setInvoiceData]: any = useState(null);

  const getInvoiceManager = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getPurchaseSummary(apiCall, user_id, fromDate, toDate);

      if (res) {
        console.log(res.records.length);
        setInvoiceData(res.records);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [user_id, apiCall, fromDate, toDate]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const showDatePicker1 = () => {
    setDatePickerVisibility1(true);
  };

  const hideDatePicker1 = () => {
    setDatePickerVisibility1(false);
  };

  const dateReadableFormatWithHyphen = (timestamp: any) => {
    let dateObj = timestamp ? new Date(timestamp) : new Date();
    let date = dateObj.getDate();
    let month = dateObj.getMonth() + 1;
    let year = dateObj.getFullYear();
    let date1 = date < 10 ? '0' + date : date;
    let month1 = month < 10 ? '0' + month : month;
    return `${year}-${month1}-${date1}`;
  };

  const handleConfirm = (date: any) => {
    setFromDate(dateReadableFormatWithHyphen(date));
    hideDatePicker();
  };
  const handleConfirm1 = (date: any) => {
    setToDate(dateReadableFormatWithHyphen(date));
    hideDatePicker1();
  };

  const onCheck = () => {
    if (!fromDate) {
      SimpleToast.show('Select From Date');
    } else if (!toDate) {
      SimpleToast.show('Select To Date');
    } else {
      getInvoiceManager();
    }
  };

  const renderItem = ({item}: any) => {
    return (
      <View style={styles.item}>
        <PurchaseSummaryItem
          data={item}
          action={() => navigation.navigate('InvoiceDetail', {item: item})}
        />
      </View>
    );
  };

  return (
    <>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        maximumDate={new Date()}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible1}
        mode="date"
        onConfirm={handleConfirm1}
        onCancel={hideDatePicker1}
        maximumDate={new Date()}
      />
      <SafeAreaView edges={['top']} style={styles.safe}>
        <CustomStatusBar color={theme.black} light />
        <View style={styles.screen}>
          <CustomNewHeader
            subtitle={
              user_data?.Customer_No__c ? user_data?.Customer_No__c : ''
            }
            action={() => navigation.goBack()}
            title={user_data?.Name ? user_data?.Name : ''}
          />
          <LinearGradient
            colors={[theme.lightGrey, theme.lightGrey]}
            style={styles.linearGradient}>
            <View style={styles.header}>
              <Header title="Purchase Summary" hide dark />
            </View>

            <View>
              <View
                style={[
                  styles.row,
                  {
                    marginVertical: getScreenHeight(2),
                    paddingHorizontal: getScreenHeight(2),
                  },
                ]}>
                <View style={styles.press}>
                  {/* <Text>{fromDate}</Text> */}
                  <CustomPressable
                    title="From Date"
                    // title='From Date'
                    value={fromDate}
                    black
                    marginRight={getScreenHeight(1)}
                    align
                    action={showDatePicker}
                    leftIcon={
                      <FastImage
                        resizeMode="contain"
                        tintColor={theme.primary}
                        style={styles.icon}
                        source={require('../assets/images/common/calendar.png')}
                      />
                    }
                  />
                </View>
                <View style={styles.press}>
                  <CustomPressable
                    title="To Date"
                    value={toDate}
                    black
                    marginRight={getScreenHeight(1)}
                    align
                    action={showDatePicker1}
                    leftIcon={
                      <FastImage
                        resizeMode="contain"
                        tintColor={theme.primary}
                        style={styles.icon}
                        source={require('../assets/images/common/calendar.png')}
                      />
                    }
                  />
                </View>
              </View>
              <Spacer height={getScreenHeight(4)} />

              <View style={{paddingHorizontal: getScreenHeight(2)}}>
                <ArrowButton
                  loading={loading}
                  title="Proceed"
                  action={onCheck}
                />
              </View>
            </View>
            <Spacer height={getScreenHeight(2)} />
            <View style={{flex: 1}}>
              <FlatList
                keyExtractor={(item, index) => index.toString()}
                data={invoiceData}
                renderItem={renderItem}
                contentContainerStyle={styles.flatlist}
                ListEmptyComponent={invoiceData?.length ? null : NotFound}
              />
            </View>
          </LinearGradient>
        </View>
      </SafeAreaView>
    </>
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
    linearGradient: {
      flex: 1,
    },
    header: {
      padding: getScreenHeight(2),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    flatlist: {
      paddingHorizontal: getScreenHeight(2),
    },
    item: {
      marginBottom: getScreenHeight(2),
    },
    date: {
      fontFamily: fonts.regular,
      fontSize: getScreenHeight(1.2),
      color: theme.white,
    },
    icon: {
      width: getScreenHeight(2),
      height: getScreenHeight(2),
      marginTop: getScreenHeight(0.5),
    },
    rightheader: {
      alignItems: 'flex-end',
    },
    fotter: {
      padding: getScreenHeight(2),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: theme.textinput,
    },
    title: {
      fontFamily: fonts.regular,
      color: theme.white,
      fontSize: getScreenHeight(1.5),
    },
    footerItem: {
      alignItems: 'center',
    },
    press: {
      width: '35%',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      flex: 1,
    },
  });

export default PurchaseSummary;
