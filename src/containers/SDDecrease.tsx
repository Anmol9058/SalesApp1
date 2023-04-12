import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
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

const SDDecrease = ({navigation}: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [securityLoading, setSecurityLoading] = useState(false);
  const {apiCall} = useApi();

  const [sd_decrease_amount, setSd_decrease_amount]: any = useState('0');
  const [totalsd, setTotalsd]: any = useState(null);
  const {user_data}: any = useContext(authContext);

  useEffect(() => {
    setTotalsd(
      (
        parseFloat(user_data.SD_Balance__c) - parseFloat(sd_decrease_amount)
      ).toString(),
    );
  }, [sd_decrease_amount]);

  const createSecurityManager = async () => {
    setSecurityLoading(true);
    try {
      let data = {
        records: [
          {
            attributes: {type: 'Security_Deposite__c', referenceId: 'ref1'},
            Dealer__c: user_data.Id,
            Current_SD__c: user_data.SD_Balance__c,
            Request_Type__c: 'SD Decrease',
            SD_Decrease_Amount__c: sd_decrease_amount,
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
            marginTop: getScreenHeight(4),
          }}>
          Security Deposit Form : SD Decrease
        </Text>
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
              placeholder="Current SD"
              value={formatPrice(user_data?.SD_Balance__c)}
            />
          </View>

          <View style={styles.input}>
            <CustomInput
              black
              placeholder="SD Decrease Amount"
              value={sd_decrease_amount}
              keyboardType="numeric"
              action={(text: any) =>
                setSd_decrease_amount(getNumbersOnly(text))
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
      </View>
    </SafeAreaView>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    contanier: {
      backgroundColor: theme.white,
      padding: getScreenHeight(4),
      borderRadius: getScreenHeight(1),
      marginTop: getScreenHeight(2),
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
      marginTop: getScreenHeight(2),
    },
    customButton: {
      marginTop: getScreenHeight(2),
    },
  });

export default SDDecrease;
