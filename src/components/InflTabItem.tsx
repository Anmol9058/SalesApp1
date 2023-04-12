import React, { useContext, useMemo } from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import fonts from '../constants/fonts';

import { themeContext } from '../contexts/context';
import { formatPrice, getScreenHeight } from '../utils/domUtil';
import Spacer from './Spacer';

const InflTabItem = (props: any) => {
    const { theme } = useContext(themeContext);
    const styles = useMemo(() => createStyles(theme), [theme]);
// console.log("props",props.item)
    return (
        <Pressable onPress={props.action} style={styles.contanier}>
            <View style={styles.header}>
                <Text
                    style={[
                        styles.title2,
                        { fontFamily: fonts.bold, color: theme.primary },
                    ]}>
                    Name: {props.item.name}
                </Text>
                <Text style={styles.title2}>
                    Role : {props.item.role__c}
                </Text>
            </View>

            <View style={styles.header}>
                <Text
                    style={[
                        styles.title2,

                    ]}>
                    Mobile No.: {props.item.phone}
                </Text>

            </View>
            <View style={styles.header}>
                <Text
                    style={[
                        styles.title,

                    ]}>
                    Email Address.: {props.item.email}
                </Text>

            </View>
            {/* <View style={styles.header}>
                <Text
                    style={[
                        styles.title2,

                    ]}>
                    Pincode - 201301
                </Text>
                <Text style={styles.title2}>
                    Last Event Attended Date: {'2022/11/15'}
                </Text>
                <Text
                    style={[
                        styles.title,

                    ]}>

                </Text>

            </View> */}


            {/* <View style={styles.divider} /> */}


            <Spacer height={getScreenHeight(2)} />


        </Pressable>
    );
};

const createStyles = (theme: any) =>
    StyleSheet.create({
        contanier: {
            backgroundColor: theme.light_accent,
            borderRadius: getScreenHeight(1),
            overflow: 'hidden',
        },
        header: {
            backgroundColor: theme.white,
            padding: getScreenHeight(1),
            flexDirection: 'row',
            alignContent: 'space-between',
            opacity: 3

        },
        title2: {
            fontFamily: fonts.medium,
            fontSize: getScreenHeight(1.4),
            color: theme.black,
            width: getScreenHeight(20)
        },

        title: {
            fontFamily: fonts.medium,
            fontSize: getScreenHeight(1.4),
            color: theme.black,
            width: getScreenHeight(70)
        },
        row: {
            flexDirection: 'row',
            // justifyContent: 'space-between',
            alignItems: 'center',
        },

        column: {
            alignItems: 'center',
        },
        footertitle: {
            fontFamily: fonts.medium,
            fontSize: getScreenHeight(1.4),
            color: theme.white,
        },
        divider: {
            // backgroundColor: theme.black,
            height: getScreenHeight(0.1),
            width: '100%',
        },
    });

export default InflTabItem;
