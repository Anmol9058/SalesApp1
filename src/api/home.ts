// export const getSurveys = async (apiCall: any, user_id: any) => {
//   const res = await apiCall({
//     customUrl: false,
//     type: 'GET',
//     url: `/services/data/v45.0/query/?q=select+id,Name,Active_From__c,Active_To__c,Channel_Master__c,Channel_Master__r.Name,Customer__c,Customer__r.Name,dealer__c,dealer__r.Name,Survey_Link__c,Survey_Type__c+from+YIN_Survey__c+Where+dealer__c='${user_id}'`,
//   });
//   return res.data;
// };

// export const getQrCode = async (apiCall: any, id: any) => {
//   const res = await apiCall({
//     customUrl: false,
//     type: 'GET',
//     url: `/services/data/v45.0/query/?q=select+id,Name,QR_Code__c,Sale_Article_No__c,Sale_Article_No__r.Name,Tire_Pattern__c,Tire_Size__c+from+QR_Code_Master__c+where+QR_Code__c+LIKE+'%25${id}%25'`,
//   });
//   return res.data;
// };

// export const getRimSize = async (apiCall: any) => {
//   const res = await apiCall({
//     customUrl: false,
//     type: 'GET',
//     url: '/services/data/v45.0/query/?q=select+Nom_Rim_Diameter__c+from+Product__c+where+Nom_Rim_Diameter__c!=null+group by+Nom_Rim_Diameter__c',
//   });
//   return res.data.records;
// };

// export const getClaim = async (apiCall: any, id: any) => {
//   const res = await apiCall({
//     customUrl: false,
//     type: 'GET',
//     url: `/services/data/v45.0/query/?q=select+id,Name,Article_No__c,Article_No__r.Name,Customer__c,Customer__r.Name,customer_mobile__c,Date_of_Purcahse__c, Pattern__c,Purchase_From__c,Purchase_From__r.Name,Tyre_Serial_No__c, Tyre_Size_Profile__c, Tyre_Size_Rimsize__c, Tyre_Size_Width__c, Vehicle_Make__c, Vehicle_Model__c, Vehicle_Year__c,Warranty_Card_Number__c,Warranty_Registration__c,Warranty_Registration__r.Name,Warranty_Registration__r.Customer_Mobile__c+FROM+ Claim__c+where+Warranty_Registration__r.Name+=+'${id}'+OR+Warranty_Registration__r.Customer_Mobile__c+=+'${id}'`,
//   });
//   return res.data;
// };

// export const getWarrenty = async (apiCall: any, id: any) => {
//   const res = await apiCall({
//     customUrl: false,
//     type: 'GET',
//     url: `/services/data/v45.0/query/?q=select+id,Name,Customer_Mobile__c,Serial_No_of_Front_Lefts__c,Serial_No_of_Front_Rights__c,Serial_No_of_Rear_Rights__c,Serial_No_of_Spare_Tyres__c,Serial_No_Rear_Lefts__c,Serial_No__c,Customer__c,Article__r.Original_Group_Depth__c,Article__r.Nom_Rim_Diameter__c,CreatedDate,Size__c,Article__r.Section_Width_Y__c,Customer__r.Name,Make__c,Model__c,Year__c,Tyre_Size__c,Tyre_Pattern__c,Article__c,Article__r.Name+from+Warranty_Registration__c+where+Customer_Mobile__c='${id}'+OR+Name='${id}'`,
//   });
//   return res.data;
// };


// export const getAttachments = async (apiCall: any, id: any) => {
//   const res = await apiCall({
//     customUrl: false,
//     type: 'GET',
//     url: `/services/data/v45.0/query/?q=Select+id,body,ParentId+From+Attachment+where+ParentId='${id}'`,
//   });
//   return res.data;
// };


// export const checkWarrentyExistance = async (apiCall: any, name: any, front_left: any, front_right: any, rear_right: any, rear_left: any, spare_tyre: any) => {
//   const res = await apiCall({
//     customUrl: false,
//     type: 'GET',
//     url: `/services/data/v45.0/query/?q=select id, Warranty_Registration__r.Name,name,Serial_No_Front_Left__c,Serial_No_Rear_Left__c,Serial_No_Rear_Right__c,Serial_No_Front_Right__c,Spare_Tyre__c+from+Claim__c+Where+(Warranty_Registration__r.Name='${name}'+AND+Serial_No_Front_Left__c='${front_left}')+OR(Warranty_Registration__r.Name='${name}'+AND+Serial_No_Rear_Left__c='${rear_left}')+OR+(Warranty_Registration__r.Name='${name}'+AND+Serial_No_Rear_Right__c='${rear_right}')+OR(Warranty_Registration__r.Name='${name}'+AND+Serial_No_Front_Right__c='${front_right}')+OR+(Warranty_Registration__r.Name='${name}'+AND+Spare_Tyre__c='${spare_tyre}')`,
//   });
//   return res.data;
// };

