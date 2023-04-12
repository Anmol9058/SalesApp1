import React, {useCallback, useContext, useMemo, useState} from 'react';
import {View, StyleSheet, ScrollView, FlatList} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SafeAreaView} from 'react-native-safe-area-context';
import ArrowButton from '../components/ArrowButton';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import CustomNewHeader from '../components/CustomNewHeader';
import CustomPressable from '../components/CustomPressable';
import CustomStatusBar from '../components/CustomStatusBar';
import Header from '../components/Header';
import fonts from '../constants/fonts';
import {authContext, themeContext} from '../contexts/context';
import {getScreenHeight} from '../utils/domUtil';
import useApi from '../hooks/useApi';
import SimpleToast from 'react-native-simple-toast';
import {getCreditDebit} from '../api/home';
import CreditDebitItem from '../components/CreditDebitItem';
import NotFound from '../components/NotFound';

const CredDebtReport = ({navigation}: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const {apiCall} = useApi();
  const {user_data}: any = useContext(authContext);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisible1, setDatePickerVisibility1] = useState(false);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState(null);

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
      getCreditDebitManager();
    }
  };

  const getCreditDebitManager = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getCreditDebit(
        apiCall,
        fromDate,
        toDate,
        user_data?.Id,
      );
      if (res.done) {
        if (res.records.length === 0) {
          setRecords([]);
          return SimpleToast.show('No data Found');
        }
        setRecords(res.records);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [fromDate, toDate, user_data?.Id, loading]);

  const renderItem = ({item}: any) => {
    return (
      <View style={styles.item}>
        <CreditDebitItem
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

          {/* <View style={styles.header}>
          <Text style={styles.title}>PSR</Text>
          <Text style={[styles.subtitle, {width: '70%'}]}>
            Ageing last refreshed at 12/02/2022 10:30 amNext update in 2 Hours
          </Text>
        </View> */}
          <ScrollView contentContainerStyle={styles.list}>
            <Header title="Credit/Debit Note" hide dark />
            {/* <Text
              style={[styles.subtitle1, {marginVertical: getScreenHeight(1)}]}>
              To Receive Credit/Debit Notes on your Registered email id, Please
              Select Date and Press Submit
            </Text> */}

            <View style={[styles.row, {marginVertical: getScreenHeight(2)}]}>
              <View style={styles.press}>
                <CustomPressable
                  title="From Date"
                  marginRight={getScreenHeight(1)}
                  value={fromDate}
                  align
                  black
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
                  marginRight={getScreenHeight(1)}
                  align
                  black
                  value={toDate}
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

            <View style={styles.customButton}>
              <ArrowButton loading={loading} action={onCheck} title="Proceed" />
            </View>

            <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={records}
              renderItem={renderItem}
              contentContainerStyle={styles.flatlist}
              ListEmptyComponent={records ? (loading ? null : NotFound) : null}
            />
          </ScrollView>
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
      backgroundColor: 'black',
    },
    safe: {
      flex: 1,
      backgroundColor: theme.black,
    },
    header: {
      backgroundColor: '#4D4D4D',
      padding: getScreenHeight(2),
      marginVertical: getScreenHeight(2),
    },
    list: {
      paddingHorizontal: getScreenHeight(2),
    },
    title: {
      fontFamily: fonts.bold,
      fontSize: getScreenHeight(2),
      color: theme.white,
    },
    subtitle: {
      fontFamily: fonts.regular,
      fontSize: getScreenHeight(1.4),
      color: theme.black,
    },
    subtitle1: {
      fontFamily: fonts.regular,
      fontSize: getScreenHeight(1.4),
      color: theme.black,
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
    icon: {
      width: getScreenHeight(2),
      height: getScreenHeight(2),
    },
    customButton: {
      marginTop: getScreenHeight(4),
    },
    item: {
      marginTop: getScreenHeight(2),
    },
    flatlist: {
      // paddingHorizontal: getScreenHeight(2),
    },
  });

export default CredDebtReport;
