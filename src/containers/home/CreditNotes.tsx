import React, {useCallback, useContext, useMemo} from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

import CustomStatusBar from '../../components/CustomStatusBar';
import {themeContext} from '../../contexts/context';
import CustomHeader from '../../components/CustomHeader';
import {ScrollView} from 'react-native-gesture-handler';
import fonts from '../../constants/fonts';
import {getScreenHeight, getScreenWidth} from '../../utils/domUtil';
import Header from '../../components/Header';
import RowItem from '../../components/RowItem';
import CustomButton from '../../components/CustomButton';

const CreditNotes = ({navigation}) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  const data = [
    {
      name: 'Online PPD Paid by pay',
      value: '503.33',
    },
    {
      name: 'SD Interest Oct-Dec21',
      value: '8223.33',
    },
    {
      name: 'Online PPD Paid by pay',
      value: '509.33',
    },
  ];

  const renderItem = useCallback(({item}) => {
    return (
      <View style={styles.item}>
        <RowItem item={item} />
      </View>
    );
  }, []);

  const renderHeader = () => {
    return <View style={styles.spacer} />;
  };

  return (
    <SafeAreaView
      edges={['top']}
      style={styles.screen}>
      <CustomStatusBar color={theme.white} />
      <View style={styles.screen}>
        <CustomHeader
        action = {() => navigation.openDrawer()}
        />
        <LinearGradient
          colors={['#000000', '#606060']}
          style={styles.linearGradient}>
          <Header title="Booster Target Vs Achievements" />

          <FlatList
            bounces={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={renderHeader}
            data={data}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderItem}
          />

          <View style={styles.fotter}>
            <Text style={styles.fottertitle}>
              Credit Notes Balance - Redeemable:{' '}
              <Text style={{color: theme.green}}>₹0</Text>
            </Text>
            <View style={styles.button}>
              <CustomButton
                size={getScreenHeight(1.5)}
                height={getScreenHeight(4)}
                title="Details"
                color={theme.light_green}
              />
            </View>
          </View>
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
      paddingHorizontal: getScreenHeight(1),
    },
    header: {
      margin: getScreenHeight(2),
    },
    item: {
      marginTop: getScreenHeight(3),
    },
    spacer: {
      height: getScreenHeight(6),
    },
    fottertitle: {
      fontFamily: fonts.regular,
      fontSize: getScreenHeight(2),
      color: theme.white,
    },
    fotter: {
      paddingVertical: getScreenHeight(2),
    },
    button: {
      width: getScreenWidth(30),
      alignSelf: 'flex-end',
      marginTop: getScreenHeight(1),
    },
  });

export default CreditNotes;
