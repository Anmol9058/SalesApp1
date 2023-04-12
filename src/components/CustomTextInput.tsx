import React, {useContext, useMemo} from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';
import fonts from '../constants/fonts';

import {themeContext} from '../contexts/context';
import {getScreenHeight} from '../utils/domUtil';

const CustomTextInput = (props: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <>
      {props.label ? <Text style={styles.label}>{props.label}</Text> : null}
      <View style={styles.screen}>
        <View
          style={[
            styles.textinputcontanier,
            {borderBottomWidth: props.border ? getScreenHeight(0.1) : 0},
          ]}>
          <TextInput
            {...props}
            ref={props.inputRef}
            onSubmitEditing={props.onSubmit}
            returnKeyType={props.type ? props.type : 'done'}
            style={[
              styles.textinput,
              {
                width: props.icon ? '90%' : '100%',
                color: props.color ? props.color : theme.textinput,
              },
            ]}
            placeholder={props.placeholder}
            placeholderTextColor={props.color ? props.color : theme.textinput}
            secureTextEntry={props.secure}
            onChangeText={props.action}
            value={props.value}
          />

          {props.icon ? (
            <View style={styles.iconcontanier}>{props.icon}</View>
          ) : null}
        </View>
      </View>
    </>
  );
};

const createStyles = theme =>
  StyleSheet.create({
    screen: {
      paddingHorizontal: getScreenHeight(1),
      backgroundColor: theme.white,
    },

    textinputcontanier: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      color: theme.textinput,
    },
    textinput: {
      width: '90%',
      fontSize: getScreenHeight(1.8),
      fontFamily: fonts.semiBold,
      height: getScreenHeight(6),
      color: theme.white,
    },
    label: {
      fontSize: getScreenHeight(1.8),
      fontFamily: fonts.semiBold,
      color: theme.white,
      marginBottom: getScreenHeight(0.5),
    },
    iconcontanier: {
      width: '10%',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default CustomTextInput;
