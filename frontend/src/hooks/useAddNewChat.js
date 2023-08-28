import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useUserContext } from "../hooks/useUserContext";

export const useAddNewChat = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const { userList, dispatch: dispatchUser } = useUserContext();
  const [participantsData, setParticipantsData] = useState([]);

  const addChat = async (room, roomName, message, user) => {
    setIsLoading(true);
    setError(null);

    // Contructor for message
    const dataMessage = {
        sender: "",
        content: message,
        email: user.email
    }

    // Contructor for chatCollection
    const newMessage = {
      participants: [],
      messages: [dataMessage],
      room_id: "",
    };

    // Xử lý lấy participants
    const getParticipants = (userList, room) => {
      const data = [];
      userList.map((item) => {
        room[0].members.map((member) => {
          if (item._id === member) {
            data.push({
              user_id: item._id,
              email: item.email,
            });
          }
        });
      });
      newMessage.participants = data
    };
    
    // Xử lý lấy sender
    const getSender = (userList, user) => {
      userList.map((item) => {
        if (item.email === user.email) {
          dataMessage.sender = item._id
        }
      });
    };
    
    // Xử lý lấy room_id
    const getRoomId = (room, roomName) => {
        room.map((item) => {
            if (item.name === roomName) {
              newMessage.room_id = item._id;
            }
        });
    }

    getParticipants(userList, room);
    getSender(userList, user);
    getRoomId(room, roomName)

    console.log("FINALLY CREATE NEW CHAT: ", newMessage);
    const response = await fetch('/api/chat/createChat', {
        method: "POST",
        body: JSON.stringify(newMessage),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
    })
    const json = await response.json()

    if (!response.ok) {
        console.log(json.error)
        // setIsLoading(false)
        // setError(json.error)
    }
    if (response.ok) {
        console.log(json)
        // setIsLoading(false)
    }
  };
  return { addChat, isLoading, error };
};
