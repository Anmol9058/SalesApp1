import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import {themeContext} from '../contexts/context';
import {getScreenHeight} from '../utils/domUtil';

const CustomProgressBar = (props: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [width, setWidth] = useState(0);
  const animatedValue = useRef(new Animated.Value(-1000)).current;
  const reactive = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: reactive,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    animatedValue.setValue(-width + (width * props.start) / props.steps);
    reactive.setValue(-width + (width * props.step) / props.steps);
  }, [width, props.step, props.start]);

  return (
    <View
      style={{
        backgroundColor: theme.accent,
        overflow: 'hidden',
        height: props.height ? props.height : getScreenHeight(1),
        borderRadius: props.height,
      }}>
      <Animated.View
        onLayout={event => {
          const newWidth = event.nativeEvent.layout.width;
          setWidth(newWidth);
        }}
        style={{
          backgroundColor: theme.primary_light,
          width: '100%',
          height: props.height ? props.height : getScreenHeight(1),
          borderRadius: props.height,
          position: 'absolute',
          left: 0,
          top: 0,
          transform: [
            {
              translateX: animatedValue,
            },
          ],
        }}
      />
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    screen: {
      backgroundColor: theme.primary,
      overflow: 'hidden',
    },
  });

export default CustomProgressBar;
