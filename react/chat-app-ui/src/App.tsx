import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Sidebar from "./components/Sidebar";
import { data } from "./helper/data";

import {
  Avatar,
  IconButton,
  Input,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
} from "@mui/material";
import { Add, Mic, MoreVert, Send } from "@mui/icons-material";
import ChatHeader from "./components/ChatHeader";
import MessageSend from "./components/MessageSend";
import Conversations from "./components/Conversations";

const drawerWidth = 346;
export default function App() {
  const contact = data[0];
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Sidebar />
      <Box
        sx={{
          bgcolor: "background.default",
          p: 3,
          flexGrow: 1,
          height: "100vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "space-between",
          }}
        >
          <ChatHeader />
          <Conversations />
          <MessageSend />
        </Box>
      </Box>
    </Box>
  );
}
