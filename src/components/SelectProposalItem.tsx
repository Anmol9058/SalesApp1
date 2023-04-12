import React, {useContext, useMemo} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import fonts from '../constants/fonts';

import {themeContext} from '../contexts/context';
import {getScreenHeight, getScreenWidth} from '../utils/domUtil';
import ArrowButton from './ArrowButton';
import Spacer from './Spacer';

const SelectProposalItem = (props: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);


  return (
    <View style={styles.contanier}>
     <TouchableOpacity onPress={props.navigate1}>
      <View style={styles.row}>
        <Text style={styles.title}>Additional</Text>
        <Text style={styles.subtitle}>{}</Text>
      </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={props.navigate2}>
      <View style={styles.row}>
        <Text style={styles.title}>Fixed</Text>
        <Text style={styles.subtitle}>{}</Text>
      </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={props.navigate3}>
      <View style={styles.row}>
        <Text style={styles.title}>Remove Credit Days</Text>
        <Text style={styles.subtitle}>{}</Text>
      </View>
      </TouchableOpacity>
      <Spacer />
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    contanier: {
      backgroundColor: theme.white,
      padding: getScreenHeight(6),
      borderRadius: getScreenHeight(1),

    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: getScreenHeight(4),
    },
    title: {
      fontFamily: fonts.regular,
      color: '#333333',
      fontSize: getScreenHeight(1.6),
      width: '45%',
    },

    subtitle: {
      fontFamily: fonts.bold,
      color: theme.black,
      borderColor:"grey",
      borderWidth:1,
      backgroundColor:theme.lightGrey,
      width:getScreenWidth(4.5),
      borderRadius:50,
      fontSize: getScreenHeight(1.6),
     
    },
  });

export default SelectProposalItem;
