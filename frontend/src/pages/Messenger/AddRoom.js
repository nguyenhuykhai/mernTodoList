import * as React from "react";
import { useUserContext } from "../../hooks/useUserContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEffect, useState } from "react";

// IMPORT MUI
import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  Chip,
  Paper,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import AddBoxIcon from "@mui/icons-material/AddBox";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function AddRoom() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { userList, dispatch } = useUserContext();
  const { user } = useAuthContext();
  const [chipData, setChipData] = useState([]);
  const [newRoom, setNewRoom] = useState("");
  
  const handleDelete = (chipToDelete) => () => {
    const handle = (chipData) => {
      const item = chipData.filter((chip) => chip._id !== chipToDelete._id);
      setChipData(item);
    };
    handle(chipData);
  };

  // Get all users
  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch("/api/user/chat", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_USER", payload: json.users });

        // Function to handle set main user
        const mainUser = (data) => {
          data.map(item => {
            if(item.email === user.email) {
              console.log(item)
              setChipData([item])
            }
          })
        }
        mainUser(json.users)
      }
    };

    if (user) {
      fetchUser();
    }
  }, [dispatch]);

  // Function to handle when add user to new room 
  const handleChange = (event) => {
    let check = false;
    chipData.map((chip) => {
      if (chip._id === event.target.value._id) {
        check = true;
      }
    });
    if (!check) {
      setChipData([...chipData, event.target.value]);
    }
  };

  const handleInputName = (e) => {
    setNewRoom(e.target.value);
  }

  const handleAddRoom = async (e) => {
    e.preventDefault();
    const dataRoom = { name: newRoom, members: chipData }

    const response = await fetch('/api/room', {
        method: 'POST',
        body: JSON.stringify(dataRoom),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
        }
    })
    const json = await response.json();

    if (!response.ok) {
        console.log(json.error);
    }
    if (response.ok) {
        console.log("Success: ", json);
        dispatch({type: 'CREATE_ROOM', payload: json})
    }
  }

  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="outlined"
        startIcon={<AddBoxIcon sx={{ height: 30, width: 30 }} />}
      >
        Add Room
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={(e) => handleAddRoom(e)}>
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add New Room
            </Typography>
            <Paper
              sx={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                listStyle: "none",
                p: 0.5,
                m: 0,
              }}
              component="ul"
            >
              {chipData &&
                chipData.map((data) => {
                  return (
                    <ListItem key={data._id}>
                      <Chip
                        label={data.email}
                        onDelete={
                          user.email === data.email
                            ? undefined
                            : handleDelete(data)
                        }
                      />
                    </ListItem>
                  );
                })}
            </Paper>

            <FormControl sx={{ marginTop: 4, width: "100%" }}>
              <InputLabel id="demo-multiple-name-label">Select</InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                value=""
                onChange={handleChange}
                input={<OutlinedInput label="Name" />}
              >
                {userList &&
                  userList.map((data) => (
                    <MenuItem key={data._id} value={data}>
                      {data.email}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>

            <TextField
              id="outlined-basic"
              value={newRoom}
              onChange={handleInputName}
              label="Room Name"
              variant="outlined"
              sx={{ marginTop: 4, width: "100%" }}
            />

            <Button sx={{marginTop: 2}} variant="contained" type="submit">
              Create Room
            </Button>
          </Box>
        </form>
      </Modal>
    </div>
  );
}
