import React, {useCallback, useContext, useMemo, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import fonts from '../constants/fonts';
import {themeContext, authContext} from '../contexts/context';
import {getScreenHeight, getScreenWidth} from '../utils/domUtil';
import ArrowButton from '../components/ArrowButton';
import Spacer from '../components/Spacer';
import {SafeAreaView} from 'react-native-safe-area-context';
import useApi from '../hooks/useApi';
import CustomStatusBar from '../components/CustomStatusBar';
import CustomNewHeader from '../components/CustomNewHeader';
import CustomInput from '../components/CustomInput';
import {createLimitProposal, getCreditProposal} from '../api/home';
import Toast from 'react-native-simple-toast';
import {useMutation} from 'react-query';

const CreditAdditional = ({navigation}: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const {user_data}: any = useContext(authContext);

  const [limitProposal, setLimitProposal] = useState(false);
  const [proposalNo, setProposalNo] = useState(false);
  const [chequeNo, setChequeNo] = useState(false);
  const [bankName, setBankName] = useState(false);
  const [amountData, setAmountData] = useState(false);

  const {apiCall} = useApi();

  const createSecurityManager = async () => {
    setLimitProposal(true);
    try {
      let data = {
        dealer: user_data.Name,
        Amount: amountData,
        Remarks: '',
        Bank_Name: bankName,
        Cheque_No: chequeNo,
      };
      const res = await createLimitProposal(apiCall, data);

      return res;
    } catch (error) {
      console.log('error', error);
    } finally {
      setLimitProposal(false);
    }
  };

  const {mutate: hitSubmit, isLoading: submitLoading} = useMutation(
    createSecurityManager,
    {
      onSuccess: (data: any) => {
        navigation.navigate('CreditProposal');
      },
    },
  );

  return (
    <SafeAreaView edges={['top']} style={styles.screen}>
      <CustomStatusBar color={theme.black} light />
      <View style={styles.screen}>
        <CustomNewHeader
          subtitle={user_data?.Customer_No__c ? user_data?.Customer_No__c : ''}
          action={() => navigation.goBack()}
          title={user_data?.Name ? user_data?.Name : ''}
        />
        <Text
          style={{
            fontSize: 22,
            fontWeight: 'bold',
            color: 'black',
            alignSelf: 'center',
            marginTop: getScreenHeight(1),
          }}>
          Additional
        </Text>
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
                placeholder="Proposal No."
                // value={customerData?.Vehicle_Model__c}
                action={setProposalNo}
              />
            </View>
            <View style={styles.input}>
              <CustomInput
                black
                placeholder="Cheque No."
                value={chequeNo}
                action={setChequeNo}
              />
            </View>

            <View style={styles.input}>
              <CustomInput
                black
                placeholder="Bank Name"
                value={bankName}
                action={setBankName}
              />
            </View>

            <View style={styles.input}>
              <CustomInput
                black
                placeholder="Amount"
                value={amountData}
                action={setAmountData}
              />
            </View>

            <View style={styles.customButton}>
              <ArrowButton
                title="Save"
                action={hitSubmit}
                loading={submitLoading}
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

export default CreditAdditional;
