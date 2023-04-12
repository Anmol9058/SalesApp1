import React, {useContext, useMemo} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import fonts from '../constants/fonts';

import {themeContext} from '../contexts/context';
import {getScreenHeight} from '../utils/domUtil';

const CustomInput = (props: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <>
      {props.label ? <Text style={styles.text}>{props.label}</Text> : null}
      <View
        style={[
          styles.screen,
          {
            // borderBottomColor: theme.black,
          },
        ]}>
          
        <View
          style={[
            styles.textinputcontanier,
            {borderBottomWidth: props.border ? getScreenHeight(0.1) : 0},
          ]}>
          {props.frontIcon ? (
            <View style={styles.iconcontanier}>{props.frontIcon}</View>
          ) : null}
          <TextInput
            editable={props.editable}
            {...props}
            ref={props.inputRef}
            onSubmitEditing={props.onSubmit}
            returnKeyType={props.type ? props.type : 'done'}
            style={[
              styles.textinput,
              {
                width: props.icon || props.frontIcon ? '80%' : '100%',
                color: props.color ? props.color : theme.textinput,
              },
            ]}
            placeholder={props.placeholder}
            placeholderTextColor={theme.textinput }
            secureTextEntry={props.secure}
            onChangeText={props.action}
            value={props.value}
          />

          {props.icon ? (
            <TouchableOpacity
              onPress={props.rightAction}
              disabled={props.rightAction ? false : true}
              style={[styles.iconcontanier,{position:'absolute',right:0,}]}>
              {props.icon}
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    screen: {
      flexDirection:'row',
 
      // borderBottomWidth: getScreenHeight(0.),
    },

    textinputcontanier: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      color: theme.textinput,
      marginLeft:getScreenHeight(0.2),
    },
    textinput: {
      // flex: 1,

      borderBottomWidth:getScreenHeight(0.1),
      fontSize: getScreenHeight(1.8),
      fontFamily: fonts.regular,
      height: getScreenHeight(6),
    },
    label: {
      fontSize: getScreenHeight(1.8),
      fontFamily: fonts.regular,
      color: theme.white,
      marginBottom: getScreenHeight(0.5),
    },
    iconcontanier: {
      width: '12%',
      justifyContent: 'center',
      alignItems: 'center',
     marginRight:"2%"
    },
    text: {
      fontSize: getScreenHeight(1.8),
      fontFamily: fonts.semiBold,
      color: theme.black,
    },
  });

export default CustomInput;
