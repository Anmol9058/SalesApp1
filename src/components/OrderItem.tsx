import React, {useContext, useMemo} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import fonts from '../constants/fonts';

import {themeContext} from '../contexts/context';
import {getScreenHeight, getScreenWidth} from '../utils/domUtil';

const OrderItem = (props: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View>
      <TouchableOpacity onPress={props.action} style={styles.contanier}>
        <Text style={styles.mainTitle}>{props.title}</Text>
        {props.loading ? (
          <ActivityIndicator size={'small'} color={theme.primary} />
        ) : (
          <FastImage
            tintColor={theme.black}
            resizeMode="contain"
            style={styles.icon}
            source={require('../assets/images/common/dropdown.png')}
          />
        )}
      </TouchableOpacity>
      {props.data
        ? props.data.map((data: any, index: any) => {
            return (
              <View key={index} style={styles.rowItem}>
                {/* <Text style={styles.title}>{data.attributes.type}</Text> */}
                {props.type === 'rim' ? (
                  <Text style={styles.title}>{data.Nom_Rim_Diameter__c}</Text>
                ) : null}
                {props.type === 'aspect' ? (
                  <Text style={styles.title}>{data.Aspect_Ratio_Y__c}</Text>
                ) : null}
                {props.type === 'tread' ? (
                  <Text style={styles.title}>{data.Tread_Pattern__c}</Text>
                ) : null}
                {props.type === 'section' ? (
                  <Text style={styles.title}>{data.Section_Width_Y__c}</Text>
                ) : null}
              </View>
            );
          })
        : null}
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    contanier: {
      height: getScreenHeight(6),
      borderColor: theme.accent,
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      borderBottomWidth: 0,
      justifyContent: 'space-between',
    },
    title: {
      fontSize: getScreenHeight(1.5),
      fontFamily: fonts.regular,
      color: theme.black,
    },
    mainTitle: {
      fontSize: getScreenHeight(1.8),
      fontFamily: fonts.semiBold,
      color: theme.primary,
    },
    icon: {
      width: getScreenHeight(1.5),
      height: getScreenHeight(1.5),
      marginLeft: getScreenHeight(2.5),
    },
    rowItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: getScreenHeight(5),
    },
  });

export default OrderItem;
