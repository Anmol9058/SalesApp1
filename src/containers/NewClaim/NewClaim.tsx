import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {authContext, themeContext} from '../../contexts/context';
import CustomStatusBar from '../../components/CustomStatusBar';
import FastImage from 'react-native-fast-image';
import {getScreenHeight} from '../../utils/domUtil';
import fonts from '../../constants/fonts';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import CustomDropDown from '../../components/CustomDropDown';
import {
  checkWarrentyExistance,
  getWarrenty,
  updateOtpForCostumer,
} from '../../api/home';
import useApi from '../../hooks/useApi';
import SimpleToast from 'react-native-simple-toast';
import strings from '../../constants/strings';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import CustomDropDownLabel from '../../components/CustomDropDownLabek';
import Images from '../../constants/images';
import CustomNewHeader from '../../components/CustomNewHeader';
import moment from 'moment';
import Dropdown from '../../components/Dropdown';
import Spacer from '../../components/Spacer';
import ModalLoading from '../../components/ModalLoading';

const NewClaim = ({navigation}: any) => {
  const {theme} = useContext(themeContext);
  const {user_data}: any = useContext(authContext);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const {apiCall} = useApi();

  const [mobileNumber, setMobileNumber] = useState('');
  const [name, setName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [vehicleMake, setVehicleMake] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [vehicleYear, setVehicleYear] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [purchasedDate, setPurchasedDate] = useState(null);
  const [size, setSize] = useState('');
  const [loading, setLoading] = useState(false);
  const [customerData, setCustomerData]: any = useState(null);
  const [otp, setOtp]: any = useState('');
  const [otpData, setOtpData] = useState(null);
  const [otpLoading, setOtpLoading] = useState(false);
  const [records, setRecords] = useState([]);
  const [serialNumber, setSerialNumber] = useState(null);
  const [serialNumberModal, setSerialNumberModal] = useState(false);
  const [dropDownData, setDropDownData] = useState([]);
  const [warrentyLoading, setWarrentyLoading] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: any) => {
    setPurchasedDate(date);
    hideDatePicker();
  };

  const getCliamManager = useCallback(async () => {
    if (mobileNumber.length != 10) {
      return SimpleToast.show(
        'Please enter your Mobile/Warrenty Registration number',
      );
    }
    try {
      setLoading(true);
      const res = await getWarrenty(apiCall, mobileNumber);
      if (res?.done) {
        setRecords(res?.records);
        if (res?.records[0]) {
          SimpleToast.show('Warranty Registration found!');
        } else {
          SimpleToast.show('Warranty not found!');
        }
        setCustomerData(res.records[0]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [mobileNumber]);

  const checkWarrentyExistanceManager = async (serial: any) => {
    setWarrentyLoading(true);
    try {
      if (serial.key === 'Serial_No_Front_Left__c') {
        const res = await checkWarrentyExistance(
          apiCall,
          customerData.Name,
          serial.Title,
          null,
          null,
          null,
          null,
        );
        if (res.totalSize !== 0) {
          setSerialNumber(null);
          SimpleToast.show('Warrenty has been claimed already!');
        }
      }
      if (serial.key === 'Serial_No_Front_Right__c') {
        const res = await checkWarrentyExistance(
          apiCall,
          customerData.Name,
          null,
          serial.Title,
          null,
          null,
          null,
        );
        if (res.totalSize !== 0) {
          setSerialNumber(null);
          SimpleToast.show('Warrenty has been claimed already!');
        }
      }
      if (serial.key === 'Serial_No_Rear_Right__c') {
        const res = await checkWarrentyExistance(
          apiCall,
          customerData.Name,
          null,
          null,
          serial.Title,
          null,
          null,
        );
        if (res.totalSize !== 0) {
          setSerialNumber(null);
          SimpleToast.show('Warrenty has been claimed already!');
        }
      }
      if (serial.key === 'Spare_Tyre__c') {
        const res = await checkWarrentyExistance(
          apiCall,
          customerData.Name,
          null,
          null,
          null,
          null,
          serial.Title,
        );
        if (res.totalSize !== 0) {
          setSerialNumber(null);
          SimpleToast.show('Warrenty has been claimed already!');
        }
      }
      if (serial.key === 'Serial_No_Rear_Left__c') {
        const res = await checkWarrentyExistance(
          apiCall,
          customerData.Name,
          null,
          null,
          null,
          serial.Title,
          null,
        );
        if (res.totalSize !== 0) {
          setSerialNumber(null);
          SimpleToast.show('Warrenty has been claimed already!');
        }
      }
    } catch (error) {
    } finally {
      setWarrentyLoading(false);
    }
  };

  useEffect(() => {
    let data: any = [];
    if (customerData?.Serial_No_of_Front_Lefts__c) {
      data.push({
        Title: customerData?.Serial_No_of_Front_Lefts__c.toString(),
        key: 'Serial_No_Front_Left__c',
      });
    }
    if (customerData?.Serial_No_of_Front_Rights__c) {
      data.push({
        Title: customerData?.Serial_No_of_Front_Rights__c.toString(),
        key: 'Serial_No_Front_Right__c',
      });
    }
    if (customerData?.Serial_No_of_Rear_Rights__c) {
      data.push({
        Title: customerData?.Serial_No_of_Rear_Rights__c.toString(),
        key: 'Serial_No_Rear_Right__c',
      });
    }
    if (customerData?.Serial_No_of_Spare_Tyres__c) {
      data.push({
        Title: customerData?.Serial_No_of_Spare_Tyres__c.toString(),
        key: 'Spare_Tyre__c',
      });
    }
    if (customerData?.Serial_No_Rear_Lefts__c) {
      data.push({
        Title: customerData?.Serial_No_Rear_Lefts__c.toString(),
        key: 'Serial_No_Rear_Left__c',
      });
    }
    setDropDownData(data);
  }, [
    customerData?.Serial_No_of_Front_Lefts__c,
    customerData?.Serial_No_of_Front_Rights__c,
    customerData?.Serial_No_of_Rear_Rights__c,
    customerData?.Serial_No_of_Spare_Tyres__c,
    customerData?.Serial_No_Rear_Lefts__c,
  ]);

  console.log('otp data >>>', otpData);

  const verifyOTP = useCallback(() => {
    if (otp.length !== 4) {
      return SimpleToast.show('Please enter a valid OTP');
    }
    if (otpData.OTP !== otp) {
      return SimpleToast.show('OTP does not match');
    }
    if (!serialNumber) {
      return SimpleToast.show('Please select serial number');
    }
    let cliamDate = moment(customerData.CreatedDate).format('YYYY-MM-DD');
    if (moment(cliamDate).isAfter('2022-07-01')) {
      let MainDate = moment(customerData.CreatedDate)
        .add(60, 'months')
        .format('YYYY-MM-DD');
      if (moment(cliamDate).isAfter(MainDate)) {
        return SimpleToast.show('Cliam has been expired');
      }
    } else {
      let MainDate = moment(customerData.CreatedDate)
        .add(18, 'months')
        .format('YYYY-MM-DD');
      if (moment(cliamDate).isAfter(MainDate)) {
        return SimpleToast.show('Cliam has been expired');
      }
    }
    navigation.navigate('ClaimPhotos', {
      customerData: customerData,
      otp: otp,
      serialNumber: serialNumber,
    });
  }, [otpData, otp, serialNumber]);

  const sendOtpToNumber = useCallback(async () => {
    if (!customerData) {
      return SimpleToast.show('Please enter your mobile number');
    }
    setOtpLoading(true);
    try {
      let data = {
        PhoneNo: customerData?.Customer_Mobile__c,
      };
      const res = await updateOtpForCostumer(apiCall, data);
      setOtpData(res.data);
      SimpleToast.show(strings.otp_sent);
    } catch (error) {
      console.log(error);
    } finally {
      setOtpLoading(false);
    }
  }, [customerData]);

  return (
    <>
      {warrentyLoading ? <ModalLoading /> : null}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <SafeAreaView style={styles.safe}>
        <CustomStatusBar light color={theme.black} />
        <View style={styles.screen}>
          {/* <CustomBackHeader
            black
            action={() => navigation.goBack()}
            title="New Claim"
          /> */}
          {/* <WhiteModeHeader /> */}
          <CustomNewHeader
            subtitle={
              user_data?.Customer_No__c ? user_data?.Customer_No__c : ''
            }
            action={() => navigation.goBack()}
            title={user_data?.Name ? user_data?.Name : ''}
          />

          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{flex: 1}}>
            <ScrollView
              style={styles.contanier}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}>
              <View style={styles.circleContanier}>
                <View style={styles.checkImage}>
                  <FastImage
                    tintColor={theme.white}
                    resizeMode="contain"
                    style={{
                      height: getScreenHeight(1.5),
                      width: getScreenHeight(1.5),
                    }}
                    source={require('../../assets/images/common/checkline.png')}
                  />
                </View>
                <View
                  style={[styles.divider, {backgroundColor: theme.primary}]}
                />
                <View style={styles.outer}>
                  <View style={styles.insider} />
                </View>
                <View style={styles.divider} />
                <View style={styles.outer}></View>
              </View>

              <View style={styles.textContanier}>
                <Text style={styles.title}>Step 1</Text>
              </View>

              <View style={styles.input}>
                <CustomInput
                  black
                  placeholder="Mobile/Warranty Registration number"
                  value={mobileNumber}
                  action={setMobileNumber}
                />
              </View>
              <View style={{marginVertical: getScreenHeight(2)}}>
                <CustomButton
                  loading={loading}
                  iconmargin={getScreenHeight(1)}
                  align="center"
                  title="Check Customer"
                  font={fonts.regular}
                  size={getScreenHeight(2)}
                  icon={require('../../assets/images/arrows/arrowright.png')}
                  action={getCliamManager}
                />
              </View>

              {records.map((data, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setCustomerData(data);
                      setSerialNumber(null);
                    }}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: getScreenHeight(2),
                    }}>
                    <Text
                      style={{
                        fontFamily: fonts.medium,
                        fontSize: getScreenHeight(1.8),
                        color: theme.black,
                      }}>
                      {data?.Name}
                    </Text>
                    <FastImage
                      resizeMode="contain"
                      style={{
                        height: getScreenHeight(2),
                        width: getScreenHeight(2),
                      }}
                      tintColor={'black'}
                      source={
                        customerData === data
                          ? Images.downarrow
                          : Images.arrow_right
                      }
                    />
                  </TouchableOpacity>
                );
              })}

              <View style={styles.input}>
                <CustomInput
                  black
                  editable={false}
                  placeholder="Customer Name"
                  value={customerData?.Customer__r?.Name}
                  action={setName}
                />
              </View>

              <View style={styles.input}>
                <CustomInput
                  black
                  editable={false}
                  placeholder="Customer Ph No"
                  value={customerData?.Customer_Mobile__c}
                  action={setPhoneNo}
                  keyboardType="number-pad"
                  maxLength={10}
                />
              </View>

              {/* <View style={styles.customTextInput}>
                <View style={{width: '46%'}}>
                  <CustomInput
                    black
                    selection={{
                      start: 0,
                      end: 0,
                    }}
                    editable={false}
                    value={customerData?.Purchase_From__r?.Name}
                    placeholder="Purchase from"
                    action={setPurchaseFrom}
                  />
                </View>

                <View style={{width: '46%'}}>
                  <CustomPressable
                    disabled={true}
                    editable={false}
                    black
                    title={
                      customerData?.Date_of_Purcahse__c
                        ? customerData?.Date_of_Purcahse__c
                        : 'any'
                    }
                    action={showDatePicker}
                    icon={
                      <FastImage
                        resizeMode="contain"
                        tintColor={theme.primary}
                        style={styles.icon}
                        source={require('../../assets/images/common/calendar.png')}
                      />
                    }
                  />
                </View>
              </View> */}

              <View style={styles.input}>
                <CustomInput
                  editable={false}
                  black
                  placeholder="Vehicle Make"
                  value={customerData?.Make__c}
                  action={setVehicleMake}
                />
              </View>

              <View style={styles.input}>
                <CustomInput
                  editable={false}
                  black
                  placeholder="Vehicle Model"
                  value={customerData?.Model__c}
                  action={setVehicleModel}
                />
              </View>

              <View style={styles.input}>
                <CustomInput
                  editable={false}
                  black
                  placeholder="Vehicle Year"
                  value={customerData?.Year__c}
                  action={setVehicleYear}
                />
              </View>

              <View
                style={[
                  {
                    height: getScreenHeight(6),
                    marginHorizontal: getScreenHeight(0.2),
                  },
                  Platform.OS === 'ios' ? {zIndex: 2} : null,
                ]}>
                <CustomDropDown
                  black
                  title={serialNumber ? serialNumber.Title : 'Serial Number'}
                  action={() => {
                    setSerialNumberModal(!serialNumberModal);
                  }}
                />
                {serialNumberModal ? (
                  <View style={[Platform.OS === 'ios' ? {zIndex: 10} : null]}>
                    <Dropdown
                      action={(item: any) => {
                        setSerialNumberModal(false);
                        setSerialNumber(item);
                        checkWarrentyExistanceManager(item);
                      }}
                      placeholder="Serial Number"
                      data={dropDownData}
                    />
                  </View>
                ) : null}
              </View>

              <Spacer height={getScreenHeight(3)} />

              <View style={{marginVertical: getScreenHeight(2)}}>
                <Text style={styles.title}>Tyre Details</Text>
              </View>
              <Text style={[styles.title, {fontSize: getScreenHeight(1.5)}]}>
                Tyre Size*
              </Text>
              <View style={styles.dropDownContanier}>
                <View style={{width: '47%'}}>
                  <CustomDropDownLabel
                    black
                    label="Width"
                    value={
                      customerData?.Article__r?.Section_Width_Y__c
                        ? customerData?.Article__r?.Section_Width_Y__c
                        : 'NA'
                    }
                  />
                </View>

                {/* <View style={{width: '47%'}}>
                  <CustomDropDownLabel
                    black
                    label="Profile"
                    value={
                      customerData?.Tyre_Size_Profile__c
                        ? customerData?.Tyre_Size_Profile__c
                        : 'NA'
                    }
                  />
                </View> */}

                <View style={{width: '47%'}}>
                  <CustomDropDownLabel
                    black
                    label="Rim Size"
                    value={
                      customerData?.Article__r?.Nom_Rim_Diameter__c
                        ? customerData?.Article__r?.Nom_Rim_Diameter__c
                        : 'NA'
                    }
                  />
                </View>
              </View>

              <View style={styles.input}>
                <CustomInput
                  black
                  editable={false}
                  placeholder="Size"
                  value={customerData?.Size__c}
                  // value={size}
                  action={setSize}
                />
              </View>

              <View style={styles.input}>
                <CustomInput
                  editable={false}
                  black
                  placeholder="Pattern"
                  action={setVehicleYear}
                  value={customerData?.Tyre_Pattern__c}
                />
              </View>

              {customerData?.Serial_No__c?.split('') ? (
                <>
                  <Text
                    style={[styles.title, {fontSize: getScreenHeight(1.5)}]}>
                    Tyre Serial No*
                  </Text>
                  <ScrollView
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    horizontal
                    style={{marginVertical: getScreenHeight(2)}}>
                    {customerData.Serial_No__c.split('').map(
                      (item: any, index: any) => {
                        return (
                          <View key={index} style={styles.box}>
                            <Text
                              style={[
                                styles.title,
                                {fontSize: getScreenHeight(1.5)},
                              ]}>
                              {item}
                            </Text>
                          </View>
                        );
                      },
                    )}
                  </ScrollView>
                </>
              ) : null}

              {otpLoading ? (
                <ActivityIndicator size={'small'} color={theme.primary} />
              ) : (
                <TouchableOpacity
                  disabled={otpLoading}
                  onPress={sendOtpToNumber}
                  style={styles.button}>
                  <Text style={[styles.title, {color: theme.white}]}>
                    Send OTP
                  </Text>
                </TouchableOpacity>
              )}

              <OTPInputView
                autoFocusOnLoad={false}
                selectionColor={theme.black}
                style={{width: '100%', height: getScreenHeight(15)}}
                pinCount={4}
                codeInputHighlightStyle={{color: theme.black}}
                placeholderCharacter="*"
                placeholderTextColor={theme.black}
                onCodeChanged={(code: any) => {
                  setOtp(code);
                  console.log(code);
                }}
                keyboardType="number-pad"
                codeInputFieldStyle={styles.underlineStyleBase}
              />

              <TouchableOpacity
                disabled={otpLoading}
                onPress={sendOtpToNumber}
                style={styles.row}>
                <Text style={[styles.title, {fontSize: getScreenHeight(1.5)}]}>
                  Resend OTP
                </Text>
                <FastImage
                  tintColor={theme.black}
                  resizeMode="contain"
                  source={require('../../assets/images/common/resend.png')}
                  style={[styles.icon, {marginLeft: getScreenHeight(1)}]}
                />
              </TouchableOpacity>

              <View style={{marginVertical: getScreenHeight(2)}}>
                <CustomButton
                  action={verifyOTP}
                  iconmargin={getScreenHeight(1)}
                  align="center"
                  title="Next"
                  font={fonts.regular}
                  size={getScreenHeight(2)}
                  icon={require('../../assets/images/arrows/arrowright.png')}
                />
              </View>

              <View style={{height: getScreenHeight(5)}} />
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </SafeAreaView>
    </>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.white,
    },
    safe: {
      flex: 1,
      backgroundColor: theme.black,
    },
    outer: {
      height: getScreenHeight(3),
      width: getScreenHeight(3),
      backgroundColor: 'transparent',
      borderRadius: getScreenHeight(2),
      borderWidth: getScreenHeight(0.5),
      borderColor: theme.accent,
      justifyContent: 'center',
      alignItems: 'center',
    },
    checkImage: {
      height: getScreenHeight(3),
      width: getScreenHeight(3),
      borderRadius: getScreenHeight(3),
      backgroundColor: theme.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    insider: {
      height: getScreenHeight(1),
      width: getScreenHeight(1),
      backgroundColor: theme.accent,
      borderRadius: getScreenHeight(1),
    },
    circleContanier: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    divider: {
      height: getScreenHeight(0.2),
      backgroundColor: theme.accent,
      flex: 1,
    },
    contanier: {
      padding: getScreenHeight(2),
    },
    icon: {
      height: getScreenHeight(2.5),
      width: getScreenHeight(2.5),
    },
    title: {
      fontFamily: fonts.bold,
      color: theme.black,
      fontSize: getScreenHeight(2),
    },
    textContanier: {
      alignSelf: 'center',
      marginVertical: getScreenHeight(2),
    },
    input: {
      marginBottom: getScreenHeight(2),
    },
    customTextInput: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
    },
    dropDownContanier: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      marginVertical: getScreenHeight(2),
    },
    box: {
      height: getScreenHeight(4),
      borderColor: theme.accent,
      borderWidth: getScreenHeight(0.1),
      width: getScreenHeight(4),
      borderRadius: getScreenHeight(1),
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: getScreenHeight(1),
    },
    button: {
      backgroundColor: theme.primary,
      paddingHorizontal: getScreenHeight(2),
      alignSelf: 'center',
      borderRadius: getScreenHeight(1),
      paddingVertical: getScreenHeight(1),
      marginTop: getScreenHeight(3),
    },

    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: getScreenHeight(2),
    },
    underlineStyleBase: {
      width: getScreenHeight(5),
      height: getScreenHeight(6),
      borderWidth: 0,
      borderBottomWidth: getScreenHeight(0.2),
      color: theme.black,
      fontFamily: fonts.regular,
    },
    underlineStyleHighLighted: {
      color: theme.black,
    },
  });

export default NewClaim;
