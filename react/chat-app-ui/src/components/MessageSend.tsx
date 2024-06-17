import { Add, Mic, Send } from "@mui/icons-material";
import { Box, IconButton, TextField } from "@mui/material";
import React from "react";
import { data } from "../helper/data";

const MessageSend = () => {
  const contact = data[0];
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <IconButton
        sx={{
          borderRadius: "50%",
          mx: 1,
          border: "1px solid #D9D9D9",
        }}
      >
        <Add
          sx={{
            color: "#D9D9D9",
          }}
        />
      </IconButton>
      <IconButton
        sx={{
          borderRadius: "50%",
          mx: 1,
          border: "1px solid #D9D9D9",
        }}
      >
        <Mic
          sx={{
            color: "#D9D9D9",
          }}
        />
      </IconButton>
      <TextField
        id="outlined-basic"
        variant="outlined"
        fullWidth
        placeholder={`Message ${contact.name}`}
        sx={{
          mx: 1,
        }}
        InputProps={{
          style: {
            borderRadius: "69px",
          },
          endAdornment: <Send />,
        }}
      />
    </Box>
  );
};
export default MessageSend;
