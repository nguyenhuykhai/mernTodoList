import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { WorkoutsContextProvider } from "./context/WorkoutContext";
import { AuthContextProvider } from "./context/AuthContext";
import { RoomContextProvider } from "./context/RoomContext";
import { ChatContextProvider } from "./context/ChatContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthContextProvider>
      <RoomContextProvider>
        <ChatContextProvider>
          <WorkoutsContextProvider>
            <App />
          </WorkoutsContextProvider>
        </ChatContextProvider>
      </RoomContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
