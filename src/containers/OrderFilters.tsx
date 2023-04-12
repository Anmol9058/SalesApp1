import React, {useContext, useMemo, useState} from 'react';
import {View, StyleSheet, Text, ScrollView, Platform} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import SimpleToast from 'react-native-simple-toast';
import {useQuery} from 'react-query';
import {
  getAllFilteredProducts,
  getFilterDropdown
} from '../api/home';
import ArrowButton from '../components/ArrowButton';
import CustomBackHeader from '../components/CustomBackHeader';
import CustomDropDown from '../components/CustomDropDown';
import CustomStatusBar from '../components/CustomStatusBar';
import Dropdown from '../components/Dropdown';
import FullScreenLoader from '../components/FullScreenLoader';
import Images from '../constants/images';
import {authContext,themeContext} from '../contexts/context';
import useApi from '../hooks/useApi';
import {getScreenHeight} from '../utils/domUtil';

const OrderFilters = ({navigation}: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const {apiCall} = useApi();

  const [categoryData, SetCategoryData]= useState([]);
  const [seriesData, SetSeriesData]= useState([]);
  const [colorData, SetColorData]= useState([]);
  const [uomData, SetUomData]= useState([]);



  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSeries, setSelectedSeries] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedUom, setSelectedUom] = useState('');

  
  const [loading, setLoading] = useState(false);



  const [categoryDropdown, setCategoryDropdown] = useState(false);
  const [seriesDropdown, setSeriesDropdown] = useState(false);
  const [colorDropdown, setColorDropdown] = useState(false);
  const [uomDropdown, setUomDropdown] = useState(false);



  const {user_data}: any =
    useContext(authContext);

console.log("userData",user_data)
  const getFilteredDropdownsManager = async () => {
    const res = await getFilterDropdown(apiCall,user_data.sfid,user_data.state__c);
    return res;
  };

  const {isLoading: rimLoading} = useQuery(
    'getFilteredDropdownsManager',
    getFilteredDropdownsManager,
    {
      retry: 0,
      enabled: true,
      onSuccess: data => {
        const mainData = data.data
        console.log("mainData",data)
      
        const catData = mainData.categoryData.map((item:any)=>{
          console.log("item",item)
          return item.name
        })
        const seriesDropdown = mainData.seriesData.map((item:any)=>{
          console.log("item",item)
          return item.name
        })
        const colorDropdown = mainData.colorData.map((item:any)=>{
          console.log("item",item)
          return item.name
        })
        const UomDropdown = mainData.uomData.map((item:any)=>{
          console.log("item",item)
          return item.name
        })

        SetCategoryData(catData)
        SetSeriesData(seriesDropdown)
        SetColorData(colorDropdown)
        SetUomData(UomDropdown)

     
      },
    },
  );

  const getAllFilteredProductsManager = async () => {
    if (
      !selectedCategory &&
      !selectedSeries &&
      !selectedColor &&
      !selectedUom
    ) {
      return SimpleToast.show('Please select atleast one filter');
    }
    try {
      setLoading(true);
      const res = await getAllFilteredProducts(
        apiCall,
        user_data.sfid, 
        user_data.state__c,
        selectedUom,
        selectedCategory,
        selectedSeries,
        selectedColor,
      );
    
      navigation.navigate('FilteredProducts', {
        products: res,
      }
      );
      console.log('ress',res)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // if (treadLoading || sectionLoading || aspectLoading || rimLoading) {
  //   return <FullScreenLoader />;
  // }

  return (

    <SafeAreaView edges={['top']} style={styles.screen}>
      <CustomStatusBar color={theme.white} />
      <View style={styles.screen}>
        {/* {   console.log('datatata',categoryData,seriesData,colorData,uomData)} */}
        <CustomBackHeader
          rightIconAction={() => {
            setSelectedCategory('');
            setSelectedSeries('');
            setSelectedColor('');
            setSelectedUom('');
          }}
          action={() => navigation.goBack()}
          title="Choose Filter"
          rightIcon={Images.reset}
        />

        <ScrollView contentContainerStyle={styles.list}>
          <View
            style={[
              {height: getScreenHeight(6)},
              Platform.OS === 'ios' ? {zIndex: 4} : null,
            ]}>
            <CustomDropDown
              black
              title={selectedCategory ? selectedCategory : 'Category'}
              action={() => {
                setCategoryDropdown(!categoryDropdown);
                setSeriesDropdown(false);
                setColorDropdown(false);
                setUomDropdown(false);
              }}
            />
           
            {categoryDropdown ? (
              <View style={[Platform.OS === 'ios' ? {zIndex: 10} : null]}>
                <Dropdown
                  action={(item: any) => {
                    {console.log('vjhgwbv',item)}
                    setSelectedCategory(item);
                    setCategoryDropdown(false);
                  }}
                  placeholder=""
                  data={categoryData}
                />
              </View>
            ) : null}
          </View>

          <View
            style={[
              {height: getScreenHeight(6)},
              Platform.OS === 'ios' ? {zIndex: 3} : null,
            ]}>
            <CustomDropDown
              black
              title={selectedSeries ? selectedSeries : 'Series'}
              action={() => {
                setCategoryDropdown(false);
                setSeriesDropdown(!seriesDropdown);
                setColorDropdown(false);
                setUomDropdown(false);
              }}
            />
            {seriesDropdown ? (
              <View style={[Platform.OS === 'ios' ? {zIndex: 10} : null]}>
                <Dropdown
                  action={(item: any) => {
                    setSeriesDropdown(false);
                    setSelectedSeries(item);
                  }}
                  placeholder=""
                  data={seriesData}
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
              title={selectedColor ? selectedColor : 'Color'}
              action={() => {
                setCategoryDropdown(false);
                setSeriesDropdown(false);
                setColorDropdown(!colorDropdown);
                setUomDropdown(false);
              }}
              
            />
            
               {colorDropdown ? (
              <View style={[Platform.OS === 'ios' ? {zIndex: 10} : null]}>
                <Dropdown
                  action={(item: any) => {
                    setColorDropdown(false);
                    setSelectedColor(item);
                  }}
                  placeholder=""
                  data={colorData}
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
              title={selectedUom ? selectedUom : 'UOM'}
              action={() => {
                setCategoryDropdown(false);
                setSeriesDropdown(false);
                setColorDropdown(false);
                setUomDropdown(!uomDropdown);
              }}
            />
            {uomDropdown ? (
              <View style={[Platform.OS === 'ios' ? {zIndex: 10} : null]}>
                <Dropdown
                  action={(item: any) => {
                    setUomDropdown(false);
                    setSelectedUom(item);
                  }}
                  placeholder=""
                  data={uomData}
                />
              </View>
            ) : null}
          </View>

          <View style={styles.customButton}>
            <ArrowButton
              loading={loading}
              action={getAllFilteredProductsManager}
              title="Apply Filters"
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: 'white',
    },
    list: {
      paddingHorizontal: getScreenHeight(2),
    },
    customButton: {
      marginTop: getScreenHeight(50),
    },
  });

export default OrderFilters;
