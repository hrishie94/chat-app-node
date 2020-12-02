const users = []

const addUser = ({id,username,room})=>{
// clean the data
// console.log(id)

// console.log(username)
// console.log(room)

username = username.trim().toLowerCase()
room = room.trim().toLowerCase()
// validate the user
if(!username || !room){
    return {
        error:"username and room are required"
    }
}

// check the existing user
const existingUser = users.find((user)=>{
    return user.room === room && user.username === username
})

// validate the username
if (existingUser){
    return{
        error:"username already in use"
}
}


// store user
const user = {id,username,room}
users.push(user)
return {user}
}



const removeUser = (id)=>{
    const index = users.findIndex((user)=>user.id === id)
    if(index !== -1 ){
        return users.splice(index,1)[0]
    }
}

// const removedUser = removeUser(22)
// console.log(removedUser)
// console.log(users)

const getUser = (id)=>{
    return  users.find((user)=>user.id === id)
}

const getUserinRoom  = (room)=>{
    room = room.trim().toLowerCase()
    // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>1")
    return users.filter((user)=>
        user.room.trim().toLowerCase()===room.trim().toLowerCase()
    )
}

// addUser({
//     id:24,
//     username:"hrishi",
//     room:"airoli"
// })

// addUser({
//     id:34,
//     username:"rahul",
//     room:"airoli naka"
// })

// const user = getUserinRoom("airoli")
// console.log(user)



module.exports = {addUser,removeUser,getUser,getUserinRoom}