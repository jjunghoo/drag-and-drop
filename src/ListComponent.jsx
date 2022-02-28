import // closestCenter,
// DndContext,
// PointerSensor,
// useSensor
"@dnd-kit/core";
import {
  // arrayMove,
  // SortableContext,
  useSortable
  // verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { useState } from "react";

const ListComponent = ({
  setTopItems,
  topItems,
  id,
  education,
  name,
  list,
  index,
  index1
}) => {
  const [items, setItems] = useState(list);
  const [listContent, setListContent] = useState(
    topItems[index].list[index1].content
  );

  console.log(topItems[index].list[index1].content)
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
    marginBottom: 5,
    marginTop: 5,
    opacity: isDragging ? 0.5 : 1,
    display: "flex"
  };

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
      <div>{name}</div>
      <div
        style={{
          margin: "auto",
          width: 200,
          textAlign: "center",
          border: "1px solid black"
        }}
      >
        <input
          value={listContent}
          onChange={(e) => {
            console.log(e.target.value);
            var temp = topItems;
            setListContent(e.target.value);
            temp[index].list[index1].content = e.target.value;
            console.log(e.target.value);
            setTopItems(temp);
            // console.log("changing");
          }}
        />
      </div>
    </div>
  );
};

export default ListComponent;
