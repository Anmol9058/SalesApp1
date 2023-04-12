import React, {useContext, useMemo} from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import fonts from '../constants/fonts';

import {themeContext} from '../contexts/context';
import {getScreenHeight} from '../utils/domUtil';

const InvoiceItem = props => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.contanier}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Invoice No.</Text>
          <Text style={styles.value}>112908003454</Text>
        </View>

        <View>
          <Text style={styles.title}>Invoice Date</Text>
          <Text style={styles.value}>14-09-2022</Text>
        </View>

        <View />
      </View>

      <View style={styles.dashed} />

      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Delivered Date</Text>
          <Text style={styles.value}>5-4-2022</Text>
        </View>

        <View>
          <Text style={styles.title}>Delivered Time</Text>
          <Text style={styles.value}>1:4:54 AM</Text>
        </View>

        <Pressable onPress={props.action}>
          <Text style={styles.value}>View Details</Text>
        </Pressable>
      </View>

      <View style={styles.dashed} />

      <Text style={styles.fottertext}>Remarks</Text>
    </View>
  );
};

const createStyles = theme =>
  StyleSheet.create({
    contanier: {
      backgroundColor: theme.white,
      borderRadius: getScreenHeight(2),
    },
    header: {
      height: getScreenHeight(8),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: getScreenHeight(2),
    },
    title: {
      fontFamily: fonts.bold,
      color: theme.black,
      fontSize: getScreenHeight(1.8),
    },
    value: {
      fontFamily: fonts.bold,
      color: theme.primary,
      fontSize: getScreenHeight(1.5),
    },
    dashed: {
      borderColor: theme.black,
      borderWidth: getScreenHeight(0.1),
      borderStyle: 'dashed',
    },
    fottertext: {
      paddingHorizontal: getScreenHeight(2),
      fontFamily: fonts.bold,
      color: theme.primary,
      fontSize: getScreenHeight(2),
      marginVertical: getScreenHeight(1),
    },
  });

export default InvoiceItem;
