import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import BottomBar from './BottomBar';
import DrawerContent from './DrawerContent';
import CardsNotes from '../containers/CardsNotes';
import PlaceOrder from '../containers/PlaceOrder';
import PurchaseSummary from '../containers/PurchaseSummary';
import Redeem from '../containers/Redeem';
import CreditPolicy from '../containers/CreditPolicy';
import PriceList from '../containers/PriceList';
import DeliveryConfirmation from '../containers/DeliveryConfirmation';
import WebLinks from '../containers/WebLinks';
import ClaimSystem from '../containers/ClaimSystem';
import RegisterWarrenty from '../containers/RegisterWarrenty';
import AgeingSummary from '../containers/AgeingSummary';
import CreditSummary from '../containers/CreditSummary';
import Overdue from '../containers/Overdue';
import ChequesHand from '../containers/ChequesHand';
import ChequeDepositRegister from '../containers/ChequeDepositRegister';
import ChequeBounce from '../containers/ChequeBounce';
import AccountStatement from '../containers/AccountStatement';
import CardReport from '../containers/CardReport';
import Announcement from '../containers/Announcement';
import MyProfile from '../containers/MyProfile';
import CoinSummary from '../containers/CoinSummary';
import About from '../containers/About';
import Settings from '../containers/Settings';
import HomeStack from './HomeStack';

const Drawer = createDrawerNavigator();

const DrawerStack = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerPosition: 'right',
        headerShown: false,
        drawerStyle: {width: '90%'},
      }}
      drawerContent={DrawerContent}
      initialRouteName="HomeStack">
      <Drawer.Screen name="HomeStack" component={HomeStack} />

      {/* <Drawer.Screen name="PlaceOrder" component={PlaceOrder} />
      <Drawer.Screen name="PurchaseSummary" component={PurchaseSummary} />
      <Drawer.Screen name="Redeem" component={Redeem} />
      <Drawer.Screen name="CreditPolicy" component={CreditPolicy} />
      <Drawer.Screen name="PriceList" component={PriceList} />
      <Drawer.Screen
        name="DeliveryConfirmation"
        component={DeliveryConfirmation}
      />
      <Drawer.Screen name="WebLinks" component={WebLinks} />
      <Drawer.Screen name="ClaimSystem" component={ClaimSystem} />
      <Drawer.Screen name="RegisterWarrenty" component={RegisterWarrenty} />
      <Drawer.Screen name="AgeingSummary" component={AgeingSummary} />
      <Drawer.Screen name="CreditSummary" component={CreditSummary} />
      <Drawer.Screen name="Overdue" component={Overdue} />
      <Drawer.Screen name="ChequesHand" component={ChequesHand} />
      <Drawer.Screen
        name="ChequeDepositRegister"
        component={ChequeDepositRegister}
      />
      <Drawer.Screen name="ChequeBounce" component={ChequeBounce} />
      <Drawer.Screen name="AccountStatement" component={AccountStatement} />
      <Drawer.Screen name="CardReport" component={CardReport} />
      <Drawer.Screen name="Announcement" component={Announcement} />
      <Drawer.Screen name="MyProfile" component={MyProfile} />
      <Drawer.Screen name="CoinSummary" component={CoinSummary} />
      <Drawer.Screen name="Settings" component={Settings} />
      <Drawer.Screen name="About" component={About} /> */}
    </Drawer.Navigator>
  );
};

export default DrawerStack;
