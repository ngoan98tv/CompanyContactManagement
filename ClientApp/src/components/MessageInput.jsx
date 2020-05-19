import React from "react";
import { useState } from "react";
import {
  Box,
  TextField,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import useCreateMessage from "../hooks/useCreateMessage";
import { useContext } from "react";
import { AppContext } from "../App";

function MessageInput({refresh}) {
  const [message, setMessage] = useState("");
  const [create, { isLoading, error }] = useCreateMessage();
  const { user } = useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await create({
      content: message,
      senderId: user.id,
      receiverId: 1,
      isSeen: false,
    });
    if (data) {
      setMessage("");
      refresh();
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      component="form"
      onSubmit={handleSubmit}
    >
      <TextField
        error={error}
        helperText={error && (error.message || "Unexpected error!")}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter a message here..."
        fullWidth
        style={{ flexGrow: 1 }}
        required
      />
      <IconButton type="submit">
        {isLoading ? <CircularProgress size={24} /> : <SendIcon />}
      </IconButton>
    </Box>
  );
}

export default MessageInput;
