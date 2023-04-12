import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {authContext, themeContext} from '../contexts/context';
import useApi from '../hooks/useApi';
import CustomStatusBar from '../components/CustomStatusBar';
import CustomNewHeader from '../components/CustomNewHeader';
import {getScreenHeight, getScreenWidth} from '../utils/domUtil';
import SelectSdItem from '../components/SelectSdItem';
import SelectProposalItem from '../components/SelectProposalItem';

const SelectProposalModel = ({navigation}: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const {apiCall} = useApi();
  const {user_data, tokens}: any = useContext(authContext);

  const ToCreditAdditionalScreen = () => {
    navigation.navigate('CreditAdditional');
  };
  const ToCreditFixedScreen = () => {
    navigation.navigate('CreditFixed');
  };
  const ToCreditRemoveScreen = () => {
    navigation.navigate('CreditRemove');
  };

  return (
    <SafeAreaView edges={['top']} style={styles.screen}>
      <CustomStatusBar color={theme.black} light />
      <View style={styles.screen}>
        <CustomNewHeader
          subtitle={user_data?.Customer_No__c ? user_data?.Customer_No__c : ''}
          action={() => navigation.goBack()}
          title={user_data?.Name ? user_data?.Name : ''}
        />
        <View
          style={{
            marginTop: getScreenHeight(3),
            marginHorizontal: getScreenHeight(1),
          }}>
          <SelectProposalItem
            navigate1={() => ToCreditAdditionalScreen()}
            navigate2={() => ToCreditFixedScreen()}
            navigate3={() => ToCreditRemoveScreen()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.light_grey,
    },
  });

export default SelectProposalModel;
