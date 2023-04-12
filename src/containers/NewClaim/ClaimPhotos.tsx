import React, {useContext, useMemo, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Platform,
  SafeAreaView,
  TextInput,
} from 'react-native';

import {authContext, themeContext} from '../../contexts/context';
import CustomStatusBar from '../../components/CustomStatusBar';
import FastImage from 'react-native-fast-image';
import {
  getNumbersOnly,
  getScreenHeight,
  getScreenWidth,
} from '../../utils/domUtil';
import fonts from '../../constants/fonts';
import UploadImage from '../../components/UploadImage';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import CustomRadioButton from '../../components/CustomRadioButton';
import SimpleToast from 'react-native-simple-toast';
import CustomNewHeader from '../../components/CustomNewHeader';
import dropDownData from '../../constants/json/dropDownData';
import Dropdown from '../../components/Dropdown';
import CustomDropDown from '../../components/CustomDropDown';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useEffect} from 'react';

const ClaimPhotos = ({navigation, route}: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const {user_data}: any = useContext(authContext);
  const customerData = route.params.customerData;
  const otp = route.params.otp;
  const serialNumber = route.params.serialNumber;

  const [photo1, setPhoto1] = useState(null);
  const [photo2, setPhoto2] = useState(null);
  const [photo3, setPhoto3] = useState(null);
  const [photo4, setPhoto4] = useState(null);
  const [photo5, setPhoto5] = useState(null);
  const [photo6, setPhoto6] = useState(null);

  const [damageCondition, setDamageCondition] = useState('');
  const [damageCause, setDamageCause] = useState('');
  const [depth, setDepth] = useState(
    `${customerData?.Article__r?.Original_Group_Depth__c}`,
  );
  const [remainDepth, setRemainDepth] = useState('');
  const [totalRuning, setTotalRunning] = useState('');
  const [name, setName] = useState(user_data?.Name);
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [remarks, setRemarks] = useState('');
  const [type, setType] = useState('OE');
  const [damageCauseDropdown, setDamageCauseDropdown] = useState(false);
  const [damageConditionDropdown, setDamageConditionDropdown] = useState(false);
  const [damageCauseData, setDamageCauseData] = useState([]);
  const [wear, setWear] = useState('');

  const createClaimManagerHandler = () => {
    if (!photo1) {
      return SimpleToast.show('Please click picture of odometer reading');
    }
    if (!photo2) {
      return SimpleToast.show('Please click picture of tyre serial image');
    }
    if (!photo3) {
      return SimpleToast.show('Please click picture of defect image outside');
    }
    if (!photo4) {
      return SimpleToast.show('Please click picture of defect image inside');
    }
    if (!photo5) {
      return SimpleToast.show('Please click picture of tread depth gauge');
    }
    if (!damageCondition) {
      return SimpleToast.show('Please enter damage condition');
    }
    if (!damageCause) {
      return SimpleToast.show('Please enter damage condition');
    }
    if (!depth) {
      return SimpleToast.show('Please enter original Groove Depth');
    }
    if (!remainDepth) {
      return SimpleToast.show('Please enter Remain Groove Depth');
    }
    if (!totalRuning) {
      return SimpleToast.show('Please enter Total Running Kms');
    }
    navigation.navigate('ClaimReview', {
      damageCondition,
      damageCause,
      depth,
      remainDepth,
      totalRuning,
      type,
      otp,
      customerData,
      serialNumber,
      photoData: {
        Current_Odometer_Reading__c: '',
        Tyre_Serial_Image__c: '',
        Defect_image_outside__c: '',
        Defect_image_inside__c: '',
        Thread_Depth_Gauge__c: '',
        Extra__c: '',
      },
      photos: [
        {
          photo: photo1,
          title: 'Odometer Reading',
          key: 'Current Odometer Reading',
        },
        {
          photo: photo2,
          title: 'Tyre Serial Image',
          key: 'Tyre Serial Image',
        },
        {
          photo: photo3,
          title: 'Defect Image Outside',
          key: 'Defect image outside',
        },
        {
          photo: photo4,
          title: 'Defect Image Inside',
          key: 'Defect image inside',
        },
        {
          photo: photo5,
          title: 'Tread depth gauge',
          key: 'Thread Depth Gauge',
        },
        {photo: photo6, title: 'Extra', key: 'Extra'},
      ],
      remarks: remarks,
    });
  };

  useEffect(() => {
    let formulaValue =
      ((parseFloat(depth) - parseFloat(remainDepth ? remainDepth : '0')) /
        parseFloat(depth)) *
      100;
    setWear(formulaValue.toFixed(2).toString());
  }, [remainDepth]);

  return (
    <>
      <SafeAreaView style={styles.safe}>
        <CustomStatusBar light color={theme.black} />
        <View style={styles.screen}>
          <CustomNewHeader
            subtitle={
              user_data?.Customer_No__c ? user_data?.Customer_No__c : ''
            }
            action={() => navigation.goBack()}
            title={user_data?.Name ? user_data?.Name : ''}
          />
          <KeyboardAwareScrollView
            enableOnAndroid={true}
            bounces={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{flexGrow: 1}}
            showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
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
                <View style={[styles.outer, {borderColor: theme.primary}]}>
                  <View
                    style={[styles.insider, {backgroundColor: theme.primary}]}
                  />
                </View>
                <View style={styles.divider} />
                <View style={styles.outer}></View>
              </View>
              <View style={styles.contanier}>
                <Text style={styles.title}>Step 2</Text>
              </View>

              <View style={styles.row}>
                <View style={{width: '48%'}}>
                  <UploadImage
                    value={photo1}
                    action={(text: any) => {
                      setPhoto1(text);
                    }}
                    title="Odometer Reading*"
                  />
                </View>
                <View style={{width: '48%'}}>
                  <UploadImage
                    value={photo2}
                    action={(text: any) => {
                      setPhoto2(text);
                    }}
                    title="Tyre Serial Image*"
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
                    title="Defect Image Outside*"
                  />
                </View>
                <View style={{width: '48%'}}>
                  <UploadImage
                    value={photo4}
                    action={(text: any) => {
                      setPhoto4(text);
                    }}
                    title="Defect Image Inside*"
                  />
                </View>
              </View>

              <View style={styles.row}>
                <View style={{width: '48%'}}>
                  <UploadImage
                    value={photo5}
                    title="Tread depth gauge*"
                    action={(text: any) => {
                      setPhoto5(text);
                    }}
                  />
                </View>
                <View style={{width: '48%'}}>
                  <UploadImage
                    value={photo6}
                    action={(text: any) => {
                      setPhoto6(text);
                    }}
                    title="Extra"
                  />
                </View>
              </View>

              <View style={{marginVertical: getScreenHeight(2)}}>
                <Text style={styles.title}>Damage Condition</Text>
              </View>

              <View
                style={[
                  styles.input,
                  Platform.OS === 'ios' ? {zIndex: 2} : null,
                ]}>
                <CustomDropDown
                  black
                  title={damageCondition ? damageCondition : 'Damage Condition'}
                  action={() => {
                    setDamageConditionDropdown(!damageConditionDropdown);
                    setDamageCauseDropdown(false);
                  }}
                />
                {damageConditionDropdown ? (
                  <View style={[Platform.OS === 'ios' ? {zIndex: 10} : null]}>
                    <Dropdown
                      action={(item: any) => {
                        setDamageCauseData(item.Data);
                        setDamageCondition(item.Title);
                        setDamageConditionDropdown(false);
                      }}
                      placeholder="Damage Condition"
                      data={dropDownData}
                    />
                  </View>
                ) : null}
              </View>

              <View
                style={[
                  styles.input,
                  Platform.OS === 'ios' ? {zIndex: 1} : null,
                ]}>
                <CustomDropDown
                  black
                  title={damageCause ? damageCause : 'Damage Cause'}
                  action={() => {
                    if (damageCondition) {
                      setDamageCauseDropdown(!damageCauseDropdown);
                      setDamageConditionDropdown(false);
                    } else {
                      SimpleToast.show('Please choose damage condition first!');
                    }
                  }}
                />
                {damageCauseDropdown ? (
                  <View style={[Platform.OS === 'ios' ? {zIndex: 10} : null]}>
                    <Dropdown
                      other
                      action={(item: any) => {
                        setDamageCause(item);
                        setDamageCauseDropdown(false);
                      }}
                      placeholder="Damage Cause"
                      data={damageCauseData}
                    />
                  </View>
                ) : null}
              </View>

              <View style={styles.row}>
                <CustomRadioButton
                  action={() => setType('OE')}
                  selected={type === 'OE'}
                  title="OE"
                />
                <CustomRadioButton
                  action={() => setType('Replacement')}
                  selected={type === 'Replacement'}
                  title="Replacement"
                />
                <View />
              </View>

              <View style={styles.input}>
                <CustomInput
                  black
                  editable={false}
                  placeholder="Original Groove Depth"
                  value={depth}
                  action={setDepth}
                />
              </View>

              <View style={styles.input}>
                <CustomInput
                  black
                  keyboardType="numeric"
                  placeholder="Remaining Groove Depth"
                  value={remainDepth}
                  action={(text: any) => setRemainDepth(getNumbersOnly(text))}
                />
              </View>

              <View style={styles.input}>
                <CustomInput
                  editable={false}
                  black
                  placeholder="% Wear"
                  value={`${wear}%`}
                />
              </View>

              <View style={styles.input}>
                <CustomInput
                  black
                  placeholder="Total Running Kms"
                  value={totalRuning}
                  keyboardType="numeric"
                  action={(text: any) => setTotalRunning(getNumbersOnly(text))}
                />
              </View>
            </View>

            <View style={styles.footer}>
              <View style={styles.row}>
                <Text style={[styles.title, {color: theme.white}]}>
                  Dealer Information
                </Text>
                <FastImage
                  resizeMode="contain"
                  tintColor={theme.white}
                  style={styles.icon}
                  source={require('../../assets/images/arrows/downarrow.png')}
                />
              </View>

              <View style={{marginTop: getScreenHeight(2)}}>
                <CustomInput
                  color={theme.white}
                  editable={false}
                  frontIcon={
                    <FastImage
                      tintColor={theme.white}
                      resizeMode="contain"
                      style={styles.icon}
                      source={require('../../assets/images/common/user.png')}
                    />
                  }
                  placeholder="Dealer Name"
                  value={name}
                  action={setName}
                />
              </View>

              <View style={{marginTop: getScreenHeight(2)}}>
                <CustomInput
                  editable={false}
                  color={theme.white}
                  frontIcon={
                    <FastImage
                      tintColor={theme.white}
                      resizeMode="contain"
                      style={styles.icon}
                      source={require('../../assets/images/common/state.png')}
                    />
                  }
                  placeholder="Dealer State"
                  value={state}
                  action={setState}
                />
              </View>

              <View style={{marginTop: getScreenHeight(2)}}>
                <CustomInput
                  editable={false}
                  placeholder="Dealer City"
                  value={city}
                  color={theme.white}
                  action={setCity}
                  frontIcon={
                    <FastImage
                      tintColor={theme.white}
                      resizeMode="contain"
                      style={styles.icon}
                      source={require('../../assets/images/common/city.png')}
                    />
                  }
                />
              </View>

              <View style={{marginTop: getScreenHeight(2)}}>
                <View style={styles.textAreaInput}>
                  <TextInput
                    style={styles.textArea}
                    multiline={true}
                    numberOfLines={5}
                    placeholder="Claim Remarks"
                    placeholderTextColor={theme.white}
                    value={remarks}
                    onChangeText={setRemarks}
                  />
                </View>
              </View>
            </View>

            <View style={{margin: getScreenHeight(2)}}>
              <CustomButton
                action={createClaimManagerHandler}
                iconmargin={getScreenHeight(1)}
                align="center"
                title="Next"
                font={fonts.regular}
                size={getScreenHeight(2)}
                icon={require('../../assets/images/arrows/arrowright.png')}
              />
            </View>
          </KeyboardAwareScrollView>
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
      fontFamily: fonts.medium,
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
    input: {
      marginBottom: getScreenHeight(2),
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
    footer: {
      backgroundColor: '#333333',
      paddingHorizontal: getScreenHeight(2),
      borderRadius: getScreenHeight(1),
      paddingBottom: getScreenHeight(2),
      marginHorizontal: getScreenHeight(2),
    },
    icon: {
      height: getScreenHeight(2),
      width: getScreenHeight(2),
    },
    textAreaInput: {
      backgroundColor: '#4D4D4D',
      paddingHorizontal: getScreenHeight(1),
      borderRadius: getScreenHeight(1),
      height: getScreenHeight(10),
    },
    textArea: {
      color: theme.white,
      fontFamily: fonts.regular,
      fontSize: getScreenHeight(1.5),
      textAlignVertical: 'top',
    },
  });

export default ClaimPhotos;
