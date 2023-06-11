const io = require('socket.io')(3000, { cors: { origin: '*' } })

function getPlayersData() {
    let data = []
    io.sockets.sockets.forEach(s => {
        data.push({ name: s.handshake.query.name, roomId: s.handshake.query.roomId, socketId: s.id })
    })
    return data
}
io.on('connection', (socket) => {
    console.log(`New player joined! Name: ${socket.handshake.query.name}`)
    io.sockets.emit('OnlinePlayers', getPlayersData())
    socket.on('disconnecting', () => {
        console.log(`New player disconnected! Name: ${socket.handshake.query.name}`)
        // console.log(io.sockets.manager.roomClients[socket.id])
        console.log(Object.keys(socket.adapter.rooms))
        // io.to(socket.handshake.query.roomId).emit('StopGame', { name: socket.handshake.query.name })
        io.sockets.emit('OnlinePlayers', getPlayersData())
    })

    socket.on('RequestPlay', (data) => {
        io.to(data.opponentDetails.socketId).emit('RequestPlay', data)
        socket.join(data.playerDetails.roomId)
    })
    socket.on('AcceptRequest', (data) => {
        socket.join(data.playerDetails.roomId)
        const initData = {
            gameRoomId: data.playerDetails.roomId,
            black: {
                name: data.playerDetails.name,
                socketId: data.playerDetails.socketId
            },
            white: {
                name: data.opponentDetails.name,
                socketId: data.opponentDetails.socketId
            }
        }
        console.log(initData)
        io.to(data.playerDetails.roomId).emit('InitGame', initData)
    })
    socket.on('UserMove', (data) => {
        io.to(data.opponentDetails.socketId).emit('UserMove', data.chess)
    })
})