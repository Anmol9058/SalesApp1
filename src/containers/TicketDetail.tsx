import React, {useCallback, useContext, useMemo} from 'react';
import {View, StyleSheet, Text, ScrollView, FlatList} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useQuery} from 'react-query';
import {getTDSAndTCS, getYcnAgreement} from '../api/home';
import ArrowButton from '../components/ArrowButton';

import CustomNewHeader from '../components/CustomNewHeader';
import CustomStatusBar from '../components/CustomStatusBar';
import FullScreenLoader from '../components/FullScreenLoader';
import Header from '../components/Header';
import fonts from '../constants/fonts';
import {authContext, themeContext} from '../contexts/context';
import useApi from '../hooks/useApi';
import {getScreenHeight} from '../utils/domUtil';

const TicketDetail = ({navigation, route}: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const {user_data}: any = useContext(authContext);
  const item = route.params.item;
  console.log(item);

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <CustomStatusBar color={theme.black} light />
      <View style={styles.screen}>
        <CustomNewHeader
          subtitle={user_data?.Customer_No__c ? user_data?.Customer_No__c : ''}
          action={() => navigation.goBack()}
          title={user_data?.Name ? user_data?.Name : ''}
        />
        <ScrollView style={styles.contanier}>
          <Header dark title="Ticket Detail" />

          <View>
            <View style={styles.contanier}>
              <View style={styles.row}>
                <Text style={styles.title}>Name:</Text>
                <Text style={styles.subtitle}>{item?.Name}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.title}>Type:</Text>
                <Text style={styles.subtitle}>{item?.Complaint_Type__c}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.title}>Category:</Text>
                <Text style={styles.subtitle}>
                  {item?.Complaint_category__c}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.title}>Sub Category:</Text>
                <Text style={styles.subtitle}>
                  {item?.Complaint_sub_category__c}
                </Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.title}>Description:</Text>
                <Text style={styles.subtitle}>
                  {item?.Complaint_Description__c ?? 'NA'}
                </Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.title}>Team Remarks:</Text>
                <Text style={styles.subtitle}>
                  {item?.Field_Team_Remarks__c ?? 'NA'}
                </Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.title}>Status:</Text>
                <Text style={styles.subtitle}>{item?.Complaint_Status__c}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
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
    contanier: {
      margin: getScreenHeight(2),
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      flex: 1,
      marginTop: getScreenHeight(2),
    },
    title: {
      fontFamily: fonts.regular,
      color: '#333333',
      fontSize: getScreenHeight(1.6),
      width: '40%',
    },

    subtitle: {
      fontFamily: fonts.bold,
      color: theme.black,
      fontSize: getScreenHeight(1.6),
      flex: 1,
    },
  });

export default TicketDetail;
