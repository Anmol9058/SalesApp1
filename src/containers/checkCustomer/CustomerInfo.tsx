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
  Touchable,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';

import {authContext, themeContext} from '../../contexts/context';
import CustomStatusBar from '../../components/CustomStatusBar';
import FastImage from 'react-native-fast-image';
import {
  getNumbersOnly,
  getScreenHeight,
  getScreenWidth,
} from '../../utils/domUtil';
import fonts from '../../constants/fonts';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import OTPTextView from '../../components/OtpTextInput';
import WhiteModeHeader from '../../components/WhiteModeHeader';
import CustomRadioButton from '../../components/CustomRadioButton';
import NotFound from '../../components/NotFound';
import SimpleToast from 'react-native-simple-toast';
import {
  createCustomer,
  createVehicle,
  customerExistanceUsingMobile,
  getCustomerVehicles,
  updateOtpForCostumer,
} from '../../api/home';
import useApi from '../../hooks/useApi';
import {useQuery} from 'react-query';
import FullScreenLoader from '../../components/FullScreenLoader';
import strings from '../../constants/strings';
import Images from '../../constants/images';
import CustomCheckBox from '../../components/CustomCheckBox';
import Spacer from '../../components/Spacer';
import CustomNewHeader from '../../components/CustomNewHeader';

