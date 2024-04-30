"use client";
import React, { useEffect, useState } from "react";
import { ToDoTypes } from "../types/todo.types";
import TodoCard from "../ui/TodoCard/TodoCard";
import TodoModal from "../ui/Modal/Modal";

const Dashboard = () => {
  const [todoNav, setTodoNav] = useState<number>(1);
  useEffect(() => {
    const ActiveTodo = Number(sessionStorage.getItem("ActiveTodo"));
    if (ActiveTodo) {
      setTodoNav(ActiveTodo);
    } else {
      setTodoNav(1);
    }
    const completed = localStorage.getItem("completed")?.split(",")
    const numbersArray = completed?.map(item => parseInt(item))
    setCompletedTasks(numbersArray || [])
    const storedArrayString = localStorage.getItem("todoList");
    if (storedArrayString) {
      const storedArray = JSON.parse(storedArrayString);
      setTodoList(storedArray)
    }
  }, []);
  const ActiveTodo = (num: number) => {
    setTodoNav(num);
    sessionStorage.setItem("ActiveTodo", num.toString());
  };
  const defaultItem = {id: 0, title: "", desc: "", date: ""}
  const [todoList, setTodoList] = useState<ToDoTypes[]>([
    { id: 1, title: "Doing Workout", desc: "I have to do push up at 6 PM", date: "2024-04-30" },
    { id: 2, title: "Waking up", desc: "I have to do wake up at 6 AM", date: "2024-04-30" },
    { id: 3, title: "Doing Workout", desc: "I have to do pull up at 7 PM", date: "2024-04-30" },
  ]);
  const [defaultValue, setDefaultValue] = useState<ToDoTypes>({id: 0, title: "", desc: "", date: ""})
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);
  const [index, setIndex] = useState(0)
  const markAsRead = (id: number) => {
    let result = completedTasks
    result.push(id)
    setCompletedTasks([...result])
    // let filter = todoList.filter((item)=> !result.includes(item?.id))
    localStorage.setItem("completed", result.join())
    // setTodoList(filter)
  }
  // const [currentTime, setCurrentTime] = useState(new Date());
  const [todoModal, setTodoModal] = useState(false)
  const toggle = () => {
    setTodoModal(false)
    setDefaultValue(defaultItem)
  }
  const deleteTask = (id: number) => {
    let result = todoList
    let deleted = result.filter(item=> item?.id !== id)
    setTodoList(deleted)
    const arrayString = JSON.stringify(deleted);
    localStorage.setItem("todoList", arrayString);
  }
  return (
    <div className=" bg-zinc-900 w-[100%] min-h-[100vh] flex flex-col items-center pt-[40px] sm:p-[40px] gap-[20px]">
      <h1 className="text-[40px] font-[600] text-white">Todo List</h1>
      <TodoModal open={todoModal} toggle={toggle} todoList={todoList} defaultValue={defaultValue} index={index}/>
      <div className="w-[100%] sm:w-[80%] lg:w-[60%] bg-zinc-800 p-[20px] flex flex-col gap-[30px]">
        <div className="flex sm:flex-row flex-col w-[100%] justify-between pb-[30px] border-b-[gray] border-b gap-[20px]">
          <div className="flex text-white w-[100%] sm:w-[55%] ">
            <button
              onClick={() => ActiveTodo(1)}
              className={`${
                todoNav === 1 ? "bg-green-500" : "bg-zinc-700"
              } px-[16px] py-[8px] text-[20px] w-[40%] whitespace-nowrap`}
            >
              To Do
            </button>
            <button
              onClick={() => ActiveTodo(2)}
              className={`${
                todoNav === 2 ? "bg-green-500" : "bg-zinc-700"
              } px-[16px] py-[8px] text-[20px] w-[60%] whitespace-nowrap`}
            >
              Completed
            </button>
          </div>
          <button onClick={()=>setTodoModal(true)} className="px-[16px] py-[8px] text-[20px] bg-green-500 text-white whitespace-nowrap">
            Add new task
          </button>
        </div>
        <div className={`${todoNav === 1 ? "block" : "hidden"} flex flex-col gap-[20px]`}>
          {todoList?.map((item, index) => {
            return (
              <div key={index} className={completedTasks.includes(item?.id) ? "hidden" : "block"}>
                <TodoCard item={item} completedTasks={completedTasks} markAsRead={markAsRead} deleteTask={deleteTask} setTodoModal={setTodoModal} setDefaultValue={setDefaultValue} index={index} setIndex={setIndex}/>
              </div>
            );
          })}
        </div>
        <div className={`${todoNav === 2 ? "block" : "hidden"} flex flex-col gap-[20px]`}>
          {todoList?.map((item, index) => {
            return (
              <div key={index} className={completedTasks.includes(item?.id) ? "block" : "hidden"}>
                <TodoCard item={item} completedTasks={completedTasks} markAsRead={markAsRead} deleteTask={deleteTask} setTodoModal={setTodoModal} setDefaultValue={setDefaultValue} index={index} setIndex={setIndex}/>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
