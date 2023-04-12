import React, {useContext, useMemo} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import fonts from '../constants/fonts';

import {themeContext} from '../contexts/context';
import {getScreenHeight} from '../utils/domUtil';
import Column from './Column';
import Divider from './Divider';
import Spacer from './Spacer';

const CardNoteItem = props => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.contanier}>
      <Text style={styles.title}>{props.item.name}</Text>
      <View style={styles.main}>
        <Column>
          <Text style={styles.heading}>CN/DN Date</Text>
          <Text style={styles.day}>14</Text>
          <Text style={styles.date}>
            March,<Text style={{color: theme.white}}>2022</Text>
          </Text>
        </Column>

        <Column>
          <View>
            <Text style={styles.heading}>ODN no</Text>
            <Text style={styles.regulartext}>302022112333</Text>
          </View>
            <Spacer />
          <View>
            <Text style={styles.heading}>Document Type</Text>
            <Text style={styles.boldtext}>Credit Note</Text>
          </View>
        </Column>

        <Column>
          <View>
            <Text style={styles.heading}>CN/DN Date</Text>
            <Text style={styles.boldtext}>302022112333</Text>
          </View>
            <Spacer />
          <View>
            <Text style={styles.heading}>Amount(inc. tax)</Text>
            <Text style={styles.boldtext}>454</Text>
          </View>
        </Column>

      </View>
    </View>
  );
};

const createStyles = theme =>
  StyleSheet.create({
    contanier: {
      backgroundColor: '#434B5E',
      borderRadius: getScreenHeight(2),
      borderColor: theme.light_accent,
      borderWidth: getScreenHeight(0.1),
    },
    title: {
      fontFamily: fonts.bold,
      color: theme.white,
      fontSize: getScreenHeight(1.2),
      padding: getScreenHeight(1),
      borderBottomWidth: getScreenHeight(0.1),
      borderColor: theme.light_accent,
    },
    main: {
      height: getScreenHeight(9),
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    heading: {
      color: theme.subtitle,
      fontSize: getScreenHeight(1),
      fontFamily: fonts.regular,
    },
    day: {
      fontFamily: fonts.semiBold,
      fontSize: getScreenHeight(3),
      color: theme.white,
    },
    date: {
      color: theme.yellow,
      fontSize: getScreenHeight(1),
      fontFamily: fonts.semiBold,
    },
    regulartext: {
      fontFamily: fonts.regular,
      fontSize: getScreenHeight(1),
      color: theme.white,
    },
    boldtext: {
      fontFamily: fonts.bold,
      fontSize: getScreenHeight(1),
      color: theme.white,
    },
  });

export default CardNoteItem;
