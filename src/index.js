import express from 'express'
import http from 'http'
import socketIO from 'socket.io'
import fs from 'fs'
import { promisify } from 'util'

const app = express()
const server = http.createServer(app)
const io = socketIO(server)
const readFile = promisify(fs.readFile)

const PORT = process.env.PORT || 3000

app.get('/', async (_, response) => {
    const html = await readFile('./src/index.html', 'utf8')
    response.send(html)
})

io.on('connection', socket => {
    console.log('A user connected')
    socket.on('disconnect', () => console.log('A user disconnect'))
    socket.on('chat-message', message => {
        io.emit('chat-message', message)
    })
})

server.listen(PORT, () => {
    console.log('The server is running: http://localhost:' + PORT)
})