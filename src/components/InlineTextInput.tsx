import React, {useContext, useMemo} from 'react';
import {View, StyleSheet, Text, Platform} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {color} from 'react-native-reanimated';
import fonts from '../constants/fonts';
import {themeContext} from '../contexts/context';
import {getScreenHeight} from '../utils/domUtil';

const InlineTextInput = (props: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.row}>
      <Text
        style={[
          styles.title,
          {
            marginRight: getScreenHeight(3),
            color: props.black ? theme.black : theme.white,
          },
        ]}>
        {props.title}
      </Text>
      <View style={styles.textInputContanier}>
        <TextInput
          {...props}
          ref={props.inputRef}
          onSubmitEditing={props.onSubmit}
          returnKeyType={props.type ? props.type : 'done'}
          placeholder={props.placeholder}
          placeholderTextColor={props.color ? props.color : theme.textinput}
          secureTextEntry={props.secure}
          onChangeText={props.action}
          value={props.value}
          style={[
            styles.textInput,
            {color: props.black ? theme.black : theme.white},
          ]}
        />
      </View>
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      height: getScreenHeight(6),
    },
    title: {
      fontFamily: fonts.medium,
      color: theme.white,
      fontSize: getScreenHeight(2),
      width: '25%',
    },
    textInputContanier: {
      borderColor: theme.accent,
      borderBottomWidth: getScreenHeight(0.1),
      flex: 1,
      paddingBottom: Platform.OS === 'ios' ? getScreenHeight(1) : 0,
    },
    textInput: {
      fontSize: getScreenHeight(1.8),
      fontFamily: fonts.semiBold,
    },
  });

export default InlineTextInput;
