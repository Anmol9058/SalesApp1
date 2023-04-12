import React, {useCallback, useContext, useMemo, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  FlatList,
  SafeAreaView,
  Linking,
  Alert,
  Pressable,
} from 'react-native';
import {StackActions} from '@react-navigation/native';
import SimpleToast from 'react-native-simple-toast';
import FastImage from 'react-native-fast-image';
import ImgToBase64 from 'react-native-image-base64';

import {authContext, themeContext} from '../../contexts/context';
import CustomStatusBar from '../../components/CustomStatusBar';
import {getScreenHeight, getScreenWidth} from '../../utils/domUtil';
import fonts from '../../constants/fonts';
import CustomButton from '../../components/CustomButton';
import ClaimSuccess from '../../components/ClaimSuccess';
import useApi from '../../hooks/useApi';
import {
  createClaim,
  getClaimDetail,
  uploaWarrantyAttachmentsImage,
} from '../../api/home';
import CustomNewHeader from '../../components/CustomNewHeader';
import CustomCheckBox from '../../components/CustomCheckBox';
import ClaimModal from '../../components/ClaimModal';

const ClaimReview = ({navigation, route}: any) => {
  const damageCondition = route.params.damageCondition;
  const customerData = route.params.customerData;
  const damageCause = route.params.damageCause;
  const depth = route.params.depth;
  const totalRuning = route.params.totalRuning;
  const remainDepth = route.params.remainDepth;
  const type = route.params.type;
  const photoData = route.params.photoData;
  const remarks = route.params.remarks;
  const photos = route.params.photos;
  const otp = route.params.otp;
  const serialNumber = route.params.serialNumber;

  const {theme} = useContext(themeContext);
  const {user_id, user_data}: any = useContext(authContext);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [imageLoading, setImageLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [cliamLoading, setCliamLoading] = useState(false);
  const [termsSelected, setTermsSelected] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const {apiCall} = useApi();

  const data = useMemo(
    () => [
      {
        title: 'Tyre Size',
        value: customerData?.Size__c ? customerData?.Size__c : 'NA',
      },
      {title: 'Tyre Pattern', value: customerData?.Tyre_Pattern__c},
      {
        title: 'Serial Number',
        value: serialNumber ? serialNumber?.Title : 'NA',
      },
      {title: 'Make', value: customerData?.Make__c},
      {title: 'Model', value: customerData?.Model__c},
      {title: 'Year', value: customerData?.Year__c},
      {title: 'Damage Condition', value: damageCondition},
      {title: 'Damage Cause', value: damageCause},
      {title: 'Original Groove Depth', value: depth},
      {title: 'Remaining Groove Depth', value: remainDepth},
      {title: 'Remarks', value: remarks ? remarks : 'NA'},
    ],
    [],
  );

  const createClaimManager = async (
    damageCondition: any,
    damageCause: any,
    depth: any,
    remainDepth: any,
    totalRuning: any,
  ) => {
    if (!termsSelected) {
      return SimpleToast.show('Please check terms and conditions!');
    }
    setCliamLoading(true);
    try {
      let key = serialNumber.key;

      let mainData = {
        attributes: {type: 'Claim__c', referenceId: 'ref1'},
        Claim_Remarks__c: remarks,
        Damage_Cause__c: damageCause,
        Damage_Condition__c: damageCondition,
        Dealer__c: user_id,
        OE_Replacement__c: type,
        Driginal_Groom_Depth__c: depth,
        Remain_Groom_Depth__c: remainDepth,
        Total_Running_KMS__c: totalRuning,
        Phone_no__c: otp,
        Article_No__c: customerData.Article__c,
        Item_Master__c: customerData.Article__c,
        Warranty_Registration__c: customerData.Id,
        Pattern__c: customerData.Tyre_Pattern__c,
        ...photoData,
      };
      mainData[serialNumber.key] = serialNumber.Title;
      let data = {
        records: [mainData],
      };
      const res = await createClaim(apiCall, data);
      if (!res.data.hasErrors) {
        setImageLoading(true);
        let finalPhotos = photos.filter((item: any) => item.photo);
        if (finalPhotos.length !== 0) {
          finalPhotos.map((data: any) => {
            getBase64(data.photo, res.data.results[0].id, data.key);
          });
        }
        const newRes = await getClaimDetail(apiCall, res.data.results[0].id);
        setSuccessData(newRes);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setCliamLoading(false);
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

  const renderItem = useCallback(({item}: any) => {
    return (
      <View style={styles.imageContanier}>
        <Text
          style={[
            styles.title,
            {
              fontSize: getScreenHeight(1.5),
              marginBottom: getScreenHeight(1),
            },
          ]}>
          {item.title}
        </Text>
        <FastImage
          resizeMode={item?.photo ? 'cover' : 'contain'}
          style={styles.image}
          source={{
            uri: item?.photo
              ? item?.photo?.path
              : 'https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg',
          }}
        />
      </View>
    );
  }, []);

  return (
    <>
      {successData ? (
        <ClaimModal
          data={successData}
          pressHandler={() => {
            navigation.dispatch(StackActions.popToTop());
          }}
        />
      ) : null}
      {showModal ? (
        <ClaimSuccess
          pressHandler={() => {
            navigation.dispatch(StackActions.popToTop());
            setShowModal(false);
          }}
        />
      ) : null}
      {/* {imageLoading ? <ModalLoading /> : null} */}
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
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{flex: 1}}>
            <ScrollView
              style={styles.header}
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
                <View style={[styles.outer, {borderColor: theme.primary}]}>
                  <View
                    style={[styles.insider, {backgroundColor: theme.primary}]}
                  />
                </View>
                <View style={styles.divider} />
                <View style={styles.outer}></View>
              </View>
              <View style={styles.contanier}>
                <Text style={styles.title}>Claim Review</Text>
              </View>

              {data.map((item, index) => {
                return (
                  <View key={index} style={{marginTop: getScreenHeight(2)}}>
                    <Text
                      style={[
                        styles.title,
                        {
                          fontSize: getScreenHeight(1.8),
                          fontFamily: fonts.bold,
                        },
                      ]}>
                      {item.title}
                    </Text>
                    <Text
                      style={[styles.title, {fontSize: getScreenHeight(1.8)}]}>
                      {item.value}
                    </Text>
                  </View>
                );
              })}

              <Text
                style={[styles.title, {marginVertical: getScreenHeight(2)}]}>
                Tyre Photos
              </Text>

              <FlatList
                columnWrapperStyle={{justifyContent: 'space-between'}}
                numColumns={2}
                data={photos}
                keyExtractor={(_, index) => index.toString()}
                renderItem={renderItem}
              />

              {/* <View style={styles.newRow}>
                <View style={styles.box} />
                <Text
                  style={[
                    styles.title,
                    {
                      fontSize: getScreenHeight(1.5),
                      textDecorationLine: 'underline',
                    },
                  ]}>
                  Accept all Terms and Conditions
                </Text>
              </View> */}

              <View style={{height: getScreenHeight(4)}} />
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
              <View style={{height: getScreenHeight(2)}} />

              <View style={{marginVertical: getScreenHeight(2)}}>
                <CustomButton
                  loading={cliamLoading}
                  action={() => {
                    createClaimManager(
                      damageCondition,
                      damageCause,
                      depth,
                      remainDepth,
                      totalRuning,
                    );
                  }}
                  iconmargin={getScreenHeight(1)}
                  align="center"
                  title="Submit Details"
                  font={fonts.regular}
                  size={getScreenHeight(2)}
                  icon={require('../../assets/images/arrows/arrowright.png')}
                />
              </View>

              <Text
                onPress={() => navigation.goBack()}
                style={[
                  styles.title,
                  {
                    alignSelf: 'center',
                  },
                ]}>
                Modify
              </Text>

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
      backgroundColor: theme.primary,
      flex: 1,
    },
    outer: {
      height: getScreenHeight(3),
      width: getScreenHeight(3),
      backgroundColor: 'transparent',
      borderRadius: getScreenHeight(2),
      borderWidth: getScreenHeight(0.5),
      borderColor: theme.primary,
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
      backgroundColor: theme.primary,
      borderRadius: getScreenHeight(1),
    },
    image: {
      height: getScreenHeight(12),
      flex: 1,
      borderRadius: getScreenHeight(1),
      width: getScreenWidth(42),
    },
    imageContanier: {
      marginTop: getScreenHeight(2),
    },
    imageMainContanier: {
      flexWrap: 'wrap',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    newRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: getScreenHeight(2),
    },
    box: {
      height: getScreenHeight(2),
      width: getScreenHeight(2),
      backgroundColor: theme.white,
      borderRadius: getScreenHeight(0.4),
      marginHorizontal: getScreenHeight(1),
    },
  });

export default ClaimReview;
