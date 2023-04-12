import React, {useCallback, useContext, useMemo, useState} from 'react';
import {
  View,
  StyleSheet,
  Platform,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Toast from 'react-native-simple-toast';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

// Files
import {authContext, themeContext} from '../contexts/context';
import {getScreenHeight} from '../utils/domUtil';
import useApi from '../hooks/useApi';
import CustomStatusBar from '../components/CustomStatusBar';
import CustomNewHeader from '../components/CustomNewHeader';
import {createTicket, getTickets} from '../api/home';
import Header from '../components/Header';
import CustomDropDown from '../components/CustomDropDown';
import Dropdown from '../components/Dropdown';
import SimpleToast from 'react-native-simple-toast';
import CustomInput from '../components/CustomInput';
import ArrowButton from '../components/ArrowButton';
import {useQuery} from 'react-query';
import TicketItem from '../components/TicketItem';

const TicketData = [
  {
    Title: 'Finance',
    Data: [
      {
        Title: 'Account statement and Reconciliation Matters',
        Data: [{Title: 'Others'}],
      },
      {Title: 'Credit notes related', Data: [{Title: 'Others'}]},
      {Title: 'GST and TDS/TCS Related Queries', Data: [{Title: 'Others'}]},
      {Title: 'Payments Related Queries', Data: [{Title: 'Others'}]},
      {Title: 'YCN Reimbursements', Data: [{Title: 'Others'}]},
      {Title: 'Other', Data: [{Title: 'Others'}]},
    ],
  },
  {
    Title: 'Marketing',
    Data: [
      {
        Title: 'YCN',
        Data: [
          {Title: 'YCN Agreement'},
          {Title: 'YCN Promotion Budget'},
          {Title: 'YCN Target & Ach'},
          {Title: 'YCN Incentive'},
          {Title: 'Others'},
        ],
      },
      {
        Title: 'Schemes & Discounts',
        Data: [
          {Title: 'Calculation Clarification'},
          {Title: 'Reward Disbursement Status'},
          {Title: 'Others'},
        ],
      },
      {
        Title: 'Product',
        Data: [{Title: 'Feedback'}, {Title: 'Suggestion'}, {Title: 'Others'}],
      },
      {Title: 'Price', Data: [{Title: 'Price Update'}, {Title: 'Others'}]},
      {Title: 'Other', Data: [{Title: 'Others'}]},
    ],
  },
  {
    Title: 'IT',
    Data: [
      {
        Title: 'Technical Issue',
        Data: [{Title: 'Application not working'}, {Title: 'Others'}],
      },
      {
        Title: 'Other',
        Data: [{Title: 'Others'}],
      },
    ],
  },
  {
    Title: 'Legal',
    Data: [
      {
        Title: 'Other',
        Data: [{Title: 'Others'}],
      },
    ],
  },
  {
    Title: 'Sales',
    Data: [
      {
        Title: 'Payment',
        Data: [{Title: 'Others'}],
      },
      {
        Title: 'Limit Related',
        Data: [{Title: 'Others'}],
      },
      {
        Title: 'Credit note',
        Data: [{Title: 'Others'}],
      },
      {
        Title: 'Customer onboarding',
        Data: [{Title: 'Others'}],
      },
      {
        Title: 'GST Related',
        Data: [{Title: 'Others'}],
      },
      {
        Title: 'Other',
        Data: [{Title: 'Others'}],
      },
    ],
  },
  {
    Title: 'SCM',
    Data: [],
  },
  {
    Title: 'Service',
    Data: [
      {
        Title: 'Claim Related',
        Data: [
          {Title: 'Damage in transit/ New defectives'},
          {Title: 'Rejected Claim escalation'},
          {Title: 'Pending for Inspection'},
          {Title: 'Accepted & Pending for Billing'},
          {Title: 'Visit required for physical inspection'},
          {Title: 'Others'},
        ],
      },
    ],
  },
  {
    Title: 'Supply chain',
    Data: [
      {
        Title: 'Mis-match Material Recieved',
        Data: [
          {Title: 'Short'},
          {Title: 'Excess'},
          {Title: 'Wrong'},
          {Title: 'Delivery'},
          {Title: 'Others'},
        ],
      },
    ],
  },
  {
    Title: 'YCN',
    Data: [],
  },
];

const Ticket = ({navigation}: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [loading, setLoading] = useState(false);
  const {user_data, user_id}: any = useContext(authContext);
  const {apiCall} = useApi();

  const [title, setTitle] = useState('');
  const [titleDropDown, setTitleDropDown] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [categoryDropdown, setCategoryDropdown] = useState(false);
  const [subCategoryDropdown, setSubCategoryDropdown] = useState(false);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [description, setDescription] = useState('');

  const getTicketManager = useCallback(async () => {
    const res = await getTickets(apiCall, user_id);
    return res;
  }, [apiCall]);

  const {
    data: ticketData,
    isFetching,
    refetch,
  } = useQuery('getTickets', getTicketManager, {
    retry: 0,
    enabled: true,
  });

  const createTicketManager = async () => {
    if (title.length === 0) {
     
    }
    setLoading(true);
    try {
      let data = {
        records: [
          {
            attributes: {
              type: 'Ticket__c',
              referenceId: 'ref1',
            },
            Complaint_Description__c: description,
            Complaint_Type__c: title,
            Complaint_category__c: category,
            Complaint_sub_category__c: subCategory,
          },
        ],
      };

      const res = await createTicket(apiCall, data);
      if (!res.hasErrors) {
        Toast.show('Ticket has been created successfully');
        setTitle('');
        setCategory('');
        setSubCategory('');
        setDescription('');
        refetch();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = useCallback(({item}: any) => {
    return (
      <View style={styles.item}>
        <TicketItem
          action={() =>
            navigation.navigate('TicketDetail', {
              item,
            })
          }
          item={item}
        />
      </View>
    );
  }, []);

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <CustomStatusBar color={theme.black} light />
      <View style={styles.screen}>
        <CustomNewHeader
          subtitle={user_data?.Customer_No__c ? user_data?.Customer_No__c : ''}
          action={() => navigation.goBack()}
          title={user_data?.Name ? user_data?.Name : ''}
        />

        <View style={styles.header}>
          <Header dark title="Raise Ticket Here" />
        </View>
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
          <View style={styles.contanier}>
            <View
              style={[
                {height: getScreenHeight(5)},
                Platform.OS === 'ios' ? {zIndex: 3} : null,
              ]}>
              <CustomDropDown
                black
                title={title ? title : 'Type'}
                action={() => {
                  setTitleDropDown(!titleDropDown);
                  setSubCategoryDropdown(false);
                  setCategoryDropdown(false);
                }}
              />
              {titleDropDown ? (
                <View style={[Platform.OS === 'ios' ? {zIndex: 10} : null]}>
                  <Dropdown
                    action={(item: any) => {
                      setCategoryData(item.Data);
                      setTitle(item.Title);
                      setTitleDropDown(false);
                      setCategory('');
                      setSubCategory('');
                      setSubCategoryData([]);
                    }}
                    placeholder="Type"
                    data={TicketData}
                  />
                </View>
              ) : null}
            </View>

            <View
              style={[
                {height: getScreenHeight(6)},
                Platform.OS === 'ios' ? {zIndex: 2} : null,
              ]}>
              <CustomDropDown
                black
                title={category ? category : 'Category'}
                action={() => {
                  if (title.length === 0) {
                    SimpleToast.show('Please select the title');
                  } else {
                    setCategoryDropdown(!categoryDropdown);
                  }
                }}
              />
              {categoryDropdown ? (
                <View style={[Platform.OS === 'ios' ? {zIndex: 10} : null]}>
                  <Dropdown
                    action={(item: any) => {
                      setSubCategoryData(item.Data);
                      setCategory(item.Title);
                      setCategoryDropdown(false);
                      setSubCategory('');
                    }}
                    placeholder="Category"
                    data={categoryData}
                  />
                </View>
              ) : null}
            </View>

            <View
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
            </View>

            <View style={styles.input}>
              <CustomInput
                black
                placeholder="Description"
                value={description}
                action={setDescription}
              />
            </View>

            <View style={[styles.input, {marginTop: getScreenHeight(4)}]}>
              <ArrowButton
                title="Create Ticket"
                loading={loading}
                action={createTicketManager}
              />
            </View>

            <FlatList
              data={ticketData}
              keyExtractor={(_, index) => index.toString()}
              renderItem={renderItem}
              ListHeaderComponent={() =>
                isFetching ? (
                  <ActivityIndicator
                    size={'small'}
                    style={{marginTop: getScreenHeight(2)}}
                    color={theme.primary}
                  />
                ) : null
              }
            />
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
      // marginBottom: getScreenHeight(2),
    },
    item: {
      marginTop: getScreenHeight(2),
    },
    header: {
      padding: getScreenHeight(2),
    },
  });

export default Ticket;
