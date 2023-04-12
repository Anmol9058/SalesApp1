import React, {useCallback, useContext, useMemo} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useQuery} from 'react-query';
import {getShippingAddress} from '../api/home';

import CustomNewHeader from '../components/CustomNewHeader';
import CustomStatusBar from '../components/CustomStatusBar';
import NotFound from '../components/NotFound';
import fonts from '../constants/fonts';
import {authContext, themeContext} from '../contexts/context';
import useApi from '../hooks/useApi';
import {getScreenHeight} from '../utils/domUtil';

const ShippingAddress = ({navigation, route}: any) => {
  const {theme} = useContext(themeContext);
  const {user_id} = useContext(authContext);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const {apiCall} = useApi();

  const addressHandler = route.params.addressHandler;

  const shippingAddressManager = useCallback(async () => {
    const res = await getShippingAddress(apiCall, user_id);
    return res;
  }, [apiCall]);

  const {data, isLoading} = useQuery(
    'getShippingAddress',
    shippingAddressManager,
    {
      retry: 0,
      enabled: true,
    },
  );

  const renderItem = useCallback(({item}: any) => {
    return (
      <TouchableOpacity
        onPress={() => {
          addressHandler(item);
          navigation.goBack();
        }}
        style={styles.addressContanier}>
        {/* <Text style={styles.title}>{'Billing Address'}</Text> */}
        <View style={styles.newRow}>
          <Text style={[styles.address, {flex: 0.9}]}>{item?.Address__c}</Text>
          <FastImage
            resizeMode="contain"
            tintColor={theme.black}
            style={styles.icon}
            source={require('../assets/images/arrows/downarrow.png')}
          />
        </View>
      </TouchableOpacity>
    );
  }, []);

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <CustomStatusBar color={theme.black} light />
      <View style={styles.screen}>
        <CustomNewHeader
          action={() => navigation.goBack()}
          title="Shipping Address"
        />

        <FlatList
          ListHeaderComponent={
            isLoading ? (
              <ActivityIndicator
                size={'small'}
                style={{marginTop: getScreenHeight(2)}}
                color={theme.primary}
              />
            ) : (
              <TouchableOpacity
                onPress={() => {
                  addressHandler({
                    Address__c: 'Billing Address',
                    Name: '',
                    State__r: {
                      Name: '',
                    },
                  });
                  navigation.goBack();
                }}
                style={[
                  styles.addressContanier,
                  {marginTop: getScreenHeight(2)},
                ]}>
                <View style={styles.newRow}>
                  <Text style={[styles.address, {flex: 0.9}]}>
                    {'Billing Address'}
                  </Text>
                  <FastImage
                    resizeMode="contain"
                    tintColor={theme.black}
                    style={styles.icon}
                    source={require('../assets/images/arrows/downarrow.png')}
                  />
                </View>
              </TouchableOpacity>
            )
          }
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          ListEmptyComponent={isLoading ? null : NotFound}
          contentContainerStyle={styles.list}
        />
      </View>
    </SafeAreaView>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: theme.lightGrey,
    },
    screen: {
      flex: 1,
      backgroundColor: '#F2F2F2',
    },
    list: {
      paddingHorizontal: getScreenHeight(2),
    },
    addressContanier: {
      marginTop: getScreenHeight(2),
    },
    newRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      flex: 1,
    },
    title: {
      fontFamily: fonts.regular,
      color: theme.white,
      fontSize: getScreenHeight(1.6),
    },
    subtitle: {
      fontFamily: fonts.bold,
      color: theme.white,
      fontSize: getScreenHeight(1.6),
    },
    address: {
      fontFamily: fonts.regular,
      color: theme.black,
      fontSize: getScreenHeight(1.4),
    },
    icon: {
      height: getScreenHeight(2),
      width: getScreenHeight(2),
    },
  });

export default ShippingAddress;
