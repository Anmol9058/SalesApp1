import React, {useContext, useMemo} from 'react';
import {View, StyleSheet, Linking, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useQuery} from 'react-query';
import {getSurveys} from '../api/home';
import ArrowButton from '../components/ArrowButton';

import CustomNewHeader from '../components/CustomNewHeader';
import CustomStatusBar from '../components/CustomStatusBar';
import FullScreenLoader from '../components/FullScreenLoader';
import Header from '../components/Header';
import Spacer from '../components/Spacer';
import fonts from '../constants/fonts';
import {authContext, themeContext} from '../contexts/context';
import useApi from '../hooks/useApi';
import {getScreenHeight} from '../utils/domUtil';

const Survey = ({navigation}: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const {apiCall} = useApi();
  const {user_data}: any = useContext(authContext);

  const surveryManager = async () => {
    const res = await getSurveys(apiCall, user_data.Id);
    return res;
  };

  const {data, isLoading} = useQuery('hitSurvery', surveryManager, {
    retry: 0,
    enabled: true,
  });

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <CustomStatusBar color={theme.black} light />
      <View style={styles.screen}>
        <CustomNewHeader
          subtitle={user_data?.Customer_No__c ? user_data?.Customer_No__c : ''}
          action={() => navigation.goBack()}
          title={"Ridham Kumar"}
        />
        <View style={{padding: getScreenHeight(2)}}>
          <Header title="Survey" dark />
        </View>
        <View style={styles.contanier}>
          <Text style={styles.body}>{data?.records[0]?.Name}</Text>
          <Spacer height={getScreenHeight(4)} />
          <ArrowButton
            // action={() => Linking.openURL(data?.records[0]?.Survey_Link__c)}
            title="Take Survey"
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
      backgroundColor: '#F2F2F2',
    },
    safe: {
      flex: 1,
      backgroundColor: theme.black,
    },
    header: {
      padding: getScreenHeight(2),
    },
    list: {
      paddingHorizontal: getScreenHeight(2),
    },

    contanier: {
      margin: getScreenHeight(2),
      backgroundColor: theme.white,
      padding: getScreenHeight(2),
      borderRadius: getScreenHeight(1),
    },
    body: {
      fontFamily: fonts.regular,
      color: '#333333',
      fontSize: getScreenHeight(1.8),
    },
    item: {
      height: getScreenHeight(6),
      borderColor: theme.white,
      borderTopWidth: getScreenHeight(0.1),
      borderBottomWidth: getScreenHeight(0.1),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    title: {
      fontFamily: fonts.semiBold,
      color: theme.white,
      fontSize: getScreenHeight(1.6),
    },
    icon: {
      width: getScreenHeight(2),
      height: getScreenHeight(2),
    },
  });

export default Survey;