// export const getAspectRatio = async (apiCall: any) => {
//   const res = await apiCall({
//     customUrl: false,
//     type: 'GET',
//     url: '/services/data/v45.0/query/?q=select+Aspect_Ratio_Y__c+from+Product__c+where+Aspect_Ratio_Y__c!=null+group by+Aspect_Ratio_Y__c',
//   });
//   return res.data.records;
// };

// export const getCustomerVehicleDetail = async (apiCall: any, name: any) => {
//   const res = await apiCall({
//     customUrl: false,
//     type: 'GET',
//     url: `/services/data/v45.0/query/?q=select+id,Name,Customer__c,Customer__r.Name,Make__c,Customer__r.Customer_Mobile__c,Registration_No__c,Model__c,Year__c,Odometer_Reading__c,Tyre_Size__c,Tyre_Pattern__c,Front_Right__c,Front_Left__c,Rear_Left__c,Rear_Right__c,Spare_Tyre__c,Vehicle_No__c+From+CustomerVehicle__c+Where+Vehicle_No__c='${name}'`,
//   });
//   return res.data;
// };

// export const treadPattern = async (apiCall: any) => {
//   const res = await apiCall({
//     customUrl: false,
//     type: 'GET',
//     url: '/services/data/v45.0/query/?q=select+Tread_Pattern__c+from+Product__c+where+Tread_Pattern__c!=null+group by+Tread_Pattern__c',
//   });
//   return res.data.records;
// };

// export const sectionWidth = async (apiCall: any) => {
//   const res = await apiCall({
//     customUrl: false,
//     type: 'GET',
//     url: '/services/data/v45.0/query/?q=select+Section_Width_Y__c+from+Product__c+where+Section_Width_Y__c!=null+group by+Section_Width_Y__c',
//   });
//   return res.data.records;
// };

// export const getSecurityDeposit = async (apiCall: any, dealerId: any) => {
//   const res = await apiCall({
//     customUrl: false,
//     type: 'GET',
//     url: `/services/data/v45.0/query/?q=select+id,Currency__c,Approval_Matrix__c,CreatedDate,Bank_Name__c,Current_SD__c,Dealer__c,Request_Type__c,SD_Decrease_Amount__c,SD_Increase_Amount__c,Security_Deposite_No__c,Total_SD__c,UTR_No__c+from+Security_Deposite__c+where+Dealer__c+=+'${dealerId}' order by createdDate desc`,
//   });
//   return res.data.records;
// };

export const getAllProducts = async (apiCall: any,id: any,state:any) => {
  const res = await apiCall({
    customUrl: false,
    type: 'GET',
    //need to add acc sfid and state id from login api
    url: `order/getProduct?account_id=${id}&state_id=${state}`,
  });
  console.log('Products Response:', res);
  return res.data.data;
};

export const getAllFilteredProducts = async (apiCall: any, id: any, state: any, uom?: any,category?: any,series?: any, color?: any) => {
  const res = await apiCall({
    customUrl: false,
    type: 'GET',
    url: `/order/getProduct?account_id=${id}&state_id=${state}&uom=${uom}&category=${category}&series=${series}&color=${color}`,
  });
  return res.data.data;
};

// export const getCustomerVehicles = async (apiCall: any, id: any) => {
//   const res = await apiCall({
//     customUrl: false,
//     type: 'GET',
//     url: `services/data/v45.0/query/?q=select+id,Name,Customer_Mobile__c,Vehicle_No__c,Email__c,(Select id,Name,Vehicle_No__c from Customer_Vehicles__r) from Customer__c where id='${id}'`,
//   });
//   return res.data;
// };

