import React, {useContext, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ImageBackground,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useQuery} from 'react-query';
import fonts from '../constants/fonts';
import {authContext, themeContext} from '../contexts/context';
import {getScreenHeight} from '../utils/domUtil';

const DrawerProfileItem = (props: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const {user_data, modal_icon, setIcon}: any = useContext(authContext);
  return (
    <View style={styles.main}>
      <View style={styles.contanier}>
        <View style={styles.imageContanier}>
          <FastImage
            style={styles.image}
            source={{uri: 'https://wallpapercave.com/wp/6FB0mg6.jpg'}}
          />
        </View>
        <View style={styles.textContanier}>
          <Text numberOfLines={1} style={styles.title}>
            {user_data?.Name ? user_data?.Name : ''}
          </Text>
          <Text numberOfLines={1} style={styles.subtitle}>
            {user_data?.Customer_No__c ? user_data?.Customer_No__c : ''}
          </Text>
        </View>
      </View>
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    main: {
      width: '100%',
      height: getScreenHeight(20),
      backgroundColor: theme.primary_light,
      paddingHorizontal: getScreenHeight(2),
      justifyContent: 'center',
    },

    title: {
      color: theme.white,
      fontFamily: fonts.bold,
      fontSize: getScreenHeight(2),
    },
    subtitle: {
      color: theme.white,
      fontFamily: fonts.regular,
      fontSize: getScreenHeight(1.5),
    },
    image: {
      height: '90%',
      width: '90%',
      borderRadius: getScreenHeight(100),
    },
    imageContanier: {
      width: getScreenHeight(12),
      height: getScreenHeight(12),
      borderRadius: getScreenHeight(6),
      borderWidth: getScreenHeight(0.3),
      borderColor: theme.white,
      justifyContent: 'center',
      alignItems: 'center',
    },
    textContanier: {
      marginLeft: getScreenHeight(2),
    },
    contanier: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });

export default DrawerProfileItem;
