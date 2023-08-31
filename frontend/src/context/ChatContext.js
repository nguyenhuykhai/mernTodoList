import { createContext, useReducer } from "react";

export const ChatContext = createContext()

export const chatReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CHAT':
            return {
                chat: action.payload.chat
            }
        case 'ADD_CHAT':
            const test = [...state.chat]
            if (test[0].room_id === action.payload.room_id) {
                test[0].messages.push(action.payload.newMessage)
            }
            return {
                chat: test
            }
        case 'SET_NEW_CHAT':
            console.log("SET NEW CHAT: ", state)
            if (!state.chat[0]?.hasOwnProperty("room_id")) {
                const message = action.payload;
                console.log("SOCKET GỬI LÊN: ", message);
                return {
                    chat: action.payload.chat
                }
            }
        default:
            return state
    }
}

export const ChatContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(chatReducer, {
        chat: null
    })

    return (
        <ChatContext.Provider value={{...state, dispatch}}>
            { children }
        </ChatContext.Provider>
    )
}