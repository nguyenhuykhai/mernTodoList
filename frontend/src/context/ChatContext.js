import { createContext, useReducer } from "react";

export const ChatContext = createContext()

export const chatReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CHAT':
            return {
                chat: action.payload
            }
        case 'CREATE_CHAT':
            return {
                chat: [action.payload, ...state.chat]
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