import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUpdateInstructionAction,
  getUsecaseAction,
} from "../redux/actions/ChatConversationAction";
import { menuList } from "../utils/menuList";

const CategoryListComponent = (props) => {
  const [selectedUseCase, setSelectedUseCase] = useState({});
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

  const handleCategory = (item) => {
    const activeUsecase = usecaseData.find((itm) => itm.name === item.name);
    selectUseCase(activeUsecase);
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
              <div
                key={i}
                className={`list ${
                  selectedUseCase.name === item.name ? "active" : ""
                }`}
                onClick={() => handleCategory(item)}
              >
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