// export const getShippingAddress = async (apiCall: any, id: any) => {
//   const res = await apiCall({
//     customUrl: false,
//     type: 'GET',
//     url: `services/data/v45.0/query/?q=Select+id,Name,Address__c,Address2__c,Approval_Status__c,ARN_No__c,City__c,City__r.Name,Citys__c,Code__c,Consignee__c,Contact__c,Country_Region_Code__c,Country_Region_Code__r.Name,Customer__c,Customer__r.Name,E_Mail__c,Fax_No__c,GST_Registration_No__c,Home_Page__c,Location_Code__c,Location_Code__r.Name,Name__c,Name_2__c,Phone_no__c,Place_of_Export__c,Post_Code__c,Post_Code__r.Name,Service_Zone_Code__c,Ship_to_Code__c,Shipment_Method_Code__c,Shipping_Address__c,Shipping_Agent_Code__c,Shipping_Agent_Service_Code__c,State__c,State__r.Name,Tax_Liable__c,Telax_No__c+from+Shipping_Address__c+where+Customer__c='${id}'`,
//   });
//   return res.data.records;
// };

export const removeCart = async (apiCall: any, item: any, type: any) => {
  console.log('data',item)
  const res = await apiCall({
    customUrl: false,
    type: 'POST',
    url: `order/cart?type=${type}`,
    data: item
  });
// console.log(res);
  return res.data;
};

// export const getAllDiscountedProducts = async (apiCall: any) => {
//   const res = await apiCall({
//     customUrl: false,
//     type: 'GET',
//     url: `/services/apexrest/GetDiscountProductApi/`,
//   });
//   return res.data;
// };

// export const customerExistanceUsingMobile = async (
//   apiCall: any,
//   mobile_number: any,
// ) => {
//   const res = await apiCall({
//     customUrl: false,
//     type: 'GET',
//     url: `/services/data/v45.0/query/?q=select+id,Name,Dealer__r.Name,(select+id,Name,Vehicle_No__c +from+Customer_Vehicles__r)+from+Customer__c+where+Customer_Mobile__c+=+'${mobile_number}'`,
//   });
//   return res;
// };

export const getUserDetail = async (apiCall: any, id: any) => {
  const res = await apiCall({
    customUrl: false,
    type: 'GET',
    url: `/services/apexrest/GetAllUserDetails/?AccountID=${id}`,
  });
  return res.data;
};

// export const getClaimDetail = async (apiCall: any, id: any) => {
//   const res = await apiCall({
//     customUrl: false,
//     type: 'GET',
//     url: `/services/data/v45.0/query/?q=select+Id,Name,Dealer__c,Dealer__r.Name,Discount_Price_with_GST__c,Warranty_Registration__c,Warranty_Registration__r.Name,Item_Master__c,Item_Master__r.Name,Pattern__c,Wear__c,Driginal_Groom_Depth__c,Remain_Groom_Depth__c+From+Claim__c+Where+Id='${id}'`,
//   });
//   return res.data;
// };

export const addToCart = async (apiCall: any, data: any, type: any) => {
  const res = await apiCall({
    customUrl: false,
    type: 'POST',
    url: `order/cart?type=${type}`,
    data: data.records,
  });
  console.log("res", res)
  return res;
};

export const getInvoiceAmount = async (apiCall: any, user_id: any) => {
  console.log(user_id)
  const res = await apiCall({
    customUrl: false,
    type: 'GET',
    url: `/services/apexrest/GetInvoiceTCSAmount/?DealerID=${user_id}`,
  });
  return res.data;
};

export const uploadImage = async (apiCall: any, data: any) => {
  const res = await apiCall({
    customUrl: false,
    type: 'POST',
    url: `/services/data/v44.0/sobjects/ContentVersion`,
    data: data,
  });
  return res.data;
};

export const uploaWarrantyAttachmentsImage = async (
  apiCall: any,
  data: any,
) => {
  const res = await apiCall({
    customUrl: false,
    type: 'POST',
    url: `/services/data/v37.0/sobjects/Attachment`,
    data: data,
  });
  return res.data;
};

export const getImageId = async (apiCall: any, data: any) => {
  const res = await apiCall({
    customUrl: false,
    type: 'POST',
    url: `/services/data/v44.0/sobjects/ContentDocumentLink`,
    data: data,
  });
  return res.data;
};

export const updateCustomerVehicle = async (apiCall: any, data: any) => {
  const res = await apiCall({
    customUrl: false,
    type: 'POST',
    url: `/services/data/v45.0/composite/batch/`,
    data: data,
  });
  return res.data;
};

