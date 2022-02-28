import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
  restrictToFirstScrollableAncestor,
  restrictToParentElement
} from "@dnd-kit/modifiers";
import React, { useEffect, useState } from "react";
import UserComponent from "./UserComponent";

function App() {
  const [items, setItems] = useState([
    {
      id: "1",
      name: "학력",
      list: [
        // {
        //   id: "1",
        //   education: "한양대학교 대학원",
        //   department: "디자인학부",
        //   date: "2017-2019",
        //   state: "졸업",
        //   content: "hello"
        // },
        // {
        //   id: "2",
        //   education: "한양사이버대학교",
        //   department: "디자인학부",
        //   date: "2017-2019",
        //   state: "졸업",
        //   content: "hello"
        // }
      ]
    },
    {
      id: "2",
      name: "경력",
      list: [
        // {
        //   id: "1",
        //   company: "패스트캠퍼스 기획디자인팀",
        //   position: "디자인학부",
        //   date: "2022.01-현재",
        //   state: "재직중",
        //   content: "hello"
        // },
        // {
        //   id: "2",
        //   company: "패스트캠퍼스 기획디자인팀",
        //   position: "디자인학부",
        //   date: "2020.01-2021.12",
        //   state: "퇴사",
        //   content: "hello"
        // }
      ]
    },
    {
      id: "3",
      name: "자격증",
      list: [
        // {
        //   id: "1",
        //   certificate: "컬러리스트기사",
        //   HostOrganization: "한국산업인력공단",
        //   date: "2019.11",
        //   content: "hello"
        // },
        // {
        //   id: "2",
        //   certificate: "웹디자인기능사",
        //   HostOrganization: "한국산업인력공단",
        //   date: "2019.11",
        //   content: "hello"
        // }
      ]
    },
    {
      id: "4",
      name: "외국어",
      list: [
        // {
        //   id: "1",
        //   education: "한양대학교 대학원",
        //   department: "디자인학부",
        //   careerPeriod: "2017-2019",
        //   state: "졸업",
        //   content: "hello"
        // },
        // {
        //   id: "2",
        //   education: "한양사이버대학교",
        //   department: "디자인학부",
        //   careerPeriod: "2017-2019",
        //   state: "졸업",
        //   content: "hello"
        // }
      ]
    },
    {
      id: "5",
      name: "외국어",
      list: [
        // {
        //   id: "1",
        //   education: "한양대학교 대학원",
        //   department: "디자인학부",
        //   careerPeriod: "2017-2019",
        //   state: "졸업",
        //   content: "hello"
        // },
        // {
        //   id: "2",
        //   education: "한양사이버대학교",
        //   department: "디자인학부",
        //   careerPeriod: "2017-2019",
        //   state: "졸업",
        //   content: "hello"
        // }
      ]
    }
  ]);

  useEffect(() => {
    console.log("changed");
    console.log(items);
    // setItemsSave(items);
  }, [items]);

  const onClickEvent = () => {
    console.log(items);
  };

  const pointerSensor = useSensor(PointerSensor, {
    // Press delay of 250ms, with tolerance of 5px of movement
    activationConstraint: {
      delay: 100,
      tolerance: 5
    }
  });
  const sensors = useSensors(
    // mouseSensor,
    // touchSensor
    // keyboardSensor,
    pointerSensor
  );

  const handleDragEnd = ({ active, over }) => {
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div
      onClick={() => {
        onClickEvent();
        // console.log(items);
      }}
      style={{
        margin: "auto",
        width: 350,
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
          restrictToFirstScrollableAncestor,

          restrictToParentElement
        ]}
      >
        <SortableContext
          items={items.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          {items.map((item, index) => (
            <UserComponent
              setTopItems={setItems}
              topItems={items}
              index={index}
              {...item}
              key={item.id}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}

export default App;
