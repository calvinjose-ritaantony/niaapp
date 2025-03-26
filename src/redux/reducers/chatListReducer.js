import { CHAT_LIST_SUCCESS, CHAT_USECASE_SUCCESS, GPT_LIST_SUCCESS, CHAT_INPUT_SUCCESS, CHAT_ATTACHEMENT_SUCCESS } from "../constants/chatConstants";

export const chatListReducer = (
  state = { gptList: [], chatList: [], chatUsecase: [], chatInput:null, chatAttachement: null, totalElements: 0 },
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
    case CHAT_INPUT_SUCCESS:
      return {
        ...state,
        chatInput: action.payload,
      };
    case CHAT_ATTACHEMENT_SUCCESS:
      return {
        ...state,
        chatAttachement: action.payload,
      };
    default:
      return state;
  }
};
