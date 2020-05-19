import React, { useContext } from "react";
import { Box, Typography, CircularProgress } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/CheckCircle";
import { AppContext } from "../App";

function MessageList({data}) {
  const { user } = useContext(AppContext);

  if (!data) {
    return (
      <CircularProgress style={{ display: "block", margin: "32px auto" }} />
    );
  }

  return (
    data &&
    data.map(({ id, content, sender }) =>
      user.id === sender.id ? (
        <Box
          key={id}
          display="flex"
          flexDirection="column"
          mt={2}
          alignItems="flex-end"
          justifyContent="center"
        >
          <Box p={1} bgcolor="gray" borderRadius="16px" color="white">
            <Typography>{content}</Typography>
          </Box>
        </Box>
      ) : (
        <Box
          key={id}
          display="flex"
          flexDirection="column"
          mt={2}
          alignItems="flex-start"
          justifyContent="center"
        >
          <Typography color="textSecondary">
            <small>
              <strong>{sender.name}</strong>
            </small>
          </Typography>
          <Box p={1} bgcolor="blueviolet" borderRadius="16px" color="white">
            <Typography>{content}</Typography>
          </Box>
        </Box>
      )
    )
  );
}

export default MessageList;
