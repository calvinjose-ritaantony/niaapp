import { CHAT_LIST_SUCCESS, CHAT_HAEDLIST_SUCCESS } from "../constants/chatConstants";

export const chatListReducer = (
  state = { chatList: [], chatHead: [], totalElements: 0 },
  action
) => {
  switch (action.type) {
    case CHAT_LIST_SUCCESS:
      return {
        ...state,
        chatList: action.payload.data,
      };
    case CHAT_HAEDLIST_SUCCESS:
      return {
        ...state,
        chatHead: action.payload.data,
      };
    default:
      return state;
  }
};
