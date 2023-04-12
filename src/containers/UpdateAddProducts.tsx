import React, {useCallback, useContext, useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

// Files
import {authContext, themeContext} from '../contexts/context';
import CustomStatusBar from '../components/CustomStatusBar';
import {getScreenHeight, getScreenWidth} from '../utils/domUtil';
import fonts from '../constants/fonts';
import CustomSearchBar from '../components/CustomSearchBar';
import CustomBackHeader from '../components/CustomBackHeader';
import CustomRadioButton from '../components/CustomRadioButton';
// import DiscountedProducts from './DiscountedProducts';
import AllProducts from './AllProducts';
import Spacer from '../components/Spacer';
import AllUpdateProductsItems from './AllUpdateProductsItems';

const UpdateAddProducts = (navigation: any) => {
    console.log(navigation)

    const OrderId = navigation.route.params.OrderId
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const {setProductSearch, productSearch}: any =
    useContext(authContext);

  const Tab = createMaterialTopTabNavigator();


  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <CustomStatusBar light color={theme.primary} />
      <View style={styles.screen}>
        <CustomBackHeader
          black
          cart
          rightIconAction={() =>
           navigation.navigation.navigate('UpdateCart',{item: OrderId})
          }
          action={() => navigation.navigation.goBack()}
          title="Update Order"
        //   cartCount={cart_Data && cart_Data.length?cart_Data.length : 0}
        />
        <Spacer />
        <View style={{width: '100%', paddingHorizontal: getScreenHeight(2)}}>
          <CustomSearchBar
            rightAction={() => navigation.navigate('OrderFilters')}
            value={productSearch}
            action={setProductSearch}
            placeholder="Search By Product Name or Product Code"
            rightIcon={true}
          />
        </View>
        <AllUpdateProductsItems
        orderId={OrderId}
        />
        
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
      backgroundColor: theme.primary,
    },
    header: {
      padding: getScreenHeight(2),
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconContanier: {
      width: '10%',
      height: getScreenHeight(6),
      justifyContent: 'center',
    },
    icon: {
      width: getScreenHeight(3.5),
      height: getScreenHeight(3.5),
      alignSelf: 'center',
    },
    dot: {
      width: getScreenHeight(2),
      height: getScreenHeight(2),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.white,
      borderRadius: getScreenHeight(2),
      position: 'absolute',
      right: -getScreenHeight(0.5),
      top: 0,
    },
    cartText: {
      fontFamily: fonts.bold,
      color: theme.accent,
      fontSize: getScreenHeight(1.2),
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingBottom: getScreenHeight(1),
      paddingHorizontal: getScreenHeight(2),
    },
    item: {
      marginBottom: getScreenHeight(2),
    },
    flatlist: {
      padding: getScreenHeight(2),
    },
    spacer: {
      width: getScreenWidth(5),
    },
    tabContanier: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      height: getScreenHeight(4),
      alignItems: 'center',
    },
  });

export default UpdateAddProducts;
