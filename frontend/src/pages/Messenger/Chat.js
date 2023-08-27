import * as React from "react";
import { Fragment } from "react";
import { useEffect, useState } from "react";
import { useNavigate, redirect } from "react-router-dom";
import io from "socket.io-client";
import { useRoomContext } from "../../hooks/useRoomContext";
import { useChatContext } from "../../hooks/useChatContext";
import { useAuthContext } from "../../hooks/useAuthContext";

//IMPORT COMPONENT
import AddRoom from "./AddRoom";

//IMPORT MUI
import { styled } from "@mui/material/styles";
import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  Grid,
  Paper,
  Badge,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  AppBar,
  Container,
  InputBase,
  Chip,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";


const ENDPOINT = "http://localhost:4000";
var socket = io(ENDPOINT);

const messages = [
  { id: 1, text: "Hi there!", sender: "bot" },
  { id: 2, text: "Hello!", sender: "user" },
  { id: 3, text: "How can I assist you today?", sender: "bot" },
];

const ChatUI = () => {
  const navigate = useNavigate();
  const { room, dispatch } = useRoomContext();
  const { user } = useAuthContext();
  const { chat, dispatch: dispatchChat } = useChatContext();

  const [roomName, setRoomName] = useState();
  const [currentUser, setCurrentUser] = useState({});
  const [text, setText] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const inputText = document.getElementById("inputText");

  // Get all room
  useEffect(() => {
    const fetchRoom = async () => {
      const response = await fetch("/api/room", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_ROOM", payload: json });
      }
    };

    if (user) {
      fetchRoom();
    }
  }, [dispatch, user]);

  // Set connect with socket
  useEffect(() => {
    socket.on("connection", () => {
      setSocketConnected(true);
    });

    socket.on("newMessage", (newMessage) => {
      console.log("New message:", newMessage);
      dispatchChat({ type: "ADD_CHAT", payload: newMessage });
    });

    socket.on("userJoined", (user) => {
      console.log("User joined: ", user);
    });
  }, []);

  // Handle click on item room chat
  const handleClick = (r) => {
    const fetchChat = async () => {
      const response = await fetch(`/api/chat/${r._id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      if (response.ok) {
        dispatchChat({ type: "SET_CHAT", payload: json });
        setRoomName(r.name);
        const currentUser = (json) => {
          json[0].participants.map((item) => {
            if (item.email === user.email) {
              setCurrentUser(item);
            }
          });
        };
        currentUser(json);
      }
    };

    // If user already exists in room then will pass this case
    if (user && r.name !== roomName) {
      console.log("SOCKET EMIT");
      socket.emit("userJoinedRoom", r);
      fetchChat();
    }
  };

  // Handle input text
  const handleInput = (e) => {
    setText(e.target.value);
  };

  // Handle submit messenger
  const handleSendMessage = async (e) => {
    e.preventDefault();
    console.log(e.target);
    const newMessage = {
      _id: chat[0]._id,
      message: text,
      email: currentUser.email,
      room_id: chat[0].room_id,
    };
    setText("");
    inputText.focus();

    const response = await fetch("/api/chat/addMessage", {
      method: "PUT",
      body: JSON.stringify(newMessage),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      console.log(json.error);
    }
    if (response.ok) {
      console.log(json);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "white",
        paddingTop: 1,
        paddingX: 1,
        borderRadius: 5,
        boxShadow: 2,
        height: 600,
      }}
    >
      <Grid container>
        <Grid item xs={3}>
          <Box
            sx={{
              height: 500,
            }}
          >
            <List
              sx={{
                width: "100%",
                maxWidth: 360,
                bgcolor: "background.paper",
              }}
            >
              <Box textAlign="center" paddingY={2} >
                <AddRoom />
              </Box>
              {room &&
                room.map((r, index) => (
                  <Fragment key={index}>
                    <ListItem onClick={() => handleClick(r)}>
                      <ListItemAvatar>
                        <StyledBadge
                          overlap="circular"
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                          }}
                          variant="dot"
                        >
                          <Avatar alt="Remy Sharp" src="" />
                        </StyledBadge>
                      </ListItemAvatar>
                      <ListItemText primary={r.name} secondary={r.createdAt} />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </Fragment>
                ))}
            </List>
          </Box>
        </Grid>
        <Grid item xs={9}>
          <Box sx={{ position: "relative" }}>
            <AppBar
              sx={{
                position: "absolute",
                backgroundColor: "white",
                boxShadow: "none",
              }}
            >
              <ListItem>
                <ListItemAvatar>
                  <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant="dot"
                  >
                    <Avatar alt="Remy Sharp" src="" />
                  </StyledBadge>
                </ListItemAvatar>
                <ListItemText
                  sx={{ color: "black" }}
                  primary={roomName ? roomName : "Loading..."}
                />
              </ListItem>
            </AppBar>
          </Box>
          <Divider variant="inset" component="li" />
          <Container>
            <Box sx={{ marginTop: 5, overflowY: "scroll", height: 450 }}>
              <Stack direction="column" spacing={1}>
                {currentUser &&
                  chat &&
                  chat[0].messages.map((item, index) =>
                    item.email === currentUser.email ? (
                      <Box key={index} textAlign="right">
                        <Typography
                          color="rgba(0, 0, 0, 0.6)"
                          variant="caption"
                          display="block"
                          gutterBottom
                        >
                          {item.email}
                        </Typography>
                        <Chip
                          color="primary"
                          sx={{
                            paddingY: 1,
                            height: "auto",
                            "& .MuiChip-label": {
                              display: "block",
                              whiteSpace: "normal",
                            },
                          }}
                          label={item.content}
                        />
                      </Box>
                    ) : (
                      <Box key={index} sx={{ paddingBottom: 2 }}>
                        <Typography
                          color="rgba(0, 0, 0, 0.6)"
                          variant="caption"
                          display="block"
                          gutterBottom
                        >
                          {item.email}
                        </Typography>
                        <Chip
                          sx={{
                            paddingY: 1,
                            height: "auto",
                            "& .MuiChip-label": {
                              display: "block",
                              whiteSpace: "normal",
                            },
                          }}
                          label={item.content}
                        />
                      </Box>
                    )
                  )}
              </Stack>
            </Box>
            <form onSubmit={(e) => handleSendMessage(e)}>
              <Box
                sx={{
                  marginTop: 1,
                  display: "flex",
                  alignItems: "flex-end",
                  width: "100%",
                }}
              >
                <InputBase
                  id="inputText"
                  onChange={(e) => handleInput(e)}
                  value={text}
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Type a message..."
                  inputProps={{ "aria-label": "Type a message..." }}
                />
                <IconButton
                  type="submit"
                  sx={{ p: "10px" }}
                  color="primary"
                  aria-label="send"
                >
                  <SendIcon />
                </IconButton>
              </Box>
            </form>
          </Container>
        </Grid>
      </Grid>
    </Box>
  );
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Item2 = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
  borderRadius: 0,
  boxShadow: "none",
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

export default ChatUI;
