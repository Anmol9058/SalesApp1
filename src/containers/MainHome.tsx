import React, { useContext, useMemo, useState, useCallback,useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
  Image,
  FlatList,
} from "react-native";
import FastImage from "react-native-fast-image";
import { SafeAreaView } from "react-native-safe-area-context";
import RNSpeedometer from "react-native-speedometer";
import { Title, Body } from "native-base";
import {
  VictoryChart,
  VictoryTheme,
  VictoryLine,
  VictoryAxis,
  VictoryScatter,
  VictoryGroup,
} from "victory-native";

import CustomStatusBar from "../components/CustomStatusBar";
import Spacer from "../components/Spacer";
import fonts from "../constants/fonts";
import { authContext, themeContext } from "../contexts/context";
import { formatPrice, getScreenHeight } from "../utils/domUtil";
import HomeItem from "../components/HomeItem";
import CustomButton from "../components/CustomButton";
import ItemCard from "../components/ItemCard";
const MainHome = ({ navigation }: any) => {
  const { theme } = useContext(themeContext);
  const [data, SetData] = useState([{id:1,name:"Anmol"},{id:2,name:"vishal"},{id:3},{id:4},{id:5}]);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { user_data, availableCreditLimit, setIcon }: any =
    useContext(authContext);
    const renderKeyExtractor = useCallback(
      (item: any, index: any) => index.toString(),
      [],
    );

    const renderItem = ({item}: any) => {
      return(
        <ItemCard />


      );
    }




  return (
    <SafeAreaView edges={["top"]} style={styles.safe}>
      <CustomStatusBar color={theme.primary} light />
      <View style={styles.screen}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            // justifyContent: "center",
            alignSelf: "center",
            width: "100%",
            marginTop: getScreenHeight(2),
            marginBottom: getScreenHeight(1),
          }}
        >
          <View style={{ display: "flex" }}>
            <Text style={{ fontSize: 22, left: "10%", color: "black",fontWeight:'bold' }}>
              Hello, Anmol
            </Text>

            <Text style={{ fontSize: 13, left: "10%", color: "#9A9A9A",fontWeight:'600' }}>
              Welcome back to your account!
            </Text>
          </View>
        </View>

        <View>
          <View style={styles.contanier}>
            <View style={styles.normalRow}>
              <FastImage
                style={styles.icon}
                resizeMode="contain"
                source={require("../assets/images/home/img.png")}
              />
            </View>
            <View></View>

            <View style={{ width: "70%" }}>
              <Text style={styles.itemText}>
                Great! you've achieved 80% of your target
              </Text>
            </View>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.scrollView}>
          <Spacer height={getScreenHeight(2)} />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.titleStyle}>Walk Group</Text>
            <TouchableOpacity>
              <Text style={styles.see}>See all</Text>
            </TouchableOpacity>
          </View>
          <Spacer height={getScreenHeight(2)} />


          <FlatList
            data={data}
            horizontal
            showsHorizontalScrollIndicator={false}

            ListHeaderComponent={() => <Spacer height={getScreenHeight(2)} />}
            keyExtractor={renderKeyExtractor}
            renderItem={renderItem}
            // ListEmptyComponent={NotFound}
          />
            {/* <ScrollView
            {
              data.map((obj)=><ItemCard
              
              name={obj.name}
              />)

            }
            
            
            /> */}

            
            
      



          
       

          <Spacer height={getScreenHeight(2)} />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text>Walk Group</Text>
            <TouchableOpacity>
            <Text style={styles.see}>See all</Text>
            </TouchableOpacity>
          </View>
          <Spacer height={getScreenHeight(2)} />
          <ItemCard />


          <Spacer height={getScreenHeight(2)} />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text>Walk Group</Text>
            <TouchableOpacity>
            <Text style={styles.see}>See all</Text>
            </TouchableOpacity>
          </View>
          <Spacer height={getScreenHeight(2)} />
          <ItemCard />

        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.white,
    },
see:{
  color:theme.primary,
  fontSize:getScreenHeight(1.6)
},

    safe: {
      flex: 1,
      backgroundColor: theme.black,
    },
    header: {
      height: getScreenHeight(8),
      backgroundColor: theme.white,
      flexDirection: "row",
    },
    logo: {
      height: getScreenHeight(9),
      width: getScreenHeight(26),
    },
    headerContanier: {
      backgroundColor: theme.primary,
      height: getScreenHeight(4),
      paddingHorizontal: getScreenHeight(2),
      justifyContent: "center",
    },
    title: {
      fontSize: getScreenHeight(1.8),
      color: "#ffffff",
      fontFamily: fonts.bold,
    },
    subtitle: {
      fontSize: getScreenHeight(1.5),
      color: "#ffffff",
      fontFamily: fonts.regular,
    },
    scrollView: {
      paddingHorizontal: getScreenHeight(2),
    },
    row: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    itemText: {
      fontSize: getScreenHeight(1.7),
      color: theme.white,
      fontFamily: fonts.medium,
    },
    textContanier: {
      marginRight: getScreenHeight(4),
      borderColor: theme.primary_light,
      padding: getScreenHeight(1),
      borderRadius: getScreenHeight(2),
    },
    chartContanier: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
    },
    contanier: {
      backgroundColor: theme.primary,
      padding: getScreenHeight(2),
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderRadius: getScreenHeight(2),
      marginTop: getScreenHeight(2),
      marginHorizontal: getScreenHeight(1),
    },
    normalRow: {
      position: "absolute",
      flexDirection: "row",
      // alignItems: 'center',
      // flex: 1,
    },
    icon: {
      height: getScreenHeight(15),
      width: getScreenHeight(15),
      marginLeft: getScreenHeight(0.8),
    },
    mainTitle: {
      fontFamily: fonts.bold,
      fontSize: getScreenHeight(2.5),
      color: theme.primary,
    },
    divider: {
      backgroundColor: "#4D4D4D",
      width: getScreenHeight(0.1),
      height: getScreenHeight(20),
      marginHorizontal: getScreenHeight(2),
    },
    titleStyle:{
      color:'black',
      fontSize:getScreenHeight(2),
      fontWeight:'bold'

    }

  });

export default MainHome;
