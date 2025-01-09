import axios from "axios";
//  const BASE_URL ="https://dev.configurator.robotics.abb.com/"
const BASE_URL ='http://10.169.117.244:8080/'; //Aniesh

axios.defaults.baseURL = BASE_URL;




////// Interceptor
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

const refreshToken = async () => {
  const userEmail = localStorage.getItem('userInfo');
  const ut = localStorage.getItem('ut');
  return await axios.get(`/oauth/refreshToken?emailId=${userEmail}`); //${ut ? '&ut='+ut : ''}
};

axiosInstance.interceptors.request.use(config => {
   const token = localStorage.getItem('auth_token'); // or however you store your token
   if (token) {
     config.headers['auth_token'] = token;
   }
   return config;
 });

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const { response } = error;
    if (response && response.status === 401 && response.data.includes('Expired token')) {
      try {
        const tokenResponse = await refreshToken();
        const newToken = tokenResponse.data; 
        localStorage.setItem('auth_token', newToken);
        axiosInstance.defaults.headers['auth_token'] = newToken;
        error.config.headers['auth_token'] = newToken;
        return axiosInstance(error.config);
      } catch (refreshError) {
        console.error('Refresh token failed', refreshError);
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

////// Interceptor

const formHeader = () => {
    const auth_token = localStorage.getItem('auth_token');
    return {headers: {
       "Content-Type": "multipart/form-data",
       "auth_token": `Bearer ${auth_token}`
     }}
 }
 
 const jsonHeader = () => {
    const auth_token = localStorage.getItem('auth_token');
    return {headers: {
       "Content-Type": "application/json",
       "auth_token": `Bearer ${auth_token}`
     }};
 }

 const chatServices = {
     async chatHead(userId) {
        return  await axiosInstance.get(`api/admin/chatHead?userId=${userId}`, jsonHeader())
     }, 

     async listChat(userId) {
        return  await axiosInstance.get(`api/admin/listChat?userId=${userId}`, jsonHeader())
     }, 

     async deleteChat(id){
        return await axiosInstance.delete(`api/admin/delete/${id}`, jsonHeader())
     },

     async submitChat(payload, userId){
        return await axiosInstance.post(`api/admin/submitChat?userId=${userId}`, payload, jsonHeader())
     }
}

 export {BASE_URL, chatServices};