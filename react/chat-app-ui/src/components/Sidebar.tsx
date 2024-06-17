import {
  Avatar,
  Box,
  Drawer,
  IconButton,
  List,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
const drawerWidth = 346;
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { data } from "../helper/data";
import { MoreVert } from "@mui/icons-material";
const Sidebar = () => {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{
          fontSize: "24px",
          mx: 2,
          my: 2,
        }}
      >
        Chats
      </Typography>
      <Divider />
      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {data.map((contact, index) => (
          <ListItem
            sx={{
              width: "330px",
              padding: "8px",
              marginY: "8px",
              height: "60px",
              borderRadius: "4px",
              bgcolor: index === 0 ? "#F5F7FB" : "white",
            }}
            key={index}
            disablePadding
            secondaryAction={
              <IconButton>
                <MoreVert />
              </IconButton>
            }
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
                primary={contact.name}
                primaryTypographyProps={{
                  fontSize: "16px",
                  fontWeight: 600,
                  lineHeight: "21px",
                }}
                secondaryTypographyProps={{
                  fontSize: "14px",
                  lineHeight: "19px",
                }}
                secondary={
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      style={{
                        fontSize: "14px",
                        lineHeight: "19px",
                      }}
                    >
                      {
                        contact.chat[contact.chat.length - 1][
                          Object.keys(contact.chat[0])[0]
                        ].message
                      }
                    </Typography>
                    {contact.unreadCount !== 0 && (
                      <Box
                        sx={{
                          backgroundColor: "#3BA55D",
                          borderRadius: "50%",
                          minHeight: "20px",
                          minWidth: "20px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {contact.unreadCount}
                      </Box>
                    )}
                  </Box>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
