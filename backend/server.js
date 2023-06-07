
const io = require('socket.io')(3000, { cors: { origin: '*' } });
function getOnlinePlayers() {
    let data = []
    io.sockets.sockets.forEach(s => data.push(s.id))
    console.log('Users : ', data)
    return data
}
io.on('connection', (socket) => {
    console.log('A user connected id : ', socket.id)
    io.sockets.emit('players', getOnlinePlayers())
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });

    socket.on('join request', (room, userid) => {
        console.log(`Sent request to the user : ${userid} for joining`)
        socket.to(userid).emit('join request', { room })
    });

    socket.on('accept request', (room, userid) => {
        socket.join(room)
        socket.to(room).emit('success request', { message: `Player id : ${userid} accepted your request! Start the game` })
    })

    socket.on('reject request', (room, userid) => {
        socket.to(room).emit('reject request', { message: `Player id : ${userid} rejected your request` })
    })

});
