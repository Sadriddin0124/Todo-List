"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Backdrop,
  Box,
  Fade,
  Modal,
  Typography,
  TextField,
} from "@mui/material";
import { ToDoTypes } from "@/app/types/todo.types";

interface TodoModalProps {
  open: boolean;
  toggle: () => void;
  todoList: ToDoTypes[];
  defaultValue: ToDoTypes;
  index: number
}

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const TodoModal: React.FC<TodoModalProps> = ({ open, toggle, todoList, defaultValue, index }) => {
  const [title, setTitle] = useState<string>("")
  const [desc, setDesc] = useState<string>("")
  const [date, setDate] = useState<string>("")
  const SaveTask = () => {
    let result = todoList
    if (defaultValue?.id === 0) {
        let payload = {
            id: defaultValue?.id ? defaultValue?.id : todoList[todoList.length - 1]?.id + 1,
            title: defaultValue?.title ? defaultValue?.title : title,
            desc: defaultValue?.desc ? defaultValue?.desc : desc,
            date: defaultValue.date ? defaultValue?.date : date
        }
        result.unshift(payload)     
    }else {
        let payload = {
            id: defaultValue?.id ? defaultValue?.id : todoList[todoList.length - 1]?.id + 1,
            title: title ? title : defaultValue?.title,
            desc: desc ? desc : defaultValue?.desc,
            date: date ? date : defaultValue?.date
        }
        result.splice(index, 1, payload)
    } 
    const arrayString = JSON.stringify(result);
    localStorage.setItem("todoList", arrayString);
    window.location.reload()
};
  const [currentTime, setCurrentTime] = useState(new Date());
  const parts = currentTime.toLocaleDateString().split("/");
  const formattedDefaultDate = `${parts[2]}-${
    parts[0] < "10" ? parts[0] : "0" + parts[0]
  }-${parts[1]}`;
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={toggle}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div className="w-[100%] flex flex-col items-center gap-[10px]">
              <Typography
                id="transition-modal-title"
                variant="h5"
                component="h2"
              >
                {defaultValue?.id ? "Edit task" : "Add new task"}
              </Typography>
              <TextField
                id="outlined-basic"
                label="Title"
                variant="outlined"
                className="w-[100%]"
                onChange={(e)=>setTitle(e.target.value)}
                defaultValue={defaultValue?.title}
                />
              <textarea
                placeholder="Description"
                className="w-[100%] resize-none outline-none p-[10px] shadow-sm border border-[silver] rounded-md"
                rows={3}
                onChange={(e)=>setDesc(e.target.value)}
                defaultValue={defaultValue?.desc}
                ></textarea>
              <label className="self-start">Select end date of task</label>
              <input
                type="date"
                className="w-[100%] p-[10px] shadow-sm border border-[silver] rounded-md"
                defaultValue={defaultValue?.desc ? defaultValue?.desc : formattedDefaultDate}
                onChange={(e)=>setDate(e.target.value)}
              />
              <button
                onClick={SaveTask}
                className="px-[16px] py-[8px] text-[20px] bg-green-500 text-white self-end"
              >
                Save
              </button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default TodoModal;
