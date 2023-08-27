import * as React from "react";
import { useUserContext } from "../../hooks/useUserContext";
import { useAuthContext } from "../../hooks/useAuthContext";

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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { userList, dispatch } = useRoomContext();
  const { user } = useAuthContext();
  const [chipData, setChipData] = React.useState([
    { key: 0, label: "Angular" },
    { key: 1, label: "jQuery" },
    { key: 2, label: "Polymer" },
    { key: 3, label: "React" },
    { key: 4, label: "Vue.js" },
  ]);

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
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
        dispatch({ type: "SET_USER", payload: json });
      }
    };

    if (user) {
      fetchUser();
    }
  }, [dispatch, userList]);

  console.log(userList);

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
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
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
            {chipData.map((data) => {
              let icon;

              if (data.label === "React") {
                icon = <TagFacesIcon />;
              }

              return (
                <ListItem key={data.key}>
                  <Chip
                    icon={icon}
                    label={data.label}
                    onDelete={
                      data.label === "React" ? undefined : handleDelete(data)
                    }
                  />
                </ListItem>
              );
            })}
          </Paper>
          <TextField id="outlined-basic" label="Room Name" variant="outlined" />
        </Box>
      </Modal>
    </div>
  );
}
