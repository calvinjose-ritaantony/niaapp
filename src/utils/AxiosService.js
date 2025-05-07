import axios from "axios";

const BASE_URL = 'https://customgptapp2.azurewebsites.net/';
// const BASE_URL ="http://localhost:8000/";

axios.defaults.baseURL = BASE_URL;

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
  return {
    headers: {
      "Content-Type": "multipart/form-data",
      //"auth_token": `Bearer ${auth_token}`
    }
  }
}

const jsonHeader = () => {
  const auth_token = localStorage.getItem('auth_token');
  return {
    headers: {
      "Content-Type": "application/json",
      //"auth_token": `Bearer ${auth_token}`
    }
  };
}

const chatServices = {
  async getGpts() {
    return await axios.get(`get_gpts`, jsonHeader())
  },

  async getUsecase(gpt_id) {
    return await axios.get(`usecases/${gpt_id}`, jsonHeader())
  },

  async postChat(formData, gpt_id, gpt_name) {
    return await axios.post(`chat/${gpt_id}/${gpt_name}`, formData, formHeader())
  },

  async chatHistory(gpt_id, gpt_name, current_use_case_id) {
    let url = current_use_case_id ? `chat_history/${gpt_id}/${gpt_name}/${current_use_case_id}` : `chat_history/${gpt_id}/${gpt_name}`;
    return await axios.get(url, jsonHeader())
  },

  async clearChathistory(gpt_id, gpt_name) {
    // gpt_id = "67975ddc2c063727d355e0b2";
    // gpt_name = "Nia";
    return await axios.put(`clear_chat_history/${gpt_id}/${gpt_name}`, jsonHeader())
  },

  async updateInstruction(gpt_id, gpt_name, usecase_id) {
    return await axios.post(`update_instruction/${gpt_id}/${gpt_name}/${usecase_id}`, jsonHeader())
  },

  // New function to upload documents
  async uploadDocuments(gpt_id, gpt_name, gptData, files) {
    const formData = new FormData();
    
    // Add the gpt data as a JSON string
    formData.append('gpt', JSON.stringify(gptData));
    
    // Add each file to the formData
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }
    }
    
    return await axios.put(`upload_document/${gpt_id}/${gpt_name}`, formData, formHeader());
  },
}

export { BASE_URL, chatServices };