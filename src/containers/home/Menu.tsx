import React, {useCallback, useContext, useMemo} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Linking,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useFocusEffect} from '@react-navigation/native';

import CustomStatusBar from '../../components/CustomStatusBar';
import DrawerItem from '../../components/DrawerItem';
import Spacer from '../../components/Spacer';
import fonts from '../../constants/fonts';
import Images from '../../constants/images';
import {
  facebook,
  insta,
  linkedin,
  privacyPolicyLink,
  twitter,
  youtube,
  myk
} from '../../constants/links';
import {authContext, themeContext} from '../../contexts/context';
import {getScreenHeight} from '../../utils/domUtil';
import {PaymentButton} from '../../utils/paymentHandler';
import {useDispatch, useSelector} from 'react-redux';
import {loginManager} from '../../redux/auth';
const Menu = ({navigation}: any) => {
  const {theme} = useContext(themeContext);
  const {logOut, user_data, setProductSearch}: any = useContext(authContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  const logoutManager = useCallback(async () => {
    logOut();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      // setProductSearch('');
    }, []),
  );

  const data = [
    // {
    //   name: 'Home',
    //   icon: Images.home,
    //   action: () => navigation.navigate('SalesAppHome'),
    // },
    {
      name: 'Order',
      icon: Images.createsalesorder,
      action: () => navigation.navigate('PlaceOrder'),
    },
    {
      name: 'Order History',
      icon: Images.salesorderlist,
      action: () => navigation.navigate('SalesOrderList'),
    },
    {
      name: 'Leads',
      icon: Images.accountsummary,
      action: () => navigation.navigate('LeadScreen'),
    },
    {
      name: 'Influencers',
      icon: Images.creditdebitnotes,
      action: () => navigation.navigate('InfluencerScreen'),
    },
    // {
    //   name: 'Purchase Summary',
    //   icon: Images.purchasesummary,
    //   action: () => navigation.navigate('PurchaseSummary'),
    // },

    // {
    //   name: 'New Warranty',
    //   icon: Images.newwarrenty,
    //   action: () => navigation.navigate('CustomerInfo'),
    // },
    // {
    //   name: 'Warranty List',
    //   icon: Images.warrantylist,
    //   action: () => navigation.navigate('AllWarranty'),
    // },
    // {
    //   name: 'New Claim',
    //   icon: Images.newcliam,
    //   action: () => navigation.navigate('NewClaim'),
    // },
    // {
    //   name: 'Claim List',
    //   icon: Images.claimlist,
    //   action: () => navigation.navigate('AllClaims'),
    // },
    {
      name: 'Complaints',
      icon: Images.ticket,
      action: () => {},

      // action: () => navigation.navigate('Ticket1'),
    },
    {
      name: 'Requests',
      icon: Images.Requests,
      action: () => {},

      // action: () => navigation.navigate('Points'),
    },
    {
      name: 'Survey',
      icon: Images.survey,
      action: () => {},

      // action: () => navigation.navigate('Survey'),
    },
    {
      name: 'Events',
      icon: Images.securitydeposit,
      action: () => {},
      // action: () => navigation.navigate('SecurityDeposit'),
    },
    // {
    //   name: 'TDS/TCS Certificate ',
    //   icon: Images.tdstcscertificate,
    //   action: () => navigation.navigate('TDSReport'),
    // },

   
    // {
    //   name: 'Credit Limit Proposal',
    //   icon: Images.creditlimitproposal,
    //   action: () => navigation.navigate('CreditProposal'),
    // },

    // {
    //   name: 'Promotional Catalogue',
    //   icon: Images.ycnmerchandise,
    //   action: () => navigation.navigate('CreateYcnMerchandise'),
    // },
    // {
    //   name: 'Promotional Orders',
    //   icon: Images.ycnorderlist,
    //   action: () => navigation.navigate('YCNMerchandise'),
    // },
    // {
    //   name: 'YCN Agreement',
    //   icon: Images.ycnargreement,
    //   action: () => navigation.navigate('YCNAgreement'),
    // },
    // {
    //   name: 'Credit Summary',
    //   icon: Images.creditsummary,
    //   action: () => navigation.navigate('CreditSummary'),
    // },
    // {
    //   name: 'Ageing Summary',
    //   icon: Images.agesummary,
    //   action: () => navigation.navigate('AgeingSummary'),
    // },
    // {
    //   name: 'Contact us',
    //   icon: Images.contactus,
    //   action: () =>
    //     Linking.openURL('https://www.SalesApp-india.com/page/contact-us'),
    // },
    // {
    //   name: 'Make Payment',
    //   icon: Images.makepayment,
    //   action: () => PaymentButton(),
    // },
    // {
    //   name: 'Product Policy',
    //   icon: Images.productpolicy,
    //   action: () => navigation.navigate('ProductPolicy'),
    // },
    // {
    //   name: 'Warranty policy',
    //   icon: Images.warrentypolicy,
    //   action: () =>
    //     Linking.openURL('https://www.SalesApp-india.com/page/warranty'),
    // },
    // {
    //   name: '',
    //   icon: '',
    // },
    
    {
      name: 'Scheme and Credit Notes',
      icon: Images.about,
      action: () => {},
    },
    {
      name: '',
      icon: '',
    },
    {
      name: '',
      icon: '',
    },
  ];

  const renderHeader = useCallback(() => {
    return (
      <TouchableOpacity style={styles.header}
      onPress={() => navigation.navigate('MyProfile')}>
      
        
        <FastImage
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/No-photo-m.png',
          }}
          style={styles.profileImage}
        />
        <View style={{marginLeft: getScreenHeight(2)}}>
          <Text style={styles.title}>
            RIDHAM KUMAR
          </Text>
          <Text style={styles.subtitle}>
            123456
          </Text>
        </View>
      </TouchableOpacity>
    );
  }, []);

  const renderKeyExtractor = useCallback(
    (item: any, index: number) => index.toString(),
    [],
  );

  const renderItem = useCallback(({item}: any) => {
    return (
      <View style={{width: '30%', marginTop: getScreenHeight(2)}}>
        <DrawerItem action={item.action} item={item} />
      </View>
    );
  }, []);

  const renderFotter = () => {
    return (
      <View>
        <Spacer height={getScreenHeight(4)} />
        <View style={styles.row}>
          {/* <TouchableOpacity onPress={() => Linking.openURL(myk)}>
            <Text style={styles.fotterText}>Privacy policy</Text>
          </TouchableOpacity> */}
          {/* <View style={styles.divider} /> */}
          {/* <TouchableOpacity
            onPress={() => navigation.navigate('TermsAndConditions')}>
            <Text style={styles.fotterText}>Terms and conditions</Text>
          </TouchableOpacity> */}
        </View>
        <Spacer height={getScreenHeight(1)} />
        <View style={styles.socialContanier}>
          <TouchableOpacity onPress={() => Linking.openURL(myk)}>
            <FastImage
              tintColor={theme.primary}
              style={styles.icon}
              resizeMode="contain"
              source={Images.instagram}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL(myk)}>
            <FastImage
              tintColor={theme.primary}
              style={styles.icon}
              resizeMode="contain"
              source={Images.facebook}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL(myk)}>
            <FastImage
              tintColor={theme.primary}
              style={styles.icon}
              resizeMode="contain"
              source={Images.twitter}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL(myk)}>
            <FastImage
              tintColor={theme.primary}
              style={styles.icon}
              resizeMode="contain"
              source={Images.youtube}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL(myk)}>
            <FastImage
              tintColor={theme.primary}
              style={[
                styles.icon,
                {
                  width: getScreenHeight(2.5),
                  height: getScreenHeight(2.5),
                },
              ]}
              resizeMode="contain"
              source={Images.linkedin}
            />
          </TouchableOpacity>
        </View>
        <Spacer height={getScreenHeight(4)} />
        <TouchableOpacity onPress={logoutManager}>
          <Text style={styles.logout}>Logout</Text>
        </TouchableOpacity>
        <Spacer height={getScreenHeight(4)} />
      </View>
    );
  };

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <CustomStatusBar color={theme.primary} light />
      <View style={styles.screen}>
        <FlatList
          bounces={false}
          data={data}
          columnWrapperStyle={{justifyContent: 'space-evenly'}}
          numColumns={3}
          ListHeaderComponent={renderHeader}
          renderItem={renderItem}
          keyExtractor={renderKeyExtractor}
          ListFooterComponent={renderFotter}
        />
      </View>
    </SafeAreaView>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.white,
    },
    safe: {
      flex: 1,
      backgroundColor: theme.black,
    },
    header: {
      height: getScreenHeight(18),
      backgroundColor: theme.primary,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: getScreenHeight(2),
    },
    profileImage: {
      height: getScreenHeight(12),
      width: getScreenHeight(12),
      borderRadius: getScreenHeight(12),
      borderColor: theme.primary_light,
      borderWidth: getScreenHeight(0.2),
    },
    title: {
      color: theme.white,
      fontFamily: fonts.bold,
      fontSize: getScreenHeight(2),
    },
    subtitle: {
      color: theme.white,
      fontFamily: fonts.medium,
      fontSize: getScreenHeight(1.6),
      marginTop: getScreenHeight(0.5),
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '80%',
      alignSelf: 'center',
    },
    fotterText: {
      fontFamily: fonts.regular,
      fontSize: getScreenHeight(1.6),
      color: theme.black,
      textDecorationLine: 'underline',
    },
    divider: {
      backgroundColor: theme.black,
      height: getScreenHeight(2),
      width: getScreenHeight(0.1),
    },
    socialContanier: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
    },
    icon: {
      width: getScreenHeight(3),
      height: getScreenHeight(3),
      marginRight: getScreenHeight(1),
    },
    logout: {
      color: theme.black,
      fontFamily: fonts.bold,
      fontSize: getScreenHeight(2),
      alignSelf: 'center',
    },
  });

export default Menu;
