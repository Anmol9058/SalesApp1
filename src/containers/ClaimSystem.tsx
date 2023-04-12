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

const ClaimSystem = ({navigation}: any) => {
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
            <Header title="Claim System" />

            <Text style={styles.title}>Coming Soon!!!</Text>
            <Text style={styles.notfound}>
              We are woking on it keep following
            </Text>
          </View>
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
    header: {
      padding: getScreenHeight(1),
    },
    notfound: {
      color: theme.subtitle,
      fontFamily: fonts.bold,
      fontSize: getScreenHeight(2),
      margin: getScreenHeight(2),
    },
    title: {
      color: theme.subtitle,
      fontFamily: fonts.bold,
      fontSize: getScreenHeight(2.5),
      marginHorizontal: getScreenHeight(2),
      marginTop: getScreenHeight(2),
    },
  });

export default ClaimSystem;
