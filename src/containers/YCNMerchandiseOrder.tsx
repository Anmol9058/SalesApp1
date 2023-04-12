import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {View, StyleSheet, Text, FlatList, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryLine,
  VictoryAxis,
  VictoryScatter,
  VictoryGroup,
  VictoryPie,
} from 'victory-native';
import {useQuery} from 'react-query';

import CustomStatusBar from '../components/CustomStatusBar';
import CustomNewHeader from '../components/CustomNewHeader';
import {formatPrice, getScreenHeight, getScreenWidth} from '../utils/domUtil';
import fonts from '../constants/fonts';
import Spacer from '../components/Spacer';
import NotFound from '../components/NotFound';
import YCNMerchandiseItem from '../components/YCNMerchandiseItem';
import {authContext, themeContext} from '../contexts/context';
import useApi from '../hooks/useApi';
import {getPromotionalBudget, getPromotionalOrder} from '../api/home';
import {PropTypes} from 'victory';
import Header from '../components/Header';

const YCNMerchandiseOrder = (navigation: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const {tokens, cart_Data, user_id, setCartData, user_data}: any =
    useContext(authContext);

  console.log('dataaaaa', navigation.route.params.item.records);
  const {apiCall} = useApi();

  const renderKeyExtractor = useCallback(
    (item: any, index: any) => index.toString(),
    [],
  );
  const renderItem = ({item}: any) => {
    return (
      <View>
        <Spacer height={getScreenHeight(2)} />
        <TouchableOpacity style={styles.screen}>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: theme.white,
              overflow: 'hidden',
            }}>
            <View style={styles.header}>
              <Text style={styles.title2}>Item Name </Text>
              <Spacer height={getScreenHeight(1)} />

              <Text style={styles.title2}>Unit Price</Text>
              <Spacer height={getScreenHeight(1)} />

              <Text style={styles.title2}>Quantity</Text>
              <Spacer height={getScreenHeight(1)} />
            </View>
            <View style={styles.header}>
              <Text style={styles.title2}>{item.Name}</Text>
              <Spacer height={getScreenHeight(1)} />

              <Text style={styles.title2}>
                {formatPrice(item.Unit_Price__c)}
              </Text>
              <Spacer height={getScreenHeight(1)} />

              <Text style={styles.title2}>{item.Quantity__c}</Text>
              <Spacer height={getScreenHeight(1)} />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <CustomStatusBar color={theme.black} light />
      <View style={styles.screen}>
        <CustomNewHeader
          subtitle={user_data?.Customer_No__c ? user_data?.Customer_No__c : ''}
          action={() => navigation.navigation.goBack()}
          title={user_data?.Name ? user_data?.Name : ''}
        />
        <View style={styles.contanier}>
          <Header dark title="YCN Order Detail" />

          <FlatList
            data={navigation.route.params.item.records}
            ListHeaderComponent={() => <Spacer height={getScreenHeight(2)} />}
            keyExtractor={renderKeyExtractor}
            renderItem={renderItem}
            ListEmptyComponent={NotFound}
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
      // overflow: 'hidden',
    },
    title2: {
      fontFamily: fonts.medium,
      color: theme.black,
      fontSize: getScreenHeight(1.6),
      // flexDirection:'row'
    },
    safe: {
      flex: 1,
      backgroundColor: theme.black,
    },
    contanier: {
      paddingHorizontal: getScreenHeight(2),
    },
    title: {
      fontFamily: fonts.bold,
      fontSize: getScreenHeight(2.2),
      color: theme.black,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    chartContanier: {
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      marginBottom: getScreenHeight(2),
    },
    subtitle: {
      fontFamily: fonts.medium,
      fontSize: getScreenHeight(1.6),
      color: theme.black,
    },
    rightContanier: {
      marginRight: getScreenHeight(2),
    },

    header: {
      padding: getScreenHeight(2),
      // backgroundColor : 'blue',
      // backgroundColor: theme.white,
      // width:getScreenWidth(2)
      // width:'30%'
      // flexDirection:
    },
  });

export default YCNMerchandiseOrder;
