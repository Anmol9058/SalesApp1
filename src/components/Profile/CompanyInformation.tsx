import React, { useCallback, useContext, useMemo, useState, useEffect } from 'react';
import { getAllProfile } from '../../api/home';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import fonts from '../../constants/fonts';

import {themeContext} from '../../contexts/context';
import {getScreenHeight} from '../../utils/domUtil';
import Divider from '../Divider';
import Spacer from '../Spacer';
import useApi from '../../hooks/useApi';
import { useQuery } from 'react-query';


const CompanyInformation = (props: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { apiCall } = useApi();
 
  const userProfileManager = useCallback(async () => {

    const res = await getAllProfile(apiCall);
    console.log('res', res);
    console.log('vejhwv',res)
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

const data2 = [
  {
    name: 'MYKL Sales Rep- Name and Contact',
    email: '',
  },
  {
    name: 'MYKL Employee- Name and Contact',
    email: '',
  },
  {
    name: 'MYKL ASM- Name and Contact',
    email: data?.asm__c,
    
  },
  {
    name: 'MYKL  BM- Name and Email',
    email: data?.bm__c,
  },
];
  const renderItem = ({item}: any) => {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.subtitle}>{item.email}</Text>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={['#FFFF', '#FFFFFF']}
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
    subtitle:{
        color: theme.Black,
        fontFamily: fonts.bold,
        fontSize: getScreenHeight(1.6),
    }
  });

export default CompanyInformation;
