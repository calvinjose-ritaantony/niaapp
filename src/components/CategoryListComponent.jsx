import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUpdateInstructionAction,
  getUsecaseAction,
} from "../redux/actions/ChatConversationAction";
// import { formateChatHeadText } from '../utils/sharedFunction';

const menuList = [
  {
    name: "e-commerce",
    useCases: [
      { name: "CUSTOMIZED_RECOMMENDATIONS", label: "Product Recommendations" },
      { name: "PRODUCT_COMPARISON", label: "Compare Products" },
      { name: "PRODUCT_INFORMATION", label: "Product Information" },
      { name: "TRACK_ORDERS", label: "Track my Order" },
      { name: "SUMMARIZE_PRODUCT_REVIEWS", label: "Product Reviews" },
      { name: "HANDLE_FAQS", label: "Enquiries" },
    ],
  },
  {
    name: "enterprise",
    useCases: [
      { name: "GENERATE_MAIL_PROMOTION", label: "Generate Marketing Mail" },
      {
        name: "CREATE_PRODUCT_DESCRIPTION",
        label: "Create Product Description",
      },
      { name: "MANAGE_TICKETS", label: "Manage Tickets" },
      { name: "DOC_SEARCH", label: "Search Knowledge Base" },
      { name: "ANALYZE_SPENDING_PATTERNS", label: "Analyze Spending Patterns" },
      { name: "GENERATE_REPORTS", label: "Reports" },
      { name: "CUSTOMER_COMPLAINTS", label: "Customer Complaints" },
    ],
  },
];

const CategoryListComponent = (props) => {
  const chatHead = useSelector((state) => state.chatListData.chatHead);
  const userData = useSelector((state) => state.userList.userInfo);
  const [selectedUseCase, setSelectedUseCase] = useState({});
  const [chatHeadList, setChatHeadList] = useState(null);
  const [newStartIndex, setNewStartIndex] = useState(0);
  const usecaseData = useSelector((state) => state.chatListData.chatUsecase);
  const dispatch = useDispatch();
  const getChatHead = async () => {
    const chatHeadListData =
      props.activeGptDetails?._id &&
      (await dispatch(getUsecaseAction(props.activeGptDetails?._id)));
  };
  useEffect(() => {
    getChatHead();
  }, [props.activeGptDetails]);

  useEffect(() => {
    setChatHeadList(usecaseData);
  }, [usecaseData]);

  const selectUseCase = async (item) => {
    const updateChatCase = await dispatch(
      getUpdateInstructionAction(
        props.activeGptDetails?._id,
        props.activeGptDetails?.name,
        item._id
      )
    );
    setSelectedUseCase(item);
    props.selectListHandler(item);
  };

  return (
    <div className="nia-category">
      <div className="nia-category-list">
        {props.category &&
          menuList &&
          menuList
            ?.filter((itm) => itm.name === props.category)[0]
            ?.["useCases"]?.slice(newStartIndex, newStartIndex + 4)
            ?.map((item, i) => (
              <div key={i} className="list">
                <div className="nia-category-image">
                  <img
                    src={`/images/${item.label
                      .replaceAll(" ", "-")
                      .toLocaleLowerCase()}-icon.svg`}
                    alt={item.label}
                  />
                </div>
                <div className="nia-category-label">{item.label}</div>
              </div>
            ))}
      </div>
      <button
        className="nia-category-btn-left"
        onClick={() =>
          setNewStartIndex(newStartIndex !== 0 ? newStartIndex - 1 : 0)
        }
      ></button>
      <button
        className="nia-category-btn-right"
        onClick={() =>
          setNewStartIndex(
            newStartIndex <
              menuList?.filter((itm) => itm.name === props.category)[0]?.[
                "useCases"
              ].length -
                4
              ? newStartIndex + 1
              : newStartIndex
          )
        }
      ></button>
    </div>
  );
};

export default CategoryListComponent;
