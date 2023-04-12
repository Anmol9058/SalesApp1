import React, {useCallback, useContext, useMemo} from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import CustomNewHeader from '../components/CustomNewHeader';
import CustomStatusBar from '../components/CustomStatusBar';
import Header from '../components/Header';
import Spacer from '../components/Spacer';
import fonts from '../constants/fonts';
import {authContext, themeContext} from '../contexts/context';
import {getScreenHeight} from '../utils/domUtil';

const ContactUs = ({navigation}: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const {tokens, cart_Data, user_data, setCartData}: any =
    useContext(authContext);

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <CustomStatusBar color={theme.black} light />
      <View style={styles.screen}>
        <CustomNewHeader
          action={() => navigation.goBack()}
          subtitle={user_data?.Customer_No__c ? user_data?.Customer_No__c : ''}
          title={user_data?.Name ? user_data?.Name : ''}
        />
        <ScrollView style={styles.scroll}>
          <Header dark hide title="Contact us" />
          <Spacer height={getScreenHeight(2)} />

          <View style={styles.tableContanier}>
            <View style={styles.header}>
              <View style={{width: '30%'}}>
                <Text style={styles.title}>Position</Text>
              </View>

              <View style={{width: '40%'}}>
                <Text style={styles.title}>Name</Text>
              </View>

              <View style={{flex: 1}}>
                <Text style={styles.title}>Mobile No</Text>
              </View>
            </View>

            <View style={styles.fotter}>
              <View style={styles.fotterItem}>
                <View style={{width: '30%'}}>
                  <Text style={styles.subtitle}>SE</Text>
                </View>

                <View style={{width: '40%'}}>
                  <Text style={styles.subtitle}>Arun h</Text>
                </View>

                <View style={{flex: 1}}>
                  <Text style={styles.subtitle}>7748882555</Text>
                </View>
              </View>

              <View style={styles.fotterItem}>
                <View style={{width: '30%'}}>
                  <Text style={styles.subtitle}>DSM</Text>
                </View>

                <View style={{width: '40%'}}>
                  <Text style={styles.subtitle}>Saleel Kumar</Text>
                </View>

                <View style={{flex: 1}}>
                  <Text style={styles.subtitle}>9500095499</Text>
                </View>
              </View>

              <View style={styles.fotterItem}>
                <View style={{width: '30%'}}>
                  <Text style={styles.subtitle}>RSM</Text>
                </View>

                <View style={{width: '40%'}}>
                  <Text style={styles.subtitle}>Josepaul</Text>
                </View>

                <View style={{flex: 1}}>
                  <Text style={styles.subtitle}>9977882772</Text>
                </View>
              </View>

              <View style={styles.fotterItem}>
                <View style={{width: '30%'}}>
                  <Text style={styles.subtitle}>ASM</Text>
                </View>

                <View style={{width: '40%'}}>
                  <Text style={styles.subtitle}>Aman</Text>
                </View>

                <View
                  style={{
                    flex: 1,
                  }}>
                  <Text style={styles.subtitle}>9855852411</Text>
                </View>
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
    scroll: {
      paddingHorizontal: getScreenHeight(2),
    },
    item: {
      marginTop: getScreenHeight(2),
    },
    tableContanier: {
      overflow: 'hidden',
    },
    header: {
      borderTopRightRadius: getScreenHeight(1),
      borderTopLeftRadius: getScreenHeight(1),
      backgroundColor: theme.primary,
      padding: getScreenHeight(1),
      flexDirection: 'row',
      alignItems: 'center',
    },
    title: {
      fontFamily: fonts.semiBold,
      color: theme.white,
      fontSize: getScreenHeight(1.6),
    },
    subtitle: {
      fontFamily: fonts.regular,
      color: theme.black,
      fontSize: getScreenHeight(1.6),
    },
    fotter: {
      backgroundColor: theme.white,
      paddingHorizontal: getScreenHeight(1),
    },
    fotterItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: getScreenHeight(1),
      borderColor: theme.black,
      borderBottomWidth: getScreenHeight(0.1),
    },
  });

export default ContactUs;