// export const createWarrantyRegistration = async (apiCall: any, data: any) => {
//   const res = await apiCall({
//     customUrl: false,
//     type: 'POST',
//     url: `/services/data/v45.0/composite/tree/Warranty_Registration__c`,
//     data: data,
//   });
//   return res.data;
// };

// export const createCustomerVehicle = async (apiCall: any, data: any) => {
//   const res = await apiCall({
//     customUrl: false,
//     type: 'POST',
//     url: `/services/data/v45.0/composite/tree/CustomerVehicle__c`,
//     data: data,
//   });
//   return res.data;
// };

// export const getCreditDebit = async (apiCall: any, fromDate: any, toDate: any, userid: any) => {
//   const res = await apiCall({
//     customUrl: false,
//     type: 'GET',
//     url: `/services/data/v45.0/query/?q=select+id,Name,Dealer__c,Dealer__r.Name,Posting_Date__c,Invoice__c,Invoice__r.Name,Return_Order_No__c,Amount__c,Quantity_of_item_to_return__c,Return_Order_Date__c,Item__c+From+Return_Order_Header__c+Where+Dealer__c='${userid}'+AND+Posting_Date__c>=${fromDate}+AND+Posting_Date__c<=${toDate}`,
//   });
//   return res.data;
// };

export const getCartDetails = async (apiCall: any) => {
  const res = await apiCall({
    customUrl: false,
    type: 'GET',
    url: '/order/getCart',
  });
  console.log('response', res)
  return res.data.data;
};

export const getUpdateCartDetails = async (apiCall: any,orderId: any) => {
  const res = await apiCall({
    customUrl: false,
    type: 'GET',
   
    url: `/order/getOrderRelatedLine?order_id=${orderId}`,
  });
  console.log('Data UpdateCartDetails--->>',res)
  return res.data.data;
};

export const updateCart = async (apiCall: any, item: any, type: any) => {
  console.log('data',item)
  const res = await apiCall({
    customUrl: false,
    type: 'POST',
    url: `/order/updateOrderLine?type=${type}`,
    data: item.records?item.records:item
  });
  console.log('Data UpdateCartDetails--->>',res)

  return res.data;
};


export const updateOrderStatus = async (apiCall: any,type:any,orderId: any) => {
  const res = await apiCall({
    customUrl: false,
    type: 'POST',
    url: `order/updateOrderStatus?status__c=${type}&order_id=${orderId}`,
  });
  console.log('Data UpdateCartDetails--->>',res)
  return res.data.data;
};

export const fetchImageDocument = async (apiCall: any, id: any) => {
  const res = await apiCall({
    customUrl: false,
    type: 'GET',
    url: `/services/data/v45.0/query/?q=SELECT+ContentDocumentId +FROM+ContentVersion +where+id = '${id}'`,
  });
  return res.data;
};

export const getSalesOrderList = async (apiCall: any, userId: any,offset : any) => {
  // console.log("APIIII", paging)
  const res = await apiCall({
    customUrl: false,
    type: 'GET',
    url: `order/getOrder?account_id=${userId}&offset=${offset}&limit=10`,
  });
  console.log('datatata', res)
  return res.data.data;
};

export const getSalesOrderListDetails = async (apiCall: any, userId: any) => {
  const res = await apiCall({
    customUrl: false,
    type: 'GET',
    url: `/order/getOrderDetail?id=${userId}`,
  });
  console.log('datatata', res)
  return res.data.data;
};

export const createInfluencerRecord = async (apiCall: any, data: any) => {
  const res = await apiCall({
    customUrl: false,
    type: 'POST',
    url: `/influencer/createInfluencer`,
    data: data,
  });
  console.log('ress',res)
  return res;

  
};

export const getRoleInfluencer = async (apiCall: any) => {
  const res = await apiCall({
    customUrl: false,
    type: 'GET',
    url: `/influencer/rolePicklist`,
  });
  console.log('datatata', res)
  return res.data.data;
};

export const getInfluencerRecords = async (apiCall: any) => {
  const res = await apiCall({
    customUrl: false,
    type: 'GET',
    url: `/influencer/getInfluencer`,
  });
  console.log('datatata', res)
  return res.data.data;
};



