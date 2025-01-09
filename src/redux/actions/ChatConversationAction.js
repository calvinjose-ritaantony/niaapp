import { chatServices } from "../../utils/AxiosService";



export const getChatListData = (userId) => async(dispatch) =>{
    try {
        dispatch({type:GET_LOADING_SHOW});
        const response = await chatServices.listChat(userId);
        dispatch({type:CHAT_LIST_SUCCESS, payload: response.data })
        dispatch({type:GET_LOADING_HIDE});
        return response.data;
      } catch (error) {
          dispatch({type:GET_LOADING_HIDE});
      }
}
export const getChatHeadList = (userId) => async(dispatch) =>{
    try {
        dispatch({type:GET_LOADING_SHOW});
        const response = await chatServices.chatHead(userId);
        dispatch({type:CHAT_HAEDLIST_SUCCESS, payload: response.data })
        dispatch({type:GET_LOADING_HIDE});
        return response.data;
      } catch (error) {
          dispatch({type:GET_LOADING_HIDE});
      }
}
