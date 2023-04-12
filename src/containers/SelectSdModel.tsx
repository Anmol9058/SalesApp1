import React, {useContext, useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {authContext, themeContext} from '../contexts/context';
import CustomStatusBar from '../components/CustomStatusBar';
import CustomNewHeader from '../components/CustomNewHeader';
import {getScreenHeight} from '../utils/domUtil';
import SelectSdItem from '../components/SelectSdItem';
import Header from '../components/Header';

const SelectSdModel = ({navigation}: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  const {user_data}: any = useContext(authContext);

  const ToSdIncreaseScreen = () => {
    navigation.navigate('SDIncrease');
  };
  const ToSdDecreaseScreen = () => {
    navigation.navigate('SDDecrease');
  };

  //

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <CustomStatusBar color={theme.black} light />
      <View style={styles.screen}>
        <CustomNewHeader
          subtitle={user_data?.Customer_No__c ? user_data?.Customer_No__c : ''}
          action={() => navigation.goBack()}
          title={user_data?.Name ? user_data?.Name : ''}
        />

        <View style={{padding: getScreenHeight(2)}}>
          <Header title="Choose Request type" dark />
        </View>
        <View
          style={{
            marginHorizontal: getScreenHeight(1),
          }}>
          <SelectSdItem
            navigate1={() => ToSdIncreaseScreen()}
            navigate2={() => ToSdDecreaseScreen()}
          />
        </View>
      </View>
    </SafeAreaView>
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
  });

export default SelectSdModel;
