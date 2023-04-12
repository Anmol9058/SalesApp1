import React, {useContext, useMemo} from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

import CustomStatusBar from '../../components/CustomStatusBar';
import {themeContext} from '../../contexts/context';
import CustomHeader from '../../components/CustomHeader';
import {getScreenHeight, getScreenWidth} from '../../utils/domUtil';
import fonts from '../../constants/fonts';
import CustomCircularProgressBar from '../../components/CustomCircularProgressBar';
import Divider from '../../components/Divider';
import Column from '../../components/Column';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Header from '../../components/Header';

const HighLights = ({navigation}) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <SafeAreaView
    edges={["top"]}
      style={styles.screen}>
      <CustomStatusBar color={theme.white} />
      <View style={styles.screen}>
        <CustomHeader
        action = {() => navigation.openDrawer()}
        />
        <LinearGradient
          colors={['#000000', '#606060']}
          style={styles.linearGradient}>
          <ScrollView
            bounces={false}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            <View style={styles.header}>
            <Header title="Highlights" />
              <View style = {styles.buttonrow}>
                <TouchableOpacity style = {styles.buttonContanier}>
                  <Text style = {styles.buttonText}>CREDIT RATING</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {[styles.buttonContanier, {backgroundColor: theme.white}]}>
                  <Text style = {[styles.buttonText, {color: theme.light_green}]}>NOT DUE</Text>
                  </TouchableOpacity>
              </View>
            </View>

            <View style={styles.row}>
              <CustomCircularProgressBar
                title="CURRENT MONTH"
                value={75}
                subtitle="Based On Quantity"
                radius={getScreenHeight(6)}
                fontSize={getScreenHeight(2)}
              />
              <CustomCircularProgressBar
                title="CURRENT MONTH"
                value={62}
                subtitle="Based On Quantity"
                radius={getScreenHeight(6)}
                fontSize={getScreenHeight(2)}
              />
            </View>

            <View style={styles.divider}>
              <Divider />
            </View>

            <View style={styles.row}>
              <Column>
                <Text style={styles.fottertitle}>{'TOTAL OUTSTANDING'}</Text>
                <Text style={styles.price}>
                  ₹ <Text style={{color: theme.light_green}}>441</Text>
                </Text>
                <Text style={styles.fottersubtitle}>{`In '000'`}</Text>
              </Column>
              <Column>
                <Text style={styles.fottertitle}>{'TOTAL OVERDUE'}</Text>
                <Text style={styles.price}>
                  ₹ <Text style={{color: theme.light_green}}>0</Text>
                </Text>
                <Text style={styles.fottersubtitle}>{`In '000'`}</Text>
              </Column>
            </View>

            <View style={styles.divider}>
              <Divider />
            </View>
          </ScrollView>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
};

const createStyles = theme =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: 'white',
    },
    linearGradient: {
      flex: 1,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      marginVertical: getScreenHeight(3),
    },
    title: {
      fontFamily: fonts.semiBold,
      color: theme.white,
      fontSize: getScreenHeight(2.5),
    },
    header: {
      marginTop: getScreenHeight(10),
      marginBottom: getScreenHeight(4),
      paddingHorizontal: getScreenHeight(1),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    divider: {
      width: '90%',
      alignSelf: 'center',
    },
    fottertitle: {
      fontFamily: fonts.regular,
      fontSize: getScreenHeight(1.8),
      color: theme.white,
      textTransform: 'uppercase',
    },
    fottersubtitle: {
      fontFamily: fonts.regular,
      fontSize: getScreenHeight(1.8),
      color: theme.subtitle,
    },
    price: {
      fontFamily: fonts.regular,
      fontSize: getScreenHeight(3.5),
      color: theme.subtitle,
      marginVertical: getScreenHeight(2),
    },
    buttonrow: {
      flexDirection: "row",
      alignItems: "center",
      borderRadius: getScreenHeight(2),
      overflow: 'hidden',
    },
    buttonText: {
      fontFamily: fonts.semiBold,
      color: theme.white,
      fontSize: getScreenHeight(1.4),
      padding: getScreenHeight(1),
    },
    buttonContanier: {
      backgroundColor: theme.primary,
    }
  });

export default HighLights;
