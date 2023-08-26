import React from "react";
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

const MessengerDemo = () => {
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
              <ListItem>
                <ListItemAvatar>
                  <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant="dot"
                  >
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                    />
                  </StyledBadge>
                </ListItemAvatar>
                <ListItemText
                  primary="Nguyễn Huy Khải"
                  secondary="Jan 9, 2014"
                />
              </ListItem>
              <Divider variant="inset" component="li" />

              <ListItem>
                <ListItemAvatar>
                  <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant="dot"
                  >
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                    />
                  </StyledBadge>
                </ListItemAvatar>
                <ListItemText primary="Bùi Đức Trí" secondary="Jan 9, 2014" />
              </ListItem>
              <Divider variant="inset" component="li" />
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
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                    />
                  </StyledBadge>
                </ListItemAvatar>
                <ListItemText
                  sx={{ color: "black" }}
                  primary="Bùi Đức Trí"
                  secondary="active 17m ago"
                />
              </ListItem>
            </AppBar>
          </Box>
          <Divider variant="inset" component="li" />
          <Container>
            <Box sx={{ marginTop: 5, overflowY: "scroll", height: 450 }}>
              <Stack>
              <Chip
                sx={{
                  height: 40,
                  maxWidth: "fit-content",
                  marginTop: 2,
                  "& .MuiChip-label": {
                    display: "block",
                    whiteSpace: "normal"
                  }
                }}
                label="This is a chip that has multiple lines."
              />
              <Chip
                color="primary"
                sx={{
                  height: 40,
                  maxWidth: "fit-content",
                  marginTop: 2,
                  alignSelf: "flex-end",
                  float: "right",
                  "& .MuiChip-label": {
                    display: "block",
                    whiteSpace: "normal"
                  }
                }}
                label="This is a chip that has multiple lines."
              />
              </Stack>
              
            </Box>
            
            <Box
              sx={{
                marginTop: 1,
                display: "flex",
                alignItems: "flex-end",
                width: "100%",
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Type a message..."
                inputProps={{ "aria-label": "Type a message..." }}
              />
              <IconButton
                type="button"
                sx={{ p: "10px" }}
                color="primary"
                aria-label="send"
              >
                <SendIcon />
              </IconButton>
            </Box>
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

export default MessengerDemo;