export const getAccountStatement = async (apiCall: any) => {
  const res = await apiCall({
    customUrl: false,
    type: 'GET',
    url: `https://atctirepvtltd--partial.sandbox.my.site.com/Dealerportal/services/data/v45.0/query/?q=select+id,Adjusted_Currency_Factor__c,AGM__c,Amount__c,Amount_LCY__c,Applies_to_Doc_No__c,Applies_to_Doc_Type__c,Bank_Transction_Type__c,Channel_Code__c,Check_Clearance_Date__c,Cheque_Date__c,Cheque_No__c,Closed_at_Date__c,Closed_by_Amount__c,Closed_by_Entry_No__c,Credit_Amount__c,Credit_Amount_LCY__c,Currency_Code__c,Name,Customer_No__c,Debit_Amount__c,Debit_Amount_LCY__c,Description__c,Document_Date__c,Document_No__c,Document_Type__c,DSM__c,Due_Date__c,Entry_No__c,External_Document_No__c,GST_Jurisdiction_Type__c,Invoice_Doc_No__c,Journal_Batch_Name__c,Location_Code__c,Location_GST_Reg_No__c,Location_State_Code__c,Open__c,Payment_Method_Code__c,Positive__c,Posting_Date__c,Remaining_Amount__c,Remaining_Amt_LCY__c,Reversed__c,RSM__c,Sales_in_Charge__c,Sell_to_Customer_No__c,Territory__c,Transaction_No__c,Virtual_Account__c,Virtual_Account_ICICI__c,ZM__c	+from+Customer_Ledger__c+where+Customer_No__c+=+'0019D00000PQAWjQAP'+AND+Posting_Date__c>=2020-10-01+AND+Posting_Date__c<=2020-10-01`,
  });
  return res.data;
};

export const editCart = async (apiCall: any, data: any) => {
  const res = await apiCall({
    customUrl: false,
    type: 'POST',
    url: `/services/apexrest/EditCartApi/`,
    data: data,
  });
  return res.data;
};

export const createClaim = async (apiCall: any, data: any) => {
  const res = await apiCall({
    customUrl: false,
    type: 'POST',
    url: `/services/data/v45.0/composite/tree/Claim__c`,
    data: data,
  });
  return res;
};

export const createCustomer = async (apiCall: any, data: any) => {
  const res = await apiCall({
    customUrl: false,
    type: 'POST',
    url: `/services/data/v45.0/composite/tree/Customer__c`,
    data: data,
  });
  return res.data;
};

export const createVehicle = async (apiCall: any, data: any) => {
  const res = await apiCall({
    customUrl: false,
    type: 'POST',
    url: `/services/data/v45.0/composite/tree/CustomerVehicle__c`,
    data: data,
  });
  return res.data;
};

// export const addProductToCart = async (apiCall: any, data: any) => {
//   const res = await apiCall({
//     customUrl: false,
//     type: 'POST',
//     url: `https://cs74.salesforce.com/services/data/v45.0/composite/tree/Add_to_cart__c`,
//     data: data,
//   });
//   return res;
// };

// export const updateOtpForCostumer = async (apiCall: any, data: any) => {
//   const res = await apiCall({
//     customUrl: false,
//     type: 'POST',
//     url: `/services/apexrest/UpdateOtpApi/`,
//     data: data,
//   });
//   return res;
// };

// export const getAgingSummary = async (apiCall: any, dealerId: any) => {
//   const res = await apiCall({
//     customUrl: false,
//     type: 'GET',
//     url: `/services/data/v45.0/query/?q=select+id,X0_30_Days_y__c,X31_45_Days__c,X46_60_days__c,X60_90_Days_y__c,X90_Days_y__c,Total_Outstanding__c,Due_Amount__c,Not_yet_Due__c+from+Account+where+Id+=+'${dealerId}'`,
//   });
//   return res.data.records[0];
// };

export const getTDSTCScertificate = async (
  apiCall: any,
  user_id: any,
  quarter: any,
  assessmentyear: any,
) => {
  const res = await apiCall({
    customUrl: false,
    type: 'GET',
    // url: `/services/data/v45.0/query/?q=select+id,Dealer__r.Name, Assessment_Year__c, From__c, Quarter__c, To__c, Type__c+FROM+ TDS_TCS_Certificate__c +where+Dealer__c+=+'${user_id}'+AND+Quarter__c='${quarter}'+AND+Assessment_Year__c='${assessmentyear}'`,
    url: `/services/data/v45.0/query/?q=select+id,Dealer__r.Name, Assessment_Year__c, From__c, Quarter__c, To__c, Type__c+FROM+ TDS_TCS_Certificate__c +where+Dealer__c+=+'${user_id}'+AND+Quarter__c='Q1 (April to June)'+AND+Assessment_Year__c='2021-22'`,

    // url: `/services/data/v45.0/query/?q=select+id,Dealer__r.Name, Assessment_Year__c, From__c, Quarter__c, To__c, Type__c+FROM+ TDS_TCS_Certificate__c +where+Dealer__c+=+'0019D00000KQhiYQAT'+AND+Quarter__c='Q1 (April to June)'+AND+Assessment_Year__c='2021-22'`,
  });
  // console.log( user_id,quarter,assessmentyear)
  return res;
};

