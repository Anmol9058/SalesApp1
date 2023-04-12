import React, {useCallback, useContext, useMemo, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

import {themeContext} from '../contexts/context';
import CustomStatusBar from '../components/CustomStatusBar';
import {getScreenHeight} from '../utils/domUtil';
import fonts from '../constants/fonts';
import CustomBackHeader from '../components/CustomBackHeader';
import InvoiceItem from '../components/InvoiceItem';
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';
import FastImage from 'react-native-fast-image';

const DeliveryConfirmationHistory = ({navigation}) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [invoiceNumber, setInvoiceNumber] = useState('');

  const renderItem = useCallback(({item}) => {
    return (
      <View style={styles.item}>
        <InvoiceItem action={() => navigation.navigate('InvoiceDetail')} />
      </View>
    );
  }, []);

  return (
    <SafeAreaView edges={['top']} style={styles.screen}>
      <CustomStatusBar color={theme.white} />
      <View style={styles.screen}>
        <CustomBackHeader
          action={() => navigation.goBack()}
          title="Delivery Confirmation History"
        />
        <LinearGradient
          colors={['#000000', '#606060']}
          style={styles.linearGradient}>
          <View style={styles.header}>
            <CustomTextInput
              placeholder="Enter Invoice Number"
              border
              value={invoiceNumber}
              action={setInvoiceNumber}
            />
            <View style={styles.mainRow}>
              <View style={styles.row}>
                <Text style={styles.title}>Invoice From Date</Text>
                <FastImage
                  resizeMode="contain"
                  style={styles.icon}
                  tintColor={theme.yellow}
                  source={require('../assets/images/calendar.png')}
                />
              </View>

              <View style={styles.row}>
                <Text style={styles.title}>Invoice To Date</Text>
                <FastImage
                  resizeMode="contain"
                  style={styles.icon}
                  tintColor={theme.yellow}
                  source={require('../assets/images/calendar.png')}
                />
              </View>
            </View>
            <CustomButton notBorder title="SUBMIT" />
          </View>
          <FlatList
            data={[1, 2, 3, 4]}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.flatlist}
          />
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
};

const createStyles = theme =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: 'white',
    },
    linearGradient: {
      flex: 1,
    },
    header: {
      backgroundColor: 'white',
      margin: getScreenHeight(2),
    },
    notfound: {
      color: theme.subtitle,
      fontFamily: fonts.bold,
      fontSize: getScreenHeight(2),
      alignSelf: 'center',
      marginVertical: getScreenHeight(2),
    },
    flatlist: {
      padding: getScreenHeight(2),
    },
    item: {
      marginBottom: getScreenHeight(2),
    },
    mainRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: getScreenHeight(6),
      paddingHorizontal: getScreenHeight(2),
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    title: {
      fontFamily: fonts.bold,
      fontSize: getScreenHeight(1.8),
      color: theme.primary,
    },
    icon: {
      height: getScreenHeight(2.5),
      width: getScreenHeight(2.5),
      marginLeft: getScreenHeight(1),
    },
  });

export default DeliveryConfirmationHistory;
