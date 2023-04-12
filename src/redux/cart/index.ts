import {createSlice} from '@reduxjs/toolkit';
import moment from 'moment';
import {Alert} from 'react-native';
import SimpleToast from 'react-native-simple-toast';

import {
  addToCart,
  checkPlaceOrderStatus,
  editCart,
  getAllDiscountedProducts,
  getAllProducts,
  getAspectRatio,
  getCartDetails,
  getInventory,
  getInventoryDiscounts,
  getInvoiceAmount,
  getMaxLimit,
  getRimSize,
  getShippingAddress,
  placeOrder,
  removeCart,
  sectionWidth,
  treadPattern,
  updateCart,
} from '../../api/home';
import {navigate, popToTop} from '../../services/Routerservices';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartData: null,
    products: null,
    discountedProducts: null,
    productSearch: '',
    orderFilters: null,
    skuData: null,
    priceData: null,
    finalCartData: null,
    sectionData: null,
    aspectData: null,
    rimData: null,
    threadData: null,
    shippingAddress: null,
    totalPrice: 0,
    totalQuantiy: 0,
  },
  reducers: {
    setTotalPrice(state, action) {
      state.totalPrice = action.payload;
    },
    setTotalQuantiy(state, action) {
      state.totalQuantiy = action.payload;
    },
    setShippingAddress(state, action) {
      state.shippingAddress = action.payload;
    },
    setThreadData(state, action) {
      state.threadData = action.payload;
    },
    setRimDropdown(state, action) {
      state.rimData = action.payload;
    },
    setAspectData(state, action) {
      state.aspectData = action.payload;
    },
    setSectionData(state, action) {
      state.sectionData = action.payload;
    },
    setFinalCartData(state, action) {
      state.finalCartData = action.payload;
    },
    setSkuData(state, action) {
      state.skuData = action.payload;
    },
    setPriceData(state, action) {
      state.priceData = action.payload;
    },
    setCartData(state, action) {
      state.cartData = action.payload;
    },
    setProducts(state, action) {
      state.products = action.payload;
    },
    setDiscountedProducts(state, action) {
      state.discountedProducts = action.payload;
    },
    resetCartData(state) {
      state.cartData = null;
    },
    setProductSearch(state, action) {
      state.productSearch = action.payload;
    },
    setOrderFilters(state, action) {
      state.orderFilters = action.payload;
    },
    setResetFilter(state) {
      state.orderFilters = null;
    },
    resetCart(state) {
      (state.cartData = null),
        (state.products = null),
        (state.discountedProducts = null),
        (state.productSearch = ''),
        (state.orderFilters = null),
        (state.skuData = null),
        (state.priceData = null),
        (state.finalCartData = null),
        (state.sectionData = null),
        (state.aspectData = null),
        (state.rimData = null),
        (state.threadData = null),
        (state.shippingAddress = null),
        (state.totalPrice = 0),
        (state.totalQuantiy = 0);
    },
  },
});

