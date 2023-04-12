import React, {
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,

} from 'react';
import {
    View,
    StyleSheet,
    Text,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import SimpleToast from 'react-native-simple-toast';
import { useQuery } from 'react-query';
import { StackActions } from '@react-navigation/native';

import {
    // getCartDetails,
    // placeOrder,
    updateCart,
    getUpdateCartDetails,
    updateOrderStatus
} from '../api/home';
import ArrowButton from '../components/ArrowButton';
import UpdateCartItem from '../components/UpdateCartItem';
// import moment from 'moment';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import CustomNewHeader from '../components/CustomNewHeader';
import CustomStatusBar from '../components/CustomStatusBar';
import DeleteModal from '../components/DeleteModal';
// import Divider from '../components/Divider';
import Header from '../components/Header';
import NotFound from '../components/NotFound';
// import Spacer from '../components/Spacer';
import fonts from '../constants/fonts';
import { authContext, themeContext } from '../contexts/context';
import useApi from '../hooks/useApi';
import { formatPrice, getScreenHeight, getScreenWidth } from '../utils/domUtil';
// import FullScreenLoader from '../components/FullScreenLoader';

const UpdateCart = (navigation: any) => {
    // console.log('navigation',navigation);
    const OrderId = navigation.route.params.item
    const { theme } = useContext(themeContext);
    const styles = useMemo(() => createStyles(theme), [theme]);
    const {
        setCartData,
        cart_Data,
        user_data,
        availableCreditLimit,
        setAvailableCreditLimit,
        user_id,

    }: any = useContext(authContext);
    const { apiCall } = useApi();
    const [selectedId, setSelectedId] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(null);
    const [orderLoading, setOrderLoading] = useState(false);
    const [orderDraftLoading, setOrderDraftLoading] = useState(false);
    const [priceData, setPriceData] = useState(null);

    const [totalQuality, setTotalQuality] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    const [totalQuantity, setTotalQuantity] = useState(0);


    const cartDetailsManager = useCallback(async () => {
        const res = await getUpdateCartDetails(apiCall, OrderId);
        return res;
    }, [apiCall]);

    useFocusEffect(
        React.useCallback(() => {
            console.log('updateData')
            refetch()
        }, [])
    );

    const calculationHandler = (data: any) => {
        let price = 0;
        let quantity = 0;
        data && data.map((item: any) => {
            quantity = quantity + item.item_quantity__c
            price = price + item.total__c
        }
        )
        setTotalQuantity(quantity)
        setTotalPrice(price)
    };
    useEffect(() => {
        calculationHandler(cart_Data);
        refetch()
    }, [cart_Data, priceData]);


    const deleteHandler = async (id: any) => {
        setSelectedId(id);
        setShowDeleteModal(null);
        let type = {
            "cartType": 'remove'
        }
        let item = {
            "sfid": id,
        }
        try {
            const res = await updateCart(apiCall, item, type.cartType);
            SimpleToast.show('Product deleted from cart sucessfully!');
            refetch();
        } catch (error) {
            console.log(error);
        }
    };


    const { refetch, isFetching } = useQuery(
        'getUpdatedCartDetail',
        cartDetailsManager,
        {
            retry: 0,
            enabled: true,
            onSuccess: data => {
                setCartData(data);
            },
        },
    );

    const renderItem = useCallback(
        ({ item, index }: any) => {
            return (
                <UpdateCartItem
                    priceData={priceData ? priceData : 0}
                    index={index}
                    selectedId={selectedId}
                    action={(item: any) => setShowDeleteModal(item)}
                    item={item}
                />
            );
        },
        [selectedId, priceData],
    );

    let data = {
        type: "Finalize"
    };
    const placeOrderManager = async () => {
        setOrderLoading(true);

        const res = await updateOrderStatus(apiCall, data.type, OrderId,);
        // SimpleToast.show(res.message);
        setOrderDraftLoading(false);
        navigation.navigation.dispatch(StackActions.popToTop());
        navigation.navigation.navigate('SalesOrderList');
    };


    const placeOrderDraftManager = async () => {
        setOrderDraftLoading(true);
        console.log('cart_Data', cart_Data)
        let data = {
            type: "Retail Draft"
        };
        const res = await updateOrderStatus(apiCall, data.type, OrderId,);
        setOrderDraftLoading(false);
        navigation.navigation.dispatch(StackActions.popToTop());
        navigation.navigation.navigate('SalesOrderList');

    };



    return (
        <>
            {showDeleteModal ? (
                <DeleteModal
                    title="Are you sure?"
                    subtile="you wanted to remove this item from cart."
                    no={() => {
                        setShowDeleteModal(null);
                    }}
                    yes={() => {
                        deleteHandler(showDeleteModal);
                    }}
                />
            ) : null}
            <SafeAreaView edges={['top']} style={styles.safe}>
                <CustomStatusBar color={theme.primary} light />
                <View style={styles.screen}>
                    <CustomNewHeader
                        subtitle={'123456'}
                        action={() => navigation.navigation.goBack()}
                        title={"Ridham Kumar"}
                    />
                    <KeyboardAwareScrollView
                        enableOnAndroid={true}
                        bounces={false}
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}>

                        <View style={styles.header}>
                            <Header dark title="Update Order" hide />
                        </View>
                        <TouchableOpacity
                            onPress={() => navigation.navigation.navigate('UpdateAddProducts', { OrderId: OrderId })}
                            style={styles.customButton}>
                            <FastImage
                                source={require('../assets/images/common/plus.png')}
                                style={styles.icon}
                                // resizeMode="contain"
                                tintColor={theme.white}
                            />
                            <Text
                                style={[
                                    styles.title,
                                    { fontSize: getScreenHeight(1.5), color: theme.white },
                                ]}>
                                Add Product
                            </Text>
                        </TouchableOpacity>


                        <View style={styles.header}>
                            <View style={styles.row}>



                                <View style={styles.newColum}>
                                    <Text style={styles.title}>Total Order Qty</Text>
                                    <Text numberOfLines={1} style={styles.subtitle}>
                                        {totalQuantity}
                                    </Text>
                                </View>


                                <View>


                                    <View style={styles.newColum}>
                                        <Text style={styles.title}>Total Price</Text>
                                        <Text numberOfLines={1} style={styles.subtitle}>
                                            {formatPrice(totalPrice)}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>


                        {/* {console.log('cartdata',cart_Data)} */}
                        <FlatList
                            ListHeaderComponent={() =>
                                isFetching ? (
                                    <ActivityIndicator
                                        size={'small'}
                                        style={{ margin: getScreenHeight(1) }}
                                        color={theme.primary}
                                    />
                                ) : null
                            }
                            data={cart_Data}

                            keyExtractor={(item, index) => index.toString()}
                            renderItem={renderItem}
                            ListEmptyComponent={isFetching ? null : NotFound}
                        />

                        {cart_Data?.length ? (
                            <View style={styles.buttonContanier}>

                                <View style={{ marginLeft: '28%' }}>
                                    <ArrowButton
                                        loading={orderDraftLoading}
                                        action={placeOrderDraftManager}
                                        title="Draft Order"
                                    />
                                </View>

                                <View style={{ marginLeft: '15%' }}>
                                    <ArrowButton
                                        loading={orderLoading}
                                        action={placeOrderManager}
                                        title="Finalize Order"
                                    />
                                </View>

                            </View>
                        ) : null}
                    </KeyboardAwareScrollView>
                </View>
            </SafeAreaView>
        </>
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
        row: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            marginTop: getScreenHeight(-5)
        },
        newColum: {
            marginVertical: getScreenHeight(1),
        },
        title: {
            fontFamily: fonts.regular,
            color: theme.black,
            fontSize: getScreenHeight(1.6),
        },
        body: {
            fontFamily: fonts.regular,
            color: theme.black,
            fontSize: getScreenHeight(1.4),
        },
        subtitle: {
            fontFamily: fonts.bold,
            color: theme.black,
            fontSize: getScreenHeight(1.6),
        },
        addressContanier: {
            paddingHorizontal: getScreenHeight(2),
        },
        newRow: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            flex: 1,
        },
        icon: {
            height: getScreenHeight(2),
            width: getScreenHeight(2),
        },
        footer: {
            margin: getScreenHeight(2),
            backgroundColor: theme.white,
            borderRadius: getScreenHeight(1),
            overflow: 'hidden',
        },
        footerheader: {
            padding: getScreenHeight(1),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        tableContanier: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: getScreenHeight(1),
        },
        line: {
            height: getScreenHeight(10),
            backgroundColor: theme.black,
            width: getScreenHeight(0.1),
            marginHorizontal: getScreenHeight(2),
        },
        table: {
            flex: 1,
        },
        buttonContanier: {
            width: '50%',
            // alignSelf: 'center',
            alignContent: 'space-between',
            marginVertical: getScreenHeight(4),
            flexDirection: 'row'
        },
        submitButtons: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            flex: 1,
        },
        customButton: {
            alignSelf: 'flex-start',
            backgroundColor: theme.primary,
            padding: getScreenHeight(2),
            borderRadius: getScreenHeight(2),
            flexDirection: 'row',
            position: "relative",
            bottom: getScreenHeight(6),
            left: getScreenWidth(65),
            alignItems: 'center',
        },
    });

export default UpdateCart;
