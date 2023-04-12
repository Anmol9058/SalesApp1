import React, {useCallback, useContext, useMemo} from 'react';
import {Text, StyleSheet, Pressable, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useMutation} from 'react-query';
import {removeAsyncItem} from '../api/async';
import {logOut} from '../api/auth';
import fonts from '../constants/fonts';
import {authContext, themeContext} from '../contexts/context';
import useApi from '../hooks/useApi';
import {getScreenHeight} from '../utils/domUtil';

const LogoutItem = (props: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const {apiCall} = useApi();
  const {user_data} = useContext(authContext);

  const logoutManager = useCallback(async () => {
    let data = {
      userid: '0055j000001LVw5AAG',
      sessionstatus: 'Logged Out',
    };
    const res = await logOut(apiCall, data);

    return res;
  }, [apiCall]);

  const {mutate: hitLogout, isLoading: loginLoading} = useMutation(
    logoutManager,
    {
      onSuccess: async (data: any) => {
        await removeAsyncItem('userData');
        props.action();
      },
    },
  );

  return (
    <Pressable
      onPress={() => {
        hitLogout();
      }}
      style={styles.item}>
      <Text style={styles.title}>Logout</Text>
    </Pressable>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: getScreenHeight(2),
      height: getScreenHeight(6.5),
      marginBottom: getScreenHeight(2),
    },
    title: {
      fontSize: getScreenHeight(2),
      color: theme.primary_light,
      fontFamily: fonts.semiBold,
      alignSelf: 'center',
    },
  });

export default LogoutItem;
