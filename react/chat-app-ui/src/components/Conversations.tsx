import { Box, Typography } from "@mui/material";
import React from "react";
import { data } from "../helper/data";
const MessageBubble = ({ message, timestamp, sentByYou = false }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: sentByYou ? "flex-end" : "flex-start",
        mb: 1,
      }}
    >
      <Box
        sx={{
          bgcolor: sentByYou ? "#DCF7C5" : "#FAFAFA",
          borderRadius: "44px",
          padding: "16px",
          maxWidth: "70%",
        }}
      >
        <Typography
          sx={{
            fontSize: "16px",
            textAlign: sentByYou ? "right" : "left",
          }}
        >
          {message}
        </Typography>
        <Typography
          sx={{
            display: "flex",
            justifyContent: sentByYou ? "flex-end" : "flex-start",
            color: "#00000075",
            fontSize: "14px",
          }}
        >
          {timestamp}
        </Typography>
      </Box>
    </Box>
  );
};
const Conversations = () => {
  const chats = data[0].chat;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "16px",
      }}
    >
      {chats.map((chat, index) => (
        <Box>
          {/* <MessageBubble
            message={chat[Object.keys(0)]}
            sentByYou={chat.sentByYou}
          /> */}
          {Object.keys(chat).map((key) => (
            <MessageBubble
              message={chat[key].message}
              timestamp={chat[key].timeStamp}
              sentByYou={key === "you"}
            />
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default Conversations;