export const getCreditSummary = async (apiCall: any, dealerId: any) => {
  const res = await apiCall({
    customUrl: false,
    type: 'GET',
    url: `/services/data/v45.0/query/?q=select+id,Name,Virtual_Account__c	,Credit_Limit__c,Security_Deposit__c,Total_Credit_Limit_y__c,Total_Outstanding__c,Overdue_Amount__c,Available_Credit_Limit__c+from+Account+where +id+=+'${dealerId}'`,
  });
  return res.data.records[0];
};

// export const getCreditAmount = async (apiCall: any, id: any) => {
//   const res = await apiCall({
//     customUrl: false,
//     type: 'GET',
//     url: `/services/apexrest/GETAvailableCreaditlimitAPI/?CustomerNo=${id}`,
//   });
//   return res.data;
// };

// export const getCustomerLedger = async (
//   apiCall: any,
//   fromdate: any,
//   toDate: any,
//   dealerId: any,
//   type: any,
// ) => {

//   const res = await apiCall({
//     customUrl: false,
//     type: 'GET',
//     url: type ? `/services/data/v45.0/query/?q=select+id,Adjusted_Currency_Factor__c,AGM__c,Amount__c,Amount_LCY__c,CreatedDate,Applies_to_Doc_No__c,Applies_to_Doc_Type__c,Bank_Transction_Type__c,Channel_Code__c,Check_Clearance_Date__c,Cheque_Date__c,Cheque_No__c,Closed_at_Date__c,Closed_by_Amount__c,Closed_by_Entry_No__c,Credit_Amount__c,Credit_Amount_LCY__c,Currency_Code__c,Name,Customer_No__c,Debit_Amount__c,Debit_Amount_LCY__c,Description__c,Document_Date__c,Document_No__c,Document_Type__c,DSM__c,Due_Date__c,Entry_No__c,External_Document_No__c,GST_Jurisdiction_Type__c,Invoice_Doc_No__c,Journal_Batch_Name__c,Location_Code__c,Location_GST_Reg_No__c,Location_State_Code__c,Open__c,Payment_Method_Code__c,Positive__c,Posting_Date__c,Remaining_Amount__c,Remaining_Amt_LCY__c,Reversed__c,RSM__c,Sales_in_Charge__c,Sell_to_Customer_No__c,Territory__c,Transaction_No__c,Virtual_Account__c,Virtual_Account_ICICI__c,ZM__c,Ledger_Type__c +from+Customer_Ledger__c+where+(Customer_No__c='${dealerId}'+AND+Posting_Date__c>=${fromdate}+AND+Posting_Date__c<=${toDate})+AND+Document_Type__c='${type}' order by CreatedDate desc` : `/services/data/v45.0/query/?q=select+id,Adjusted_Currency_Factor__c,AGM__c,Amount__c,Amount_LCY__c,CreatedDate,Applies_to_Doc_No__c,Applies_to_Doc_Type__c,Bank_Transction_Type__c,Channel_Code__c,Check_Clearance_Date__c,Cheque_Date__c,Cheque_No__c,Closed_at_Date__c,Closed_by_Amount__c,Closed_by_Entry_No__c,Credit_Amount__c,Credit_Amount_LCY__c,Currency_Code__c,Name,Customer_No__c,Debit_Amount__c,Debit_Amount_LCY__c,Description__c,Document_Date__c,Document_No__c,Document_Type__c,DSM__c,Due_Date__c,Entry_No__c,External_Document_No__c,GST_Jurisdiction_Type__c,Invoice_Doc_No__c,Journal_Batch_Name__c,Location_Code__c,Location_GST_Reg_No__c,Location_State_Code__c,Open__c,Payment_Method_Code__c,Positive__c,Posting_Date__c,Remaining_Amount__c,Remaining_Amt_LCY__c,Reversed__c,RSM__c,Sales_in_Charge__c,Sell_to_Customer_No__c,Territory__c,Transaction_No__c,Virtual_Account__c,Virtual_Account_ICICI__c,ZM__c	+from+Customer_Ledger__c+where+(Customer_No__c+=+'${dealerId}'+AND+Posting_Date__c>=${fromdate}+AND+Posting_Date__c<=${toDate})+OR+(Customer_No__c+=+'${dealerId}'+AND+Document_Type__c='${type}') order by CreatedDate desc`,
//   });
//   return res.data;
// };

