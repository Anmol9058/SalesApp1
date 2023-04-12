
import {View, StyleSheet, FlatList, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import fonts from '../../constants/fonts';
import React, { useCallback, useContext, useMemo, useState, useEffect } from 'react';
import { getAllProfile } from '../../api/home';

import {themeContext} from '../../contexts/context';
import {getScreenHeight} from '../../utils/domUtil';
import Divider from '../Divider';
import Spacer from '../Spacer';
import useApi from '../../hooks/useApi';
import { useQuery } from 'react-query';



const Basic = (props: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { apiCall } = useApi();
 
  const userProfileManager = useCallback(async () => {
   const res = await getAllProfile(apiCall);
    console.log('res', res);
    return res
}, [apiCall]);

const { data, isLoading } = useQuery(
    'userProfileManager',
    userProfileManager,
    {
        retry: 0,
        enabled: true,
    },
);

console.log('data',data)

const data2 = [
  {
    name: 'Firm Name.',
    email: data?.name,
  },
  {
    name: 'Proprietor Name.',
    email: '',
  },
  {
    name: 'Land Line No.',
    email: '',
  },
  {
    name: 'Mobile  No.',
    email: data?.phone,
  },
  {
    name: 'Address',
    email: '',
  },
  {
    name: 'Email.',
    email: data?.e_mail__c,
  },
  {
    name: 'Month and Year of Inception.',
    email: '',
  },
  {
    name: 'Birthday',
    email: '',
  },
  {
    name: 'Segement.',
    email: data?.segment__c,
  },
  {
    name: 'Servicing DBA',
    email: '',
  },
];


  const renderItem = ({item}: any) => {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{item?.name}</Text>
        <Text style={styles.subtitle}>{item.email}</Text>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={['#FFFFFF', '#FFFFFF']}
      style={styles.linearGradient}>
      <Spacer height={getScreenHeight(3)} />
      <FlatList
        data={data2}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <Divider color="#393A3A" />}
      />
    </LinearGradient>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    contanier: {
      padding: getScreenHeight(2),
    },
    linearGradient: {
      flex: 1,
    },
    item: {
      paddingHorizontal: getScreenHeight(2),
      height: getScreenHeight(8),
      justifyContent: 'center',
    },
    title: {
      color: theme.black,
      fontFamily: fonts.bold,
      fontSize: getScreenHeight(1.6),
    },
    subtitle: {
      color: theme.Black,
      fontFamily: fonts.bold,
      fontSize: getScreenHeight(1.6),
    },
  });

export default Basic;
