//Experiment


import React, { useCallback, useContext, useMemo, useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SimpleToast from 'react-native-simple-toast';
import { useQuery } from 'react-query';
import { getAllOffers, addToCart } from '../api/home';
import Toast from 'react-native-simple-toast';


import CustomNewHeader from '../components/CustomNewHeader';
import CustomStatusBar from '../components/CustomStatusBar';
import Header from '../components/Header';

import { authContext, themeContext } from '../contexts/context';
import Spacer from '../components/Spacer';
import useApi from '../hooks/useApi';

import { getScreenHeight } from '../utils/domUtil';
import { navigate } from '../services/Routerservices';


const ApplyOfferScreen = ({ route, navigation }: any) => {
    const { theme } = useContext(themeContext);
    const { tokens, user_data }: any = useContext(authContext);
    const { apiCall } = useApi();
    const styles = useMemo(() => createStyles(theme), [theme]);
    let navParams = route?.params?.detail;
    let navQuantity = route?.params?.totalquantity

    const [updatedPrice, SetUpdatedPrice] = useState(0);
    const [freeProduct, SetFreeProduct] = useState('')

    // console.log("navParams", navParams, updatedPrice)

    const salesOffersManager = useCallback(async () => {

        const res = await getAllOffers(apiCall, user_data.sfid, navParams.sfid);
        // console.log('res', res);
        return res
    }, [apiCall]);

    const { data, isLoading } = useQuery(
        'salesOffersManager',
        salesOffersManager,
        {
            retry: 0,
            enabled: true,
        },
    );

    const addToCartManager = useCallback(
        async (UpdatedPrice?: any, OfferProduct?: any) => {

            let records =
            {
                // "sfid":"a1G9D000001G8o6UAC", //Cart Item SFID to be sent in update,remove
                "quantity__c": navQuantity, //Quantity To Be Sent In create,addqty,dec,qty
                "price": UpdatedPrice == 0 ? navParams.mop__c : UpdatedPrice, //Price to Be Sent In create
                "product__c": navParams.sfid,//Product T
                "offer_product__c": OfferProduct ? OfferProduct : ''
            }
            let type = {
                "cartType": 'create'
            }
            try {
                // console.log(records)
                const res = await addToCart(apiCall, { records }, type.cartType);

                console.log(res)
            } catch (error) {
                // console.log('Error', error);
            }
        },
        [updatedPrice],
    );



    const applyOfferCalc = (item: any) => {
        let UpdatedPrice = 0

        if (item.scheme_format__c == 'BQFD - Bundle Qty Fixed discount') {

            UpdatedPrice = navParams.mop__c - item.fixed_discount__c

            addToCartManager(UpdatedPrice)
            Toast.show('Offer Applied');

            navigate('PlaceOrder')


        }
        if (item.scheme_format__c == 'BQPD - Bundle Qty Percentage discount') {
            UpdatedPrice = (navParams.mop__c) / 100 * (100 - item.percentage_discount__c)

            addToCartManager(UpdatedPrice)
            Toast.show('Offer Applied');

            navigate('PlaceOrder')

        }



        if (item.scheme_format__c == 'BQXF - Buy Item1(1pc), Item2 (2pc) get Item3 (2pc)') {          //Static need to change
            if (navQuantity >= 2) {
                SetFreeProduct(item?.offer_product__c)
                addToCartManager(UpdatedPrice, item.offer_product__c)
                Toast.show('Offer Applied');

                navigate('PlaceOrder')
            }
            else {
                Toast.show('Offer can not be Applied , Please enter a valid Quantity');
            }

        }

        // console.log('item', item)
        if (item.scheme_format__c == 'Slab') {

            item.slabs.map((obj: any) => {
                if (navQuantity >= Number(obj.from_slab_c__c) && navQuantity <= Number(obj.to_slab__c)) {
                    if (obj.slab_value_type__c == 'Percentage') {
                        UpdatedPrice = (navParams.mop__c) / 100 * (100 - obj.discount__c)
                    }
                    else {
                        UpdatedPrice = navParams.mop__c - obj.discount__c
                    }
                }
                return UpdatedPrice

            })


            // console.log("UpdatedPrice", UpdatedPrice)
            addToCartManager(UpdatedPrice)
            Toast.show('Offer Applied');
            navigate('PlaceOrder')



        }







    }


    const renderItem = useCallback(({ item }: any) => {
        return (

            <View style={styles.contanier}>

                <View style={{ width: '60%' }}>
                    <Text>
                        {item.scheme_name__c}
                    </Text>
                </View>

                <TouchableOpacity style={styles.addButton} onPress={() => applyOfferCalc(item)}>
                    <Text style={{ fontSize: 9, fontWeight: '600', color: theme.white }}>
                        Apply & Add to Cart
                    </Text>
                </TouchableOpacity>

            </View>
        );
    }, []);



    return (
        <SafeAreaView edges={['top']} style={styles.safe}>

            <CustomStatusBar color={theme.black} light />
            <View style={styles.screen}>
                <CustomNewHeader
                    subtitle={'123456'}
                    action={() => navigation.goBack()}
                    title={'Ridham Kumar'}
                />
                <FlatList
                    ListHeaderComponent={() => <Header dark title="Available Offers" hide />}
                    contentContainerStyle={styles.list}
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItem}
                    ListFooterComponent={() => <Spacer height={getScreenHeight(3)} />}
                />
            </View>
        </SafeAreaView>
    );
};

const createStyles = (theme: any) =>
    StyleSheet.create({
        contanier: {
            padding: getScreenHeight(1),
            backgroundColor: theme.white,
            borderRadius: getScreenHeight(1),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: getScreenHeight(2),
            marginTop: getScreenHeight(2)
            // width: getScreenHeight(40)
        },
        screen: {
            flex: 1,
            backgroundColor: '#F2F2F2',
        },
        safe: {
            flex: 1,
            backgroundColor: theme.black,
        },
        addButton: {
            padding: getScreenHeight(1),
            backgroundColor: theme.primary,
            borderRadius: getScreenHeight(1),
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
    });

export default ApplyOfferScreen;


