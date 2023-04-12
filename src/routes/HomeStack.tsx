import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerStack from './DrawerStack';
import NotYetDue from '../containers/NotYetDue';
import DeliveryConfirmationHistory from '../containers/DeliveryConfirmationHistory';
import InvoiceDetail from '../containers/InvoiceDetail';
import OrderFilters from '../containers/OrderFilters';
import Cart from '../containers/Cart';
import CardsNotes from '../containers/CardsNotes';
import PlaceOrder from '../containers/PlaceOrder';
import PurchaseSummary from '../containers/PurchaseSummary';
import Redeem from '../containers/Redeem';
import CreditPolicy from '../containers/CreditPolicy';
import CreditProposal from '../containers/CreditProposal';
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
import { Settings } from 'react-native';
import About from '../containers/About';
import CustomOpenSettings from '../components/CustomOpenSettings';
import SalesOrderList from '../containers/SalesOrderList';
import SalesOrderDetail from '../containers/SaleOrderDetail';
import EditProfile from '../containers/EditProfile';
import NewClaim from '../containers/NewClaim/NewClaim';
import ClaimPhotos from '../containers/NewClaim/ClaimPhotos';
import ClaimReview from '../containers/NewClaim/ClaimReview';
import CustomerInfo from '../containers/checkCustomer/CustomerInfo';
import AddPhotos from '../containers/checkCustomer/AddPhotos';
import VehicleDetails from '../containers/checkCustomer/VehicleDetails';
import Points from '../containers/Points';
import LeadScreen from '../containers/LeadScreen';
import newLeadScreen from '../containers/newLeadScreen';
import newInflScreen from '../containers/newInflScreen';
import InfluencerScreen from '../containers/InfluencerScreen';

import CredDebtReport from '../containers/CredDebtReport';
import SecurityDeposit from '../containers/SecurityDeposit';
import SalesAppHome from '../containers/SalesAppHome';
import TDSReport from '../containers/TDSReport';
import YCNAgreement from '../containers/YCNAgreement';
import Survey from '../containers/Survey';
import PrivacyPolicy from '../containers/PrivacyPolicy';
import Terms from '../containers/Terms';
import WarrantyPolicy from '../containers/WarrantyPolicy';
import FAQ from '../containers/Faq';
import ProductPolicy from '../containers/ProductPolicy';
import ContactUs from '../containers/ContactUs';
import Security from '../containers/Security';
import ChangePassword from '../containers/ChangePassword';
import ShippingAddress from '../containers/ShippingAddress';
import BottomBar from './BottomBar';
import YCNMerchandise from '../containers/YCNMerchandise';
import ScanQrCode from '../containers/ScanQrCode';
import SelectSdModel from '../containers/SelectSdModel';
import SelectProposalModel from '../containers/SelectProposalModel';
import SDIncrease from '../containers/SDIncrease';
import SDDecrease from '../containers/SDDecrease';
import CreditAdditional from '../containers/CreditAdditional';
import CreditFixed from '../containers/CreditFixed';
import CreditRemove from '../containers/CreditRemove';
import YCNMerchandiseOrder from '../containers/YCNMerchandiseOrder';
import CreateYcnMerchandise from '../containers/CreateYcnMerchandise';
import Ticket1 from '../containers/Ticket1'
import Ticket from '../containers/Ticket';
import YcnCart from '../containers/YcnCart';
import TermsAndConditions from '../containers/TermsAndConditions';
import TDSReportDetail from '../containers/TDSReportDetail';
import YCNAgreementDetail from '../containers/YCNAgreementDetail';
import TicketDetail from '../containers/TicketDetail';
import FilteredProducts from '../containers/FilteredProducts';
import AllClaims from '../containers/AllClaims';
import AllWarranty from '../containers/AllWarranty';
import ClaimDetail from '../containers/ClaimDetail';
import WarrantyDetail from '../containers/WarrantyDetail';
import Notification from '../containers/Notification';
import CompanyInformation from '../components/Profile/CompanyInformation';
import UpdateCart from "../containers/UpdateCart"
import UpdateAddProducts from '../containers/UpdateAddProducts';

