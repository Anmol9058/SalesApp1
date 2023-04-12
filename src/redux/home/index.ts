import {createSlice} from '@reduxjs/toolkit';
import SimpleToast from 'react-native-simple-toast';

import {
  createSecurity,
  createTicket,
  getAgingSummary,
  getAllClaims,
  getAllWarranty,
  getBalanceConfirmation,
  getCircularData,
  getCreditAmount,
  getCreditDebit,
  getCreditProposal,
  getCreditSummary,
  getDashboardGraph,
  getDashboardValue,
  getPaymentBehviour,
  getPurchaseSummary,
  getSalesOrderList,
  getSecurityDeposit,
  getSpec,
  getSurveys,
  getTDSAndTCS,
  getTicket,
} from '../../api/home';
import {goBack, navigate} from '../../services/Routerservices';

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    creditLimit: 0,
    claims: [],
    paymentBehaviourData: null,
    dashboardGraphData: null,
    dashobardValue: null,
    salesOrder: null,
    creditDebitData: null,
    purchaseSummaryData: null,
    warranties: null,
    ticketsData: null,
    securityDepositData: null,
    tdsData: null,
    surveryData: null,
    circularData: null,
    creditProposal: null,
    creditSummary: null,
    ageSummaryData: null,
    balanceConfirmationData: null,
    specData: null,
  },
  reducers: {
    setSpecData(state, action) {
      state.specData = action.payload;
    },
    setBalanceConfirmationData(state, action) {
      state.balanceConfirmationData = action.payload;
    },
    setAgeSummaryData(state, action) {
      state.ageSummaryData = action.payload;
    },
    setCreditSummary(state, action) {
      state.creditSummary = action.payload;
    },
    setSurveryData(state, action) {
      state.surveryData = action.payload;
    },
    setCreditProposal(state, action) {
      state.creditProposal = action.payload;
    },
    setCircularData(state, action) {
      state.circularData = action.payload;
    },
    setCreditLimit(state, action) {
      state.creditLimit = action.payload;
    },
    setTDSData(state, action) {
      state.tdsData = action.payload;
    },
    setClaims(state, action) {
      state.claims = action.payload;
    },
    setTicketsData(state, action) {
      state.ticketsData = action.payload;
    },
    setPaymentBehaviourData(state, action) {
      state.paymentBehaviourData = action.payload;
    },
    setDashboardGraphData(state, action) {
      state.dashboardGraphData = action.payload;
    },
    setDashobardValue(state, action) {
      state.dashobardValue = action.payload;
    },
    setSalesOrder(state, action) {
      state.salesOrder = action.payload;
    },
    setCreditDebitData(state, action) {
      state.creditDebitData = action.payload;
    },
    setPurchaseSummaryData(state, action) {
      state.purchaseSummaryData = action.payload;
    },
    setWarranties(state, action) {
      state.warranties = action.payload;
    },
    setSecurityDepositData(state, action) {
      state.securityDepositData = action.payload;
    },
    resetHome(state) {
      (state.creditLimit = 0),
        (state.claims = []),
        (state.paymentBehaviourData = null),
        (state.dashboardGraphData = null),
        (state.dashobardValue = null),
        (state.salesOrder = null),
        (state.creditDebitData = null),
        (state.purchaseSummaryData = null),
        (state.warranties = null),
        (state.ticketsData = null),
        (state.securityDepositData = null),
        (state.tdsData = null),
        (state.surveryData = null),
        (state.circularData = null),
        (state.creditProposal = null),
        (state.creditSummary = null),
        (state.ageSummaryData = null),
        (state.balanceConfirmationData = null);
    },
  },
});