const CustomerInfo = ({navigation}: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const {apiCall} = useApi();
  const {user_id, tokens, user_data}: any = useContext(authContext);

  const [mobileNumber, setMobileNumber] = useState('');
  const [name, setName] = useState('');
  const [vehicles, setVehicles] = useState([{name: ''}]);
  const [existData, setExistData]: any = useState(null);
  const [type, setType] = useState('New Purchase');
  const [customerId, setCustomerId] = useState('');
  const [otp, setOtp] = useState('');
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpData, setOtpData]: any = useState(null);
  const [vehicleList, setVehicleList] = useState([]);
  const [selectVehicle, setSelectVehicle]: any = useState(null);

  const [checkLoading, setCheckLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [addVehicleLoading, setAddVehicleLoading] = useState(false);
  const [isFleetCustomer, setIsFleetCustomer] = useState(false);

  const addVehicleHandler = useCallback(
    (vehicle: any) => {
      setVehicles(pre => [{name: ''}, ...pre]);
    },
    [vehicles],
  );

  const vehicleNameHandler = useCallback(
    (name: any, index: any) => {
      let arr = [...vehicles];
      arr[index].name = name;
      setVehicles(arr);
    },
    [vehicles],
  );

  useEffect(() => {
    if (customerId) {
      getCustomerVehiclesManager(customerId);
    }
  }, [customerId]);

  useEffect(() => {
    if (mobileNumber.length !== 10) {
      setExistData(null);
      setName('');
      setVehicleList([]);
    }
  }, [mobileNumber]);

  const checkCustomerHandler = async (mobileNumber: any) => {
    setExistData(null);
    if (mobileNumber.length !== 10) {
      return SimpleToast.show('Please enter a valid phone number');
    }
    setCheckLoading(true);
    try {
      const res = await customerExistanceUsingMobile(apiCall, mobileNumber);
      if (res.data.totalSize === 0) {
        createCustomerHandler(mobileNumber, name);
      } else {
        setCustomerId(res.data.records[0].Id);
        setExistData(res.data.records[0]);
        setName(res.data.records[0].Name);
        SimpleToast.show(strings.profile_found);
      }
    } catch (error) {
      SimpleToast.show(strings.something_went_wrong);
    } finally {
      setCheckLoading(false);
    }
  };

  const createCustomerHandler = async (phoneNo: any, name: any) => {
    if (name.trim().length === 0) {
      return SimpleToast.show(strings.new_customer);
    }
    if (!phoneNo.trim()) {
      return SimpleToast.show(strings.enter_phone_number);
    }
    try {
      setRegisterLoading(true);
      let records = [
        {
          attributes: {type: 'Customer__c', referenceId: 'ref1'},
          Name: name,
          Customer_Mobile__c: phoneNo,
          Vehicle_No__c: null,
          Dealer__c: user_id,
        },
      ];
      const res: any = await createCustomer(apiCall, {records});
      if (!res.hasErrors) {
        SimpleToast.show(strings.profile_created);
        checkCustomerHandler(mobileNumber);
      }
    } catch (error) {
      SimpleToast.show(strings.unable_to_create_profile);
    } finally {
      setRegisterLoading(false);
    }
  };

  const getCustomerVehiclesManager = useCallback(
    async (customer_id: any) => {
      try {
        const res = await getCustomerVehicles(apiCall, customer_id);
        setVehicleList(res?.records[0]?.Customer_Vehicles__r?.records);
        return res;
      } catch (error) {
        console.log(error);
      }
    },
    [apiCall],
  );

  const verifyOTP = useCallback(() => {
    if (otp.length !== 4) {
      return SimpleToast.show('Please enter a valid OTP');
    }
    if (otpData.OTP !== otp) {
      return SimpleToast.show('OTP does not match');
    }
    navigation.navigate('AddPhotos', {
      selectVehicle,
      existData,
      otp,
      mobileNumber,
      Types_of_Registration__c: type,
    });
  }, [otpData, otp]);

  console.log('Otp data >>>', otpData);

  const createVehicleHandler = useCallback(
    async (customerId: any, vehicleNumber: any, index: any) => {
      if (vehicleNumber.trim().length === 0) {
        return SimpleToast.show(strings.enter_vehicle_name);
      }
      if (!customerId) {
        return SimpleToast.show(strings.check_customer_status);
      }
      setAddVehicleLoading(true);
      try {
        let records = [
          {
            attributes: {type: 'CustomerVehicle__c', referenceId: 'ref1'},
            Customer__c: customerId,
            Vehicle_No__c: vehicleNumber,
            Front_Left__c: null,
            Front_Right__c: null,
            Model__c: null,
            Odometer_Reading__c: null,
            Rear_Left__c: null,
            Rear_Right__c: null,
            Registration_No__c: null,
            Spare_Tyre__c: null,
            Tyre_Pattern__c: null,
            Tyre_Size__c: null,
            Year__c: null,
          },
        ];
        const res = await createVehicle(apiCall, {records});
        if (!res.hasErrors) {
          let allVehicles = [...vehicles];
          allVehicles.splice(index, 1);
          if (allVehicles.length === 0) {
            setVehicles([{name: ''}]);
          } else {
            setVehicles(allVehicles);
          }
          getCustomerVehiclesManager(customerId);
          SimpleToast.show(strings.vehicle_added);
        }
      } catch (error) {
      } finally {
        setAddVehicleLoading(false);
      }
    },
    [user_id, vehicles],
  );

  const renderVehicles = useCallback(
    ({item}: any) => {
      return (
        <View style={styles.item}>
          <CustomRadioButton
            selected={item.Id === selectVehicle?.Id}
            action={() => {
              setSelectVehicle(item);
            }}
            title={item?.Vehicle_No__c}
          />
        </View>
      );
    },
    [selectVehicle],
  );

  const keyExtractor = useCallback(
    (item: any, index: any) => index.toString(),
    [],
  );

  const NoFound = () => {
    return <NotFound title={strings.no_vehicle} />;
  };

  const sendOtpToNumber = useCallback(async () => {
    if (mobileNumber.length !== 10) {
      return SimpleToast.show(strings.valid_phone);
    }
    setOtpLoading(true);
    try {
      let data = {
        PhoneNo: mobileNumber,
      };
      const res = await updateOtpForCostumer(apiCall, data);
      setOtpData(res.data);
      SimpleToast.show(strings.otp_sent);
    } catch (error) {
      console.log(error);
    } finally {
      setOtpLoading(false);
    }
  }, [mobileNumber]);

  return (
    <SafeAreaView style={styles.safe}>
      <CustomStatusBar light color={theme.black} />
      <View style={styles.screen}>
        {/* <WhiteModeHeader /> */}
        <CustomNewHeader
          subtitle={user_data?.Customer_No__c ? user_data?.Customer_No__c : ''}
          action={() => navigation.goBack()}
          title={user_data?.Name ? user_data?.Name : ''}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
              <Text style={styles.title}>Type of Registration</Text>
              <View style={styles.newRow}>
                <CustomRadioButton
                  selected={type === 'New Purchase' ? true : false}
                  action={() => {
                    setMobileNumber('');
                    setType('New Purchase');
                    setVehicles([{name: ''}]);
                    setExistData(null);
                  }}
                  title="New Purchase"
                />
                <CustomRadioButton
                  selected={type === 'Claim Replacement' ? true : false}
                  action={() => {
                    setMobileNumber('');
                    setType('Claim Replacement');
                    setVehicles([{name: ''}]);
                    setExistData(null);
                    // navigation.navigate('NewClaim');
                  }}
                  title="Claim Replacement"
                />
                <View />
              </View>
              <View style={styles.input}>
                <CustomInput
                  black
                  maxLength={10}
                  keyboardType="numeric"
                  placeholder={strings.enter_mobile_number}
                  value={mobileNumber}
                  action={(text: any) => setMobileNumber(getNumbersOnly(text))}
                />
              </View>

              <CustomCheckBox
                selected={isFleetCustomer}
                action={() => setIsFleetCustomer(!isFleetCustomer)}
                title="Fleet Customer"
              />

              <View style={styles.input}>
                <CustomButton
                  loading={checkLoading}
                  iconmargin={getScreenHeight(1)}
                  align="center"
                  action={() => checkCustomerHandler(mobileNumber)}
                  title={strings.check_customer}
                  font={fonts.regular}
                  size={getScreenHeight(2)}
                  icon={Images.arrow_right}
                />
              </View>

              <Text style={styles.title}>Customer Information</Text>

              <View style={styles.input}>
                <CustomInput
                  editable={existData ? false : true}
                  black
                  placeholder="Name"
                  value={existData ? existData?.Name : name}
                  action={setName}
                />
              </View>

              {existData ? null : (
                <CustomButton
                  loading={registerLoading}
                  iconmargin={getScreenHeight(0.5)}
                  align="center"
                  action={() => createCustomerHandler(mobileNumber, name)}
                  title={'Register'}
                  font={fonts.regular}
                  size={getScreenHeight(2)}
                  icon={Images.arrow_right}
                />
              )}

              <FlatList
                data={vehicleList}
                keyExtractor={keyExtractor}
                renderItem={renderVehicles}
                ListEmptyComponent={NoFound}
              />
            </View>

            <View style={styles.footer}>
              <TouchableOpacity
                onPress={addVehicleHandler}
                style={styles.customButton}>
                <FastImage
                  source={require('../../assets/images/common/plus.png')}
                  style={styles.icon}
                  resizeMode="contain"
                  tintColor={theme.white}
                />
                <Text
                  style={[
                    styles.title,
                    {fontSize: getScreenHeight(1.5), color: theme.white},
                  ]}>
                  Add New
                </Text>
              </TouchableOpacity>
              {addVehicleLoading ? (
                <ActivityIndicator size={'small'} color={theme.primary} />
              ) : null}
              {vehicles?.map((item, index) => {
                return (
                  <View style={styles.input}>
                    <CustomInput
                      color={theme.white}
                      placeholder={strings.customer_vehicle}
                      value={item?.name}
                      action={(text: any) => vehicleNameHandler(text, index)}
                      rightAction={() => {
                        createVehicleHandler(customerId, item.name, index);
                      }}
                      icon={
                        <FastImage
                          resizeMode="contain"
                          tintColor={theme.white}
                          style={styles.icon}
                          source={Images.check}
                        />
                      }
                    />
                  </View>
                );
              })}

              {otpLoading ? (
                <ActivityIndicator size={'large'} color={theme.primary} />
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    if (selectVehicle) {
                      sendOtpToNumber();
                    } else {
                      SimpleToast.show('Please select a vehicle!');
                    }
                  }}
                  style={styles.button}>
                  <Text style={[styles.title, {color: theme.black}]}>
                    Send OTP
                  </Text>
                </TouchableOpacity>
              )}

              <OTPInputView
                selectionColor={theme.white}
                style={{width: '100%', height: getScreenHeight(15)}}
                pinCount={4}
                autoFocusOnLoad={false}
                codeInputHighlightStyle={{color: theme.white}}
                placeholderCharacter="*"
                placeholderTextColor={theme.white}
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
                <Text
                  style={[
                    styles.title,
                    {fontSize: getScreenHeight(1.5), color: theme.white},
                  ]}>
                  Resend OTP
                </Text>
                <FastImage
                  tintColor={theme.white}
                  resizeMode="contain"
                  source={require('../../assets/images/common/resend.png')}
                  style={[styles.icon, {marginLeft: getScreenHeight(1)}]}
                />
              </TouchableOpacity>

              <Spacer height={getScreenHeight(2)} />

              <View style={{}}>
                <CustomButton
                  action={() => {
                    if (selectVehicle) {
                      if (otpData) {
                        verifyOTP();
                      } else {
                        SimpleToast.show('Please click on send otp');
                      }
                    } else {
                      SimpleToast.show('Please select a vehicle!');
                    }
                  }}
                  iconmargin={getScreenHeight(1)}
                  align="center"
                  title="Next"
                  font={fonts.regular}
                  size={getScreenHeight(2)}
                  icon={require('../../assets/images/arrows/arrowright.png')}
                />
              </View>

              <Spacer height={getScreenHeight(10)} />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
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
    safe: {
      flex: 1,
      backgroundColor: theme.black,
    },
    header: {
      padding: getScreenHeight(2),
      backgroundColor: theme.white,
    },
    title: {
      fontFamily: fonts.bold,
      color: theme.black,
      fontSize: getScreenHeight(2),
    },
    input: {
      marginVertical: getScreenHeight(4),
    },
    radioContanier: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    outerCircle: {
      width: getScreenHeight(2),
      height: getScreenHeight(2),
      borderRadius: getScreenHeight(2),
      backgroundColor: theme.white,
    },
    footer: {
      backgroundColor: theme.black,
      padding: getScreenHeight(2),
      borderTopLeftRadius: getScreenHeight(2),
      borderTopRightRadius: getScreenHeight(2),
    },
    customButton: {
      alignSelf: 'flex-end',
      backgroundColor: '#4D4D4D',
      padding: getScreenHeight(1),
      borderRadius: getScreenHeight(2),
      flexDirection: 'row',
      alignItems: 'center',
    },
    icon: {
      height: getScreenHeight(2.5),
      width: getScreenHeight(2.5),
      marginRight: getScreenHeight(1),
    },
    button: {
      backgroundColor: theme.white,
      paddingHorizontal: getScreenHeight(2),
      alignSelf: 'center',
      borderRadius: getScreenHeight(1),
      paddingVertical: getScreenHeight(1),
    },
    otpContanier: {
      marginTop: getScreenHeight(2),
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: getScreenHeight(2),
    },
    newRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: getScreenHeight(2),
    },
    item: {
      marginBottom: getScreenHeight(2),
    },
    underlineStyleBase: {
      width: getScreenHeight(5),
      height: getScreenHeight(6),
      borderWidth: 0,
      borderBottomWidth: getScreenHeight(0.2),
      color: theme.white,
      fontFamily: fonts.regular,
    },
    underlineStyleHighLighted: {
      color: theme.white,
    },
  });

export default CustomerInfo;
