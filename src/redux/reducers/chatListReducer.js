import { CHAT_LIST_SUCCESS, CHAT_USECASE_SUCCESS, GPT_LIST_SUCCESS } from "../constants/chatConstants";

export const chatListReducer = (
  state = { gptList: [], chatList: [], chatUsecase: [], totalElements: 0 },
  action
) => {
  switch (action.type) {
    case GPT_LIST_SUCCESS:
      return {
        ...state,
        gptList: action.payload,
      };
    case CHAT_USECASE_SUCCESS:
      return {
        ...state,
        chatUsecase: action.payload,
      };
    case CHAT_LIST_SUCCESS:
      return {
        ...state,
        chatList: action.payload,
      };
    default:
      return state;
  }
};
