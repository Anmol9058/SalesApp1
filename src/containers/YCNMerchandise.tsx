import React, {useCallback, useContext, useMemo} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {VictoryChart, VictoryAxis, VictoryPie} from 'victory-native';
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
import {getBudgetAndUsage, getPromotionalOrder} from '../api/home';
import Header from '../components/Header';

const YCNMerchandise = ({navigation}: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const {user_data}: any = useContext(authContext);

  const {apiCall} = useApi();

  const PromotionalOrderManager = useCallback(async () => {
    const res2 = await getPromotionalOrder(apiCall, user_data.Name);
    return res2;
  }, [user_data.Name, apiCall]);

  const {isLoading, data: promotionalOrderData} = useQuery(
    'getPromotionalOrder',
    PromotionalOrderManager,
    {
      retry: 0,
      enabled: true,
    },
  );

  const getBudgetAndUsageManager = useCallback(async () => {
    const res2 = await getBudgetAndUsage(apiCall, user_data.Id);
    return res2;
  }, [user_data, apiCall]);

  const {data: budgetData} = useQuery(
    'getBudgetAndUsage',
    getBudgetAndUsageManager,
    {
      retry: 0,
      enabled: true,
    },
  );

  const renderKeyExtractor = useCallback(
    (item: any, index: any) => index.toString(),
    [],
  );

  const renderItem = ({item}: any) => {
    return (
      <View>
        <YCNMerchandiseItem
          data={item}
          action={() =>
            navigation.navigate('YCNMerchandiseOrder', {
              item: item.Promotional_Order_Lines__r,
            })
          }
        />
      </View>
    );
  };

  const RenderHeader = () => {
    return (
      <View style={styles.row}>
        <View>
          <VictoryChart
            width={getScreenWidth(35)}
            height={getScreenHeight(17)}
            animate={{
              duration: 2000,
              onLoad: {duration: 1000},
            }}>
            <VictoryPie
              labels={() => null}
              animate={{
                duration: 2000,
              }}
              colorScale={['#C5242C', '#D3D3D3']}
              standalone={false}
              innerRadius={40}
              data={[
                {x: 'Cats', y: 70},
                {x: 'Dogs', y: 30},
              ]}
            />
            <VictoryAxis
              style={{
                axis: {stroke: 'transparent'},
                ticks: {stroke: 'transparent'},
                tickLabels: {fill: 'transparent'},
              }}
            />
          </VictoryChart>
        </View>
        {budgetData ? (
          <View style={[styles.rightContanier, {flex: 1}]}>
            <Text style={[styles.subtitle, {fontFamily: fonts.bold}]}>
              Budget vs usage
            </Text>
            <Text style={styles.subtitle}>
              Budget:{'  '}
              {budgetData[0]?.Budget_Value__c
                ? formatPrice(budgetData[0]?.Budget_Value__c)
                : formatPrice(0.0)}
            </Text>
            <Text style={styles.subtitle}>
              Usage:{'  '}
              {budgetData[0]?.Used_Amount__c
                ? formatPrice(budgetData[0]?.Used_Amount__c)
                : formatPrice(0.0)}
            </Text>
          </View>
        ) : null}
      </View>
    );
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
        <View style={styles.contanier}>
          <Spacer height={getScreenHeight(2)} />
          <Header dark title="Promotional Orders" />
          <Spacer height={getScreenHeight(2)} />

          <FlatList
            data={promotionalOrderData}
            ListHeaderComponent={() =>
              isLoading ? (
                <ActivityIndicator size={'small'} color={theme.primary} />
              ) : (
                <>
                  <RenderHeader />
                  <Spacer height={getScreenHeight(2)} />
                </>
              )
            }
            keyExtractor={renderKeyExtractor}
            renderItem={renderItem}
            ListEmptyComponent={() => (isLoading ? null : <NotFound />)}
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
  });

export default YCNMerchandise;
