import React, { useCallback, useContext, useMemo, useState } from 'react';
import {
    View,
    StyleSheet,
    Platform,
    FlatList,
    ActivityIndicator,
    Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-simple-toast';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// Files
import { authContext, themeContext } from '../contexts/context';
import { getScreenHeight } from '../utils/domUtil';
import useApi from '../hooks/useApi';
import CustomStatusBar from '../components/CustomStatusBar';
import CustomNewHeader from '../components/CustomNewHeader';
import { createInfluencerRecord, getRoleInfluencer ,getInfluencerRecords} from '../api/home';
import Header from '../components/Header';
import CustomDropDown from '../components/CustomDropDown';
import Dropdown from '../components/Dropdown';
import SimpleToast from 'react-native-simple-toast';
import CustomInput from '../components/CustomInput';
import ArrowButton from '../components/ArrowButton';
import { useQuery } from 'react-query';
import TicketItem from '../components/TicketItem';

// const TicketData = [
//     {
//         Title: 'Finance',
//         Data: [
//             {
//                 Title: 'Account statement and Reconciliation Matters',
//                 Data: [{ Title: 'Others' }],
//             },
//             { Title: 'Credit notes related', Data: [{ Title: 'Others' }] },
//             { Title: 'GST and TDS/TCS Related Queries', Data: [{ Title: 'Others' }] },
//             { Title: 'Payments Related Queries', Data: [{ Title: 'Others' }] },
//             { Title: 'YCN Reimbursements', Data: [{ Title: 'Others' }] },
//             { Title: 'Other', Data: [{ Title: 'Others' }] },
//         ],
//     },
//     {
//         Title: 'Marketing',
//         Data: [
//             {
//                 Title: 'YCN',
//                 Data: [
//                     { Title: 'YCN Agreement' },
//                     { Title: 'YCN Promotion Budget' },
//                     { Title: 'YCN Target & Ach' },
//                     { Title: 'YCN Incentive' },
//                     { Title: 'Others' },
//                 ],
//             },
//             {
//                 Title: 'Schemes & Discounts',
//                 Data: [
//                     { Title: 'Calculation Clarification' },
//                     { Title: 'Reward Disbursement Status' },
//                     { Title: 'Others' },
//                 ],
//             },
//             {
//                 Title: 'Product',
//                 Data: [{ Title: 'Feedback' }, { Title: 'Suggestion' }, { Title: 'Others' }],
//             },
//             { Title: 'Price', Data: [{ Title: 'Price Update' }, { Title: 'Others' }] },
//             { Title: 'Other', Data: [{ Title: 'Others' }] },
//         ],
//     },
//     {
//         Title: 'IT',
//         Data: [
//             {
//                 Title: 'Technical Issue',
//                 Data: [{ Title: 'Application not working' }, { Title: 'Others' }],
//             },
//             {
//                 Title: 'Other',
//                 Data: [{ Title: 'Others' }],
//             },
//         ],
//     },
//     {
//         Title: 'Legal',
//         Data: [
//             {
//                 Title: 'Other',
//                 Data: [{ Title: 'Others' }],
//             },
//         ],
//     },
//     {
//         Title: 'Sales',
//         Data: [
//             {
//                 Title: 'Payment',
//                 Data: [{ Title: 'Others' }],
//             },
//             {
//                 Title: 'Limit Related',
//                 Data: [{ Title: 'Others' }],
//             },
//             {
//                 Title: 'Credit note',
//                 Data: [{ Title: 'Others' }],
//             },
//             {
//                 Title: 'Customer onboarding',
//                 Data: [{ Title: 'Others' }],
//             },
//             {
//                 Title: 'GST Related',
//                 Data: [{ Title: 'Others' }],
//             },
//             {
//                 Title: 'Other',
//                 Data: [{ Title: 'Others' }],
//             },
//         ],
//     },
//     {
//         Title: 'SCM',
//         Data: [],
//     },
//     {
//         Title: 'Service',
//         Data: [
//             {
//                 Title: 'Claim Related',
//                 Data: [
//                     { Title: 'Damage in transit/ New defectives' },
//                     { Title: 'Rejected Claim escalation' },
//                     { Title: 'Pending for Inspection' },
//                     { Title: 'Accepted & Pending for Billing' },
//                     { Title: 'Visit required for physical inspection' },
//                     { Title: 'Others' },
//                 ],
//             },
//         ],
//     },
//     {
//         Title: 'Supply chain',
//         Data: [
//             {
//                 Title: 'Mis-match Material Recieved',
//                 Data: [
//                     { Title: 'Short' },
//                     { Title: 'Excess' },
//                     { Title: 'Wrong' },
//                     { Title: 'Delivery' },
//                     { Title: 'Others' },
//                 ],
//             },
//         ],
//     },
//     {
//         Title: 'YCN',
//         Data: [],
//     },
// ];





const newInflScreen = ({ navigation }: any) => {
    const { theme } = useContext(themeContext);
    const styles = useMemo(() => createStyles(theme), [theme]);
    const [loading, setLoading] = useState(false);
    const { user_data, user_id }: any = useContext(authContext);
    const { apiCall } = useApi();

    const [title, setTitle] = useState('');
    const [titleDropDown, setTitleDropDown] = useState(false);
    const [categoryData, setCategoryData] = useState([]);
    const [categoryDropdown, setCategoryDropdown] = useState(false);


    const [name, setName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [emailId, setEmailId] = useState('');

    const getRoleManager = useCallback(async () => {
        const res = await getRoleInfluencer(apiCall);
        console.log('ress',res)
        return res;
    }, [apiCall]);

    const {
        data,
        isFetching,
        // refetch,
    } = useQuery('getTickets', getRoleManager, {
        retry: 0,
        enabled: true,
    });

    
    
    // const getInfluencerManager = useCallback(async () => {
    //     const res = await getInfluencerRecords(apiCall);
    //     console.log(res);

    //     return res;
        
    //   }, [apiCall]);
    

    //   const { data:data2, isLoading } = useQuery(
    //     'getInfluencerManager',
    //     getInfluencerManager,
    //     {
    //       retry: 0,
    //       enabled: true,
    //     },
    //   );

      function sleep(ms:any) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }


    const createInfluencerManager = async () => {

        setLoading(true);
        try {
            let data = {
                "contact_type": "",
                "contact_name": name,
                "contact_mobile": mobileNumber,
                "email": emailId,
                "role": categoryData
            };
            const res = await createInfluencerRecord(apiCall, data);
           console.log('data',res)
            if (res.data.message=='Influencer Created Succesfully') {
                Toast.show('Influencer has been created successfully');
                setName('')
                setMobileNumber('')
                setEmailId('')
                setCategoryData([])
               
                await sleep(2000);
                navigation.goBack()
            }
            else{
                Toast.show(res&&res.data&&res.data.message?res.data.message:'');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };



    return (
        <SafeAreaView edges={['top']} style={styles.safe}>
            <CustomStatusBar color={theme.black} light />
            <View style={styles.screen}>
                <CustomNewHeader
                    subtitle={'123456'}
                    action={() => navigation.goBack()}
                    title={'Ridham Kumar'}
                />

                <View style={styles.header}>
                    <Header dark title="New Influencer" />
                </View>
                <KeyboardAwareScrollView
                    enableOnAndroid={true}
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}>
                    <View style={styles.contanier}>

                        <View
                            style={[
                                { height: getScreenHeight(5) },


                                Platform.OS === 'ios' ? { zIndex: 3 } : null,
                            ]}>
                            <View style={styles.input}>
                                <Text>
                                    {'Name'}
                                </Text>

                                <CustomInput
                                    black
                                    placeholder="Name"
                                    value={name}
                                    action={setName}
                                />
                            </View>

                        </View>

                        <View
                            style={[
                                { height: getScreenHeight(5), marginTop: getScreenHeight(2.5) },
                                Platform.OS === 'ios' ? { zIndex: 3 } : null,
                                { marginTop: getScreenHeight(5) }
                            ]}>
                            <View style={styles.input}>
                                <Text>
                                    {'Mobile'}
                                </Text>

                                <CustomInput
                                    black
                                    placeholder="Mobile"
                                    value={mobileNumber}
                                    action={setMobileNumber}
                                />
                            </View>
                            
                        </View>


                        <View
                            style={[
                                { height: getScreenHeight(5), marginTop: getScreenHeight(2.5) },
                                Platform.OS === 'ios' ? { zIndex: 3 } : null,
                                { marginTop: getScreenHeight(5) }
                            ]}>
                            <View style={styles.input}>
                                <Text>Email Id.</Text>
                                <CustomInput
                                    black
                                    placeholder="Email Id"
                                    value={emailId}
                                    action={setEmailId}
                                />
                            </View>

                        </View>

                        {/* <View
                            style={[
                                { height: getScreenHeight(5), marginTop: getScreenHeight(2.5) },
                                Platform.OS === 'ios' ? { zIndex: 3 } : null,
                                { marginTop: getScreenHeight(5) }
                            ]}>
                            <View style={styles.input}>
                                <Text>Aadhar Number</Text>
                                <CustomInput
                                    black
                                    placeholder="Aadhar Number"
                                    value={description}
                                    action={setDescription}
                                />
                            </View>

                        </View> */}

                        {/* <View
                            style={[
                                { height: getScreenHeight(5), marginTop: getScreenHeight(2.5) },
                                Platform.OS === 'ios' ? { zIndex: 3 } : null,
                                { marginTop: getScreenHeight(5) }
                            ]}>
                            <View style={styles.input}>
                                <Text>Pincode</Text>
                                <CustomInput
                                    black
                                    placeholder="Pincode"
                                    value={description}
                                    action={setDescription}
                                />
                            </View>

                        </View> */}

                        {/* <View
                            style={[
                                { height: getScreenHeight(5), marginTop: getScreenHeight(2.5) },
                                Platform.OS === 'ios' ? { zIndex: 3 } : null,
                                { marginTop: getScreenHeight(5) }
                            ]}>
                            <View style={styles.input}>
                                <Text>City</Text>
                                <CustomInput
                                    black
                                    placeholder="City"
                                    value={description}
                                    action={setDescription}
                                />
                            </View>

                        </View> */}

                        {/* <View
                            style={[
                                { height: getScreenHeight(5), marginTop: getScreenHeight(2.5) },
                                Platform.OS === 'ios' ? { zIndex: 3 } : null,
                                { marginTop: getScreenHeight(5) }
                            ]}>
                            <View style={styles.input}>
                                <Text>State</Text>
                                <CustomInput
                                    black
                                    placeholder="State"
                                    value={description}
                                    action={setDescription}
                                />
                            </View>

                        </View> */}

                        <View
                            style={[
                                { height: getScreenHeight(6), marginTop: getScreenHeight(4) },
                                Platform.OS === 'ios' ? { zIndex: 2 } : null,
                                { marginTop: getScreenHeight(7) }
                            ]}>
                            <Text>Role</Text>
                            <CustomDropDown
                                black
                                title={categoryData?categoryData: 'Role'}
                                action={() => {

                                    setCategoryDropdown(!categoryDropdown);

                                }}
                            />
                            {categoryDropdown ? (
                                <View style={[Platform.OS === 'ios' ? { zIndex: 10 } : null]}>
                                    <Dropdown
                                        action={(item: any) => {
                                            console.log("item", item);
                                            setCategoryData(item);
                                            // setCategory(item.Title);
                                            setCategoryDropdown(false);
                                            // setSubCategory('');
                                        }}
                                        placeholder="Role"
                                        data={data}
                                    />
                                </View>
                            ) : null}
                        </View>


                        {/* <View
                            style={[
                                { height: getScreenHeight(6) },
                                Platform.OS === 'ios' ? { zIndex: 2 } : null,
                                { marginTop: getScreenHeight(7) }
                            ]}>
                            <Text>Role</Text>
                            <CustomDropDown
                                black
                                title={category ? category : 'Role'}
                                action={() => {

                                    setSubCategoryDropdown(!subCategoryDropdown);

                                }}
                            />=
                            {categoryDropdown ? (
                                <View style={[Platform.OS === 'ios' ? { zIndex: 10 } : null]}>
                                    <Dropdown
                                        action={(item: any) => {
                                            setSubCategoryData(item.Data);
                                            setCategory(item.Title);
                                            setSubCategoryDropdown(false);
                                            setSubCategory('');
                                        }}
                                        placeholder="Role"
                                        data={subCategoryData}
                                    />
                                </View>
                            ) : null}
                        </View> */}

                        {/* <View
                            style={[
                                { height: getScreenHeight(3), marginTop: getScreenHeight(2.5) },
                                // Platform.OS === 'ios' ? { zIndex: 3 } : null,
                                { marginBottom: getScreenHeight(5) }
                            ]}>
                            <View style={styles.input}>
                                <Text>Country</Text>
                                <CustomInput
                                    black
                                    placeholder="Country"
                                    value={description}
                                    action={setDescription}
                                />
                            </View>

                        </View> */}



                        {/* <View
              style={[
                {height: getScreenHeight(6)},
                Platform.OS === 'ios' ? {zIndex: 1} : null,
              ]}>
              <CustomDropDown
                black
                title={subCategory ? subCategory : 'Sub Category'}
                action={() => {
                  if (category.length === 0) {
                    SimpleToast.show('Please select the Category');
                  } else {
                    setSubCategoryDropdown(!subCategoryDropdown);
                  }
                }}
              />
              {subCategoryDropdown ? (
                <View style={[Platform.OS === 'ios' ? {zIndex: 10} : null]}>
                  <Dropdown
                    action={(item: any) => {
                      // setSubCategoryData(item.Data);
                      setSubCategory(item.Title);
                      setSubCategoryDropdown(false);
                      // setSubCategory('');
                    }}
                    placeholder="Sub Category"
                    data={subCategoryData}
                  />
                </View>
              ) : null}
            </View> */}

                        {/* <View style={styles.input}>
              <CustomInput
                black
                placeholder="Description"
                value={description}
                action={setDescription}
              />
            </View> */}

                        <View style={[styles.input, { marginTop: getScreenHeight(4) }]}>
                            <ArrowButton
                                title="Create Influencer"
                                loading={loading}
                                action={createInfluencerManager}
                            />
                        </View>
             
                    </View>
                </KeyboardAwareScrollView>
            </View>
        </SafeAreaView>
    );
};

const createStyles = (theme: any) =>
    StyleSheet.create({
        safe: {
            flex: 1,
            backgroundColor: theme.black,
        },
        contanier: {
            flex: 1,
            padding: getScreenHeight(2),
        },
        screen: {
            flex: 1,
            backgroundColor: '#F2F2F2',
        },
        input: {
            marginBottom: getScreenHeight(2),
        },
        item: {
            marginTop: getScreenHeight(2),
        },
        header: {
            padding: getScreenHeight(2),
        },
    });

export default newInflScreen;

