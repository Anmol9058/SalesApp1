import React from 'react';
import {
  Dimensions,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
} from 'react-native';

const OPTIONS = ['red', 'blue', 'green', 'pink'];
const dept = ['Marketing', 'Service', 'SCM', 'IT', 'Finance', 'Sales', 'Legal'];
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const ModalPicker = (props: any) => {
  const onPressItem = (option: any) => {
    props.changeModalVisibility(false, dept);
    props.setData(option, props.modal_no);
  };
  const option = props.modal_data.map((item: any, index: any) => {
    return (
      <TouchableOpacity
        style={{alignItems: 'center'}}
        key={index}
        onPress={() => onPressItem(item)}>
        <Text
          style={{
            margin: 10,
            fontSize: 17,
            fontWeight: 'bold',
            color: 'white',
            borderWidth: 1,
            borderColor: 'white',
            borderRadius: 10,
            padding: 7,
            width: 300,
            textAlign: 'center',
          }}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  });
  return (
    <TouchableOpacity
      onPress={() => props.changeModalVisibility(false)}
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          backgroundColor: '#333333',
          borderRadius: 10,
          width: WIDTH - 30,
          height: HEIGHT / 2.5,
        }}>
        <ScrollView>{option}</ScrollView>
      </View>
    </TouchableOpacity>
  );
};

export default ModalPicker;
