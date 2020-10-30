let users = []

let error = null;

function addUser({ id, name, roomID }, socketID){
    name = name.trim().toLowerCase();
    roomID = roomID.trim().toLowerCase();

    const existingUser = users.find((user) => user.name === name && user.roomID === roomID);

    if(existingUser){
        error = { message: 'User already exists.' }
        return { error, user: null };
    };

    const user = { id, name, roomID, socketID };
    users.push(user);

    return { error, user };
};


function getUsersInRoom(id){
    return users.filter((user)=>user.roomID === id)
}

function getUser(userID){
    return users.find((user)=>user.id === userID);
}

function deleteUser(ID){
    const newUsersError = users.filter((user)=>user.socketID !== ID);
    users = newUsersError;
    return users;
}


module.exports = { addUser, getUser, getUsersInRoom, deleteUser };