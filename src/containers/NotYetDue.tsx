import React, {useCallback, useContext, useMemo, useState} from 'react';
import {View, StyleSheet, Text, FlatList, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

import {themeContext} from '../contexts/context';
import CustomStatusBar from '../components/CustomStatusBar';
import {getScreenHeight} from '../utils/domUtil';
import fonts from '../constants/fonts';
import CustomBackHeader from '../components/CustomBackHeader';

const NotYetDue = ({navigation}) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  const renderItem = useCallback(({item}) => {
    return (
      <View>
            {/* <NotDoneYetItem
        name = "Demo"
            /> */}
      </View>
    );
  }, []);

  return (
    <SafeAreaView edges={['top']} style={styles.screen}>
      <CustomStatusBar color={theme.white} />
      <View style={styles.screen}>
        <CustomBackHeader
          action={() => navigation.goBack()}
          title="Not Yet Due"
        />
        <LinearGradient
          colors={['#000000', '#606060']}
          style={styles.linearGradient}>
          <FlatList
            data={[1, 2, 3, 4]}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.flatlist}
          />
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
    },
    notfound: {
      color: theme.subtitle,
      fontFamily: fonts.bold,
      fontSize: getScreenHeight(2),
      alignSelf: 'center',
      marginVertical: getScreenHeight(2),
    },
    flatlist: {
      paddingHorizontal: getScreenHeight(2),
    },
  });

export default NotYetDue;
