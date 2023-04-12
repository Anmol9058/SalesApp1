import React, {useCallback, useContext, useMemo, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useQuery} from 'react-query';
import {getTicket} from '../api/home';
import CustomNewHeader from '../components/CustomNewHeader';
import CustomStatusBar from '../components/CustomStatusBar';
import FullScreenLoader from '../components/FullScreenLoader';
import Header from '../components/Header';
import NotFound from '../components/NotFound';
import TicketItem from '../components/TicketItem';
import Spacer from '../components/Spacer';
import {authContext, themeContext} from '../contexts/context';
import useApi from '../hooks/useApi';
import {getScreenHeight, getScreenWidth} from '../utils/domUtil';
import FastImage from 'react-native-fast-image';
import fonts from '../constants/fonts';

const Ticket1 = ({navigation}: any) => {
  const {theme} = useContext(themeContext);
  const {tokens, user_data}: any = useContext(authContext);

  const styles = useMemo(() => createStyles(theme), [theme]);
  const [dealerId, SetdealerId] = useState(user_data?.Id);
  const {apiCall} = useApi();
  const renderKeyExtractor = (item: any, index: any) => index.toString();

  const renderItem = useCallback(({item}: any) => {
    // console.log(item);
    return (
      <View style={styles.item}>
        <TicketItem
          item={item}
          //   action={() =>
          //     navigation.navigate('SalesOrderDetail', {
          //       item: item.Sales_Order_Lines__r.records,
          //     })
          //   }
        />
      </View>
    );
  }, []);

  const ticketListManager = useCallback(async () => {
    const res = await getTicket(apiCall, dealerId);
    return res;
  }, [apiCall, dealerId]);

  const {data, isLoading} = useQuery('ticketListManager', ticketListManager, {
    retry: 0,
    enabled: true,
  });

  if (isLoading) {
    return <FullScreenLoader />;
  }

  console.log('dataaaatickettt', data);

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <CustomStatusBar color={theme.primary} light />
      <View style={styles.screen}>
        <CustomNewHeader
          subtitle={"123456"}
          action={() => navigation.goBack()}
          title={"Ridham Kumar"}
        />

        <FlatList
          contentContainerStyle={styles.list}
          ListHeaderComponent={() => <Header dark title="Tickets" hide />}
          data={[1,2]}
          keyExtractor={renderKeyExtractor}
          renderItem={renderItem}
          ListFooterComponent={() => <Spacer height={getScreenHeight(3)} />}
          ListEmptyComponent={NotFound}
        />

        <TouchableOpacity
          onPress={() => navigation.navigate('Ticket')}
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
              {fontSize: getScreenHeight(1.5), color: theme.white},
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
    title: {
      fontFamily: fonts.bold,
      color: theme.black,
      fontSize: getScreenHeight(2),
    },
    customButton: {
      alignSelf: 'flex-end',
      backgroundColor: theme.primary,
      padding: getScreenHeight(1),
      borderRadius: getScreenHeight(2),
      flexDirection: 'row',
      position: 'absolute',
      bottom: getScreenHeight(10),
      left: getScreenWidth(72),
      alignItems: 'center',
    },
    icon: {
      height: getScreenHeight(4),
      width: getScreenHeight(4),
      marginRight: getScreenHeight(1),
    },
  });

export default Ticket1;
