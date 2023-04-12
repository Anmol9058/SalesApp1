import { Alert } from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';


var options = {
    description: 'Credits towards consultation',
    image: 'https://i.imgur.com/3g7nmJC.jpg',
    currency: 'INR',
    key: 'rzp_test_P91LOZ6H0nG1L8',
    amount: '5000',
    name: 'Acme Corp',
    // order_id: 'order_DslnoIgkIDL8Zt', //Replace this with an order_id created using Orders API.
    prefill: {
      email: 'gaurav.kumar@example.com',
      contact: '9191919191',
      name: 'Gaurav Kumar',
    },
    theme: {color: '#53a20e'},
  };
  export const PaymentButton = () => {
    console.log('HERE');
    RazorpayCheckout.open(options)
      .then((data: any) => {
        // handle success
        Alert.alert(`Success: ${data.razorpay_payment_id}`);
      })
      .catch((error: any) => {
        console.log('errorrrr', error);
        Alert.alert(`Error: ${error.code} | ${error.description}`);
      });
  };