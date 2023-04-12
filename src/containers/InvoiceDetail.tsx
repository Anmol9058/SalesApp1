import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

import {authContext, themeContext} from '../contexts/context';
import CustomStatusBar from '../components/CustomStatusBar';
import {formatPrice, getScreenHeight} from '../utils/domUtil';
import fonts from '../constants/fonts';
import CustomNewHeader from '../components/CustomNewHeader';
import Header from '../components/Header';
import useApi from '../hooks/useApi';
import {getInvoiceLine} from '../api/home';
import {useQuery} from 'react-query';
import RNFetchBlob from 'rn-fetch-blob';

const InvoiceDetail = (props: any) => {
  const {theme} = useContext(themeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const InvoiceData = props.route.params.item;
  const {user_data, setPdfLoading}: any = useContext(authContext);
  const {apiCall} = useApi();
  const [options, setOptions] = useState('');
  const [htmlContent, setHtmlContent] = useState('');

  const getInvoiceLineManager = useCallback(async () => {
    try {
      const res = await getInvoiceLine(apiCall, InvoiceData.Id);
      if (res) {
        return res;
      }
    } catch (error) {}
  }, [apiCall]);

  const {isFetching, data: invoiceLData} = useQuery(
    `getInvoice${InvoiceData.Id}`,
    getInvoiceLineManager,
    {
      retry: 0,
      enabled: true,
      onSuccess(data) {
        let content = ``;

        for (let i = 1; i <= data.length; i++) {
          console.log(data[i]);
          content =
            content +
            ` <apex:variable value="{!0}" var="index"/>
  <apex:repeat value="{!InvLine}" var="i"  id="theRepeat">
      <tr style="font-size : 12px">
          <td>${i}</td>
          <td>${data[i]?.No__c ? data[i]?.No__c : 'NA'}</td>
          <td>${data[i]?.HSN_SAC_Code__c ? data[i]?.HSN_SAC_Code__c : 'NA'}</td>
          <td>${data[i]?.Quantity__c ? data[i]?.Quantity__c : 'NA'}</td>
          <td>${
            data[i]?.Unit_of_Measure__c ? data[i]?.Unit_of_Measure__c : 'NA'
          }</td>
          <td>${data[i]?.Unit_Price__c ? data[i]?.Unit_Price__c : 'NA'}</td>
          <td>(${data[i]?.Line_Discount__c ? data[i]?.Line_Discount__c : 'NA'})
              ${
                data[i]?.Line_Discount_Amount__c
                  ? data[i]?.Line_Discount_Amount__c
                  : 'NA'
              }</td>
          <td>${
            data[i]?.Unit_Price__c * data[i]?.Quantity__c
          }<!-- Unit_Price__c X Invoice_Quantity__c FROM Invoice_Line__c!--></td>
          <td>${
            data[i]?.CGST ? data[i]?.CGST : 'NA'
          }<!-- CGST__c FROM Invoice__c!--></td>
          <td>${
            data[i]?.CGST ? data[i]?.CGST : 'NA'
          }<!-- CGST_Value__c FROM Invoice__c!--></td>
          <td>${data[i]?.SGST ? data[i]?.SGST : 'NA'}</td><!--SGST -->
          <td>${
            data[i]?.SGSTValue ? data[i]?.SGSTValue : 'NA'
          }</td><!--SGST Value -->
          <td>${data[i]?.IGST ? data[i]?.IGST : 'NA'}</td><!--IGST -->
          <td>${
            data[i]?.IGSTValue ? data[i]?.IGSTValue : 'NA'
          }</td><!--IGST Value -->
          <td></td>
      </tr>
  </apex:repeat>`;
        }
        setHtmlContent(content);
      },
    },
  );

  const createPdf = async (content: any) => {
    setPdfLoading(true);
    try {
      let options = {
        html: content,
        fileName: 'Customer Ledger',
        directory: 'Downloads',
        base64: true,
        height: 1024,
        width: 1024,
        bgColor: '#ffffff',
      };
      let file = await RNHTMLtoPDF.convert(options);
      if (Platform.OS === 'android') {
        const android = RNFetchBlob.android;
        android.actionViewIntent(file.filePath, 'application/pdf');
      } else {
        RNFetchBlob.ios.openDocument(file.filePath);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPdfLoading(false);
    }
  };

  useEffect(() => {
    let content = `
    <apex:page standardController="Invoice__c" extensions="Generate_PDF" renderAs="pdf">
    <head>
        <style type="text/css">
            *{
            margin:1px;
            padding:0px;
            }
            <!--.header-row{
            width: 100%;
            height: 200px;
            display: flex;
            }-->
            .header-title {
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            }
            @page {
            <!--size: A4 landscape; -->  
            border: 1px solid black;    
            <!--padding-left: 5px;    
            padding-right: 5px; -->      
            }
        </style>
    </head>
    <body>
        <apex:pageMessages />

        <div class="header">
            <div style="margin-top:-15px"><!--class="header-row"-->
                <!--hr/-->
                <img src="{!$Resource.SalesApp_logo}" width="150px" height="35px" align="left"/>
                <div  style="text-align: center;margin-top:-10px"><!--class="header-title"-->
                    <br/>
                    <b>SalesApp INDIA PRIVATE LIMITED</b><br/>
                    <b> Tax Invoice</b>
                </div>
            </div>
            <br/>
            <p style="font-size:12px; text-align: center;">Goods and Service. Tax Invoice Under Section 31 of CGST/SGST Act 2017 and as per Invoice Rules 2017</p>
            <br/>
            <br/>
        </div>
        <hr/>
       
        <center>
            <div>
                <!--apex:panelGrid border="1" -->
                    <apex:panelGrid columns="2" width="100%" style="font-size:12px">
                        <div style="text-align: left; font-size:12px; margin-top: 27px">
                            <p><b>Company: </b>SalesApp INDIA PRIVATE LIMITED</p>
                            <p><b>Company Add:</b>${
                              user_data.Address_line_1__c
                            }</p>
                            <p><b>State :</b>${!user_data?.YIN_State__c}<!--YIN_State__c FROM Account!--><span style="margin-left:40px;"><b>State Code :</b>${
      user_data?.State_c__r?.Name
    }<!--State_c__c lookup FROM Account!--></span></p>
                            <p><b>GSTIN Number :</b> ${
                              user_data.GST_IN_y__c
                            }<!--GST_IN_y__c FROM Account!--></p>
                            <p><b>CIN Number :</b> ${
                              user_data.CIN_No_y__c
                            }<!--CIN_No_y__c FROM Account!--></p>
                            <p><b>Invoice Number :</b> ${
                              InvoiceData.Name
                            }<!--Name FROM Invoice__c!--></p>
                            <p><b>Invoice Date :</b> ${
                              InvoiceData?.Invoice_Date__c
                                ? invoiceLData?.Invoice_Date__c
                                : 'NA'
                            }<!--Invoice_Date__c FROM Invoice__c!--></p>
                            <p><b>Place of Supply :</b> {!ShipToStateCode} - {!ShipToState}<!-- ship to state & ship to state code!--></p>
                        </div>
                       
                        <apex:panelGrid columns="1" width="150%" style="text-align:left;font-size:12px">
                            <!--div style="text-align: left; font-size:12px; margin-top: -65px"!-->
                            <p><b>External Doc. No. :</b>{!ExternalDocNo}<!--External_Document_No__c FROM Invoice__c!--></p>
                            <p><b>Order Date :</b> {!OrderDate}<!--Order_Date__c FROM Invoice__c!--></p>
                            <p><b>Docket No. :</b>{!DocketNo}<!--Docket_No__c FROM Invoice__c!--></p>
                            <p><b>Vehicle No.:</b> {!VehicleNo}<!--Vehicle_No__c FROM Invoice__c!--></p>
                            <p><b>LR No. :</b> {!LRNo}<!--LR_RR_No__c FROM Invoice__c!--></p>
                            <p><b>LR Date :</b> {!LRDate}<!--LR_RR_Date__c FROM Invoice__c!--></p>
                            <p><b>PAN No:</b> {!PanNo}<!--PAN_No_y__c FROM Account!--></p>
                            <p><b>E-Way Bill No. :</b> {!EWayBill}<!--E_Way_Bill_No__c FROM Invoice__c!--></p>
                            <p><b>Total Weight(KGS):</b> {!TotalWeight} KGS<!--Calculate from the wt. of each product!--></p>
                            <p><b>IRN No:</b> {!IRN}<!--IRN_Hash__c FROM Invoice__c!--></p>
                            <!--/div!-->
                        </apex:panelGrid>
                    </apex:panelGrid>
                <!--/apex:panelGrid-->
            </div>
        </center>
        <div>
            <table width="100%" cellpadding="0" cellspacing="0" style="font-size:12px">
                <tr>
                    <td colspan ="4"><hr/></td>
                </tr>
                <tr>
                    <th colspan="2">Details of Receiver (Billed to)</th>
                    <th colspan="2">Details of Consignee (Shipped to)</th>
                </tr>
                <tr>
                    <td colspan ="4"><hr/></td>
                </tr>
                <tr>
                    <td><b>Name : </b>{!BillToName}</td>
                    <td><b>Code:</b>{!BillToCode}</td>
                    <td><b>Name:</b></td>
                    <td>{!ShipToName}</td>
                </tr>
                <tr>
                    <td><b>Address:</b></td>
                    <td>{!BillToAddress}</td>
                    <td><b>Address:</b></td>
                    <td>{!ShipToAddress}</td>
                </tr>
                <tr>
                    <td><b>Post Code:</b></td>
                    <td> {!BilltopostcodeValuee}</td>
                    <td><b>Post Code:</b></td>
                    <td>{!ShipToPostCode}</td>
                </tr>
                <tr>
                    <td><b>State:</b></td>
                    <td>{!BillToState}</td>
                    <td><b>State:</b></td>
                    <td>{!ShipToState}</td>
                </tr>
                <tr>
                    <td><b>State Code:</b></td>
                    <td>{!BillToStateCode}</td>
                    <td><b>State Code:</b></td>
                    <td>{!ShipToStateCode}</td>
                </tr>
                <tr>
                    <td><b>GSTIN/Unique ID:</b></td>
                    <td>{!BillToGST}</td>
                    <td><b>GSTIN/Unique ID:</b></td>
                    <td>{!ShipToGST}</td>
                </tr>
                <tr>
                    <td><b>Phone No :</b></td>
                    <td>{!BillToContact}</td>
                    <td><b>Phone No :</b></td>
                    <td>{!ShipToContact}</td>
                </tr>
            </table>
        </div>
        <br/>
        <div>
            <table width="100%" cellpadding="0" cellspacing="0" border="1">
                <tr></tr>
                <tr style="font-size:13px">
                    <th>No.</th>
                    <th>Item No. /Description</th>
                    <th>HSN/SAC</th>
                    <th>Qty</th>
                    <th>UOM</th>
                    <th>Unit
                        Price</th>
                    <th>Disc
                        Amt</th>
                    <th>taxable
                        value</th>
                    <td colspan="2"><b>CGST</b></td>
                    <th colspan="2">SGST/UGST</th>
                    <th colspan="2">IGST</th>
                    <th >Amount</th>
                   
                </tr>
                <tr style="font-size:13px">
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td><b>Rate</b></td>
                    <td><b>Amt.</b></td>
                    <td><b>Rate</b></td>
                    <td><b>Amt.</b></td>
                    <td><b>Rate</b></td>
                    <td><b>Amt.</b></td>
                    <td></td>
                   
                </tr>
               
                ${htmlContent}
               
                <tr style="font-size : 12px">
                    <td></td>
                    <td>Sub Total</td>
                    <td></td>
                    <td>{!SubTotal}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>{!TaxableValue}</td>
                    <td></td>
                    <td>{!TotalCGST}</td>
                    <td></td>
                    <td>{!TotalSGST}</td>
                    <td></td>
                    <td></td>
                    <td>{!InvoiceAmount}<!--Invoice_Amount_y__c FROM Invoice__c!--></td>
                </tr>
               
                <tr style="font-size:12px">
                    <td></td>
                    <td colspan="7" style="text-align:left"><b>Invoice Value(In Words)</b></td>
                    <td colspan="4" style="text-align:right"><b>Total Amt Before Tax</b></td>
                    <td colspan="3" style="text-align:right;font-size:12px"><b>{!TaxableValue}</b></td>
                </tr>
               
                <tr style="font-size:12px">
                    <td></td>
                    <td colspan="7"><b>**** {!textValue} RUPEES AND {!decimalValue} PAISE ONLY</b></td>
                    <td colspan="4" style="text-align:right"><b>Add:CGST</b></td>
                    <td colspan="3" style="text-align:right;font-size:12px"><b>{!TotalCGST}</b></td>
                </tr>
               
                <tr style="font-size : 12px">
                    <td rowspan="8" colspan="8" style="text-align:center;font-size:13px"><h5>Our Bank Details</h5>
                        <p style="text-align:left"><b>Bank Name</b> ${
                          user_data?.Bank_Name__c
                        }<!--Bank_Name__c FROM Account!--></p>
                        <p style="text-align:left"><b>Bank A/C No.</b> ${
                          user_data?.Bank_Account_Number_c__c
                        }</p>
                        <p style="text-align:left"><b>IFSC Code.</b>${
                          user_data?.IFSC_Code__c
                        }</p>
                        <p style="text-align:left"><b>Bank Address</b> Huda Market Sec. - 46, Gurgaon - 122002, Haryana</p>
                        <p style="text-align:left"><b>Terms of Delivery</b> CIF</p>
                    </td>
                    <td colspan="4" style="text-align:right"><b>Add:SGST</b></td>
                    <td colspan="3" style="text-align:right"><b>{!TotalSGST}</b></td>
                </tr>
               
                <tr style="font-size:12px">
                   
                    <td colspan="4" style="text-align:right"><b>Add:IGST</b></td>
                    <td colspan="3" style="text-align:right"><b>{!TotalIGST}</b></td>
                </tr>
               
                <tr style="font-size:12px">
                   
                    <td colspan="4" style="text-align:right"><b>TCS Amount</b></td>
                    <td colspan="3" style="text-align:right"><b>0.00</b></td>
                </tr>
               
                <tr style="font-size:12px">
                   
                    <td colspan="4" style="text-align:right"><b>Grand Total AfterTax</b></td>
                    <td colspan="3" style="text-align:right"><b>{!InvoiceAmount}</b></td>
                </tr>
               
                <tr style="font-size:12px">
                   
                    <td colspan="4" style="text-align:right"><b>Rounding Off</b></td>
                    <td colspan="3" style="text-align:right"><b>{!RoundOff}</b></td>
                </tr>
               
                <tr style="font-size:12px">
                   
                    <td colspan="4" style="text-align:right"><b>TDS As Per Section 194Q</b></td>
                    <td colspan="3" style="text-align:right"><b>0.00</b></td>
                </tr>
               
                <tr style="font-size:12px">
                    <td colspan="4" style="text-align:right"><b>Invoice Discount</b></td>
                    <td colspan="3" style="text-align:right"><b>0.00</b></td>
                </tr>
               
                <tr style="font-size:12px">
                    <td colspan="4" style="text-align:right"><b>Net Total Amount</b></td>
                    <td colspan="3" style="text-align:right"><b>{!TotalAfterRound}</b></td>
                </tr>
               
                <tr style="font-size:12px">
                    <td colspan="12" style="text-align:right"><b>Amount of Tax Subject to Reverse Charge</b></td>
                    <td colspan="3" style="text-align:right"><b>No</b></td>
                </tr>
               
                <tr style="font-size:12px">
                    <td colspan="15" height="70px" style="text-align:left"><b>Remarks :-</b></td>
                </tr>
               
                <tr style="font-size:12px">
                    <td colspan="9"><b>Certified that the Particulars given above are true and correct</b></td>
                    <td colspan="6"><b>Electronic Reference Number:</b></td>
                </tr>
               
                <tr style="font-size:12px">
                    <td colspan="9" height="30px"> </td>
                    <td colspan="6" height="30px"> </td>
                </tr>
               
                <tr style="font-size:13px">
                    <td colspan="9" height="30px"><b>P.T.O FOR TERMS AND CONDITIONS OF SALE</b></td>
                    <td colspan="6" height="30px"><b>SalesApp INDIA PRIVATE LIMITED</b></td>
                </tr>
               
                <tr style="font-size:12px">
                    <td colspan="9" rowspan="4">Registered and Corporate Office:- Plot No.1, Sector 4B Bahadurgarh Industrial Estate HSIIDC Bahadurgarh,Dist-Jhajjar, Haryana-124507</td>
                </tr>
               
                <tr>
                    <td colspan="6" height="30px"> </td>
                </tr>
               
                <tr style="font-size:13px">
                    <td colspan="6" height="30px"><b>Authorised Signatory</b></td>
                </tr>
               
                <tr>
                    <td colspan="6" height="30px"> </td>
                </tr>
               
            </table>
        </div>
       
       
        <!--table width="100%" style="border:1px solid #C0C0C0;border-collapse: collapse;" >
        </table-->
       
        <div style="page-break-after: always"/>
        <div style="font-size:13px">
            <h1 style="text-align:center;font-size:14px">CONDITIONS OF SALE</h1><br/>
            <table style="font-size:14spx">
                <tr>
                    <td>1.</td>
                    <td>All orders booked by the Company are subject to these conditions of sale and all purchasers/buyers are deemed to have signified their acceptance to these conditions in addition to the other commercial policies of the Company while placing an order.</td>
                </tr>
                <tr>
                    <td>2.</td>
                    <td>It will be optional to the Company to cancel in whole or in part any order at any time even though the Company has accepted it. 3.Price, discount and terms are subject to change without notice and Company reserve its rights to decline or accept any order.</td>
                </tr>
                <tr>
                    <td>3.</td>
                    <td>The Purchaser shall ensure to make payment against the Invoices within 30 days from the date of         Invoice. The company reserves the Right to charge interest @ 18% Per annum (or such other rates of int. as may be determined by co. from time to time) in case of delayed payments. </td>
                </tr>
                <tr>
                    <td>4.</td>
                    <td>The Purchaser shall be solely responsible for all compliances with respect to Goods and Service tax and the company shall not be responsible if any liability arises on the purchaser for any reason whatsoever. </td>
                </tr>
                <tr>
                    <td>5.</td>
                    <td>Orders will be executed at the price, discount and terms prevailing on the date of dispatch whether or not payment in part or in full has been made. Goods once sent according to order will not be taken back except by the consumer making special requests and arrangement with the Company and the purchaser has received the Company's written permission signed by a duly authorized official to return the goods. In such case buyer must prepaid the freight charges and other charges to the Company.</td>
                </tr>
                <tr>
                    <td>6.</td>
                    <td>All levies of the central government/state government of local authority shall be payable extra by the purchaser. Where any declaration / form provided by the purchaser for the purpose of exemption of such levies is rejected by the concerned authority for any reason whatsoever, the purchaser shall be liable to pay all such levies along with consequential damages etc.</td>
                </tr>
                <tr>
                    <td>7.</td>
                    <td>Every efforts have been made by the Company to secure the highest possible standard of excellence of both material and workmanship and the Company takes no representation or guarantee/warranty whatsoever in respect of any products sold or supplied by the Company and all conditions and warranties whatsoever, whether statutory or otherwise are hereby expressly excluded. The Company shall not be liable for any consequential loss/injury/claim whatsoever arising out of the use of any product of the Company. Purchaser cannot extend scope of warranty incase of resale.</td>
                </tr>
                <tr>
                    <td>8.</td>
                    <td>Without prejudice to the generality of Condition No. 6, Company reserves the right to consider claim brought to the Company in respect of a defective product as per the "Company limited warranty policy " of the Company at its absolute discretion. In all such cases the person returning the goods must prepay freight. Material should lie properly verified with the Invoice before accepting delivery from the transport carriers. All claims for goods lost or damaged or in transit must be made upon the carriers. The Company does not accept responsibility for goods after they have left the Company's premises</td>
                </tr>
                <tr>
                    <td>9.</td>
                    <td>Alleged defective goods submitted under claim will be received for examination as per the "Company limited warranty policy" of the Company and on the understanding that, if any, award/claim is passed should get acceptance within 21 days from the date of notification thereof. In the absence of such acceptance Company reserve its right to withdraw the award and to destroy/return the said goods at the cost of the claimant.</td>
                </tr>
                <tr>
                    <td>10.</td>
                    <td>The Company neither assume nor accepts any legal responsibility from any damages to persons or property, which may arise from failure of any of its products.</td>
                </tr>
                <tr>
                    <td>11.</td>
                    <td>In the event of purchaser failing to take delivery of goods ordered by them, the Company may in addition to its other legal remedies recall or deal with the goods at its absolute discretion. In such cases purchasers will be liable to reimburse the Company all charges, costs and expenses incurred in dispatching and reselling the goods including actual Bank/VPP/Freight, handling and demurrage charges. Company's statement of claim will be final and binding on purchasers.</td>
                </tr>
                <tr>
                    <td>12.</td>
                    <td>No arrangement or contract is binding on the Company unless in writing and signed by duly authorized officer of the Company.</td>
                </tr>
                <tr>
                    <td>13.</td>
                    <td>The Company will, make every reasonable effort to effect prompt delivery of the goods, however, it shall not be liable for any delay in delivery due to unforeseen circumstances or the circumstances beyond its control.</td>
                </tr>
                <tr>
                    <td>14.</td>
                    <td>The purchaser undertakes not to trade the goods sold under this invoice without the written permission of the Company except when fitted to vehicles or machines.</td>
                </tr>
                <tr>
                    <td>15.</td>
                    <td>All dispute arising out of, or in connection with this invoice shall, fall within the Jurisdiction of the Courts at Delhi ONLY to the exclusion of all other Courts.</td>
                </tr>
            </table>
           
        </div>
    </body>
</apex:page>`;
    setOptions(content);
  }, [htmlContent]);

  const renderItem = ({item}: any) => {
    return (
      <View style={styles.item}>
        <View style={styles.row}>
          <Text style={styles.title}>Product :</Text>
          <Text style={styles.value}>{item.Name}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.title}>Quantity:</Text>
          <Text style={styles.value}>{item.Quantity__c}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.title}>Amount:</Text>
          <Text style={styles.value}>{formatPrice(item?.Amount__c)}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <CustomStatusBar color={theme.black} light />
      <View style={styles.screen}>
        <CustomNewHeader
          subtitle={user_data?.Customer_No__c ? user_data?.Customer_No__c : ''}
          action={() => props.navigation.goBack()}
          title={user_data?.Name ? user_data?.Name : ''}
        />
        <View style={styles.contanier}>
          <Header dark title={InvoiceData?.Name} hide />

          <TouchableOpacity
            onPress={() => createPdf(options)}
            style={styles.buttonContanier}>
            <Text style={styles.buttonText}>Download</Text>
          </TouchableOpacity>

          <FlatList
            ListHeaderComponent={() =>
              isFetching ? (
                <ActivityIndicator color={theme.primary} size="small" />
              ) : null
            }
            keyExtractor={(item, index) => index.toString()}
            data={invoiceLData}
            renderItem={renderItem}
            contentContainerStyle={styles.flatlist}
          />
        </View>
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
    safe: {
      flex: 1,
      backgroundColor: theme.black,
    },
    linearGradient: {
      flex: 1,
    },
    flatlist: {
      paddingHorizontal: getScreenHeight(2),
    },
    contanier: {
      paddingHorizontal: getScreenHeight(2),
      backgroundColor: theme.white,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: getScreenHeight(0.5),
    },
    title: {
      fontFamily: fonts.bold,
      fontSize: getScreenHeight(1.6),
      color: theme.black,
      width: '30%',
    },
    value: {
      fontFamily: fonts.bold,
      fontSize: getScreenHeight(1.6),
      color: theme.primary,
      flex: 1,
    },
    item: {
      padding: getScreenHeight(2),
      backgroundColor: theme.lightGrey,
      borderRadius: getScreenHeight(1),
      marginTop: getScreenHeight(2),
      width: '100%',
    },
    buttonContanier: {
      paddingHorizontal: getScreenHeight(2),
      paddingVertical: getScreenHeight(0.5),
      backgroundColor: theme.white,
      width: '30%',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: getScreenHeight(0.5),
      alignSelf: 'flex-end',
      marginVertical: getScreenHeight(2),
    },
    buttonText: {
      fontFamily: fonts.regular,
      fontSize: getScreenHeight(1.8),
      color: theme.primary,
    },
  });

export default InvoiceDetail;
