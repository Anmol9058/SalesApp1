import React, {useContext, useMemo, useState} from 'react';
import {View, StyleSheet, Text, FlatList, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

import {themeContext} from '../contexts/context';
import CustomStatusBar from '../components/CustomStatusBar';
import CustomHeader from '../components/CustomHeader';
import Header from '../components/Header';
import {getScreenHeight} from '../utils/domUtil';
import fonts from '../constants/fonts';
import FastImage from 'react-native-fast-image';

const Overdue = ({navigation}) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [search, setSearch] = useState('');

  return (
    <SafeAreaView edges={['top']} style={styles.screen}>
      <CustomStatusBar color={theme.white} />
      <View style={styles.screen}>
        <CustomHeader action={() => navigation.openDrawer()} />
        <LinearGradient
          colors={['#000000', '#606060']}
          style={styles.linearGradient}>
          <View style={styles.header}>
            <View style={styles.header}>
              <Header title="Due Overdue" />

              <View style={styles.rightheader}>
                <Text style={styles.date}>Jan 1'22- Jan 30'22</Text>
                <TouchableOpacity>
                  <FastImage
                    tintColor={theme.yellow}
                    resizeMode="contain"
                    style={styles.icon}
                    source={require('../assets/images/calendar.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Text style={styles.notfound}>No Data Avaiable</Text>
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
    header: {
      padding: getScreenHeight(1),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: "100%"
    },
    notfound: {
      color: theme.subtitle,
      fontFamily: fonts.bold,
      fontSize: getScreenHeight(2),
      margin: getScreenHeight(2),
      alignSelf: 'center',
    },
    icon: {
      width: getScreenHeight(2),
      height: getScreenHeight(2),
      marginTop: getScreenHeight(0.5),
    },
    rightheader: {
      alignItems: 'flex-end',
    },
    date: {
      fontFamily: fonts.regular,
      fontSize: getScreenHeight(1.2),
      color: theme.white,
    },
  });

export default Overdue;
