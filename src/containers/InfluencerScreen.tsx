import React, { useCallback, useContext, useMemo ,useEffect} from 'react';
import { View, StyleSheet, Text, ScrollView, FlatList,TouchableOpacity, Alert, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SimpleToast from 'react-native-simple-toast';
import { useQuery } from 'react-query';
import { getCartDetails, getSalesOrderList,getInfluencerRecords } from '../api/home';

import CustomNewHeader from '../components/CustomNewHeader';
import CustomStatusBar from '../components/CustomStatusBar';
import FullScreenLoader from '../components/FullScreenLoader';
import Header from '../components/Header';
// import LeadTabItem from '../components/LeadTabItem';
import InflTabItem from '../components/InflTabItem';
import NotFound from '../components/NotFound';
import SaleOrderItem from '../components/SaleOrderItem';
import Spacer from '../components/Spacer';
import { authContext, themeContext } from '../contexts/context';
import useApi from '../hooks/useApi';
import { getScreenHeight,getScreenWidth } from '../utils/domUtil';
import FastImage from 'react-native-fast-image';
import fonts from '../constants/fonts';
import { useFocusEffect } from '@react-navigation/native';


const InfluencerScreen = ({ navigation }: any) => {
  const { theme } = useContext(themeContext);
  const { tokens, user_data }: any = useContext(authContext);

  const styles = useMemo(() => createStyles(theme), [theme]);
  const { apiCall } = useApi();
  const renderKeyExtractor = (item: any, index: any) => index.toString();
 
  // useEffect(() => {
  //   getInfluencerManager();
  // });

  useFocusEffect(
    React.useCallback(() => {
      refetch()
    }, [])
  );
  const renderItem = useCallback(({ item }: any) => {
    // console.log(item);
    return (
      <View style={styles.item}>
        <InflTabItem
          item={item}
          action={() => {
         
          }}
        />

      </View>
    );
  }, []);

  const getInfluencerManager = useCallback(async () => {
    const res = await getInfluencerRecords(apiCall);
    console.log(res);
    return res;
  }, [apiCall]);
  const { data, isLoading ,refetch} = useQuery(
    'getInfluencerManager',
    getInfluencerManager,
    {
      retry: 0,
      enabled: false,  
    },
  );

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <CustomStatusBar color={theme.black} light />
      <View style={styles.screen}>
        <CustomNewHeader
          subtitle={'123456'}
          action={() => navigation.goBack()}
          title={'Ridham'}
        />

        <FlatList
          contentContainerStyle={styles.list}
          ListHeaderComponent={() => <Header dark title="Influencers" />}
          data={data}
          keyExtractor={renderKeyExtractor}
          renderItem={renderItem}
          ListFooterComponent={() => <Spacer height={getScreenHeight(3)} />}
          ListEmptyComponent={NotFound}
        />

        <TouchableOpacity
          onPress={() => navigation.navigate('newInflScreen')}
          style={styles.customButton}>
          <FastImage
            source={require('../assets/images/common/plus.png')}
            style={styles.icon}
            resizeMode="contain"
            tintColor={theme.white}
          />
          <Text
            style={[
              styles.title,
              { fontSize: getScreenHeight(1.5), color: theme.white },
            ]}>
            New
          </Text>
        </TouchableOpacity>
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
    item: {
      marginTop: getScreenHeight(2),
    },
    customButton: {
      alignSelf: 'flex-end',
      backgroundColor: theme.primary,
      padding: getScreenHeight(2),
      borderRadius: getScreenHeight(2),
      flexDirection: 'row',
      position: 'absolute',
      bottom: getScreenHeight(10),
      left: getScreenWidth(72),
      alignItems: 'center',
    },
    icon: {
      height: getScreenHeight(2.5),
      width: getScreenHeight(2.5),
      marginRight: getScreenHeight(1),
    },
    title: {
      fontFamily: fonts.bold,
      color: theme.black,
      fontSize: getScreenHeight(2),
    },
  });

export default InfluencerScreen;
