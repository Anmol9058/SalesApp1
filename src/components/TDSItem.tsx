import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import fonts from '../constants/fonts';
import {getTDSTCScertificate} from '../api/home';

// import {themeContext} from '../contexts/context';
import {getScreenHeight} from '../utils/domUtil';
import ArrowButton from './ArrowButton';
import Spacer from './Spacer';
import {
  getCurrentFinancialYear,
  getFinalcialQuarterRange,
} from '../utils/fiscalYear';
import {authContext, themeContext} from '../contexts/context';
import useApi from '../hooks/useApi';
import {useQuery} from 'react-query';
// import ResultItem from '../components/ResultItem';
import TDSTCSresult from '../components/TDSTCSresult';

// import Spacer from '../components/Spacer';

const TDSItem = (props: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View>
      <View style={styles.contanier}>
        <View style={styles.row}>
          <Text style={styles.title}>Quarter:</Text>
          <Text style={styles.subtitle}>{props?.item?.Quarter__c}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Financial year</Text>
          <Text style={styles.subtitle}>{props?.item?.Assessment_Year__c}</Text>
        </View>
        <Spacer />
        <ArrowButton title="View" action={props.action} />
      </View>
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    contanier: {
      backgroundColor: theme.white,
      padding: getScreenHeight(2),
      borderRadius: getScreenHeight(1),
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
      fontSize: getScreenHeight(1.6),
      flex: 1,
    },
    mainResult: {
      fontFamily: fonts.bold,
      fontSize: getScreenHeight(2),
      color: theme.white,
    },
    list: {
      paddingHorizontal: getScreenHeight(2),
    },
  });

export default TDSItem;
