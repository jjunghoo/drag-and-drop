import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor
} from "@dnd-kit/core";
import {
  restrictToParentElement,
  restrictToVerticalAxis,
  restrictToWindowEdges
} from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { useEffect, useState } from "react";
import ListComponent from "./ListComponent";

const UserComponent = ({ setTopItems, topItems, index, id, name, list }) => {
  const [lists, setLists] = useState(list);

  useEffect(() => {
    console.log("changed user");
    // console.log(topItems[index].list);
    // topItems[index].list.map((items, i) => console.log(items));
  }, [index, topItems]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transition,
    transform,
    isDragging
  } = useSortable({ id: id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    border: "2px solid black",
    marginBottom: 15,
    marginTop: 15,
    opacity: isDragging ? 0.5 : 1,
    display: "flex"
  };

  const sensors = [
    useSensor(PointerSensor, {
      // Press delay of 250ms, with tolerance of 5px of movement
      activationConstraint: {
        delay: 100,
        tolerance: 5
      }
    })
  ];

  const handleDragEnd = ({ active, over }) => {
    if (active.id !== over.id) {
      setLists((lists) => {
        const oldIndex = lists.findIndex((item) => item.id === active.id);
        const newIndex = lists.findIndex((item) => item.id === over.id);

        var temp = topItems;
        temp = topItems;
        temp[index].list = arrayMove(lists, oldIndex, newIndex);
        setTopItems(temp);
        return arrayMove(lists, oldIndex, newIndex);
      });
    }
  };

  const addInput = (index) => {
    console.log(index);
    // topItems[index].list.push({
    //   id: (topItems[index].list.length + 1).toString(),
    //   education: "한양대학교 대학원",
    //   department: "디자인학부",
    //   date: "2017-2019",
    //   state: "졸업",
    //   content: "hello"
    // });

    // let countArr = [...lists]
    // let counter = countArr.slice(-1)[0]
    // counter += 1
    // countArr.concat({
    //   id: counter.toString(),
    //   education: "한양대학교 대학원",
    //   department: "디자인학부",
    //   date: "2017-2019",
    //   state: "졸업",
    //   content: "hello"
    // })
    // console.log(countArr)
    // topItems[index].list.concat(countArr);
  };

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
      <div>{name}</div>
      <div
        style={{
          margin: "auto",
          marginRight: '1px',
          width: 200,
          textAlign: "center",
          border: "1px solid black"
        }}
      >
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[
            restrictToVerticalAxis,
            restrictToWindowEdges,
            restrictToParentElement
          ]}
        >
          <SortableContext
            items={lists.map((item) => item.id)}
            strategy={verticalListSortingStrategy}
          >
            {lists &&
              lists.map((item, index1) => (
                <ListComponent
                  index={index}
                  index1={index1}
                  setTopItems={setTopItems}
                  topItems={topItems}
                  {...item}
                  key={item.id}
                />
              ))}
          </SortableContext>
        </DndContext>
        
      </div>
      <div onClick={() => addInput(index)}>추가</div>
    </div>
  );
};

export default UserComponent;
