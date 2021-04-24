module.exports  = (io) => {
    let listUsers = []
    io.on('connection', socket => {
        console.log(`User ${socket.id} connected`);
        socket.on('disconnect', () => {
            console.log("Disconnect")
            let index = listUsers.findIndex(u =>{ return u.id === socket.id })
            socket.broadcast.emit("send-user-removed", listUsers[index])
            listUsers.splice(index, 1);
            socket.broadcast.emit("send-list-users", listUsers)
        })
        socket.on('new-user-login', user => {
            socket.name = user
            let newUser = {id: socket.id, name: socket.name}
            listUsers.push(newUser)
            socket.broadcast.emit('new-user-login', newUser)
        })
        io.sockets.emit('send-list-users', listUsers)
      })
}