import React from "react";
import { Fab, Popover, Box, IconButton, Typography } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import CloseIcon from "@material-ui/icons/Close";
import { useState } from "react";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";

function ChatBox() {
  const [anchorEl, setAnchorEl] = useState();

  return (
    <div>
      <Fab
        onClick={(e) => setAnchorEl(e.currentTarget)}
        color="primary"
        style={{ position: "fixed", bottom: 32, right: 32 }}
      >
        <ChatIcon />
      </Fab>
      <Popover
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Box display='flex' flexDirection='column' minWidth={320} minHeight={380} p={2}>
          <Box display="flex" alignItems="center" borderBottom="solid 1px grey">
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Message to Admins
            </Typography>
            <IconButton onClick={() => setAnchorEl(null)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box flexGrow={1}>
            <MessageList />
          </Box>
          <MessageInput />
        </Box>
      </Popover>
    </div>
  );
}

export default ChatBox;
