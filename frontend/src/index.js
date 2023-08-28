import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { WorkoutsContextProvider } from "./context/WorkoutContext";
import { AuthContextProvider } from "./context/AuthContext";
import { RoomContextProvider } from "./context/RoomContext";
import { ChatContextProvider } from "./context/ChatContext";
import { UserContextProvider } from "./context/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthContextProvider>
      <UserContextProvider>
        <RoomContextProvider>
          <ChatContextProvider>
            <WorkoutsContextProvider>
              <App />
            </WorkoutsContextProvider>
          </ChatContextProvider>
        </RoomContextProvider>
      </UserContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