export const cartDetailManager = (apiCall: any) => {
  return async (dispatch: any, getState: any) => {
    const userData = getState().auth.userData;
    try {
      const res = await getCartDetails(apiCall, userData?.Id);
      if (res.done) {
        dispatch(setCartData(res));
        console.log(res)
      } else {
        dispatch(setCartData(null));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const productsManager = (apiCall: any) => {
  return async (dispatch: any, getState: any) => {
    try {
      const res = await getAllProducts(apiCall);
      if (res) {
        dispatch(setProducts(res));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const shippingAddressManager = (apiCall: any) => {
  return async (dispatch: any, getState: any) => {
    try {
      const userData = getState().auth.userData;
      const res = await getShippingAddress(apiCall, userData.Id);
      if (res) {
        dispatch(setShippingAddress(res));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const discountProductsManager = (apiCall: any) => {
  return async (dispatch: any) => {
    try {
      const res = await getAllDiscountedProducts(apiCall);
      if (res) {
        dispatch(setDiscountedProducts(res));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const removeCartItemManager = (apiCall: any, id: any) => {
  return async (dispatch: any, getState: any) => {
    const finalCartData = getState().cart.finalCartData;
    let cartItems = [...finalCartData];
    const finalItemIndex = cartItems.findIndex((data: any) => data.id === id);
    cartItems.splice(finalItemIndex, 1);
    try {
      const res = await removeCart(apiCall, id);
      SimpleToast.show('Product removed from cart sucessfully!');
      dispatch(setFinalCartData(cartItems));
      dispatch(cartTotalManager(cartItems));
      dispatch(cartDetailManager(apiCall));
    } catch (error) {
      console.log(error);
    }
  };
};

export const cartTotalManager = (data: any) => {
  return async (dispatch: any, getState: any) => {
    const priceData = getState().cart.priceData;

    try {
      let price = 0;
      let quantity = 0;
      data.forEach((element: any) => {
        quantity = parseInt(element.quantity) + quantity;
        if (parseFloat(priceData) > 5000000) {
          price =
            price +
            parseInt(element.quantity) *
              ((parseFloat(element.finalPrice) * 0.1) / 100 +
                parseFloat(element.finalPrice));
        } else {
          price =
            price + parseInt(element.quantity) * parseFloat(element.finalPrice);
        }
      });
      dispatch(setTotalPrice(price));
      dispatch(setTotalQuantiy(quantity));
    } catch (error) {
      console.log(error);
    }
  };
};

export const placeOrderManager = (apiCall: any, shippingAddress: any) => {
  return async (dispatch: any, getState: any) => {
    const totalPrice = getState().cart.totalPrice;
    const totalQuantiy = getState().cart.totalQuantiy;
    const finalCartData = getState().cart.finalCartData;
    const creditLimit = getState().home.creditLimit;
    const userData = getState().auth.userData;

    // isDiscounted

    if (parseInt(totalQuantiy) === 0) {
      return SimpleToast.show('Order can not be placed with 0 quantity');
    }
    if (!shippingAddress) {
      return SimpleToast.show('Please select a shipping address');
    }
    if (parseInt(totalPrice) > parseInt(creditLimit)) {
      return SimpleToast.show(
        'Total price is more than available credit limit',
      );
    }
    const discountedProducts = finalCartData.filter(
      (data: any) =>
        parseInt(data.preQuantity) - parseInt(data.quantity) &&
        data.isDiscounted,
    );

    const products = finalCartData.filter(
      (data: any) =>
        parseInt(data.preQuantity) - parseInt(data.quantity) &&
        !data.isDiscounted,
    );

    const records = products.map((item: any, index: any) => {
      return {
        attributes: {
          type: 'Add_to_cart__c',
          referenceId: `ref${index}`,
        },
        Name: item.name,
        Product_ID__c: item.Item_Master__c,
        Discounted_Price__c: '0',
        Dealer__c: userData.Id,
        Item_Master__c: item.Item_Master__c,
        Price__c: item.price,
        Quantity__c: parseInt(item.preQuantity) - parseInt(item.quantity),
        Type__c: 'Inventory',
        GST__c: parseInt(item.gst),
        Tyre_Size__c: item.Tyre_Size__c,
        Tread_Pattern__c: item.Tread_Pattern__c,
      };
    });

    const discountRecords = discountedProducts.map((item: any, index: any) => {
      return {
        attributes: {
          type: 'Add_to_cart__c',
          referenceId: `ref${index}`,
        },
        Dealer__c: userData.Id,
        Item_Master__c: item.Item_Master__c,
        Name: item.name,
        Product_ID__c: item.Product_ID__c,
        Discounted_Price__c: item.price,
        Variant__c: item.Variant__c,
        Price__c: item.price,
        Quantity__c: (
          parseInt(item.preQuantity) - parseInt(item.quantity)
        ).toString(),
        GST__c: parseInt(item.gst),
        Type__c: 'Inventory',
        Tyre_Size__c: item.Tyre_Size__c,
        Tread_Pattern__c: item.Tread_Pattern__c,
      };
    });
    try {
      const res = await checkPlaceOrderStatus(apiCall, userData.Id);
      if (res[0]?.ErrorCode?.toString() !== '200') {
        return SimpleToast.show(res[0]?.Message);
      } else {
        let lineData = finalCartData.filter((item: any) => parseInt(item.quantity)).map((data: any) => {
          return {
            No: data?.name,
            Quantity: data?.quantity,
            UnitPrice: data.price,
            CustomerPriceGroup: '4S-CHANNEL',
            DiscountRemark: 'Test',
            DiscountType: 'Aged Tire Discount',
            DocketNo: 'Test',
            LineDiscountAmount: '10.23',
            LineDiscountPer: '10.26',
            TDSTCSPer: '23.0',
            TDSTCSAmount: '23.0',
            TDSTCSBaseAmount: '23.0',
            VariantCode: '',
            gst: data?.gst,
            Types: data.isDiscounted ? 'Discount' : 'Normal',
            finalamount: data.tscPrice
          };
        });
        let data = {
          CustomerNo: userData.Customer_No__c,
          OrderDate: moment().format('YYYY-MM-DD'),
          // Remarks: 'Test',
          // RequestDeliveryDate: '2022-06-12',
          // SalesOrderNo: 'Test',
          ShipToCode: shippingAddress.Name,
          State: shippingAddress.State__r.Name,
          Status: 'Open',
          line: lineData,
          Price: totalPrice,
        };
        const response = await placeOrder(apiCall, data);
        if (response.Status === 'Success') {
          const res = await addToCart(apiCall, {records: records});
          if (!res.data.hasErrors) {
            if (discountRecords.length === 0) {
              dispatch(cartDetailManager(apiCall));
              SimpleToast.show(response.response_message);
              popToTop();
              navigate('SalesOrderList');
            } else {
              const res = await addToCart(apiCall, {records: discountRecords});
              if (!res.data.hasErrors) {
                dispatch(cartDetailManager(apiCall));
                SimpleToast.show(response.response_message);
                popToTop();
                navigate('SalesOrderList');
              }
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
      SimpleToast.show('Something went wrong, please try again later!');
    }
  };
};

export const getMaxLimitManager = (data: any) => {
  return async (dispatch: any) => {
    try {
      let price = 0;
      let quantity = 0;
      data.forEach((element: any) => {
        quantity = parseInt(element.quantity) + quantity;
        price = price + parseInt(element.quantity) * parseFloat(element.price);
      });
      dispatch(setTotalPrice(price));
      dispatch(setTotalQuantiy(quantity));
    } catch (error) {
      console.log(error);
    }
  };
};

export const cartEssentialsManager = (apiCall: any) => {
  return async (dispatch: any, getState: any) => {
    try {
      dispatch(setFinalCartData(null));
      dispatch(setTotalPrice(0));
      dispatch(setTotalQuantiy(0));
      dispatch(setSkuData(null));
      dispatch(setPriceData(null));

      const userData = getState().auth.userData;
      const skuManager = getMaxLimit(apiCall);
      const invoiceManager = getInvoiceAmount(apiCall, userData.Id);
      const skuData = await skuManager;
      const invoiceData = await invoiceManager;
      if (skuData.done) {
        dispatch(setSkuData(skuData.records));
      }
      if (invoiceData.ErrorCode === '200') {
        dispatch(setPriceData(invoiceData.InvoiceTDSAmount));
      }
      dispatch(loadCartManager(apiCall));
    } catch (error) {
      console.log(error);
    }
  };
};

export const orderFilterEssentialsManager = (apiCall: any) => {
  return async (dispatch: any, getState: any) => {
    try {
      const rimSize = getRimSize(apiCall);
      const aspectRatio = getAspectRatio(apiCall);
      const pattern = await treadPattern(apiCall);
      const width = await sectionWidth(apiCall);

      const rimRes = await rimSize;
      const aspectRes = await aspectRatio;
      const patternRes = await pattern;
      const widthRes = await width;

      const finalRimSizeData = rimRes.map((item: any) => {
        return {Title: item.Nom_Rim_Diameter__c};
      });

      const finalAspectData = aspectRes.map((item: any) => {
        return {Title: item.Aspect_Ratio_Y__c};
      });

      const finalPatternData = patternRes.map((item: any) => {
        return {Title: item.Tread_Pattern__c};
      });

      const finalSectionData = widthRes.map((item: any) => {
        return {Title: item.Section_Width_Y__c};
      });

      dispatch(setThreadData(finalPatternData));
      dispatch(setRimDropdown(finalRimSizeData));
      dispatch(setAspectData(finalAspectData));
      dispatch(setSectionData(finalSectionData));
    } catch (error) {
      console.log(error);
    }
  };
};

export const loadCartManager = (apiCall: any) => {
  return async (dispatch: any, getState: any) => {
    let pesudoCartData;
    try {
      const cartData = getState().cart.cartData;
      const userData = getState().auth.userData;
      const skuData = getState().cart.skuData;
      const priceData = getState().cart.priceData;

      const pesudoCartData = cartData?.records?.map((item: any, index: any) => {
        return {
          price: item?.Price__c,
          quantity: '0',
          id: item.Id,
          gst: item.GST__c,
          name: item?.Name,
          preQuantity: item?.Quantity__c,
          isDiscounted: item.Variant__r ? true : false,
          Item_Master__c: item.Item_Master__c,
          Product_ID__c: item.Product_ID__c,
          Tyre_Size__c: item.Tyre_Size__c,
          Tread_Pattern__c: item.Tread_Pattern__c,
          Variant__c: item.Variant__c,
          Variant__r: item.Variant__r ? item.Variant__r : null,
          inventoryStock: '0',
          finalPrice: '0',
          item_Master__r: item.Item_Master__r.Nom_Rim_Diameter__c,
          tscPrice: '',
        };
      });

      for (let i = 0; i < pesudoCartData.length; i++) {
        let gstCalculate =
          parseFloat(pesudoCartData[i].price) +
          (parseFloat(pesudoCartData[i].price) *
            parseFloat(pesudoCartData[i].gst)) /
            100;

        const res = pesudoCartData[i].isDiscounted
          ? await getInventoryDiscounts(
              apiCall,
              pesudoCartData[i].name,
              userData.Location_Code__r.Name,
              pesudoCartData[i].Variant__r.Name,
            )
          : await getInventory(
              apiCall,
              userData.Location_Code__r.Name,
              pesudoCartData[i].name,
            );
        let finalQuantity;
        if (
          parseInt(pesudoCartData[i].item_Master__r) >= 12 &&
          parseInt(pesudoCartData[i].item_Master__r) <= 15
        ) {
          if (parseInt(skuData[0].btw1215__c) > parseInt(res[0].Inventory)) {
            if (
              parseInt(pesudoCartData[i].preQuantity) >
              parseInt(res[0].Inventory)
            ) {
              finalQuantity = parseInt(res[0].Inventory);
            } else {
              finalQuantity = parseInt(pesudoCartData[i].preQuantity);
            }
          } else if (
            parseInt(skuData[0].btw1215__c) < parseInt(res[0].Inventory)
          ) {
            if (
              parseInt(pesudoCartData[i].preQuantity) >
              parseInt(skuData[0].btw1215__c)
            ) {
              finalQuantity = parseInt(skuData[0].btw1215__c);
            } else {
              finalQuantity = parseInt(pesudoCartData[i].preQuantity);
            }
          } else {
            if (
              parseInt(pesudoCartData[i].preQuantity) >
              parseInt(res[0].Inventory)
            ) {
              finalQuantity = parseInt(skuData[0].btw1215__c);
            } else {
              finalQuantity = parseInt(pesudoCartData[i].preQuantity);
            }
          }
        } else if (parseInt(pesudoCartData[i].item_Master__r) >= 16) {
          if (parseInt(skuData[0].Above16__c) > parseInt(res[0].Inventory)) {
            if (
              parseInt(pesudoCartData[i].preQuantity) >
              parseInt(res[0].Inventory)
            ) {
              finalQuantity = parseInt(res[0].Inventory);
            } else {
              finalQuantity = parseInt(pesudoCartData[i].preQuantity);
            }
          } else if (
            parseInt(skuData[0].Above16__c) < parseInt(res[0].Inventory)
          ) {
            if (
              parseInt(pesudoCartData[i].preQuantity) >
              parseInt(res[0].Inventory)
            ) {
              finalQuantity = parseInt(skuData[0].Above16__c);
            } else {
              finalQuantity = parseInt(pesudoCartData[i].preQuantity);
            }
          } else {
            if (
              parseInt(pesudoCartData[i].preQuantity) >
              parseInt(res[0].Inventory)
            ) {
              finalQuantity = parseInt(skuData[0].Above16__c);
            } else {
              finalQuantity = parseInt(pesudoCartData[i].preQuantity);
            }
          }
        }
        let tscPrice;

        if (parseFloat(priceData) > 5000000) {
          tscPrice =
            parseInt(finalQuantity) *
            ((gstCalculate * 0.1) / 100 + gstCalculate);
        } else {
          tscPrice = parseInt(finalQuantity) * gstCalculate;
        }

        pesudoCartData[i] = {
          ...pesudoCartData[i],
          quantity: finalQuantity?.toString(),
          inventoryStock: res[0].Inventory,
          finalPrice: gstCalculate,
          tscPrice: tscPrice
        };
        // if (parseInt(pesudoCartData[i].preQuantity) > parseInt(res[0].Inventory)) {
        //   let finalProductPrice;
        //   if (!userData?.X1H__c && parseFloat(priceData) > 5000000) {
        //     finalProductPrice =    parseInt(res[0].Inventory) *
        //     ((gstCalculate * 0.1) / 100 + gstCalculate)
        //   } else {
        //     finalProductPrice = parseInt(res[0].Inventory) *
        //     (parseFloat(pesudoCartData[i].price) +
        //       (parseFloat(pesudoCartData[i].price) *
        //         parseFloat(pesudoCartData[i].gst)) /
        //         100) ?? 0
        //   }
        //   pesudoCartData[i] =   {...pesudoCartData[i], quantity: res[0].Inventory.toString(), inventoryStock: res[0].Inventory, finalPrice: finalProductPrice.toString() }
        // } else {

        //   let finalProductPrice;
        //   if (!userData?.X1H__c && parseFloat(priceData) > 5000000) {
        //     finalProductPrice =    parseInt(pesudoCartData[i].preQuantity) *
        //     ((gstCalculate * 0.1) / 100 + gstCalculate)
        //   } else {
        //     finalProductPrice = parseInt(pesudoCartData[i].preQuantity) *
        //     (parseFloat(pesudoCartData[i].price) +
        //       (parseFloat(pesudoCartData[i].price) *
        //         parseFloat(pesudoCartData[i].gst)) /
        //         100) ?? 0
        //   }
        //   pesudoCartData[i] =   {...pesudoCartData[i], quantity: pesudoCartData[i].preQuantity.toString(),inventoryStock: res[0].Inventory, finalPrice: finalProductPrice.toString() }
        // }
      }

      dispatch(setFinalCartData(pesudoCartData));
      dispatch(cartTotalManager(pesudoCartData));
      dispatch(updateCartManager(apiCall, pesudoCartData));
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateCartManager = (apiCall: any, data: any) => {
  return async (dispatch: any) => {
    try {
      for (let i = 0; i < data.length; i++) {
        let mainData = {
          batchRequests: [
            {
              method: 'PATCH',
              url: `v45.0/sobjects/Add_to_cart__c/${data[i].id}`,
              richInput: {
                Final_quantity__c: parseInt(data[i].quantity),
                GSTPrice__c: parseFloat(data[i].finalPrice),
              },
            },
            {
              method: 'GET',
              url: `v34.0/sobjects/Add_to_cart__c/${data[i].id}?fields=id`,
            },
          ],
        };
        console.log(mainData);
        try {
          const res = await updateCart(apiCall, mainData);
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const manageCartManager = (apiCall: any, quantity: any, item: any) => {
  return async (dispatch: any, getState: any) => {
    const priceData = getState().cart.priceData;
    const finalCartData = getState().cart.finalCartData;
    const userData = getState().auth.userData;
    let cartItems = [...finalCartData];
    const finalItem = cartItems.findIndex((data: any) => data.id === item.id);
    if (parseInt(quantity)) {
      if (parseInt(cartItems[finalItem].inventoryStock) < parseInt(quantity)) {
        if (parseInt(cartItems[finalItem].inventoryStock) === 0) {
          return SimpleToast.show(`Item is Out of Stock`);
        }
        SimpleToast.show(
          `Max Quantity Avaialble ${cartItems[finalItem].inventoryStock}`,
        );
      } else {
        let finalProductPrice;
        let gstCalculate =
          parseFloat(cartItems[finalItem].price) +
          (parseFloat(cartItems[finalItem].price) *
            parseFloat(cartItems[finalItem].gst)) /
            100;

        if (!userData?.X1H__c && parseFloat(priceData) > 5000000) {
          finalProductPrice =
            parseInt(quantity) * ((gstCalculate * 0.1) / 100 + gstCalculate);
        } else {
          finalProductPrice =
            parseInt(quantity) *
              (parseFloat(cartItems[finalItem].price) +
                (parseFloat(cartItems[finalItem].price) *
                  parseFloat(cartItems[finalItem].gst)) /
                  100) ?? 0;
        }
        cartItems[finalItem] = {
          ...cartItems[finalItem],
          quantity: quantity.toString(),
          finalPrice: finalProductPrice.toString(),
        };
        dispatch(setFinalCartData(cartItems));
        dispatch(cartTotalManager(cartItems));
      }
    } else {
      SimpleToast.show('Quantity can not be empty');
    }

    // try {
    //     const res = await getAllDiscountedProducts(apiCall);
    //   if (res) {
    //       dispatch(setDiscountedProducts(res))
    //   }
    // } catch (error) {
    //   console.log(error)
    // }
  };
};

export const productCartManager = (apiCall: any, productData: any) => {
  return async (dispatch: any, getState: any) => {
    const cartData = getState().cart.cartData;
    const userData = getState().auth.userData;


    let findindex = cartData.records.findIndex(
      (item: any) => item.Item_Master__c === productData.data.Item_Code__r.Id && item.Product_type__c === "All"  ,
    );
    if (findindex === -1) {
      let records = [
        {
          attributes: {
            type: 'Add_to_cart__c',
            referenceId: `ref${productData.index}`,
          },
          Name: productData.data.Item_Code__r.Name,
          Product_ID__c: productData.data.Item_Code__r.Id,
          Discounted_Price__c: '0',
          Dealer__c: userData.Id,
          Item_Master__c: productData.data.Item_Code__r.Id,
          Price__c: productData.data.Unit_Price__c,
          Quantity__c: productData.quantity,
          Type__c: 'Inventory',
          GST__c: parseInt(
            productData.data.Item_Code__r.GST_Group_Code_Y__c.trim()
              .split('')
              .map((num: any) => Number(num))
              .filter((x: any) => Number.isInteger(x))
              .join(''),
          ),
          Product_type__c: 'All',
          Tyre_Size__c: productData.data.Item_Code__r.Tire_Size__c,
          Tread_Pattern__c: productData.data.Item_Code__r.Tread_Pattern__c,
        },
      ];
      try {
        const res = await addToCart(apiCall, {records});
        if (!res.data.hasErrors) {
          SimpleToast.show('Product added to cart successfully');
          dispatch(cartDetailManager(apiCall));
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      let data = {
        Name: productData.data.Item_Code__r.Name,
        ProductId: cartData.records[findindex].Id,
        DiscountedPrice: '0',
        Price: productData.data.Unit_Price__c,
        // AvailableQuantity: 10.33,
        dealerid: userData.Id,
        Quantity:
          parseInt(productData.quantity) +
          parseInt(cartData.records[findindex].Quantity__c),
        Types: '',
      };
      try {
        const res = await editCart(apiCall, data);
        if (res.code === '0001') {
          SimpleToast.show(res.message);
          dispatch(cartDetailManager(apiCall));
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
};

export const discountedProductCartManager = (
  apiCall: any,
  productData: any,
) => {
  return async (dispatch: any, getState: any) => {
    const cartData = getState().cart.cartData;
    const userData = getState().auth.userData;

    let findindex = cartData.records.findIndex(
      (item: any) => item.Item_Master__c === productData.data.Item_Code__c && item.Product_type__c === "Discount" && item.Variant_Code__c ===  productData.data.Variant_code__r.Name,
    );
    if (findindex === -1) {
      let records = [
        {
          attributes: {
            type: 'Add_to_cart__c',
            referenceId: `ref${productData.index}`,
          },
          Dealer__c: userData.Id,
          Item_Master__c: productData.data.Item_Code__r.Id,
          Name: `${productData?.data?.Item_Code__r?.Name}`,
          Product_ID__c: productData.data.Id,
          Discounted_Price__c: productData.data.Discounted_pricee__c,
          Variant__c: productData.data.Variant_code__c,
          Price__c: productData.data.Discounted_pricee__c,
          Quantity__c: productData.quantity,
          Product_type__c: 'Discount',
          GST__c: parseInt(
            productData.data.Item_Code__r.GST_Group_Code_Y__c.trim()
              .split('')
              .map((num: any) => Number(num))
              .filter((x: any) => Number.isInteger(x))
              .join(''),
          ),
          // GST__c: 28,
          Type__c: 'Inventory',
          Tyre_Size__c: productData.data.Item_Code__r.Tire_Size__c,
          Tread_Pattern__c: productData.data.Item_Code__r.Tread_Pattern__c,
        },
      ];
      try {
        const res = await addToCart(apiCall, {records});
        if (!res.data.hasErrors) {
          SimpleToast.show('Product added to cart successfully');
          dispatch(cartDetailManager(apiCall));
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      let data = {
        Name: `${productData?.data?.Item_Code__r?.Name}`,
        ProductId: cartData.records[findindex].Id,
        Price: productData.data.Discounted_pricee__c,
        // AvailableQuantity: 10.33,
        dealerid: userData.Id,
        Quantity:
          parseInt(productData.quantity) +
          parseInt(cartData.records[findindex].Quantity__c),
        Types: '',
      };
      try {
        const res = await editCart(apiCall, data);
        if (res.code === '0001') {
          dispatch(cartDetailManager(apiCall));
          SimpleToast.show(res.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
};

export const {
  setShippingAddress,
  setThreadData,
  setRimDropdown,
  setAspectData,
  setSectionData,
  setCartData,
  setProducts,
  setDiscountedProducts,
  resetCartData,
  setProductSearch,
  setOrderFilters,
  setResetFilter,
  resetCart,
  setSkuData,
  setPriceData,
  setFinalCartData,
  setTotalPrice,
  setTotalQuantiy,
} = cartSlice.actions;

export default cartSlice.reducer;
