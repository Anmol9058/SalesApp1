import React, {useContext, useMemo} from 'react';
import {View, StyleSheet, FlatList, Text, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SafeAreaView} from 'react-native-safe-area-context';

import CustomNewHeader from '../components/CustomNewHeader';
import CustomStatusBar from '../components/CustomStatusBar';
import fonts from '../constants/fonts';
import {themeContext} from '../contexts/context';
import {getScreenHeight} from '../utils/domUtil';

const Security = ({navigation}: any) => {
  const data = [
    {
      title: 'Change Password',
      action: () => navigation.navigate('ChangePassword'),
    },
  ];

  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  const renderKeyExtractor = (item: any, index: any) => index.toString();

  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity onPress={item.action} style={styles.item}>
        <Text style={styles.title}>{item.title}</Text>
        <FastImage
          tintColor={theme.white}
          resizeMode="contain"
          style={styles.icon}
          source={require('../assets/images/arrows/arrowright.png')}
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView edges={['top']} style={styles.screen}>
      <CustomStatusBar color={theme.black} light />
      <View style={styles.screen}>
        <CustomNewHeader action={() => navigation.goBack()} title="Security" />

        <FlatList
          contentContainerStyle={styles.list}
          data={data}
          keyExtractor={renderKeyExtractor}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaView>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.black,
    },
    header: {
      padding: getScreenHeight(2),
    },
    list: {
      paddingHorizontal: getScreenHeight(2),
    },
    item: {
      height: getScreenHeight(6),
      borderColor: theme.white,
      borderTopWidth: getScreenHeight(0.1),
      borderBottomWidth: getScreenHeight(0.1),
      marginTop: getScreenHeight(2),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      fontFamily: fonts.semiBold,
      fontSize: getScreenHeight(1.8),
      color: theme.white,
    },
    icon: {
      width: getScreenHeight(2),
      height: getScreenHeight(2),
    },
  });

export default Security;
