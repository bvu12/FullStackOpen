require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Note = require('./models/note')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

// Handles HTTP GET requests made to /root
app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

// Handles HTTP GET requests made to /notes
app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
    })
})

// Handles HTTP GET requests made to a specific note
app.get('/api/notes/:id', (request, response) => {
    Note.findById(request.params.id).then(note => {
        response.json(note)
    })
})

// Delete request
app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)

    // Status 204: no content
    response.status(204).end()
})

// Post request (create new)
app.post('/api/notes', (request, response) => {
    const body = request.body

    if (body.content === undefined) {
        return response.status(400).json({error: 'content missing'})
    }

    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date(),
    })

    note.save().then(savedNote => {
        response.json(savedNote)
    })
})

// Put request
app.put('/api/notes/:id', (request, response) => {
    const {id: _id} = request.params;
    const body = request.body

    if (body.content === undefined) {
        return response.status(400).json({error: 'content missing'})
    }

    const note = new Note({
        _id,
        content: body.content,
        important: body.important,
        date: body.date,
    })


    Note.findByIdAndUpdate(_id, note, (err, updatedNote) => {
        if (err) {
            return response.status(400).json({error: 'could not update'})
        } else {
            response.json(note)
        }
    })

})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})