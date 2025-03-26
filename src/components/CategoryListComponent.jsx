import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import {
  getUpdateInstructionAction,
  getUsecaseAction,
} from "../redux/actions/ChatConversationAction";
import { menuList } from "../utils/menuList";

const CategoryListComponent = (props) => {
  const [selectedUseCase, setSelectedUseCase] = useState({});
  const [newStartIndex, setNewStartIndex] = useState(0);
  const usecaseData = useSelector((state) => state.chatListData.chatUsecase);
  const [useCases, setUseCases] = useState([]);
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

  useEffect(() => {
      const savedOrder = localStorage.getItem(`useCasesOrder_${props.category}`);
      if (savedOrder) {
        setUseCases(JSON.parse(savedOrder));
      } else {
        let useCaseList = menuList && menuList ?.filter((itm) => itm.name === props.category)[0]?.["useCases"];
        setUseCases(useCaseList);
      }
    }, []);
  
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(useCases);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setUseCases(items);
    localStorage.setItem(`useCasesOrder_${props.category}`, JSON.stringify(items));
  };

  return (
    <div className="nia-category">
      <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="useCasesList" direction="horizontal">
                {(provided) => (
      <div className="nia-category-list" {...provided.droppableProps} ref={provided.innerRef}>
        {props.category &&
          useCases?.map((item, i) => (
              <Draggable key={item.name} draggableId={item.name} index={i}>
                                {(provided) => (
              <div ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
                key={i}
                className={`list ${
                  selectedUseCase.name === item.name ? "active" : ""
                } ${newStartIndex>i || newStartIndex+4<=i ? 'fade hide' : 'fade show'}`}
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
              )}
                              </Draggable>
            ))}
            {provided.placeholder}
      </div>
      )}
              </Droppable>
            </DragDropContext>
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