export const agingSummaryManager = (apiCall: any) => {
  return async (dispatch: any, getState: any) => {
    const userData = getState().auth.userData;
    try {
      const res = await getAgingSummary(apiCall, userData?.Id);
      if (res) {
        dispatch(setAgeSummaryData(res));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getBalanceConfirmationManager = (apiCall: any, isBack: any) => {
  return async (dispatch: any, getState: any) => {
    const userData = getState().auth.userData;
    try {
      const res = await getBalanceConfirmation(apiCall, userData?.Id);
      if (res) {
        dispatch(setBalanceConfirmationData(res));
        if (isBack) {
          goBack();
          SimpleToast.show('Updated Successfully');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const creditSummaryManager = (apiCall: any) => {
  return async (dispatch: any, getState: any) => {
    const userData = getState().auth.userData;
    try {
      const res = await getCreditSummary(apiCall, userData?.Id);
      if (res) {
        dispatch(setCreditSummary(res));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const securityDepositManager = (apiCall: any, isBack: any) => {
  return async (dispatch: any, getState: any) => {
    const userData = getState().auth.userData;
    try {
      const res = await getSecurityDeposit(apiCall, userData?.Id);
      if (res) {
        dispatch(setSecurityDepositData(res));
        if (isBack) {
          SimpleToast.show('Record Created Successfully');
          navigate('SecurityDeposit');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getCreditProposalManager = (apiCall: any) => {
  return async (dispatch: any, getState: any) => {
    const userData = getState().auth.userData;
    try {
      const res = await getCreditProposal(apiCall, userData?.Name);
      console.log(res);
      if (res) {
        dispatch(setCreditProposal(res));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const tdsManager = (apiCall: any) => {
  return async (dispatch: any, getState: any) => {
    const userData = getState().auth.userData;
    try {
      const res = await getTDSAndTCS(apiCall, userData?.Id);
      if (res) {
        dispatch(setTDSData(res));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const createSecurityManager = (apiCall: any, data: any) => {
  return async (dispatch: any) => {
    try {
      const res = await createSecurity(apiCall, data);
      if (!res.hasErrors) {
        dispatch(securityDepositManager(apiCall, true));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const creditLimitManager = (apiCall: any) => {
  return async (dispatch: any, getState: any) => {
    const userData = getState().auth.userData;
    try {
      const res = await getCreditAmount(apiCall, userData.Customer_No__c);
      if (res) {
        dispatch(setCreditLimit(res[0]?.AvailableBalance));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getClaimsManager = (apiCall: any) => {
  return async (dispatch: any, getState: any) => {
    const userData = getState().auth.userData;
    try {
      const res = await getAllClaims(apiCall, userData.Id);
      if (res) {
        dispatch(setClaims(res));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getWarrantyManager = (apiCall: any) => {
  return async (dispatch: any, getState: any) => {
    const userData = getState().auth.userData;
    try {
      const res = await getAllWarranty(apiCall, userData.Id);
      if (res) {
        dispatch(setWarranties(res));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getPaymentBehaviourManager = (apiCall: any) => {
  return async (dispatch: any) => {
    try {
      const res = await getPaymentBehviour(apiCall);
      if (res.done) {
        dispatch(setPaymentBehaviourData(res?.records));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getDashboardGraphManager = (apiCall: any, type: any) => {
  return async (dispatch: any, getState: any) => {
    dispatch(setDashboardGraphData(null));
    const userData = getState().auth.userData;
    try {
      const res = await getDashboardGraph(apiCall, userData.Id, type);
      if (res) {
        dispatch(setDashboardGraphData(res));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getDashboardValueManager = (apiCall: any, type: any) => {
  return async (dispatch: any, getState: any) => {
    dispatch(setDashobardValue(null));
    const userData = getState().auth.userData;
    try {
      const res = await getDashboardValue(apiCall, userData.Id, type);
      if (res.done) {
        dispatch(setDashobardValue(res));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getSalesOrderListManager = (apiCall: any) => {
  return async (dispatch: any, getState: any) => {
    const userData = getState().auth.userData;
    try {
      const res = await getSalesOrderList(apiCall, userData.Id);
      if (res.done) {
        dispatch(setSalesOrder(res.records));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getTicketListManager = (apiCall: any, isBack: any) => {
  return async (dispatch: any, getState: any) => {
    const userData = getState().auth.userData;
    try {
      const res = await getTicket(apiCall, userData.Id);
      if (res.done) {
        dispatch(setTicketsData(res.records));
        if (isBack) {
          SimpleToast.show('Ticket has been created successfully');
          goBack();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const createTicketManager = (apiCall: any, data: any) => {
  return async (dispatch: any) => {
    try {
      const res = await createTicket(apiCall, data);
      if (!res.hasErrors) {
        dispatch(getTicketListManager(apiCall, true));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getSpecManager = (apiCall: any) => {
  return async (dispatch: any) => {
    try {
      const res = await getSpec(apiCall);
      if (res) {
        dispatch(setSpecData(res.records));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const surveryManager = (apiCall: any) => {
  return async (dispatch: any, getState: any) => {
    const userData = getState().auth.userData;
    try {
      const res = await getSurveys(apiCall, userData.Id);
      if (res[0].YIN_List) {
        dispatch(setSurveryData(res[0].YIN_List));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const circularManager = (apiCall: any) => {
  return async (dispatch: any, getState: any) => {
    const userData = getState().auth.userData;
    try {
      const res = await getCircularData(apiCall, userData.Id);
      console.log(res);
      if (res.done) {
        dispatch(setCircularData(res.records));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getCreditDebitManager = (
  apiCall: any,
  fromDate: any,
  toDate: any,
) => {
  return async (dispatch: any, getState: any) => {
    dispatch(setCreditDebitData(null));
    const userData = getState().auth.userData;
    try {
      const res = await getCreditDebit(apiCall, fromDate, toDate, userData.Id);
      if (res.done) {
        dispatch(setCreditDebitData(res.records));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getPurchaseSummaryManager = (
  apiCall: any,
  fromDate: any,
  toDate: any,
) => {
  return async (dispatch: any, getState: any) => {
    dispatch(setPurchaseSummaryData(null));
    const userData = getState().auth.userData;
    try {
      const res = await getPurchaseSummary(
        apiCall,
        userData.Id,
        fromDate,
        toDate,
      );
      if (res.done) {
        dispatch(setPurchaseSummaryData(res.records));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const {
  setSpecData,
  resetHome,
  setBalanceConfirmationData,
  setAgeSummaryData,
  setCreditSummary,
  setCreditProposal,
  setCircularData,
  setSurveryData,
  setTDSData,
  setCreditLimit,
  setClaims,
  setPaymentBehaviourData,
  setDashboardGraphData,
  setDashobardValue,
  setSalesOrder,
  setCreditDebitData,
  setPurchaseSummaryData,
  setWarranties,
  setTicketsData,
  setSecurityDepositData,
} = homeSlice.actions;

export default homeSlice.reducer;
