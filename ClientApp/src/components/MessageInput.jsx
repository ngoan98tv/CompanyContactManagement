import React from "react";
import { useState } from "react";
import { Box, TextField, IconButton } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";

function MessageInput() {
  const [message, setMessage] = useState("");
  return (
    <Box display="flex" alignItems="center">
      <TextField
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter a message here..."
        fullWidth
        style={{ flexGrow: 1 }}
      />
      <IconButton>
        <SendIcon />
      </IconButton>
    </Box>
  );
}

export default MessageInput;
