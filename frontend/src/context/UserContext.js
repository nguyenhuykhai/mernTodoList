import { createContext, useReducer } from "react";

export const UserContext = createContext()

export const userReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                room: action.payload
            }
        default:
            return state
    }
}

export const UserContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, {
        userList: null
    })

    return (
        <UserContext.Provider value={{...state, dispatch}}>
            { children }
        </UserContext.Provider>
    )
}