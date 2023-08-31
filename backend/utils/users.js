const users = []

// Join user to chat
function userJoin(id, username, room) {
    const user = { id, username, room }

    users.push(user);

    return user
}

// Get current user
function getCurrentUser(id) {
    return users.find(user => user.id === id);
}

// User leaves chat
function userLeave(id) {
    const index = users.findIndex(user => user.id === id);

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

// User unsubscribe room
function userUnsubcribe( id, room_id ) {
    const data = []
    users.map( item => {
        if (item.room === room_id && item.id === id) {
            data.push(item)
        }
    } )

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

// Get room users
function getRoomUsers(room) {
    return users.filter(user => user.room === room);
}

module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
}