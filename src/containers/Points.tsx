import React, {useCallback, useContext, useMemo} from 'react';
import {View, StyleSheet, Text, ScrollView, FlatList} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SafeAreaView} from 'react-native-safe-area-context';
import ArrowButton from '../components/ArrowButton';
import CustomButton from '../components/CustomButton';

import CustomNewHeader from '../components/CustomNewHeader';
import CustomStatusBar from '../components/CustomStatusBar';
import Divider from '../components/Divider';
import Header from '../components/Header';
import PointItem from '../components/PointItem';
import Spacer from '../components/Spacer';
import fonts from '../constants/fonts';
import {authContext, themeContext} from '../contexts/context';
import {getScreenHeight} from '../utils/domUtil';

const data = [
  {
    title: 'Total Point Earned',
    value: '163750',
  },
  {
    title: 'Points Redeemed',
    value: 1537275,
  },
  {
    title: 'Points Available',
    value: 10475,
  },
];

const Points = ({navigation}: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const {user_data, modal_icon, setIcon}: any = useContext(authContext);
  const renderItem = useCallback(({item}: any) => {
    return (
      <View style={styles.item}>
        <PointItem item={item} />
      </View>
    );
  }, []);

  const keyExtractor = (item: any, index: any) => index.toString();

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <CustomStatusBar color={theme.black} light />
      <View style={styles.screen}>
        <CustomNewHeader
          subtitle={user_data?.Customer_No__c ? user_data?.Customer_No__c : ''}
          action={() => navigation.goBack()}
          title={user_data?.Name ? user_data?.Name : ''}
        />

        <FlatList
          data={data}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ListHeaderComponent={() => (
            <Header dark title="Points Summary" hide />
          )}
          contentContainerStyle={styles.list}
        />
        <View style={styles.customButton}>
          <ArrowButton title="Reedeem" />
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
    list: {
      paddingHorizontal: getScreenHeight(2),
    },
    item: {
      marginTop: getScreenHeight(2),
    },
    customButton: {
      margin: getScreenHeight(2),
    },
  });

export default Points;
