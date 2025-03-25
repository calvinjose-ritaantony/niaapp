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
      { name: "CUSTOMIZED_RECOMMENDATIONS", label: "Product Recommendations", colorType: 'nia-ca1' },
      { name: "PRODUCT_COMPARISON", label: "Compare Products", colorType: 'nia-ca2' },
      { name: "PRODUCT_INFORMATION", label: "Product Information", colorType: 'nia-ca3' },
      { name: "TRACK_ORDERS", label: "Track my Order", colorType: 'nia-ca4' },
      { name: "SUMMARIZE_PRODUCT_REVIEWS", label: "Product Reviews", colorType: 'nia-ca5' },
      { name: "HANDLE_FAQS", label: "Enquiries", colorType: 'nia-ca6' },
    ],
  },
  {
    name: "enterprise",
    useCases: [
      { name: "GENERATE_MAIL_PROMOTION", label: "Generate Marketing Mail", colorType: 'nia-ca1' },
      {
        name: "CREATE_PRODUCT_DESCRIPTION",
        label: "Create Product Description", colorType: 'nia-ca2'
      },
      { name: "MANAGE_TICKETS", label: "Manage Tickets", colorType: 'nia-ca3' },
      { name: "DOC_SEARCH", label: "Search Knowledge Base", colorType: 'nia-ca4' },
      { name: "ANALYZE_SPENDING_PATTERNS", label: "Analyze Spending Patterns", colorType: 'nia-ca5' },
      { name: "GENERATE_REPORTS", label: "Reports", colorType: 'nia-ca6' },
      { name: "CUSTOMER_COMPLAINTS", label: "Customer Complaints", colorType: 'nia-ca7' },
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

  const handleCategory = (item) =>{
    const activeUsecase = usecaseData.find((itm)=>itm.name === item.name);
    selectUseCase(activeUsecase);
  }

  return (
    <div className="nia-category">
      <div className="nia-category-list">
        {props.category &&
          menuList &&
          menuList
            ?.filter((itm) => itm.name === props.category)[0]
            ?.["useCases"]?.slice(newStartIndex, newStartIndex + 4)
            ?.map((item, i) => (
              <div key={i} className={`list ${selectedUseCase.name===item.name ? 'active' : ''}`} onClick={()=>handleCategory(item)}>
                <div className={`nia-category-image ${item.colorType}`}>
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
