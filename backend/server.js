const socket = require('socket.io')
const io = socket(3000, { cors: { origin: '*' } })


//  On new connection
io.on('connection', (socket) => {
    let id = socket.id
    let data = []
    io.sockets.sockets.forEach(s => data.push(s.id))
    io.emit('players', { players: data })
})
// To initialize game

io.on('in', (sessionId1) => {
    console.log(sessionId1)
})