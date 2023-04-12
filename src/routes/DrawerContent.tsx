import React, {useContext} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import DrawerFotter from '../components/DrawerFotter';

import DrawerItem from '../components/DrawerItem';
import DrawerProfileItem from '../components/DrawerProfileItem';
import LogoutItem from '../components/LogoutItem';
import {authContext, themeContext} from '../contexts/context';

const DrawerContent = (props: any) => {
  const {logOut}: any = useContext(authContext);
  const {theme}: any = useContext(themeContext);
  return (
    <SafeAreaView
      edges={['top']}
      style={{flex: 1, backgroundColor: theme.primary_light}}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <DrawerProfileItem />
        <LinearGradient colors={['#000000', '#000000']} style={styles.screen}>
          <DrawerItem
            action={() => {
              props.navigation.navigate('Targets');
            }}
            title="Home"
            icon={require('../assets/images/drawer/home.png')}
          />
          <DrawerItem
            action={() => {
              props.navigation.navigate('PlaceOrder');
            }}
            title="Create Sales Order"
            icon={require('../assets/images/drawer/home.png')}
          />

          <DrawerItem
            action={() => {
              props.navigation.navigate('SalesOrderList');
            }}
            title="Sale Order List"
            icon={require('../assets/images/drawer/home.png')}
          />

          <DrawerItem
            action={() => {
              props.navigation.navigate('LeadScreen');
            }}
            title="Account Summary"
            icon={require('../assets/images/drawer/home.png')}
          />

          <DrawerItem
            action={() => {
              props.navigation.navigate('CredDebtReport');
            }}
            title="Credit/Debit Notes"
            icon={require('../assets/images/drawer/home.png')}
          />

          <DrawerItem
            action={() => {
              props.navigation.navigate('PurchaseSummary');
            }}
            title="Purchase Summary"
            icon={require('../assets/images/drawer/home.png')}
          />

          <DrawerItem
            action={() => {
              props.navigation.navigate('CustomerInfo');
            }}
            title="New Warranty"
            icon={require('../assets/images/drawer/home.png')}
          />

          <DrawerItem
            action={() => {
              props.navigation.navigate('NewClaim');
            }}
            title="New Claim"
            icon={require('../assets/images/drawer/home.png')}
          />

          <DrawerItem
            action={() => {
              props.navigation.navigate('Points');
            }}
            title="Point Summary"
            icon={require('../assets/images/drawer/home.png')}
          />

          <DrawerItem
            action={() => {
              props.navigation.navigate('SecurityDeposit');
            }}
            title="Security Deposit" // pending
            icon={require('../assets/images/drawer/home.png')}
          />

          <DrawerItem
            action={() => {
              props.navigation.navigate('TDSReport');
            }}
            title="TDS/TCS Certificate"
            icon={require('../assets/images/drawer/home.png')}
          />

          <DrawerItem
            action={() => {
              props.navigation.navigate('YCNAgreement');
            }}
            title="YCN Agreement"
            icon={require('../assets/images/drawer/home.png')}
          />

          <DrawerItem
            action={() => {
              props.navigation.navigate('Survey');
            }}
            title="Survey"
            icon={require('../assets/images/drawer/home.png')}
          />

          <DrawerItem
            action={() => {
              props.navigation.navigate('PurchaseSummary');
            }}
            title="YCN Merchandise"
            icon={require('../assets/images/drawer/home.png')}
          />

          <DrawerItem
            action={() => {
              props.navigation.navigate('ContactUs');
            }}
            title="Contact Us"
            icon={require('../assets/images/drawer/home.png')}
          />

          <DrawerItem
            action={() => {
              props.navigation.navigate('PurchaseSummary');
            }}
            title="Make Payment"
            icon={require('../assets/images/drawer/home.png')}
          />

          <DrawerItem
            action={() => {
              props.navigation.navigate('ProductPolicy');
            }}
            title="Product Policy"
            icon={require('../assets/images/drawer/home.png')}
          />

          <DrawerItem
            action={() => {
              props.navigation.navigate('WarrantyPolicy');
            }}
            title="Warranty policy"
            icon={require('../assets/images/drawer/home.png')}
          />

          <DrawerItem
            action={() => {
              props.navigation.navigate('FAQ');
            }}
            title="FAQ"
            icon={require('../assets/images/drawer/home.png')}
          />

          <DrawerItem
            action={() => {
              props.navigation.navigate('Security');
            }}
            title="Security"
            icon={require('../assets/images/drawer/home.png')}
          />

          <DrawerItem
            action={() => {
              props.navigation.navigate('About');
            }}
            title="About Us"
            icon={require('../assets/images/drawer/home.png')}
          />

          <DrawerFotter
            leftAction={() => props.navigation.navigate('PrivacyPolicy')}
            rightAction={() => props.navigation.navigate('Terms')}
          />

          <LogoutItem
            action={logOut}
            type="logout"
            title="logout"
            icon={require('../assets/images/drawer/home.png')}
          />
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default DrawerContent;
