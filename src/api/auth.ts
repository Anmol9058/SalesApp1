export const login = async (apiCall: any,  url: any,data: any) => {
  // console.log(url,"jdjdj");
  
  const res = await apiCall({
    customUrl: true,
    type: 'POST',
    url: url,
    data: data,
  });
  console.log('LOGIN-RESPONSE', res)

  return res.data.data[0];
};

export const logOutApi = async (apiCall: any, data: any) => {
  const res = await apiCall({
    customUrl: true,
    type: 'POST',
    url: '/services/apexrest/login_logoutAPI/',
    data: data,
  });
  return res.data;
};

