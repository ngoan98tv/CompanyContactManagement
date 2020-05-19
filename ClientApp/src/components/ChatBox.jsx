import React from "react";
import { Fab, Popover, Box, IconButton, Typography } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import CloseIcon from "@material-ui/icons/Close";
import { useState } from "react";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";
import useMessages from "../hooks/useMessages";

function ChatBox() {
  const [anchorEl, setAnchorEl] = useState();
  const { data, refresh } = useMessages();

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
        <Box
          display="flex"
          flexDirection="column"
          minWidth={320}
          minHeight={420}
          maxHeight={420}
          p={2}
        >
          <Box display="flex" alignItems="center" borderBottom="solid 1px grey">
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Chat Room
            </Typography>
            <IconButton onClick={() => setAnchorEl(null)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box flexGrow={1} overflow="auto">
            <MessageList data={data} />
          </Box>
          <MessageInput refresh={refresh} />
        </Box>
      </Popover>
    </div>
  );
}

export default ChatBox;
