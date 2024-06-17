import {
  Avatar,
  Box,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { data } from "../helper/data";
import videocall from "../assets/image.png";
import phone from "../assets/phone.png";
import { MoreVert } from "@mui/icons-material";

const ChatHeader = () => {
  const contact = data[0];

  return (
    <Box sx={{ bgcolor: "#F6F6F6", height: "78px" }}>
      <Box
        sx={{
          mx: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          // bgcolor: "#FF0000",
        }}
      >
        <ListItem
          sx={{
            width: "330px",
            padding: "8px",
            marginY: "8px",
            height: "60px",
            borderRadius: "4px",
          }}
          disablePadding
        >
          <ListItemButton>
            <ListItemIcon>
              <Avatar
                sx={{
                  width: "48px",
                  height: "48px",
                  mr: 1,
                }}
                alt={contact.name}
                src={contact.profilePictureURL}
              />
            </ListItemIcon>
            <ListItemText
              primary={
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: 600,
                      lineHeight: "21px",
                    }}
                  >
                    {contact.name}
                  </Typography>
                  <Box
                    sx={{
                      backgroundColor: "#3BA55D",
                      borderRadius: "50%",
                      minHeight: "8px",
                      minWidth: "8px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      mx: 2,
                    }}
                  ></Box>
                </Box>
              }
              primaryTypographyProps={{
                fontSize: "16px",
                fontWeight: 600,
                lineHeight: "21px",
              }}
              secondaryTypographyProps={{
                fontSize: "14px",
                lineHeight: "19px",
              }}
              secondary="Click here for contact info"
            />
          </ListItemButton>
        </ListItem>

        <Box>
          <IconButton>
            <Box
              component="img"
              src={videocall}
              alt="videocall"
              sx={{
                height: "15px",
                width: "24px",
              }}
            />
          </IconButton>
          <IconButton>
            <Box
              component="img"
              src={phone}
              alt="phone"
              sx={{
                width: "21px",
                height: "21px",
              }}
            />
          </IconButton>
          <IconButton>
            <MoreVert
              sx={{
                height: "21px",
                width: "21px",
                color: "#007AFF",
              }}
            />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatHeader;
