import React from "react";
import { Box, Typography, CircularProgress } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/CheckCircle";
import useMessages from "../hooks/useMessages";

function MessageList() {
  const { data } = useMessages();

  if (!data) {
    return (
      <CircularProgress style={{ display: "block", margin: "32px auto" }} />
    );
  }

  return (
    data &&
    data.map(({ id, content, sender, isSeen }) =>
      sender.role === 1 ? (
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
          <Typography color="textSecondary">
            {isSeen && (
              <small>
                Seen <CheckIcon fontSize="inherit" />
              </small>
            )}
          </Typography>
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
              {" - "}
              {sender.department && sender.department.name}
              {sender.department &&
                sender.department.company &&
                ` (${sender.department.company.name})`}
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
