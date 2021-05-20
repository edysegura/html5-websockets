const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)

const PORT = process.env.PORT || 3000

app.get('/', (request, response) => {
    response.sendFile(__dirname + "/index.html")
})

io.on('connection', socket => {
    console.log('A user connected')
    socket.on('disconnect', () => console.log('A user disconnect'))
    socket.on('chat-message', msg => {
        io.emit('chat-message', msg)
    })
})

server.listen(PORT, () => {
    console.log('The server is running: http://localhost:' + PORT)
})