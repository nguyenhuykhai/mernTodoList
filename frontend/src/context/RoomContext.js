import { createContext, useReducer } from "react";

export const RoomContext = createContext()

export const roomReducer = (state, action) => {
    switch (action.type) {
        case 'SET_ROOM':
            return {
                room: action.payload
            }
        case 'CREATE_ROOM':
            return {
                room: [action.payload, ...state.room]
            }
        default:
            return state
    }
}

export const RoomContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(roomReducer, {
        room: null
    })

    return (
        <RoomContext.Provider value={{...state, dispatch}}>
            { children }
        </RoomContext.Provider>
    )
}