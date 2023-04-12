import React, {useContext, useMemo} from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import CustomStatusBar from '../../components/CustomStatusBar';
import {themeContext} from '../../contexts/context';
import CustomHeader from '../../components/CustomHeader';
import fonts from '../../constants/fonts';
import {getScreenHeight} from '../../utils/domUtil';
import Header from '../../components/Header';
import MonthTarget from '../../components/MonthTarget';
import QuatorTarget from '../../components/QuatorTarget';

const Tab = createMaterialTopTabNavigator();

const Targets = ({navigation}: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  const CustomTabBar = (props: any) => {
    const {navigationState, navigation} = props;
    return (
      <View style={styles.tabContanier}>
        {navigationState.routes.map((route: any, index: any) => {
          return (
            <Pressable
              onPress={() => navigation.navigate(route.name)}
              style={[
                styles.textContanier,
                {
                  backgroundColor:
                    navigationState.index === index
                      ? theme.primary
                      : 'transparent',
                },
              ]}>
              <Text style={styles.tabTitle}>{route.name}</Text>
            </Pressable>
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView edges={['top']} style={styles.screen}>
      <CustomStatusBar color={theme.white} />
      <View style={styles.screen}>
        <CustomHeader action={() => navigation.openDrawer()} />
        <LinearGradient
          colors={['#000000', '#606060']}
          style={styles.linearGradient}>
          <Text style={[styles.title, {marginTop: getScreenHeight(1)}]}>
            Sales last refreshed at 2022-02-12 11:50
          </Text>
          <Text style={styles.title}>Next update in 30 Minutes</Text>

          <View style={styles.header}>
            <Header title="Booster Target Vs Achievements" />
          </View>

          <Tab.Navigator
            initialRouteName="MONTHLY"
            tabBar={props => <CustomTabBar {...props} />}>
            <Tab.Screen
              name="MONTHLY"
              component={MonthTarget}
              options={{tabBarLabel: 'MONTHLY'}}
            />
            <Tab.Screen
              name="QUARTERLY"
              component={QuatorTarget}
              options={{tabBarLabel: 'QUARTERLY'}}
            />
          </Tab.Navigator>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: 'white',
    },
    linearGradient: {
      flex: 1,
    },
    title: {
      fontFamily: fonts.regular,
      color: theme.green,
      fontSize: getScreenHeight(1.5),
      alignSelf: 'flex-end',
    },
    header: {
      marginTop: getScreenHeight(2),
    },
    tabContanier: {
      height: getScreenHeight(6),
      backgroundColor: 'transparent',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      marginTop: getScreenHeight(2),
      borderTopWidth: getScreenHeight(0.1),
      borderBottomWidth: getScreenHeight(0.1),
      borderColor: theme.accent,
    },
    tabTitle: {
      color: theme.white,
      fontFamily: fonts.regular,
      fontSize: getScreenHeight(1.8),
    },
    textContanier: {
      flex: 0.5,
      height: getScreenHeight(6),
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default Targets;
