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
  Alert,
  Linking,
} from 'react-native';
import {StackActions} from '@react-navigation/native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import ImgToBase64 from 'react-native-image-base64';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {authContext, themeContext} from '../../contexts/context';
import CustomStatusBar from '../../components/CustomStatusBar';
import {getScreenHeight, getScreenWidth} from '../../utils/domUtil';
import fonts from '../../constants/fonts';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import WhiteModeHeader from '../../components/WhiteModeHeader';
import useApi from '../../hooks/useApi';
import {
  createWarrantyRegistration,
  getCustomerVehicleDetail,
  updateCustomerVehicle,
  uploaWarrantyAttachmentsImage,
} from '../../api/home';
import CustomCheckBox from '../../components/CustomCheckBox';
import SimpleToast from 'react-native-simple-toast';
import Spacer from '../../components/Spacer';
import ModalLoading from '../../components/ModalLoading';
import InlineTextInput from '../../components/InlineTextInput';
import ClaimSuccess from '../../components/ClaimSuccess';
import CustomPressable from '../../components/CustomPressable';
import FastImage from 'react-native-fast-image';

const VehicleDetails = ({navigation, route}: any) => {
  const {theme} = useContext(themeContext);
  const {user_id} = useContext(authContext);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const {apiCall} = useApi();
  const selectVehicle = route.params.selectVehicle;
  const invoiceNo = route.params.invoiceNo;
  const invoiceDate = route.params.invoiceDate;
  const data = route.params.data;
  const existData = route.params.existData;
  const otp = route.params.otp;
  const mobileNumber = route.params.mobileNumber;
  const Types_of_Registration__c = route.params.Types_of_Registration__c;
  const photos = route.params.photos;
  const [showModal, setShowModal] = useState(false);

  const [registerNumber, setRegisterNumber] = useState(
    `${selectVehicle.Vehicle_No__c}`,
  );
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [odoReading, setOdoReading] = useState('');
  const [tyreSize, setTyreSize] = useState(data[0]?.content?.Tire_Size__c);
  const [tyrePattern, setTyrePattern] = useState(
    data[0]?.content?.Tire_Pattern__c,
  );
  const [articleNumber, setArticleNumber] = useState(
    data[0]?.content?.Sale_Article_No__r.Name,
  );

  const [frontRight, setFrontRight] = useState('');
  const [rearRight, setRearRight] = useState('');
  const [frontLeft, setFrontLeft] = useState('');
  const [rearLeft, setRearLeft] = useState('');
  const [spareTyre, setSpareTyre] = useState('');
  const [loading, setLoading] = useState(false);
  const [termsSelected, setTermsSelected] = useState(false);
  const [fetchloading, setFetchLoading] = useState(false);
  const [serialNo, setSerialNo] = useState('');
  const [frontRightSerial, setFrontRightSerial] = useState('');
  const [rearRightSerial, setRearRightSerial] = useState('');
  const [rearLeftSerial, setRearLeftSerial] = useState('');
  const [spareTyreSerial, setSpareTyreSerial] = useState('');
  const [frontLeftSerial, setFrontLeftSerial] = useState('');
  const [imageLoading, setImageLoading] = useState(false);

  useEffect(() => {
    if (selectVehicle?.Vehicle_No__c) {
      getVehicleDetail(selectVehicle?.Vehicle_No__c);
    }
  }, [selectVehicle?.Vehicle_No__c]);

  const getVehicleDetail = async (name: any) => {
    setFetchLoading(true);
    try {
      const res = await getCustomerVehicleDetail(apiCall, name);

      if (res?.records[0]) {
        setModel(res?.records[0]?.Model__c);
        setYear(res?.records[0]?.Year__c?.toString());
        setMake(res?.records[0]?.Make__c?.toString());
        setOdoReading(res?.records[0]?.Odometer_Reading__c?.toString());
      }
    } catch (error) {
      console.log(error);
    } finally {
      setFetchLoading(false);
    }
  };

  const populateValues = (data: any) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i]?.key === 'Front_Left__c') {
        setFrontLeft(data[i]?.value?.data);
      }
      if (data[i].key === 'Front_Right__c') {
        setFrontRight(data[i]?.value?.data);
      }
      if (data[i].key === 'Rear_Left__c') {
        setRearLeft(data[i]?.value?.data);
      }
      if (data[i].key === 'Rear_Right__c') {
        setRearRight(data[i]?.value?.data);
      }
      if (data[i].key === 'Spare_Tyre__c') {
        setSpareTyre(data[i]?.value?.data);
      }
    }
  };

  useEffect(() => {
    if (data) {
      populateValues(data);
    }
  }, [data]);

  const customerVehicleManager = async () => {
    if (!tyrePattern) {
      return SimpleToast.show('Please fill out tyre pattern');
    }
    if (!tyreSize) {
      return SimpleToast.show('Please fill out the tyre size');
    }
    if (!model) {
      return SimpleToast.show('Please fill out the model');
    }
    if (!registerNumber) {
      return SimpleToast.show('Please fill out the Registration number');
    }
    if (!odoReading) {
      return SimpleToast.show('Please fill out the odo meter reading');
    }
    if (!year) {
      return SimpleToast.show('Please fill out the year!');
    }
    if (!termsSelected) {
      return SimpleToast.show('Please check terms and conditions!');
    }
    for (let i = 0; i < data.length; i++) {
      if (data[i].value) {
        if (data[i].key === 'Front_Right__c') {
          if (frontRightSerial.length !== 4) {
            return SimpleToast.show(
              'Please enter a valid front right serial number',
            );
          }
        }
        if (data[i].key === 'Rear_Right__c') {
          if (rearRightSerial.length !== 4) {
            return SimpleToast.show(
              'Please enter a valid rear right serial number',
            );
          }
        }
        if (data[i].key === 'Rear_Left__c') {
          if (rearLeftSerial.length !== 4) {
            return SimpleToast.show(
              'Please enter a valid front rear left number',
            );
          }
        }
        if (data[i].key === 'Spare_Tyre__c') {
          if (spareTyreSerial.length !== 4) {
            return SimpleToast.show(
              'Please enter a valid spare tyre serial number',
            );
          }
        }
        if (data[i].key === 'Front_Left__c') {
          if (frontLeftSerial.length !== 4) {
            return SimpleToast.show(
              'Please enter a valid front left serial number',
            );
          }
        }
      }
    }
    try {
      setLoading(true);
      let createVehicleData = {
        batchRequests: [
          {
            method: 'PATCH',
            url: `v45.0/sobjects/CustomerVehicle__c/${selectVehicle.Id}`,
            richInput: {
              Customer__c: existData.Id,
              Vehicle_No__c: registerNumber,
              Front_Left__c: frontLeftSerial ? parseInt(frontLeftSerial) : 0,
              Front_Right__c: frontRightSerial ? parseInt(frontRightSerial) : 0,
              Rear_Left__c: rearLeftSerial ? parseInt(rearLeftSerial) : 0,
              Rear_Right__c: rearRightSerial ? parseInt(rearRightSerial) : 0,
              Spare_Tyre__c: spareTyreSerial ? parseInt(spareTyreSerial) : 0,
              Model__c: model,
              Odometer_Reading__c: parseInt(odoReading),
              Registration_No__c: registerNumber,
              Tyre_Pattern__c: tyrePattern,
              Tyre_Size__c: tyreSize,
              Year__c: parseInt(year),
              Make__c: make,
            },
          },
          {
            method: 'GET',
            url: `v34.0/sobjects/CustomerVehicle__c/${selectVehicle.Id}?fields=id`,
          },
        ],
      };

      let datas = [
        {
          attributes: {type: 'Warranty_Registration__c', referenceId: 'ref1'},
          Dealer__c: user_id,
          Customer_Vehicle__c: selectVehicle.Id,
          OTP__c: otp,
          Customer_Mobile__c: mobileNumber,
          // Name: selectVehicle.Name,
          NO_Of_Tyres__c: data.filter(
            (data: any) => data.content && data.value && data.key,
          ).length,
          Types_of_Registration__c: Types_of_Registration__c,
          Customer__c: existData.Id,
          Size__c: tyreSize,
          Pattern__c: tyrePattern,
          Article__c: data[0]?.content.Sale_Article_No__c,
          Odometer_Reading__c: odoReading,
          Odometer_Reading2__c: '',
          Sidewall_Photo_4__c: '',
          Vehicle_No_Plate_1__c: '',
          Invoice_Photo_1__c: '',
          Vehicle_No_Plate_2__c: '',
          Registration_No__c: registerNumber,
          Model__c: model,
          Make__c: make,
          Serial_No_Rear_Left__c: rearLeft,
          Serial_No_Rear_Right__c: rearRight,
          Serial_No_Front_Left__c: frontLeft,
          Serial_No_Front_Right__c: frontRight,
          Tyre_Pattern__c: tyrePattern,
          Serial_No_Spare_Tyre__c: spareTyre,
          Invoice_No__c: invoiceNo,
          Invoice_Date__c: invoiceDate,
          Year__c: year,
          Serial_No__c: serialNo,
          Serial_No_Rear_Lefts__c: rearLeftSerial
            ? parseInt(rearLeftSerial)
            : '',
          Serial_No_of_Rear_Rights__c: rearRightSerial
            ? parseInt(rearRightSerial)
            : '',
          Serial_No_of_Front_Lefts__c: frontLeftSerial
            ? parseInt(frontLeftSerial)
            : '',
          Serial_No_of_Front_Rights__c: frontRightSerial
            ? parseInt(frontRightSerial)
            : '',
          Serial_No_of_Spare_Tyres__c: spareTyreSerial
            ? parseInt(spareTyreSerial)
            : '',
        },
      ];

      const createRes = await updateCustomerVehicle(apiCall, createVehicleData);
      if (!createRes.hasErrors) {
        const res = await createWarrantyRegistration(apiCall, {records: datas});
        if (res.results) {
          setLoading(true);
          setShowModal(true);
          SimpleToast.show('Warrenty has been updated!');
          photos.map((data: any) => {
            getBase64(data.photo, res.results[0].id, data.key);
          });
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getBase64 = (imageData: any, id: any, name: any) => {
    ImgToBase64.getBase64String(imageData.path)
      .then(async (base64String: any) => {
        uploadImageHandler(imageData, base64String, id, name);
      })
      .catch((err: any) => console.log(err));
  };

  const uploadImageHandler = useCallback(
    async (imageData: any, base64: any, id: any, name: any) => {
      setImageLoading(true);
      let filename = name;
      let data = {
        Name: filename + '.jpeg',
        Body: base64,
        parentId: id,
      };
      try {
        const res = await uploaWarrantyAttachmentsImage(apiCall, data);
        if (res.success) {
          setImageLoading(false);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setImageLoading(false);
      }
    },
    [user_id, imageLoading],
  );

  return (
    <>
      {imageLoading || fetchloading ? <ModalLoading /> : null}

      {showModal ? (
        <ClaimSuccess
          subtitle="Your Warranty has been registered successfully!"
          pressHandler={() => {
            navigation.dispatch(StackActions.popToTop());
            setShowModal(false);
          }}
        />
      ) : null}

      <SafeAreaView style={styles.safe}>
        <CustomStatusBar light color={theme.black} />
        <View style={styles.screen}>
          <WhiteModeHeader action={() => navigation.goBack()} back />

          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{flex: 1}}>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}>
              <View style={styles.header}>
                <View style={styles.contanier}>
                  <Text style={styles.title}>Vehicle Details</Text>
                </View>

                <View style={styles.input}>
                  <CustomInput
                    black
                    placeholder="Registration No."
                    value={registerNumber}
                    action={setRegisterNumber}
                  />
                </View>

                <View style={styles.input}>
                  <CustomInput
                    black
                    placeholder="Make"
                    value={make}
                    action={setMake}
                  />
                </View>

                <View style={styles.input}>
                  <CustomInput
                    black
                    placeholder="Model"
                    value={model}
                    action={setModel}
                  />
                </View>

                <View style={styles.input}>
                  <CustomInput
                    black
                    placeholder="Year"
                    value={year}
                    action={setYear}
                  />
                </View>

                <View style={styles.input}>
                  <CustomInput
                    black
                    placeholder="Odo meter reading"
                    value={odoReading}
                    action={setOdoReading}
                  />
                </View>

                <Text style={[styles.title, {marginTop: getScreenHeight(2)}]}>
                  Tyre Details
                </Text>
                <Spacer />

                <View style={styles.input}>
                  <CustomInput
                    black
                    placeholder="Tyre Size"
                    value={tyreSize}
                    action={setTyreSize}
                  />
                </View>

                <View style={styles.input}>
                  <CustomInput
                    black
                    placeholder="Tyre Pattern"
                    value={tyrePattern}
                    action={setTyrePattern}
                  />
                </View>

                {/* {data[0]?.content?.Article__c ? ( */}
                <View style={styles.input}>
                  <CustomInput
                    black
                    placeholder="Article No"
                    value={articleNumber}
                    action={setArticleNumber}
                  />
                </View>
                {/* ) : null} */}

                <Spacer />

                <View style={styles.titleContanier}>
                  <Text style={styles.title}>Position</Text>
                  <Text
                    style={[styles.title, {marginLeft: getScreenHeight(5)}]}>
                    Tyre Serial Number
                  </Text>
                </View>

                {data.filter((item: any) => item.key === 'Front_Right__c')
                  .length ? (
                  <View style={styles.mainRow}>
                    <Text style={styles.mainTitle}>Front Right</Text>
                    <OTPInputView
                      selectionColor={theme.black}
                      style={{flex: 1, height: getScreenHeight(6)}}
                      pinCount={4}
                      autoFocusOnLoad={false}
                      onCodeChanged={(code: any) => {
                        setFrontRightSerial(code);
                      }}
                      keyboardType="number-pad"
                      codeInputFieldStyle={styles.underlineStyleBase}
                    />
                  </View>
                ) : null}

                {data.filter((item: any) => item.key === 'Rear_Right__c')
                  .length ? (
                  <View style={styles.mainRow}>
                    <Text style={styles.mainTitle}>Rear Right</Text>
                    <OTPInputView
                      selectionColor={theme.black}
                      style={{flex: 1, height: getScreenHeight(6)}}
                      pinCount={4}
                      autoFocusOnLoad={false}
                      onCodeChanged={(code: any) => {
                        setRearRightSerial(code);
                      }}
                      keyboardType="number-pad"
                      codeInputFieldStyle={styles.underlineStyleBase}
                    />
                  </View>
                ) : null}

                {data.filter((item: any) => item.key === 'Rear_Left__c')
                  .length ? (
                  <View style={styles.mainRow}>
                    <Text style={styles.mainTitle}>Rear Left</Text>
                    <OTPInputView
                      selectionColor={theme.black}
                      style={{flex: 1, height: getScreenHeight(6)}}
                      pinCount={4}
                      autoFocusOnLoad={false}
                      onCodeChanged={(code: any) => {
                        setRearLeftSerial(code);
                      }}
                      keyboardType="number-pad"
                      codeInputFieldStyle={styles.underlineStyleBase}
                    />
                  </View>
                ) : null}

                {data.filter((item: any) => item.key === 'Front_Left__c')
                  .length ? (
                  <View style={styles.mainRow}>
                    <Text style={styles.mainTitle}>Front Left</Text>
                    <OTPInputView
                      selectionColor={theme.black}
                      style={{flex: 1, height: getScreenHeight(6)}}
                      pinCount={4}
                      autoFocusOnLoad={false}
                      onCodeChanged={(code: any) => {
                        setFrontLeftSerial(code);
                      }}
                      keyboardType="number-pad"
                      codeInputFieldStyle={styles.underlineStyleBase}
                    />
                  </View>
                ) : null}

                {data.filter((item: any) => item.key === 'Spare_Tyre__c')
                  .length ? (
                  <View style={styles.mainRow}>
                    <Text style={styles.mainTitle}>Spare tyre</Text>
                    <OTPInputView
                      selectionColor={theme.black}
                      style={{flex: 1, height: getScreenHeight(6)}}
                      pinCount={4}
                      autoFocusOnLoad={false}
                      onCodeChanged={(code: any) => {
                        setSpareTyreSerial(code);
                      }}
                      keyboardType="number-pad"
                      codeInputFieldStyle={styles.underlineStyleBase}
                    />
                  </View>
                ) : null}

                <Spacer height={getScreenHeight(4)} />

                <CustomCheckBox
                  mainAction={() =>
                    Linking.openURL(
                      'https://www.SalesApp-india.com/page/warranty',
                    )
                  }
                  selected={termsSelected}
                  action={() => setTermsSelected(!termsSelected)}
                  terms
                />

                <View style={styles.button}>
                  <CustomButton
                    loading={loading}
                    iconmargin={getScreenHeight(1)}
                    align="center"
                    title="Next"
                    font={fonts.regular}
                    size={getScreenHeight(2)}
                    action={() => {
                      customerVehicleManager();
                    }}
                    icon={require('../../assets/images/arrows/arrowright.png')}
                  />
                </View>
              </View>
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
    header: {
      padding: getScreenHeight(2),
    },
    logo: {
      width: getScreenWidth(50),
      height: getScreenHeight(10),
    },
    title: {
      fontFamily: fonts.bold,
      color: theme.black,
      fontSize: getScreenHeight(2),
    },
    subtitle: {
      fontFamily: fonts.regular,
      color: theme.light_accent,
      fontSize: getScreenHeight(1.5),
    },
    contanier: {
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: getScreenHeight(2),
    },
    input: {
      marginVertical: getScreenHeight(1),
    },
    titleContanier: {
      marginVertical: getScreenHeight(2),
      flexDirection: 'row',
      alignItems: 'center',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      height: getScreenHeight(6),
    },
    textInput: {
      flex: 1,
      color: theme.black,
    },
    button: {
      marginVertical: getScreenHeight(3),
    },
    mainTitle: {
      fontFamily: fonts.medium,
      color: theme.black,
      fontSize: getScreenHeight(2),
      width: '25%',
      marginRight: getScreenHeight(5),
    },
    mainRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: getScreenHeight(2),
    },
    underlineStyleBase: {
      width: getScreenHeight(5),
      height: getScreenHeight(5),
      borderWidth: getScreenHeight(0.1),
      color: theme.black,
      fontFamily: fonts.regular,
      borderRadius: getScreenHeight(1),
    },
    icon: {
      width: getScreenHeight(2),
      height: getScreenHeight(2),
    },
  });

export default VehicleDetails;
