import { ToDoTypes } from "@/app/types/todo.types";
import React, { Dispatch, SetStateAction } from "react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin7Line } from "react-icons/ri";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { IoCheckmarkSharp } from "react-icons/io5";

const TodoCard = ({
  item,
  completedTasks,
  markAsRead,
  deleteTask,
  setTodoModal,
  setDefaultValue,
  index, 
  setIndex
}: {
  item: ToDoTypes;
  completedTasks: number[];
  markAsRead: (id: number) => void;
  deleteTask: (id: number) => void;
  setTodoModal: Dispatch<SetStateAction<boolean>>;
  setDefaultValue: Dispatch<SetStateAction<ToDoTypes>>;
  index: number;
  setIndex: Dispatch<SetStateAction<number>>
}) => {
  const editTask = () => {
    setTodoModal(true)
    setDefaultValue(item)
    setIndex(index)
  }
  return (
    <div className="p-[20px] bg-zinc-700 shadow-lg flex flex-col sm:flex-row gap-[20px] justify-between w-[100%]">
      <div className="flex flex-col gap-[6px]">
        <h1 className="text-[32px] font-[700] text-green-500">{item?.title}</h1>
        <p className="text-zinc-400">{item?.desc}</p>
        <p className="text-zinc-400 italic">Deadline: {item?.date}</p>
      </div>
      <div className="flex gap-[10px] self-end sm:self-center">
        <button className="text-white" onClick={editTask}>
          <CiEdit size={30} />
        </button>
        <button className="text-red-500" onClick={() => deleteTask(item?.id)}>
          <RiDeleteBin7Line size={30} />
        </button>
        <button className="text-green-500" onClick={() => markAsRead(item?.id)}>
          <IoCheckmarkDoneSharp
            size={30}
            className={completedTasks.includes(item?.id) ? "block" : "hidden"}
          />
          <IoCheckmarkSharp
            size={30}
            className={completedTasks.includes(item?.id) ? "hidden" : "block"}
          />
        </button>
      </div>
    </div>
  );
};

export default TodoCard;
