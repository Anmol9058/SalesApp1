import React, {useContext, useMemo} from 'react';
import {
  Modal,
  StyleSheet,
  Pressable,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import {getScreenHeight, getScreenWidth} from '../utils/domUtil';
import fonts from '../constants/fonts';
import {themeContext} from '../contexts/context';
import CustomStatusBar from './CustomStatusBar';

const ChooseTyrePosition = (props: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  const renderItem = ({item, index}: any) => {
    return (
      <TouchableOpacity
        onPress={() => props.selectedItem(item, index)}
        style={styles.item}>
        <Text style={styles.title}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <CustomStatusBar />
      <Modal
        visible={props.visible}
        animationType="fade"
        transparent={true}
        {...props}>
        <Pressable onPress={props.pressHandler} style={styles.modalScreen}>
          <View style={styles.modalContanier}>
            <FlatList
              data={props.data}
              keyExtractor={(_, index) => index.toString()}
              renderItem={renderItem}
            />
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    modalScreen: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContanier: {
      backgroundColor: theme.white,
      width: getScreenWidth(90),
      justifyContent: 'center',
      padding: getScreenHeight(2),
      borderRadius: getScreenHeight(1),
    },
    title: {
      fontFamily: fonts.medium,
      color: theme.black,
      fontSize: getScreenHeight(1.8),
    },
    item: {
      height: getScreenHeight(5),
    },
  });

export default ChooseTyrePosition;
