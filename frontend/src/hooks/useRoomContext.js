import { RoomContext } from '../context/RoomContext'
import { useContext } from 'react'

export const useChatContext = () => {
    const context = useContext(RoomContext)

    if (!context) {
        throw Error('useRoomContext must be used inside an RoomContextProvider')
    }

    return context
}