import React, {useContext, useMemo} from 'react';
import {Modal, StyleSheet, Pressable, View, Text, ActivityIndicator} from 'react-native';
import fonts from '../constants/fonts';
import {themeContext} from '../contexts/context';
import {getScreenHeight, getScreenWidth} from '../utils/domUtil';
import CustomButton from './CustomButton';
import CustomStatusBar from './CustomStatusBar';

const NoInternetConnection = (props:any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <>
      <CustomStatusBar />
      <Modal visible={true} animationType="slide" transparent={true} {...props}>
        <Pressable onPress={props.pressHandler} style={styles.modalScreen}>
          <View style={styles.modalContanier}>
            <View style={styles.topitem} />

                      <ActivityIndicator size={"small"} color = {theme.white} />
                      <Text style={styles.maintitle}>No Internet Connection!</Text>
                      
            <Text style={styles.subtitle}>Please check your connection.</Text>

            {props.retry ? (
              <CustomButton
                action={props.retry}
                show={!props.loading}
                loading={props.loading}
                title="Retry"
              />
            ) : null}
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

const createStyles = theme =>
  StyleSheet.create({
    modalScreen: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      flex: 1,
      justifyContent: 'flex-end',
    },
    modalContanier: {
      backgroundColor: theme.inputbackground,
      width: getScreenWidth(100),
      alignSelf: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: getScreenHeight(2),
      borderTopLeftRadius: getScreenHeight(2),
      borderTopRightRadius: getScreenHeight(2),
      paddingBottom: getScreenHeight(2),
    },
    title: {
      fontSize: getScreenHeight(1.8),
      fontFamily: fonts.regular,
      color: theme.white,
      marginTop: getScreenHeight(2),
    },
    topitem: {
      width: getScreenWidth(15),
      height: getScreenHeight(0.5),
      backgroundColor: theme.white,
      borderRadius: getScreenHeight(2),
      alignSelf: 'center',
      marginBottom: getScreenHeight(2),
    },
    titlecontanier: {
      height: getScreenHeight(7),
      justifyContent: 'center',
    },
    maintitle: {
      fontSize: getScreenHeight(2),
      fontFamily: fonts.medium,
      color: theme.white,
        textAlign: 'center',
      marginTop: getScreenHeight(2),
    },
    subtitle: {
      fontSize: getScreenHeight(1.5),
      fontFamily: fonts.regular,
      color: theme.white,
      opacity: 0.7,
      textAlign: 'center',
      marginVertical: getScreenHeight(2),
    },
  });

export default NoInternetConnection;
