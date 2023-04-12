import React, {useCallback, useContext, useMemo, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Vibration,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import QRCodeScanner from 'react-native-qrcode-scanner';

import CustomNewHeader from '../components/CustomNewHeader';
import CustomStatusBar from '../components/CustomStatusBar';
import fonts from '../constants/fonts';
import {authContext, themeContext} from '../contexts/context';
import {getScreenHeight} from '../utils/domUtil';

const ScanQrCode = ({navigation, route}: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const {setQrData}: any = useContext(authContext);
  const onRead = (itemData: any) => {
    if (itemData) {
      Vibration.vibrate();
      // getQrData(itemData);
      setQrData(itemData);
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView edges={['top']} style={styles.screen}>
      <CustomStatusBar color={theme.black} light />
      <View style={styles.screen}>
        <CustomNewHeader action={() => navigation.goBack()} title="Scan QR" />
        <QRCodeScanner
          reactivate={true}
          showMarker={true}
          onRead={onRead}
          // flashMode={
          //   on
          //     ? RNCamera.Constants.FlashMode.torch
          //     : RNCamera.Constants.FlashMode.off
          // }
          topContent={
            <Text style={styles.centerText}>Please scan the QR code!</Text>
          }
          // bottomContent={
          //   <View>
          //     <TouchableOpacity
          //       style={styles.buttonTouchable}
          //       onPress={() => this.scanner.reactivate()}>
          //       <Text style={styles.centerText}>OK. Got it!</Text>
          //     </TouchableOpacity>

          //     <TouchableOpacity
          //       style={styles.buttonTouchable}
          //       onPress={() => this.setState({scan: false})}>
          //       <Text style={styles.centerText}>Stop Scan</Text>
          //     </TouchableOpacity>
          //   </View>
          // }
        />
      </View>
    </SafeAreaView>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.black,
    },
    centerText: {
      color: theme.white,
      fontFamily: fonts.regular,
      fontSize: getScreenHeight(1.8),
    },
  });

export default ScanQrCode;
