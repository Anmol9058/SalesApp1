import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {authContext, themeContext} from '../../contexts/context';
import CustomStatusBar from '../../components/CustomStatusBar';
import {getScreenHeight, getScreenWidth} from '../../utils/domUtil';
import fonts from '../../constants/fonts';
import UploadImage from '../../components/UploadImage';
import CustomButton from '../../components/CustomButton';
import WhiteModeHeader from '../../components/WhiteModeHeader';
import QRScannerItem from '../../components/QRScannerItem';
import Spacer from '../../components/Spacer';
import useApi from '../../hooks/useApi';
import SimpleToast from 'react-native-simple-toast';
import {getQrCode} from '../../api/home';
import ChooseTyrePosition from '../../components/ChooseTyrePosition';
import ModalLoading from '../../components/ModalLoading';
import CustomPressable from '../../components/CustomPressable';
import FastImage from 'react-native-fast-image';
import CustomInput from '../../components/CustomInput';

const AddPhotos = ({navigation, route}: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const selectVehicle = route.params.selectVehicle;
  const existData = route.params.existData;
  const otp = route.params.otp;
  const mobileNumber = route.params.mobileNumber;
  const Types_of_Registration__c = route.params.Types_of_Registration__c;

  const {apiCall} = useApi();
  const {user_id, qrData, setQrData}: any = useContext(authContext);

  const [photo1, setPhoto1] = useState(null);
  const [photo2, setPhoto2] = useState(null);
  const [photo3, setPhoto3] = useState(null);
  const [photo4, setPhoto4] = useState(null);
  const [openTyreModal, setOpenTyreModal] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [qrLoading, setQrLoading] = useState(false);
  const [invoiceNo, setInvoiceNo] = useState('');
  const [invoiceDate, setInvoiceDate] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [data, setData] = useState([
    {
      name: '',
      value: null,
      key: null,
      content: null,
    },
    {
      name: '',
      value: null,
      key: null,
      content: null,
    },
    {
      name: '',
      value: null,
      key: null,
      content: null,
    },
    {
      name: '',
      value: null,
      key: null,
      content: null,
    },
    {
      name: '',
      value: null,
      key: null,
      content: null,
    },
  ]);
  const [modalData, setModalData] = useState([
    {title: 'Front Right', value: 1, key: 'Front_Right__c', data: null},
    {title: 'Front Left', value: 2, key: 'Front_Left__c', data: null},
    {title: 'Rear Right', value: 3, key: 'Rear_Right__c', data: null},
    {title: 'Rear Left', value: 4, key: 'Rear_Left__c', data: null},
    {title: 'Spare Tyre', value: 5, key: 'Spare_Tyre__c', data: null},
  ]);
  const [currentType, setCurrentType] = useState(0);

  const getQrCodeDetail = useCallback(
    async (id: any) => {
      setQrLoading(true);
      try {
        const res = await getQrCode(apiCall, id);
        if (res?.records[0]) {
          return res?.records[0];
        }
      } catch (error) {
        console.log(error);
      } finally {
        setQrLoading(false);
      }
    },
    [user_id, qrLoading],
  );

  const tyreHandler = async (item: any, index: any) => {
    const pseudoTyreData = [...modalData];
    pseudoTyreData.splice(index, 1);
    setModalData(pseudoTyreData);
    let newData = [...data];
    newData[currentType - 1] = {
      name: item.title,
      value: newData[currentType - 1].value,
      key: item.key,
      content: newData[currentType - 1].content,
    };
    setOpenTyreModal(false);
    setData(newData);
    setCurrentType(0);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const dateReadableFormatWithHyphen = (timestamp: any) => {
    let dateObj = timestamp ? new Date(timestamp) : new Date();
    let date = dateObj.getDate();
    let month = dateObj.getMonth() + 1;
    let year = dateObj.getFullYear();
    let date1 = date < 10 ? '0' + date : date;
    let month1 = month < 10 ? '0' + month : month;
    return `${year}-${month1}-${date1}`;
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const handleConfirm = (date: any) => {
    setInvoiceDate(dateReadableFormatWithHyphen(date));
    hideDatePicker();
  };

  const validate = () => {
    if (!photo1) {
      return SimpleToast.show('Please click picture of Vehicle No Plate 1');
    }
    if (!photo2) {
      return SimpleToast.show('Please click picture of Odometer reading 2');
    }
    if (!photo3) {
      return SimpleToast.show('Please click picture of Invoice Photo 1');
    }
    if (
      data[0].value === null &&
      data[1].value === null &&
      data[2].value === null &&
      data[3].value === null &&
      data[4].value === null
    ) {
      return SimpleToast.show('Please Scan atleast one QR Code');
    }

    navigation.navigate('VehicleDetails', {
      data: data,
      selectVehicle: selectVehicle,
      existData,
      otp: otp,
      mobileNumber: mobileNumber,
      invoiceNo: invoiceNo,
      invoiceDate: invoiceDate,
      Types_of_Registration__c: Types_of_Registration__c,
      photoData: {
        Odometer_Reading2__c: '',
        Sidewall_Photo_4__c: '',
        Vehicle_No_Plate_1__c: '',
        Invoice_Photo_1__c: '',
      },
      photos: [
        {photo: photo1, key: 'Vehicle No Plate 1'},
        {photo: photo2, key: 'Odometer Reading'},
        {photo: photo3, key: 'Invoice Photo'},
        {photo: photo4, key: 'Additional Photo'},
      ],
    });
  };

  useEffect(() => {
    if (qrData) {
      qrCodeManager(qrData);
    }
  }, [qrData]);

  const qrCodeManager = async (item: any) => {
    let newData = [...data];
    const res = await getQrCodeDetail(item.data);
    newData[activeIndex] = {
      name: newData[activeIndex]?.name,
      value: item,
      key: newData[activeIndex]?.key,
      content: res,
    };
    setData(newData);
    setQrData(null);
  };

  return (
    <>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        maximumDate={new Date()}
      />
      {qrLoading ? <ModalLoading /> : null}
      <SafeAreaView edges={['top']} style={styles.safe}>
        {openTyreModal ? (
          <ChooseTyrePosition
            data={modalData}
            selectedItem={tyreHandler}
            pressHandler={() => setOpenTyreModal(false)}
          />
        ) : null}
        <CustomStatusBar light color={theme.black} />
        <View style={styles.screen}>
          <WhiteModeHeader action={() => navigation.goBack()} back />
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
              <View style={styles.contanier}>
                <Text style={styles.title}>Add Photos</Text>
                <Text style={styles.subtitle}>
                  No. of tires to register: <Text style={styles.border}>4</Text>
                </Text>
              </View>

              <View style={styles.row}>
                <View style={{width: '48%'}}>
                  <UploadImage
                    value={photo1}
                    action={(text: any) => {
                      setPhoto1(text);
                    }}
                    title="*Vehicle No plate"
                  />
                </View>
                <View style={{width: '48%'}}>
                  <UploadImage
                    value={photo2}
                    action={(text: any) => {
                      setPhoto2(text);
                    }}
                    title="* Odometer reading"
                  />
                </View>
              </View>

              <View style={styles.row}>
                <View style={{width: '48%'}}>
                  <UploadImage
                    value={photo3}
                    action={(text: any) => {
                      setPhoto3(text);
                    }}
                    title="* Invoice photo"
                  />
                </View>
                <View style={{width: '48%'}}>
                  <UploadImage
                    value={photo4}
                    action={(text: any) => {
                      setPhoto4(text);
                    }}
                    title="Additional Photo (Tyre Size)"
                  />
                </View>
              </View>
              <Spacer />

              <Text style={[styles.title, {marginTop: getScreenHeight(2)}]}>
                Invoice Details
              </Text>
              <Spacer height={getScreenHeight(2)} />

              <CustomInput
                black
                placeholder="Invoice No"
                value={invoiceNo}
                action={setInvoiceNo}
              />
              <Spacer />

              <CustomPressable
                title="Invoice Date"
                // title='From Date'
                width={'10%'}
                value={invoiceDate}
                black
                // marginRight={getScreenHeight(1)}
                align
                action={showDatePicker}
                leftIcon={
                  <FastImage
                    resizeMode="contain"
                    tintColor={theme.primary}
                    style={styles.icon}
                    source={require('../../assets/images/common/calendar.png')}
                  />
                }
              />

              <Spacer height={getScreenHeight(2)} />

              <View style={styles.row}>
                <Text style={styles.itemTitle}>Tyre</Text>
                <Text style={styles.itemTitle}>Position</Text>
                <Text style={styles.itemTitle}>QR code Image</Text>
              </View>

              {data.map((data, index) => {
                return (
                  <View>
                    <Spacer height={getScreenHeight(2)} />
                    <QRScannerItem
                      disabled={data?.name ? true : false}
                      qrData={data.value}
                      title={data.name}
                      selectItem={() => {
                        if (modalData.length !== 0) {
                          setOpenTyreModal(true);
                          setCurrentType(index + 1);
                        }
                      }}
                      count={index + 1}
                      action={() => {
                        setActiveIndex(index);
                        if (!data.name) {
                          return SimpleToast.show('Please select position!');
                        } else {
                          navigation.navigate('ScanQrCode');
                        }
                      }}
                    />
                  </View>
                );
              })}

              <Spacer height={getScreenHeight(4)} />
              <CustomButton
                // action={() =>
                //   navigation.navigate('VehicleDetails', {
                //     selectVehicle: selectVehicle,
                //   })
                // }
                action={validate}
                iconmargin={getScreenHeight(1)}
                align="center"
                title="Next"
                font={fonts.regular}
                size={getScreenHeight(2)}
                icon={require('../../assets/images/arrows/arrowright.png')}
              />
              <Spacer height={getScreenHeight(2)} />
            </View>
          </ScrollView>
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
    itemTitle: {
      fontFamily: fonts.bold,
      color: theme.black,
      fontSize: getScreenHeight(1.8),
      flex: 1,
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
    border: {
      borderWidth: getScreenHeight(0.1),
      borderColor: theme.light_accent,
    },
    row: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: getScreenHeight(2),
    },
    icon: {
      width: getScreenHeight(2),
      height: getScreenHeight(2),
    },
  });

export default AddPhotos;
