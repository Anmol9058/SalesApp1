import React, {useContext, useEffect, useMemo, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import fonts from '../constants/fonts';
import {authContext, themeContext} from '../contexts/context';
import {
  formatPrice,
  getNumbersOnly,
  getScreenHeight,
  getScreenWidth,
} from '../utils/domUtil';
import ArrowButton from '../components/ArrowButton';
import Spacer from '../components/Spacer';
import {SafeAreaView} from 'react-native-safe-area-context';
import useApi from '../hooks/useApi';
import CustomStatusBar from '../components/CustomStatusBar';
import CustomNewHeader from '../components/CustomNewHeader';
import CustomInput from '../components/CustomInput';
import {createSecurity} from '../api/home';
import Toast from 'react-native-simple-toast';

const SDIncrease = ({navigation}: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [sd_increase_amount, setSd_increase_amount]: any = useState('0');
  const [totalsd, setTotalsd]: any = useState(null);
  const [securityLoading, setSecurityLoading] = useState(false);
  const {apiCall} = useApi();
  const {user_data}: any = useContext(authContext);

  useEffect(() => {
    setTotalsd(
      (
        parseFloat(user_data.SD_Balance__c) + parseFloat(sd_increase_amount)
      ).toString(),
    );
  }, [sd_increase_amount]);

  const createSecurityManager = async () => {
    setSecurityLoading(true);
    try {
      let data = {
        records: [
          {
            attributes: {type: 'Security_Deposite__c', referenceId: 'ref1'},
            Dealer__c: user_data.Id,
            Current_SD__c: user_data.SD_Balance__c,
            Request_Type__c: 'SD Increase',
            SD_Increase_Amount__c: sd_increase_amount,
            Total_SD__c: totalsd,
          },
        ],
      };

      const res = await createSecurity(apiCall, data);
      if (!res.hasErrors) {
        Toast.show('Record Created Successfully');
        navigation.navigate('SecurityDeposit');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSecurityLoading(false);
    }
  };

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <CustomStatusBar color={theme.black} light />
      <View style={styles.screen}>
        <CustomNewHeader
          subtitle={user_data?.Customer_No__c ? user_data?.Customer_No__c : ''}
          action={() => navigation.goBack()}
          title={user_data?.Name ? user_data?.Name : ''}
        />
        <Text
          style={{
            fontSize: getScreenHeight(2),
            fontWeight: 'bold',
            color: 'black',
            alignSelf: 'center',
            marginTop: getScreenHeight(1),
          }}>
          Security Deposit Form : SD Increase
        </Text>
        <Spacer />
        <ScrollView>
          <View style={styles.contanier}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: 'black',
              }}>
              Information
            </Text>

            <View style={styles.input}>
              <CustomInput
                black
                value={formatPrice(user_data?.SD_Balance__c)}
                editable={false}
              />
            </View>

            <View style={styles.input}>
              <CustomInput
                black
                placeholder="SD Increase Amount"
                value={sd_increase_amount}
                keyboardType="numeric"
                action={(text: any) =>
                  setSd_increase_amount(getNumbersOnly(text))
                }
              />
            </View>
            <View style={styles.input}>
              <CustomInput
                black
                placeholder="Total SD"
                value={formatPrice(totalsd)}
                editable={false}
              />
            </View>
            <View style={styles.customButton}>
              <ArrowButton
                loading={securityLoading}
                title="Submit"
                action={() => {
                  createSecurityManager();
                }}
              />
            </View>
            <Spacer />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    contanier: {
      backgroundColor: theme.white,
      padding: getScreenHeight(2),
      borderRadius: getScreenHeight(1),
      marginTop: getScreenHeight(0.5),
      width: getScreenWidth(90),
      alignSelf: 'center',
    },
    safe: {
      flex: 1,
      backgroundColor: theme.black,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: getScreenHeight(4),
    },
    title: {
      fontFamily: fonts.regular,
      color: '#333333',
      fontSize: getScreenHeight(1.6),
      width: '30%',
    },

    subtitle: {
      fontFamily: fonts.bold,
      color: theme.black,
      borderColor: 'grey',
      borderWidth: 1,
      backgroundColor: theme.lightGrey,
      width: getScreenWidth(4.5),
      borderRadius: 50,
      fontSize: getScreenHeight(1.6),
    },
    screen: {
      flex: 1,
      backgroundColor: theme.light_grey,
    },
    input: {
      marginBottom: getScreenHeight(2),
      marginTop: getScreenHeight(1),
    },
    customButton: {
      marginTop: getScreenHeight(2),
    },
  });

export default SDIncrease;