// export const getYcnAgreement = async (apiCall: any, user_id: any) => {
//   const res = await apiCall({
//     customUrl: false,
//     type: 'GET',
//     url: `/services/data/v45.0/query/?q=select+id,Dealer__r.Name, From_Date__c, Name, Renewal_Date__c, To_Date__c+FROM+YCN_Agreement__c+where+Dealer__c+=+'${user_id}'`,
//   });
//   return res.data.records;
// };

// export const getAllClaims = async (apiCall: any, user_id: any) => {
//   const res = await apiCall({
//     customUrl: false,
//     type: 'GET',
//     url: `/services/data/v45.0/query/?q=select+Id,Name,Dealer__c,Dealer__r.Name,Warranty_Registration__c,Change_Article_Tagged__c,Discount_Price_with_GST__c,Invoiced__c,Change_Article_Tagged__r.Name,Docket_No__c,Article_No__r.Name,Docket_status__c,Warranty_Registration__r.Name,Item_Master__c,Item_Master__r.Name,Pattern__c,Wear__c,CreatedDate,Driginal_Groom_Depth__c,Remain_Groom_Depth__c+From+Claim__c+Where+Dealer__c='${user_id}'+Order+BY+CreatedDate+DESC `,
//   });
//   return res.data.records;
// };

// export const getAllWarranty = async (apiCall: any, user_id: any) => {
//   const res = await apiCall({
//     customUrl: false,
//     type: 'GET',
//     url: `/services/data/v45.0/query/?q=select+Id,Name,Dealer__c,Dealer__r.Name,CreatedDate,NO_Of_Tyres__c,Types_of_Registration__c,Customer__c,Customer__r.Name,Customer_Vehicle__c,Customer_Vehicle__r.Name,Pattern__c,Size__c,Article__c,Article__r.Name,Invoice_No__c,Invoice_Date__c,Registration_No__c++From+Warranty_Registration__c+Where+Dealer__c='${user_id}' +Order+BY+CreatedDate+DESC`,
//   });
//   return res.data.records;
// };


// export const getTDSAndTCS = async (apiCall: any, user_id: any) => {
//   const res = await apiCall({
//     customUrl: false,
//     type: 'GET',
//     url: `services/data/v45.0/query/?q=select+id,Dealer__r.Name,Name, Assessment_Year__c, From__c, Quarter__c, To__c, Type__c+FROM+ TDS_TCS_Certificate__c +where+Dealer__c+=+'${user_id}'`,
//   });
//   return res.data.records;
// };

// export const createSecurity = async (apiCall: any, data: any) => {
//   const res = await apiCall({
//     customUrl: true,
//     type: 'POST',
//     url: `https://atctirepvtltd--partial.sandbox.my.site.com/Dealerportal/services/data/v45.0/composite/tree/Security_Deposite__c`,
//     data: data,
//   });
//   return res.data;
// };

// export const createTicket = async (apiCall: any, data: any) => {
//   console.log('data', data)
//   const res = await apiCall({
//     customUrl: false,
//     type: 'POST',
//     url: `services/data/v45.0/composite/tree/Ticket__c`,
//     data: data,
//   });
//   return res.data;
// };

// export const getPromotionalBudget = async (apiCall: any, user_data: any) => {
//   const res = await apiCall({
//     customUrl: false,
//     type: 'GET',
//     url: `/services/data/v45.0/query/?q=select+Budget_Value__c,Remaining_budget__c,Statu__c,TurnOver__c,Dealer__r.name from Promotional_Budget__c where Dealer__r.name='${user_data}'`,
//   });
//   return res.data;
// };