import ApplyOfferScreen from '../containers/ApplyOfferScreen';
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <>
      <Stack.Navigator
        initialRouteName="BottomBar"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="NotYetDue" component={NotYetDue} />
        <Stack.Screen name="BottomBar" component={BottomBar} />
        <Stack.Screen name="TDSReport" component={TDSReport} />
        <Stack.Screen
          name="DeliveryConfirmationHistory"
          component={DeliveryConfirmationHistory}
        />
        <Stack.Screen name="UpdateCart" component={UpdateCart} />
        <Stack.Screen name="InvoiceDetail" component={InvoiceDetail} />
        <Stack.Screen name="OrderFilters" component={OrderFilters} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="PlaceOrder" component={PlaceOrder} />
        <Stack.Screen name="UpdateAddProducts" component={UpdateAddProducts} />
        <Stack.Screen name="PurchaseSummary" component={PurchaseSummary} />
        <Stack.Screen name="Redeem" component={Redeem} />
        <Stack.Screen name="CreditPolicy" component={CreditPolicy} />
        <Stack.Screen name="CreditProposal" component={CreditProposal} />
        <Stack.Screen name="PriceList" component={PriceList} />
        <Stack.Screen
          name="DeliveryConfirmation"
          component={DeliveryConfirmation}
        />
        <Stack.Screen name="WebLinks" component={WebLinks} />
        <Stack.Screen name="ShippingAddress" component={ShippingAddress} />
        <Stack.Screen name="Survey" component={Survey} />
        <Stack.Screen name="YCNAgreement" component={YCNAgreement} />
        <Stack.Screen name="ClaimSystem" component={ClaimSystem} />
        <Stack.Screen name="RegisterWarrenty" component={RegisterWarrenty} />
        <Stack.Screen name="AgeingSummary" component={AgeingSummary} />
        <Stack.Screen name="CreditSummary" component={CreditSummary} />
        <Stack.Screen name="Overdue" component={Overdue} />
        <Stack.Screen name="TDSReportDetail" component={TDSReportDetail} />
        <Stack.Screen name="ScanQrCode" component={ScanQrCode} />
        <Stack.Screen name="ChequesHand" component={ChequesHand} />
        <Stack.Screen name="TicketDetail" component={TicketDetail} />
        <Stack.Screen
          name="ChequeDepositRegister"
          component={ChequeDepositRegister}
        />
        <Stack.Screen name="ChequeBounce" component={ChequeBounce} />
        <Stack.Screen name="AccountStatement" component={AccountStatement} />
        <Stack.Screen name="CardReport" component={CardReport} />
        <Stack.Screen name="Announcement" component={Announcement} />
        <Stack.Screen name="MyProfile" component={MyProfile} />

        <Stack.Screen name="FilteredProducts" component={FilteredProducts} />
        <Stack.Screen name="CoinSummary" component={CoinSummary} />
        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="SalesOrderList" component={SalesOrderList} />
        <Stack.Screen name="SalesOrderDetail" component={SalesOrderDetail} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="NewClaim" component={NewClaim} />
        <Stack.Screen name="Ticket1" component={Ticket1} />
        <Stack.Screen name="Ticket" component={Ticket} />
        <Stack.Screen name="ClaimPhotos" component={ClaimPhotos} />
        <Stack.Screen name="ClaimReview" component={ClaimReview} />
        <Stack.Screen name="CustomerInfo" component={CustomerInfo} />
        <Stack.Screen name="AddPhotos" component={AddPhotos} />
        <Stack.Screen name="VehicleDetails" component={VehicleDetails} />
        <Stack.Screen name="Points" component={Points} />
        <Stack.Screen name="LeadScreen" component={LeadScreen} />
        <Stack.Screen name="newLeadScreen" component={newLeadScreen} />
        <Stack.Screen name="newInflScreen" component={newInflScreen} />
        <Stack.Screen name="CompanyInformation" component={CompanyInformation} />
        <Stack.Screen name="InfluencerScreen" component={InfluencerScreen} />
        <Stack.Screen name="CredDebtReport" component={CredDebtReport} />
        <Stack.Screen name="SecurityDeposit" component={SecurityDeposit} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
        <Stack.Screen name="Terms" component={Terms} />
        <Stack.Screen name="WarrantyPolicy" component={WarrantyPolicy} />
        <Stack.Screen name="FAQ" component={FAQ} />
        <Stack.Screen
          name="TermsAndConditions"
          component={TermsAndConditions}
        />
        <Stack.Screen name="ProductPolicy" component={ProductPolicy} />
        <Stack.Screen name="ContactUs" component={ContactUs} />
        <Stack.Screen name="Security" component={Security} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="YCNMerchandise" component={YCNMerchandise} />
        <Stack.Screen name="SelectSdModel" component={SelectSdModel} />
        <Stack.Screen name="AllClaims" component={AllClaims} />
        <Stack.Screen name="AllWarranty" component={AllWarranty} />
        <Stack.Screen
          name="SelectProposalModel"
          component={SelectProposalModel}
        />
        <Stack.Screen name="SDIncrease" component={SDIncrease} />
        <Stack.Screen name="SDDecrease" component={SDDecrease} />
        <Stack.Screen name="CreditAdditional" component={CreditAdditional} />
        <Stack.Screen name="CreditFixed" component={CreditFixed} />
        <Stack.Screen name="CreditRemove" component={CreditRemove} />
        <Stack.Screen name="ClaimDetail" component={ClaimDetail} />
        <Stack.Screen name="WarrantyDetail" component={WarrantyDetail} />
        <Stack.Screen
          name="YCNAgreementDetail"
          component={YCNAgreementDetail}
        />
        <Stack.Screen
          name="YCNMerchandiseOrder"
          component={YCNMerchandiseOrder}
        />
        <Stack.Screen
          name="CreateYcnMerchandise"
          component={CreateYcnMerchandise}
        />
        <Stack.Screen name="YcnCart" component={YcnCart} />
        <Stack.Screen name="Notification" component={Notification} />
            <Stack.Screen name="ApplyOfferScreen" component={ApplyOfferScreen} />

      </Stack.Navigator>
    </>
  );
};

export default HomeStack;
