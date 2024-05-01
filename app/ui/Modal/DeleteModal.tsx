"use client";
import React, { useState } from "react";
import {
  Backdrop,
  Box,
  Fade,
  Modal,
  Typography,
} from "@mui/material";
import { ToDoTypes } from "@/app/types/todo.types";

interface TodoModalProps {
  open: boolean;
  toggle: () => void;
  deleteTask: (id: number) => void;
  id: number
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

const DeleteModal: React.FC<TodoModalProps> = ({ open, toggle, deleteTask, id }) => {
  const DeleteTask = () => {
    deleteTask(id)
    toggle()
  }
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
                Are you sure?
              </Typography>
              <div>
              <button
                onClick={toggle}
                className="px-[16px] py-[8px] text-[20px] bg-green-500 text-white"
              >
                cancel
              </button>
              <button
                onClick={DeleteTask}
                className="px-[16px] py-[8px] text-[20px] bg-red-500 text-white"
              >
                delete
              </button>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default DeleteModal;
