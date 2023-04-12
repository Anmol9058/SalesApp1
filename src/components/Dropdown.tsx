import React, {useContext, useMemo, useState} from 'react';
import {View, StyleSheet, Text, FlatList, TouchableOpacity} from 'react-native';
import fonts from '../constants/fonts';

import {themeContext} from '../contexts/context';
import {getScreenHeight} from '../utils/domUtil';
import CustomSearchBar from './CustomSearchBar';
import NotFound from './NotFound';

const Dropdown = (props: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [search, setSearch] = useState('');

  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity onPress={() => props.action(item)} style={styles.item}>
        <Text style={styles.title}>{props.other ? item : item}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.contanier}>
      <View style={styles.customsearchbar}>
        <CustomSearchBar
          placeholder={props.placeholder}
          value={search}
          action={setSearch}
        />
      </View>
      {console.log("props.sear",props)}
      <FlatList
        nestedScrollEnabled={true}
        data={
          props.other
            ? props?.data?.filter((item: any) =>
                item?.toLocaleLowerCase()?.includes(search.toLocaleLowerCase()),
              )
            : props?.data?.filter((item: any) =>
                item?.toLocaleLowerCase()?.includes(
                  search.toLocaleLowerCase(),
                ),
              )
        }
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        ListEmptyComponent={NotFound}
      />
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    contanier: {
      backgroundColor: theme.white,
      height: getScreenHeight(30),
      width: '100%',
      borderRadius: getScreenHeight(2),
      shadowColor: 'black',
      zIndex: 10,
      position: 'absolute',
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.12,
      shadowRadius: 5,
      elevation: 5,
    },
    item: {
      padding: getScreenHeight(2),
    },
    title: {
      color: theme.black,
      fontFamily: fonts.regular,
      fontSize: getScreenHeight(1.6),
      textTransform: 'capitalize',
    },
    customsearchbar: {
      padding: getScreenHeight(1),
    },
  });

export default Dropdown;
