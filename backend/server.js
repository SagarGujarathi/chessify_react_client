const io = require('socket.io')(3000, { cors: { origin: '*' } })

function getPlayersData() {
    let data = []
    io.sockets.sockets.forEach(s => {
        if (s.handshake.query.isAvailable) {
            data.push({ playerName: s.handshake.query.name, playerRoom: s.handshake.query.id, id: s.id })
        }
    })
    return data
}
io.on('connection', (socket) => {
    console.log(`New Player Connected!\nName: ${socket.handshake.query.name}\nID: ${socket.handshake.query.id}\nsAvailable: ${socket.handshake.query.isAvailable}`)

    io.sockets.emit('OnlinePlayers', getPlayersData())

    socket.on('disconnect', () => {
        console.log(`Player Disconnected!\nName: ${socket.handshake.query.name}\nID: ${socket.handshake.query.id}\nsAvailable: ${socket.handshake.query.isAvailable}`)
        io.sockets.emit('OnlinePlayers', getPlayersData())
    })

    socket.on('RequestPlay', (data) => {
        io.to(data.id).emit('RequestPlay', data)
    })
})