// export const getPromotionalOrder = async (apiCall: any, user_data: any) => {
//   const res = await apiCall({
//     customUrl: false,
//     type: 'GET',
//     url: `/services/data/v45.0/query/?q=select+id,Name,Dealer__c,Dealer__r.Name,Order_Date__c,Order_Status__c,Total_Price__c,(Select+id,Name,Dealer__c,Dealer__r.Name,Quantity__c,Total_Price__c,Unit_Price__c,Order__c,Order__r.Name+from+Promotional_Order_Lines__r)+from+Promotional_Order_Header__c+where+Dealer__r.Name='${user_data}' order by createdDate desc`,
//   });
//   return res.data.records;
// };

// export const getBudgetAndUsage = async (apiCall: any, user_data: any) => {
//   const res = await apiCall({
//     customUrl: false,
//     type: 'GET',
//     url: `services/data/v45.0/query/?q=select+Budget_Value__c,Remaining_budget__c,Statu__c,Id,TurnOver__c,Unused_Amount__c,Dealer__r.name,Used_Amount__c from Promotional_Budget__c+Where+Dealer__c='${user_data}'`,
//   });
//   return res.data.records;
// };


// export const getInvoice = async (apiCall: any, user_Id: any) => {
//   const res = await apiCall({
//     customUrl: false,
//     type: 'GET',
//     url: `/services/apexrest/getInvoice/?DealerId=${user_Id}`,
//   });
//   return res.data;
// };

// export const getPurchaseSummary = async (apiCall: any, user_Id: any, fromDate: any, toDate: any) => {
//   const res = await apiCall({
//     customUrl: false,
//     type: 'GET',
//     url: `/services/data/v45.0/query/?q=select+Id,Name,Amount_to_Customer__c,Amount__c,Invoice_Quantity__c,Posting_Date__c,Total_Invoice_Quantity__c,Invoice_Date__c,Dealer__c,Dealer__r.Name+FROM+Invoice__c+where+Customer__c='${user_Id}'+AND+(Posting_Date__c>=${fromDate}+AND+Posting_Date__c<=${toDate}) order by createdDate desc`,
//   });
//   return res.data;
// };



export const getFilterDropdown = async (apiCall: any,account_id:any,state_id:any) => {
  const res = await apiCall({
    customUrl: false,
    type: 'GET',
    url: `/order/getCategory?account_id=${account_id}&state_id=${state_id}`,
  });
  return res.data;
};

// export const getTickets = async (apiCall: any, user_Id: any) => {
//   const res = await apiCall({
//     customUrl: false,
//     type: 'GET',
//     url: `/services/data/v45.0/query/?q=select+id,Name,Complainant_Name__c,CreatedDate,Complainant_Email__c,Complainant_Phone_No__c,Complaint_Status__c,Complaint_Description__c,Field_Team_Remarks__c,Complaint_Type__c,Complaint_category__c,Complaint_sub_category__c+from+Ticket__c+Where+Dealer__c='${user_Id}' order by CreatedDate desc`,
//   });
//   return res.data.records;
// };

// export const getInvoiceLine = async (apiCall: any, invoiceId: any) => {
//   const res = await apiCall({
//     customUrl: false,
//     type: 'GET',
//     url: `/services/apexrest/getInvoiceLine/?Invoice=${invoiceId}`,
//   });
//   return res.data;
// };

export const getAllOffers = async (apiCall: any, accntId: any,productId : any) => {
  console.log("resAllOffers",accntId,productId);
  const res = await apiCall({
    customUrl: false,
    type: 'GET',
    url : `/order/productAccountSchemes?account=${accntId}&product=${productId}`,
    // url : `/order/productAccountSchemes?account=0019D00000LjKxcQAF&product=a0O9D000009aDdQUAU`,

  });
  console.log("resAllOffersResponse-->>>", res);
  return res.data.Scheme;
};

export const getAllProfile = async (apiCall: any) => {
  
  const res = await apiCall({
    customUrl: false,
    type: 'GET',
    // url : `/order/productAccountSchemes?account=${accntId}&product=${productId}`,
    url : `/profile/getProfile`,
  });
  console.log("resAllOffersResponse-->>>", res);
  return res.data.data[0];
};


export const placeOrder = async (apiCall: any, data: any) => {
  const res = await apiCall({
    customUrl: false,
    type: 'POST',
    url: `/order/placeOrder`,
    data: data,
  });
  console.log('PLACE ORDER RESPONSE==>>', res)
  return res.data;
};


