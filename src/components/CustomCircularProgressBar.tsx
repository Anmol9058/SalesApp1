import React, { useContext, useMemo } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import fonts from '../constants/fonts';
import { themeContext } from '../contexts/context';
import {getScreenHeight} from '../utils/domUtil';

const CustomCircularProgressBar = props => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style = {styles.contanier}>
      <Text style = {styles.title}>{props.title}</Text>
      <CircularProgress
        value={props.value ? props.value : 60}
        radius={props.radius ? props.radius : getScreenHeight(10)}
        duration={2000}
        progressValueColor={'#ecf0f1'}
        maxValue={props.currentValue ? props.currentValue : 100}
        valueSuffix={'%'}
        titleColor={'white'}
        onAnimationComplete={props.action}
        circleBackgroundColor="#6B6868"
        progressValueFontSize={props.fontSize ? props.fontSize : getScreenHeight(3)}
        progressValueStyle={{fontFamily: fonts.bold}}
        inActiveStrokeOpacity={0}
      />
      <Text style = {styles.subtitle}>{props.subtitle}</Text>
    </View>
  );
};

const createStyles = theme => StyleSheet.create({
  title: {
    fontFamily: fonts.regular,
    fontSize: getScreenHeight(1.8),
    color: theme.white,
    textTransform: "uppercase",
    marginBottom: getScreenHeight(2)
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: getScreenHeight(1.8),
    color: theme.subtitle,
    marginTop: getScreenHeight(2)
  },
  contanier: {
    alignItems: "center"
  }
})

export default CustomCircularProgressBar;
