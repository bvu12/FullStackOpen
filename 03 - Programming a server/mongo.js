const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://brianvu:${password}@cluster0.ye0bv.mongodb.net/note-app?retryWrites=true&w=majority`


mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
})

// 'Note' implies we are making a 'notes' collection
const Note = mongoose.model('Note', noteSchema)

// const note = new Note({
//     content: 'HTML is easy',
//     date: new Date(),
//     important: true,
// })

// note.save().then(result => {
//     console.log('note saved!')
//     mongoose.connection.close()
// })

// {} find all notes in the 'notes' collection
// {important:true} to find important notes only
Note.find({important:true}).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})