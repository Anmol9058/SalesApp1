import React from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { getScreenHeight, getScreenWidth } from "../utils/domUtil";
import FastImage from "react-native-fast-image";
import theme from "../redux/theme";
const ItemCard = (props) => {
  return (
  
      <View style={styles.container}>
        <Image
          style={{
            width: "100%",
            height: getScreenHeight(9),
            backgroundColor: "green",
            borderRadius: 10,
            borderBottomRightRadius: 0,
            borderBottomLeftRadius: 0,
          }}
          source={require("../assets/images/home/card.jpeg")}
        />
        <Text
          style={{
            color: "green",
            marginLeft: getScreenHeight(2),
            marginTop: getScreenHeight(1),
          }}
        >
          Title
        </Text>

        <View
          style={{
            marginTop: getScreenHeight(0.6),
            marginBottom: getScreenHeight(0.5),
          }}
        >
          <Text
            style={styles.subTitle}
          >
            City , Country
          </Text>
          <Text style={styles.subTitle}>members</Text>
          <Text style={styles.subTitle}>Organised by</Text>
        </View>
      </View>
  
  );
};
export default ItemCard;
const styles = StyleSheet.create({
  container: {
    width: getScreenWidth(50),
    elevation: 4,
    backgroundColor: "white",
    borderRadius: 10,
    marginLeft:getScreenHeight(0.3),
    marginRight: getScreenHeight(2),
    marginBottom:getScreenHeight(1.3),
  },
  subTitle: {
    marginLeft: getScreenHeight(2),
    fontSize: getScreenHeight(1.3),
  },
});
